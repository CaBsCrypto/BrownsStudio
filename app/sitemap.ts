import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/config";
import { proyectos } from "@/data/proyectos";

const LOCALES = ["es", "en", "pt"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.url.replace(/\/$/, "");
  const now = new Date();

  // Landing en los 3 locales
  const localeRoutes: MetadataRoute.Sitemap = LOCALES.map((locale) => ({
    url: `${base}/${locale}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: locale === "es" ? 1.0 : 0.9,
    alternates: {
      languages: {
        es: `${base}/es`,
        en: `${base}/en`,
        pt: `${base}/pt`,
        "x-default": `${base}/es`,
      },
    },
  }));

  // Case studies (/proyecto/[slug])
  const proyectoRoutes: MetadataRoute.Sitemap = proyectos.map((p) => ({
    url: `${base}/proyecto/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...localeRoutes, ...proyectoRoutes];
}
