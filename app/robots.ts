import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Preview and local builds stay closed to crawlers; metadata also applies noindex.
  if (process.env.VERCEL_ENV !== "production") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/"],
      },
    ],
    sitemap: "https://www.browns.studio/sitemap.xml",
    host: "https://www.browns.studio",
  };
}
