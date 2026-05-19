"use client";

import { useEffect, useRef } from "react";
import { ShoppingCart, Settings2, Users2, Layers3, ArrowRight } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/config";
import { useLang } from "@/lib/i18n/LanguageContext";

const ICONS = [ShoppingCart, Settings2, Users2, Layers3];

const CASOS = {
  es: {
    eyebrow: "Casos de Uso",
    title: "¿Para qué proceso construimos tu agente?",
    sub: "Cada agente se entrena con la lógica exacta de tu negocio. Estos son los procesos que más delegamos.",
    items: [
      {
        title: "Agente de Ventas",
        desc: "Califica leads, responde consultas, cotiza y agenda llamadas por WhatsApp — 24/7, sin intervención humana.",
        tag: "WhatsApp · CRM · Leads",
        result: "Leads calificados sin esfuerzo de tu equipo",
      },
      {
        title: "Agente de Operaciones",
        desc: "Gestiona tu CRM, genera reportes automáticos y coordina flujos internos sin que nadie tenga que recordarlo.",
        tag: "Make · n8n · Zapier",
        result: "Operación interna en piloto automático",
      },
      {
        title: "Agente de Onboarding",
        desc: "Incorpora nuevos clientes o empleados con cero fricción — guías, respuestas y seguimiento automatizados.",
        tag: "Email · Slack · Notion",
        result: "Onboarding sin carga para tu equipo",
      },
      {
        title: "Agente Multi-Canal",
        desc: "Opera en WhatsApp, email, web y tu sistema a la vez — un agente que nunca pierde contexto entre canales.",
        tag: "Omnicanal · API · Base de datos",
        result: "Presencia coherente en todos tus canales",
      },
    ],
    cta: "Cuéntanos tu proceso",
  },
  en: {
    eyebrow: "Use Cases",
    title: "Which process do we build your agent for?",
    sub: "Each agent is trained with your exact business logic. These are the processes we delegate most.",
    items: [
      {
        title: "Sales Agent",
        desc: "Qualifies leads, answers inquiries, quotes, and schedules calls on WhatsApp — 24/7, no human intervention.",
        tag: "WhatsApp · CRM · Leads",
        result: "Qualified leads without team effort",
      },
      {
        title: "Operations Agent",
        desc: "Manages your CRM, generates automatic reports and coordinates internal workflows so no one has to remember.",
        tag: "Make · n8n · Zapier",
        result: "Internal operations on autopilot",
      },
      {
        title: "Onboarding Agent",
        desc: "Onboards new clients or employees with zero friction — automated guides, answers, and follow-ups.",
        tag: "Email · Slack · Notion",
        result: "Onboarding without team overhead",
      },
      {
        title: "Multi-Channel Agent",
        desc: "Operates across WhatsApp, email, web and your system simultaneously — one agent that never loses context.",
        tag: "Omnichannel · API · Database",
        result: "Consistent presence across all your channels",
      },
    ],
    cta: "Tell us your process",
  },
  pt: {
    eyebrow: "Casos de Uso",
    title: "Para qual processo construímos seu agente?",
    sub: "Cada agente é treinado com a lógica exata do seu negócio. Estes são os processos que mais delegamos.",
    items: [
      {
        title: "Agente de Vendas",
        desc: "Qualifica leads, responde consultas, faz orçamentos e agenda ligações pelo WhatsApp — 24/7, sem intervenção humana.",
        tag: "WhatsApp · CRM · Leads",
        result: "Leads qualificados sem esforço da equipe",
      },
      {
        title: "Agente de Operações",
        desc: "Gerencia seu CRM, gera relatórios automáticos e coordena fluxos internos sem que ninguém precise lembrar.",
        tag: "Make · n8n · Zapier",
        result: "Operação interna no piloto automático",
      },
      {
        title: "Agente de Onboarding",
        desc: "Integra novos clientes ou funcionários com zero atrito — guias, respostas e acompanhamento automatizados.",
        tag: "Email · Slack · Notion",
        result: "Onboarding sem carga para a equipe",
      },
      {
        title: "Agente Multi-Canal",
        desc: "Opera no WhatsApp, e-mail, web e no seu sistema ao mesmo tempo — um agente que nunca perde o contexto.",
        tag: "Omnicanal · API · Banco de dados",
        result: "Presença coerente em todos os seus canais",
      },
    ],
    cta: "Conte-nos seu processo",
  },
};

const ACCENT_COLORS = ["#00f0ff", "#47c4ff", "#818cf8", "#c084fc"];

export default function CasosDeUso() {
  const { lang } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const copy = CASOS[lang as keyof typeof CASOS] ?? CASOS.es;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="casos"
      className="section-padding relative overflow-hidden"
      style={{ background: "#0a0f1e" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,240,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest mb-4"
            style={{
              border: "1px solid rgba(0,240,255,0.2)",
              background: "rgba(0,240,255,0.05)",
              color: "#00f0ff",
              fontFamily: "var(--font-jet-brains-mono), monospace",
            }}
          >
            {copy.eyebrow}
          </div>
          <h2
            className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e5e5e5] mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            {copy.title}
          </h2>
          <p className="reveal reveal-delay-2 text-[#9e9e9e] text-base sm:text-lg max-w-2xl mx-auto">
            {copy.sub}
          </p>
        </div>

        {/* Cases grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {copy.items.map((caso, i) => {
            const Icon = ICONS[i];
            const accent = ACCENT_COLORS[i];
            return (
              <div
                key={caso.title}
                className={`reveal reveal-delay-${Math.min(i + 1, 4)} group flex flex-col rounded-2xl p-6 transition-all duration-400 hover:-translate-y-1`}
                style={{
                  background: "#0c1020",
                  border: "1px solid rgba(0,240,255,0.08)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `${accent}40`;
                  el.style.boxShadow = `0 8px 40px ${accent}10, 0 4px 24px rgba(0,0,0,0.4)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(0,240,255,0.08)";
                  el.style.boxShadow = "0 4px 24px rgba(0,0,0,0.3)";
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${accent}10`,
                    border: `1px solid ${accent}25`,
                  }}
                >
                  <Icon size={22} style={{ color: accent }} />
                </div>

                {/* Title + desc */}
                <h3
                  className="font-display font-bold text-base text-[#e5e5e5] mb-2"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {caso.title}
                </h3>
                <p className="text-[#6a6a6a] text-sm leading-relaxed mb-4 flex-grow">
                  {caso.desc}
                </p>

                {/* Tag */}
                <div
                  className="text-[10px] font-mono mb-4"
                  style={{ color: `${accent}80`, letterSpacing: "0.05em" }}
                >
                  {caso.tag}
                </div>

                {/* Result chip */}
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold w-fit"
                  style={{
                    background: `${accent}10`,
                    border: `1px solid ${accent}25`,
                    color: accent,
                  }}
                >
                  <span style={{ fontSize: "9px" }}>✦</span>
                  {caso.result}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="reveal text-center">
          <a
            href={`${WHATSAPP_URL}&text=${encodeURIComponent(
              lang === "es"
                ? "¡Hola! Me interesa hablar sobre automatizar un proceso con un agente de IA."
                : lang === "pt"
                ? "Olá! Tenho interesse em automatizar um processo com um agente de IA."
                : "Hi! I'm interested in automating a process with an AI agent."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #00f0ff, #0070ff)",
              color: "#000",
              boxShadow: "0 0 28px rgba(0,240,255,0.2)",
            }}
          >
            {copy.cta}
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
