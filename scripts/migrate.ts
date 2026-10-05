import { neon } from "@neondatabase/serverless";

async function main(){
  
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL belum diisi.");
  const sql = neon(url);
  
  await sql.transaction([
    sql`CREATE TABLE IF NOT EXISTS site_settings (
      id serial PRIMARY KEY,
      key varchar(120) NOT NULL UNIQUE,
      value jsonb NOT NULL DEFAULT '{}'::jsonb,
      updated_at timestamptz NOT NULL DEFAULT now()
    )`,
    sql`CREATE TABLE IF NOT EXISTS homepage_sections (
      id serial PRIMARY KEY,
      section_key varchar(80) NOT NULL UNIQUE,
      title text,
      eyebrow text,
      body text,
      enabled boolean NOT NULL DEFAULT true,
      sort_order integer NOT NULL DEFAULT 0,
      config jsonb NOT NULL DEFAULT '{}'::jsonb
    )`,
    sql`CREATE TABLE IF NOT EXISTS products (
      id serial PRIMARY KEY,
      slug varchar(120) NOT NULL UNIQUE,
      name varchar(160) NOT NULL,
      category varchar(120) NOT NULL DEFAULT 'Produk Digital',
      short_description text NOT NULL DEFAULT '',
      description text NOT NULL DEFAULT '',
      price numeric(14,0) NOT NULL DEFAULT 0,
      compare_at_price numeric(14,0),
      badge varchar(80),
      image_url text,
      gallery jsonb NOT NULL DEFAULT '[]'::jsonb,
      demo_url text,
      app_url text,
      checkout_enabled boolean NOT NULL DEFAULT true,
      featured boolean NOT NULL DEFAULT false,
      published boolean NOT NULL DEFAULT true,
      sort_order integer NOT NULL DEFAULT 0,
      features jsonb NOT NULL DEFAULT '[]'::jsonb,
      audience jsonb NOT NULL DEFAULT '[]'::jsonb,
      faq jsonb NOT NULL DEFAULT '[]'::jsonb,
      seo jsonb NOT NULL DEFAULT '{}'::jsonb,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    )`,
    sql`CREATE TABLE IF NOT EXISTS services (
      id serial PRIMARY KEY,
      slug varchar(120) NOT NULL UNIQUE,
      name varchar(160) NOT NULL,
      description text NOT NULL DEFAULT '',
      starting_price numeric(14,0) NOT NULL DEFAULT 0,
      duration varchar(120) NOT NULL DEFAULT '',
      revisions varchar(120) NOT NULL DEFAULT '',
      warranty text NOT NULL DEFAULT '',
      features jsonb NOT NULL DEFAULT '[]'::jsonb,
      whatsapp_message text,
      published boolean NOT NULL DEFAULT true,
      sort_order integer NOT NULL DEFAULT 0
    )`,
    sql`CREATE TABLE IF NOT EXISTS portfolios (
      id serial PRIMARY KEY,
      slug varchar(140) NOT NULL UNIQUE,
      title varchar(200) NOT NULL,
      category varchar(120) NOT NULL DEFAULT 'Website',
      summary text NOT NULL DEFAULT '',
      challenge text NOT NULL DEFAULT '',
      solution text NOT NULL DEFAULT '',
      result text NOT NULL DEFAULT '',
      cover_url text,
      gallery jsonb NOT NULL DEFAULT '[]'::jsonb,
      preview_url text,
      source_url text,
      technologies jsonb NOT NULL DEFAULT '[]'::jsonb,
      featured boolean NOT NULL DEFAULT false,
      published boolean NOT NULL DEFAULT true,
      sort_order integer NOT NULL DEFAULT 0,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    )`,
    sql`CREATE TABLE IF NOT EXISTS testimonials (
      id serial PRIMARY KEY,
      name varchar(160) NOT NULL,
      role varchar(160),
      company varchar(160),
      quote text NOT NULL,
      avatar_url text,
      product_or_service varchar(160),
      published boolean NOT NULL DEFAULT true,
      sort_order integer NOT NULL DEFAULT 0
    )`,
    sql`CREATE TABLE IF NOT EXISTS faqs (
      id serial PRIMARY KEY,
      question text NOT NULL,
      answer text NOT NULL,
      category varchar(100) NOT NULL DEFAULT 'Umum',
      published boolean NOT NULL DEFAULT true,
      sort_order integer NOT NULL DEFAULT 0
    )`,
    sql`CREATE TABLE IF NOT EXISTS payment_methods (
      id serial PRIMARY KEY,
      name varchar(140) NOT NULL,
      type varchar(80) NOT NULL DEFAULT 'transfer',
      account_name varchar(180),
      account_number varchar(180),
      instructions text,
      logo_url text,
      enabled boolean NOT NULL DEFAULT true,
      sort_order integer NOT NULL DEFAULT 0
    )`,
    sql`CREATE TABLE IF NOT EXISTS orders (
      id serial PRIMARY KEY,
      code varchar(40) NOT NULL UNIQUE,
      access_token varchar(80) NOT NULL UNIQUE,
      customer_name varchar(180) NOT NULL,
      customer_email varchar(220) NOT NULL,
      customer_whatsapp varchar(80) NOT NULL,
      product_id integer,
      product_snapshot jsonb NOT NULL DEFAULT '{}'::jsonb,
      amount numeric(14,0) NOT NULL DEFAULT 0,
      payment_method_id integer,
      payment_proof_url text,
      status varchar(60) NOT NULL DEFAULT 'MENUNGGU_PEMBAYARAN',
      notes text,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    )`,
    sql`CREATE TABLE IF NOT EXISTS leads (
      id serial PRIMARY KEY,
      source varchar(120),
      page text,
      cta varchar(120),
      subject varchar(160),
      utm jsonb NOT NULL DEFAULT '{}'::jsonb,
      created_at timestamptz NOT NULL DEFAULT now()
    )`,
    sql`CREATE TABLE IF NOT EXISTS admins (
      id serial PRIMARY KEY,
      email varchar(220) NOT NULL UNIQUE,
      password_hash text NOT NULL,
      name varchar(160) NOT NULL DEFAULT 'Admin Teman Digital',
      active boolean NOT NULL DEFAULT true,
      created_at timestamptz NOT NULL DEFAULT now()
    )`,
    sql`CREATE TABLE IF NOT EXISTS audit_logs (
      id serial PRIMARY KEY,
      admin_email varchar(220) NOT NULL,
      entity varchar(100) NOT NULL,
      action varchar(40) NOT NULL,
      entity_id integer,
      summary text,
      before jsonb,
      after jsonb,
      created_at timestamptz NOT NULL DEFAULT now()
    )`,
  ]);
  
  // Backward-compatible patch if an early development database already had an orders table.
  await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS access_token varchar(80)`;
  await sql`UPDATE orders SET access_token = md5(random()::text || clock_timestamp()::text || id::text) WHERE access_token IS NULL`;
  await sql`ALTER TABLE orders ALTER COLUMN access_token SET NOT NULL`;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS orders_access_token_idx ON orders(access_token)`;
  
  console.log("Database Teman Digital siap.");
  
}

main().catch((error)=>{
  console.error(error);
  process.exit(1);
});
