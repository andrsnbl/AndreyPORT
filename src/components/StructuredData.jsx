// ─────────────────────────────────────────────────────────
//  StructuredData.jsx
//  JSON-LD structured data untuk SEO
//  Help search engines understand your content
// ─────────────────────────────────────────────────────────

import { useEffect } from 'react'

export function StructuredData() {
  useEffect(() => {
    // Person schema - untuk profile information
    const personSchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Andrey Julius',
      url: 'https://andreyulius.com',
      image: 'https://andreyulius.com/img/judul.png',
      description: 'UI Designer, Web Designer & Developer from Medan, Indonesia',
      jobTitle: ['UI Designer', 'Web Designer', 'Web Developer'],
      worksFor: {
        '@type': 'Organization',
        name: 'Freelance',
      },
      sameAs: [
        'https://www.instagram.com/andreyulius8',
        'https://github.com/ucoktebas00',
        'https://www.linkedin.com/in/andreysinambela',
      ],
      location: {
        '@type': 'Place',
        name: 'Medan, North Sumatera, Indonesia',
      },
      skills: [
        'UI Design',
        'Web Design',
        'Web Development',
        'HTML/CSS',
        'JavaScript',
        'React',
        'Python',
        'PHP',
      ],
      knowsAbout: [
        'Web Design',
        'Graphic Design',
        'Mobile Design',
        'UX/UI Design',
        'Web Development',
      ],
    }

    // Portfolio service schema
    const portfolioSchema = {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: 'Andrey Julius Portfolio',
      url: 'https://andreyulius.com',
      image: 'https://andreyulius.com/img/judul.png',
      creator: {
        '@type': 'Person',
        name: 'Andrey Julius',
      },
      about: 'Portfolio showcasing web design, mobile design, graphic design and web development projects',
      keywords: 'portfolio, designer, developer, web design, graphic design',
    }

    // Organization schema
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Andrey Julius',
      description: 'UI Designer & Web Developer',
      url: 'https://andreyulius.com',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+62-812-1100-XXXX',
        contactType: 'Customer Service',
        email: 'andreyulius8@gmail.com',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Medan',
        addressLocality: 'Medan',
        addressRegion: 'North Sumatera',
        addressCountry: 'ID',
      },
      sameAs: [
        'https://www.instagram.com/andreyulius8',
        'https://github.com/ucoktebas00',
        'https://www.linkedin.com/in/andreysinambela',
      ],
    }

    // Add scripts to head
    const addJsonLd = (schema) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.innerHTML = JSON.stringify(schema)
      document.head.appendChild(script)
    }

    addJsonLd(personSchema)
    addJsonLd(portfolioSchema)
    addJsonLd(organizationSchema)

    // Cleanup
    return () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]')
      scripts.forEach((script) => {
        if (
          script.innerHTML.includes('Andrey Julius') ||
          script.innerHTML.includes('Portfolio')
        ) {
          script.remove()
        }
      })
    }
  }, [])

  return null
}

export default StructuredData
