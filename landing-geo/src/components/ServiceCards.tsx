'use client';

import { useEffect, useRef, useState } from 'react';
import ResourceCube from './ResourceCube';
import styles from './ServiceCards.module.css';

type Service = {
  id: string; name: string; title: string; promise: string; delivery: string;
  maintenance: string; boundary: string; billing: string; badge: string;
};

function ServiceCard({ service, index, cta }: { service: Service; index: number; cta: string }) {
  const [flipped, setFlipped] = useState(false);
  const front = useRef<HTMLButtonElement>(null);
  const back = useRef<HTMLButtonElement>(null);
  const shouldFocus = useRef(false);
  function turn(value: boolean) { shouldFocus.current = true; setFlipped(value); }
  useEffect(() => {
    if (shouldFocus.current) {
      (flipped ? back : front).current?.focus({ preventScroll: true });
      shouldFocus.current = false;
    }
  }, [flipped]);

  return <article className={`${styles.card} ${styles[service.id] ?? ''}`} aria-label={`Servicio ${service.name}`}>
    <div className={styles.rotator} data-flipped={flipped}>
      <div className={`${styles.face} ${styles.front}`} aria-hidden={flipped} inert={flipped}>
        <div className={styles.top}><span>{service.name}</span><span className={styles.badge}>{service.badge}</span></div>
        <h3>{service.title}</h3>
        <div className={styles.art}><ResourceCube variant={index} /></div>
        <p className={styles.promise}>{service.promise}</p>
        <p className={styles.deliverySummary}>{({ inicio: "Servicios, cobertura y preguntas frecuentes en recursos consultables.", avanzado: "Una fuente acordada, consultas de solo lectura y pruebas de conexión.", continuidad: "Revisión mensual, mejoras acordadas e informe del trabajo realizado." } as Record<string, string>)[service.id]}</p>
        <p className={styles.billing}>{service.billing}</p>
        <span className={styles.hint} aria-hidden="true">Ver entrega y límites <span>↗</span></span>
        <button ref={front} className={styles.frontTrigger} onClick={() => turn(true)} aria-expanded={flipped} aria-controls={`details-${service.id}`} aria-label={`Ver detalles de ${service.name}`} />
      </div>
      <div id={`details-${service.id}`} className={`${styles.face} ${styles.back}`} aria-hidden={!flipped} inert={!flipped} onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); turn(false); } }}>
        <button ref={back} className={styles.returnButton} onClick={() => turn(false)} aria-label={`Volver al frente de ${service.name}`}>← Volver <span>{service.name}</span></button>
        <div className={styles.detailScroll} tabIndex={flipped ? 0 : -1} role="region" aria-label={`Entrega y límites de ${service.name}`}>
          <h3>{service.title}</h3>
          <h4>Qué entregamos</h4><p>{service.delivery}</p>
          <h4>{service.id === 'continuidad' ? 'Mantención y evolución' : 'Mantención mensual adicional'}</h4><p>{service.maintenance}</p>
          <h4>Hasta dónde llega</h4><p>{service.boundary}</p>
          <p className={styles.backBilling}>{service.billing}</p>
        </div>
        <a className={styles.cta} href="#analisis">{cta}</a>
      </div>
    </div>
  </article>;
}

export default function ServiceCards({ services, cta }: { services: readonly Service[]; cta: string }) {
  return <>
    <div className={styles.grid}>{services.map((service, index) => <ServiceCard key={service.id} service={service} index={index} cta={cta} />)}</div>
    <noscript><div className={styles.fallback}>{services.map(service => <details key={service.id}><summary>Entrega y límites de {service.name}</summary><p>{service.delivery}</p><p>{service.maintenance}</p><p>{service.boundary}</p></details>)}</div></noscript>
  </>;
}
