import { jwtVerify } from "jose";

/** Returns true if `token` is a valid JWT signed with `secret`. */
export async function verifyJWT(
  token: string | undefined,
  secret: string | undefined,
): Promise<boolean> {
  if (!token || !secret) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return true;
  } catch {
    return false;
  }
}
