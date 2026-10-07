import { neon } from "@neondatabase/serverless";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let cached: NeonHttpDatabase<typeof schema> | null | undefined;

export function getDb() {
  if (cached !== undefined) return cached;
  const url = process.env.KARVA_DATABASE_URL || process.env.DATABASE_URL;
  if (!url) {
    cached = null;
    return cached;
  }
  cached = drizzle(neon(url), { schema });
  return cached;
}
