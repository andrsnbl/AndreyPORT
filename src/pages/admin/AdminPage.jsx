// src/pages/admin/AdminPage.jsx
import { useState } from 'react'
import { useAdminAuth } from '../../hooks/useAdminAuth'
import AdminPanel from './AdminPanel'
import styles from './AdminPage.module.css'

export default function AdminPage() {
  const { isAdmin, loading, login, session } = useAdminAuth()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [busy, setBusy]         = useState(false)

  // Masih load session
  if (loading) return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className={styles.logo}>⚙️</div>
        <p className={styles.loginSub}>Memeriksa sesi...</p>
      </div>
    </div>
  )

  // Sudah login dan email cocok → tampil panel
  if (isAdmin) return <AdminPanel />

  // Sudah login tapi email TIDAK cocok → tolak akses
  if (session && !isAdmin) return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className={styles.logo}>🚫</div>
        <h1 className={styles.loginTitle}>Akses Ditolak</h1>
        <p className={styles.loginSub}>
          Akun <strong>{session.user.email}</strong> tidak memiliki hak admin.
        </p>
        <p className={styles.backLink} style={{ marginTop: '1.5rem' }}>
          <a href="/">← Kembali ke portfolio</a>
        </p>
      </div>
    </div>
  )

  // Belum login → form login
  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await login(email, password)
      // isAdmin akan update otomatis via onAuthStateChange
    } catch (err) {
      const msg = err.message
      if (msg === 'Invalid login credentials')
        setError('Email atau password salah')
      else if (msg === 'Email not confirmed')
        setError('Email belum dikonfirmasi — cek inbox kamu')
      else if (msg === 'Supabase tidak tersedia')
        setError('Konfigurasi server tidak lengkap. Hubungi administrator.')
      else
        setError(msg)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className={styles.logo}>⚙️</div>
        <h1 className={styles.loginTitle}>Admin Login</h1>
        <p className={styles.loginSub}>Portfolio Dashboard</p>

        <form onSubmit={handleLogin} className={styles.loginForm}>
          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@email.com"
              required
              autoFocus
              autoComplete="email"
            />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          {error && <p className={styles.error}>✕ {error}</p>}

          <button type="submit" className={styles.btnLogin} disabled={busy}>
            {busy ? 'Masuk...' : 'Masuk →'}
          </button>
        </form>

        <p className={styles.backLink}>
          <a href="/">← Kembali ke portfolio</a>
        </p>
      </div>
    </div>
  )
}
