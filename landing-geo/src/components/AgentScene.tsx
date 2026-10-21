'use client';

import { useEffect, useId, useReducer, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { initialScene, scenePlayback, sceneReducer } from '@geo/lib/agent-scene';
import AgentSearchModel, { type SearchAnchors, type SearchPhase } from './AgentSearchModel';
import styles from './AgentScene.module.css';

function SearchFallback() {
  return <svg className={styles.fallback} viewBox="0 0 600 400" aria-hidden="true" fill="none">
    <ellipse cx="305" cy="295" rx="248" ry="64" fill="#e7effb" opacity=".55" />
    <path d="m45 247 247-117 260 111-249 115Z" fill="#f2f6ff" stroke="#d5e2f7" />
    <path d="m45 247 258 109 249-115v12L303 369 45 260Z" fill="#d6e4fc" />
    <g opacity=".65">
      <path d="m367 143 44-22 44 21-44 23Z" fill="#f3f6fc" stroke="#d8e1ee" />
      <path d="m367 143 44 22v45l-44-22Z" fill="#dfe6ef" />
      <path d="m411 165 44-23v45l-44 23Z" fill="#cdd9e8" />
      <path d="m380 160 9 5v12l-9-5Zm18 9 7 4v12l-7-4Z" fill="#bdccdf" />
    </g>
    <path d="M159 213c47 0 62-13 121-13m39 5c47 16 81 42 137 35" stroke="#a8c3ed" strokeWidth="2" strokeLinecap="round" />
    <g>
      <path d="m94 252 42-20 43 20-42 21Z" fill="#fff" stroke="#c7d8f4" />
      <path d="m94 252 43 21 42-21v10l-42 21-43-21Z" fill="#b9d0f6" />
      <path d="M126 228v22m19-22v22" stroke="#314866" strokeWidth="8" strokeLinecap="round" />
      <rect x="121" y="193" width="29" height="39" rx="12" fill="#5a8ee8" />
      <path d="m124 203-11 22m35-21 12 10 10-11" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="166" y="190" width="13" height="21" rx="3" fill="#314866" />
      <rect x="169" y="194" width="7" height="12" rx="1" fill="#b0cbff" />
      <circle cx="136" cy="183" r="14" fill="#fff" stroke="#d0ddef" />
      <path d="M123 179c0-17 27-16 27 1l-10-4-17 4Z" fill="#314866" />
      <circle cx="134" cy="184" r="1.5" fill="#526477" /><circle cx="142" cy="184" r="1.5" fill="#526477" />
    </g>
    <g>
      <path d="m249 242 51-25 52 25-52 25Z" fill="#fff" stroke="#c2d5f4" />
      <path d="m249 242 51 25 52-25v12l-52 25-51-25Z" fill="#b0cbff" />
      <path d="m272 225 28-14 30 14-30 14Z" fill="#dbe8ff" />
      <circle cx="300" cy="198" r="35" fill="#2f5ce5" />
      <path d="m300 179 8 8-8 8-8-8Zm-12 12 8 8-8 8-8-8Zm24 0 8 8-8 8-8-8Zm-12 12 8 8-8 8-8-8Z" fill="#fff" />
    </g>
    <g>
      <path d="m419 258 55-27 55 26-55 27Z" fill="#fff" stroke="#bad0f4" />
      <path d="m419 258 55 26 55-27v12l-55 27-55-27Z" fill="#b0cbff" />
      <path d="m441 204 34-17 34 17-34 17Z" fill="#2f5ce5" />
      <path d="m441 204 34 17v61l-34-17Z" fill="#fff" stroke="#c4d8f5" />
      <path d="m475 221 34-17v61l-34 17Z" fill="#bdd3fc" />
      <path d="m445 204 30 14 30-14" stroke="#5278ef" strokeWidth="7" />
      <path d="m449 221 19 9m-19 6 19 9m-19 6 19 9" stroke="#83b8ff" strokeWidth="6" strokeLinecap="round" />
    </g>
  </svg>;
}

const storyText: Record<SearchPhase, string> = {
  question: 'Todo empieza con una pregunta.',
  agent: 'El agente recibe la consulta.',
  search: 'Busca información pública que pueda consultar.',
  company: 'Lee los servicios, la cobertura y el contacto.',
  return: 'La información vuelve al agente.',
  delivery: 'El agente prepara la respuesta.',
  answer: 'La información llega a la persona.',
};

const storyStage: Record<SearchPhase, number> = {
  question: 1, agent: 1, search: 2, company: 2, return: 3, delivery: 3, answer: 3,
};

export default function AgentScene() {
  const [state, dispatch] = useReducer(sceneReducer, initialScene);
  const [opportunityOpen, setOpportunityOpen] = useState(false);
  const [phase, setPhase] = useState<SearchPhase>('question');
  const [modelReady, setModelReady] = useState(false);
  const [anchors, setAnchors] = useState<SearchAnchors>({
    person: { x: 22, y: 24 },
    agent: { x: 49, y: 64 },
    competitor: { x: 66, y: 13 },
    company: { x: 77, y: 72 },
  });
  const figure = useRef<HTMLElement>(null);
  const opportunity = useRef<HTMLDialogElement>(null);
  const descriptionId = useId();
  const opportunityId = useId();
  const opportunityTitleId = useId();
  const opportunityBodyId = useId();
  const { animated, playing } = scenePlayback(state);
  const label = state.paused ? 'Continuar animación' : 'Pausar animación';
  const scenePhase = state.reduced || !state.initialized ? 'company' : phase;

  const moveHighlight = (event: PointerEvent<HTMLElement>) => {
    if (state.reduced || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--highlight-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--highlight-y', `${event.clientY - bounds.top}px`);
  };

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

  return <><figure ref={figure} className={styles.figure} data-model-ready={modelReady} aria-label="El recorrido de una consulta a información pública" aria-describedby={descriptionId}>
    <figcaption className={styles.caption}><span aria-hidden="true" />Demostración ilustrativa</figcaption>
    <p id={descriptionId} className="visually-hidden">Una persona pregunta por un servicio en Chile. Una señal nace en ella, entra al agente y lo activa. El agente consulta la información pública preparada de una empresa; la otra empresa del ejemplo carece de los datos necesarios. La señal entra a la empresa, representa la consulta de servicios, cobertura y contacto, y regresa al agente y a la persona con información. El modelo 3D es ilustrativo: no ejecuta una búsqueda real ni garantiza apariciones, recomendaciones o posiciones. Puedes tocar Tu empresa o el Sí para abrir una invitación a solicitar tu análisis.</p>
    <div className={styles.story} data-animated={animated} data-playing={playing && !opportunityOpen} data-interactive={state.initialized} data-phase={scenePhase} data-stage={storyStage[scenePhase]}>
      <div className={styles.factory} data-part="journey" data-model-ready={modelReady}>
        <SearchFallback />
        <AgentSearchModel className={styles.model} playing={playing && !opportunityOpen} reduced={state.reduced} onPhase={setPhase} onAnchors={setAnchors} onReady={setModelReady} />
        <article className={styles.question} data-part="person" style={{ left: `clamp(var(--question-half), ${anchors.person.x}%, calc(100% - var(--question-half)))`, top: `${anchors.person.y}%` }}>
          <p className={styles.personLabel}><svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="5" r="2.5" stroke="currentColor" /><path d="M3.5 14v-1.5a4.5 4.5 0 0 1 9 0V14" stroke="currentColor" strokeLinecap="round" /></svg>{scenePhase === 'answer' ? 'Recibe información' : 'Una persona'}</p>
          <p className={styles.questionText}>{scenePhase === 'answer' ? 'Servicios, cobertura y contacto.' : '¿Quién ofrece este servicio en Chile?'}</p>
        </article>
        <div className={styles.agentLabel} data-part="agent" style={{ left: `${anchors.agent.x}%`, top: `${anchors.agent.y}%` }}>
          <p>Agente IA</p>
        </div>
        <article className={styles.competitor} data-check="other" style={{ left: `${anchors.competitor.x}%`, top: `${anchors.competitor.y}%` }}>
          <h3>Otra empresa <span>No</span></h3><p>Sin datos</p>
        </article>
        <article className={styles.company} data-check="ready" onPointerMove={moveHighlight} style={{ left: `clamp(var(--company-half), ${anchors.company.x}%, calc(100% - var(--company-half)))`, top: `${anchors.company.y}%` }}>
            <div className={styles.companyHeading}>
              <h3>Tu empresa</h3>
              <span className={styles.staticStatus}>Sí</span>
              <span className={styles.triggerLabel} aria-hidden="true">Sí<svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 12 12 4M5 4h7v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
            </div>
            <p className={styles.companyCopy}>Información consultable</p>
            <button className={styles.readyTrigger} type="button" onClick={openOpportunity} aria-label="Sí: ver cómo preparar mi empresa para IA" aria-haspopup="dialog" aria-controls={opportunityId} aria-expanded={opportunityOpen} />
        </article>
      </div>
      <ol className={styles.steps} aria-label="Tres momentos del recorrido">
        {['Pregunta', 'Consulta', 'Respuesta'].map((step, index) => <li key={step} data-active={storyStage[scenePhase] === index + 1} aria-current={storyStage[scenePhase] === index + 1 ? 'step' : undefined}><span aria-hidden="true" />{step}</li>)}
      </ol>
    </div>
    <div className={styles.controls}>
      <p className={styles.flowStatus}>{storyText[scenePhase]}</p>
      {modelReady && state.initialized && state.entered && !state.reduced && <button type="button" onClick={() => dispatch({ type: 'toggle' })} aria-label={label} aria-pressed={state.paused}>
        <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" fill="none">{state.paused ? <path d="m5 3 7 5-7 5Z" fill="currentColor" /> : <path d="M5 3v10M11 3v10" stroke="currentColor" strokeWidth="2" />}</svg><span>{state.paused ? 'Continuar' : 'Pausar'}</span>
      </button>}
    </div>
    <p className={styles.exampleNote}>Ejemplo ficticio. No garantiza aparecer en una IA.</p>
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
