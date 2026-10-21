import type { direction } from '@geo/content/direction';
import styles from './ServiceCards.module.css';

type Service = (typeof direction.services)[number];
type Offer = typeof direction.initialOffer;
type Sample = typeof direction.publicSample;

function PublicSample({ sample }: { sample: Sample }) {
  return <aside className={styles.sample} aria-labelledby="sample-title">
    <p className={styles.sampleLabel} id="sample-title">Muestra de una pieza real de Browns Studio · En validación</p>
    <div className={styles.document}>
      <div className={styles.documentHeading}>
        <span className={styles.documentIcon} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M6 3h8l4 4v14H6V3Z" /><path d="M14 3v5h4M9 12h6M9 16h6" /></svg></span>
        <div><p className={styles.documentBrand}>{sample.brand}</p><p className={styles.documentDescription}>Información pública consultable</p></div>
      </div>
      <dl className={styles.documentData}>
        <div><dt>Servicio</dt><dd>{sample.serviceName}: {sample.serviceTitle}</dd></div>
        <div><dt>Cobertura</dt><dd>{sample.coverage}<span>{sample.audience}</span></dd></div>
        <div><dt>Contacto</dt><dd>{sample.contact}</dd></div>
      </dl>
      <a className={styles.resourceLink} href={sample.resourceHref}>Consultar la pieza publicada <span aria-hidden="true">↗</span></a>
    </div>
    <div className={styles.sampleContext}>
      <h4>Una entrega que puedes revisar</h4>
      <p>Esta muestra reúne datos públicos de Browns Studio. La web y el recurso publicado usan la misma información.</p>
      <p className={styles.verification}>{sample.verificationNote}</p>
    </div>
  </aside>;
}

function EvolutionService({ service, cta }: { service: Service; cta: string }) {
  return <article className={styles.evolutionCard} aria-labelledby={'title-' + service.id}>
    <div className={styles.serviceMeta}><span>{service.name}</span><span className={styles.badge}>{service.badge}</span></div>
    <h4 id={'title-' + service.id}>{service.title}</h4>
    <p className={styles.evolutionPromise}>{service.promise}</p>
    <p className={styles.evolutionBilling}>{service.billing}</p>
    <details className={styles.details}>
      <summary>Ver entrega y límites de {service.name}<span aria-hidden="true">+</span></summary>
      <div className={styles.expanded}>
        <h5>Qué entregamos</h5><p>{service.delivery}</p>
        <h5>{service.id === 'continuidad' ? 'Mantención y evolución' : 'Mantención mensual adicional'}</h5><p>{service.maintenance}</p>
        <h5>Hasta dónde llega</h5><p>{service.boundary}</p>
        <a className={styles.textCta} href="#analisis">{cta}</a>
      </div>
    </details>
  </article>;
}

export default function ServiceCards({ services, cta, offer, sample, evolutionTitle }: {
  services: readonly Service[]; cta: string; offer: Offer; sample: Sample; evolutionTitle: string;
}) {
  const initial = services.find(service => service.id === 'inicio');
  if (!initial) return null;

  return <div className={styles.services}>
    <article className={styles.primary} aria-labelledby="title-inicio">
      <header className={styles.primaryHeading}>
        <div className={styles.primaryTitle}>
          <div className={styles.serviceMeta}><span>{initial.name}</span><span className={styles.badge}>{initial.badge}</span></div>
          <h3 id="title-inicio">{initial.title}</h3>
        </div>
        <div className={styles.primaryIntroduction}>
          <p className={styles.primaryPromise}>{initial.promise}</p>
          <p className={styles.primaryBilling}>{initial.billing}</p>
        </div>
      </header>
      <div className={styles.primaryGrid}>
        <div className={styles.offerContent}>
          <dl className={styles.offerFacts}>
            <div><dt>Para quién</dt><dd>{offer.audience}.</dd></div>
            <div><dt>Qué resolvemos</dt><dd>{offer.problem}</dd></div>
            <div className={styles.deliverables}><dt>Qué recibes</dt><dd><ul>{offer.deliverables.map(item => <li key={item}>{item}</li>)}</ul></dd></div>
            <div><dt>Qué necesitamos de ti</dt><dd>{offer.clientInput}</dd></div>
            <div><dt>Qué queda fuera</dt><dd>{offer.exclusions}</dd></div>
            <div className={styles.pricing}><dt>Precio y entrega acordados</dt><dd>{offer.pricing}</dd></div>
          </dl>
        </div>
        <PublicSample sample={sample} />
      </div>
      <div className={styles.maintenance}>
        <div><h4>Qué cubre la mantención mensual</h4><p>{offer.maintenance}</p></div>
        <a className={styles.cta} href="#analisis">{cta}</a>
      </div>
    </article>
    <div className={styles.evolution}>
      <h3>{evolutionTitle}</h3>
      <p>Podemos evaluar una conexión o sumar evolución sobre lo que ya entregamos. El siguiente paso depende de lo que necesite tu empresa.</p>
      <div className={styles.evolutionGrid}>{services.filter(service => service.id !== 'inicio').map(service => <EvolutionService key={service.id} service={service} cta={cta} />)}</div>
    </div>
  </div>;
}
