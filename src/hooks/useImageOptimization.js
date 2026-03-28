// ─────────────────────────────────────────────────────────
//  useImageOptimization.js
//  Hook untuk lazy load dan optimize images
//  Lazy load + blur placeholder + format negotiation
// ─────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react'

/**
 * Hook untuk image lazy loading dengan intersection observer
 * @param {Object} options - Configuration
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {string} options.rootMargin - Margin area around root
 * @returns {Object} - { ref, isVisible, imageProps }
 */
export function useImageLazyLoad(options = {}) {
  const { threshold = 0.1, rootMargin = '50px' } = options
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { ref, isVisible }
}

/**
 * Generate blur placeholder (tiny base64 version)
 * Use dengan blurDataURL prop
 */
export const generateBlurUrl = (width = 10, height = 10, color = '#cccccc') => {
  const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : null
  if (!canvas) return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Crect fill='${encodeURIComponent(color)}' width='${width}' height='${height}'/%3E%3C/svg%3E`

  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = color
  ctx.fillRect(0, 0, width, height)
  return canvas.toDataURL()
}
