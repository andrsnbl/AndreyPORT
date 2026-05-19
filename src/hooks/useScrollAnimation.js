import { useEffect } from 'react'

export default function useScrollAnimation() {
  useEffect(() => {
    // ── Tandai elemen yang sudah terlihat saat pertama load ──
    const markVisible = () => {
      document.querySelectorAll('.fade-in:not(.visible)').forEach(el => {
        const r = el.getBoundingClientRect()
        if (r.top < window.innerHeight && r.bottom > 0) {
          el.classList.add('visible')
        }
      })
    }

    // ── Observer untuk elemen .fade-in yang masuk viewport ──
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            fadeObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )

    const observeFadeIns = () => {
      document.querySelectorAll('.fade-in:not(.visible)').forEach(el => {
        fadeObserver.observe(el)
      })
    }

    // ── Observer untuk animasi enter per-section ──
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('section-entering')
            void entry.target.offsetWidth // force reflow
            entry.target.classList.add('section-entering')
          } else {
            entry.target.classList.remove('section-entering')
          }
        })
      },
      { threshold: 0.35, rootMargin: '-10% 0px -20% 0px' }
    )

    // Jalankan segera
    markVisible()
    observeFadeIns()
    document.querySelectorAll('main section[id]').forEach(s => sectionObserver.observe(s))

    // Jalankan ulang setelah lazy components selesai render
    const timer = setTimeout(() => {
      markVisible()
      observeFadeIns()
    }, 300)

    return () => {
      clearTimeout(timer)
      fadeObserver.disconnect()
      sectionObserver.disconnect()
    }
  }, [])
}
