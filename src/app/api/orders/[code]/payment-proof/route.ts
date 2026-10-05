import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { put } from "@vercel/blob";
import { getDb } from "@/db/client";
import { orders } from "@/db/schema";
import { emailPaymentProofReceived } from "@/lib/email";

export const runtime = "nodejs";

const ALLOWED = new Set(["image/jpeg","image/png","image/webp","application/pdf"]);
const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(req:Request,{params}:{params:Promise<{code:string}>}){
  const {code}=await params;
  const db=getDb();
  if(!db) return NextResponse.json({message:"Database belum terhubung."},{status:503});

  const form=await req.formData();
  const token=String(form.get("token")||"");
  const file=form.get("file");
  if(!token) return NextResponse.json({message:"Token transaksi tidak valid."},{status:401});
  if(!(file instanceof File)) return NextResponse.json({message:"Pilih bukti pembayaran."},{status:400});
  if(!ALLOWED.has(file.type)) return NextResponse.json({message:"Bukti harus JPG, PNG, WEBP, atau PDF."},{status:400});
  if(file.size>MAX_BYTES) return NextResponse.json({message:"Ukuran bukti maksimal 4 MB."},{status:400});

  const [order]=await db.select().from(orders).where(and(eq(orders.code,code),eq(orders.accessToken,token))).limit(1);
  if(!order) return NextResponse.json({message:"Pesanan tidak ditemukan."},{status:404});
  if(order.status==="SELESAI"||order.status==="DIBATALKAN") return NextResponse.json({message:"Pesanan ini tidak dapat menerima bukti baru."},{status:400});

  const safe=file.name.toLowerCase().replace(/[^a-z0-9._-]+/g,"-").replace(/^-+|-+$/g,"")||"bukti";
  const blob=await put("teman-digital/payment-proofs/"+code+"/"+Date.now()+"-"+safe,file,{
    access:"public",
    addRandomSuffix:true,
    contentType:file.type,
  });

  await db.update(orders).set({
    paymentProofUrl:blob.url,
    status:"MENUNGGU_VERIFIKASI",
    updatedAt:new Date(),
  }).where(eq(orders.id,order.id));

  void emailPaymentProofReceived({
    code:order.code,
    productName:String((order.productSnapshot as any)?.name || "Produk Teman Digital"),
  });

  return NextResponse.json({ok:true,status:"MENUNGGU_VERIFIKASI"});
}
