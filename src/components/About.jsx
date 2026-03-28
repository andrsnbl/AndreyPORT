// ─────────────────────────────────────────────────────────────
//  About.jsx
//  Section about: foto, info pribadi, tombol, kartu statistik
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { ABOUT_INFO, ABOUT_STATS } from '../data/portfolioData'
import { getDownloadCount, incrementDownloadCount } from '../lib/supabase'
import { useTranslation } from 'react-i18next'
import { trackEvent, GA_EVENTS } from '../hooks/useGoogleAnalytics'
import styles from './About.module.css'

export default function About() {
  const { t } = useTranslation()
  const [downloadCount, setDownloadCount] = useState(null)

  useEffect(() => {
    getDownloadCount().then((count) => {
      if (count !== null) setDownloadCount(count)
    })
  }, [])

  const handleDownloadCV = async (e) => {
    e.preventDefault()

    // Track CV download event
    trackEvent(GA_EVENTS.CV_DOWNLOAD, {
      file_name: 'ResumeCV-Andrey.pdf',
      file_type: 'pdf',
    })

    const newCount = await incrementDownloadCount()
    if (newCount !== null) setDownloadCount(newCount)
    const a = document.createElement('a')
    a.href = '/ResumeCV-Andrey.pdf'
    a.download = 'ResumeCV-Andrey.pdf'
    a.click()
  }

  return (
    <section id="about" className={styles.about}>

      {/* Grid dua kolom: foto | teks */}
      <div className={styles.grid}>

        {/* Foto */}
        <div className={`${styles.imgWrap} fade-in`}>
          <img src="/img/judul.png" alt="About Andrey" />
          <div className={styles.badge}>
            <span className={styles.badgeNum}>25+</span>
            <span className={styles.badgeLabel}>{t('about.badge', { defaultValue: 'Projects Completed' })}</span>
          </div>
        </div>

        {/* Teks & info */}
        <div>
          <span className="section-tag fade-in">{t('about.tag', { defaultValue: 'About Me' })}</span>

          <h2 className={`section-title fade-in fade-in-delay-1`}>
            {t('about.title', { defaultValue: "Hello, I'm" })} <span>Andrey</span>
          </h2>

          <p className={`section-sub fade-in fade-in-delay-1`}>
            {t('about.desc', {
              defaultValue:
                'A passionate web designer and developer from Medan, Indonesia. Graduated in Information Systems with hands-on experience in UI/UX, graphic design, and web development.',
            })}
          </p>

          {/* Grid info pribadi */}
          <div className={`${styles.infoGrid} fade-in fade-in-delay-2`}>
            {ABOUT_INFO.map((item) => (
              <div key={item.key} className={styles.infoItem}>
                <strong>{t(`about.infoKeys.${item.key}`, { defaultValue: item.key })}</strong>
                <span>{item.value}</span>
              </div>
            ))}
          </div>

          {/* Tombol */}
          <div className={`${styles.actions} fade-in fade-in-delay-3`}>
            <a href="/ResumeCV-Andrey.pdf" download="ResumeCV-Andrey.pdf" className="btn-primary" onClick={handleDownloadCV}>
              {t('about.downloadCV', { defaultValue: '⬇ Download CV' })}
            </a>
            <a href="mailto:andreyulius8@gmail.com" className="btn-secondary">
              {t('about.sendEmail', { defaultValue: '✉ Send Email' })}
            </a>
          </div>
        </div>
      </div>

      {/* Kartu statistik di bawah grid */}
      <div className={styles.statsRow}>
        {ABOUT_STATS.map((stat, i) => (
          <div key={stat.key} className={`${styles.statCard} fade-in fade-in-delay-${i + 1}`}>
            <span className={styles.statIcon}>{stat.icon}</span>
            <span className={styles.statNum}>
              {stat.key === 'downloads' && downloadCount !== null ? downloadCount : stat.number}
            </span>
            <span className={styles.statLabel}>
              {t(`about.stats.${stat.key}`, { defaultValue: stat.key })}
            </span>
          </div>
        ))}
      </div>

    </section>
  )
}
