// ─────────────────────────────────────────────────────────────
//  LangContext.jsx
//
//  Menyimpan bahasa yang aktif (ID atau EN) secara global.
//  Komponen mana pun bisa membaca bahasa aktif tanpa perlu
//  passing props dari parent ke child secara manual.
//
//  Cara pakai di komponen lain:
//    import { useLang } from '../context/LangContext'
//    const { t, lang, toggleLang } = useLang()
//    → t = teks sesuai bahasa aktif
//    → lang = 'id' atau 'en'
//    → toggleLang() = ganti bahasa
// ─────────────────────────────────────────────────────────────

import { createContext, useContext, useState } from 'react'
import id from '../lang/id'
import en from '../lang/en'

// Daftar terjemahan
const translations = { id, en }

// Buat Context (wadah global)
const LangContext = createContext(null)

// Provider — bungkus seluruh App dengan ini supaya semua komponen bisa akses
export function LangProvider({ children }) {
  // Cek apakah user pernah pilih bahasa sebelumnya (tersimpan di localStorage)
  const saved = localStorage.getItem('lang') || 'id'
  const [lang, setLang] = useState(saved)

  // Ambil objek teks sesuai bahasa aktif
  const t = translations[lang]

  // Fungsi ganti bahasa
  const toggleLang = () => {
    const next = lang === 'id' ? 'en' : 'id'
    setLang(next)
    localStorage.setItem('lang', next) // simpan pilihan user
  }

  return (
    <LangContext.Provider value={{ t, lang, toggleLang }}>
      {children}
    </LangContext.Provider>
  )
}

// Hook shortcut — supaya komponen cukup tulis useLang() bukan useContext(LangContext)
export function useLang() {
  return useContext(LangContext)
}
