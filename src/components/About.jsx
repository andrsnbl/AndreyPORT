// ─────────────────────────────────────────────────────────────
//  About.jsx
//  Section about: foto, info pribadi, tombol, kartu statistik
// ─────────────────────────────────────────────────────────────

import { ABOUT_INFO, ABOUT_STATS } from '../data/portfolioData'
import styles from './About.module.css'

export default function About() {
  return (
    <section id="about" className={styles.about}>

      {/* Grid dua kolom: foto | teks */}
      <div className={styles.grid}>

        {/* Foto */}
        <div className={`${styles.imgWrap} fade-in`}>
          <img src="/img/judul.png" alt="About Andrey" />
          <div className={styles.badge}>
            <span className={styles.badgeNum}>25+</span>
            <span className={styles.badgeLabel}>Projects Completed</span>
          </div>
        </div>

        {/* Teks & info */}
        <div>
          <span className="section-tag fade-in">About Me</span>

          <h2 className={`section-title fade-in fade-in-delay-1`}>
            Hello, I'm <span>Andrey</span>
          </h2>

          <p className={`section-sub fade-in fade-in-delay-1`}>
            A passionate web designer and developer from Medan, Indonesia.
            Graduated in Information Systems with hands-on experience in UI/UX,
            graphic design, and web development.
          </p>

          {/* Grid info pribadi */}
          <div className={`${styles.infoGrid} fade-in fade-in-delay-2`}>
            {ABOUT_INFO.map((item) => (
              <div key={item.key} className={styles.infoItem}>
                <strong>{item.key}</strong>
                <span>{item.value}</span>
              </div>
            ))}
          </div>

          {/* Tombol */}
          <div className={`${styles.actions} fade-in fade-in-delay-3`}>
            <a href="/ResumeCV-Andrey.pdf" download className="btn-primary">
              ⬇ Download CV
            </a>
            <a href="mailto:andreyulius@gmail.com" className="btn-secondary">
              ✉ Send Email
            </a>
          </div>
        </div>
      </div>

      {/* Kartu statistik di bawah grid */}
      <div className={styles.statsRow}>
        {ABOUT_STATS.map((stat, i) => (
          <div key={stat.label} className={`${styles.statCard} fade-in fade-in-delay-${i + 1}`}>
            <span className={styles.statIcon}>{stat.icon}</span>
            <span className={styles.statNum}>{stat.number}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </div>

    </section>
  )
}
