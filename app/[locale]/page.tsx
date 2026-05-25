import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CasosDeUso from "@/components/CasosDeUso";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BrownsOSLoader from "@/components/BrownsOSLoader";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

// Below-the-fold components are loaded dynamically with server-side pre-rendering (ssr: true)
const ProcessAuditor = dynamic(() => import("@/components/ProcessAuditor"), { ssr: true });
const Portfolio = dynamic(() => import("@/components/Portfolio"), { ssr: true });
const Pricing = dynamic(() => import("@/components/Pricing"), { ssr: true });
const Testimonios = dynamic(() => import("@/components/Testimonios"), { ssr: true });
const SobreMi = dynamic(() => import("@/components/SobreMi"), { ssr: true });
const FAQ = dynamic(() => import("@/components/FAQ"), { ssr: true });
const CTA = dynamic(() => import("@/components/CTA"), { ssr: true });

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
        {/* <ProcessAuditor /> */}
        <Portfolio />
        <Pricing />
        {/* <Proceso /> */}
        {/* <AIShowcase /> */}
        <Testimonios />
        <SobreMi />
        <FAQ />
        <CTA />
        <Footer />
        <WhatsAppButton />
      </div>
    </main>
  );
}
