// ─────────────────────────────────────────────────────────────
//  Services.jsx
//  Section layanan: 4 kartu service dengan hover effect
// ─────────────────────────────────────────────────────────────

import { SERVICES } from '../data/portfolioData'
import { useTranslation } from 'react-i18next'
import styles from './Services.module.css'

export default function Services() {
  const { t } = useTranslation()
  return (
    <section id="services" className={styles.services}>

      <span className="section-tag fade-in">{t('services.tag', { defaultValue: 'What I Do' })}</span>
      <h2 className={`section-title fade-in fade-in-delay-1`}>{t('services.title', { defaultValue: 'My Services' }).split(' ')[0]} <span>{t('services.title', { defaultValue: 'My Services' }).split(' ').slice(1).join(' ')}</span></h2>
      <p className={`section-sub fade-in fade-in-delay-1`}>{t('services.subtitle', { defaultValue: 'Services I offer to my clients' })}</p>

      <div className={styles.grid}>
        {SERVICES.map((service, i) => (
          <div
            key={service.key}
            className={`${styles.card} fade-in fade-in-delay-${(i % 2) + 1}`}
          >
            <div className={styles.icon}>{service.icon}</div>
            <h5>{t(`services.items.${service.key}.title`, { defaultValue: service.key })}</h5>
            <p>{t(`services.items.${service.key}.desc`, { defaultValue: '' })}</p>
          </div>
        ))}
      </div>

    </section>
  )
}
