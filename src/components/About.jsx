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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    
    async function fetchDownloadCount() {
      try {
        console.log('[About] Fetching download count...')
        const count = await getDownloadCount()
        if (isMounted) {
          if (count !== null) {
            setDownloadCount(count)
            setError(null)
            console.log('[About] Download count loaded:', count)
          } else {
            setError('Failed to load download count')
            console.warn('[About] Download count is null, using fallback')
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message)
          console.error('[About] Error fetching download count:', err)
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchDownloadCount()
    return () => {
      isMounted = false
    }
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

  // Fungsi untuk menghitung usia berdasarkan tanggal lahir
  const calculateAge = (birthday) => {
    const parts = birthday.split(' ')
    const birthYear = parseInt(parts[1])
    const currentYear = new Date().getFullYear()
    const birthMonth = new Date(Date.parse(parts[0] + ' 1, 2000')).getMonth()
    const currentMonth = new Date().getMonth()
    let age = currentYear - birthYear
    if (currentMonth < birthMonth || (currentMonth === birthMonth && new Date().getDate() < 1)) {
      age--
    }
    return age
  }

  const birthday = ABOUT_INFO.find(item => item.key === 'birthday').value
  const age = calculateAge(birthday)

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
                <span>{item.key === 'age' ? age : item.value}</span>
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
        {ABOUT_STATS.map((stat, i) => {
          // Handle special case for downloads stat
          let displayValue = stat.number
          if (stat.key === 'downloads') {
            if (loading) {
              displayValue = '...' // Loading state
            } else if (error) {
              displayValue = stat.number // Fallback ke default jika error
              console.warn('[About] Showing fallback value due to error:', error)
            } else if (downloadCount !== null) {
              displayValue = downloadCount // Use actual count from Supabase
            }
          }

          return (
            <div key={stat.key} className={`${styles.statCard} fade-in fade-in-delay-${i + 1}`}>
              <span className={styles.statIcon}>{stat.icon}</span>
              <span className={styles.statNum}>
                {displayValue}
              </span>
              <span className={styles.statLabel}>
                {t(`about.stats.${stat.key}`, { defaultValue: stat.key })}
              </span>
            </div>
          )
        })}
      </div>

    </section>
  )
}
