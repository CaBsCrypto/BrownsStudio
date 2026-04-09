"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { proyectos } from "@/data/proyectos";
import ProyectoCard from "./ProyectoCard";
import { WHATSAPP_URL } from "@/lib/config";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageContext";

export default function Portfolio() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = proyectos.length;

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
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const handleScroll = () => {
      const cards = track.querySelectorAll<HTMLElement>("[data-card-index]");
      let closest = 0, minDiff = Infinity;
      cards.forEach((card) => {
        const idx  = parseInt(card.dataset.cardIndex!);
        const diff = Math.abs(card.offsetLeft - track.scrollLeft);
        if (diff < minDiff) { minDiff = diff; closest = idx; }
      });
      setActiveIndex(closest);
    };
    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCard = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(`[data-card-index="${index}"]`);
    if (card) track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  }, []);

  const prev = () => scrollToCard(Math.max(0, activeIndex - 1));
  const next = () => scrollToCard(Math.min(total - 1, activeIndex + 1));

  // Autoplay — avanza cada 3.5s, se pausa si el usuario interactúa
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActiveIndex((current) => {
        const next = current >= total - 1 ? 0 : current + 1;
        scrollToCard(next);
        return next;
      });
    }, 3500);
    return () => clearInterval(timer);
  }, [paused, total, scrollToCard]);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="section-padding overflow-hidden"
    >
      {/* Subtle orb behind the section */}
      <div
        className="absolute inset-x-0 top-0 h-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 70% 40%, rgba(0,240,255,0.02) 0%, transparent 60%)" }}
      />

      <div className="relative max-w-7xl mx-auto">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <div
              className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest mb-4"
              style={{ border: "1px solid rgba(71,196,255,0.2)", background: "rgba(71,196,255,0.05)", color: "#47c4ff" }}
            >
              {t.portfolio.eyebrow}
            </div>
            <h2
              className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e5e5e5] leading-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              {t.portfolio.title}
            </h2>
          </div>

          {/* Counter + arrows */}
          <div className="reveal reveal-delay-2 flex items-center gap-3 flex-shrink-0 pb-1">
            <span className="text-[#484848] text-sm tabular-nums font-mono">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
            <button
              onClick={prev}
              disabled={activeIndex === 0}
              aria-label={t.portfolio.prevLabel}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
              style={{
                background: "#1f1f1f",
                border: "1px solid rgba(72,72,72,0.3)",
                color: "#9e9e9e",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(71,196,255,0.4)";
                el.style.color = "#47c4ff";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(72,72,72,0.3)";
                el.style.color = "#9e9e9e";
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              disabled={activeIndex >= total - 1}
              aria-label={t.portfolio.nextLabel}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
              style={{
                background: "#1f1f1f",
                border: "1px solid rgba(72,72,72,0.3)",
                color: "#9e9e9e",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(71,196,255,0.4)";
                el.style.color = "#47c4ff";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(72,72,72,0.3)";
                el.style.color = "#9e9e9e";
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel track */}
        <div className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setTimeout(() => setPaused(false), 3000)}
        >
          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto no-scrollbar pb-4"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {proyectos.map((proyecto, i) => (
              <div
                key={proyecto.slug}
                data-card-index={i}
                className="flex-none w-[80vw] sm:w-[340px] lg:w-[380px]"
                style={{ scrollSnapAlign: "start" }}
              >
                <ProyectoCard proyecto={proyecto} index={0} />
              </div>
            ))}
            <div className="flex-none w-4 sm:w-8" aria-hidden="true" />
          </div>

          {/* Edge fades — fades to void */}
          <div
            className="absolute right-0 top-0 bottom-4 w-24 pointer-events-none"
            style={{ background: "linear-gradient(to left, #050505, transparent)" }}
          />
          <div
            className="absolute left-0 top-0 bottom-4 w-24 pointer-events-none transition-opacity duration-300"
            style={{
              background: "linear-gradient(to right, #050505, transparent)",
              opacity: activeIndex > 0 ? 1 : 0,
            }}
          />
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-5 mb-12">
          {proyectos.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              aria-label={`${t.portfolio.dotLabel} ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-6 bg-[#47c4ff]"
                  : "w-1.5 bg-[#262626] hover:bg-[#484848]"
              }`}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="reveal text-center">
          <p className="text-[#5a5a5a] text-sm mb-4">
            {t.portfolio.cta}
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-black font-semibold hover:scale-105 transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #c6c6c7, #939eb5)",
              boxShadow: "0 0 24px rgba(198,198,199,0.15)",
            }}
          >
            {t.portfolio.ctaBtn}
          </a>
        </div>
      </div>
    </section>
  );
}
