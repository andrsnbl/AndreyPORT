import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PORTFOLIO_FILTERS } from '../data/portfolioData'
import { usePortfolio } from '../hooks/usePortfolio'
import { trackEvent, GA_EVENTS } from '../hooks/useGoogleAnalytics'
import PortfolioPreviewModal from './PortfolioPreviewModal'
import styles from './Portfolio.module.css'

export default function Portfolio() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language || 'id'
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedItem, setSelectedItem] = useState(null)
  
  // Fetch portfolio dari Sanity
  const { items: portfolioItems, loading, error } = usePortfolio()

  // Item yang tampil sesuai filter
  const visible =
    activeFilter === 'all'
      ? portfolioItems
      : portfolioItems.filter((item) => item.cat === activeFilter)

  // Label filter dari file bahasa, key dari portfolioData
  // Fallback ke label default jika t belum siap
  const getFilterLabel = (key) => {
    const label = t(`portfolio.filters.${key}`, { defaultValue: key })
    return label || key
  }

  if (error) {
    console.error('Portfolio error:', error)
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
              onClick={() => {
                setActiveFilter(f.key)
                // Track portfolio filter event
                trackEvent(GA_EVENTS.PORTFOLIO_FILTER, {
                  category: f.key,
                  item_count: f.key === 'all' ? PORTFOLIO_ITEMS.length : PORTFOLIO_ITEMS.filter(i => i.cat === f.key).length,
                })
              }}
            >
              {getFilterLabel(f.key)}
            </button>
          ))}
        </div>

        {/* ── Grid Karya ── */}
        {loading ? (
          <div className={styles.loadingWrap}>
            <div className={styles.spinner}></div>
            <p>{lang === 'id' ? 'Loading portfolio...' : 'Loading portfolio...'}</p>
          </div>
        ) : visible.length > 0 ? (
          <div className={styles.grid}>
            {visible.map((item, i) => (
              <div
                key={`${activeFilter}-${item.id}`}
                className={styles.item}
                onClick={() => {
                  setSelectedItem(item)
                  // Track portfolio view
                  trackEvent(GA_EVENTS.PORTFOLIO_VIEW, {
                    title: item.title,
                    category: item.cat,
                    type: item.type,
                  })
                }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  onError={(e) => {
                    // Fallback jika image error
                    e.target.src = '/img/portfolio/001.jpg'
                    e.target.style.opacity = '0.5'
                  }}
                />
                <div className={styles.previewBadge}>
                  {item.previewType === 'iframe' && '🌐'}
                  {item.previewType === 'video' && '▶'}
                  {item.previewType === 'image' && '🖼'}
                  {item.previewType === 'gallery' && '🖼'}
                </div>
                <div className={styles.overlay}>
                  <h5>{item.title}</h5>
                  <span>{getFilterLabel(item.cat)}</span>
                  <p className={styles.typeLabel}>{item.type}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>
            {lang === 'id'
              ? 'Tidak ada karya di kategori ini.'
              : 'No works found in this category.'}
          </p>
        )}

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
      <PortfolioPreviewModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  )
}
