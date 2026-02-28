// ─────────────────────────────────────────────────────────────
//  Resume.jsx
//  Section resume: timeline pendidikan, pengalaman, skill bars
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef } from 'react'
import { EDUCATION, EXPERIENCE, SKILLS } from '../data/portfolioData'
import styles from './Resume.module.css'

export default function Resume() {
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
        <span className="section-tag fade-in">Resume</span>
        <h2 className={`section-title fade-in fade-in-delay-1`}>My <span>Resume</span></h2>
        <p className={`section-sub fade-in fade-in-delay-1`}>I am available for freelance projects</p>

        {/* Grid dua kolom: pendidikan | pengalaman */}
        <div className={styles.grid}>

          {/* Pendidikan */}
          <div className={`${styles.col} fade-in`}>
            <h3 className={styles.colTitle}><span>🎓</span> Education</h3>
            <ul className={styles.timeline}>
              {EDUCATION.map((item) => (
                <li key={item.title} className={styles.timelineItem}>
                  <h6>{item.title}</h6>
                  <span className={styles.period}>📅 {item.period}</span>
                  <p>{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Pengalaman */}
          <div className={`${styles.col} fade-in fade-in-delay-1`}>
            <h3 className={styles.colTitle}><span>💼</span> Experience</h3>
            <ul className={styles.timeline}>
              {EXPERIENCE.map((item) => (
                <li key={item.title} className={styles.timelineItem}>
                  <h6>{item.title}</h6>
                  <span className={styles.period}>📅 {item.period}</span>
                  <p>{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Skill bars */}
        <div ref={skillsRef} className={`${styles.skills} fade-in`}>
          <h2 className="section-title">Technical <span>Skills</span></h2>
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
