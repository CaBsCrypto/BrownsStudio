import { site } from "@geo/content/site";
import styles from "./Contact.module.css";

export default function Contact() {
  const whatsapp = `${site.contact.whatsapp}?${new URLSearchParams({ text: site.contact.message })}`;
  const email = `mailto:${site.contact.email}?subject=${encodeURIComponent(site.contact.emailSubject)}&body=${encodeURIComponent(site.contact.message)}`;
  return (
    <>
      <section id="contacto" tabIndex={-1} className={styles.section} aria-labelledby="contact-title">
        <div className={styles.inner}>
          <div className={styles.copy}>
            <h2 id="contact-title">{site.contact.title}</h2>
            <p>{site.contact.description}</p>
          </div>
          <div className={styles.channels}>
            <a href={whatsapp} className={styles.whatsapp}>{site.contact.whatsappLabel}</a>
            <a href={email} className={styles.email}>{site.contact.emailLabel}<span>{site.contact.email}</span></a>
            <p className={styles.note}>{site.contact.note}</p>
          </div>
        </div>
      </section>
    </>
  );
}

export function Footer() {
  return (
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div><p className={styles.name}>{site.brand.name}</p><p>{site.footer.description}</p></div>
          <nav aria-label="Navegación de cierre"><ul>{site.navigation.map(item => <li key={item.href}><a href={item.href}>{item.label}</a></li>)}</ul></nav>
          <p className={styles.location}>{site.footer.location}</p>
        </div>
      </footer>
  );
}
