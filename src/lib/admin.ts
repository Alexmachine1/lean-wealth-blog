import { cookies } from "next/headers";
import crypto from "crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";
const TOKEN_SECRET = process.env.TOKEN_SECRET || "lean-wealth-secret-change-me";

function hashToken(password: string): string {
  return crypto
    .createHash("sha256")
    .update(password + TOKEN_SECRET)
    .digest("hex");
}

function timingSafeEqual(a: string, b: string): boolean {
  try {
    return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
  } catch {
    return false;
  }
}

export function verifyCredentials(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function createToken(password: string): string | null {
  if (!verifyCredentials(password)) return null;
  return hashToken(password);
}

export function verifyToken(token: string): boolean {
  return timingSafeEqual(token, hashToken(ADMIN_PASSWORD));
}

export async function checkAuth(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    if (!token) return false;
    return verifyToken(token);
  } catch {
    return false;
  }
}
