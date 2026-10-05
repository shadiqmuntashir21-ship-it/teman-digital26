"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud } from "lucide-react";

export function PaymentProofForm({code,token}:{code:string;token:string}){
  const router=useRouter();
  const [file,setFile]=useState<File|null>(null);
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState("");

  async function submit(e:React.FormEvent){
    e.preventDefault();
    if(!file){setMessage("Pilih file bukti pembayaran.");return}
    setBusy(true); setMessage("");
    const body=new FormData();
    body.append("token",token);
    body.append("file",file);
    const r=await fetch("/api/orders/"+encodeURIComponent(code)+"/payment-proof",{method:"POST",body});
    const data=await r.json();
    setBusy(false);
    if(!r.ok){setMessage(data.message||"Bukti belum dapat dikirim.");return}
    setMessage("Bukti pembayaran sudah dikirim dan menunggu verifikasi admin.");
    router.refresh();
  }

  return <form className="proof-form" onSubmit={submit}>
    <div>
      <span className="checkout-step">KONFIRMASI PEMBAYARAN</span>
      <h3>Sudah transfer?</h3>
      <p>Upload bukti pembayaran agar admin dapat melakukan verifikasi.</p>
    </div>
    <label className="proof-drop">
      <UploadCloud size={20}/>
      <span>{file?file.name:"Pilih JPG, PNG, WEBP, atau PDF"}</span>
      <input type="file" accept="image/jpeg,image/png,image/webp,application/pdf" onChange={e=>setFile(e.target.files?.[0]||null)}/>
    </label>
    {message&&<div className="proof-message">{message}</div>}
    <button className="button" disabled={busy}>{busy?"Mengirim...":"Kirim Bukti Pembayaran"}</button>
  </form>
}
