import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import GeoLanding from '@geo/components/GeoLanding';
import { direction } from '@geo/content/direction';

export const metadata: Metadata = {
  title: 'Browns Studio | Tu empresa en las búsquedas con IA',
  description: direction.hero.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website', locale: 'es_CL', siteName: 'Browns Studio', url: '/',
    title: 'Las personas ya buscan en la IA. ¿Encontrarán tu empresa?',
    description: direction.hero.description,
  },
  twitter: { card: 'summary_large_image', title: 'Browns Studio | Tu empresa en las búsquedas con IA', description: direction.hero.description },
};

export default function HomePage() {
  return <><GeoLanding /><Analytics /><SpeedInsights /></>;
}
