import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Check, ExternalLink, MessageCircle } from "lucide-react";
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
        <section className="relative overflow-hidden" style={{ minHeight: "60vh" }}>
          {/* Background */}
          <div className="absolute inset-0" style={{ background: proyecto.color }} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-primary/60 to-bg-primary" />

          {/* Contenido */}
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
            {/* Breadcrumb */}
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-2 text-text-muted hover:text-accent-gold text-sm transition-colors duration-200 mb-8 group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              Volver al portfolio
            </Link>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/10 text-white text-xs font-medium backdrop-blur-sm mb-4">
              {proyecto.tipo} · {proyecto.año}
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
                {/* Preview mockup */}
                <div className="rounded-2xl overflow-hidden border border-white/5 aspect-video relative" style={{ background: proyecto.color }}>
                  <div className="absolute inset-6 rounded-lg bg-black/25 backdrop-blur-sm border border-white/15 flex flex-col overflow-hidden">
                    {/* Browser bar */}
                    <div className="flex items-center gap-1.5 px-4 py-3 bg-black/30 border-b border-white/10 flex-shrink-0">
                      <span className="w-3 h-3 rounded-full bg-red-400/60" />
                      <span className="w-3 h-3 rounded-full bg-yellow-400/60" />
                      <span className="w-3 h-3 rounded-full bg-green-400/60" />
                      <span className="ml-3 flex-1 h-4 rounded bg-white/10 text-white/25 text-xs flex items-center px-3">
                        www.{proyecto.slug}.com
                      </span>
                    </div>
                    {/* Content mockup */}
                    <div className="flex-1 p-6 flex flex-col gap-4">
                      <div className="h-8 w-2/3 rounded bg-white/20" />
                      <div className="h-3 w-full rounded bg-white/10" />
                      <div className="h-3 w-4/5 rounded bg-white/10" />
                      <div className="mt-2 flex gap-3">
                        <div className="h-10 w-28 rounded-full bg-white/25" />
                        <div className="h-10 w-28 rounded-full bg-white/10" />
                      </div>
                      <div className="mt-auto grid grid-cols-3 gap-3">
                        {[1, 2, 3].map((n) => (
                          <div key={n} className="h-24 rounded-lg bg-white/10" />
                        ))}
                      </div>
                    </div>
                  </div>
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
                    <ExternalLink size={13} />
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
