import { createHash } from 'node:crypto';
import { validateAnalysis } from './analysis-validation';

type MailConfig = { apiKey?: string; from?: string; to?: string };
type Dependencies = { config: () => MailConfig; send: typeof fetch; now?: () => number };
const failureMessage = 'No pudimos enviar tu solicitud. Inténtalo de nuevo.';

// Local preview protection: bounded, per-process limits, without storing addresses.
// A public deployment requires an additional shared/platform rate limiter.
export function createGeoHandler({ config, send, now = Date.now }: Dependencies) {
  const attempts = new Map<string, { count: number; until: number }>();
  function allowed(key: string, limit: number, window: number) {
    const timestamp = now();
    for (const [id, entry] of attempts) if (entry.until <= timestamp) attempts.delete(id);
    const entry = attempts.get(key);
    if (entry && entry.count >= limit) return false;
    if (!entry && attempts.size >= 1000) return false;
    attempts.set(key, { count: (entry?.count ?? 0) + 1, until: entry?.until ?? timestamp + window });
    return true;
  }
  function reply(status: number, body: object) { return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } }); }

  return async function POST(request: Request) {
    const origin = request.headers.get('origin');
    if (origin && origin !== new URL(request.url).origin) return reply(403, { message: failureMessage });
    if (!request.headers.get('content-type')?.startsWith('application/json')) return reply(415, { message: failureMessage });
    if (!allowed('total', 20, 60000)) return reply(429, { message: failureMessage });
    let data: Record<string, unknown>;
    try {
      const reader = request.body?.getReader();
      if (!reader) return reply(400, { message: failureMessage });
      const chunks: Uint8Array[] = [];
      let size = 0;
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > 4096) { await reader.cancel(); return reply(413, { message: failureMessage }); }
        chunks.push(value);
      }
      data = JSON.parse(Buffer.concat(chunks).toString('utf8'));
      if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error();
    } catch { return reply(400, { message: failureMessage }); }
    if (data.company !== undefined && data.company !== '') return reply(400, { message: failureMessage });
    if (typeof data.website !== 'string' || typeof data.email !== 'string' || typeof data.requestId !== 'string' || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(data.requestId)) return reply(400, { message: failureMessage });
    const { values, errors } = validateAnalysis({ website: data.website, email: data.email });
    if (Object.keys(errors).length) return reply(400, { errors });
    const mail = config();
    if (!mail.apiKey || !mail.from || !mail.to) return reply(503, { message: failureMessage });
    const identity = createHash('sha256').update(values.email.toLowerCase()).digest('hex');
    if (!allowed(identity, 3, 15 * 60000)) return reply(429, { message: failureMessage });
    try {
      const response = await send('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${mail.apiKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': `geo-${data.requestId}` },
        body: JSON.stringify({
          from: mail.from,
          to: [mail.to],
          reply_to: values.email,
          subject: 'Nueva solicitud de análisis inicial GEO — Browns Studio',
          text: `Solicitud de análisis inicial gratis\n\nSitio web: ${values.website}\nCorreo de contacto: ${values.email}\n\nReferencia: ${data.requestId}\n\nLa URL no se ha visitado ni analizado automáticamente.`,
        }),
        signal: AbortSignal.timeout(12000),
      });
      if (!response.ok) return reply(502, { message: failureMessage });
      const result = await response.json();
      if (!result || typeof result.id !== 'string' || !result.id) return reply(502, { message: failureMessage });
      return reply(200, { accepted: true });
    } catch { return reply(502, { message: failureMessage }); }
  };
}
