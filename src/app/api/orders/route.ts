import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { randomBytes } from "node:crypto";
import { z } from "zod";
import { getDb } from "@/db/client";
import { emailOrderCreated } from "@/lib/email";
import { orders, paymentMethods, products } from "@/db/schema";

const OrderInput = z.object({
  productId: z.coerce.number().int().positive(),
  customerName: z.string().trim().min(2,"Nama minimal 2 karakter.").max(180),
  customerEmail: z.string().trim().toLowerCase().email("Format email tidak valid.").max(220),
  customerWhatsapp: z.string().trim().min(8,"Nomor WhatsApp terlalu pendek.").max(40)
    .refine(v=>/^[+0-9 ()-]+$/.test(v),"Format WhatsApp tidak valid."),
  paymentMethodId: z.coerce.number().int().positive(),
});

function orderCode(){
  const d=new Date();
  const stamp=[String(d.getFullYear()).slice(-2),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("");
  return `TD-${stamp}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

export async function POST(req:Request){
  const db=getDb();
  if(!db) return NextResponse.json({message:"Database belum dikonfigurasi."},{status:503});

  let json:unknown;
  try{ json=await req.json(); }
  catch{ return NextResponse.json({message:"Format permintaan tidak valid."},{status:400}); }

  const parsed=OrderInput.safeParse(json);
  if(!parsed.success){
    return NextResponse.json({
      message:parsed.error.issues[0]?.message || "Data pembeli tidak valid."
    },{status:400});
  }

  const input=parsed.data;
  const [product]=await db.select().from(products).where(and(
    eq(products.id,input.productId),
    eq(products.published,true),
    eq(products.checkoutEnabled,true)
  )).limit(1);

  if(!product) return NextResponse.json({message:"Produk tidak tersedia."},{status:404});

  const [paymentMethod]=await db.select().from(paymentMethods).where(and(
    eq(paymentMethods.id,input.paymentMethodId),
    eq(paymentMethods.enabled,true)
  )).limit(1);

  if(!paymentMethod) return NextResponse.json({message:"Metode pembayaran tidak tersedia."},{status:400});

  // Price is intentionally taken only from the database.
  const code=orderCode();
  const accessToken=randomBytes(24).toString("hex");

  await db.insert(orders).values({
    code,
    accessToken,
    customerName:input.customerName,
    customerEmail:input.customerEmail,
    customerWhatsapp:input.customerWhatsapp,
    productId:product.id,
    productSnapshot:{
      id:product.id,
      name:product.name,
      slug:product.slug,
      price:product.price,
      paymentMethodName:paymentMethod.name
    },
    amount:product.price,
    paymentMethodId:paymentMethod.id,
    status:"MENUNGGU_PEMBAYARAN"
  });

  void emailOrderCreated({
    code,
    customerName:input.customerName,
    customerEmail:input.customerEmail,
    productName:product.name,
    amount:String(product.price),
    accessToken,
  });

  return NextResponse.json({ok:true,code,accessToken});
}
