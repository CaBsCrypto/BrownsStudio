import type { FieldErrors } from './analysis-validation';

type AnalysisReply = { accepted: true } | { accepted: false; message: string; errors?: FieldErrors };
const failureMessage = 'No pudimos enviar tu solicitud. Los campos siguen completos para que puedas intentarlo de nuevo.';

export async function readAnalysisResponse(response: Response): Promise<AnalysisReply> {
  // A platform rate limit may return HTML or an empty body before the API runs.
  if (response.status === 429) return {
    accepted: false,
    message: 'Has hecho varios intentos. Espera unos minutos antes de volver a enviar.',
  };
  let result: unknown;
  try { result = await response.json(); }
  catch { return { accepted: false, message: failureMessage }; }
  if (!result || typeof result !== 'object' || Array.isArray(result)) return { accepted: false, message: failureMessage };
  const payload = result as Record<string, unknown>;
  if (response.ok && payload.accepted === true) return { accepted: true };
  const errors: FieldErrors = {};
  if (payload.errors && typeof payload.errors === 'object' && !Array.isArray(payload.errors)) {
    const fields = payload.errors as Record<string, unknown>;
    for (const field of ['website', 'email'] as const) if (typeof fields[field] === 'string') errors[field] = fields[field];
  }
  return { accepted: false, message: failureMessage, ...(Object.keys(errors).length ? { errors } : {}) };
}
