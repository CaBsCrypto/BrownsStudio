'use client';

import { useEffect, useRef, type KeyboardEvent, type MouseEvent } from 'react';
import { site } from '@geo/content/site';
import styles from './Nav.module.css';

export default function Nav({ navigation = site.navigation, cta = site.hero.cta, ctaHref = '#contacto' }: {
  navigation?: readonly { label: string; href: string }[];
  cta?: string;
  ctaHref?: string;
}) {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    // Reloading while a smooth anchor jump is in progress can restore the old
    // scroll position. Once local fonts settle, restore the requested chapter.
    void document.fonts.ready.then(() => {
      if (cancelled || !window.location.hash) return;
      let id: string;
      try { id = decodeURIComponent(window.location.hash.slice(1)); }
      catch { return; }
      const destination = document.getElementById(id);
      if (!destination) return;
      destination.scrollIntoView({ behavior: 'instant', block: 'start' });
      const heading = destination.querySelector<HTMLElement>('h1, h2, h3') ?? destination;
      if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    function closeQuestion(event: globalThis.KeyboardEvent) {
      if (event.key !== 'Escape' || !(event.target instanceof HTMLElement)) return;
      const question = event.target.closest<HTMLDetailsElement>('#preguntas details[open]');
      if (!question) return;
      event.preventDefault();
      question.open = false;
      question.querySelector<HTMLElement>('summary')?.focus({ preventScroll: true });
    }
    document.addEventListener('keydown', closeQuestion);
    return () => document.removeEventListener('keydown', closeQuestion);
  }, []);

  function closeMenu() {
    if (menuRef.current) menuRef.current.open = false;
  }

  function onMenuKeyDown(event: KeyboardEvent<HTMLDetailsElement>) {
    if (event.key !== 'Escape' || !menuRef.current?.open) return;
    event.preventDefault();
    event.stopPropagation();
    closeMenu();
    summaryRef.current?.focus({ preventScroll: true });
  }

  function onAnchorClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const hash = event.currentTarget.hash;
    closeMenu();
    if (!hash) return;

    // The anchor keeps its native scrolling and history behavior. Only focus is enhanced.
    requestAnimationFrame(() => {
      const destination = document.getElementById(decodeURIComponent(hash.slice(1)));
      const heading = destination?.querySelector<HTMLElement>('h1, h2, h3') ?? destination;
      if (!heading) return;
      if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    });
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.brand} href="#inicio" onClick={onAnchorClick} aria-label={`${site.brand.name}, inicio`}>
          <span className={styles.brandName}>{site.brand.name}</span>
        </a>

        <nav className={styles.desktopNav} aria-label="Navegación principal">
          <ul>
            {navigation.map((item) => (
              <li key={item.href}><a href={item.href} onClick={onAnchorClick}>{item.label}</a></li>
            ))}
          </ul>
        </nav>

        <details className={styles.mobileMenu} ref={menuRef} onKeyDown={onMenuKeyDown}>
          <summary ref={summaryRef} className={styles.menuButton} aria-controls="mobile-navigation">
            <span>Menú</span>
            <svg aria-hidden="true" width="15" height="15" viewBox="0 0 20 20"><path d="m5 8 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>
          </summary>
          <nav className={styles.menuPanel} id="mobile-navigation" aria-label="Navegación móvil">
            <ul>
              {navigation.map((item) => (
                <li key={item.href}><a href={item.href} onClick={onAnchorClick}>{item.label}</a></li>
              ))}
            </ul>
          </nav>
        </details>

        <a className={styles.cta} href={ctaHref} onClick={onAnchorClick} aria-label={cta}>
          <span>{cta}</span>
        </a>
      </div>
    </header>
  );
}
