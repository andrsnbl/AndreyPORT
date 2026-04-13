// ─────────────────────────────────────────────────────────────
//  Testimonial.jsx
//  Swiper carousel — auto-play, loop, pagination dots
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef } from 'react'
import { TESTIMONIALS } from '../data/portfolioData'
import { useTranslation } from 'react-i18next'
import styles from './Testimonial.module.css'

export default function Testimonial() {
  const { t } = useTranslation()
  const swiperRef = useRef(null)

  useEffect(() => {
    // Swiper harus sudah di-install: npm install swiper
    import('swiper/bundle').then(({ Swiper }) => {
      import('swiper/css/bundle')
      swiperRef.current = new Swiper('.testimonial-swiper', {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        pagination: {
          el: '.testimonial-swiper .swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.testimonial-swiper .swiper-button-next',
          prevEl: '.testimonial-swiper .swiper-button-prev',
        },
        breakpoints: {
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 2, spaceBetween: 32 },
        },
      })
    })

    return () => {
      swiperRef.current?.destroy?.(true, true)
    }
  }, [])

  return (
    <section id="testimonial" className={styles.testimonial}>

      <span className="section-tag fade-in">
        {t('testimonial.tag', { defaultValue: 'Testimonials' })}
      </span>
      <h2 className="section-title fade-in fade-in-delay-1">
        {t('testimonial.title', { defaultValue: 'My Clients' }).split(' ')[0]}{' '}
        <span>
          {t('testimonial.title', { defaultValue: 'My Clients' }).split(' ').slice(1).join(' ')}
        </span>
      </h2>
      <p className="section-sub fade-in fade-in-delay-1">
        {t('testimonial.subtitle', { defaultValue: 'What my clients say about me' })}
      </p>

      {/* ── Swiper Container ── */}
      <div className={`${styles.swiperWrap} fade-in fade-in-delay-2 testimonial-swiper swiper`}>
        <div className="swiper-wrapper">
          {TESTIMONIALS.map((item, i) => (
            <div key={item.key + i} className={`swiper-slide ${styles.slide}`}>
              <div className={styles.card}>
                <div className={styles.quote}>"</div>
                <p>{t(`testimonial.items.${item.key}.quote`, { defaultValue: '' })}</p>
                <div className={styles.author}>
                  <img
                    src={item.img}
                    alt={t(`testimonial.items.${item.key}.name`, { defaultValue: item.key })}
                    loading="lazy"
                    onError={(e) => {
                      // Fallback dengan placeholder avatar
                      e.target.style.background = '#7c3aed'
                      e.target.style.display = 'flex'
                      e.target.style.alignItems = 'center'
                      e.target.style.justifyContent = 'center'
                      e.target.textContent = '👤'
                    }}
                  />
                  <div>
                    <h6>{t(`testimonial.items.${item.key}.name`, { defaultValue: item.key })}</h6>
                    <span>{t(`testimonial.items.${item.key}.role`, { defaultValue: '' })}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigasi & Pagination */}
        <div className={`swiper-button-prev ${styles.navBtn}`} />
        <div className={`swiper-button-next ${styles.navBtn}`} />
        <div className={`swiper-pagination ${styles.pagination}`} />
      </div>

    </section>
  )
}