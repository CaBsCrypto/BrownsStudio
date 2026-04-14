import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  return {
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}`,
      languages: {
        "en": `${SITE_CONFIG.url}/en`,
        "es": `${SITE_CONFIG.url}/es`,
        "x-default": `${SITE_CONFIG.url}/es`,
      },
    },
    openGraph: {
      locale: isEs ? "es_419" : "en_US",
      alternateLocale: isEs ? "en_US" : "es_419",
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
  // Layout just passes through — html/body are in root layout
  // LanguageContext reads locale from the URL automatically
  return <>{children}</>;
}
