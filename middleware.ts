// ── Middleware: locale detection + admin protection ──────────────────────────
import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["en", "es", "pt"];
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
    const acceptLang = request.headers.get("accept-language") ?? "";
    const langs = acceptLang
      .split(",")
      .map((l) => l.split(";")[0].trim().toLowerCase());

    let locale = DEFAULT_LOCALE;
    for (const l of langs) {
      if (l.startsWith("es")) { locale = "es"; break; }     // Spanish
      if (l.startsWith("pt")) { locale = "pt"; break; }     // Portuguese (Brazil/Portugal)
      if (l.startsWith("en")) { locale = "en"; break; }     // English
    }

    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*"],
};
