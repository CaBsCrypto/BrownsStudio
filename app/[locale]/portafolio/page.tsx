import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BrownsOSLoader from "@/components/BrownsOSLoader";
import Portfolio from "@/components/Portfolio";
import { notFound } from "next/navigation";
import { getWhatsAppLink } from "@/lib/config";
import { Lang } from "@/lib/i18n/LanguageContext";
import {
  Brain,
  Code2,
  Cpu,
  FileText,
  LineChart,
  BookOpen,
  PenTool,
  Sparkles,
  MessageSquare
} from "lucide-react";

const LOCALES = ["en", "es", "pt"] as const;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

const certIcons = [LineChart, PenTool, BookOpen, Cpu, Brain, Code2, FileText];

const texts = {
  es: {
    eyebrow: "Quién está detrás",
    title: "Hola, soy Cristian. Founder de Browns Studio.",
    subtitle: "Especialista en IA certificado por Google. En Browns Studio no solo construimos software — diseñamos agentes autónomos que aprenden tus procesos, los ejecutan por ti y escalan tu negocio sin depender de tu tiempo.",
    certsVal: "7 certs.",
    certsTitle: "Certificado por Google en IA",
    certsSub: "Inteligencia Artificial con Gemini · Google Cloud",
    marquee: [
      "AI for Analysis",
      "AI for Content",
      "AI for Writing",
      "AI for Research",
      "AI for Automation",
      "AI for Development"
    ],
    marqueeFooter: "Cada certificación = una herramienta real aplicada a tu negocio.",
    cta: "Conversemos sobre tu proyecto",
    whatsappMsg: "Hola Cristian, me interesa conversar sobre mi proyecto y cómo podemos automatizar nuestros procesos con IA en Browns Studio.",
    projectsHeading: "Casos de Éxito y Proyectos Reales"
  },
  en: {
    eyebrow: "Who is behind",
    title: "Hi, I'm Cristian. Founder of Browns Studio.",
    subtitle: "Google-certified AI specialist. At Browns Studio, we don't just build software — we design autonomous agents that learn your processes, execute them for you, and scale your business without relying on your time.",
    certsVal: "7 certs.",
    certsTitle: "Google Certified in AI",
    certsSub: "Artificial Intelligence with Gemini · Google Cloud",
    marquee: [
      "AI for Analysis",
      "AI for Content",
      "AI for Writing",
      "AI for Research",
      "AI for Automation",
      "AI for Development"
    ],
    marqueeFooter: "Each certification = a real-world tool applied to your business.",
    cta: "Let's talk about your project",
    whatsappMsg: "Hello Cristian, I'd like to discuss my project and how we can automate our processes using AI at Browns Studio.",
    projectsHeading: "Success Cases & Real Projects"
  },
  pt: {
    eyebrow: "Quem está por trás",
    title: "Olá, sou Cristian. Founder do Browns Studio.",
    subtitle: "Especialista em IA certificado pelo Google. No Browns Studio não apenas construímos software — projetamos agentes autônomos que aprendem seus processos, os executam por você e escalam seu negócio sem depender do seu tempo.",
    certsVal: "7 certs.",
    certsTitle: "Certificado pelo Google em IA",
    certsSub: "Inteligência Artificial com Gemini · Google Cloud",
    marquee: [
      "AI for Analysis",
      "AI for Content",
      "AI for Writing",
      "AI for Research",
      "AI for Automation",
      "AI for Development"
    ],
    marqueeFooter: "Cada certificação = uma ferramenta real aplicada ao seu negócio.",
    cta: "Vamos conversar sobre o seu projeto",
    whatsappMsg: "Olá Cristian, gostaria de conversar sobre o meu projeto e como podemos automatizar nossos processos com IA no Browns Studio.",
    projectsHeading: "Casos de Sucesso e Projetos Reais"
  }
};

export default async function PortafolioPage({ params }: PageProps) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as (typeof LOCALES)[number])) notFound();

  const lang = locale as Lang;
  const currentText = texts[lang];
  const whatsappUrl = getWhatsAppLink(currentText.whatsappMsg);

  return (
    <main className="min-h-screen relative bg-[#040812] text-[#e5e5e5] overflow-hidden">
      {/* ── Background Orbit System ─────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Glowing Central Aura */}
        <div
          className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full filter blur-[150px]"
          style={{
            background: "radial-gradient(circle, rgba(0,240,255,0.06) 0%, rgba(71,196,255,0.01) 70%, transparent 100%)",
          }}
        />

        {/* Circular Orbit Rings */}
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[450px] aspect-square border border-cyan-500/[0.04] rounded-full" />
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[650px] aspect-square border border-cyan-500/[0.03] rounded-full rotate-12" />
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] sm:w-[850px] aspect-square border border-cyan-500/[0.02] rounded-full -rotate-12" />
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] sm:w-[1050px] aspect-square border border-cyan-500/[0.01] rounded-full rotate-45" />
      </div>

      <BrownsOSLoader />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        {/* Spacer below fixed navbar */}
        <div className="pt-32 lg:pt-36" />

        {/* ── Elite Bio Header Section (Planetary/Orbit Style) ────────── */}
        <section className="flex-none max-w-7xl mx-auto text-center px-4 pb-14 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* QUIÉN ESTÁ DETRÁS Pill */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] mb-8"
              style={{
                border: "1px solid rgba(71,196,255,0.22)",
                background: "rgba(10,30,60,0.45)",
                color: "#47c4ff",
              }}
            >
              <Sparkles size={10} className="text-[#47c4ff] animate-pulse" />
              {currentText.eyebrow}
            </div>

            {/* Main Headline */}
            <h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.12] mb-6 tracking-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              {currentText.title}
            </h1>

            {/* Main Bio Subtitle */}
            <p className="text-[#939eb5] text-base sm:text-lg leading-relaxed max-w-3xl mx-auto mb-12">
              {currentText.subtitle}
            </p>

            {/* 7 Certs Credentials Card */}
            <div
              className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl max-w-xl mx-auto mb-8 text-left"
              style={{
                background: "rgba(10,18,30,0.55)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(71,196,255,0.25)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
              }}
            >
              {/* Counter Left */}
              <div className="text-center sm:pr-6 sm:border-r border-cyan-500/20 flex-shrink-0 w-full sm:w-auto">
                <p className="font-display font-black text-5xl text-[#47c4ff] leading-none">7</p>
                <p className="text-cyan-400/80 text-[9px] uppercase tracking-wider font-mono mt-1">{currentText.certsVal}</p>
              </div>

              {/* Text Right */}
              <div className="text-center sm:text-left">
                <p className="text-white font-bold text-base leading-tight mb-1">
                  {currentText.certsTitle}
                </p>
                <p className="text-[#939eb5] text-xs">
                  {currentText.certsSub}
                </p>
              </div>
            </div>

            {/* Horizontal Marquee strip */}
            <div
              className="mb-4 overflow-hidden relative w-full max-w-2xl mx-auto"
              style={{
                maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                WebkitMaskImage: "linear-gradient(to right, transparent 15%, black 85%, transparent)"
              }}
            >
              <div
                className="flex gap-3 w-max py-1"
                style={{
                  animation: "marquee-scroll 25s linear infinite"
                }}
              >
                {[...currentText.marquee, ...currentText.marquee].map((item, idx) => {
                  const Icon = certIcons[idx % certIcons.length];
                  return (
                    <div
                      key={`${item}-${idx}`}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full flex-shrink-0"
                      style={{
                        background: "rgba(25, 25, 25, 0.45)",
                        border: "1px solid rgba(255, 255, 255, 0.08)"
                      }}
                    >
                      <div
                        className="w-5 h-5 rounded-md flex items-center justify-center"
                        style={{ background: "rgba(71,196,255,0.08)" }}
                      >
                        <Icon size={10} className="text-[#47c4ff]" />
                      </div>
                      <span className="text-[#d0d0d0] text-[11px] font-medium whitespace-nowrap">{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Marquee Footnote */}
            <p className="text-[#7c7c7c] text-[10px] italic mb-10">
              {currentText.marqueeFooter}
            </p>

            {/* Capsule CTA Button */}
            <div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-black font-semibold text-sm hover:scale-105 active:scale-[0.97] transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #c6c6c7, #939eb5)",
                  boxShadow: "0 0 24px rgba(198,198,199,0.18)"
                }}
              >
                <MessageSquare size={14} />
                {currentText.cta}
              </a>
            </div>
          </div>
        </section>

        {/* ── separator ── */}
        <div className="border-t border-cyan-500/[0.04]" />

        {/* ── Carousel Section: Casos de Éxito ────────────────────────── */}
        <section className="bg-transparent relative z-10 py-10">
          <div className="max-w-7xl mx-auto px-4 text-center sm:text-left mb-2">
            <h3 className="font-display font-semibold text-[#e5e5e5] text-xl sm:text-2xl tracking-tight max-w-7xl mx-auto px-4">
              {currentText.projectsHeading}
            </h3>
          </div>

          <Portfolio hideHeader={true} />
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    </main>
  );
}
