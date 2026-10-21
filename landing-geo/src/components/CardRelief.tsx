'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import type { CardReliefEngine } from './card-relief-engine';
import styles from './CardRelief.module.css';

// The document is server-rendered HTML. Three.js only adds its decorative edge.
export default function CardRelief({ children }: { children: ReactNode }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const front = frontRef.current;
    const mount = mountRef.current;
    if (!host || !front || !mount) return;

    const staticMode = window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 800px), (pointer: coarse)');
    let engine: CardReliefEngine | null = null;
    let loading: Promise<void> | null = null;
    let cancelled = false;
    let failed = false;
    let visible = true;
    let pointer = { x: 0, y: 0 };
    function measureBounds() {
      const rect = host!.getBoundingClientRect();
      return { left: rect.left + window.scrollX, top: rect.top + window.scrollY, width: rect.width, height: rect.height };
    }
    let bounds = measureBounds();

    function reset() {
      const previous = engine;
      engine = null;
      previous?.dispose();
      host!.dataset.relief = 'static';
      host!.dataset.motion = 'idle';
      front!.style.transform = '';
    }

    function syncActivity() {
      engine?.setActive(visible && !document.hidden && !staticMode.matches);
    }

    function failure() {
      failed = true;
      reset();
      host!.dataset.fallback = 'unavailable';
    }

    function prepare() {
      if (cancelled || failed || staticMode.matches || !visible || document.hidden) return;
      if (engine) { engine.setPointer(pointer.x, pointer.y); return; }
      if (loading) return;
      loading = (async () => {
        try {
          const { createCardRelief } = await import('./card-relief-engine');
          if (cancelled || failed || staticMode.matches || !visible || document.hidden) return;
          const created = createCardRelief(mount!, front!, host!, failure);
          if (cancelled || failed) { created.dispose(); return; }
          engine = created;
          engine.setPointer(pointer.x, pointer.y);
          syncActivity();
        } catch {
          if (!cancelled) failure();
        } finally {
          loading = null;
        }
      })();
    }

    function point(event: PointerEvent) {
      if (event.pointerType === 'touch' || staticMode.matches) return;
      pointer = {
        x: Math.max(-1, Math.min(1, ((event.clientX + window.scrollX - bounds.left) / bounds.width - .5) * 2)),
        y: Math.max(-1, Math.min(1, ((event.clientY + window.scrollY - bounds.top) / bounds.height - .5) * 2)),
      };
      prepare();
    }

    function enter(event: PointerEvent) {
      bounds = measureBounds();
      point(event);
    }

    function leave() {
      pointer = { x: 0, y: 0 };
      engine?.setPointer(0, 0);
    }

    function preferenceChanged() {
      if (staticMode.matches) reset();
      host!.dataset.mode = staticMode.matches ? 'static' : 'interactive';
    }

    function focus() {
      pointer = { x: -.2, y: -.1 };
      prepare();
    }

    const activator = host.closest('section')?.querySelector<HTMLAnchorElement>('a[href="#contacto"]');
    const resize = new ResizeObserver(() => {
      bounds = measureBounds();
      engine?.resize(front.offsetWidth, front.offsetHeight);
    });
    const intersection = new IntersectionObserver(entries => {
      visible = entries[0]?.isIntersecting ?? false;
      if (!visible) leave();
      syncActivity();
    });
    resize.observe(front);
    intersection.observe(host);
    host.dataset.mode = staticMode.matches ? 'static' : 'interactive';
    host.addEventListener('pointerenter', enter, { passive: true });
    host.addEventListener('pointermove', point, { passive: true });
    host.addEventListener('pointerleave', leave, { passive: true });
    activator?.addEventListener('focus', focus);
    activator?.addEventListener('blur', leave);
    document.addEventListener('visibilitychange', syncActivity);
    staticMode.addEventListener('change', preferenceChanged);

    return () => {
      cancelled = true;
      resize.disconnect();
      intersection.disconnect();
      host.removeEventListener('pointerenter', enter);
      host.removeEventListener('pointermove', point);
      host.removeEventListener('pointerleave', leave);
      activator?.removeEventListener('focus', focus);
      activator?.removeEventListener('blur', leave);
      document.removeEventListener('visibilitychange', syncActivity);
      staticMode.removeEventListener('change', preferenceChanged);
      reset();
    };
  }, []);

  return (
    <div ref={hostRef} className={styles.host} data-relief="static" data-motion="idle">
      <div className={styles.depth} aria-hidden="true" />
      <div ref={mountRef} className={styles.canvas} aria-hidden="true" />
      <div ref={frontRef} className={styles.front}>{children}</div>
    </div>
  );
}
