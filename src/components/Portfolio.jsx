import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { usePortfolio } from '../hooks/useSupabase'
import { PORTFOLIO_ITEMS, PORTFOLIO_FILTERS } from '../data/portfolioData'
import styles from './Portfolio.module.css'

export default function Portfolio() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language || 'id'
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightboxImg,  setLightboxImg]  = useState(null)

  // Item yang tampil sesuai filter
  const visible =
    activeFilter === 'all'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.cat === activeFilter)

  // Label filter dari file bahasa, key dari portfolioData
  // Fallback ke label default jika t belum siap
  const getFilterLabel = (key) => {
    const label = t(`portfolio.filters.${key}`, { defaultValue: key })
    return label || key
  }

  return (
    <section id="portfolio" className={styles.portfolio}>
      <div className={styles.inner}>
        <span className="section-tag fade-in">
          {t('portfolio.tag', { defaultValue: 'My Work' })}
        </span>
        <h2 className="section-title fade-in fade-in-delay-1">
          {(t('portfolio.title', { defaultValue: 'Creative Works' })).split(' ')[0]}{' '}
          <span>
            {(t('portfolio.title', { defaultValue: 'Creative Works' })).split(' ').slice(1).join(' ')}
          </span>
        </h2>
        <p className="section-sub fade-in fade-in-delay-1">
          {t('portfolio.subtitle', { defaultValue: 'Meet my awesome works and enjoy' })}
        </p>

        {/* ── Tombol Filter — pakai PORTFOLIO_FILTERS dari data ── */}
        <div className={`${styles.filters} fade-in fade-in-delay-2`}>
          {PORTFOLIO_FILTERS.map((f) => (
            <button
              key={f.key}
              className={`${styles.filterBtn} ${activeFilter === f.key ? styles.active : ''}`}
              onClick={() => setActiveFilter(f.key)}
            >
              {getFilterLabel(f.key)}
            </button>
          ))}
        </div>

        {/* ── Grid Karya ── */}
        <div className={styles.grid}>
          {visible.map((item, i) => (
            <div
              key={`${activeFilter}-${i}`}
              className={styles.item}
              onClick={() => setLightboxImg(item.img)}
            >
              <img src={item.img} alt={item.title} loading="lazy" />
              <div className={styles.overlay}>
                <h5>{item.title}</h5>
                <span>{getFilterLabel(item.cat)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Pesan jika kategori kosong ── */}
        {visible.length === 0 && (
          <p className={styles.empty}>
            {lang === 'id'
              ? 'Tidak ada karya di kategori ini.'
              : 'No works found in this category.'}
          </p>
        )}
      </div>

      {/* ── Lightbox ── */}
      {lightboxImg && (
        <div className="lightbox" onClick={() => setLightboxImg(null)}>
          <button className="lightbox-close">✕</button>
          <img
            src={lightboxImg}
            alt="portfolio"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
