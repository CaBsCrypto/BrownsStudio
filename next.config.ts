import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [{
          key: 'Link',
          value: '</informacion/browns.md>; rel="alternate"; type="text/markdown", </informacion/browns.json>; rel="describedby"; type="application/json"',
        }],
      },
      {
        // Public indexing is limited to the production deployment.
        source: process.env.VERCEL_ENV === 'production' ? '/admin/:path*' : '/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
  async redirects() {
    return [
      // No destination fragment: browsers retain existing section links.
      { source: '/:locale(es|en|pt)', destination: '/', permanent: false },
      { source: '/direccion', destination: '/', permanent: false },
      // Retire marketing presentations; APIs and administration keep their routes.
      { source: '/:page(portafolio|formacion|demo|soluciones|casos-de-estudio|proyecto)/:path*', destination: '/#servicios', permanent: false },
      { source: '/:locale(es|en|pt)/:page(portafolio|formacion|demo|soluciones|casos-de-estudio|proyecto)/:path*', destination: '/#servicios', permanent: false },
    ];
  },
};

export default nextConfig;
