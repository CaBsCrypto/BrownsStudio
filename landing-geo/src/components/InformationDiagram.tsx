import { site } from '@geo/content/site';
import styles from './InformationDiagram.module.css';

export default function InformationDiagram() {
  return (
    <figure className={styles.diagram} aria-labelledby="diagram-caption">
      <div className={styles.scattered}>
        <p>{site.diagram.dispersedLabel}</p>
        <div>{site.diagram.fields.map((field) => <span key={field}>{field}</span>)}</div>
      </div>
      <svg className={styles.connections} viewBox="0 0 440 58" fill="none" aria-hidden="true">
        <path d="M68 0V15Q68 24 77 24H363Q372 24 372 15V0M220 24V51" />
        <circle cx="220" cy="52" r="4" />
      </svg>
      <div className={styles.paperShadow} aria-hidden="true" />
      <div className={styles.document}>
        <div className={styles.documentHeader}>
          <span className={styles.documentMark} aria-hidden="true">＋</span>
          <span>{site.brand.name}</span>
        </div>
        <h2>{site.diagram.organizedLabel}</h2>
        <ul>
          {site.diagram.fields.map((field, index) => (
            <li key={field}>
              <span className={styles.detailMark} aria-hidden="true">
                {index === 0 ? '↗' : index === 1 ? '◎' : index === 2 ? '◇' : '＋'}
              </span>
              <span>{field}</span>
              <span className={styles.contentLine} aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
      <figcaption id="diagram-caption">
        <span>{site.diagram.label}</span>
        <p>{site.diagram.caption}</p>
      </figcaption>
    </figure>
  );
}
