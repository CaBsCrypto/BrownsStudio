import Link from 'next/link';
import styles from './StatusPage.module.css';

export default function NotFound() {
  return <main className={styles.page}><div className={styles.panel}>
    <p className={styles.brand}>Browns Studio</p>
    <p className={styles.label}>Página no encontrada</p>
    <h1 className={styles.title}>Volvamos al inicio.</h1>
    <p className={styles.description}>Esta dirección no está disponible. En nuestra página principal puedes conocer los servicios y pedir tu análisis inicial gratis.</p>
    <Link className={styles.button} href="/">Volver al inicio</Link>
  </div></main>;
}