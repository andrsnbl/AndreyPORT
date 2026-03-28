// ─────────────────────────────────────────────────────────
//  useGoogleAnalytics.js
//  Hook untuk integrate Google Analytics 4 (GA4)
//  Track user interactions dan page views
// ─────────────────────────────────────────────────────────

import { useEffect } from 'react'

/**
 * Initialize Google Analytics dan track page views
 * @param {string} measurementId - GA4 Measurement ID (G-XXXXXXX)
 */
export function useGoogleAnalytics(measurementId) {
  useEffect(() => {
    if (!measurementId) {
      console.warn('[GA4] Missing measurement ID. Set VITE_GA_MEASUREMENT_ID in .env')
      return
    }

    // Load GA4 script
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(script1)

    // Initialize gtag
    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag = gtag
    gtag('js', new Date())
    gtag('config', measurementId, {
      page_path: window.location.pathname,
      send_page_view: true,
    })

  }, [measurementId])
}

/**
 * Track custom event
 * @param {string} eventName - Event name
 * @param {Object} eventParams - Event parameters
 */
export function trackEvent(eventName, eventParams = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams)
  }
}

/**
 * Track page view
 * @param {string} pagePath - Page path
 * @param {string} pageTitle - Page title
 */
export function trackPageView(pagePath, pageTitle) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle,
    })
  }
}

// Export untuk digunakan di components
export const GA_EVENTS = {
  CV_DOWNLOAD: 'cv_download',
  PORTFOLIO_FILTER: 'portfolio_filter',
  PORTFOLIO_VIEW: 'portfolio_view',
  BLOG_READ: 'blog_read',
  CONTACT_SUBMIT: 'contact_submit',
  LINK_CLICK: 'link_click',
  THEME_TOGGLE: 'theme_toggle',
  LANGUAGE_CHANGE: 'language_change',
}
