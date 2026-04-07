"use client";

import dynamic from "next/dynamic";
import BrownsOSMobile from "./BrownsOSMobile";

// Three.js loaded lazily — only after client detects non-mobile
const BrownsOSDesktop = dynamic(() => import("./BrownsOS"), {
  ssr: false,
  loading: () => <BrownsOSMobile />, // CSS fallback while Three.js loads
});

export default function BrownsOSLoader() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Mobile: CSS only — Three.js chunk never downloaded
  if (isMobile) return <BrownsOSMobile />;

  // Desktop: full Three.js (lazy loaded, CSS shown while loading)
  return <BrownsOSDesktop />;
}
