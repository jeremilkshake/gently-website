import { NextResponse } from "next/server";
import { GATE_COOKIE_NAME } from "@/lib/gate";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(GATE_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
