import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import { SITE_CONFIG } from "@/lib/config";
import { translations } from "@/lib/i18n/translations";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jet-brains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = translations[locale as keyof typeof translations] || translations.es;
  const isEs = locale === "es";

  return {
    title: {
      default: `${t.seo.title}`,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description: t.seo.description,
    keywords: t.seo.keywords,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}`,
      languages: {
        "en": `${SITE_CONFIG.url}/en`,
        "es": `${SITE_CONFIG.url}/es`,
        "pt": `${SITE_CONFIG.url}/pt`,
        "x-default": `${SITE_CONFIG.url}/es`,
      },
    },
    openGraph: {
      type: "website",
      locale: isEs ? "es_419" : locale === "pt" ? "pt_BR" : "en_US",
      url: `${SITE_CONFIG.url}/${locale}`,
      title: t.seo.title,
      description: t.seo.description,
      siteName: SITE_CONFIG.name,
    },
    twitter: {
      card: "summary_large_image",
      title: t.seo.title,
      description: t.seo.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = translations[locale as keyof typeof translations] || translations.es;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: SITE_CONFIG.name,
      description: t.seo.description,
      url: `${SITE_CONFIG.url}/${locale}`,
      email: SITE_CONFIG.email,
      sameAs: [SITE_CONFIG.instagram, SITE_CONFIG.linkedin, SITE_CONFIG.youtube],
      areaServed: locale === "en" ? "Global" : "América Latina",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: t.nav.services,
        itemListElement: t.pricing.plans.map((plan: any) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: plan.name,
            description: plan.desc,
          },
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: t.faq.items.map((item: any) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ];

  return (
    <html lang={locale} className="dark">
      <head>
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetBrainsMono.variable} font-body antialiased bg-bg-primary text-text-primary`}
      >
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
