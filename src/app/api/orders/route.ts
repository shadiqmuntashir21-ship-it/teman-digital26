import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { randomBytes } from "node:crypto";
import { getDb } from "@/db/client";
import { orders, products } from "@/db/schema";

function orderCode(){
  const d=new Date();
  const stamp=[String(d.getFullYear()).slice(-2),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("");
  return `TD-${stamp}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

export async function POST(req:Request){
  const db=getDb();
  if(!db) return NextResponse.json({message:"Database belum dikonfigurasi."},{status:503});
  const body=await req.json();
  const productId=Number(body.productId);
  const [product]=await db.select().from(products).where(eq(products.id,productId)).limit(1);
  if(!product || !product.published || !product.checkoutEnabled) return NextResponse.json({message:"Produk tidak tersedia."},{status:404});

  const customerName=String(body.customerName||"").trim();
  const customerEmail=String(body.customerEmail||"").trim().toLowerCase();
  const customerWhatsapp=String(body.customerWhatsapp||"").trim();
  if(!customerName || !customerEmail || !customerWhatsapp) return NextResponse.json({message:"Data pembeli belum lengkap."},{status:400});

  const code=orderCode();
  const accessToken=randomBytes(24).toString("hex");
  await db.insert(orders).values({
    code,
    accessToken,
    customerName,
    customerEmail,
    customerWhatsapp,
    productId:product.id,
    productSnapshot:{id:product.id,name:product.name,slug:product.slug,price:product.price},
    amount:product.price,
    paymentMethodId:body.paymentMethodId?Number(body.paymentMethodId):null,
    status:"MENUNGGU_PEMBAYARAN"
  });
  return NextResponse.json({ok:true,code,accessToken});
}
