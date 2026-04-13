// ─────────────────────────────────────────────────────────────
//  src/lib/sanity.js
//  Sanity.io client untuk kurasi blog posts
// ─────────────────────────────────────────────────────────────

import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'
const token = import.meta.env.VITE_SANITY_TOKEN

// Check if Sanity is configured
if (!projectId) {
  console.warn('[Sanity] Not configured. Set VITE_SANITY_PROJECT_ID in .env')
}

export const sanity = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: false,
      token,
    })
  : null

// Image builder untuk Sanity images
export const builder = projectId
  ? imageUrlBuilder({ projectId, dataset })
  : null

/**
 * Get image URL builder dari Sanity asset
 */
export function urlFor(source) {
  if (!builder) {
    console.warn('[Sanity] Image builder not configured')
    return null
  }
  if (!source) {
    console.warn('[Sanity] No image source provided')
    return null
  }
  try {
    return builder.image(source)
  } catch (error) {
    console.error('[Sanity] Image URL builder error:', error)
    return null
  }
}

/**
 * Fetch semua blog posts
 * FIX BUG UTAMA: throw error agar useBlog hook bisa catch dengan benar,
 * bukan return [] secara diam-diam sehingga hook mengira fetch sukses tapi kosong
 */
export async function getAllBlogPosts() {
  if (!sanity) {
    // Sanity tidak dikonfigurasi — throw error spesifik agar hook bisa handle
    const error = new Error('Sanity not configured. Missing VITE_SANITY_PROJECT_ID')
    error.code = 'SANITY_NOT_CONFIGURED'
    throw error
  }

  const query = `
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      author->{
        name,
        image
      },
      mainImage,
      publishedAt,
      body,
      excerpt,
      categories[]->{
        title,
        slug
      }
    }
  `

  // FIX: Biarkan error ter-throw agar hook bisa set error state dengan benar
  const posts = await sanity.fetch(query)
  return posts || []
}

/**
 * Fetch blog post by slug
 */
export async function getBlogPostBySlug(slug) {
  if (!sanity) {
    const error = new Error('Sanity not configured. Missing VITE_SANITY_PROJECT_ID')
    error.code = 'SANITY_NOT_CONFIGURED'
    throw error
  }

  const query = `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      author->{
        name,
        image,
        bio
      },
      mainImage,
      publishedAt,
      body,
      excerpt,
      categories[]->{
        title,
        slug
      }
    }
  `

  const post = await sanity.fetch(query, { slug })
  return post || null
}

/**
 * Fetch blog posts by category
 */
export async function getBlogPostsByCategory(categorySlug) {
  if (!sanity) {
    const error = new Error('Sanity not configured. Missing VITE_SANITY_PROJECT_ID')
    error.code = 'SANITY_NOT_CONFIGURED'
    throw error
  }

  const query = `
    *[_type == "post" && references(*[_type=="category" && slug.current == $slug]._id)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      author->{
        name,
        image
      },
      mainImage,
      publishedAt,
      excerpt,
      categories[]->{
        title,
        slug
      }
    }
  `

  const posts = await sanity.fetch(query, { slug: categorySlug })
  return posts || []
}

/**
 * Search blog posts
 */
export async function searchBlogPosts(searchTerm) {
  if (!sanity) {
    const error = new Error('Sanity not configured. Missing VITE_SANITY_PROJECT_ID')
    error.code = 'SANITY_NOT_CONFIGURED'
    throw error
  }

  const query = `
    *[_type == "post" && (title match $searchTerm || excerpt match $searchTerm)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      author->{
        name,
        image
      },
      mainImage,
      publishedAt,
      excerpt,
      categories[]->{
        title,
        slug
      }
    }
  `

  const posts = await sanity.fetch(query, { searchTerm: `${searchTerm}*` })
  return posts || []
}

/**
 * Get categories
 */
export async function getCategories() {
  if (!sanity) {
    const error = new Error('Sanity not configured. Missing VITE_SANITY_PROJECT_ID')
    error.code = 'SANITY_NOT_CONFIGURED'
    throw error
  }

  const query = `
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      slug,
      description
    }
  `

  const categories = await sanity.fetch(query)
  return categories || []
}