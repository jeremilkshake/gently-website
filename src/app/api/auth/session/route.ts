import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { GATE_COOKIE_NAME } from "@/lib/gate";

/** Lets the client know if a valid gate session cookie is present (middleware stays authoritative). */
export async function GET() {
  if (process.env.GATE_ENABLED === "false") {
    return NextResponse.json({ ok: false });
  }
  const secret = process.env.GATE_JWT_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false });
  }
  const token = (await cookies()).get(GATE_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ ok: false });
  }
  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
