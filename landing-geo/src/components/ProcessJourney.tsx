'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import type { ProcessReliefEngine } from './process-relief-engine';
import styles from './ProcessJourney.module.css';

export default function ProcessJourney({ children }: { children: ReactNode }) {
  const boardRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const actionRef = useRef<(() => void) | null>(null);
  const statusRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const board = boardRef.current;
    const mount = mountRef.current;
    const button = buttonRef.current;
    const status = statusRef.current;
    if (!board || !mount || !button || !status) return;
    const cards = [...board.querySelectorAll<HTMLElement>('[data-process-card]')];
    const staticMode = window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 800px), (pointer: coarse)');
    let engine: ProcessReliefEngine | null = null;
    let loading: Promise<ProcessReliefEngine | null> | null = null;
    let cancelled = false;
    let failed = false;
    let visible = true;
    let playing = false;
    let selected = -1;
    let intent = 0;

    function finish(message = '') {
      playing = false;
      button!.textContent = 'Ver recorrido';
      status!.textContent = message;
    }

    function reset() {
      engine?.dispose();
      engine = null;
      finish();
      board!.dataset.processRelief = 'static';
      board!.dataset.activeStep = '';
      for (const card of cards) card.style.transform = '';
    }

    function failure() {
      if (document.activeElement === button) document.getElementById('proceso')?.focus({ preventScroll: true });
      failed = true;
      reset();
      button!.hidden = true;
    }

    async function prepare(): Promise<ProcessReliefEngine | null> {
      if (cancelled || failed || staticMode.matches || !visible || document.hidden) return null;
      if (engine) return engine;
      if (loading) return loading;
      loading = (async () => {
        try {
          const { createProcessRelief } = await import('./process-relief-engine');
          if (cancelled || failed || staticMode.matches || !visible || document.hidden) return null;
          const created = createProcessRelief(mount!, board!, cards, failure);
          if (cancelled || failed) { created.dispose(); return null; }
          engine = created;
          engine.setActive(visible && !document.hidden);
          engine.highlight(selected);
          return engine;
        } catch {
          if (!cancelled) failure();
          return null;
        } finally { loading = null; }
      })();
      return loading;
    }

    async function point(event: PointerEvent) {
      if (event.pointerType === 'touch' || staticMode.matches) return;
      const card = (event.target as Element).closest<HTMLElement>('[data-process-card]');
      const next = card ? cards.indexOf(card) : -1;
      if (selected === next && !playing) return;
      selected = next;
      const request = ++intent;
      finish();
      const ready = await prepare();
      if (!cancelled && !failed && request === intent && !playing) ready?.highlight(selected);
    }

    function leave() {
      selected = -1;
      if (!playing) { intent++; engine?.highlight(-1); }
    }

    function measureVisibility() {
      const rect = board!.getBoundingClientRect();
      visible = rect.bottom > 0 && rect.top < window.innerHeight;
      engine?.setActive(visible && !document.hidden);
    }

    async function animate() {
      measureVisibility();
      const request = ++intent;
      if (playing) { engine?.stop(); finish(); return; }
      button!.disabled = true;
      const ready = await prepare();
      if (cancelled) return;
      button!.disabled = false;
      if (!ready || failed || request !== intent || !visible || document.hidden || staticMode.matches) return;
      playing = true;
      button!.textContent = 'Detener recorrido';
      status!.textContent = '';
      ready.play(() => { if (!cancelled) finish('Recorrido finalizado.'); });
    }

    function syncActivity() {
      if (!visible || document.hidden) { intent++; engine?.stop(); finish(); selected = -1; }
      engine?.setActive(visible && !document.hidden && !staticMode.matches);
    }

    function preferenceChanged() {
      if (staticMode.matches && document.activeElement === button) document.getElementById('proceso')?.focus({ preventScroll: true });
      button!.hidden = staticMode.matches || failed;
      if (staticMode.matches) { intent++; reset(); }
    }

    function focus() { measureVisibility(); void prepare(); }
    const resize = new ResizeObserver(() => engine?.resize());
    resize.observe(board);
    for (const card of cards) resize.observe(card);
    const intersection = new IntersectionObserver(entries => {
      visible = entries[0]?.isIntersecting ?? false;
      syncActivity();
    });
    intersection.observe(board);
    button.hidden = staticMode.matches;
    actionRef.current = () => { void animate(); };
    button.addEventListener('focus', focus);
    board.addEventListener('pointerover', point, { passive: true });
    board.addEventListener('pointerleave', leave, { passive: true });
    document.addEventListener('visibilitychange', syncActivity);
    staticMode.addEventListener('change', preferenceChanged);

    return () => {
      cancelled = true;
      actionRef.current = null;
      resize.disconnect();
      intersection.disconnect();
      button.removeEventListener('focus', focus);
      board.removeEventListener('pointerover', point);
      board.removeEventListener('pointerleave', leave);
      document.removeEventListener('visibilitychange', syncActivity);
      staticMode.removeEventListener('change', preferenceChanged);
      reset();
      button.hidden = true;
    };
  }, []);

  return <>
    <div className={styles.controls}>
      <button ref={buttonRef} type="button" hidden aria-controls="process-board" onClick={() => actionRef.current?.()}>Ver recorrido</button>
      <span ref={statusRef} className="visually-hidden" role="status" />
    </div>
    <div id="process-board" ref={boardRef} className={styles.board} data-process-relief="static" data-process-motion="idle">
      <div ref={mountRef} className={styles.canvas} aria-hidden="true" />
      {children}
    </div>
  </>;
}
