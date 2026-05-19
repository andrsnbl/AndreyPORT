import { useEffect, useRef } from 'react'
import useTyped from '../hooks/useTyped'
import { TYPED_WORDS, HERO_STATS } from '../data/portfolioData'
import { useTranslation } from 'react-i18next'
import styles from './Hero.module.css'

// Wrapper: 340×340px, center = (170, 170)
const CX = 170
const CY = 170

// Radius orbit
const R_OUTER = 148  // px
const R_INNER = 108  // px

// Ukuran icon (untuk offset supaya center icon = titik orbit)
const SIZE_OUTER = 48  // px
const SIZE_INNER = 38  // px

// Kecepatan: derajat per detik
const SPD_OUTER =  22   //  searah jarum jam
const SPD_INNER = -30   //  berlawanan

const OUTER_ICONS = [
  { icon: '💻', label: 'Coding'      },
  { icon: '🎨', label: 'Design'      },
  { icon: '📸', label: 'Photography' },
  { icon: '✈️', label: 'Travel'      },
]
const INNER_ICONS = [
  { icon: '⚡', label: 'Fast'  },
  { icon: '🔧', label: 'Build' },
  { icon: '💡', label: 'Ideas' },
  { icon: '🌐', label: 'Web'   },
]

// Sudut awal agar icon mulai merata (0°, 90°, 180°, 270°)
const startAngles = (n) => Array.from({ length: n }, (_, i) => (360 / n) * i - 90)

function toRad(deg) { return (deg * Math.PI) / 180 }

export default function Hero() {
  const { t }       = useTranslation()
  const typedText   = useTyped(TYPED_WORDS)

  const wrapRef    = useRef(null)
  const outerRefs  = useRef([])
  const innerRefs  = useRef([])
  const rafRef     = useRef(null)
  const startRef   = useRef(null)

  // ── rAF orbit ─────────────────────────────────────────
  useEffect(() => {
    const outerStart = startAngles(OUTER_ICONS.length)
    const innerStart = startAngles(INNER_ICONS.length)

    function tick(ts) {
      if (!startRef.current) startRef.current = ts
      const sec = (ts - startRef.current) / 1000

      outerRefs.current.forEach((el, i) => {
        if (!el) return
        const rad = toRad(outerStart[i] + sec * SPD_OUTER)
        const x   = CX + R_OUTER * Math.cos(rad) - SIZE_OUTER / 2
        const y   = CY + R_OUTER * Math.sin(rad) - SIZE_OUTER / 2
        el.style.left = `${x}px`
        el.style.top  = `${y}px`
      })

      innerRefs.current.forEach((el, i) => {
        if (!el) return
        const rad = toRad(innerStart[i] + sec * SPD_INNER)
        const x   = CX + R_INNER * Math.cos(rad) - SIZE_INNER / 2
        const y   = CY + R_INNER * Math.sin(rad) - SIZE_INNER / 2
        el.style.left = `${x}px`
        el.style.top  = `${y}px`
      })

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // ── Stagger entrance kolom kiri ────────────────────────
  const leftRef = useRef(null)
  useEffect(() => {
    const children = leftRef.current ? [...leftRef.current.children] : []
    children.forEach((child, i) => {
      child.style.opacity    = '0'
      child.style.transform  = 'translateY(22px)'
      child.style.transition = `opacity 0.55s ease ${i * 0.11}s, transform 0.55s ease ${i * 0.11}s`
    })
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        children.forEach((child) => {
          child.style.opacity   = '1'
          child.style.transform = 'translateY(0)'
        })
      )
    )
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <section className={styles.hero} id="hero">
      <div className={`${styles.blob} ${styles.blob1}`} />
      <div className={`${styles.blob} ${styles.blob2}`} />

      <div className={styles.grid}>

        {/* ── Kolom Kiri ── */}
        <div ref={leftRef} className={styles.left}>
          <div className={styles.badge}>
            <span className={styles.dot} />
            <span>{t('hero.available', { defaultValue: 'Available for Freelance Projects' })}</span>
          </div>

          <h1 className={styles.name}>
            I'M <span>Andrey</span><br />Julius
          </h1>

          <div className={styles.typed}>
            A&nbsp;
            <span className={styles.typedWord}>
              {typedText}
              <span className={styles.cursor}>|</span>
            </span>
          </div>

          <p className={styles.desc}>
            {t('hero.desc', {
              defaultValue:
                'Fresh web development graduate with solid foundation in design & development. Based in Medan, Indonesia — building clean, modern digital experiences.',
            })}
          </p>

          <div className={styles.cta}>
            <a href="/ResumeCV-Andrey.pdf" download className="btn-primary">
              {t('hero.downloadCV', { defaultValue: '⬇ Download CV' })}
            </a>
            <a href="#contact" className="btn-secondary">
              {t('hero.getInTouch', { defaultValue: 'Get In Touch →' })}
            </a>
          </div>

          <div className={styles.stats}>
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

        {/* ── Kolom Kanan: Orbit ── */}
        <div className={styles.visual}>
          {/*
            Wrapper FIXED 340×340px — semua koordinat icon
            dihitung berdasarkan ukuran ini (CX=170, CY=170)
          */}
          <div ref={wrapRef} className={styles.orbitWrapper}>

            {/* Cincin SVG — presisi, tidak berputar */}
            <svg className={styles.orbitSvg} viewBox="0 0 340 340" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              {/* Cincin luar */}
              <circle cx="170" cy="170" r={R_OUTER}
                stroke="rgba(124,58,237,0.2)" strokeWidth="1.5"
                strokeDasharray="6 5" />
              {/* Cincin dalam */}
              <circle cx="170" cy="170" r={R_INNER}
                stroke="rgba(6,182,212,0.2)" strokeWidth="1.5"
                strokeDasharray="4 4" />
            </svg>

            {/* Icon orbit luar — posisi via left/top dari rAF */}
            {OUTER_ICONS.map(({ icon, label }, i) => (
              <div
                key={i}
                ref={el => { outerRefs.current[i] = el }}
                className={styles.orbitIcon}
                title={label}
              >
                {icon}
              </div>
            ))}

            {/* Icon orbit dalam */}
            {INNER_ICONS.map(({ icon, label }, i) => (
              <div
                key={i}
                ref={el => { innerRefs.current[i] = el }}
                className={styles.orbitIconSm}
                title={label}
              >
                {icon}
              </div>
            ))}

            {/* Ring gradient berputar — elemen terpisah dari foto */}
            <div className={styles.centerRing} />

            {/* Foto — diam total, tidak ada animasi */}
            <img
              src="/img/Judol.png"
              alt="Andrey Julius"
              className={styles.centerImg}
            />

            {/* Glow */}
            <div className={styles.centerGlow} />

          </div>
        </div>

      </div>
    </section>
  )
}
