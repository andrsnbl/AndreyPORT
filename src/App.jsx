import { useState, useEffect, useCallback, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar         from './components/Navbar'
import ScrollTop      from './components/ScrollTop'
import Hero           from './components/Hero'
import StructuredData from './components/StructuredData'
import useScrollAnimation from './hooks/useScrollAnimation'

// Lazy load sections
const About       = lazy(() => import('./components/About'))
const Resume      = lazy(() => import('./components/Resume'))
const Services    = lazy(() => import('./components/Services'))
const Portfolio   = lazy(() => import('./components/Portfolio'))
const Storefront  = lazy(() => import('./components/Storefront'))
const Testimonial = lazy(() => import('./components/Testimonial'))
const Blog        = lazy(() => import('./components/Blog'))
const Contact     = lazy(() => import('./components/Contact'))
const Footer      = lazy(() => import('./components/Footer'))
const AdminPage   = lazy(() => import('./pages/admin/AdminPage'))

// ─── Baca preferensi awal SEKALI saja ────────────────────────
const getSavedDark = () => {
  try {
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) return saved === 'true'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  } catch { return false }
}

// ─── Portfolio home ───────────────────────────────────────────
// Didefinisikan DI LUAR App agar referensi komponen stabil
// (tidak di-recreate tiap render App) — mencegah full unmount/remount
// saat dark mode di-toggle
function PortfolioHome({ dark, toggleDark }) {
  useScrollAnimation()

  return (
    <>
      <StructuredData />
      <Navbar dark={dark} toggleDark={toggleDark} />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <About />
          <Resume />
          <Services />
          <Portfolio />
          <Storefront />
          <Testimonial />
          <Blog />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <ScrollTop />
    </>
  )
}

// ─── Root App ─────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(getSavedDark)

  // Terapkan tema ke <html> dan simpan ke localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    try { localStorage.setItem('darkMode', String(dark)) } catch {}
  }, [dark])

  // useCallback agar referensi toggleDark stabil → tidak trigger
  // re-render pada Navbar dan PortfolioHome tiap kali App render
  const toggleDark = useCallback(() => setDark(d => !d), [])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<PortfolioHome dark={dark} toggleDark={toggleDark} />}
        />
        <Route
          path="/admin"
          element={
            <Suspense fallback={null}>
              <AdminPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
