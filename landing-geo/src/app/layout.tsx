import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const archivo = localFont({
  src: "../../public/fonts/archivo-latin-variable.woff2",
  variable: "--font-archivo",
  display: "swap",
});
const dmSans = localFont({
  src: "../../public/fonts/dm-sans-latin-variable.woff2",
  variable: "--font-dm",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Browns Studio | Prepara tu negocio para las búsquedas con IA",
  description: "GEO para empresas: diagnóstico, información nueva e implementación coordinada con tu web y tu trabajo SEO existente.",
  robots: { index: false, follow: false },
  icons: { icon: "/brand-small.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FBFCFD",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es-CL" className={`${archivo.variable} ${dmSans.variable}`}><body>{children}</body></html>;
}
