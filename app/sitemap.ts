import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/config";
import { proyectos } from "@/data/proyectos";
import { solucionesData } from "@/lib/solucionesData";

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

  // Niche solutions (/[locale]/soluciones/[nicho])
  const niches = Object.keys(solucionesData);
  const solucionesRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    niches.map((nicho) => ({
      url: `${base}/${locale}/soluciones/${nicho}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          es: `${base}/es/soluciones/${nicho}`,
          en: `${base}/en/soluciones/${nicho}`,
          pt: `${base}/pt/soluciones/${nicho}`,
          "x-default": `${base}/es/soluciones/${nicho}`,
        },
      },
    }))
  );

  // Training pages (/[locale]/formacion)
  const formacionRoutes: MetadataRoute.Sitemap = LOCALES.map((locale) => ({
    url: `${base}/${locale}/formacion`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    alternates: {
      languages: {
        es: `${base}/es/formacion`,
        en: `${base}/en/formacion`,
        pt: `${base}/pt/formacion`,
        "x-default": `${base}/es/formacion`,
      },
    },
  }));

  // Case studies (/[locale]/proyecto/[slug])
  const proyectoRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    proyectos.map((p) => ({
      url: `${base}/${locale}/proyecto/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          es: `${base}/es/proyecto/${p.slug}`,
          en: `${base}/en/proyecto/${p.slug}`,
          pt: `${base}/pt/proyecto/${p.slug}`,
          "x-default": `${base}/es/proyecto/${p.slug}`,
        },
      },
    }))
  );

  return [
    ...localeRoutes,
    ...solucionesRoutes,
    ...formacionRoutes,
    ...proyectoRoutes,
  ];
}
