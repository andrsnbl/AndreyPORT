// ─────────────────────────────────────────────────────────────
//  Services.jsx
//  Section layanan: 4 kartu service dengan hover effect
// ─────────────────────────────────────────────────────────────

import { SERVICES } from '../data/portfolioData'
import styles from './Services.module.css'

export default function Services() {
  return (
    <section id="services" className={styles.services}>

      <span className="section-tag fade-in">What I Do</span>
      <h2 className={`section-title fade-in fade-in-delay-1`}>My <span>Services</span></h2>
      <p className={`section-sub fade-in fade-in-delay-1`}>Services I offer to my clients</p>

      <div className={styles.grid}>
        {SERVICES.map((service, i) => (
          <div
            key={service.title}
            className={`${styles.card} fade-in fade-in-delay-${(i % 2) + 1}`}
          >
            <div className={styles.icon}>{service.icon}</div>
            <h5>{service.title}</h5>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>

    </section>
  )
}
