"use client";

import { useEffect, useRef } from "react";
import { Brain, Link2, ShieldCheck, Zap, ArrowRight, MessageSquare } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/config";
import { useLang } from "@/lib/i18n/LanguageContext";

/* ── Localized content ─────────────────────────────────────────────────── */
const content = {
  en: {
    eyebrow: "Agent as a Service",
    title: "Not a bot. A digital worker.",
    sub: "Our agents reason, act on your real systems, remember every customer, and ask for your approval before doing anything critical.",
    tiers: [
      {
        tag: "Entry Point",
        name: "Agent Starter",
        price: "$500",
        period: " setup",
        setup: "+ $100/mo maintenance",
        desc: "WhatsApp's native agent configured and maintained. Responds 24/7 in your brand voice.",
        features: ["Knowledge base updated monthly", "Agentic loop: reason → respond → qualify", "Escalation to human when needed", "Monthly conversation report"],
        cta: "Activate my agent",
        msg: "Hi! I'm interested in the Agent Starter plan ($500 setup + $100/mo).",
        accent: "#c6c6c7",
        popular: false,
      },
      {
        tag: "Most Recommended",
        name: "Agent Pro",
        price: "$1,500+",
        period: " setup",
        setup: "+ $200/mo maintenance",
        desc: "Custom-coded agent connected to your real systems. Books, qualifies and sells — with you validating key actions.",
        features: ["Real-time integrations (Calendar, CRM, Shopify)", "Persistent customer memory (RAG)", "Approval gates for critical actions", "Monthly optimization + observability report"],
        cta: "Build my agent",
        msg: "Hi! I'm interested in the Agent Pro plan ($1500 setup + $200/mo).",
        accent: "#00f0ff",
        popular: true,
      },
      {
        tag: "Enterprise",
        name: "Agent Enterprise",
        price: "Custom",
        period: "",
        setup: "+ $300+/mo maintenance",
        desc: "Multi-agent orchestration system for complex operations. Designed, built and operated by us.",
        features: ["LangGraph multi-agent orchestration", "Internal knowledge agent for your team", "Full observability (LangFuse)", "Dedicated engineering support"],
        cta: "Book a call",
        msg: "Hi! I'd like to discuss an Enterprise Agentic System ($300+/mo).",
        accent: "#c8a45e",
        popular: false,
      },
    ],
    pillarsTitle: "Why our agents are different",
    pillars: [
      { icon: Brain,       title: "Reasons before acting",      desc: "The agent evaluates context, consults your knowledge base and decides the best action — not just keyword matching." },
      { icon: Link2,       title: "Connected to your real tools", desc: "Calendar, CRM, Shopify, Sheets. The agent acts on your real systems in real time, with no human in between." },
      { icon: ShieldCheck, title: "Human in the loop",           desc: "Before any critical action (payment, cancellation, bulk send) the agent pauses and waits for your approval." },
      { icon: Zap,         title: "Remembers every customer",    desc: "Persistent memory via RAG: the agent knows each customer's history, preferences and previous conversations." },
    ],
    bottomNote: "Not sure which tier fits? ",
    bottomLink: "Book a free 45-min process audit.",
  },
  es: {
    eyebrow: "Agent as a Service",
    title: "No es un bot. Es un trabajador digital.",
    sub: "Nuestros agentes razonan, actúan en tus sistemas reales, recuerdan a cada cliente y te piden aprobación antes de hacer algo crítico.",
    tiers: [
      {
        tag: "Punto de Entrada",
        name: "Agent Starter",
        price: "$500",
        period: " setup",
        setup: "+ $100/mes de mantenimiento",
        desc: "El agente nativo de WhatsApp configurado y mantenido. Responde 24/7 con el tono exacto de tu marca.",
        features: ["Knowledge base actualizado cada mes", "Bucle agéntico: razona → responde → califica", "Escalación a humano cuando es necesario", "Reporte mensual de conversaciones"],
        cta: "Activar mi agente",
        msg: "¡Hola! Me interesa el plan Agent Starter ($500 setup + $100/mes).",
        accent: "#c6c6c7",
        popular: false,
      },
      {
        tag: "Más Recomendado",
        name: "Agent Pro",
        price: "$1,500+",
        period: " setup",
        setup: "+ $200/mes de mantenimiento",
        desc: "Agente programado a medida conectado a tus sistemas reales. Agenda, califica y vende — con tú validando las acciones clave.",
        features: ["Integraciones en tiempo real (Calendar, CRM, Shopify)", "Memoria persistente de clientes (RAG)", "Approval gates para acciones críticas", "Optimización mensual + reporte de observabilidad"],
        cta: "Construir mi agente",
        msg: "¡Hola! Me interesa el plan Agent Pro ($1,500 setup + $200/mes).",
        accent: "#00f0ff",
        popular: true,
      },
      {
        tag: "Empresarial",
        name: "Agent Enterprise",
        price: "A cotizar",
        period: "",
        setup: "+ $300+/mes de mantenimiento",
        desc: "Sistema multi-agente para operaciones complejas. Diseñado, construido y operado por nosotros.",
        features: ["Orquestación multi-agente con LangGraph", "Agente de conocimiento interno para tu equipo", "Observabilidad completa (LangFuse)", "Soporte de ingeniería dedicado"],
        cta: "Agendar llamada",
        msg: "¡Hola! Me gustaría hablar sobre un Sistema Agéntico Empresarial ($300+/mes).",
        accent: "#c8a45e",
        popular: false,
      },
    ],
    pillarsTitle: "Por qué nuestros agentes son diferentes",
    pillars: [
      { icon: Brain,       title: "Razona antes de actuar",        desc: "El agente evalúa el contexto, consulta tu knowledge base y decide la mejor acción — no solo hace matching de palabras clave." },
      { icon: Link2,       title: "Conectado a tus herramientas",  desc: "Calendar, CRM, Shopify, Sheets. El agente actúa en tus sistemas reales en tiempo real, sin intermediarios." },
      { icon: ShieldCheck, title: "Humano en el bucle",            desc: "Antes de cualquier acción crítica (cobro, cancelación, envío masivo) el agente pausa y espera tu aprobación." },
      { icon: Zap,         title: "Recuerda a cada cliente",       desc: "Memoria persistente vía RAG: el agente conoce el historial, preferencias y conversaciones previas de cada cliente." },
    ],
    bottomNote: "¿No sabes qué tier necesitas? ",
    bottomLink: "Agenda una auditoría gratuita de 45 min.",
  },
  pt: {
    eyebrow: "Agent as a Service",
    title: "Não é um bot. É um trabalhador digital.",
    sub: "Nossos agentes raciocinam, agem nos seus sistemas reais, lembram de cada cliente e pedem sua aprovação antes de fazer algo crítico.",
    tiers: [
      {
        tag: "Ponto de Entrada",
        name: "Agent Starter",
        price: "$500",
        period: " setup",
        setup: "+ $100/mês de manutenção",
        desc: "O agente nativo do WhatsApp configurado e mantido. Responde 24/7 com o tom exato da sua marca.",
        features: ["Knowledge base atualizado todo mês", "Laço agêntico: raciocina → responde → qualifica", "Escalação para humano quando necessário", "Relatório mensal de conversas"],
        cta: "Ativar meu agente",
        msg: "Olá! Tenho interesse no plano Agent Starter ($500 setup + $100/mês).",
        accent: "#c6c6c7",
        popular: false,
      },
      {
        tag: "Mais Recomendado",
        name: "Agent Pro",
        price: "$1.500+",
        period: " setup",
        setup: "+ $200/mês de manutenção",
        desc: "Agente programado sob medida conectado aos seus sistemas reais. Agenda, qualifica e vende — com você validando as ações-chave.",
        features: ["Integrações em tempo real (Calendar, CRM, Shopify)", "Memória persistente de clientes (RAG)", "Approval gates para ações críticas", "Otimização mensal + relatório de observabilidade"],
        cta: "Construir meu agente",
        msg: "Olá! Tenho interesse no plano Agent Pro ($1.500 setup + $200/mês).",
        accent: "#00f0ff",
        popular: true,
      },
      {
        tag: "Empresarial",
        name: "Agent Enterprise",
        price: "A cotizar",
        period: "",
        setup: "+ $300+/mês de manutenção",
        desc: "Sistema multi-agente para operações complexas. Projetado, concluído e operado por nós.",
        features: ["Orquestração multi-agente com LangGraph", "Agente de conhecimento interno para sua equipe", "Observabilidade completa (LangFuse)", "Suporte de engenharia dedicado"],
        cta: "Agendar chamada",
        msg: "Olá! Gostaria de falar sobre um Sistema Agêntico Empresarial ($300+/mês).",
        accent: "#c8a45e",
        popular: false,
      },
    ],
    pillarsTitle: "Por que nossos agentes são diferentes",
    pillars: [
      { icon: Brain,       title: "Raciocina antes de agir",       desc: "O agente avalia o contexto, consulta sua knowledge base e decide a melhor ação — não apenas faz matching de palavras." },
      { icon: Link2,       title: "Conectado às suas ferramentas", desc: "Calendar, CRM, Shopify, Sheets. O agente age nos seus sistemas reais em tempo real, sem intermediários." },
      { icon: ShieldCheck, title: "Humano no laço",                desc: "Antes de qualquer ação crítica (cobrança, cancelamento, envio em massa) o agente pausa e aguarda sua aprovação." },
      { icon: Zap,         title: "Lembra de cada cliente",        desc: "Memória persistente via RAG: o agente conhece o histórico, preferências e conversas anteriores de cada cliente." },
    ],
    bottomNote: "Não sabe qual tier precisa? ",
    bottomLink: "Agende uma auditoria gratuita de 45 min.",
  },
};

/* ── Component ─────────────────────────────────────────────────────────── */
export default function Servicios() {
  const { lang } = useLang();
  const t = content[lang as keyof typeof content] || content.es;
  const sectionRef = useRef<HTMLElement>(null);

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
    <section ref={sectionRef} id="servicios" className="section-padding" style={{ background: "#0a0a0b" }}>
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <div
            className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest mb-4"
            style={{ border: "1px solid rgba(0,240,255,0.2)", background: "rgba(0,240,255,0.05)", color: "#00f0ff" }}
          >
            {t.eyebrow}
          </div>
          <h2
            className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e5e5e5] mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            {t.title.split(".")[0] + "."}{" "}
            <span className="text-gradient-gold">{t.title.split(".")[1]?.trim()}</span>
          </h2>
          <p className="reveal reveal-delay-2 text-[#9e9e9e] text-base max-w-xl mx-auto leading-relaxed">
            {t.sub}
          </p>
        </div>

        {/* ── Service Tiers ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
          {t.tiers.map((tier, i) => (
            <div
              key={tier.name}
              className={`reveal reveal-delay-${i + 1} relative rounded-2xl p-6 flex flex-col transition-all duration-300`}
              style={{
                background: tier.popular ? "rgba(0,240,255,0.03)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${tier.popular ? "rgba(0,240,255,0.2)" : "rgba(72,72,72,0.15)"}`,
              }}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-black whitespace-nowrap"
                  style={{ background: "linear-gradient(135deg, #00f0ff, #0090b3)" }}
                >
                  {tier.tag}
                </div>
              )}

              {/* Tag (non-popular) */}
              {!tier.popular && (
                <span className="text-xs uppercase tracking-widest mb-4 font-medium" style={{ color: `${tier.accent}80` }}>
                  {tier.tag}
                </span>
              )}
              {tier.popular && <div className="mb-4 mt-2" />}

              {/* Name */}
              <h3 className="font-display font-bold text-xl text-[#e5e5e5] mb-1" style={{ letterSpacing: "-0.02em" }}>
                {tier.name}
              </h3>

              {/* Price */}
              <div className="flex items-end gap-1 mb-1">
                <span className="text-3xl font-display font-bold" style={{ color: tier.accent }}>
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="text-sm text-[#5a5a5a] mb-1">{tier.period}</span>
                )}
              </div>
              <p className="text-xs text-[#5a5a5a] mb-4">{tier.setup}</p>

              {/* Desc */}
              <p className="text-[#9e9e9e] text-sm leading-relaxed mb-6">{tier.desc}</p>

              {/* Features */}
              <ul className="space-y-2.5 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[#9e9e9e]">
                    <span className="mt-0.5 text-xs" style={{ color: tier.accent }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={`${WHATSAPP_URL}&text=${encodeURIComponent(tier.msg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02]"
                style={
                  tier.popular
                    ? { background: "linear-gradient(135deg, #00f0ff20, #00f0ff10)", border: "1px solid rgba(0,240,255,0.3)", color: "#00f0ff" }
                    : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(72,72,72,0.2)", color: "#9e9e9e" }
                }
              >
                <MessageSquare size={14} />
                {tier.cta}
                <ArrowRight size={13} />
              </a>
            </div>
          ))}
        </div>

        {/* ── 4 Differentiator Pillars ── */}
        <div className="mb-12">
          <p className="reveal text-center text-xs uppercase tracking-[0.2em] text-[#5a5a5a] mb-8">
            {t.pillarsTitle}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className={`reveal reveal-delay-${i + 1} p-5 rounded-xl`}
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(72,72,72,0.1)" }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: "rgba(0,240,255,0.06)", border: "1px solid rgba(0,240,255,0.12)" }}
                  >
                    <Icon size={16} style={{ color: "#00f0ff" }} />
                  </div>
                  <p className="text-[#e5e5e5] font-semibold text-sm mb-2">{p.title}</p>
                  <p className="text-[#5a5a5a] text-xs leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Bottom note ── */}
        <p className="reveal text-center text-[#5a5a5a] text-sm">
          {t.bottomNote}
          <a
            href={`${WHATSAPP_URL}&text=${encodeURIComponent("Hola, quiero agendar una auditoría gratuita de procesos.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9e9e9e] hover:text-[#00f0ff] transition-colors duration-200"
          >
            {t.bottomLink}
          </a>
        </p>

      </div>
    </section>
  );
}
