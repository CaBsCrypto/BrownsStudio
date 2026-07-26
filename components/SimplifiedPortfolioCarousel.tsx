"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { proyectos } from "@/data/proyectos";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageContext";

export default function SimplifiedPortfolioCarousel() {
  const { lang, t } = useLang();
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = proyectos.length;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const trackWidth = track.offsetWidth;
      const scrollLeft = track.scrollLeft;
      const cards = track.querySelectorAll<HTMLElement>("[data-card-index]");
      
      let closestIdx = 0;
      let minDistance = Infinity;

      cards.forEach((card) => {
        const idx = parseInt(card.dataset.cardIndex!);
        const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
        const trackCenter = scrollLeft + (trackWidth / 2);
        const distance = Math.abs(cardCenter - trackCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });

      setActiveIndex((current) => {
        if (closestIdx !== current) return closestIdx;
        return current;
      });
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCard = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(`[data-card-index="${index}"]`);
    if (card) {
      const trackWidth = track.offsetWidth;
      const cardWidth = card.offsetWidth;
      const targetScroll = card.offsetLeft - (trackWidth / 2) + (cardWidth / 2);
      
      track.scrollTo({
        left: targetScroll,
        behavior: "smooth"
      });
    }
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((current) => {
      const nextIdx = (current - 1 + total) % total;
      scrollToCard(nextIdx);
      return nextIdx;
    });
  }, [total, scrollToCard]);

  const next = useCallback(() => {
    setActiveIndex((current) => {
      const nextIdx = (current + 1) % total;
      scrollToCard(nextIdx);
      return nextIdx;
    });
  }, [total, scrollToCard]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <div className="relative max-w-7xl mx-auto px-6">
      {/* Header with Carousel Navigation */}
      <div className="flex items-center justify-between mb-8">
        <div className="text-left">
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest mb-3"
            style={{ border: "1px solid rgba(71,196,255,0.2)", background: "rgba(71,196,255,0.05)", color: "#47c4ff" }}
          >
            {lang === "en" ? "CATALOG" : lang === "pt" ? "CATÁLOGO" : "CATÁLOGO COMPLETO"}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#e5e5e5]">
            {lang === "en" ? "Our Project Ecosystem" : lang === "pt" ? "Nosso Ecossistema de Projetos" : "Ecosistema de Proyectos"}
          </h2>
        </div>

        {/* Navigation arrows */}
        <div className="flex items-center gap-3">
          <span className="text-[#484848] text-sm tabular-nums font-mono">
            {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: "rgba(31, 31, 31, 0.6)",
              backdropFilter: "blur(8px)",
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
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: "rgba(31, 31, 31, 0.6)",
              backdropFilter: "blur(8px)",
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
      <div 
        className="relative"
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setTimeout(() => setPaused(false), 3000)}
      >
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-6"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {proyectos.map((proyecto, i) => (
            <div
              key={proyecto.slug}
              data-card-index={i}
              className="flex-none w-[80vw] sm:w-[320px] lg:w-[360px]"
              style={{ scrollSnapAlign: "center" }}
            >
              <div
                className="group relative rounded-2xl border border-white/5 bg-[#0b0c10] overflow-hidden flex flex-col h-full transition-all duration-300 hover:border-white/10"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
              >
                {/* Project preview image */}
                <div className="relative aspect-video w-full overflow-hidden">
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{ background: proyecto.color }}
                  />
                  
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/previews/${proyecto.slug}.webp`}
                    alt={`Preview de ${proyecto.nombre}`}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />

                  {/* Melt to bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/80 to-transparent" />
                </div>

                {/* Project card detail */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-black/10">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display font-semibold text-base text-[#e5e5e5] group-hover:text-white transition-colors duration-200">
                        {proyecto.nombre}
                      </h3>
                      <span className="text-[#484848] text-xs font-mono">{proyecto.año}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {proyecto.tecnologias.slice(0, 3).map((tech) => (
                        <span 
                          key={tech} 
                          className="px-1.5 py-0.5 rounded text-[10px] text-white/50 bg-white/5 border border-[#222]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* External link action */}
                  {!proyecto.comingSoon && proyecto.linkDemo && (
                    <div className="pt-3 border-t border-[#161618] flex justify-end">
                      <a
                        href={proyecto.linkDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#00f0ff] hover:text-white transition-colors duration-200"
                      >
                        <span>{lang === "en" ? "Visit Project" : lang === "pt" ? "Visitar Projeto" : "Visitar Proyecto"}</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edge fades */}
        <div
          className="absolute right-0 top-0 bottom-6 w-20 pointer-events-none"
          style={{ background: "linear-gradient(to left, rgba(5,5,6,0.9), transparent)" }}
        />
        <div
          className="absolute left-0 top-0 bottom-6 w-20 pointer-events-none transition-opacity duration-300"
          style={{
            background: "linear-gradient(to right, rgba(5,5,6,0.9), transparent)",
            opacity: activeIndex > 0 ? 1 : 0,
          }}
        />
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-2">
        {proyectos.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToCard(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-5 bg-[#00f0ff]"
                : "w-1.5 bg-white/10 hover:bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
