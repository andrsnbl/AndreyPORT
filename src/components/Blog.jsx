// ─────────────────────────────────────────────────────────────
//  Blog.jsx
//  Section blog: Tampilkan posts dari Sanity CMS
//  Fallback ke localhost data jika Sanity tidak configured
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react'
import { BLOG_POSTS } from '../data/portfolioData'
import { useAllBlogPosts } from '../hooks/useBlog'
import { urlFor } from '../lib/sanity'
import { useTranslation } from 'react-i18next'
import styles from './Blog.module.css'

export default function Blog() {
  const { t } = useTranslation()
  const [openPost, setOpenPost] = useState(null)

  const { posts: sanityPosts, loading, error } = useAllBlogPosts()

  // Debug logging
  useEffect(() => {
    if (sanityPosts && sanityPosts.length > 0) {
      console.log('[Blog Debug] Sanity posts loaded:', sanityPosts.length)
      console.log('[Blog Debug] First post:', sanityPosts[0])
    }
    if (error) {
      console.warn('[Blog Debug] Error loading posts:', error)
    }
  }, [sanityPosts, error])

  // Check if Sanity is configured and has posts
  const isFromSanity = Array.isArray(sanityPosts) && sanityPosts.length > 0 && !error

  const displayPosts = isFromSanity
    ? sanityPosts.slice(0, 3).map((post) => {
        // ── Image URL ─────────────────────────────────────────
        let imgUrl = '/img/placeholder.jpg'
        if (post.mainImage) {
          try {
            const builder = urlFor(post.mainImage)
            if (builder && typeof builder.width === 'function') {
              const url = builder.width(400).height(250).url()
              if (url) imgUrl = url
            }
          } catch (err) {
            console.warn('[Blog] Image URL build error:', err.message)
          }
        }

        // ── Text content — fallback chain jika excerpt null ───
        const bodyText = post.body ? formatPortableText(post.body) : ''
        const excerptText =
          post.excerpt ||
          (bodyText ? bodyText.slice(0, 150).trimEnd() + '...' : null) ||
          post.title ||
          'No excerpt available.'
        const contentText = bodyText || post.excerpt || 'No content available.'

        return {
          _id: post._id,
          title: post.title || 'No Title',
          excerpt: excerptText,
          img: imgUrl,
          content: contentText,
          slug: post.slug?.current,
          isSanity: true,
        }
      })
    : BLOG_POSTS.slice(0, 3).map((post) => ({
        ...post,
        title: post.title || post.key || 'Blog Post',
        excerpt: post.excerpt || '',
        content: post.content || '',
        img: post.img || '/img/placeholder.jpg',
      }))

  // FIX UTAMA: Re-trigger scroll animation setelah posts selesai dirender ke DOM
  // Masalah: useScrollAnimation di App.jsx jalan sekali saat mount, tapi kartu
  // blog belum ada di DOM karena Sanity masih loading async.
  // Solusi: setelah loading selesai & displayPosts ada, jalankan ulang observer.
  useEffect(() => {
    if (loading) return
    if (displayPosts.length === 0) return

    // Tunggu satu frame agar React selesai commit DOM
    const rafId = requestAnimationFrame(() => {
      const elements = document.querySelectorAll('.fade-in:not(.visible)')
      if (elements.length === 0) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.08 }
      )

      elements.forEach((el) => observer.observe(el))

      // Cleanup observer saat komponen unmount
      return () => observer.disconnect()
    })

    return () => cancelAnimationFrame(rafId)
  }, [loading, displayPosts.length])

  // Tutup modal dengan Escape
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape' && openPost) setOpenPost(null)
    },
    [openPost]
  )
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <section id="blog" className={styles.blog}>
      <div className={styles.inner}>
        <span className="section-tag fade-in">{t('blog.tag', { defaultValue: 'Blog' })}</span>
        <h2 className="section-title fade-in fade-in-delay-1">
          {t('blog.titleWord1', { defaultValue: 'Latest' })}
          <span>{t('blog.titleWord2', { defaultValue: 'News' })}</span>
        </h2>
        <p className="section-sub fade-in fade-in-delay-1">
          {t('blog.subtitle', { defaultValue: 'Check out my latest blog posts' })}
        </p>

        {/* Loading state */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            <p>Loading blog posts...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#f85149' }}>
            <p>⚠️ Error loading blog posts: {error}</p>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Displaying demo posts instead</p>
          </div>
        )}

        {/* Grid kartu blog */}
        {!loading && (
          <div className={styles.grid}>
            {displayPosts.map((post, i) => (
              <div
                key={post._id || post.key}
                className={`${styles.card} fade-in fade-in-delay-${i + 1}`}
              >
                <img
                  src={post.img}
                  alt={post.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = '/img/placeholder.jpg'
                    e.currentTarget.onerror = null
                  }}
                />
                <div className={styles.body}>
                  <div className={styles.meta}>
                    {t('blog.by', { defaultValue: 'by Andrey' })}
                  </div>
                  <h5>
                    <button onClick={() => setOpenPost(post)}>{post.title}</button>
                  </h5>
                  <p>{post.excerpt}</p>
                  <button className={styles.readMore} onClick={() => setOpenPost(post)}>
                    {t('blog.readMore', { defaultValue: 'Read More →' })}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}


      </div>

      {/* Modal artikel */}
      {openPost && (
        <div className="modal-overlay" onClick={() => setOpenPost(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setOpenPost(null)}>✕</button>
            <span className="section-tag">{t('blog.label', { defaultValue: 'Blog Post' })}</span>
            <h4 className={styles.modalTitle}>{openPost.title}</h4>
            <div className={styles.modalMeta}>{t('blog.by', { defaultValue: 'by Andrey' })}</div>
            <img
              src={openPost.img}
              alt={openPost.title}
              className={styles.modalImg}
              onError={(e) => {
                e.currentTarget.src = '/img/placeholder.jpg'
                e.currentTarget.onerror = null
              }}
            />
            <p className={styles.modalContent}>{openPost.content}</p>
          </div>
        </div>
      )}
    </section>
  )
}

// Helper: Format Portable Text ke plain text
function formatPortableText(blocks) {
  if (!blocks || !Array.isArray(blocks)) return ''

  return blocks
    .map((block) => {
      if (block._type === 'block') {
        return block.children?.map((child) => child.text).join('') || ''
      }
      if (block._type === 'image') return '[Image]'
      if (block._type === 'code') return block.code || '[Code Block]'
      return `[${block._type || 'Unknown block'}]`
    })
    .filter(Boolean)
    .join('\n\n')
}