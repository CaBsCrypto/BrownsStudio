import Link from "next/link";
import { ArrowUpRight, ExternalLink, Quote, Wrench } from "lucide-react";
import type { Proyecto } from "@/data/proyectos";

interface ProyectoCardProps {
  proyecto: Proyecto;
  index: number;
}

export default function ProyectoCard({ proyecto, index }: ProyectoCardProps) {
  const delayClass = `reveal-delay-${Math.min(index + 1, 4)}`;

  const preview = (
    <div className="relative h-56 overflow-hidden">
      {/* Gradient base — always visible as fallback */}
      <div
        className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
        style={{ background: proyecto.color }}
      />

      {/* Static local screenshot — loads instantly */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/previews/${proyecto.slug}.jpg`}
        alt={`Preview de ${proyecto.nombre}`}
        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />

      {/* Bottom gradient — melts into card bg */}
      <div
        className="absolute inset-x-0 bottom-0 h-24"
        style={{ background: "linear-gradient(to top, #1f1f1f, rgba(31,31,31,0.6), transparent)" }}
      />

      {/* URL pill */}
      <div
        className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
        style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
        <span className="text-white/60 text-[10px] font-mono tracking-tight truncate max-w-[160px]">
          {proyecto.linkDemo?.replace("https://", "").split("/")[0] ?? `${proyecto.slug}.vercel.app`}
        </span>
      </div>

      {/* Arrow top-right */}
      <div
        className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center group-hover:opacity-0 transition-opacity duration-200"
        style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <ArrowUpRight size={12} className="text-white/60" />
      </div>

      {/* Coming Soon overlay */}
      {proyecto.comingSoon ? (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
        >
          <div
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm text-[#9e9e9e]"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(72,72,72,0.3)" }}
          >
            <Wrench size={14} className="animate-pulse" />
            En Desarrollo
          </div>
          <div className="flex flex-wrap justify-center gap-1.5 max-w-[200px]">
            {proyecto.tecnologias.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-xs"
                style={{ color: "#5a5a5a", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(72,72,72,0.2)" }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      ) : (
        /* Hover overlay — metallic CTA */
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
        >
          <div
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm text-black translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            style={{ background: "linear-gradient(135deg, #c6c6c7, #939eb5)", boxShadow: "0 0 20px rgba(198,198,199,0.15)" }}
          >
            <ExternalLink size={14} />
            Ver proyecto completo
          </div>
          <div className="flex flex-wrap justify-center gap-1.5 max-w-[200px] translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
            {proyecto.tecnologias.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-xs text-white/60"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const content = (
    <div className="p-5">
      <h3
        className="font-display font-semibold text-lg text-[#e5e5e5] group-hover:text-[#c6c6c7] transition-colors duration-300 leading-tight mb-2"
        style={{ letterSpacing: "-0.02em" }}
      >
        {proyecto.nombre}
      </h3>

      <div className="flex items-center gap-2 mb-3">
        <span
          className="px-2 py-0.5 rounded-full text-xs font-medium"
          style={{ background: "rgba(71,196,255,0.08)", color: "#47c4ff", border: "1px solid rgba(71,196,255,0.15)" }}
        >
          {proyecto.tipo}
        </span>
        <span className="text-[#484848] text-xs">{proyecto.año}</span>
        {proyecto.comingSoon && (
          <span
            className="px-2 py-0.5 rounded-full text-xs font-medium"
            style={{ background: "rgba(255,255,255,0.03)", color: "#484848", border: "1px solid rgba(72,72,72,0.2)" }}
          >
            Próximamente
          </span>
        )}
      </div>

      <p className="text-[#9e9e9e] text-sm leading-relaxed mb-4 line-clamp-2">
        {proyecto.descripcion}
      </p>

      {/* Tech chips */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {proyecto.tecnologias.map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 rounded text-xs text-[#5a5a5a] group-hover:text-[#9e9e9e] transition-colors duration-300"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(72,72,72,0.12)" }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Quote / coming soon note */}
      {!proyecto.comingSoon ? (
        <div className="pt-4" style={{ borderTop: "1px solid rgba(72,72,72,0.12)" }}>
          <Quote size={12} className="mb-1" style={{ color: "rgba(198,198,199,0.25)" }} fill="currentColor" />
          <p className="text-[#5a5a5a] text-xs italic leading-relaxed mb-1">{proyecto.quote}</p>
          <p className="text-[#9e9e9e] text-xs font-medium" style={{ opacity: 0.6 }}>{proyecto.quoteAutor}</p>
        </div>
      ) : (
        <div className="pt-4" style={{ borderTop: "1px solid rgba(72,72,72,0.12)" }}>
          <p className="text-[#5a5a5a] text-xs italic">{proyecto.resultado}</p>
        </div>
      )}
    </div>
  );

  const cardStyle = {
    background: "rgba(25,25,25,0.6)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(72,72,72,0.15)",
    borderRadius: "12px",
    overflow: "hidden",
    transition: "all 0.4s ease",
  };

  if (proyecto.comingSoon) {
    return (
      <div
        className={`reveal ${delayClass} group block cursor-default opacity-70`}
        style={cardStyle}
      >
        {preview}
        {content}
      </div>
    );
  }

  return (
    <Link
      href={`/proyecto/${proyecto.slug}`}
      className={`reveal ${delayClass} group block`}
      style={cardStyle}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.border = "1px solid rgba(71,196,255,0.2)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 24px 48px rgba(0,0,0,0.5)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.border = "1px solid rgba(72,72,72,0.15)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {preview}
      {content}
    </Link>
  );
}
