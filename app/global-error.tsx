'use client';

import Link from 'next/link';
import styles from './StatusPage.module.css';

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <html lang="es-CL"><body style={{ margin: 0, fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>
    <main className={styles.page}><div className={styles.panel}>
      <p className={styles.brand}>Browns Studio</p>
      <p className={styles.label}>No pudimos cargar la página</p>
      <h1 className={styles.title}>Intentémoslo de nuevo.</h1>
      <p className={styles.description}>Puedes volver a cargar la página o regresar al inicio. Si el problema continúa, escríbenos a contacto@browns.studio.</p>
      <div className={styles.actions}><button className={styles.button} onClick={reset}>Volver a intentar</button><Link className={`${styles.button} ${styles.secondary}`} href="/">Ir al inicio</Link></div>
    </div></main>
  </body></html>;
}
