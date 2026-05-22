"use client";

import { useEffect, useRef } from "react";
import { 
  ShoppingCart, 
  Settings2, 
  Users2, 
  Layers3, 
  ArrowRight,
  Brain, 
  Link2, 
  ShieldCheck, 
  Zap 
} from "lucide-react";
import { WHATSAPP_URL } from "@/lib/config";
import { useLang } from "@/lib/i18n/LanguageContext";

const USE_CASE_ICONS = [ShoppingCart, Settings2, Users2, Layers3];
const PILLAR_ICONS = [Brain, Link2, ShieldCheck, Zap];

const CASOS = {
  es: {
    eyebrow: "Agent as a Service",
    title: "No es un bot. Es la ventaja de tu negocio.",
    sub: "Nuestros agentes potencian tu operación — atienden clientes 24/7, actúan en tus sistemas reales y liberan a tu equipo para enfocarse en lo que realmente importa.",
    sectionTitleLeft: "Procesos de Negocio",
    sectionSubLeft: "Qué procesos delegamos y automatizamos",
    sectionTitleRight: "Garantías de Ingeniería",
    sectionSubRight: "Cómo funciona la tecnología bajo el capó",
    items: [
      {
        title: "Agente de Ventas",
        desc: "Califica leads, responde consultas, cotiza y agenda llamadas por WhatsApp — 24/7, sin intervención humana.",
        tag: "WhatsApp · CRM · Leads",
        result: "Leads calificados sin esfuerzo",
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
        result: "Onboarding sin sobrecarga",
      },
      {
        title: "Agente Multi-Canal",
        desc: "Opera en WhatsApp, email, web y tu sistema a la vez — un agente que nunca pierde contexto entre canales.",
        tag: "Omnicanal · API · Base de datos",
        result: "Presencia coherente multicanal",
      },
    ],
    pillars: [
      {
        title: "Razona antes de actuar",
        desc: "El agente evalúa el contexto, consulta tu knowledge base y decide la mejor acción — no solo hace matching de palabras clave.",
      },
      {
        title: "Conectado a tus herramientas",
        desc: "Calendar, CRM, Shopify, Sheets. El agente actúa en tus sistemas reales en tiempo real, sin intermediarios.",
      },
      {
        title: "Humano en el bucle",
        desc: "Antes de cualquier acción crítica (cobro, cancelación, envío masivo) el agente pausa y espera tu aprobación.",
      },
      {
        title: "Recuerda a cada cliente",
        desc: "Memoria persistente vía RAG: el agente conoce el historial, preferencias y conversaciones previas de cada cliente.",
      },
    ],
    cta: "Cuéntanos tu proceso",
    bottomNote: "¿No sabes qué plan necesitas? ",
    bottomLink: "Agenda una auditoría gratuita de 45 min.",
  },
  en: {
    eyebrow: "Agent as a Service",
    title: "Not a bot. Your business's unfair advantage.",
    sub: "Our agents power your operation — serving customers 24/7, acting on your real systems, and freeing your team to focus on what truly matters.",
    sectionTitleLeft: "Business Processes",
    sectionSubLeft: "Processes we delegate and automate most",
    sectionTitleRight: "Engineering Safeguards",
    sectionSubRight: "How the technology works under the hood",
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
        result: "Consistent multi-channel presence",
      },
    ],
    pillars: [
      {
        title: "Reasons before acting",
        desc: "The agent evaluates context, consults your knowledge base and decides the best action — not just keyword matching.",
      },
      {
        title: "Connected to your tools",
        desc: "Calendar, CRM, Shopify, Sheets. The agent acts on your real systems in real time, no human in between.",
      },
      {
        title: "Human in the loop",
        desc: "Before any critical action (payment, cancellation, bulk send) the agent pauses and waits for your approval.",
      },
      {
        title: "Remembers every customer",
        desc: "Persistent memory via RAG: the agent knows each customer's history, preferences and previous conversations.",
      },
    ],
    cta: "Tell us your process",
    bottomNote: "Not sure which tier fits? ",
    bottomLink: "Book a free 45-min process audit.",
  },
  pt: {
    eyebrow: "Agent as a Service",
    title: "Não é um bot. É a vantagem do seu negócio.",
    sub: "Nossos agentes potencializam sua operação — atendem clientes 24/7, agem nos seus sistemas reais e liberam sua equipe para focar no que realmente importa.",
    sectionTitleLeft: "Processos de Negócio",
    sectionSubLeft: "Processos que mais delegamos e automatizamos",
    sectionTitleRight: "Garantias de Engenharia",
    sectionSubRight: "Como a tecnologia funciona sob o capô",
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
        result: "Onboarding sem sobrecarga para a equipe",
      },
      {
        title: "Agente Multi-Canal",
        desc: "Opera no WhatsApp, e-mail, web e no seu sistema ao mesmo tempo — um agente que nunca perde o contexto.",
        tag: "Omnicanal · API · Banco de dados",
        result: "Presença coerente multicanal",
      },
    ],
    pillars: [
      {
        title: "Raciocina antes de agir",
        desc: "O agente avalia o contexto, consulta sua knowledge base e decide a melhor ação — não apenas faz matching de palavras.",
      },
      {
        title: "Conectado às suas ferramentas",
        desc: "Calendar, CRM, Shopify, Sheets. O agente age nos seus sistemas reais em tempo real, sem intermediários.",
      },
      {
        title: "Humano no laço",
        desc: "Antes de qualquer ação crítica (cobrança, cancelamento, envio em massa) o agente pausa e aguarda sua aprovação.",
      },
      {
        title: "Lembra de cada cliente",
        desc: "Memória persistente via RAG: o agente conhece o histórico, preferências e conversas anteriores de cada cliente.",
      },
    ],
    cta: "Conte-nos seu processo",
    bottomNote: "Não sabe qual plano precisa? ",
    bottomLink: "Agende uma auditoria gratuita de 45 min.",
  },
};

const ACCENT_COLORS = ["#00f0ff", "#3b82f6", "#818cf8", "#c084fc"];

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
              setTimeout(() => el.classList.add("visible"), i * 80);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="section-padding relative overflow-hidden"
      style={{ background: "#060608" }}
    >
      {/* Ambient decorative glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,240,255,0.03) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Main Eyecatching Header ── */}
        <div className="text-center mb-16 lg:mb-20">
          <div
            className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-widest mb-4"
            style={{
              border: "1px solid rgba(0,240,255,0.15)",
              background: "rgba(0,240,255,0.03)",
              color: "#00f0ff",
              fontFamily: "var(--font-jet-brains-mono), monospace",
            }}
          >
            {copy.eyebrow}
          </div>
          <h2
            className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e5e5e5] mb-4 tracking-tight"
            style={{ letterSpacing: "-0.03em" }}
          >
            {copy.title.split(".")[0] + "."}{" "}
            <span className="text-gradient-cyan-purple font-extrabold">
              {copy.title.split(".")[1]?.trim()}
            </span>
          </h2>
          <p className="reveal reveal-delay-2 text-[#88888b] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {copy.sub}
          </p>
        </div>

        {/* ── Asymmetric Bento Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-stretch">
          
          {/* LEFT COLUMN: Business Use Cases (Col span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="reveal flex flex-col gap-1 mb-2">
              <h3 className="font-display font-bold text-lg text-[#e5e5e5]" style={{ letterSpacing: "-0.01em" }}>
                {copy.sectionTitleLeft}
              </h3>
              <p className="text-[#555558] text-[10px] font-mono uppercase tracking-wider">
                {copy.sectionSubLeft}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {copy.items.map((caso, i) => {
                const Icon = USE_CASE_ICONS[i];
                const accent = ACCENT_COLORS[i];
                return (
                  <div
                    key={caso.title}
                    className={`reveal reveal-delay-${i + 1} group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-5 rounded-2xl transition-all duration-400 border`}
                    style={{
                      background: "#0c0d12",
                      borderColor: "rgba(255,255,255,0.03)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = `${accent}25`;
                      el.style.background = "#0e1017";
                      el.style.boxShadow = `0 8px 30px ${accent}06, 0 4px 20px rgba(0,0,0,0.3)`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "rgba(255,255,255,0.03)";
                      el.style.background = "#0c0d12";
                      el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
                    }}
                  >
                    {/* Left details */}
                    <div className="flex items-start gap-4">
                      {/* Icon with glowing box */}
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: `${accent}0c`,
                          border: `1px solid ${accent}20`,
                        }}
                      >
                        <Icon size={18} style={{ color: accent }} />
                      </div>

                      {/* Text details */}
                      <div>
                        <h4 className="font-display font-semibold text-sm text-[#e5e5e5] mb-1">
                          {caso.title}
                        </h4>
                        <p className="text-[#727278] text-xs leading-relaxed max-w-md">
                          {caso.desc}
                        </p>
                        <div
                          className="text-[9px] font-mono mt-2"
                          style={{ color: `${accent}a0`, letterSpacing: "0.05em" }}
                        >
                          {caso.tag}
                        </div>
                      </div>
                    </div>

                    {/* Right neon capsule outcome badge */}
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold self-start sm:self-auto transition-all duration-300 group-hover:scale-105"
                      style={{
                        background: `${accent}0c`,
                        border: `1px solid ${accent}20`,
                        color: accent,
                        fontFamily: "var(--font-jet-brains-mono), monospace",
                      }}
                    >
                      <span className="animate-pulse" style={{ fontSize: "8px" }}>✦</span>
                      {caso.result}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Engineering Architecture Specs (Col span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6 h-full">
            <div className="reveal flex flex-col gap-1 mb-2">
              <h3 className="font-display font-bold text-lg text-[#e5e5e5]" style={{ letterSpacing: "-0.01em" }}>
                {copy.sectionTitleRight}
              </h3>
              <p className="text-[#555558] text-[10px] font-mono uppercase tracking-wider">
                {copy.sectionSubRight}
              </p>
            </div>

            {/* The Unified Specs Blue Console Box */}
            <div
              className="reveal reveal-delay-2 flex-grow rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden border"
              style={{
                background: "#08090d",
                borderColor: "rgba(0, 240, 255, 0.08)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
              }}
            >
              {/* Corner tech lines */}
              <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-20 border-t border-r border-[#00f0ff] rounded-tr-3xl" />
              
              {/* Dashboard Title Bar */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.04]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
                  <span
                    className="text-[9px] font-mono font-bold tracking-widest text-[#00f0ff] uppercase"
                  >
                    SYSTEM CORE ACTIVE
                  </span>
                </div>
                <span className="text-[9px] font-mono text-[#555558]">V2.4.9</span>
              </div>

              {/* Vertical flow map of pillars */}
              <div className="flex flex-col gap-6 relative pl-3">
                {/* Node Line connecting the elements */}
                <div 
                  className="absolute left-6 top-3 bottom-3 w-px pointer-events-none bg-gradient-to-b from-[#00f0ff]/40 via-[#818cf8]/20 to-transparent" 
                />

                {copy.pillars.map((pillar, i) => {
                  const Icon = PILLAR_ICONS[i];
                  const accent = ACCENT_COLORS[i];
                  return (
                    <div key={pillar.title} className="flex gap-4 relative z-10">
                      {/* Node Icon Circle */}
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110"
                        style={{
                          background: "#0c0d12",
                          border: `1px solid ${accent}40`,
                          boxShadow: `0 0 10px ${accent}20`,
                        }}
                      >
                        <Icon size={12} style={{ color: accent }} />
                      </div>

                      {/* Spec content */}
                      <div>
                        <h5 className="text-[12px] font-bold text-[#e5e5e5] mb-0.5 tracking-tight uppercase font-mono">
                          {pillar.title}
                        </h5>
                        <p className="text-[#646467] text-[11px] leading-relaxed max-w-sm">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom technical diagnostic tag */}
              <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center justify-between text-[8px] font-mono text-[#444448]">
                <span>LATENCY: &lt;140ms</span>
                <span>RAG ACCURACY: 99.8%</span>
                <span>HUMAN-SAFE GATEWAY: ON</span>
              </div>
            </div>
          </div>

        </div>

        {/* ── Main Dynamic CTA ── */}
        <div className="reveal text-center mt-12 flex flex-col items-center gap-4">
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
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full font-bold text-xs uppercase tracking-widest text-black transition-all duration-300 hover:scale-105 cursor-pointer shadow-[0_0_30px_rgba(0,240,255,0.15)]"
            style={{
              background: "linear-gradient(135deg, #00f0ff, #0070ff)",
            }}
          >
            {copy.cta}
            <ArrowRight size={14} />
          </a>

          {/* Bottom Note */}
          <p className="text-[#555558] text-xs mt-2">
            {copy.bottomNote}
            <a
              href={`${WHATSAPP_URL}&text=${encodeURIComponent(
                lang === "es"
                  ? "Hola, quiero agendar una auditoría gratuita de procesos."
                  : lang === "pt"
                  ? "Olá, quero agendar uma auditoria gratuita de processos."
                  : "Hi, I'd like to book a free process audit."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#98989c] hover:text-[#00f0ff] underline transition-colors duration-200 ml-1"
            >
              {copy.bottomLink}
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
