"use client";

import { useState } from "react";
import { BookOpen, Sparkles, BrainCircuit } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkshopsShowcase from "@/components/WorkshopsShowcase";
import SimplifiedPortfolioCarousel from "@/components/SimplifiedPortfolioCarousel";
import VideoDemosCarousel from "@/components/VideoDemosCarousel";
import MyCertifications from "@/components/MyCertifications";
import RoadmapSimulator from "@/components/RoadmapSimulator";
import FormacionFAQ from "@/components/FormacionFAQ";
import TrainingPricing from "@/components/TrainingPricing";
import WorkAdaptability from "@/components/WorkAdaptability";
import WhatsAppButton from "@/components/WhatsAppButton";
import BrownsOSLoader from "@/components/BrownsOSLoader";
import SkillsDiagnosis from "@/components/SkillsDiagnosis";
import { useLang } from "@/lib/i18n/LanguageContext";

interface MainLandingClientPageProps {
  locale: string;
}

export default function MainLandingClientPage({ locale }: MainLandingClientPageProps) {
  const { t, lang } = useLang();
  const [isAdaptModalOpen, setIsAdaptModalOpen] = useState(false);

  // Safe cast or direct access from translation object
  const fp = (t as any).formacionPage || {
    title: "Capacítate para la Próxima Generación de Empleos",
    subtitle: "Domina el desarrollo de software con IA, la automatización de procesos y la creación de agentes autónomos para liderar el futuro profesional.",
    heroCta: "Reserva tu consulta gratis",
    back: "Volver al inicio"
  };

  return (
    <main className="min-h-screen relative bg-[#050506] text-white overflow-hidden">
      {/* Decorative background grid and glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 15%, rgba(0,240,255,0.05) 0%, transparent 60%)",
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(to right, #00f0ff 1px, transparent 1px), linear-gradient(to bottom, #00f0ff 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      <BrownsOSLoader />
      <Navbar />

      {/* Hero section */}
      <section className="pt-32 pb-12 sm:pt-40 sm:pb-16 relative z-10 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          {/* Icon Badge */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-6"
            style={{
              background: "rgba(0,240,255,0.06)",
              border: "1px solid rgba(0,240,255,0.15)",
            }}
          >
            <BookOpen size={20} style={{ color: "#00f0ff" }} />
          </div>

          <p
            className="text-xs uppercase tracking-[0.25em] mb-4 flex items-center justify-center gap-1.5"
            style={{ color: "rgba(0,240,255,0.6)" }}
          >
            <Sparkles size={12} />
            BROWNS STUDIO ACADEMY
          </p>

          <h1
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[#e5e5e5] mb-6 leading-tight"
            style={{ letterSpacing: "-0.03em" }}
          >
            {fp.title}
          </h1>

          <p className="text-[#9e9e9e] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            {fp.subtitle}
          </p>

          <a
            href="https://calendly.com/brownsstudio/consulta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.03]"
            style={{
              background: "linear-gradient(135deg, #00f0ff, #ffffff)",
              boxShadow: "0 8px 30px rgba(0, 240, 255, 0.25)"
            }}
          >
            <span>{fp.heroCta || "Reserva tu consulta gratis"}</span>
            <Sparkles size={14} className="text-black" />
          </a>
        </div>
      </section>

      {/* Interactive workshops segment */}
      <div className="relative z-10">
        <WorkshopsShowcase />
      </div>

      {/* Skills & Automation Diagnosis (Free Trial lead-gen block) */}
      <div className="relative z-10">
        <SkillsDiagnosis />
      </div>

      {/* Interactive Learning Roadmap Simulator */}
      <div className="relative z-10 border-t border-[#111]">
        <RoadmapSimulator />
      </div>

      {/* Video Highlight Carousel Section */}
      <div className="relative z-10 border-t border-[#111]">
        <VideoDemosCarousel />
      </div>

      {/* Mis Certificaciones Section */}
      <div className="relative z-10 border-t border-[#111]">
        <MyCertifications />
      </div>

      {/* Training Pricing Plans Section */}
      <div className="relative z-10 border-t border-[#111]">
        <TrainingPricing />
      </div>

      {/* Simplified Portfolio Carousel section */}
      <section className="relative z-10 border-t border-[#111] py-16">
        <SimplifiedPortfolioCarousel />
      </section>

      {/* Formacion FAQs Section */}
      <div className="relative z-10 border-t border-[#111]">
        <FormacionFAQ />
      </div>

      {/* Work Adaptability AI Analyzer Pop-up Modal */}
      <WorkAdaptability 
        isOpen={isAdaptModalOpen} 
        onClose={() => setIsAdaptModalOpen(false)} 
      />

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
