// src/pages/admin/AdminPage.jsx
// Protected page — tampil login jika belum auth, panel jika sudah
import { useState } from 'react'
import { useAdminAuth } from '../../hooks/useAdminAuth'
import AdminPanel from './AdminPanel'
import styles from './AdminPage.module.css'

export default function AdminPage() {
  const { isAdmin, loading, login } = useAdminAuth()
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]     = useState('')
  const [busy, setBusy]       = useState(false)

  if (loading) return <div className={styles.center}>Memuat...</div>
  if (isAdmin) return <AdminPanel />

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await login(email, password)
    } catch (err) {
      setError(err.message === 'Invalid login credentials'
        ? 'Email atau password salah'
        : err.message)
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
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="andreyulius8@gmail.com" required autoFocus />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" required />
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
