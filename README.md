# Teman Digital 2026

Website penjualan utama dan Control Center untuk ekosistem **Teman Digital**.

## Stack
- Next.js App Router + TypeScript
- Neon PostgreSQL
- Drizzle ORM
- Vercel
- Admin CMS internal

## Fitur utama
- Homepage sales-focused dengan Product Universe
- Produk siap pakai + halaman detail
- Jasa custom
- Portfolio + screenshot + URL preview/live website
- Testimoni & FAQ
- Checkout + order tracking
- Lead tracking untuk CTA WhatsApp
- Dashboard Admin/CMS untuk konten yang sering berubah
- Metode pembayaran dikelola admin
- Site settings, brand, kontak dan SEO dikelola admin

## Environment
Salin `.env.example` lalu isi:
- `DATABASE_URL`
- `SESSION_SECRET`
- `BOOTSTRAP_ADMIN_EMAIL`
- `BOOTSTRAP_ADMIN_PASSWORD`
- `NEXT_PUBLIC_SITE_URL`

## Database
Jalankan:

```bash
npm run db:migrate
npm run db:seed
```

## Admin
Buka `/admin/login`.

Identitas resmi: **Teman Digital — “Bangun Lebih Baik. Tumbuh Lebih Cepat.”**
