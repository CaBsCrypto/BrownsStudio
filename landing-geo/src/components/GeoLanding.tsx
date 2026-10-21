import { direction } from '@geo/content/direction';
import Nav from '@geo/components/Nav';
import FAQ from '@geo/components/FAQ';
import AnalysisForm from '@geo/components/AnalysisForm';
import ServiceCards from '@geo/components/ServiceCards';
import ResourceCube from '@geo/components/ResourceCube';
import AgentScene from '@geo/components/AgentScene';
import styles from '../app/page.module.css';

export default function GeoLanding() {
  return <>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <div className={styles.navigation}><Nav navigation={direction.navigation} cta={direction.cta} ctaHref="#analisis" /></div>
    <main id="contenido" tabIndex={-1}>
      <section className={styles.hero} id="inicio" tabIndex={-1} aria-labelledby="hero-title">
        <div className={`${styles.container} ${styles.heroLayout}`}>
          <div className={styles.heroCopy}>
          <p className={styles.intro}>Browns Studio / Empresas de servicios en Chile</p>
          <h1 id="hero-title">{direction.hero.title}</h1>
          <p className={styles.description}>{direction.hero.description}</p>
          <a className={styles.button} href="#analisis">{direction.cta}</a>
          </div>
          <AgentScene />
        </div>
      </section>

      <section className={styles.review} id="que-revisamos" tabIndex={-1} aria-labelledby="review-title">
        <div className={styles.container}>
          <div className={styles.sectionIntro}>
            <h2 id="review-title">Tu información, preparada<br />para nuevas formas de buscar.</h2>
            <div><p>Añadimos una capa de información y recursos para agentes sobre tu web, con los ajustes mínimos necesarios.</p><p>Partimos por lo que tu empresa necesita explicar. Las conexiones con sus sistemas se evalúan por separado.</p></div>
          </div>
          <div className={styles.checks}>{direction.checks.map((check, index) => <article key={check.title}>
            <div className={styles.panelArt}><ResourceCube variant={index} /></div>
            <span className={styles.panelLabel}>Qué entregamos</span>
            <h3>{check.title}</h3><p>{check.description}</p>
          </article>)}</div>
          <p className={styles.reviewNote}>Recursos comprobables. Información validada contigo.</p>
        </div>
      </section>

      <section className={styles.services} id="servicios" tabIndex={-1} aria-labelledby="services-title">
        <div className={styles.container}>
          <div className={styles.sectionIntro}>
            <h2 id="services-title">Un inicio concreto.<br />Espacio para crecer.</h2>
            <p>Tres servicios para necesidades distintas. Inicio y Avanzado suman una mantención mensual adicional a la implementación. Continuidad reúne mantención y evolución en una sola cuota. El análisis nos ayuda a recomendarte el alcance suficiente.</p>
          </div>
          <ServiceCards services={direction.services} cta={direction.cta} />
          <p className={styles.serviceNote}>La oferta está en etapa piloto. Validamos los alcances antes de anunciarlos como disponibles. Puedes permanecer en Inicio mientras te resulte suficiente; las ampliaciones se acuerdan por separado.</p>
          <a className={styles.button} href="#analisis">{direction.cta}</a>
        </div>
      </section>

      <section className={styles.process} id="proceso" tabIndex={-1} aria-labelledby="process-title">
        <div className={styles.container}>
          <div className={styles.sectionIntro}>
            <h2 id="process-title">Un primer paso simple.<br />Después, tú decides.</h2>
            <p>El análisis inicial es gratis. La implementación y la mantención son pagadas, con una propuesta acordada antes de trabajar.</p>
          </div>
          <ol className={styles.steps}>{direction.steps.map((step, index) => <li key={step.title}>
            <span className={styles.stepNumber} aria-hidden="true">{index + 1}</span>
            <h3>{step.title}</h3><p>{step.description}</p>
            {index === 1 && <span className={styles.paidLabel}>Implementación y mantención pagadas</span>}
          </li>)}</ol>
        </div>
      </section>

      <div className={styles.faq}><FAQ items={direction.faqs} title="Lo que conviene saber antes de empezar." /></div>

      <section className={styles.analysis} id="analisis" tabIndex={-1} aria-labelledby="analysis-title">
        <div className={`${styles.container} ${styles.analysisLayout}`}>
          <div className={styles.analysisCopy}>
            <p className={styles.intro}>Empecemos por tu web</p>
            <h2 id="analysis-title">Pide tu análisis inicial gratis.</h2>
            <p>Revisamos tu dominio y la información pública disponible. Recibes por correo un resumen con oportunidades comprobadas y prioridades para empezar.</p>
            <p>Comparte tu sitio y un correo. Confirmaremos el alcance de la revisión inicial y una fecha de entrega según el cupo disponible.</p>
            <p className={styles.noCommitment}>La solicitud no te compromete a contratar.</p>
          </div>
          <AnalysisForm />
        </div>
      </section>
    </main>
    <footer className={styles.footer}><div className={styles.container}>
      <div><p className={styles.brandName}>Browns Studio</p><p>Tu empresa, mejor explicada para las búsquedas con IA.</p></div>
      <p>Santiago, Chile</p>
    </div></footer>
  </>;
}
