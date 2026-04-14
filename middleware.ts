// ── Middleware: locale detection + admin protection ──────────────────────────
import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["en", "es"];
const DEFAULT_LOCALE = "es";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Admin protection ───────────────────────────────────────────────────────
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get("admin_token")?.value;
    const expected = process.env.ADMIN_SECRET;
    if (!token || !expected || token !== expected) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // ── Locale redirect — only for root "/" ────────────────────────────────────
  const isAlreadyLocalised = LOCALES.some(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
  );
  const isSkipped =
    isAlreadyLocalised ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/proyecto") ||
    pathname.includes(".");

  if (!isSkipped && pathname === "/") {
    // Detect preferred language from Accept-Language header
    // e.g. "es-419,es;q=0.9,en;q=0.8"
    const acceptLang = request.headers.get("accept-language") ?? "";
    const preferred = acceptLang.split(",")[0].split(";")[0].trim().toLowerCase();

    let locale = DEFAULT_LOCALE;
    if (preferred.startsWith("en")) locale = "en";
    // All other languages (pt, fr, etc.) → Spanish (main market)

    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*"],
};
