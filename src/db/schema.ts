import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  numeric,
  varchar,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 120 }).notNull(),
  value: jsonb("value").$type<Record<string, unknown>>().notNull().default({}),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (t) => [uniqueIndex("site_settings_key_idx").on(t.key)]);

export const homepageSections = pgTable("homepage_sections", {
  id: serial("id").primaryKey(),
  sectionKey: varchar("section_key", { length: 80 }).notNull(),
  title: text("title"),
  eyebrow: text("eyebrow"),
  body: text("body"),
  enabled: boolean("enabled").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  config: jsonb("config").$type<Record<string, unknown>>().notNull().default({}),
}, (t) => [uniqueIndex("homepage_sections_key_idx").on(t.sectionKey)]);

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull(),
  name: varchar("name", { length: 160 }).notNull(),
  category: varchar("category", { length: 120 }).notNull().default("Produk Digital"),
  shortDescription: text("short_description").notNull().default(""),
  description: text("description").notNull().default(""),
  price: numeric("price", { precision: 14, scale: 0 }).notNull().default("0"),
  compareAtPrice: numeric("compare_at_price", { precision: 14, scale: 0 }),
  badge: varchar("badge", { length: 80 }),
  imageUrl: text("image_url"),
  gallery: jsonb("gallery").$type<string[]>().notNull().default([]),
  demoUrl: text("demo_url"),
  appUrl: text("app_url"),
  checkoutEnabled: boolean("checkout_enabled").notNull().default(true),
  featured: boolean("featured").notNull().default(false),
  published: boolean("published").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  features: jsonb("features").$type<string[]>().notNull().default([]),
  audience: jsonb("audience").$type<string[]>().notNull().default([]),
  faq: jsonb("faq").$type<Array<{q:string;a:string}>>().notNull().default([]),
  seo: jsonb("seo").$type<Record<string, string>>().notNull().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (t) => [uniqueIndex("products_slug_idx").on(t.slug)]);

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull(),
  name: varchar("name", { length: 160 }).notNull(),
  description: text("description").notNull().default(""),
  startingPrice: numeric("starting_price", { precision: 14, scale: 0 }).notNull().default("0"),
  duration: varchar("duration", { length: 120 }).notNull().default(""),
  revisions: varchar("revisions", { length: 120 }).notNull().default(""),
  warranty: text("warranty").notNull().default(""),
  features: jsonb("features").$type<string[]>().notNull().default([]),
  whatsappMessage: text("whatsapp_message"),
  published: boolean("published").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
}, (t) => [uniqueIndex("services_slug_idx").on(t.slug)]);

export const portfolios = pgTable("portfolios", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 140 }).notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  category: varchar("category", { length: 120 }).notNull().default("Website"),
  summary: text("summary").notNull().default(""),
  challenge: text("challenge").notNull().default(""),
  solution: text("solution").notNull().default(""),
  result: text("result").notNull().default(""),
  coverUrl: text("cover_url"),
  gallery: jsonb("gallery").$type<string[]>().notNull().default([]),
  previewUrl: text("preview_url"),
  sourceUrl: text("source_url"),
  technologies: jsonb("technologies").$type<string[]>().notNull().default([]),
  featured: boolean("featured").notNull().default(false),
  published: boolean("published").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (t) => [uniqueIndex("portfolios_slug_idx").on(t.slug)]);

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  role: varchar("role", { length: 160 }),
  company: varchar("company", { length: 160 }),
  quote: text("quote").notNull(),
  avatarUrl: text("avatar_url"),
  productOrService: varchar("product_or_service", { length: 160 }),
  published: boolean("published").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: varchar("category", { length: 100 }).notNull().default("Umum"),
  published: boolean("published").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const paymentMethods = pgTable("payment_methods", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 140 }).notNull(),
  type: varchar("type", { length: 80 }).notNull().default("transfer"),
  accountName: varchar("account_name", { length: 180 }),
  accountNumber: varchar("account_number", { length: 180 }),
  instructions: text("instructions"),
  logoUrl: text("logo_url"),
  enabled: boolean("enabled").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 40 }).notNull(),
  customerName: varchar("customer_name", { length: 180 }).notNull(),
  customerEmail: varchar("customer_email", { length: 220 }).notNull(),
  customerWhatsapp: varchar("customer_whatsapp", { length: 80 }).notNull(),
  productId: integer("product_id"),
  productSnapshot: jsonb("product_snapshot").$type<Record<string, unknown>>().notNull().default({}),
  amount: numeric("amount", { precision: 14, scale: 0 }).notNull().default("0"),
  paymentMethodId: integer("payment_method_id"),
  paymentProofUrl: text("payment_proof_url"),
  status: varchar("status", { length: 60 }).notNull().default("MENUNGGU_PEMBAYARAN"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (t) => [uniqueIndex("orders_code_idx").on(t.code)]);

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  source: varchar("source", { length: 120 }),
  page: text("page"),
  cta: varchar("cta", { length: 120 }),
  subject: varchar("subject", { length: 160 }),
  utm: jsonb("utm").$type<Record<string, string>>().notNull().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 220 }).notNull(),
  passwordHash: text("password_hash").notNull(),
  name: varchar("name", { length: 160 }).notNull().default("Admin Teman Digital"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (t) => [uniqueIndex("admins_email_idx").on(t.email)]);
