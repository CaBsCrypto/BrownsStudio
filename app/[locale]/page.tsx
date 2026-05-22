import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SobreMi from "@/components/SobreMi";
import Pricing from "@/components/Pricing";
import Portfolio from "@/components/Portfolio";
import CasosDeUso from "@/components/CasosDeUso";
import ProcessAuditor from "@/components/ProcessAuditor";
import Testimonios from "@/components/Testimonios";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
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
    <main className="min-h-screen relative">
      <BrownsOSLoader />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <CasosDeUso />
        <ProcessAuditor />
        <Portfolio />
        <Pricing />
        {/* <Proceso /> */}
        {/* <AIShowcase /> */}
        <Testimonios />
        <SobreMi />
        <FAQ />
        <CTA />
        <WhatsAppButton />
      </div>
    </main>
  );
}
