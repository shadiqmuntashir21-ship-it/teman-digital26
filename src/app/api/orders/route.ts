import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { orders, products } from "@/db/schema";

function orderCode(){
  const d=new Date();
  const stamp=[String(d.getFullYear()).slice(-2),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("");
  return `TD-${stamp}-${Math.random().toString(36).slice(2,7).toUpperCase()}`;
}

export async function POST(req:Request){
  const db=getDb();
  if(!db) return NextResponse.json({message:"Database belum dikonfigurasi."},{status:503});
  const body=await req.json();
  const productId=Number(body.productId);
  const [product]=await db.select().from(products).where(eq(products.id,productId)).limit(1);
  if(!product || !product.published || !product.checkoutEnabled) return NextResponse.json({message:"Produk tidak tersedia."},{status:404});
  const code=orderCode();
  await db.insert(orders).values({
    code,
    customerName:String(body.customerName||"").trim(),
    customerEmail:String(body.customerEmail||"").trim().toLowerCase(),
    customerWhatsapp:String(body.customerWhatsapp||"").trim(),
    productId:product.id,
    productSnapshot:{id:product.id,name:product.name,slug:product.slug,price:product.price},
    amount:product.price,
    paymentMethodId:body.paymentMethodId?Number(body.paymentMethodId):null,
    status:"MENUNGGU_PEMBAYARAN"
  });
  return NextResponse.json({ok:true,code});
}
