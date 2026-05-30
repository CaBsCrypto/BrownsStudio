import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoClient from "@/components/DemoClient";
import { notFound } from "next/navigation";
import { translations } from "@/lib/i18n/translations";
import { Metadata } from "next";

const LOCALES = ["en", "es", "pt"] as const;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";
  const isPt = locale === "pt";

  const titles = {
    es: "Simulador de Agente WhatsApp AI | Browns Studio",
    en: "AI WhatsApp Agent Simulator | Browns Studio",
    pt: "Simulador de Agente WhatsApp AI | Browns Studio",
  };

  const descriptions = {
    es: "Entrena a tu bot de ventas en vivo con tus propios servicios y chatea en tiempo real. Prueba el motor de inteligencia agéntica de Browns Studio.",
    en: "Train your live sales bot with your own services and chat in real-time. Test the Browns Studio agential AI engine.",
    pt: "Treine seu bot de vendas ao vivo com seus próprios serviços e converse em tempo real. Teste o motor de IA agêntica da Browns Studio.",
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.es,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.es,
    openGraph: {
      type: "website",
      title: titles[locale as keyof typeof titles] || titles.es,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.es,
    },
  };
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as (typeof LOCALES)[number])) notFound();

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary overflow-hidden relative">
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-20%] w-[80%] h-[60%] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[80%] h-[60%] rounded-full bg-violet-500/5 blur-[120px] pointer-events-none -z-10" />

      <Navbar />
      
      {/* Dynamic Client Demo Component */}
      <div className="relative pt-36 lg:pt-44 pb-16 z-10">
        <DemoClient locale={locale} />
      </div>


      <Footer />
    </main>
  );
}
