"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Sparkles, ChevronDown, ExternalLink } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/config";
import { useLang } from "@/lib/i18n/LanguageContext";

const CLIENT_LOGOS = [
  { name: "Trust Leaf",       abbr: "TL", color: "#C5A070" },
  { name: "PizzaDAO",         abbr: "PZ", color: "#c084fc" },
  { name: "Umbra Hub",        abbr: "UH", color: "#818cf8" },
  { name: "Morales Araya",    abbr: "MA", color: "#c8a45e" },
  { name: "GM Nail",          abbr: "GM", color: "#f472b6" },
  { name: "BS Tracker",       abbr: "BS", color: "#5865F2" },
];

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

const statNumerics = [
  { numeric: 8,   suffix: "+" },
  { numeric: 7,   suffix: ""  },
  { numeric: 100, suffix: "%" },
];

function StatItem({ numeric, suffix, label, active }: { numeric: number; suffix: string; label: string; active: boolean }) {
  const count = useCountUp(numeric, 1200, active);
  return (
    <div className="text-center">
      <div
        className="text-2xl sm:text-3xl font-display font-bold"
        style={{ letterSpacing: "-0.03em", color: "#00f0ff" }}
      >
        {count}{suffix}
      </div>
      <div style={{ color: "rgba(0,240,255,0.4)", fontSize: "10px", marginTop: "4px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
        {label}
      </div>
    </div>
  );
}

export default function Hero() {
  const { t } = useLang();
  const heroRef      = useRef<HTMLElement>(null);
  const [statsActive, setStatsActive] = useState(false);
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
              setTimeout(() => el.classList.add("visible"), i * 130);
            });
            setTimeout(() => setStatsActive(true), 650);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const statLabels = [t.hero.stat1, t.hero.stat2, t.hero.stat3];

  return (
    <section
      ref={heroRef}
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Radial vignette — lets BrownsOS canvas show through ──────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 20% 50%, rgba(0,240,255,0.04) 0%, transparent 70%)," +
            "radial-gradient(ellipse 50% 60% at 80% 50%, rgba(0,0,0,0.5) 0%, transparent 80%)",
        }}
      />

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 pb-16">
        <div className="max-w-2xl">

          {/* Badge */}
          <div
            className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8 uppercase tracking-widest"
            style={{
              border:     "1px solid rgba(0,240,255,0.2)",
              background: "rgba(0,240,255,0.05)",
              color:      "#00f0ff",
              fontFamily: "var(--font-jet-brains-mono), monospace",
            }}
          >
            <Sparkles size={11} className="animate-pulse" />
            {t.hero.badge}
          </div>

          {/* Headline */}
          <h1
            className="reveal reveal-delay-1 font-display font-bold text-[2.8rem] sm:text-5xl md:text-[3.8rem] text-[#e5e5e5] mb-6 leading-[1.04]"
            style={{ letterSpacing: "-0.03em" }}
          >
            {t.hero.line1}
            <br />
            <span className="text-gradient-gold">{t.hero.line2}</span>
            <br />
            {t.hero.line3}
          </h1>

          {/* Body */}
          <p className="reveal reveal-delay-2 text-base leading-relaxed mb-10 max-w-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
            {t.hero.sub}
          </p>

          {/* CTAs */}
          <div className="reveal reveal-delay-3 flex flex-col sm:flex-row items-start gap-4 mb-14">
            <div className="relative w-full sm:w-auto" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="group flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm text-black hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center"
                style={{
                  background:  "linear-gradient(135deg, #c6c6c7, #939eb5)",
                  boxShadow:   "0 0 28px rgba(198,198,199,0.12)",
                }}
              >
                <MessageCircle size={15} className="group-hover:scale-110 transition-transform" />
                {t.hero.cta1}
                <ChevronDown size={14} className={`transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute top-full mt-2 left-0 right-0 sm:left-auto sm:right-auto sm:min-w-[280px] glass rounded-2xl p-2 border-ghost shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300 z-50">
                  {t.cta.contactOptions.map((opt: { label: string; msg: string }, i: number) => (
                    <a
                      key={i}
                      href={`${WHATSAPP_URL}&text=${encodeURIComponent(opt.msg)}`}
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

            <button
              onClick={() => document.getElementById("precios")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm transition-all duration-300 w-full sm:w-auto justify-center"
              style={{
                border: "1px solid rgba(0,240,255,0.2)",
                color:  "rgba(0,240,255,0.7)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,240,255,0.5)";
                (e.currentTarget as HTMLButtonElement).style.color       = "#00f0ff";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,240,255,0.2)";
                (e.currentTarget as HTMLButtonElement).style.color       = "rgba(0,240,255,0.7)";
              }}
            >
              {t.hero.cta2}
            </button>
          </div>

          {/* Stats pill */}
          <div
            className="reveal reveal-delay-4 inline-grid grid-cols-3 gap-8 p-5 rounded-2xl"
            style={{
              background: "rgba(0,10,15,0.85)",
              border:     "1px solid rgba(0,240,255,0.1)",
            }}
          >
            {statNumerics.map((s, i) => (
              <StatItem key={i} numeric={s.numeric} suffix={s.suffix} label={statLabels[i]} active={statsActive} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
