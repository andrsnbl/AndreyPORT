// ─────────────────────────────────────────────────────────────
//  useScrollAnimation.js
//  Custom hook: tambah class "visible" ke semua elemen .fade-in
//  ketika elemen masuk ke layar (viewport).
//
//  Dipanggil di App.jsx satu kali untuk seluruh halaman.
// ─────────────────────────────────────────────────────────────

import { useEffect } from 'react'

export default function useScrollAnimation() {
  useEffect(() => {
    const activate = () => {
      const elements = document.querySelectorAll('.fade-in:not(.visible)')

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
              observer.unobserve(entry.target) // tidak perlu diobserve lagi
            }
          })
        },
        {
          threshold: 0.08,
          rootMargin: '0px 0px 0px 0px',
        }
      )

      elements.forEach((el) => observer.observe(el))
      return observer
    }

    // Jalankan sekali saat mount
    const observer = activate()

    // Jalankan ulang setelah sedikit delay untuk memastikan
    // semua komponen React sudah selesai render ke DOM
    const timer = setTimeout(() => {
      observer.disconnect()
      activate()
    }, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, []) // [] = hanya jalan sekali saat App pertama mount
}
