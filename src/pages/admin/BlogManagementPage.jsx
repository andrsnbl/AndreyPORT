// ─────────────────────────────────────────────────────────────
//  src/pages/admin/BlogManagementPage.jsx
//  Manage blog posts dari Sanity.io
// ─────────────────────────────────────────────────────────────

import styles from './AdminDashboard.module.css'

export default function BlogManagementPage() {
  const sanityProjectId = import.meta.env.VITE_SANITY_PROJECT_ID
  const sanityDataset = import.meta.env.VITE_SANITY_DATASET || 'production'

  const studioUrl = `https://${sanityProjectId}.sanity.studio`

  return (
    <div className={styles.page}>
      <h2>Blog Management</h2>

      <div className={styles.info}>
        <p>
          Blog posts dikelola melalui <strong>Sanity Studio</strong>.
        </p>
        <p>Klik tombol di bawah untuk membuka Sanity Studio dan manage blog posts Anda.</p>
      </div>

      <a
        href={studioUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.btn} ${styles.primary}`}
      >
        🔗 Open Sanity Studio
      </a>

      <div className={styles.sanityInfo}>
        <h3>Sanity Configuration</h3>
        <ul>
          <li>
            <strong>Project ID:</strong> {sanityProjectId || 'Not configured'}
          </li>
          <li>
            <strong>Dataset:</strong> {sanityDataset}
          </li>
          <li>
            <strong>Studio URL:</strong> {studioUrl}
          </li>
        </ul>
      </div>

      <div className={styles.sanityGuide}>
        <h3>Quick Guide</h3>
        <ol>
          <li>Klik tombol "Open Sanity Studio" di atas</li>
          <li>Login dengan akun Sanity Anda</li>
          <li>Navigate ke "Posts" untuk membuat/edit blog posts</li>
          <li>Semua perubahan otomatis sync ke website</li>
        </ol>
      </div>
    </div>
  )
}
