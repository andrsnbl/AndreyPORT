// ─────────────────────────────────────────────────────────────
//  Blog.jsx
//  Section blog: 3 kartu artikel + modal popup konten penuh
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import { BLOG_POSTS } from '../data/portfolioData'
import { useTranslation } from 'react-i18next'
import styles from './Blog.module.css'

export default function Blog() {
  const { t } = useTranslation()
  // Post yang sedang dibuka di modal (null = tutup)
  const [openPost, setOpenPost] = useState(null)

  return (
    <section id="blog" className={styles.blog}>
      <div className={styles.inner}>

        <span className="section-tag fade-in">{t('blog.tag', { defaultValue: 'Blog' })}</span>
        <h2 className={`section-title fade-in fade-in-delay-1`}>{t('blog.title', { defaultValue: 'Latest News' }).split(' ')[0]} <span>{t('blog.title', { defaultValue: 'Latest News' }).split(' ').slice(1).join(' ')}</span></h2>
        <p className={`section-sub fade-in fade-in-delay-1`}>{t('blog.subtitle', { defaultValue: 'Check out my latest blog posts' })}</p>

        {/* Grid kartu blog */}
        <div className={styles.grid}>
          {BLOG_POSTS.map((post, i) => (
            <div key={post.key} className={`${styles.card} fade-in fade-in-delay-${i + 1}`}>
              <img src={post.img} alt={t(`blog.posts.${post.key}.title`, { defaultValue: post.key })} loading="lazy" />
              <div className={styles.body}>
                <div className={styles.meta}>{t('blog.by', { defaultValue: 'by Andrey' })}</div>
                <h5>
                  <button onClick={() => setOpenPost(post)}>
                    {t(`blog.posts.${post.key}.title`, { defaultValue: post.key })}
                  </button>
                </h5>
                <p>{t(`blog.posts.${post.key}.excerpt`, { defaultValue: '' })}</p>
                <button className={styles.readMore} onClick={() => setOpenPost(post)}>
                  {t('blog.readMore', { defaultValue: 'Read More →' })}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal artikel */}
      {openPost && (
        <div className="modal-overlay" onClick={() => setOpenPost(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setOpenPost(null)}>✕</button>
            <span className="section-tag">{t('blog.label', { defaultValue: 'Blog Post' })}</span>
            <h4 className={styles.modalTitle}>{t(`blog.posts.${openPost.key}.title`, { defaultValue: openPost.key })}</h4>
            <div className={styles.modalMeta}>{t('blog.by', { defaultValue: 'by Andrey' })}</div>
            <img src={openPost.img} alt={t(`blog.posts.${openPost.key}.title`, { defaultValue: openPost.key })} className={styles.modalImg} />
            <p className={styles.modalContent}>{t(`blog.posts.${openPost.key}.content`, { defaultValue: '' })}</p>
          </div>
        </div>
      )}
    </section>
  )
}
