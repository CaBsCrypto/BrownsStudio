import { site } from '@geo/content/site';
import styles from './FAQ.module.css';

export default function FAQ({ items = site.faqs, title = site.faqTitle }: { items?: readonly { question: string; answer: string }[]; title?: string }) {
  return (
    <section id="preguntas" tabIndex={-1} aria-labelledby="faq-title" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Preguntas frecuentes</p>
          <h2 id="faq-title">{title}</h2>
        </div>
        <div className={styles.questions}>
          {items.map((item) => (
            <details key={item.question} className={styles.item}>
              <summary>{item.question}<span className={styles.indicator} aria-hidden="true" /></summary>
              <div className={styles.answer}><p>{item.answer}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
