export interface AnalysisInput { website: string; email: string }
export type FieldErrors = Partial<Record<keyof AnalysisInput, string>>;

export function validateAnalysis(input: AnalysisInput): { values: AnalysisInput; errors: FieldErrors } {
  const values = { website: input.website.trim(), email: input.email.trim() };
  const errors: FieldErrors = {};
  try {
    const url = new URL(values.website);
    if (!['http:', 'https:'].includes(url.protocol) || !url.hostname.includes('.') || url.username || url.password || values.website.length > 2048) throw new Error();
  } catch { errors.website = 'Introduce la URL pública de tu sitio, empezando por https://.'; }
  if (values.email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(values.email)) {
    errors.email = 'Introduce un correo de contacto válido.';
  }
  return { values, errors };
}
