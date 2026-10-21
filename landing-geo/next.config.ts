import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false,
  turbopack: { root: process.cwd() },
  async headers() {
    return [{ source: '/', headers: [{
      key: 'Link',
      value: '</informacion/browns.md>; rel="alternate"; type="text/markdown", </informacion/browns.json>; rel="describedby"; type="application/json"',
    }] }];
  },
};

export default config;
