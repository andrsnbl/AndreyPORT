// ─────────────────────────────────────────────────────────────
//  Footer.jsx
//  Footer sederhana di bagian paling bawah halaman
// ─────────────────────────────────────────────────────────────

import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <p>
        © {year} <span className={styles.accent}>Andrey Julius</span>. Built with React. All rights reserved.
      </p>
      <p className={styles.sub}>
        Medan, North Sumatera, Indonesia —{' '}
        <a href="mailto:andreyulius@gmail.com">andreyulius@gmail.com</a>
      </p>
    </footer>
  )
}
