import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SobreMi from "@/components/SobreMi";
import Pricing from "@/components/Pricing";
import Portfolio from "@/components/Portfolio";
import AIShowcase from "@/components/AIShowcase";
import Proceso from "@/components/Proceso";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BrownsOSLoader from "@/components/BrownsOSLoader";
import { notFound } from "next/navigation";

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

  return (
    <main className="min-h-screen">
      <BrownsOSLoader />
      <Navbar />
      <Hero />
      <Portfolio />
      <AIShowcase />
      <SobreMi />
      <Pricing />
      <Proceso />
      <FAQ />
      <CTA />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
