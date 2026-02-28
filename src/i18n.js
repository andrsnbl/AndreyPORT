// src/i18n.js
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import id from './locales/id.json'
import en from './locales/en.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      id: { translation: id },
      en: { translation: en },
    },
    lng: localStorage.getItem('lang') || 'id', // bahasa default: Indonesia
    fallbackLng: 'en',                          // fallback jika teks tidak ditemukan
    interpolation: {
      escapeValue: false, // React sudah handle XSS
    },
  })

export default i18n
