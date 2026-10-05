"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin(){
  const router=useRouter();
  const [email,setEmail]=useState("temandigital26@gmail.com");
  const [password,setPassword]=useState("");
  const [message,setMessage]=useState("");
  const [loading,setLoading]=useState(false);

  async function submit(e:React.FormEvent){
    e.preventDefault(); setLoading(true); setMessage("");
    const r=await fetch("/api/admin/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password})});
    const data=await r.json();
    if(r.ok){ router.push("/admin"); router.refresh(); }
    else setMessage(data.message||"Login gagal.");
    setLoading(false);
  }

  return <main className="admin-login-page">
    <form className="admin-login-card" onSubmit={submit}>
      <div className="admin-brand">Teman Digital</div>
      <span className="admin-kicker">CONTROL CENTER</span>
      <h1>Kelola website tanpa menyentuh kode.</h1>
      <p>Produk, harga, portfolio, link preview, jasa, FAQ, pembayaran, pesanan, dan konten utama dikelola dari sini.</p>
      <label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label>
      <label>Kata sandi<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></label>
      {message&&<div className="admin-error">{message}</div>}
      <button className="button admin-login-button" disabled={loading}>{loading?"Memeriksa...":"Masuk ke Dashboard"}</button>
      <a className="admin-back" href="/">← Kembali ke website</a>
    </form>
  </main>
}
