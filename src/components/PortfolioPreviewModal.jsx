import { useState } from 'react'
import styles from './PortfolioPreviewModal.module.css'

export default function PortfolioPreviewModal({ item, onClose }) {
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0)

  if (!item) return null

  const handleGalleryNext = () => {
    if (item.gallery && item.gallery.length > 0) {
      setCurrentGalleryIndex((prev) => (prev + 1) % item.gallery.length)
    }
  }

  const handleGalleryPrev = () => {
    if (item.gallery && item.gallery.length > 0) {
      setCurrentGalleryIndex((prev) => (prev - 1 + item.gallery.length) % item.gallery.length)
    }
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        <div className={styles.previewContainer}>
          {item.previewType === 'iframe' && (
            <iframe
              src={item.previewUrl}
              title={item.title}
              className={styles.iframe}
              frameBorder="0"
              loading="lazy"
            />
          )}

          {item.previewType === 'image' && (
            <img
              src={item.previewUrl}
              alt={item.title}
              className={styles.image}
              onError={(e) => {
                e.target.src = '/img/portfolio/001.jpg'
                e.target.style.opacity = '0.6'
              }}
            />
          )}

          {item.previewType === 'video' && (
            <iframe
              src={item.previewUrl}
              title={item.title}
              className={styles.iframe}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              loading="lazy"
            />
          )}

          {item.previewType === 'gallery' && item.gallery && item.gallery.length > 0 && (
            <div className={styles.galleryContainer}>
              <div className={styles.galleryImage}>
                <img
                  src={item.gallery[currentGalleryIndex]}
                  alt={`Gallery ${currentGalleryIndex + 1}`}
                  onError={(e) => {
                    e.target.src = '/img/portfolio/001.jpg'
                    e.target.style.opacity = '0.6'
                  }}
                />
              </div>
              {item.gallery.length > 1 && (
                <div className={styles.galleryNav}>
                  <button className={styles.galleryBtn} onClick={handleGalleryPrev}>
                    ← Prev
                  </button>
                  <span className={styles.galleryCounter}>
                    {currentGalleryIndex + 1} / {item.gallery.length}
                  </span>
                  <button className={styles.galleryBtn} onClick={handleGalleryNext}>
                    Next →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className={styles.info}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>

          {item.technologies && item.technologies.length > 0 && (
            <div className={styles.technologies}>
              <strong>Stack:</strong>
              <div className={styles.techTags}>
                {item.technologies.map((tech) => (
                  <span key={tech} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className={styles.tags}>
            <span className={styles.typeTag}>{item.type}</span>
            {item.previewUrl && item.previewType !== 'image' && item.previewType !== 'gallery' && (
              <a
                href={item.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.visitBtn}
              >
                {item.previewType === 'iframe' ? '🔗 Visit Website' : '▶ View Video'}
              </a>
            )}
            {item.externalLink && (
              <a
                href={item.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.visitBtn}
              >
                🔗 View Project
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
