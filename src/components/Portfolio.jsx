// ─────────────────────────────────────────────────────────────
//  Portfolio.jsx
//  Section portfolio: filter karya + grid gambar + lightbox
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import { PORTFOLIO_ITEMS, PORTFOLIO_FILTERS } from '../data/portfolioData'
import styles from './Portfolio.module.css'

export default function Portfolio() {
  // Kategori yang dipilih untuk filter
  const [activeFilter, setActiveFilter] = useState('all')
  // URL gambar yang sedang dibuka di lightbox (null = tutup)
  const [lightboxImg, setLightboxImg] = useState(null)

  // Saring item sesuai filter aktif
  const visibleItems =
    activeFilter === 'all'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.cat === activeFilter)

  return (
    <section id="portfolio" className={styles.portfolio}>
      <div className={styles.inner}>

        <span className="section-tag fade-in">My Work</span>
        <h2 className={`section-title fade-in fade-in-delay-1`}>Creative <span>Works</span></h2>
        <p className={`section-sub fade-in fade-in-delay-1`}>Meet my awesome works and enjoy</p>

        {/* Tombol filter */}
        <div className={`${styles.filters} fade-in fade-in-delay-2`}>
          {PORTFOLIO_FILTERS.map((f) => (
            <button
              key={f.key}
              className={`${styles.filterBtn} ${activeFilter === f.key ? styles.active : ''}`}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid gambar */}
        <div className={styles.grid}>
          {visibleItems.map((item, i) => (
            <div
              key={item.img + i}
              className={`${styles.item} fade-in`}
              onClick={() => setLightboxImg(item.img)}
            >
              <img src={item.img} alt={item.title} loading="lazy" />
              {/* Overlay muncul saat hover */}
              <div className={styles.overlay}>
                <h5>{item.title}</h5>
                <span>{PORTFOLIO_FILTERS.find((f) => f.key === item.cat)?.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox — klik di luar gambar untuk tutup */}
      {lightboxImg && (
        <div className="lightbox" onClick={() => setLightboxImg(null)}>
          <button className="lightbox-close">✕</button>
          <img
            src={lightboxImg}
            alt="Portfolio item"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
