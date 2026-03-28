// ─────────────────────────────────────────────────────────────
//  Navbar.jsx
//  Navigasi atas: logo, link menu, tombol dark mode, hamburger
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { NAV_LINKS } from '../data/portfolioData'
import styles from './Navbar.module.css'
import { useTranslation } from 'react-i18next'
import { trackEvent, GA_EVENTS } from '../hooks/useGoogleAnalytics'

export default function Navbar({ dark, toggleDark }) {
  const [menuOpen,      setMenuOpen]      = useState(false)
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language
  const getNavLabel = (key) => {
    return t(`nav.${key}`, { defaultValue: key })
  }

  const toggleLang = () => {
  const next = currentLang === 'id' ? 'en' : 'id'
  i18n.changeLanguage(next)
  localStorage.setItem('lang', next)

  // Track language change
  trackEvent(GA_EVENTS.LANGUAGE_CHANGE, {
    from_language: currentLang,
    to_language: next,
  })
  }
  const [activeSection, setActiveSection] = useState('hero')

  // Deteksi section mana yang sedang terlihat saat scroll
  useEffect(() => {
    const handleScroll = () => {
      NAV_LINKS.forEach(({ href }) => {
        const id = href.replace('#', '')
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom > 100) {
            setActiveSection(id)
          }
        }
      })
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className={styles.nav}>
        {/* Logo */}
        <a href="#hero" className={styles.logo}>
          REY<span>.</span>
        </a>

        {/* Link menu (desktop) */}
        <ul className={`${styles.navLinks} nav-links`}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={activeSection === link.href.replace('#', '') ? styles.active : ''}
              >
                {getNavLabel(link.key)}
              </a>
            </li>
          ))}
        </ul>

        {/* Tombol kanan: dark mode + hamburger */}
        <div className={styles.actions}>
          <button
            className={styles.themeBtn}
            onClick={() => {
              toggleDark()
              // Track theme toggle
              trackEvent(GA_EVENTS.THEME_TOGGLE, {
                new_theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark',
              })
            }}
            title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {dark ? '☀️' : '🌙'}
          </button>
          <button
            className={styles.langBtn}
            onClick={toggleLang}
            title="Ganti Bahasa / Switch Language"
          >
            {currentLang === 'id' ? '🇬🇧 EN' : '🇮🇩 ID'}
          </button>
          <button
            className={`${styles.hamburger} hamburger`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className={menuOpen ? styles.open : ''}></span>
            <span className={menuOpen ? styles.open : ''}></span>
            <span className={menuOpen ? styles.open : ''}></span>
          </button>
        </div>
      </nav>

      {/* Menu mobile (muncul ketika hamburger diklik) */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.show : ''}`}>
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
          >
            {getNavLabel(link.key)}
          </a>
        ))}
      </div>
    </>
  )
}
