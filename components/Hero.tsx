"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, MessageCircle, Play } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/config";

// Hook: anima un número desde 0 hasta target cuando se activa
function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

const stats = [
  { numeric: 15, suffix: "+", label: "Proyectos entregados", duration: 1200 },
  { numeric: 48, suffix: "h", label: "Tiempo de respuesta", duration: 900 },
  { numeric: 100, suffix: "%", label: "Clientes satisfechos", duration: 1400 },
];

function StatItem({ stat, active }: { stat: typeof stats[0]; active: boolean }) {
  const count = useCountUp(stat.numeric, stat.duration, active);
  return (
    <div className="text-center">
      <div className="text-2xl sm:text-3xl font-display font-bold text-gradient-gold">
        {count}{stat.suffix}
      </div>
      <div className="text-text-muted text-xs sm:text-sm mt-1">{stat.label}</div>
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
            });
            // Activar contadores con un pequeño delay
            setTimeout(() => setStatsActive(true), 600);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToPortfolio = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServicios = () => {
    document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-gradient-warm" />
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent-gold/5 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent-gold-light/4 blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />

      {/* Geometric decoration */}
      <div className="absolute top-20 right-10 lg:right-20 opacity-20">
        <div className="w-20 h-20 border border-accent-gold/40 rotate-45 animate-float" />
      </div>
      <div className="absolute bottom-32 left-10 lg:left-20 opacity-15">
        <div className="w-12 h-12 border border-accent-gold/30 rotate-12 animate-float" style={{ animationDelay: "3s" }} />
      </div>
      {/* Extra decorative corner */}
      <div className="absolute top-1/2 right-8 lg:right-16 opacity-10">
        <div className="w-6 h-6 border border-accent-gold/60 rotate-45 animate-float" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Badge */}
        <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-gold/30 bg-accent-gold/5 text-accent-gold text-sm font-medium mb-8 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
          Desarrollo Web Profesional para Negocios Locales
        </div>

        {/* Headline */}
        <h1 className="reveal reveal-delay-1 font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-text-primary mb-6 leading-tight tracking-tight">
          La web que tu{" "}
          <span className="text-gradient-gold">negocio necesita</span>
          <br />
          para crecer de verdad
        </h1>

        {/* Subheadline */}
        <p className="reveal reveal-delay-2 text-text-secondary text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto mb-4 leading-relaxed font-light">
          Creamos páginas web elegantes y efectivas para{" "}
          <span className="text-text-primary font-medium">clínicas, restaurantes, estudios</span>{" "}
          y todo tipo de negocio local en Latinoamérica.
        </p>

        <p className="reveal reveal-delay-2 text-text-muted text-base sm:text-lg mb-10">
          Tu cliente te encuentra online — asegúrate de causar la mejor impresión.
        </p>

        {/* CTAs */}
        <div className="reveal reveal-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={scrollToPortfolio}
            className="group flex items-center gap-2 px-8 py-4 rounded-full border border-accent-gold/40 text-text-primary font-semibold text-base hover:border-accent-gold hover:bg-accent-gold/10 transition-all duration-300"
          >
            <Play size={16} className="text-accent-gold group-hover:scale-110 transition-transform" />
            Ver Portfolio
          </button>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-8 py-4 rounded-full bg-accent-gold text-bg-primary font-semibold text-base hover:bg-accent-gold-light transition-all duration-300 shadow-gold hover:shadow-gold-lg hover:scale-105"
          >
            <MessageCircle size={16} className="group-hover:scale-110 transition-transform" />
            Cotizar Gratis
          </a>
        </div>

        {/* Stats — animated counters */}
        <div className="reveal reveal-delay-4 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto mb-16">
          {stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} active={statsActive} />
          ))}
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToServicios}
          className="reveal reveal-delay-4 flex flex-col items-center gap-2 text-text-muted hover:text-accent-gold transition-colors duration-300 mx-auto cursor-pointer"
          aria-label="Scroll hacia abajo"
        >
          <span className="text-xs tracking-widest uppercase">Descubrir</span>
          <ArrowDown size={16} className="animate-bounce" />
        </button>
      </div>
    </section>
  );
}
