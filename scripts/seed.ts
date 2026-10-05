import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL belum diisi.");
const sql = neon(url);

const settings = [
  ["brand", {name:"Teman Digital",tagline:"Bangun Lebih Baik. Tumbuh Lebih Cepat.",logoUrl:"",primary:"#0F2747",blue:"#2563EB",cyan:"#38BDF8"}],
  ["hero", {eyebrow:"PRODUK & SOLUSI DIGITAL",title:"Bikin digital jadi lebih mudah.",body:"Produk siap pakai dan solusi digital custom untuk membantu pekerjaan, bisnis, dan ide Anda tumbuh lebih cepat.",primaryLabel:"Jelajahi Produk",primaryHref:"#produk",secondaryLabel:"Konsultasi via WhatsApp"}],
  ["contact", {whatsapp:"",email:"temandigital26@gmail.com",instagram:"",tiktok:""}],
  ["footer", {note:"Solusi digital yang rapi, modern, dan benar-benar bisa dipakai."}],
  ["seo", {title:"Teman Digital — Produk & Solusi Digital",description:"Produk digital siap pakai dan jasa pembuatan website, dashboard, dan web custom."}]
] as const;

for (const [key,value] of settings) {
  await sql`INSERT INTO site_settings (key,value) VALUES (${key},${JSON.stringify(value)}::jsonb)
    ON CONFLICT (key) DO UPDATE SET value=excluded.value, updated_at=now()`;
}

const productRows = [
  ["dailyn","Dailyn","Produktivitas","Kelola aktivitas, kebiasaan, dan keuangan dalam satu tempat.","Life operating system yang membantu hari terasa lebih terarah.",39000,"Siap Pakai",1],
  ["growva","Growva","Bisnis","Produk digital untuk membantu bisnis bertumbuh lebih teratur.","Solusi praktis untuk kebutuhan pengelolaan dan pertumbuhan bisnis.",39000,"Siap Pakai",2],
  ["menuju-kita","Menuju Kita","Wedding","Wedding planner digital yang rapi dari persiapan sampai hari bahagia.","Ruang kerja digital untuk pasangan mengelola persiapan pernikahan dengan lebih tenang.",49000,"Premium",3],
  ["kelaskita","KelasKita","Pendidikan","Administrasi wali kelas yang tidak lagi berantakan.","Satu aplikasi untuk membantu wali kelas mengelola data siswa dan administrasi kelas.",99000,"Pilihan Guru",4]
] as const;
for (const p of productRows) {
  await sql`INSERT INTO products (slug,name,category,short_description,description,price,badge,featured,published,sort_order)
  VALUES (${p[0]},${p[1]},${p[2]},${p[3]},${p[4]},${p[5]},${p[6]},true,true,${p[7]})
  ON CONFLICT (slug) DO NOTHING`;
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
  await sql`INSERT INTO admins (email,password_hash,name,active) VALUES (${email.toLowerCase()},${hash},'Admin Teman Digital',true)
  ON CONFLICT (email) DO UPDATE SET password_hash=excluded.password_hash, active=true`;
}
console.log("Seed Teman Digital selesai.");
