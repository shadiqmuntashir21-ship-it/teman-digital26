type EmailArgs = {
  to:string | string[];
  subject:string;
  html:string;
  tags?:Array<{name:string;value:string}>;
};

export async function sendTransactionalEmail(args:EmailArgs){
  const apiKey=process.env.RESEND_API_KEY;
  const from=process.env.EMAIL_FROM;
  if(!apiKey || !from) return {ok:false,skipped:true as const};

  try{
    const r=await fetch("https://api.resend.com/emails",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${apiKey}`,
      },
      body:JSON.stringify({
        from,
        to:Array.isArray(args.to)?args.to:[args.to],
        subject:args.subject,
        html:args.html,
        tags:args.tags,
      }),
    });
    if(!r.ok) return {ok:false,skipped:false as const,status:r.status};
    return {ok:true,skipped:false as const};
  }catch{
    return {ok:false,skipped:false as const};
  }
}

function shell(title:string,body:string){
  return `<!doctype html><html><body style="margin:0;background:#f4f7fb;font-family:Arial,sans-serif;color:#0b1324"><div style="max-width:620px;margin:auto;padding:32px 18px"><div style="background:#0F2747;color:#fff;border-radius:22px 22px 0 0;padding:26px 28px"><div style="font-size:20px;font-weight:800">KARVA</div><div style="margin-top:5px;color:#9fdcff;font-size:12px">Ide diwujudkan. Nilai diciptakan.</div></div><div style="background:#fff;border:1px solid #e5e7eb;border-top:0;border-radius:0 0 22px 22px;padding:28px"><h1 style="font-size:25px;margin:0 0 16px">${title}</h1>${body}<p style="font-size:11px;color:#8090a3;margin:28px 0 0">Email otomatis dari sistem transaksi KARVA.</p></div></div></body></html>`;
}

export async function emailOrderCreated(input:{code:string;customerName:string;customerEmail:string;productName:string;amount:string;accessToken:string}){
  const site=process.env.NEXT_PUBLIC_SITE_URL || "https://teman-digital26.vercel.app";
  const link=`${site}/order/${encodeURIComponent(input.code)}?token=${encodeURIComponent(input.accessToken)}`;
  await sendTransactionalEmail({
    to:input.customerEmail,
    subject:`Pesanan ${input.code} sudah dibuat — KARVA`,
    html:shell("Pesanan berhasil dibuat.",`<p style="line-height:1.7;color:#526174">Halo ${escapeHtml(input.customerName)}, pesanan <strong>${escapeHtml(input.productName)}</strong> sudah kami catat. Silakan selesaikan pembayaran melalui halaman status transaksi.</p><p><a href="${link}" style="display:inline-block;background:#2563EB;color:#fff;text-decoration:none;padding:12px 18px;border-radius:999px;font-weight:700">Lihat Status Pesanan</a></p>`),
    tags:[{name:"category",value:"order_created"}],
  });

  const admin=process.env.ADMIN_NOTIFICATION_EMAIL || process.env.BOOTSTRAP_ADMIN_EMAIL;
  if(admin) await sendTransactionalEmail({
    to:admin,
    subject:`Order baru ${input.code} — ${input.productName}`,
    html:shell("Ada pesanan baru.",`<p style="line-height:1.7;color:#526174">Order <strong>${escapeHtml(input.code)}</strong> untuk ${escapeHtml(input.productName)} baru saja dibuat. Cek Dashboard Admin untuk detail transaksi.</p>`),
    tags:[{name:"category",value:"admin_order"}],
  });
}

export async function emailPaymentProofReceived(input:{code:string;productName:string}){
  const admin=process.env.ADMIN_NOTIFICATION_EMAIL || process.env.BOOTSTRAP_ADMIN_EMAIL;
  if(!admin) return;
  await sendTransactionalEmail({
    to:admin,
    subject:`Bukti pembayaran masuk — ${input.code}`,
    html:shell("Pembayaran perlu diverifikasi.",`<p style="line-height:1.7;color:#526174">Bukti pembayaran untuk <strong>${escapeHtml(input.code)}</strong> (${escapeHtml(input.productName)}) sudah diunggah. Buka Dashboard Admin untuk memeriksa bukti dan mengubah status.</p>`),
    tags:[{name:"category",value:"payment_proof"}],
  });
}

export async function emailOrderStatus(input:{code:string;customerEmail:string;customerName:string;productName:string;status:string;accessToken:string}){
  const labels:Record<string,{subject:string;title:string;copy:string}>={
    LUNAS:{subject:"Pembayaran sudah diterima",title:"Pembayaran berhasil diverifikasi.",copy:"Pembayaran Anda sudah kami terima. Pesanan akan dilanjutkan ke tahap pemrosesan akses."},
    DIPROSES:{subject:"Pesanan sedang diproses",title:"Akses sedang kami siapkan.",copy:"Pesanan Anda sedang diproses oleh KARVA. Kami akan memperbarui status setelah akses siap."},
    SELESAI:{subject:"Pesanan sudah selesai",title:"Pesanan Anda sudah selesai.",copy:"Terima kasih sudah mempercayai KARVA. Silakan cek informasi akses pada kanal yang kami kirimkan."},
    DIBATALKAN:{subject:"Status pesanan diperbarui",title:"Pesanan dibatalkan.",copy:"Pesanan ini telah dibatalkan. Jika Anda merasa ada kekeliruan, silakan hubungi KARVA melalui WhatsApp."},
  };
  const item=labels[input.status];
  if(!item) return;
  const site=process.env.NEXT_PUBLIC_SITE_URL || "https://teman-digital26.vercel.app";
  const link=`${site}/order/${encodeURIComponent(input.code)}?token=${encodeURIComponent(input.accessToken)}`;
  await sendTransactionalEmail({
    to:input.customerEmail,
    subject:`${item.subject} — ${input.code}`,
    html:shell(item.title,`<p style="line-height:1.7;color:#526174">Halo ${escapeHtml(input.customerName)}, ${item.copy}</p><p style="line-height:1.7;color:#526174"><strong>${escapeHtml(input.productName)}</strong> · ${escapeHtml(input.code)}</p><p><a href="${link}" style="display:inline-block;background:#2563EB;color:#fff;text-decoration:none;padding:12px 18px;border-radius:999px;font-weight:700">Lihat Status Pesanan</a></p>`),
    tags:[{name:"category",value:"order_status"}],
  });
}

function escapeHtml(value:string){
  return value.replace(/[&<>"']/g,(ch)=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[ch]||ch));
}
