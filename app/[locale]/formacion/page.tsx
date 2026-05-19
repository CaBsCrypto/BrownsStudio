"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { BookOpen, Play, ArrowLeft } from "lucide-react";

const content = {
  en: {
    back: "Back to home",
    eyebrow: "Coming Soon",
    title: "Training & Courses",
    sub: "We're building a library of videos, classes and practical guides on AI agents, WhatsApp automation and agentic engineering. Subscribe to be the first to know.",
    badge: "Free content · Tutorials · Live classes",
    cta: "Notify me on WhatsApp",
    msg: "Hi! I'd like to be notified when new training content is available.",
  },
  es: {
    back: "Volver al inicio",
    eyebrow: "Próximamente",
    title: "Formación",
    sub: "Estamos construyendo una biblioteca de videos, clases y guías prácticas sobre agentes IA, automatización con WhatsApp e ingeniería agéntica. Suscríbete para ser el primero en saber.",
    badge: "Contenido gratis · Tutoriales · Clases en vivo",
    cta: "Avísame por WhatsApp",
    msg: "¡Hola! Quiero que me avises cuando haya nuevo contenido de formación disponible.",
  },
  pt: {
    back: "Voltar ao início",
    eyebrow: "Em Breve",
    title: "Formação",
    sub: "Estamos construindo uma biblioteca de vídeos, aulas e guias práticos sobre agentes IA, automação com WhatsApp e engenharia agêntica. Inscreva-se para ser o primeiro a saber.",
    badge: "Conteúdo grátis · Tutoriais · Aulas ao vivo",
    cta: "Me avise pelo WhatsApp",
    msg: "Olá! Quero ser avisado quando houver novo conteúdo de formação disponível.",
  },
};

const WHATSAPP_BASE = "https://wa.me/51931054302?text=";

export default function FormacionPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "es";
  const t = content[locale as keyof typeof content] || content.es;

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6"
      style={{ background: "#050506" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(0,240,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Back link */}
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-xs text-[#5a5a5a] hover:text-[#9e9e9e] transition-colors mb-12 uppercase tracking-widest"
        >
          <ArrowLeft size={12} />
          {t.back}
        </Link>

        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8"
          style={{
            background: "rgba(0,240,255,0.06)",
            border: "1px solid rgba(0,240,255,0.15)",
          }}
        >
          <BookOpen size={28} style={{ color: "#00f0ff" }} />
        </div>

        {/* Eyebrow */}
        <p
          className="text-xs uppercase tracking-[0.25em] mb-4"
          style={{ color: "rgba(0,240,255,0.5)" }}
        >
          {t.eyebrow}
        </p>

        {/* Title */}
        <h1
          className="font-display font-bold text-4xl sm:text-5xl text-[#e5e5e5] mb-6"
          style={{ letterSpacing: "-0.03em" }}
        >
          {t.title}
        </h1>

        {/* Sub */}
        <p className="text-[#9e9e9e] text-base leading-relaxed mb-10 max-w-lg mx-auto">
          {t.sub}
        </p>

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs mb-10"
          style={{
            border: "1px solid rgba(0,240,255,0.15)",
            color: "rgba(0,240,255,0.6)",
            background: "rgba(0,240,255,0.04)",
          }}
        >
          <Play size={10} />
          {t.badge}
        </div>

        {/* CTA */}
        <div>
          <a
            href={`${WHATSAPP_BASE}${encodeURIComponent(t.msg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm text-black hover:scale-105 transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #c6c6c7, #939eb5)",
              boxShadow: "0 0 28px rgba(198,198,199,0.12)",
            }}
          >
            {t.cta}
          </a>
        </div>
      </div>
    </main>
  );
}
