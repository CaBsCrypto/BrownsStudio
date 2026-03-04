import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Proyecto } from "@/data/proyectos";

interface ProyectoCardProps {
  proyecto: Proyecto;
  index: number;
}

export default function ProyectoCard({ proyecto, index }: ProyectoCardProps) {
  return (
    <Link
      href={`/proyecto/${proyecto.slug}`}
      className={`reveal reveal-delay-${Math.min(index + 1, 4)} group block rounded-2xl overflow-hidden border border-white/5 hover:border-accent-gold/40 bg-bg-tertiary transition-all duration-500 hover:-translate-y-3 hover:shadow-gold-lg`}
    >
      {/* Project preview */}
      <div className="relative h-52 sm:h-60 overflow-hidden">
        {/* Gradient preview */}
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
          style={{ background: proyecto.color }}
        />

        {/* Mockup frame */}
        <div className="absolute inset-4 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10 flex flex-col overflow-hidden transition-all duration-500 group-hover:inset-3">
          {/* Browser bar */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-black/30 border-b border-white/10 flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-red-400/60" />
            <span className="w-2 h-2 rounded-full bg-yellow-400/60" />
            <span className="w-2 h-2 rounded-full bg-green-400/60" />
            <span className="ml-2 flex-1 h-3 rounded-sm bg-white/10 text-white/20 text-xs flex items-center px-2">
              {proyecto.slug}.brownsstudio.dev
            </span>
          </div>
          {/* Content area */}
          <div className="flex-1 p-4 flex flex-col gap-2.5">
            <div className="h-3 w-3/4 rounded bg-white/20" />
            <div className="h-2 w-full rounded bg-white/10" />
            <div className="h-2 w-5/6 rounded bg-white/10" />
            <div className="mt-2 flex gap-2">
              <div className="h-7 w-20 rounded bg-white/20" />
              <div className="h-7 w-20 rounded bg-white/10" />
            </div>
            <div className="mt-auto grid grid-cols-3 gap-2">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-14 rounded bg-white/10" />
              ))}
            </div>
          </div>
        </div>

        {/* Hover overlay — full cover with CTA */}
        <div className="absolute inset-0 bg-bg-primary/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-gold text-bg-primary font-semibold text-sm shadow-gold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <ExternalLink size={14} />
            Ver proyecto completo
          </div>
          <div className="flex flex-wrap justify-center gap-1.5 max-w-[200px] translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
            {proyecto.tecnologias.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-xs text-white/70 bg-white/10 border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Top-right arrow — desaparece con el overlay */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-bg-primary/80 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-200">
          <ArrowUpRight size={14} className="text-accent-gold" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display font-semibold text-lg text-text-primary group-hover:text-accent-gold transition-colors duration-300 leading-tight mb-2">
          {proyecto.nombre}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 rounded-full bg-accent-gold/10 text-accent-gold text-xs font-medium border border-accent-gold/20">
            {proyecto.tipo}
          </span>
          <span className="text-text-muted text-xs">{proyecto.año}</span>
        </div>

        <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
          {proyecto.descripcion}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5">
          {proyecto.tecnologias.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-xs text-text-muted bg-white/5 border border-white/5 group-hover:border-accent-gold/10 transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
