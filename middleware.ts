import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { GATE_COOKIE_NAME, gateIsEnabled } from "@/lib/gate";
import { verifyJWT } from "@/lib/verifyJWT";

// Matcher already excludes /api/* and /_next/* — only page routes reach here.
function isPublicPath(pathname: string): boolean {
  if (pathname === "/") return true;
  if (pathname.startsWith("/gate-assets/")) return true;
  return false;
}

export async function middleware(request: NextRequest) {
  if (!gateIsEnabled()) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const secret = process.env.GATE_JWT_SECRET?.trim();
  const token = request.cookies.get(GATE_COOKIE_NAME)?.value;
  const verified = await verifyJWT(token, secret);

  if (pathname === "/gate") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  if (!secret) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("gate", "misconfigured");
    return NextResponse.redirect(url);
  }

  if (verified) {
    return NextResponse.next();
  }

  // Send to home gate; preserve destination so login can return the user there.
  const url = request.nextUrl.clone();
  url.pathname = "/";
  url.search = "";
  const returnPath = `${pathname}${request.nextUrl.search}`;
  if (returnPath !== "/") {
    url.searchParams.set("from", returnPath);
  }
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Skip Next internals and API routes. Running gate redirects on /_next/* or /api/*
     * can cause ERR_TOO_MANY_REDIRECTS when the framework refetches chunks or calls APIs.
     */
    "/((?!_next/|api/|favicon.ico|.*\\..*).*)",
  ],
};
