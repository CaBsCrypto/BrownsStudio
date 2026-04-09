"use client";

import { useEffect, useRef } from "react";
import { MessageCircle, Mail } from "lucide-react";
import { SITE_CONFIG, WHATSAPP_URL } from "@/lib/config";
import { useLang } from "@/lib/i18n/LanguageContext";

export default function CTA() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="relative section-padding overflow-hidden"
    >
      {/* Subtle cyan glow behind content */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,240,255,0.04) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Status badge */}
        <div
          className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest mb-6"
          style={{
            border:     "1px solid rgba(0,240,255,0.2)",
            background: "rgba(0,240,255,0.05)",
            color:      "#00f0ff",
            fontFamily: "var(--font-jet-brains-mono), monospace",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00f0ff" }} />
          {t.cta.spots}: {SITE_CONFIG.spotsAvailable}
        </div>

        {/* Headline */}
        <h2
          className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#e5e5e5] mb-6 leading-tight"
          style={{ letterSpacing: "-0.03em" }}
        >
          {t.cta.title}
        </h2>

        <p className="reveal reveal-delay-2 text-lg sm:text-xl mb-4 max-w-xl mx-auto leading-relaxed" style={{ color: "#7a7a7a" }}>
          {t.cta.sub}
        </p>

        <p className="reveal reveal-delay-2 text-sm mb-10" style={{ color: "#3a3a3a" }}>
          {t.cta.note}
        </p>

        {/* CTAs */}
        <div className="reveal reveal-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm text-black hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center"
            style={{
              background: "linear-gradient(135deg, #c6c6c7, #939eb5)",
              boxShadow:  "0 0 28px rgba(198,198,199,0.12)",
            }}
          >
            <MessageCircle size={16} className="group-hover:scale-110 transition-transform" />
            {t.cta.whatsapp}
          </a>
          <a
            href={`mailto:${SITE_CONFIG.email}?subject=Consulta de proyecto web&body=Hola, me interesa cotizar un proyecto web para mi negocio.`}
            className="group flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm transition-all duration-300 w-full sm:w-auto justify-center"
            style={{ border: "1px solid rgba(0,240,255,0.18)", color: "rgba(0,240,255,0.7)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,240,255,0.45)";
              (e.currentTarget as HTMLElement).style.color = "#00f0ff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,240,255,0.18)";
              (e.currentTarget as HTMLElement).style.color = "rgba(0,240,255,0.7)";
            }}
          >
            <Mail size={16} className="group-hover:scale-110 transition-transform" />
            {t.cta.email}
          </a>
        </div>

        {/* Trust signals */}
        <div
          className="reveal reveal-delay-4 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs uppercase tracking-widest"
          style={{ color: "rgba(0,240,255,0.25)", fontFamily: "var(--font-jet-brains-mono), monospace" }}
        >
          <span>{t.cta.check1}</span>
          <span>{t.cta.check2}</span>
          <span>{t.cta.check3}</span>
        </div>
      </div>
    </section>
  );
}
