// ─────────────────────────────────────────────────────────────
//  Testimonial.jsx
//  Section klien: 4 kartu testimonial dengan foto dan kutipan
// ─────────────────────────────────────────────────────────────

import { TESTIMONIALS } from '../data/portfolioData'
import { useTranslation } from 'react-i18next'
import styles from './Testimonial.module.css'

export default function Testimonial() {
  const { t } = useTranslation()
  return (
    <section id="testimonial" className={styles.testimonial}>

      <span className="section-tag fade-in">{t('testimonial.tag', { defaultValue: 'Testimonials' })}</span>
      <h2 className={`section-title fade-in fade-in-delay-1`}>{t('testimonial.title', { defaultValue: 'My Clients' }).split(' ')[0]} <span>{t('testimonial.title', { defaultValue: 'My Clients' }).split(' ').slice(1).join(' ')}</span></h2>
      <p className={`section-sub fade-in fade-in-delay-1`}>{t('testimonial.subtitle', { defaultValue: 'What my clients say about me' })}</p>

      <div className={styles.grid}>
        {TESTIMONIALS.map((item, i) => (
          <div
            key={item.key + i}
            className={`${styles.card} fade-in fade-in-delay-${(i % 3) + 1}`}
          >
            {/* Tanda kutip besar */}
            <div className={styles.quote}>"</div>

            <p>{t(`testimonial.items.${item.key}.quote`, { defaultValue: '' })}</p>

            {/* Info klien */}
            <div className={styles.author}>
              <img src={item.img} alt={t(`testimonial.items.${item.key}.name`, { defaultValue: item.key })} />
              <div>
                <h6>{t(`testimonial.items.${item.key}.name`, { defaultValue: item.key })}</h6>
                <span>{t(`testimonial.items.${item.key}.role`, { defaultValue: '' })}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
