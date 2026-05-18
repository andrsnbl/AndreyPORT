import { useState, useEffect, lazy, Suspense } from 'react'
import Navbar    from './components/Navbar'
import ScrollTop from './components/ScrollTop'
import Hero      from './components/Hero'
import useScrollAnimation from './hooks/useScrollAnimation'
import StructuredData from './components/StructuredData'

// Lazy load semua section kecuali Hero (above the fold)
const About       = lazy(() => import('./components/About'))
const Resume      = lazy(() => import('./components/Resume'))
const Services    = lazy(() => import('./components/Services'))
const Portfolio   = lazy(() => import('./components/Portfolio'))
const Storefront  = lazy(() => import('./components/Storefront'))
const Testimonial = lazy(() => import('./components/Testimonial'))
const Blog        = lazy(() => import('./components/Blog'))
const Contact     = lazy(() => import('./components/Contact'))
const Footer      = lazy(() => import('./components/Footer'))

const getSavedDark = () => {
  try {
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) return saved === 'true'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  } catch { return false }
}

export default function App() {
  const [dark, setDark] = useState(getSavedDark)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    try { localStorage.setItem('darkMode', String(dark)) } catch {}
  }, [dark])

  useScrollAnimation()

  return (
    <>
      <StructuredData />
      <Navbar dark={dark} toggleDark={() => setDark((d) => !d)} />
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
