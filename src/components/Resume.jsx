// ─────────────────────────────────────────────────────────────
//  Resume.jsx
//  Section resume: timeline pendidikan, pengalaman, skill bars
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef } from 'react'
import { EDUCATION, EXPERIENCE, SKILLS } from '../data/portfolioData'
import { useTranslation } from 'react-i18next'
import styles from './Resume.module.css'

export default function Resume() {
  const { t } = useTranslation()
  const skillsRef = useRef(null)

  // Animasikan skill bar ketika section masuk viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('[data-pct]').forEach((bar) => {
            bar.style.width = bar.getAttribute('data-pct')
          })
        }
      },
      { threshold: 0.3 }
    )
    if (skillsRef.current) observer.observe(skillsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="resume" className={styles.resume}>
      <div className={styles.inner}>

        {/* Header section */}
        <span className="section-tag fade-in">{t('resume.tag', { defaultValue: 'Resume' })}</span>
        <h2 className={`section-title fade-in fade-in-delay-1`}>
          {t('resume.title', { defaultValue: 'My Resume' }).split(' ')[0]} <span>{t('resume.title', { defaultValue: 'My Resume' }).split(' ').slice(1).join(' ')}</span>
        </h2>
        <p className={`section-sub fade-in fade-in-delay-1`}>{t('resume.subtitle', { defaultValue: 'I am available for freelance projects' })}</p>

        {/* Grid dua kolom: pendidikan | pengalaman */}
        <div className={styles.grid}>

          {/* Pendidikan */}
          <div className={`${styles.col} fade-in`}>
            <h3 className={styles.colTitle}><span>🎓</span> {t('resume.education', { defaultValue: 'Education' })}</h3>
            <ul className={styles.timeline}>
              {EDUCATION.map((item) => (
                <li key={item.key} className={styles.timelineItem}>
                  <h6>{t(`resume.edu.${item.key}.title`, { defaultValue: item.key })}</h6>
                  <span className={styles.period}>📅 {item.period}</span>
                  <p>{t(`resume.edu.${item.key}.desc`, { defaultValue: '' })}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Pengalaman */}
          <div className={`${styles.col} fade-in fade-in-delay-1`}>
            <h3 className={styles.colTitle}><span>💼</span> {t('resume.experience', { defaultValue: 'Experience' })}</h3>
            <ul className={styles.timeline}>
              {EXPERIENCE.map((item) => (
                <li key={item.key} className={styles.timelineItem}>
                  <h6>{t(`resume.exp.${item.key}.title`, { defaultValue: item.key })}</h6>
                  <span className={styles.period}>📅 {item.period}</span>
                  <p>{t(`resume.exp.${item.key}.desc`, { defaultValue: '' })}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Skill bars */}
        <div ref={skillsRef} className={`${styles.skills} fade-in`}>
          <h2 className="section-title">{t('resume.skillsTitle', { defaultValue: 'Technical Skills' }).split(' ')[0]} <span>{t('resume.skillsTitle', { defaultValue: 'Technical Skills' }).split(' ').slice(1).join(' ')}</span></h2>
          <div className={styles.skillsGrid}>
            {SKILLS.map((skill) => (
              <div key={skill.name} className={styles.skillItem}>
                <div className={styles.skillHeader}>
                  <span>{skill.name}</span>
                  <span className={styles.skillPct}>{skill.pct}%</span>
                </div>
                <div className={styles.skillTrack}>
                  <div
                    className={styles.skillFill}
                    data-pct={`${skill.pct}%`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
