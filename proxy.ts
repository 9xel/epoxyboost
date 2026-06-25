import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ALLOWED_PATHS = new Set(["/", "/privacy-policy"]);

export function proxy(request: NextRequest) {
  if (ALLOWED_PATHS.has(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  return new NextResponse(null, { status: 404 });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
