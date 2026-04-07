import { headers } from "next/headers";
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
import BrownsOSMobile from "@/components/BrownsOSMobile";
import BrownsOSLoader from "@/components/BrownsOSLoader";

export default async function Home() {
  const headersList = await headers();
  const ua = headersList.get("user-agent") ?? "";
  const isMobile = /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);

  return (
    <main className="min-h-screen">
      {/* Three.js chunk (863KB) never sent to mobile — server decides */}
      {isMobile ? <BrownsOSMobile /> : <BrownsOSLoader />}
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
