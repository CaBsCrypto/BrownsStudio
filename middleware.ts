// ── Middleware: admin protection ─────────────────────────────────────────────
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Admin API protection ───────────────────────────────────────────────────
  if (pathname.startsWith("/api/admin") && pathname !== "/api/admin/auth") {
    const token = request.cookies.get("admin_token")?.value;
    const expected = process.env.ADMIN_SECRET;
    if (!token || !expected || token !== expected) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // ── Admin protection ───────────────────────────────────────────────────────
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get("admin_token")?.value;
    const expected = process.env.ADMIN_SECRET;
    if (!token || !expected || token !== expected) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

