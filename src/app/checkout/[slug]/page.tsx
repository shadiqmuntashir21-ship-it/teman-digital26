import { notFound } from "next/navigation";
import { getPaymentMethods, getProduct, getSettings } from "@/lib/cms";
import { SiteHeader } from "@/components/site-header";
import { CheckoutForm } from "@/components/checkout-form";
import { rupiah } from "@/lib/format";

export const dynamic="force-dynamic";

export default async function CheckoutPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const [product,paymentMethods,settings]=await Promise.all([getProduct(slug),getPaymentMethods(),getSettings()]);
  if(!product) notFound();
  return <main>
    <SiteHeader settings={settings}/>
    <section className="checkout-hero section-dark"><div className="container checkout-title"><div><div className="eyebrow light">CHECKOUT AMAN</div><h1>{(product as any).name}</h1><p>Isi data pembeli, pilih metode pembayaran, lalu pantau status transaksi dengan kode pesanan.</p></div><strong>{rupiah((product as any).price)}</strong></div></section>
    <section className="section checkout-section"><div className="container"><CheckoutForm product={product} paymentMethods={paymentMethods}/></div></section>
  </main>
}