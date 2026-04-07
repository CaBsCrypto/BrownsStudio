"use client";

import dynamic from "next/dynamic";

const BrownsOS = dynamic(() => import("./BrownsOS"), { ssr: false });

export default function BrownsOSLoader() {
  return <BrownsOS />;
}
