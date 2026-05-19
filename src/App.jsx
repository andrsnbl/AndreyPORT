import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar    from './components/Navbar'
import ScrollTop from './components/ScrollTop'
import Hero      from './components/Hero'
import useScrollAnimation from './hooks/useScrollAnimation'
import StructuredData from './components/StructuredData'

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

const getSavedDark = () => {
  try {
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) return saved === 'true'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  } catch { return false }
}

// PortfolioHome di-memoize agar tidak re-render karena prop dark berubah
// saat App re-render — mencegah useScrollAnimation jalan berulang
function PortfolioHome({ dark, toggleDark }) {
  useScrollAnimation()

  return (
    <>
      <StructuredData />
      <Navbar dark={dark} toggleDark={toggleDark} />
      <main>
        <Hero />
        <Suspense fallback={<div style={{ minHeight: '100px' }} />}>
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

export default function App() {
  const [dark, setDark] = useState(getSavedDark)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    try { localStorage.setItem('darkMode', String(dark)) } catch {}
  }, [dark])

  // toggleDark dibuat stabil dengan useCallback tidak perlu — cukup
  // definisikan di luar render agar referensi tidak berubah tiap render
  const toggleDark = () => setDark(d => !d)

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
