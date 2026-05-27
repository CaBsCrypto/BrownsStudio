import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BrownsOSLoader from "@/components/BrownsOSLoader";
import Portfolio from "@/components/Portfolio";
import SobreMi from "@/components/SobreMi";
import { notFound } from "next/navigation";
import { translations } from "@/lib/i18n/translations";
import { Lang } from "@/lib/i18n/LanguageContext";

const LOCALES = ["en", "es", "pt"] as const;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function PortafolioPage({ params }: PageProps) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as (typeof LOCALES)[number])) notFound();

  const lang = (["en", "es", "pt"].includes(locale) ? locale : "es") as Lang;
  const t = translations[lang];

  return (
    <main className="min-h-screen relative bg-[#050505] text-[#e5e5e5] overflow-hidden">
      {/* Subtle top background glow */}
      <div
        className="absolute top-0 inset-x-0 h-[600px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at 50% -10%, rgba(71,196,255,0.06) 0%, rgba(71,196,255,0.01) 50%, transparent 100%)",
        }}
      />
      <BrownsOSLoader />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        {/* Spacer below fixed navbar */}
        <div className="pt-24 lg:pt-32" />

        {/* Intro Hero Section */}
        <div className="max-w-4xl mx-auto text-center px-4 pt-10 pb-8 relative z-10">
          {/* Subtle cyan glow dot behind title */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none opacity-[0.07] blur-[100px]"
            style={{ background: "rgba(71,196,255,0.7)" }}
          />

          <p
            className="reveal inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6 border border-cyan-500/15"
            style={{ background: "rgba(71,196,255,0.04)", color: "#47c4ff" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#47c4ff] animate-pulse" />
            {t.portfolio.introEyebrow}
          </p>
          <h1
            className="reveal font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.12] mb-6 tracking-tight"
            style={{ letterSpacing: "-0.03em" }}
          >
            {t.portfolio.introTitle}
          </h1>
          <p className="reveal text-[#939eb5] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {t.portfolio.introSub}
          </p>
        </div>

        {/* Premium Projects Carousel */}
        <div>
          <Portfolio hideHeader={true} hideCTA={true} />
        </div>

        {/* Sobre Nosotros / Cristian Section */}
        <div className="border-t border-white/[0.05] bg-white/[0.01] py-10">
          <SobreMi />
        </div>

        <Footer />
        <WhatsAppButton />
      </div>
    </main>
  );
}
