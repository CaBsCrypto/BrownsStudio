"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Mail, ChevronDown, ExternalLink } from "lucide-react";
import { SITE_CONFIG, WHATSAPP_URL, getWhatsAppLink, getWhatsAppWithPackage } from "@/lib/config";
import { useLang } from "@/lib/i18n/LanguageContext";

export default function CTA() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      className="relative overflow-hidden pt-8 pb-4 md:pt-12 md:pb-6 bg-transparent"
      style={{ background: "transparent", paddingBottom: "10%" }}
    >
      {/* Subtle cyan glow behind content */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,240,255,0.04) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">

        {/* Headline */}
        <h2
          className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#e5e5e5] mb-4 leading-tight"
          style={{ letterSpacing: "-0.03em" }}
        >
          {t.cta.title}
        </h2>

        <p className="reveal reveal-delay-2 text-lg sm:text-xl mb-3 max-w-xl mx-auto leading-relaxed" style={{ color: "#9e9e9e" }}>
          {t.cta.sub}
        </p>

        <p className="reveal reveal-delay-2 text-sm mb-4" style={{ color: "#7c7c7c" }}>
          {t.cta.note}
        </p>

        {/* CTAs */}
        <div className="reveal reveal-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 relative">
          <div className="relative w-full sm:w-auto" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="group flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm text-black hover:scale-105 active:scale-[0.97] transition-all duration-300 w-full sm:w-auto justify-center"
              style={{
                background: "linear-gradient(135deg, #c6c6c7, #939eb5)",
                boxShadow:  "0 0 28px rgba(198,198,199,0.12)",
              }}
            >
              <MessageCircle size={16} className="group-hover:scale-110 transition-transform" />
              {t.cta.whatsapp}
              <ChevronDown size={14} className={`transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute bottom-full mb-4 left-0 right-0 sm:left-auto sm:right-auto sm:min-w-[280px] glass rounded-2xl p-2 border-ghost shadow-2xl animate-in slide-in-from-bottom-2 duration-300 z-50">
                {t.cta.contactOptions.map((opt: { label: string; msg: string }, i: number) => (
                  <a
                    key={i}
                    href={getWhatsAppLink(opt.msg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl text-sm text-[#e5e5e5] hover:bg-white/5 transition-colors group/item"
                    onClick={() => setShowDropdown(false)}
                  >
                    <span>{opt.label}</span>
                    <ExternalLink size={12} className="opacity-0 group-hover/item:opacity-100 transition-opacity text-[#47c4ff]" />
                  </a>
                ))}
              </div>
            )}
          </div>
          <a
            href={`mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(t.cta.emailSubject)}&body=${encodeURIComponent(t.cta.emailBody)}`}
            className="group flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm hover:scale-105 active:scale-[0.97] transition-all duration-300 w-full sm:w-auto justify-center"
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
          style={{ color: "rgba(0,240,255,0.48)", fontFamily: "var(--font-jet-brains-mono), monospace" }}
        >
          <span>{t.cta.check1}</span>
          <span>{t.cta.check2}</span>
          <span>{t.cta.check3}</span>
        </div>
      </div>
    </section>
  );
}
