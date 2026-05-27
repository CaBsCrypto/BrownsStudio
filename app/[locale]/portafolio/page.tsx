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
        <div className="pt-16 lg:pt-20" />

        {/* Subtle page title */}
        <div className="max-w-7xl mx-auto px-4 w-full pt-2 pb-1 relative z-10">
          <h1 className="reveal font-display font-bold text-3xl sm:text-4xl text-[#e5e5e5] mb-2 tracking-tight" style={{ letterSpacing: "-0.02em" }}>
            {lang === "en" ? "My Portfolio" : lang === "pt" ? "Meu Portfólio" : "Mi Portafolio"}
          </h1>
          <p className="reveal text-[#9e9e9e] text-sm leading-relaxed max-w-xl">
            {lang === "en" ? "A curated selection of custom-built projects and digital solutions." : lang === "pt" ? "Uma seleção de projetos e soluções desenvolvidos sob medida." : "Una selección de proyectos y desarrollos a medida."}
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
