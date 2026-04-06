import { cookies } from "next/headers";
import { GATE_COOKIE_NAME, gateIsEnabled } from "@/lib/gate";
import { verifyJWT } from "@/lib/verifyJWT";

/** Server-only: true if gate is off, or cookie verifies with GATE_JWT_SECRET */
export async function verifyGateCookie(): Promise<boolean> {
  if (!gateIsEnabled()) return true;
  const secret = process.env.GATE_JWT_SECRET?.trim();
  const token = (await cookies()).get(GATE_COOKIE_NAME)?.value;
  return verifyJWT(token, secret);
}
