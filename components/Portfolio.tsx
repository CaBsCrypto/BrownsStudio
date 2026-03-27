"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { proyectos } from "@/data/proyectos";
import ProyectoCard from "./ProyectoCard";
import { WHATSAPP_URL } from "@/lib/config";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = proyectos.length;

  // Reveal header
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

  // Track active card by proximity to scrollLeft
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const handleScroll = () => {
      const cards = track.querySelectorAll<HTMLElement>("[data-card-index]");
      let closest = 0;
      let minDiff = Infinity;
      cards.forEach((card) => {
        const idx = parseInt(card.dataset.cardIndex!);
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

  return (
    <section ref={sectionRef} id="portfolio" className="section-padding bg-bg-light overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header row: title left, counter+arrows right */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <div className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-gold/30 bg-accent-gold/8 text-accent-gold text-xs font-medium tracking-widest uppercase mb-4">
              Nuestro Trabajo
            </div>
            <h2 className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
              Proyectos que{" "}
              <span className="text-gradient-gold">hablan por sí solos</span>
            </h2>
          </div>

          {/* Counter + arrows */}
          <div className="reveal reveal-delay-2 flex items-center gap-3 flex-shrink-0 pb-1">
            <span className="text-stone-400 text-sm tabular-nums font-mono">
              {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button
              onClick={prev}
              disabled={activeIndex === 0}
              aria-label="Proyecto anterior"
              className="w-10 h-10 rounded-full border border-stone-300 bg-white flex items-center justify-center text-stone-600 hover:border-accent-gold hover:text-accent-gold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              disabled={activeIndex >= total - 1}
              aria-label="Proyecto siguiente"
              className="w-10 h-10 rounded-full border border-stone-300 bg-white flex items-center justify-center text-stone-600 hover:border-accent-gold hover:text-accent-gold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel track */}
        <div className="relative">
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
            {/* Trailing spacer so last card can fully snap */}
            <div className="flex-none w-4 sm:w-8" aria-hidden="true" />
          </div>

          {/* Right fade — hint there's more */}
          <div className="absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-bg-light to-transparent pointer-events-none" />
          {/* Left fade — appears after first scroll */}
          <div
            className="absolute left-0 top-0 bottom-4 w-20 bg-gradient-to-r from-bg-light to-transparent pointer-events-none transition-opacity duration-300"
            style={{ opacity: activeIndex > 0 ? 1 : 0 }}
          />
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-5 mb-12">
          {proyectos.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              aria-label={`Ir al proyecto ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-6 bg-accent-gold"
                  : "w-1.5 bg-stone-300 hover:bg-stone-400"
              }`}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="reveal text-center">
          <p className="text-stone-500 text-sm mb-4">
            ¿Quieres que tu negocio sea el próximo en nuestra lista?
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-accent-gold text-bg-primary font-semibold hover:bg-accent-gold-light transition-all duration-300 shadow-gold hover:shadow-gold-lg hover:scale-105"
          >
            Empezar mi proyecto
          </a>
        </div>
      </div>
    </section>
  );
}
