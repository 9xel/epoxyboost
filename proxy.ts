import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ALLOWED_PATHS = new Set([
  "/",
  "/privacy-policy",
  "/waitlist/thank-you",
  "/dev/favicon-preview",
  "/_unknown",
]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (ALLOWED_PATHS.has(pathname) || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/_unknown";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
