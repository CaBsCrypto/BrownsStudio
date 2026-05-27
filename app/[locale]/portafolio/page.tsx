import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BrownsOSLoader from "@/components/BrownsOSLoader";
import ProyectoCard from "@/components/ProyectoCard";
import { proyectos } from "@/data/proyectos";
import { notFound } from "next/navigation";
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

  // Local translations for page header
  const title = {
    es: "Portafolio de Proyectos",
    en: "Project Portfolio",
    pt: "Portfólio de Projetos",
  }[locale as Lang];

  const subtitle = {
    es: "Una muestra selecta de nuestros agentes de IA, automatizaciones y desarrollos de software de alto impacto.",
    en: "A curated showcase of our AI agents, automations, and high-impact software developments.",
    pt: "Uma vitrine selecionada de nuestros agentes de IA, automações e desenvolvimentos de software de alto impacto.",
  }[locale as Lang];

  const eyebrow = {
    es: "NUESTROS TRABAJOS",
    en: "OUR WORKS",
    pt: "NOSSOS TRABALHOS",
  }[locale as Lang];

  return (
    <main className="min-h-screen relative bg-[#050505] text-[#e5e5e5]">
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
        
        {/* Hero Section */}
        <section className="flex-none pt-36 pb-16 px-4 max-w-7xl mx-auto text-center relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest mb-5"
              style={{
                border: "1px solid rgba(71,196,255,0.25)",
                background: "rgba(71,196,255,0.04)",
                color: "#47c4ff",
              }}
            >
              {eyebrow}
            </div>
            <h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#e5e5e5] leading-tight mb-6"
              style={{ letterSpacing: "-0.03em" }}
            >
              {title}
            </h1>
            <p className="text-[#9e9e9e] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
        </section>

        {/* Grid Section */}
        <section className="flex-grow pb-28 px-4 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {proyectos.map((proyecto, i) => (
              <ProyectoCard key={proyecto.slug} proyecto={proyecto} index={i} />
            ))}
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    </main>
  );
}
