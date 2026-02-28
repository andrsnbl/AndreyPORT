// ─────────────────────────────────────────────────────────────
//  Testimonial.jsx
//  Section klien: 4 kartu testimonial dengan foto dan kutipan
// ─────────────────────────────────────────────────────────────

import { TESTIMONIALS } from '../data/portfolioData'
import styles from './Testimonial.module.css'

export default function Testimonial() {
  return (
    <section id="testimonial" className={styles.testimonial}>

      <span className="section-tag fade-in">Testimonials</span>
      <h2 className={`section-title fade-in fade-in-delay-1`}>My <span>Clients</span></h2>
      <p className={`section-sub fade-in fade-in-delay-1`}>What my clients say about me</p>

      <div className={styles.grid}>
        {TESTIMONIALS.map((item, i) => (
          <div
            key={item.name + i}
            className={`${styles.card} fade-in fade-in-delay-${(i % 3) + 1}`}
          >
            {/* Tanda kutip besar */}
            <div className={styles.quote}>"</div>

            <p>{item.quote}</p>

            {/* Info klien */}
            <div className={styles.author}>
              <img src={item.img} alt={item.name} />
              <div>
                <h6>{item.name}</h6>
                <span>{item.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
