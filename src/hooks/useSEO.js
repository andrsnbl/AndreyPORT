// ─────────────────────────────────────────────────────────
//  useSEO.js
//  Hook untuk manage dynamic SEO meta tags dan og:tags
// ─────────────────────────────────────────────────────────

import { useEffect } from 'react'

/**
 * Hook untuk set SEO meta tags
 * @param {Object} data - SEO metadata
 */
export function useSEO(data = {}) {
  const {
    title = 'Andrey Julius — Portfolio',
    description = 'UI Designer, Web Designer & Developer from Medan, Indonesia',
    keywords = 'portfolio, designer, developer, react, web',
    image = 'https://yoursite.com/og-image.jpg',
    url = typeof window !== 'undefined' ? window.location.href : '',
    author = 'Andrey Julius',
    type = 'website',
  } = data

  useEffect(() => {
    // Update title
    document.title = title

    // Function to update or create meta tag
    const setMetaTag = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`) ||
                document.querySelector(`meta[property="${name}"]`)

      if (!tag) {
        tag = document.createElement('meta')
        const attrName = name.includes(':') ? 'property' : 'name'
        tag.setAttribute(attrName, name)
        document.head.appendChild(tag)
      }
      tag.content = content
    }

    // Standard meta tags
    setMetaTag('description', description)
    setMetaTag('keywords', keywords)
    setMetaTag('author', author)
    setMetaTag('viewport', 'width=device-width, initial-scale=1.0')

    // Open Graph tags (untuk social media sharing)
    setMetaTag('og:title', title)
    setMetaTag('og:description', description)
    setMetaTag('og:image', image)
    setMetaTag('og:url', url)
    setMetaTag('og:type', type)
    setMetaTag('og:site_name', 'Andrey Julius Portfolio')

    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image')
    setMetaTag('twitter:title', title)
    setMetaTag('twitter:description', description)
    setMetaTag('twitter:image', image)
    setMetaTag('twitter:creator', '@andreyulius8')

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

  }, [title, description, keywords, image, url, author, type])
}

// Default SEO data per section
export const SEO_DATA = {
  home: {
    title: 'Andrey Julius — UI Designer & Web Developer',
    description: 'Passionate UI Designer and Web Developer from Medan, Indonesia. 25+ projects completed, 27+ happy clients.',
    keywords: 'ui designer, web developer, portfolio, react, web design, indonesia',
  },
  about: {
    title: 'About Andrey Julius — Designer & Developer',
    description: 'Learn more about Andrey Julius, a UI designer and web developer with 2+ years of experience.',
  },
  portfolio: {
    title: 'Portfolio — My Design & Development Works',
    description: 'Explore my creative works including web design, mobile design, graphic design, and web development projects.',
  },
  contact: {
    title: 'Contact Andrey Julius — Let\'s Work Together',
    description: 'Get in touch with me for your next project. Available for freelance and contract work.',
  },
  blog: {
    title: 'Blog — Design & Development Tips',
    description: 'Read articles about web design, development, and design best practices.',
  },
}
