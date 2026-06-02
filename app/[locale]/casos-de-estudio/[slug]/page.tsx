import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";
import { casosDeEstudioData } from "@/lib/casosDeEstudioData";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

// Generate static routes for all case studies
export function generateStaticParams() {
  const slugs = Object.keys(casosDeEstudioData);
  const locales = ["es", "en", "pt"]; // Match locales from layout

  const params = [];
  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const caso = casosDeEstudioData[slug];

  if (!caso) return {};

  return {
    title: `${caso.title} | Casos de Estudio | Browns Studio`,
    description: caso.description,
    openGraph: {
      title: caso.title,
      description: caso.description,
      type: "article",
      url: `${SITE_CONFIG.url}/${locale}/casos-de-estudio/${slug}`,
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/casos-de-estudio/${slug}`,
    }
  };
}

export default async function CasoDeEstudioPage({ params }: Props) {
  const { locale, slug } = await params;
  const caso = casosDeEstudioData[slug];

  if (!caso) {
    notFound();
  }

  // Generate Article JSON-LD for GEO and SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": caso.title,
    "description": caso.description,
    "author": {
      "@type": "Organization",
      "name": "Browns Studio"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Browns Studio",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_CONFIG.url}/icon.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/${locale}/casos-de-estudio/${slug}`
    }
  };

  return (
    <main className="min-h-screen bg-[#050506] relative px-6 py-12 md:py-20 text-[#e5e5e5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto relative z-10">
        
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

        {/* Testimonial */}
        {caso.testimonio && (
          <div className="mt-16 p-8 rounded-2xl border border-[#00f0ff]/20 bg-[#00f0ff]/5 relative">
            <div className="absolute top-0 left-8 -translate-y-1/2 text-6xl text-[#00f0ff] opacity-50 font-serif">"</div>
            <p className="text-xl italic text-white mb-4 relative z-10 leading-relaxed">
              {caso.testimonio.quote}
            </p>
            <div className="text-[#00f0ff] font-semibold">
              — {caso.testimonio.author}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
