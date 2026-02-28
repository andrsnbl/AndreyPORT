// ─────────────────────────────────────────────────────────────
//  useTyped.js
//  Custom hook: menampilkan efek ketik & hapus teks otomatis.
//  Dipakai di komponen Hero.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'

export default function useTyped(words, speed = 100) {
  const [display,  setDisplay]  = useState('')
  const [wordIdx,  setWordIdx]  = useState(0)
  const [charIdx,  setCharIdx]  = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIdx]

    // Tentukan jeda sebelum aksi berikutnya
    let delay = speed
    if (deleting)                         delay = 50    // hapus lebih cepat
    if (!deleting && charIdx === currentWord.length) delay = 2000 // jeda sebelum dihapus

    const timer = setTimeout(() => {
      if (!deleting && charIdx < currentWord.length) {
        // Ketik satu karakter
        setDisplay(currentWord.slice(0, charIdx + 1))
        setCharIdx((c) => c + 1)

      } else if (!deleting && charIdx === currentWord.length) {
        // Selesai mengetik → mulai hapus
        setDeleting(true)

      } else if (deleting && charIdx > 0) {
        // Hapus satu karakter
        setDisplay(currentWord.slice(0, charIdx - 1))
        setCharIdx((c) => c - 1)

      } else {
        // Selesai menghapus → pindah ke kata berikutnya
        setDeleting(false)
        setWordIdx((i) => (i + 1) % words.length)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [charIdx, deleting, wordIdx, words, speed])

  return display
}
