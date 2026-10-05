import { asc, eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { faqs, homepageSections, paymentMethods, portfolios, products, services, siteSettings, testimonials } from "@/db/schema";
import { defaultProducts, defaultServices, defaultSettings } from "./site-defaults";

export async function getSettings() {
  const db = getDb();
  if (!db) return defaultSettings;
  try {
    const rows = await db.select().from(siteSettings);
    const merged: any = structuredClone(defaultSettings);
    for (const row of rows) merged[row.key] = { ...(merged[row.key] || {}), ...(row.value || {}) };
    return merged;
  } catch {
    return defaultSettings;
  }
}

export async function getProducts() {
  const db = getDb();
  if (!db) return defaultProducts;
  try {
    const rows = await db.select().from(products).where(eq(products.published, true)).orderBy(asc(products.sortOrder));
    return rows.length ? rows : defaultProducts;
  } catch { return defaultProducts; }
}

export async function getProduct(slug: string) {
  const list = await getProducts();
  return list.find((x:any) => x.slug === slug) || null;
}

export async function getServices() {
  const db = getDb();
  if (!db) return defaultServices;
  try {
    const rows = await db.select().from(services).where(eq(services.published, true)).orderBy(asc(services.sortOrder));
    return rows.length ? rows : defaultServices;
  } catch { return defaultServices; }
}

export async function getPortfolios() {
  const db = getDb();
  if (!db) return [];
  try { return await db.select().from(portfolios).where(eq(portfolios.published, true)).orderBy(asc(portfolios.sortOrder)); }
  catch { return []; }
}

export async function getPortfolio(slug:string) {
  const list = await getPortfolios();
  return list.find((x:any) => x.slug === slug) || null;
}

export async function getTestimonials() {
  const db = getDb();
  if (!db) return [];
  try { return await db.select().from(testimonials).where(eq(testimonials.published, true)).orderBy(asc(testimonials.sortOrder)); }
  catch { return []; }
}

export async function getFaqs() {
  const db = getDb();
  if (!db) return [];
  try { return await db.select().from(faqs).where(eq(faqs.published, true)).orderBy(asc(faqs.sortOrder)); }
  catch { return []; }
}

export async function getPaymentMethods() {
  const db = getDb();
  if (!db) return [];
  try { return await db.select().from(paymentMethods).where(eq(paymentMethods.enabled, true)).orderBy(asc(paymentMethods.sortOrder)); }
  catch { return []; }
}

export async function getHomepageSections() {
  const db = getDb();
  if (!db) return [];
  try { return await db.select().from(homepageSections).orderBy(asc(homepageSections.sortOrder)); }
  catch { return []; }
}
