import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [],
  },
  experimental: {
    after: true,
  },
} as any;

export default nextConfig;
