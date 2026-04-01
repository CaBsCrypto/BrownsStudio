import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/config";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "desarrollo web LATAM",
    "páginas web para negocios",
    "diseño web profesional",
    "chatbot WhatsApp para negocios",
    "bot inteligencia artificial",
    "automatización con IA",
    "web para clínicas",
    "web para restaurantes",
    "agencia digital LATAM",
    "presencia digital premium",
    "chatbot IA para clínicas",
    "chatbot IA para restaurantes",
    "Browns Studio",
    "Chile",
    "Argentina",
    "México",
    "Colombia",
  ],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    type: "website",
    locale: "es_419",
    url: SITE_CONFIG.url,
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} — Diseño Web Premium + IA para Negocios en LATAM`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = [
  // ── ProfessionalService schema ──────────────────────────────────────────────
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    email: SITE_CONFIG.email,
    sameAs: [
      SITE_CONFIG.instagram,
      SITE_CONFIG.linkedin,
      SITE_CONFIG.youtube,
    ],
    areaServed: "América Latina",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de Browns Studio",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Landing Page Premium",
            description: "Diseño web de alto impacto optimizado para conversión",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Chatbot con IA para WhatsApp",
            description: "Bot inteligente que atiende clientes 24/7 y califica leads automáticamente",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Automatizaciones con IA",
            description: "Flujos de trabajo inteligentes para clínicas, restaurantes y negocios locales",
          },
        },
      ],
    },
  },
  // ── FAQPage schema — Google muestra estas preguntas en los resultados ───────
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cuánto tiempo toma crear mi proyecto?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Una landing page básica en 5 días hábiles; web profesional entre 10 y 15 días; proyectos con chatbot o IA integrada entre 3 y 4 semanas.",
        },
      },
      {
        "@type": "Question",
        name: "¿Trabajan con clientes fuera de Chile?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, trabajamos con negocios de toda América Latina — Argentina, México, Colombia, Perú y más. Todo el proceso es 100% remoto.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué es el chatbot con IA y cómo funciona?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Es un asistente virtual conectado a tu WhatsApp que responde consultas, califica clientes y agenda reuniones automáticamente, disponible las 24 horas.",
        },
      },
      {
        "@type": "Question",
        name: "¿Los precios incluyen hosting y dominio?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Los precios son por desarrollo y configuración. El hosting y dominio se contratan por separado, con un costo estimado de USD 10–20 al mes.",
        },
      },
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} font-body antialiased bg-bg-primary text-text-primary`}
      >
        {children}
      </body>
    </html>
  );
}
