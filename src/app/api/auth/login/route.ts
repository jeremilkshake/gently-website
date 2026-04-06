import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { timingSafeEqual } from "node:crypto";
import { GATE_COOKIE_NAME } from "@/lib/gate";

export async function POST(request: Request) {
  if (process.env.GATE_ENABLED === "false") {
    return NextResponse.json({ ok: true });
  }

  const rawPassword = process.env.SITE_ACCESS_PASSWORD;
  const expected = typeof rawPassword === "string" ? rawPassword.trim() : "";
  const secret = process.env.GATE_JWT_SECRET?.trim();

  if (!expected || !secret) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const given = body.password ?? "";
  const a = Buffer.from(given, "utf8");
  const b = Buffer.from(expected, "utf8");

  /* timingSafeEqual throws if lengths differ — treat as failed auth, not 500 */
  if (a.length !== b.length) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (!timingSafeEqual(a, b)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const token = await new SignJWT({ gate: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    /* Short-lived token; cookie is session-only (no maxAge) so closing the browser ends access */
    .setExpirationTime("8h")
    .sign(new TextEncoder().encode(secret));

  const res = NextResponse.json({ ok: true });
  const secure = process.env.NODE_ENV === "production";

  res.cookies.set(GATE_COOKIE_NAME, token, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
  });

  return res;
}
