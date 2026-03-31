// ─────────────────────────────────────────────────────────────
//  src/pages/admin/AdminDashboard.jsx
//  Admin panel untuk manage submissions & blog
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import SubmissionsPage from './SubmissionsPage'
import BlogManagementPage from './BlogManagementPage'
import styles from './AdminDashboard.module.css'

export default function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(true)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <div className={styles.adminContainer}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
        <div className={styles.logo}>
          <h2>Admin Panel</h2>
        </div>

        <nav className={styles.nav}>
          <Link
            to="/admin/submissions"
            className={`${styles.navItem} ${isActive('/admin/submissions') ? styles.active : ''}`}
          >
            📧 Submissions
          </Link>
          <Link
            to="/admin/blog"
            className={`${styles.navItem} ${isActive('/admin/blog') ? styles.active : ''}`}
          >
            📝 Blog Management
          </Link>
        </nav>

        <button
          className={styles.toggleBtn}
          onClick={() => setIsOpen(!isOpen)}
          title="Toggle sidebar"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>Portfolio Admin Dashboard</h1>
          <p>Manage form submissions and blog posts</p>
        </header>

        <Routes>
          <Route path="submissions" element={<SubmissionsPage />} />
          <Route path="blog" element={<BlogManagementPage />} />
          <Route
            path="/"
            element={
              <div className={styles.welcome}>
                <h2>Welcome to Admin Panel</h2>
                <p>Select a menu item to get started</p>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  )
}
