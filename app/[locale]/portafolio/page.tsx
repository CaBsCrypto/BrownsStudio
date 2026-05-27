import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BrownsOSLoader from "@/components/BrownsOSLoader";
import Portfolio from "@/components/Portfolio";
import { notFound } from "next/navigation";

const LOCALES = ["en", "es", "pt"] as const;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function PortafolioPage({ params }: PageProps) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as (typeof LOCALES)[number])) notFound();

  return (
    <main className="min-h-screen relative bg-[#050505] text-[#e5e5e5]">
      {/* Subtle top background glow */}
      <div
        className="absolute top-0 inset-x-0 h-[600px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at 50% -10%, rgba(71,196,255,0.06) 0%, rgba(71,196,255,0.01) 50%, transparent 100%)",
        }}
      />
      <BrownsOSLoader />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        {/* Spacer below fixed navbar */}
        <div className="pt-24 lg:pt-32" />

        {/* Premium Projects Carousel */}
        <div className="flex-grow">
          <Portfolio />
        </div>

        <Footer />
        <WhatsAppButton />
      </div>
    </main>
  );
}

