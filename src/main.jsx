import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'
import './i18n'

// Initialize Google Analytics (simple initialization without hook)
const initGA = () => {
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID
  if (!gaId) {
    console.info('[GA4] Measurement ID not configured. Analytics disabled.')
    return
  }

  const script1 = document.createElement('script')
  script1.async = true
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
  document.head.appendChild(script1)

  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', gaId, { send_page_view: true })
}

// Initialize GA before rendering
initGA()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)


