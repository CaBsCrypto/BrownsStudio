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
      {/* Gradient bg — siempre presente como base y fallback */}
      <div
        className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
        style={{ background: proyecto.color }}
      />

      {/* Screenshot full-bleed */}
      {proyecto.linkDemo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://image.thum.io/get/width/1280/crop/800/${proyecto.linkDemo}`}
          alt={`Preview de ${proyecto.nombre}`}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      )}

      {/* Gradient overlay — suaviza el corte inferior */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bg-tertiary via-bg-tertiary/60 to-transparent" />

      {/* URL pill flotante */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/10">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
        <span className="text-white/60 text-[10px] font-mono tracking-tight truncate max-w-[160px]">
          {proyecto.linkDemo?.replace("https://", "").split("/")[0] ?? `${proyecto.slug}.vercel.app`}
        </span>
      </div>

      {/* Botón top-right */}
      <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-200">
        <ArrowUpRight size={12} className="text-white/70" />
      </div>

      {/* Coming Soon overlay */}
      {proyecto.comingSoon ? (
        <div className="absolute inset-0 bg-bg-primary/75 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white/80 font-semibold text-sm">
            <Wrench size={14} className="animate-pulse" />
            En Desarrollo
          </div>
          <div className="flex flex-wrap justify-center gap-1.5 max-w-[200px]">
            {proyecto.tecnologias.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-xs text-white/50 bg-white/5 border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Hover overlay */}
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

        </>
      )}
    </div>
  );

  const content = (
    <div className="p-5">
      <h3 className="font-display font-semibold text-lg text-text-primary group-hover:text-accent-gold transition-colors duration-300 leading-tight mb-2">
        {proyecto.nombre}
      </h3>

      <div className="flex items-center gap-2 mb-3">
        <span className="px-2 py-0.5 rounded-full bg-accent-gold/10 text-accent-gold text-xs font-medium border border-accent-gold/20">
          {proyecto.tipo}
        </span>
        <span className="text-text-muted text-xs">{proyecto.año}</span>
        {proyecto.comingSoon && (
          <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/40 text-xs font-medium border border-white/10">
            Próximamente
          </span>
        )}
      </div>

      <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
        {proyecto.descripcion}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {proyecto.tecnologias.map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 rounded text-xs text-text-muted bg-white/5 border border-white/5 group-hover:border-accent-gold/10 transition-colors duration-300"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Quote or coming soon message */}
      {!proyecto.comingSoon ? (
        <div className="pt-4 border-t border-white/5">
          <Quote size={12} className="text-accent-gold/40 mb-1" fill="currentColor" />
          <p className="text-text-muted text-xs italic leading-relaxed mb-1">
            {proyecto.quote}
          </p>
          <p className="text-accent-gold/60 text-xs font-medium">{proyecto.quoteAutor}</p>
        </div>
      ) : (
        <div className="pt-4 border-t border-white/5">
          <p className="text-text-muted text-xs italic">{proyecto.resultado}</p>
        </div>
      )}
    </div>
  );

  if (proyecto.comingSoon) {
    return (
      <div
        className={`reveal ${delayClass} group block rounded-2xl overflow-hidden border border-white/5 bg-bg-tertiary cursor-default opacity-80`}
      >
        {preview}
        {content}
      </div>
    );
  }

  return (
    <Link
      href={`/proyecto/${proyecto.slug}`}
      className={`reveal ${delayClass} group block rounded-2xl overflow-hidden border border-white/5 hover:border-accent-gold/40 bg-bg-tertiary transition-all duration-500 hover:-translate-y-3 hover:shadow-gold-lg`}
    >
      {preview}
      {content}
    </Link>
  );
}
