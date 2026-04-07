import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Check, ExternalLink, MessageCircle, Wrench } from "lucide-react";
import { proyectos, getProyectoBySlug } from "@/data/proyectos";
import { SITE_CONFIG } from "@/lib/config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return proyectos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const proyecto = getProyectoBySlug(slug);
  if (!proyecto) return {};

  return {
    title: `${proyecto.nombre} — Portfolio`,
    description: proyecto.descripcion,
    openGraph: {
      title: `${proyecto.nombre} | ${SITE_CONFIG.name}`,
      description: proyecto.descripcion,
    },
  };
}

export default async function ProyectoPage({ params }: Props) {
  const { slug } = await params;
  const proyecto = getProyectoBySlug(slug);

  if (!proyecto) notFound();

  const whatsappMsg = `Hola, vi el proyecto ${proyecto.nombre} en su portfolio y me gustaría cotizar algo similar para mi negocio.`;
  const whatsappLink = `https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 lg:pt-20">
        {/* Hero del proyecto */}
        <section className="relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0" style={{ background: proyecto.color }} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-primary/60 to-bg-primary" />

          {/* Contenido */}
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
            {/* Breadcrumb */}
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-2 text-text-muted hover:text-accent-gold text-sm transition-colors duration-200 mb-8 group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              Volver al portfolio
            </Link>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/10 text-white text-xs font-medium backdrop-blur-sm">
                {proyecto.tipo} · {proyecto.año}
              </div>
              {proyecto.comingSoon && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-yellow-400/30 bg-yellow-400/10 text-yellow-300 text-xs font-medium backdrop-blur-sm">
                  <Wrench size={11} className="animate-pulse" />
                  En Desarrollo
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
              {proyecto.nombre}
            </h1>
            <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
              {proyecto.descripcion}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mt-6">
              {proyecto.tecnologias.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/20 backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="bg-bg-primary">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left — Main content */}
              <div className="lg:col-span-2 space-y-10">
                {/* Preview screenshot + visit button */}
                <div className="rounded-2xl overflow-hidden border border-white/8 relative group/preview" style={{ background: proyecto.color }}>
                  {/* Browser chrome bar */}
                  <div className="flex items-center gap-1.5 px-4 py-2.5 bg-black/40 border-b border-white/10">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                    <span className="ml-2 flex-1 h-5 rounded bg-white/10 text-white/30 text-[11px] flex items-center px-3 font-mono truncate">
                      {proyecto.linkDemo?.replace("https://", "") ?? `${proyecto.slug}.vercel.app`}
                    </span>
                    {proyecto.linkDemo && (
                      <a
                        href={proyecto.linkDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 p-1 rounded hover:bg-white/10 transition-colors"
                        title="Abrir sitio"
                      >
                        <ExternalLink size={12} className="text-white/40 hover:text-white/80" />
                      </a>
                    )}
                  </div>

                  {/* Screenshot */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/previews/${proyecto.slug}.webp`}
                    alt={`Preview de ${proyecto.nombre}`}
                    className="w-full object-cover object-top"
                    style={{ maxHeight: 420 }}
                  />

                  {/* Hover overlay — visit button */}
                  {proyecto.linkDemo && (
                    <a
                      href={proyecto.linkDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-all duration-300"
                      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
                    >
                      <span
                        className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-black translate-y-2 group-hover/preview:translate-y-0 transition-transform duration-300"
                        style={{ background: "linear-gradient(135deg, #00f0ff, #0099bb)", boxShadow: "0 0 30px rgba(0,240,255,0.35)" }}
                      >
                        <ExternalLink size={15} />
                        Visitar sitio en vivo
                      </span>
                    </a>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h2 className="font-display font-bold text-2xl text-text-primary mb-4">
                    Sobre este proyecto
                  </h2>
                  <p className="text-text-secondary leading-relaxed">
                    {proyecto.descripcionLarga}
                  </p>
                </div>

                {/* Result */}
                <div
                  className="relative p-6 rounded-2xl border border-accent-gold/20 overflow-hidden"
                  style={{ background: "linear-gradient(135deg, rgba(200,149,108,0.08) 0%, rgba(212,165,116,0.03) 100%)" }}
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent-gold to-accent-gold-light rounded-l-2xl" />
                  <p className="text-xs text-accent-gold font-medium tracking-widest uppercase mb-2">
                    Resultado
                  </p>
                  <p className="text-text-primary font-medium text-lg leading-relaxed">
                    {proyecto.resultado}
                  </p>
                </div>
              </div>

              {/* Right — Sidebar */}
              <div className="space-y-6">
                {/* Features */}
                <div className="rounded-2xl border border-white/5 bg-bg-secondary p-6">
                  <h3 className="font-display font-semibold text-text-primary mb-4">
                    Funcionalidades
                  </h3>
                  <ul className="space-y-3">
                    {proyecto.caracteristicas.map((c) => (
                      <li key={c} className="flex items-start gap-3 text-sm text-text-secondary">
                        <Check
                          size={15}
                          className="text-accent-gold flex-shrink-0 mt-0.5"
                        />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA card */}
                <div className="rounded-2xl border border-accent-gold/20 bg-gradient-to-b from-accent-gold/8 to-transparent p-6">
                  <h3 className="font-display font-semibold text-text-primary mb-2">
                    ¿Te gusta este estilo?
                  </h3>
                  <p className="text-text-muted text-sm mb-5">
                    Podemos crear algo similar para tu negocio. Cuéntanos tu idea.
                  </p>
                  {/* Visit live site — primary CTA */}
                  {proyecto.linkDemo && (
                    <a
                      href={proyecto.linkDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 mb-3"
                      style={{ background: "linear-gradient(135deg, #00f0ff, #0099bb)", color: "#000", boxShadow: "0 0 20px rgba(0,240,255,0.2)" }}
                    >
                      <ExternalLink size={15} />
                      Ver sitio en vivo
                    </a>
                  )}
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-accent-gold text-bg-primary font-semibold text-sm hover:bg-accent-gold-light transition-colors duration-300 mb-3"
                  >
                    <MessageCircle size={15} />
                    Cotizar proyecto similar
                  </a>
                  <Link
                    href="/#portfolio"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/10 text-text-secondary text-sm hover:text-text-primary hover:border-white/20 transition-all duration-300"
                  >
                    Ver más proyectos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
