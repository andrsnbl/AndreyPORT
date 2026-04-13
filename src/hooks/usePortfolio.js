import { useState, useEffect } from 'react'
import { sanity, builder } from '../lib/sanity'
import { PORTFOLIO_ITEMS } from '../data/portfolioData'

export function usePortfolio() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!sanity) {
      console.warn('Sanity not configured. Using fallback data.')
      // Fallback ke data lokal jika Sanity tidak dikonfigurasi
      setItems(transformFallbackData(PORTFOLIO_ITEMS))
      setLoading(false)
      return
    }

    const fetchPortfolio = async () => {
      try {
        const query = `
          *[_type == "portfolio"] | order(displayOrder asc, publishedAt desc) {
            _id,
            title,
            slug,
            description,
            category,
            projectType,
            thumbnail {
              asset->{
                _id,
                url,
                metadata
              },
              hotspot
            },
            previewType,
            previewUrl,
            galleryImages[] {
              asset->{
                _id,
                url,
                metadata
              },
              hotspot
            },
            externalLink,
            technologies,
            featured,
            displayOrder,
            publishedAt
          }
        `

        console.log('[Portfolio] Fetching from Sanity...')
        const data = await sanity.fetch(query)
        console.log('[Portfolio] Data received:', data.length, 'items')

        if (!data || data.length === 0) {
          console.warn('[Portfolio] Sanity returned empty. Using fallback data.')
          setItems(transformFallbackData(PORTFOLIO_ITEMS))
        } else {
          // Transform Sanity data ke format yang dipakai di frontend
          const transformed = data.map((item) => {
            let imgUrl = null
            
            // Build thumbnail URL dengan error handling
            try {
              if (item.thumbnail?.asset?._id) {
                imgUrl = builder.image(item.thumbnail).width(400).height(300).url()
                console.log(`[Portfolio] ✅ Generated URL for "${item.title}":`, imgUrl)
              } else {
                console.warn(`[Portfolio] ⚠️ No asset ID for "${item.title}":`, item.thumbnail)
              }
            } catch (imgErr) {
              console.warn(`[Portfolio] Could not build image URL for "${item.title}":`, imgErr.message)
            }

            return {
              id: item._id,
              title: item.title,
              slug: item.slug?.current,
              description: item.description || '',
              cat: item.category,
              type: item.projectType,
              img: imgUrl,
              previewType: item.previewType,
              previewUrl: item.previewUrl || null,
              gallery: item.galleryImages && Array.isArray(item.galleryImages)
                ? item.galleryImages
                    .filter(img => img?.asset?._id) // Hanya image valid
                    .map((img) => {
                      try {
                        return builder.image(img).width(600).url()
                      } catch (e) {
                        console.warn('[Portfolio] Invalid gallery image:', e.message)
                        return null
                      }
                    })
                    .filter(url => url !== null) // Remove failed builds
                : [],
              externalLink: item.externalLink || null,
              technologies: item.technologies || [],
              featured: item.featured,
            }
          })

          setItems(transformed)
          console.log('[Portfolio] ✅ Sanity data loaded successfully', transformed.length, 'items')
        }
        setError(null)
      } catch (err) {
        console.error('[Portfolio] ❌ Error fetching from Sanity:')
        console.error('   Error Type:', err.name)
        console.error('   Error Message:', err.message)
        console.error('   Full Error:', err)
        console.warn('[Portfolio] Falling back to local data')
        setError(err.message)
        // Fallback ke data lokal jika ada error
        setItems(transformFallbackData(PORTFOLIO_ITEMS))
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolio()
  }, [])

  return { items, loading, error }
}

// Helper function untuk transform fallback data
function transformFallbackData(backupItems) {
  return backupItems.map((item) => ({
    ...item,
    id: item.id || item.title, // fallback ke title jika tidak ada id
  }))
}
