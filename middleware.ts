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
    // e.g. "pt-BR,pt;q=0.9,en;q=0.8" or "es-419,es;q=0.9,en;q=0.8"
    const acceptLang = request.headers.get("accept-language") ?? "";
    // Check all listed languages in order of preference
    const langs = acceptLang
      .split(",")
      .map((l) => l.split(";")[0].trim().toLowerCase());

    let locale = DEFAULT_LOCALE;
    for (const l of langs) {
      if (l.startsWith("pt")) { locale = "pt"; break; }     // Brazil / Portugal
      if (l.startsWith("es")) { locale = "es"; break; }     // All Spanish-speaking LATAM
      if (l.startsWith("en")) { locale = "en"; break; }     // USA / Europe (English)
      // Any other language (fr, de, zh, ja, ko…) → continue to next preference
      // If none match → falls back to DEFAULT_LOCALE (es)
    }

    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*"],
};
