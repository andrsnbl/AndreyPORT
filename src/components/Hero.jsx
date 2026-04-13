// ─────────────────────────────────────────────────────────────
//  Hero.jsx — orbit visual dengan logo tech berputar
// ─────────────────────────────────────────────────────────────

import useTyped from '../hooks/useTyped'
import { TYPED_WORDS, HERO_STATS } from '../data/portfolioData'
import { useTranslation } from 'react-i18next'
import styles from './Hero.module.css'

// SVG logo tech inline — tidak perlu library eksternal
const ORBIT_OUTER = [
  {
    label: 'React',
    svg: (
      <svg viewBox="0 0 40 40" width="26" height="26" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="3.5" fill="#61DAFB"/>
        <ellipse cx="20" cy="20" rx="18" ry="7" fill="none" stroke="#61DAFB" strokeWidth="1.8"/>
        <ellipse cx="20" cy="20" rx="18" ry="7" fill="none" stroke="#61DAFB" strokeWidth="1.8" transform="rotate(60 20 20)"/>
        <ellipse cx="20" cy="20" rx="18" ry="7" fill="none" stroke="#61DAFB" strokeWidth="1.8" transform="rotate(120 20 20)"/>
      </svg>
    ),
  },
  {
    label: 'Python',
    svg: (
      <svg viewBox="0 0 40 40" width="26" height="26" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 4C13 4 11 7 11 11v3h9v2H9C5 16 4 19 4 23c0 4 2 7 6 7h3v-4c0-4 3-6 7-6s7 2 7 6v4h3c4 0 6-3 6-7 0-4-1-7-5-7H20v-2h9V11c0-4-2-7-9-7z" fill="#3776AB"/>
        <circle cx="16" cy="11" r="1.5" fill="white"/>
        <circle cx="24" cy="29" r="1.5" fill="white"/>
      </svg>
    ),
  },
  {
    label: 'Figma',
    svg: (
      <svg viewBox="0 0 40 40" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
        <rect x="14" y="4"  width="12" height="10" rx="5" fill="#F24E1E"/>
        <rect x="14" y="15" width="12" height="10" rx="5" fill="#FF7262"/>
        <rect x="14" y="26" width="12" height="10" rx="5" fill="#0ACF83"/>
        <circle cx="26" cy="20" r="5" fill="#1ABCFE"/>
      </svg>
    ),
  },
  {
    label: 'PHP',
    svg: (
      <svg viewBox="0 0 40 40" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="20" cy="20" rx="18" ry="10" fill="#8892BF"/>
        <text x="20" y="24" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="monospace">php</text>
      </svg>
    ),
  },
]

const ORBIT_INNER = [
  {
    label: 'HTML5',
    svg: (
      <svg viewBox="0 0 40 40" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
        <polygon points="6,4 8,34 20,38 32,34 34,4" fill="#E44D26"/>
        <polygon points="20,8 20,35 30,32 32,8" fill="#F16529"/>
        <polygon points="12,14 13,24 20,26 20,14" fill="white"/>
        <polygon points="28,14 27,24 20,26 20,14" fill="#EBEBEB"/>
      </svg>
    ),
  },
  {
    label: 'CSS3',
    svg: (
      <svg viewBox="0 0 40 40" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
        <polygon points="6,4 8,34 20,38 32,34 34,4" fill="#264DE4"/>
        <polygon points="20,8 20,35 30,32 32,8" fill="#2965F1"/>
        <polygon points="12,14 13,22 20,24 20,14" fill="white"/>
        <polygon points="28,14 27,22 20,24 20,14" fill="#EBEBEB"/>
      </svg>
    ),
  },
  {
    label: 'JavaScript',
    svg: (
      <svg viewBox="0 0 40 40" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="4" fill="#F7DF1E"/>
        <text x="8" y="30" fill="#333" fontSize="14" fontWeight="bold" fontFamily="monospace">JS</text>
      </svg>
    ),
  },
  {
    label: 'Photoshop',
    svg: (
      <svg viewBox="0 0 40 40" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="6" fill="#001E36"/>
        <text x="5" y="28" fill="#31A8FF" fontSize="13" fontWeight="bold" fontFamily="monospace">Ps</text>
      </svg>
    ),
  },
]

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

            {/* Glow di belakang foto (z-index 1) */}
            <div className={styles.centerGlow} />

            {/* Foto profil di tengah (z-index 2) */}
            <img src="/img/Judol.png" alt="Andrey Julius" className={styles.centerImg} />

            {/* Ring luar + icon — seluruh div berputar CW,
                isi icon diberi counter-rotation CCW agar tetap tegak */}
            <div className={styles.orbitOuter}>
              {ORBIT_OUTER.map((item, i) => (
                <div key={i} className={`${styles.orbitIcon} ${styles[`pos${i}`]}`} title={item.label}>
                  <span className={styles.counterOuter}>{item.svg}</span>
                </div>
              ))}
            </div>

            {/* Ring dalam + icon — berputar CCW, isi counter CW */}
            <div className={styles.orbitInner}>
              {ORBIT_INNER.map((item, i) => (
                <div key={i} className={`${styles.orbitIconSm} ${styles[`posInner${i}`]}`} title={item.label}>
                  <span className={styles.counterInner}>{item.svg}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}