import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Servicios from "@/components/Servicios";
import Portfolio from "@/components/Portfolio";
import Proceso from "@/components/Proceso";
import Pricing from "@/components/Pricing";
import Testimonios from "@/components/Testimonios";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Servicios />
      <Portfolio />
      <Proceso />
      <Pricing />
      <Testimonios />
      <FAQ />
      <CTA />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
