import information from '@geo/content/browns-public.json';

export function GET() {
  return Response.json(information, { headers: { 'X-Robots-Tag': 'noindex', 'X-Content-Type-Options': 'nosniff' } });
}
