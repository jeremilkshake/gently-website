import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { GATE_COOKIE_NAME, gateIsEnabled } from "@/lib/gate";

function isPublicPath(pathname: string): boolean {
  if (pathname === "/") return true;
  if (pathname.startsWith("/api/auth/login")) return true;
  if (pathname.startsWith("/api/auth/logout")) return true;
  if (pathname.startsWith("/api/auth/session")) return true;
  if (pathname.startsWith("/gate-assets/")) return true;
  if (pathname === "/favicon.ico") return true;
  return false;
}

async function cookieIsValid(
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

export async function middleware(request: NextRequest) {
  if (!gateIsEnabled()) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const secret = process.env.GATE_JWT_SECRET;
  const token = request.cookies.get(GATE_COOKIE_NAME)?.value;
  const verified = await cookieIsValid(token, secret);

  if (pathname === "/gate") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (!secret) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("gate", "misconfigured");
    return NextResponse.redirect(url);
  }

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  if (verified) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|_next/webpack-hmr|favicon.ico).*)",
  ],
};
