import { publicMarkdown } from '@geo/lib/public-information';

export function GET() {
  return new Response(publicMarkdown(), { headers: {
    'Content-Type': 'text/markdown; charset=utf-8', 'X-Robots-Tag': 'noindex', 'X-Content-Type-Options': 'nosniff',
  } });
}
