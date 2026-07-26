import { notFound } from "next/navigation";
import MainLandingClientPage from "@/components/MainLandingClientPage";

const LOCALES = ["en", "es", "pt"] as const;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as (typeof LOCALES)[number])) notFound();

  return <MainLandingClientPage locale={locale} />;
}
