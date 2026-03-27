// ─────────────────────────────────────────────────────────────
//  Hero.jsx
//  Section pertama: nama, typing animation, orbit visual, stats
// ─────────────────────────────────────────────────────────────

import useTyped from '../hooks/useTyped'
import { TYPED_WORDS, HERO_STATS } from '../data/portfolioData'
import { useTranslation } from 'react-i18next'
import styles from './Hero.module.css'

const ORBIT_OUTER = ['📸', '✈️', '▶️', '💻']
const ORBIT_INNER = ['🎨', '⚡', '🔧', '💡']

export default function Hero() {
  const { t } = useTranslation()
  const typedText = useTyped(TYPED_WORDS)

  return (
    <section className={styles.hero} id="hero">
      <div className={`${styles.blob} ${styles.blob1}`} />
      <div className={`${styles.blob} ${styles.blob2}`} />

      <div className={styles.grid}>

        {/* ── Kolom Kiri: Teks ── */}
        <div>
          <div className="fade-in">
            <span className={styles.dot} />
            <span>{t('hero.available', { defaultValue: 'Available for Freelance Projects' })}</span>
          </div>

          <h1 className={`${styles.name} fade-in fade-in-delay-1`}>
            I'M <span>Andrey</span><br />Julius
          </h1>

          <div className={`${styles.typed} fade-in fade-in-delay-2`}>
            A&nbsp;
            <span className={styles.typedWord}>
              {typedText}
              <span className={styles.cursor}>|</span>
            </span>
          </div>

          <p className={`${styles.desc} fade-in fade-in-delay-3`}>
            {t('hero.desc', {
              defaultValue:
                'Fresh web development graduate with solid foundation in design & development. Based in Medan, Indonesia — building clean, modern digital experiences.',
            })}
          </p>

          <div className={`${styles.cta} fade-in fade-in-delay-4`}>
            <a href="/ResumeCV-Andrey.pdf" download className="btn-primary">
              {t('hero.downloadCV', { defaultValue: '⬇ Download CV' })}
            </a>
            <a href="#contact" className="btn-secondary">
              {t('hero.getInTouch', { defaultValue: 'Get In Touch →' })}
            </a>
          </div>

          <div className={`${styles.stats} fade-in fade-in-delay-4`}>
            {HERO_STATS.map((stat) => (
              <div key={stat.key} className={styles.statItem}>
                <span className={styles.statNum}>{stat.number}</span>
                <span className={styles.statLabel}>
                  {t(`hero.stats.${stat.key}`, { defaultValue: stat.key })}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Kolom Kanan: Visual Orbit ── */}
        <div className={styles.visual}>
          <div className={styles.orbitWrapper}>
            <div className={styles.orbitOuter}>
              {ORBIT_OUTER.map((icon, i) => (
                <div key={i} className={`${styles.orbitIcon} ${styles[`pos${i}`]}`}>
                  {icon}
                </div>
              ))}
            </div>
            <div className={styles.orbitInner}>
              {ORBIT_INNER.map((icon, i) => (
                <div key={i} className={`${styles.orbitIconSm} ${styles[`posInner${i}`]}`}>
                  {icon}
                </div>
              ))}
            </div>
            <img src="/img/Judol.png" alt="Andrey Julius" className={styles.centerImg} />
          </div>
        </div>

      </div>
    </section>
  )
}
