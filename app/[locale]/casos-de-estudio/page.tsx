import Link from "next/link";
import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/config";
import { casosDeEstudioData } from "@/lib/casosDeEstudioData";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Casos de Estudio y Blog IA | Browns Studio",
  description: "Descubre cómo nuestros Agentes de Inteligencia Artificial están transformando empresas, clínicas y estudios jurídicos en Chile.",
  openGraph: {
    title: "Casos de Estudio y Blog IA | Browns Studio",
    description: "Descubre cómo nuestros Agentes de Inteligencia Artificial están transformando empresas en Chile.",
  }
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CasosDeEstudioPage({ params }: Props) {
  const { locale } = await params;
  const casos = Object.values(casosDeEstudioData);

  return (
    <main className="min-h-screen bg-[#050506] relative px-6 py-20 text-[#e5e5e5]">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-[#f3f4f6] mb-6">
          Casos de Estudio
        </h1>
        <p className="text-[#9e9e9e] text-lg max-w-3xl mb-12">
          Conoce en detalle cómo implementamos soluciones de Inteligencia Artificial generativa y automatización de WhatsApp para resolver problemas reales en el mercado B2B.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {casos.map((caso) => (
            <Link 
              key={caso.slug} 
              href={`/${locale}/casos-de-estudio/${caso.slug}`}
              className="group block p-8 rounded-2xl border border-ghost hover:border-[#00f0ff]/50 transition-all duration-300 bg-white/5 backdrop-blur-sm"
            >
              <div className="text-xs font-mono text-[#00f0ff] uppercase tracking-wider mb-4">
                {caso.industria}
              </div>
              <h2 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-[#00f0ff] transition-colors">
                {caso.title}
              </h2>
              <p className="text-[#9e9e9e] mb-6 line-clamp-3">
                {caso.description}
              </p>
              
              <div className="flex items-center text-[#00f0ff] text-sm font-semibold gap-2">
                Leer caso completo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
