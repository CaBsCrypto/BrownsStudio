import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import { casosDeEstudioData } from "@/lib/casosDeEstudioData";

interface Props {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export function generateStaticParams() {
  const locales = ["es", "en", "pt"];
  const slugs = Object.keys(casosDeEstudioData);
  
  const params: { locale: string; slug: string }[] = [];
  locales.forEach((locale) => {
    slugs.forEach((slug) => {
      params.push({ locale, slug });
    });
  });
  
  return params;
}

export default async function CasoDeEstudioPage({ params }: Props) {
  const { locale, slug } = await params;
  const caso = casosDeEstudioData[slug];

  if (!caso) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050506] text-white relative overflow-hidden">
      {/* Background Decor */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(ellipse 50% 50% at 50% 0%, #00f0ff 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #00f0ff 1px, transparent 1px), linear-gradient(to bottom, #00f0ff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <Navbar />

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-24 relative z-10">
        {/* Back Link */}
        <Link
          href={`/${locale}/casos-de-estudio`}
          className="inline-flex items-center gap-2 text-xs text-[#5a5a5a] hover:text-[#00f0ff] transition-all mb-10 uppercase tracking-widest font-mono"
        >
          <ArrowLeft size={14} />
          Volver a Casos de Estudio
        </Link>

        {/* Header */}
        <header className="mb-16">
          <div className="text-[#00f0ff] font-mono text-sm tracking-wider uppercase mb-4">
            Caso de Éxito: {caso.industria}
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {caso.title}
          </h1>
          <p className="text-xl text-[#9e9e9e] leading-relaxed">
            {caso.description}
          </p>
        </header>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {caso.resultados.map((res, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-3xl font-bold text-[#00f0ff] mb-2">{res.value}</div>
              <div className="text-sm text-[#9e9e9e]">{res.label}</div>
            </div>
          ))}
        </div>

        {/* Content Body */}
        <article className="prose prose-invert prose-lg max-w-none space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-red-500 pl-4">El Problema</h2>
            <p className="text-[#cccccc] leading-relaxed">
              {caso.problema}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-[#00f0ff] pl-4">Nuestra Solución (Agente IA)</h2>
            <p className="text-[#cccccc] leading-relaxed">
              {caso.solucion}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-purple-500 pl-4">Implementación Tecnológica</h2>
            <p className="text-[#cccccc] leading-relaxed">
              {caso.implementacion}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-green-500 pl-4">Retorno de Inversión (ROI)</h2>
            <p className="text-[#cccccc] leading-relaxed">
              {caso.roi}
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
