import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { GATE_COOKIE_NAME } from "@/lib/gate";
import { verifyJWT } from "@/lib/verifyJWT";

/** Lets the client know if a valid gate session cookie is present (middleware stays authoritative). */
export async function GET() {
  if (process.env.GATE_ENABLED === "false") {
    return NextResponse.json({ ok: false });
  }
  const secret = process.env.GATE_JWT_SECRET?.trim();
  const token = (await cookies()).get(GATE_COOKIE_NAME)?.value;
  const ok = await verifyJWT(token, secret);
  return NextResponse.json({ ok });
}
