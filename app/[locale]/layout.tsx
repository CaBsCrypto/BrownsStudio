import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';

// These presentations remain available in source while public traffic redirects.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: '/' },
};

export default async function LocaleLayout({ children, params }: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!['es', 'en', 'pt'].includes(locale)) notFound();
  return <LanguageProvider>{children}</LanguageProvider>;
}
