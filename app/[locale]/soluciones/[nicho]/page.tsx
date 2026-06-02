import { notFound } from "next/navigation";
import { Metadata } from "next";
import { solucionesData } from "@/lib/solucionesData";
import { SITE_CONFIG } from "@/lib/config";
import NicheClient from "./NicheClient";

type Props = {
  params: Promise<{
    locale: string;
    nicho: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, nicho } = await params;
  
  const nicheEntry = solucionesData[nicho];
  if (!nicheEntry) {
    return {};
  }
  
  const t = nicheEntry[locale as keyof typeof nicheEntry] || nicheEntry.es;
  
  // Create an engaging SEO title specifically for this niche
  const title = `Agencia de IA para ${t.industria} en Chile | Browns Studio`;
  const description = t.profiles.estandar.headline;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.url}/${locale}/soluciones/${nicho}`,
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/soluciones/${nicho}`,
    }
  };
}

export default async function SolucionNichePage({ params }: Props) {
  const { locale, nicho } = await params;

  if (!solucionesData[nicho]) {
    notFound();
  }

  const nicheEntry = solucionesData[nicho];
  const t = nicheEntry[locale as keyof typeof nicheEntry] || nicheEntry.es;

  // Generate Service JSON-LD specifically for this niche
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `Automatización e IA para ${t.industria}`,
    "provider": {
      "@type": "ProfessionalService",
      "name": "Browns Studio",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Santiago",
        "addressCountry": "CL"
      }
    },
    "description": t.profiles.estandar.headline,
    "areaServed": "CL",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NicheClient locale={locale} nicho={nicho} />
    </>
  );
}
