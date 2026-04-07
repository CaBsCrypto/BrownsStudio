import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SobreMi from "@/components/SobreMi";
import Pricing from "@/components/Pricing";
import Portfolio from "@/components/Portfolio";
import Proceso from "@/components/Proceso";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const ScrollBackground3D = dynamic(
  () => import("@/components/ScrollBackground3D"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="min-h-screen">
      <ScrollBackground3D />
      <Navbar />
      <Hero />
      <Portfolio />
      <SobreMi />
      <Pricing />
      <Proceso />
      <FAQ />
      <CTA />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
