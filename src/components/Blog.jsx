// ─────────────────────────────────────────────────────────────
//  Blog.jsx
//  Section blog: 3 kartu artikel + modal popup konten penuh
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import { BLOG_POSTS } from '../data/portfolioData'
import styles from './Blog.module.css'

export default function Blog() {
  // Post yang sedang dibuka di modal (null = tutup)
  const [openPost, setOpenPost] = useState(null)

  return (
    <section id="blog" className={styles.blog}>
      <div className={styles.inner}>

        <span className="section-tag fade-in">Blog</span>
        <h2 className={`section-title fade-in fade-in-delay-1`}>Latest <span>News</span></h2>
        <p className={`section-sub fade-in fade-in-delay-1`}>Check out my latest blog posts</p>

        {/* Grid kartu blog */}
        <div className={styles.grid}>
          {BLOG_POSTS.map((post, i) => (
            <div key={post.title} className={`${styles.card} fade-in fade-in-delay-${i + 1}`}>
              <img src={post.img} alt={post.title} loading="lazy" />
              <div className={styles.body}>
                <div className={styles.meta}>by Andrey</div>
                <h5>
                  <button onClick={() => setOpenPost(post)}>
                    {post.title}
                  </button>
                </h5>
                <p>{post.excerpt}</p>
                <button className={styles.readMore} onClick={() => setOpenPost(post)}>
                  Read More →
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
            <span className="section-tag">Blog Post</span>
            <h4 className={styles.modalTitle}>{openPost.title}</h4>
            <div className={styles.modalMeta}>by Andrey</div>
            <img src={openPost.img} alt={openPost.title} className={styles.modalImg} />
            <p className={styles.modalContent}>{openPost.content}</p>
          </div>
        </div>
      )}
    </section>
  )
}
