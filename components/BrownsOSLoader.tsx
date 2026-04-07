"use client";

import dynamic from "next/dynamic";
import BrownsOSMobile from "./BrownsOSMobile";

// Three.js bundle only downloaded on desktop — never sent to mobile
const BrownsOSDesktop = dynamic(() => import("./BrownsOS"), { ssr: false });

export default function BrownsOSLoader() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  return isMobile ? <BrownsOSMobile /> : <BrownsOSDesktop />;
}
