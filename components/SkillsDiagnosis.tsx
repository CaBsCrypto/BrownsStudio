"use client";

import { useLang } from "@/lib/i18n/LanguageContext";
import { Sparkles, Calendar, ArrowRight, ShieldCheck, Check } from "lucide-react";

export default function SkillsDiagnosis() {
  const { lang } = useLang();

  const content = {
    badge: lang === "en" ? "FREE DIAGNOSIS" : lang === "pt" ? "DIAGNÓSTICO GRÁTIS" : "DIAGNÓSTICO GRATUITO",
    title: lang === "en" 
      ? "AI Skills & Automation Diagnosis" 
      : lang === "pt" 
      ? "Diagnóstico de Habilidades com IA" 
      : "Diagnóstico de Habilidades y Automatización con IA",
    desc: lang === "en"
      ? "Schedule a free 15-minute custom call. We will review your current tasks, find repetitive bottlenecks, and draw your personalized learning roadmap."
      : lang === "pt"
      ? "Agende uma sessão gratuita de 15 minutos. Analisaremos suas tarefas atuais, encontraremos gargalos repetitivos e desenharemos seu roteiro de estudos."
      : "Agenda una sesión personalizada de 15 minutos sin costo. Analizaremos tus tareas diarias, identificaremos cuellos de botella y diseñaremos tu hoja de ruta de aprendizaje a medida.",
    bullets: lang === "en"
      ? ["15-minute 1-on-1 diagnostic call", "Identify 3 automation bottlenecks", "Customized training path recommendations"]
      : lang === "pt"
      ? ["Sessão 1-a-1 de 15 minutos de diagnóstico", "Identificar 3 processos a automatizar", "Recomendação de trilha de estudo customizada"]
      : ["Sesión 1-a-1 de 15 minutos de diagnóstico", "Identificación de 3 procesos automatizables", "Recomendación de ruta de estudio personalizada"],
    cta: lang === "en" ? "Book Free Diagnosis (15 min)" : lang === "pt" ? "Agendar Diagnóstico Grátis (15 min)" : "Agendar Diagnóstico Gratis (15 min)"
  };

  return (
    <section className="py-16 sm:py-20 px-6 relative overflow-hidden bg-transparent border-t border-[#111]">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#00f0ff]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Block: Info */}
          <div className="lg:col-span-7 space-y-6">
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
              style={{ border: "1px solid rgba(0,240,255,0.2)", background: "rgba(0,240,255,0.05)", color: "#00f0ff" }}
            >
              <Sparkles size={12} />
              {content.badge}
            </span>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#e5e5e5] leading-tight">
              {content.title}
            </h2>

            <p className="text-[#9e9e9e] text-sm sm:text-base leading-relaxed">
              {content.desc}
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {content.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-center gap-3 text-xs text-[#9e9e9e]">
                  <div className="w-5 h-5 rounded-full bg-[#00f0ff]/10 flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-[#00f0ff]" />
                  </div>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Block: Interactive Card Call to Action */}
          <div className="lg:col-span-5">
            <div 
              className="rounded-3xl p-6 sm:p-8 border border-white/5 bg-[#0b0c10]/40 backdrop-blur-xl space-y-6 text-center"
              style={{ boxShadow: "0 16px 40px rgba(0,0,0,0.5)" }}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#00f0ff]/10 border border-[#00f0ff]/20 flex items-center justify-center mx-auto">
                <Calendar size={28} className="text-[#00f0ff]" />
              </div>

              <div className="space-y-1">
                <h3 className="font-display text-lg font-bold text-white">
                  {lang === "en" ? "Check Availability" : lang === "pt" ? "Verificar Disponibilidade" : "Consultar Agenda"}
                </h3>
                <p className="text-[#9e9e9e] text-xs leading-normal">
                  {lang === "en" ? "Direct slots with Cristian Araya" : lang === "pt" ? "Vagas diretas com Cristian Araya" : "Cupos directos con Cristian Araya"}
                </p>
              </div>


            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
