import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE = "td_admin_session";

function secret() {
  return new TextEncoder().encode(process.env.SESSION_SECRET || "dev-only-change-me");
}

export async function createSession(payload: { id:number; email:string; name:string }) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());

  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function getSession() {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload as unknown as { id:number; email:string; name:string };
  } catch {
    return null;
  }
}
