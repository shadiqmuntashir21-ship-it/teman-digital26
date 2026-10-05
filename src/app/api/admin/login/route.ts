import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { admins } from "@/db/schema";
import { createSession } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const normalized = String(email || "").trim().toLowerCase();
  const db = getDb();

  if (db) {
    try {
      const [admin] = await db.select().from(admins).where(eq(admins.email, normalized)).limit(1);
      if (admin && admin.active && await bcrypt.compare(String(password || ""), admin.passwordHash)) {
        await createSession({ id: admin.id, email: admin.email, name: admin.name });
        return NextResponse.json({ ok: true });
      }
    } catch {}
  }

  if (
    normalized === String(process.env.BOOTSTRAP_ADMIN_EMAIL || "").toLowerCase() &&
    String(password || "") === String(process.env.BOOTSTRAP_ADMIN_PASSWORD || "") &&
    process.env.BOOTSTRAP_ADMIN_PASSWORD
  ) {
    await createSession({ id: 0, email: normalized, name: "Admin Teman Digital" });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false, message: "Email atau kata sandi salah." }, { status: 401 });
}
