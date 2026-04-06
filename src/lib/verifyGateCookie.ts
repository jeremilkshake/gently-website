import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { GATE_COOKIE_NAME, gateIsEnabled } from "@/lib/gate";

/** Server-only: true if gate is off, or cookie verifies with GATE_JWT_SECRET */
export async function verifyGateCookie(): Promise<boolean> {
  if (!gateIsEnabled()) return true;
  const secret = process.env.GATE_JWT_SECRET?.trim();
  if (!secret) return false;
  const token = (await cookies()).get(GATE_COOKIE_NAME)?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return true;
  } catch {
    return false;
  }
}
