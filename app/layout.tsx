import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import '../landing-geo/src/app/globals.css';

const archivo = localFont({ src: '../public/fonts/archivo-latin-variable.woff2', variable: '--font-archivo', display: 'swap' });
const dmSans = localFont({ src: '../public/fonts/dm-sans-latin-variable.woff2', variable: '--font-dm', display: 'swap' });
const indexable = process.env.VERCEL_ENV === 'production';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.browns.studio'),
  title: 'Browns Studio | Tu empresa en las búsquedas con IA',
  description: 'Preparamos la información pública de tu empresa para facilitar su consulta por herramientas de IA. Pide tu análisis inicial gratis.',
  robots: { index: indexable, follow: indexable },
  verification: { google: 'JUDQ9__0Yav0nHVC7KmtM469yB1gi5S8Hf5JIa_U1NA' },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#fbfcfd' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es-CL" className={`${archivo.variable} ${dmSans.variable}`}><body>{children}</body></html>;
}
