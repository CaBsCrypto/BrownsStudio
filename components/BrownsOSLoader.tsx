"use client";

import dynamic from "next/dynamic";

// Three.js only loaded on desktop — server already filtered mobile in page.tsx
const BrownsOSDesktop = dynamic(() => import("./BrownsOS"), { ssr: false });

export default function BrownsOSLoader() {
  return <BrownsOSDesktop />;
}
