'use client';

import { useEffect, useId, useReducer, useRef, useState, type CSSProperties } from 'react';
import { initialScene, scenePlayback, sceneReducer } from '@geo/lib/agent-scene';
import AgentSearchModel, { type SearchAnchors, type SearchPhase } from './AgentSearchModel';
import styles from './AgentScene.module.css';

function SearchFallback() {
  return <svg className={styles.fallback} viewBox="0 0 360 300" aria-hidden="true" fill="none">
    <g transform="translate(0 40)">
    <ellipse cx="187" cy="164" rx="153" ry="55" fill="#e7effb" opacity=".65" />
    <path d="m23 126 158-76 158 78-158 81Z" fill="#f3f7ff" stroke="#d6e3f5" />
    <path d="m23 126 158 77 158-75v9l-158 78-158-79Z" fill="#dbe7fa" />
    <path d="M136 94c-8 18-2 37 19 37 29 0 67 2 119-5" stroke="#bed1ec" strokeWidth="2" strokeLinecap="round" />
    <path d="m177 83 33-16 32 16-32 16Z" fill="#edf1f7" stroke="#cbd7e8" />
    <path d="m177 83 33 16v27l-33-16Z" fill="#dce4ef" />
    <path d="m210 99 32-16v27l-32 16Z" fill="#c8d5e7" />
    <g transform="translate(55 -28)">
    <path d="m53 139 28-14 28 14-28 14Z" fill="#e7efff" stroke="#b7cbef" />
    <path d="m53 139 28 14 28-14v9l-28 14-28-14Z" fill="#bacff6" />
    <circle cx="81" cy="122" r="22" fill="#2f5ce5" />
    <path d="m81 110 7 7-7 7-7-7Zm-8 13 5 5-5 5-5-5Zm16 0 5 5-5 5-5-5Z" fill="#fff" />
    </g>
    <g transform="translate(14 0)">
    <path d="m239 119 33-16 33 16-33 16Z" fill="#edf3ff" stroke="#a9c4f5" />
    <path d="m239 119 33 16v29l-33-16Z" fill="#a5c4ff" />
    <path d="m272 135 33-16v29l-33 16Z" fill="#2f5ce5" />
    <path d="m239 128 33 16 33-16M239 138l33 16 33-16" stroke="#edf3ff" strokeWidth="2" />
    <path d="m263 118 9-5 10 5-10 5Z" stroke="#2f5ce5" strokeWidth="1.5" />
    <circle cx="256" cy="145" r="4" fill="#2f5ce5" />
    </g>
    </g>
    <path d="m35 177 21-10 21 10-21 10Z" fill="#edf3ff" stroke="#b7cbef" />
    <path d="m35 177 21 10 21-10v5l-21 11-21-11Z" fill="#c4d8f8" />
    <path d="M50 156v19m12-19v19" stroke="#58759f" strokeWidth="6" strokeLinecap="round" />
    <rect x="46" y="135" width="20" height="26" rx="8" fill="#5a8ee8" />
    <path d="m48 144-8 14m24-14 7 7 9-8" stroke="#adc0df" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="56" cy="128" r="9" fill="#fff" stroke="#bed0ea" />
    <circle cx="54" cy="128" r="1" fill="#526477" /><circle cx="60" cy="128" r="1" fill="#526477" />
    <path d="M58 150c12-1 15-5 22-7 14-5 30-16 56-9" stroke="#adc8ef" strokeWidth="1.2" />
  </svg>;
}

const storyText: Record<SearchPhase, string> = {
  question: 'Una persona consulta por un servicio.',
  agent: 'La consulta entra al agente y lo activa.',
  search: 'El agente busca información pública preparada.',
  company: 'Consulta servicios, cobertura y contacto.',
  return: 'La información vuelve al agente.',
  delivery: 'El agente devuelve la información a la persona.',
  answer: 'La persona recibe información de la empresa.',
};

export default function AgentScene() {
  const [state, dispatch] = useReducer(sceneReducer, initialScene);
  const [opportunityOpen, setOpportunityOpen] = useState(false);
  const [phase, setPhase] = useState<SearchPhase>('question');
  const [modelReady, setModelReady] = useState(false);
  const [anchors, setAnchors] = useState<SearchAnchors>({
    person: { x: 16, y: 35 },
    agent: { x: 39, y: 61 },
    competitor: { x: 67, y: 16 },
    company: { x: 79, y: 69 },
  });
  const figure = useRef<HTMLElement>(null);
  const opportunity = useRef<HTMLDialogElement>(null);
  const descriptionId = useId();
  const opportunityId = useId();
  const opportunityTitleId = useId();
  const opportunityBodyId = useId();
  const { animated, playing } = scenePlayback(state);
  const label = playing ? 'Pausar animación' : 'Continuar animación';
  const scenePhase = state.reduced || !state.initialized ? 'company' : phase;

  const openOpportunity = () => {
    if (!opportunity.current || opportunity.current.open) return;
    opportunity.current.showModal();
    setOpportunityOpen(true);
  };

  const closeOpportunity = () => opportunity.current?.close();

  const goToAnalysis = () => {
    closeOpportunity();
    document.getElementById('analisis')?.focus({ preventScroll: true });
  };

  useEffect(() => {
    if (!opportunityOpen) return;
    const body = document.body;
    const overflow = body.style.overflow;
    const paddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const currentPadding = parseFloat(window.getComputedStyle(body).paddingRight) || 0;
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
    return () => {
      body.style.overflow = overflow;
      body.style.paddingRight = paddingRight;
    };
  }, [opportunityOpen]);

  useEffect(() => {
    const element = figure.current;
    if (!element) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let inView = false;
    const update = () => dispatch({ type: 'environment', inView, visible: !document.hidden, reduced: preference.matches });
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio >= .25;
      update();
    }, { threshold: [0, .25] });
    observer.observe(element);
    preference.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  return <><figure ref={figure} className={styles.figure} data-model-ready={modelReady} aria-label="Una estación de búsqueda de información para agentes" aria-describedby={descriptionId}>
    <figcaption className={styles.caption}><span aria-hidden="true" />Demostración ilustrativa</figcaption>
    <p id={descriptionId} className="visually-hidden">Una persona pregunta por un servicio en Chile. Una señal nace en ella, entra al agente y lo activa. El agente consulta la información pública preparada de una empresa; la otra empresa del ejemplo carece de los datos necesarios. La señal entra a la empresa, representa la consulta de servicios, cobertura y contacto, y regresa al agente y a la persona con información. El modelo 3D es ilustrativo: no ejecuta una búsqueda real ni garantiza apariciones, recomendaciones o posiciones. Puedes tocar Tu empresa o el Sí para abrir una invitación a solicitar tu análisis.</p>
    <div className={styles.story} data-animated={animated} data-playing={playing && !opportunityOpen} data-interactive={state.initialized} data-phase={scenePhase}>
      <div className={styles.factory} data-part="journey" data-model-ready={modelReady}>
        <SearchFallback />
        <AgentSearchModel className={styles.model} playing={playing && !opportunityOpen} reduced={state.reduced} onPhase={setPhase} onAnchors={setAnchors} onReady={setModelReady} />
        <article className={styles.question} data-part="person" style={{ left: `clamp(68px, ${anchors.person.x}%, calc(100% - 68px))`, top: `${anchors.person.y}%` }}>
          <p className={styles.personLabel}>{scenePhase === 'answer' ? 'Recibe información' : 'Una persona pregunta'}</p>
          <p className={styles.questionText}>{scenePhase === 'answer' ? 'Servicios, cobertura y contacto.' : '¿Quién ofrece este servicio en Chile?'}</p>
        </article>
        <div className={styles.agentLabel} data-part="agent" style={{ left: `${anchors.agent.x}%`, top: `${anchors.agent.y}%` }}>
          <p>Agente IA</p><span>Consulta y responde</span>
        </div>
        <article className={styles.competitor} data-check="other" style={{ left: `${anchors.competitor.x}%`, top: `${anchors.competitor.y}%` }}>
          <h3>Competencia <span>No</span></h3><p>Faltan datos</p>
        </article>
        <article className={styles.company} data-check="ready" style={{ left: `clamp(66px, ${anchors.company.x}%, calc(100% - 66px))`, top: `${anchors.company.y}%` }}>
            <div className={styles.companyHeading}>
              <h3>Tu empresa</h3>
              <span className={styles.staticStatus}>Sí</span>
              <span className={styles.triggerLabel} aria-hidden="true">Sí<svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 12 12 4M5 4h7v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
            </div>
            <p className={styles.companyCopy}>Información preparada</p>
            <button className={styles.readyTrigger} type="button" onClick={openOpportunity} aria-label="Sí: ver cómo preparar mi empresa para IA" aria-haspopup="dialog" aria-controls={opportunityId} aria-expanded={opportunityOpen} />
        </article>
      </div>
      <p className={styles.flowStatus}><span aria-hidden="true" />{storyText[scenePhase]}</p>
    </div>
    <div className={styles.controls}>
      <p className={styles.exampleNote}>Ejemplo ficticio. No garantiza aparecer en una IA.</p>
      {state.initialized && state.entered && !state.reduced && <button type="button" onClick={() => dispatch({ type: 'toggle' })} aria-label={label}>
        <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" fill="none">{playing ? <path d="M5 3v10M11 3v10" stroke="currentColor" strokeWidth="2" /> : <path d="m5 3 7 5-7 5Z" fill="currentColor" />}</svg><span className="visually-hidden">{label}</span>
      </button>}
    </div>
  </figure>
    <dialog ref={opportunity} id={opportunityId} className={styles.opportunityDialog} aria-labelledby={opportunityTitleId} aria-describedby={opportunityBodyId} onClose={() => setOpportunityOpen(false)} onClick={(event) => {
      if (event.target !== event.currentTarget) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeOpportunity();
    }}>
      <div className={styles.popupContent}>
        <button className={styles.popupClose} type="button" onClick={closeOpportunity} aria-label="Cerrar invitación" autoFocus>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
        </button>
        <div className={styles.popupIcon} aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="m7 14 5 5L22 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          {opportunityOpen && <span className={styles.popupConfetti}>{[
            [-32, -20, -65], [-17, -33, 35], [8, -36, -25], [30, -24, 65],
            [-33, 19, 110], [-14, 30, -35], [16, 29, 75], [34, 14, -110],
          ].map(([x, y, rotation], index) => <i key={index} className={styles.particle} style={{ '--burst-x': `${x}px`, '--burst-y': `${y}px`, '--burst-r': `${rotation}deg` } as CSSProperties} />)}</span>}
        </div>
        <p className={styles.popupKicker}>Del ejemplo a tu empresa</p>
        <h2 id={opportunityTitleId} className={styles.popupTitle}>Empieza hoy a preparar tu empresa para la IA.</h2>
        <p id={opportunityBodyId} className={styles.popupBody}>Tus próximos clientes ya están buscando. Descubre qué información pública de tu empresa conviene mejorar y por dónde empezar.</p>
        <a className={styles.popupCta} href="#analisis" onClick={goToAnalysis}>Pide tu análisis inicial gratis</a>
        <p className={styles.popupNote}>Solo tu web y un correo de contacto.</p>
      </div>
    </dialog>
  </>;
}
