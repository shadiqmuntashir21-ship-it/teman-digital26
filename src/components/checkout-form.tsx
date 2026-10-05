"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { rupiah } from "@/lib/format";

export function CheckoutForm({product,paymentMethods}:{product:any;paymentMethods:any[]}){
  const router=useRouter();
  const [form,setForm]=useState({customerName:"",customerEmail:"",customerWhatsapp:"",paymentMethodId:paymentMethods[0]?.id||""});
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");

  async function submit(e:React.FormEvent){
    e.preventDefault(); setLoading(true); setError("");
    const r=await fetch("/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,productId:product.id})});
    const d=await r.json();
    if(r.ok){router.push("/order/"+d.code);return}
    setError(d.message||"Pesanan belum dapat dibuat."); setLoading(false);
  }

  return <form className="checkout-form" onSubmit={submit}>
    <div className="checkout-card">
      <span className="checkout-step">01 · DATA PEMBELI</span>
      <h2>Ke mana akses dikirim?</h2>
      <div className="checkout-fields">
        <label>Nama lengkap<input required value={form.customerName} onChange={e=>setForm(x=>({...x,customerName:e.target.value}))}/></label>
        <label>Email<input required type="email" value={form.customerEmail} onChange={e=>setForm(x=>({...x,customerEmail:e.target.value}))}/></label>
        <label>WhatsApp<input required placeholder="08..." value={form.customerWhatsapp} onChange={e=>setForm(x=>({...x,customerWhatsapp:e.target.value}))}/></label>
      </div>
    </div>

    <div className="checkout-card">
      <span className="checkout-step">02 · PEMBAYARAN</span>
      <h2>Pilih metode pembayaran.</h2>
      {paymentMethods.length ? <div className="payment-options">
        {paymentMethods.map(m=><label className={String(form.paymentMethodId)===String(m.id)?"selected":""} key={m.id}>
          <input type="radio" name="payment" value={m.id} checked={String(form.paymentMethodId)===String(m.id)} onChange={()=>setForm(x=>({...x,paymentMethodId:m.id}))}/>
          <div><strong>{m.name}</strong><span>{m.type}</span>{m.accountNumber&&<small>{m.accountNumber} · {m.accountName}</small>}</div>
          <CheckCircle2 size={18}/>
        </label>)}
      </div>:<div className="checkout-empty">Metode pembayaran akan muncul setelah ditambahkan dari Dashboard Admin.</div>}
    </div>

    <div className="checkout-summary">
      <div><span>{product.name}</span><strong>{rupiah(product.price)}</strong></div>
      <p>Dengan melanjutkan, pesanan akan dibuat dan dapat dipantau melalui halaman status transaksi.</p>
      {error&&<div className="checkout-error">{error}</div>}
      <button className="button" disabled={loading||!paymentMethods.length}>{loading?"Membuat pesanan...":"Buat Pesanan"} <ArrowRight size={17}/></button>
    </div>
  </form>
}