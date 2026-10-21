'use client';

import { useRef, useState, useSyncExternalStore, type FormEvent } from 'react';
import { direction } from '@geo/content/direction';
import { validateAnalysis, type FieldErrors } from '@geo/lib/analysis-validation';
import { readAnalysisResponse } from '@geo/lib/analysis-response';
import styles from './AnalysisForm.module.css';

const subscribeToHydration = () => () => undefined;
const clientReady = () => true;
const serverReady = () => false;

export default function AnalysisForm() {
  const ready = useSyncExternalStore(subscribeToHydration, clientReady, serverReady);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const locked = useRef(false);
  const submission = useRef<{ payload: string; id: string } | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (locked.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const { values, errors: nextErrors } = validateAnalysis({ website: String(data.get('website') ?? ''), email: String(data.get('email') ?? '') });
    setErrors(nextErrors);
    setMessage('');
    if (Object.keys(nextErrors).length) {
      setStatus('idle');
      const field = nextErrors.website ? 'website' : 'email';
      (form.elements.namedItem(field) as HTMLInputElement)?.focus();
      return;
    }
    const payload = JSON.stringify(values);
    if (!submission.current || submission.current.payload !== payload) submission.current = { payload, id: crypto.randomUUID() };
    locked.current = true;
    setStatus('sending');
    try {
      const response = await fetch('/api/solicitudes-geo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, company: data.get('company') ?? '', requestId: submission.current.id }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await readAnalysisResponse(response);
      if (!result.accepted) {
        if (result.errors) setErrors(result.errors);
        throw new Error(result.message);
      }
      setStatus('success');
      setMessage('Tu solicitud fue enviada. Te contactaremos por correo sobre tu análisis.');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error && !['TimeoutError', 'AbortError', 'TypeError'].includes(error.name) ? error.message : 'No pudimos confirmar el envío. Inténtalo de nuevo; no necesitas volver a escribir tus datos.');
    } finally { locked.current = false; }
  }

  return <form className={styles.form} method="post" action="/api/solicitudes-geo" onSubmit={onSubmit} noValidate aria-label="Solicitud de análisis inicial gratis" aria-busy={status === 'sending'}>
    <div className={styles.field}>
      <label htmlFor="analysis-website">URL del sitio web</label>
      <input id="analysis-website" name="website" type="url" inputMode="url" autoComplete="url" placeholder="https://tuempresa.cl" required maxLength={2048} aria-invalid={!!errors.website} aria-describedby={errors.website ? 'website-error' : undefined} readOnly={status === 'success'} />
      {errors.website && <p id="website-error" className={styles.fieldError} role="alert">{errors.website}</p>}
    </div>
    <div className={styles.field}>
      <label htmlFor="analysis-email">Correo de contacto</label>
      <input id="analysis-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="tu@empresa.cl" required maxLength={254} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} readOnly={status === 'success'} />
      {errors.email && <p id="email-error" className={styles.fieldError} role="alert">{errors.email}</p>}
    </div>
    <div className="visually-hidden" aria-hidden="true"><label htmlFor="analysis-company">Dejar vacío</label><input id="analysis-company" name="company" tabIndex={-1} autoComplete="off" /></div>
    <p className={styles.privacy} id="analysis-privacy">Usaremos estos datos para gestionar tu solicitud y contactarte sobre tu análisis. No incluyas información sensible.</p>
    <button className={styles.submit} type="submit" disabled={!ready || status === 'sending' || status === 'success'} aria-describedby="analysis-privacy">{status === 'sending' ? 'Enviando solicitud…' : status === 'success' ? 'Solicitud enviada' : direction.cta}</button>
    <div className={styles.status} role="status" aria-live="polite" aria-atomic="true">
      {status === 'sending' ? <p>Estamos enviando tu solicitud.</p> : message && <p className={status === 'error' ? styles.fieldError : styles.success}>{message}</p>}
    </div>
    <noscript><p>Activa JavaScript para enviar este formulario. También puedes escribir a contacto@browns.studio.</p></noscript>
  </form>;
}
