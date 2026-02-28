// ─────────────────────────────────────────────────────────────
//  ScrollTop.jsx
//  Tombol bulat yang muncul di pojok kanan bawah setelah
//  user scroll ke bawah. Klik → kembali ke atas halaman.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import styles from './ScrollTop.module.css'

export default function ScrollTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button
      className={`${styles.btn} ${visible ? styles.show : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  )
}
