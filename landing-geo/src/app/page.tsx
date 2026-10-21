import type { Metadata } from 'next';
import { direction } from '@geo/content/direction';
import GeoLanding from '@geo/components/GeoLanding';

export const metadata: Metadata = {
  title: 'Browns Studio | Tu empresa en las búsquedas con IA',
  description: direction.hero.description,
  robots: { index: false, follow: false },
};

export default GeoLanding;