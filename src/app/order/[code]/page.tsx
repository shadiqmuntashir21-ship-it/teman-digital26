import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Check, Clock3, Mail, MessageCircle } from "lucide-react";
import { getDb } from "@/db/client";
import { orders, paymentMethods } from "@/db/schema";
import { getSettings } from "@/lib/cms";
import { rupiah } from "@/lib/format";

export const dynamic="force-dynamic";

const steps=[
  ["MENUNGGU_PEMBAYARAN","Pesanan dibuat"],
  ["MENUNGGU_VERIFIKASI","Pembayaran dikirim"],
  ["LUNAS","Pembayaran diterima"],
  ["DIPROSES","Akses diproses"],
  ["SELESAI","Pesanan selesai"],
];

function level(status:string){
  const map:Record<string,number>={MENUNGGU_PEMBAYARAN:0,MENUNGGU_VERIFIKASI:1,LUNAS:2,DIPROSES:3,SELESAI:4,DIBATALKAN:-1};
  return map[status]??0;
}

export default async function OrderPage({params}:{params:Promise<{code:string}>}){
  const {code}=await params;
  const db=getDb();
  if(!db) return <main className="order-page"><div className="order-shell"><h1>Database belum terhubung.</h1><p>Hubungkan DATABASE_URL agar halaman status pesanan aktif.</p></div></main>;
  const [order]=await db.select().from(orders).where(eq(orders.code,code)).limit(1);
  if(!order) notFound();
  const method=order.paymentMethodId?(await db.select().from(paymentMethods).where(eq(paymentMethods.id,order.paymentMethodId)).limit(1))[0]:null;
  const settings=await getSettings();
  const current=level(order.status);
  const waNumber=String(settings.contact?.whatsapp||"").replace(/\D/g,"");
  const waHref=waNumber ? "https://wa.me/"+waNumber+"?text="+encodeURIComponent("Halo Teman Digital, saya ingin bertanya tentang pesanan "+order.code) : "#";

  return <main className="order-page">
    <div className="order-shell">
      <div className="order-brand">Teman Digital</div>
      <div className="order-head"><div><span>KODE PESANAN</span><h1>{order.code}</h1></div><div className={"order-state "+order.status.toLowerCase()}>{order.status.replaceAll("_"," ")}</div></div>
      <div className="order-grid">
        <section className="order-card">
          <span className="checkout-step">STATUS TRANSAKSI</span>
          <div className="order-steps">{steps.map(([key,label],i)=><div className={i<=current?"done":""} key={key}><i>{i<=current?<Check size={14}/>:<Clock3 size={14}/>}</i><span>{label}</span></div>)}</div>
        </section>
        <section className="order-card order-summary-card">
          <span className="checkout-step">RINGKASAN</span>
          <h2>{String((order.productSnapshot as any)?.name||"Produk Teman Digital")}</h2>
          <div className="order-summary-line"><span>Total</span><strong>{rupiah(order.amount)}</strong></div>
          {method&&<div className="payment-instruction"><small>Bayar melalui</small><strong>{method.name}</strong>{method.accountNumber&&<code>{method.accountNumber}</code>}{method.accountName&&<span>a.n. {method.accountName}</span>}{method.instructions&&<p>{method.instructions}</p>}</div>}
        </section>
      </div>
      <div className="order-help"><Mail size={16}/><span>Konfirmasi dan akses dikirim ke <strong>{order.customerEmail}</strong>.</span><a href={waHref}><MessageCircle size={15}/> Butuh bantuan?</a></div>
    </div>
  </main>
}