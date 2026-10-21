import { createGeoHandler } from '@geo/lib/geo-requests';

export const runtime = 'nodejs';
export const POST = createGeoHandler({
  config: () => ({ apiKey: process.env.RESEND_API_KEY, from: process.env.GEO_MAIL_FROM, to: process.env.GEO_MAIL_TO ?? 'contacto@browns.studio' }),
  send: fetch,
});
