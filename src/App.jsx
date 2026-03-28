import { useState, useEffect } from 'react'

// Komponen layout
import Navbar    from './components/Navbar'
import ScrollTop from './components/ScrollTop'
import ErrorBoundary from './components/ErrorBoundary'
import StructuredData from './components/StructuredData'

// Komponen section (satu file per section)
import Hero        from './components/Hero'
import About       from './components/About'
import Resume      from './components/Resume'
import Services    from './components/Services'
import Portfolio   from './components/Portfolio'
import Testimonial from './components/Testimonial'
import Blog        from './components/Blog'
import Contact     from './components/Contact'
import Footer      from './components/Footer'

// Hooks
import useScrollAnimation from './hooks/useScrollAnimation'
import { useSEO, SEO_DATA } from './hooks/useSEO'

export default function App() {
  const [dark, setDark] = useState(false)

  // Set default SEO tags untuk home page
  useSEO(SEO_DATA.home)

  // Terapkan tema ke <html data-theme="...">
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  // Aktifkan animasi fade-in untuk seluruh halaman
  useScrollAnimation()

  return (
    <ErrorBoundary>
      <StructuredData />
      <Navbar dark={dark} toggleDark={() => setDark((d) => !d)} />

      <main>
        <Hero />
        <About />
        <Resume />
        <Services />
        <Portfolio />
        <Testimonial />
        <Blog />
        <Contact />
      </main>

      <Footer />
      <ScrollTop />
    </ErrorBoundary>
  )
}
