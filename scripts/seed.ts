import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

async function main(){
  
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL belum diisi.");
  const sql = neon(url);
  
  const settings = [
    ["brand", {name:"KARVA",tagline:"Ide diwujudkan. Nilai diciptakan.",logoUrl:"",primary:"#0F2747",blue:"#2563EB",cyan:"#38BDF8"}],
    ["hero", {eyebrow:"PRODUK & SOLUSI DIGITAL",title:"Bikin digital jadi lebih mudah.",body:"Produk siap pakai dan solusi digital custom untuk membantu pekerjaan, bisnis, dan ide Anda tumbuh lebih cepat.",primaryLabel:"Jelajahi Produk",primaryHref:"#produk",secondaryLabel:"Konsultasi via WhatsApp"}],
    ["navigation", {
      links:[
        {label:"Produk",href:"/#produk"},
        {label:"Jasa",href:"/jasa"},
        {label:"Portfolio",href:"/portfolio"},
        {label:"Cara Kerja",href:"/#cara-kerja"},
        {label:"FAQ",href:"/#faq"}
      ],
      ctaLabel:"Konsultasi Gratis",
      ctaHref:"/#konsultasi",
      announcementEnabled:false,
      announcementText:"",
      announcementHref:""
    }],
    ["trust", {title:"Produk digital yang benar-benar dibuat untuk digunakan.",tags:["Produktivitas","Pendidikan","Bisnis","Wedding","Dashboard","Web"]}],
    ["process", {steps:[
      {title:"Ceritakan",description:"Tidak perlu brief sempurna."},
      {title:"Kami pahami",description:"Masalah diterjemahkan menjadi solusi."},
      {title:"Kami bangun",description:"Desain dan development dikerjakan."},
      {title:"Anda review",description:"Revisi mengikuti paket yang dipilih."},
      {title:"Launch",description:"Produk siap digunakan."},
      {title:"Tetap ditemani",description:"Bug dalam scope tetap kami bantu."}
    ]}],
    ["commerce", {proofProduct:"Produk mulai Rp39 ribu",proofConsultation:"Konsultasi tanpa biaya",proofWarranty:"Garansi bug sesuai scope"}],
    ["servicesPage", {
      eyebrow:"JASA KARVA",
      title:"Solusi custom, tanpa dibuat rumit.",
      body:"Ceritakan kebutuhanmu. Kami bantu merancang solusi yang tepat dan tetap realistis untuk digunakan.",
      finalEyebrow:"BELUM TAHU PAKETNYA?",
      finalTitle:"Ceritakan masalahnya, bukan teknologinya.",
      finalButton:"Konsultasi Gratis",
      finalWhatsappMessage:"Halo KARVA, saya punya kebutuhan digital tapi belum tahu layanan yang cocok."
    }],
    ["portfolioPage", {
      eyebrow:"PORTFOLIO",
      title:"Masalah nyata. Solusi yang benar-benar dipakai.",
      body:"Kami menampilkan project sebagai studi kasus—bukan sekadar galeri screenshot.",
      caseStudyLabel:"Lihat Studi Kasus",
      previewLabel:"Preview Web",
      extraLinkLabel:"Link tambahan",
      emptyTitle:"Portfolio akan tampil di sini.",
      emptyBody:"Admin dapat menambah project, screenshot, kategori, studi kasus, teknologi, dan link preview dari dashboard."
    }],
    ["contact", {whatsapp:"",email:"temandigital26@gmail.com",instagram:"",tiktok:""}],
    ["footer", {
      note:"Solusi digital yang rapi, modern, dan benar-benar bisa dipakai.",
      copyright:"© 2026 KARVA",
      closingTagline:"Ide diwujudkan. Nilai diciptakan.",
      helpLinks:[{label:"FAQ",href:"/#faq"},{label:"Portfolio",href:"/portfolio"}]
    }],
    ["seo", {title:"KARVA — Produk & Solusi Digital",description:"Produk digital siap pakai dan jasa pembuatan website, dashboard, dan web custom."}]
  ] as const;
  
  for (const [key,value] of settings) {
    await sql`INSERT INTO site_settings (key,value) VALUES (${key},${JSON.stringify(value)}::jsonb)
      ON CONFLICT (key) DO UPDATE SET value=excluded.value, updated_at=now()`;
  }
  
  const productRows = [
    ["dailyn","Dailyn","Produktivitas","Kelola aktivitas, kebiasaan, dan keuangan dalam satu tempat.","Life operating system yang membantu hari terasa lebih terarah.",39000,"Siap Pakai",1],
    ["menuju-kita","Menuju Kita","Wedding Planner","Checklist, budget, tamu, vendor, timeline, dokumen, sampai Hari-H dalam satu ruang.","Wedding planner digital yang terasa personal untuk membantu pasangan menata semua detail menuju hari pernikahan.",49000,"Siap Pakai",2],
    ["kelaskita","KelasKita","Pendidikan","Ruang kerja digital untuk mengelola kelas dan pembelajaran dengan lebih tenang.","Satu aplikasi untuk wali kelas dan guru mata pelajaran mengelola siswa, kehadiran, nilai, remedial, catatan, administrasi, dan laporan.",99000,"Pilihan Guru",3]
  ] as const;
  for (const p of productRows) {
    await sql`INSERT INTO products (slug,name,category,short_description,description,price,badge,featured,published,sort_order)
    VALUES (${p[0]},${p[1]},${p[2]},${p[3]},${p[4]},${p[5]},${p[6]},true,true,${p[7]})
    ON CONFLICT (slug) DO NOTHING`;
  }
  
  const homepageRows = [
    ["choices","MULAI DARI SINI","Sudah jadi, atau bangun milikmu sendiri.","Dua jalur yang jelas. Pilih produk siap pakai untuk mulai cepat, atau ceritakan kebutuhanmu untuk solusi custom.",10],
    ["products","PRODUK SIAP PAKAI","Sudah jadi. Tinggal coba dan gunakan.","Tiga produk KARVA yang bisa dilihat langsung sebelum membeli.",20],
    ["services","JASA CUSTOM","Butuh sesuatu yang khusus?","Harga awal transparan. Scope dibahas lebih dulu supaya solusi yang dibuat tepat, bukan sekadar banyak fitur.",30],
    ["portfolio","SELECTED WORKS","Bukan sekadar dibuat. Harus berguna.","",40],
    ["process","CARA KAMI BEKERJA","Dari cerita singkat sampai siap dipakai.","",50],
    ["warranty","GARANSI KARVA","Bug tidak punya masa garansi.","Jika error terjadi pada fitur yang termasuk scope awal pekerjaan, kami tetap membantu memperbaikinya. Penambahan fitur atau perubahan scope baru tidak termasuk garansi.",60],
    ["testimonials","CERITA PENGGUNA","Yang paling penting: benar-benar membantu.","",70],
    ["faq","FAQ","Sebelum mulai, mungkin ini yang ingin ditanyakan.","Pertanyaan umum tentang produk, jasa, proses pengerjaan, pembayaran, revisi, dan garansi.",80],
    ["consultation","MULAI DARI CERITA","Ada ide? Ceritakan saja dulu.","Tidak harus tahu teknologi apa yang dibutuhkan. Jelaskan masalah atau idenya, kami bantu memikirkan langkah berikutnya.",90]
  ] as const;
  
  for (const h of homepageRows) {
    await sql`INSERT INTO homepage_sections (section_key,eyebrow,title,body,enabled,sort_order)
    VALUES (${h[0]},${h[1]},${h[2]},${h[3]},true,${h[4]})
    ON CONFLICT (section_key) DO NOTHING`;
  }
  
  const serviceRows = [
    ["landing-page","Landing Page","Halaman penjualan, promosi, atau profil yang fokus pada konversi.",150000,"2–4 hari kerja","Maks. 5 revisi",1],
    ["dashboard","Dashboard","Dashboard operasional, monitoring, analitik, atau administrasi sesuai kebutuhan.",249000,"4–7 hari kerja","Maks. 5 revisi",2],
    ["web-custom","Web Custom","Aplikasi atau website custom yang dibangun mengikuti kebutuhan spesifik.",399000,"Maks. 7 hari kerja","Maks. 10 revisi",3]
  ] as const;
  for (const s of serviceRows) {
    await sql`INSERT INTO services (slug,name,description,starting_price,duration,revisions,warranty,published,sort_order)
    VALUES (${s[0]},${s[1]},${s[2]},${s[3]},${s[4]},${s[5]},'Garansi selamanya untuk bug/error pada fitur dalam scope awal.',true,${s[6]})
    ON CONFLICT (slug) DO NOTHING`;
  }
  
  const email=process.env.BOOTSTRAP_ADMIN_EMAIL;
  const password=process.env.BOOTSTRAP_ADMIN_PASSWORD;
  if(email && password){
    const hash=await bcrypt.hash(password,12);
    await sql`INSERT INTO admins (email,password_hash,name,active) VALUES (${email.toLowerCase()},${hash},'Admin KARVA',true)
    ON CONFLICT (email) DO UPDATE SET password_hash=excluded.password_hash, active=true`;
  }
  console.log("Seed KARVA selesai.");
  
}

main().catch((error)=>{
  console.error(error);
  process.exit(1);
});
