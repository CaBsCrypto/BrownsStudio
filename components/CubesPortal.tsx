"use client";
import dynamic from "next/dynamic";

const CubesBackground = dynamic(() => import("./CubesBackground"), { ssr: false });

export default function CubesPortal() {
  return <CubesBackground />;
}
