// ─────────────────────────────────────────────────────────────
//  src/hooks/useBlog.js
//  Hook untuk fetch blog posts dari Sanity
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getBlogPostsByCategory,
  searchBlogPosts,
  getCategories,
} from '../lib/sanity'

/**
 * Hook: Fetch semua blog posts
 */
export function useAllBlogPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function fetch() {
      try {
        const data = await getAllBlogPosts()
        if (isMounted) {
          setPosts(data)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message)
          setPosts([])
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetch()
    return () => {
      isMounted = false
    }
  }, [])

  return { posts, loading, error }
}

/**
 * Hook: Fetch blog post by slug
 */
export function useBlogPost(slug) {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(!!slug)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) {
      setPost(null)
      setLoading(false)
      return
    }

    let isMounted = true

    async function fetch() {
      try {
        const data = await getBlogPostBySlug(slug)
        if (isMounted) {
          setPost(data)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message)
          setPost(null)
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetch()
    return () => {
      isMounted = false
    }
  }, [slug])

  return { post, loading, error }
}

/**
 * Hook: Fetch posts by category
 */
export function useBlogPostsByCategory(categorySlug) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(!!categorySlug)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!categorySlug) {
      setPosts([])
      setLoading(false)
      return
    }

    let isMounted = true

    async function fetch() {
      try {
        const data = await getBlogPostsByCategory(categorySlug)
        if (isMounted) {
          setPosts(data)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message)
          setPosts([])
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetch()
    return () => {
      isMounted = false
    }
  }, [categorySlug])

  return { posts, loading, error }
}

/**
 * Hook: Search blog posts
 */
export function useBlogSearch(searchTerm) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!searchTerm || searchTerm.trim().length < 2) {
      setPosts([])
      setLoading(false)
      return
    }

    let isMounted = true
    let timeoutId

    const fetch = async () => {
      setLoading(true)
      try {
        const data = await searchBlogPosts(searchTerm)
        if (isMounted) {
          setPosts(data)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message)
          setPosts([])
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    // Debounce search untuk mengurangi API calls
    timeoutId = setTimeout(fetch, 300)

    return () => {
      isMounted = false
      clearTimeout(timeoutId)
    }
  }, [searchTerm])

  return { posts, loading, error }
}

/**
 * Hook: Fetch categories
 */
export function useBlogCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function fetch() {
      try {
        const data = await getCategories()
        if (isMounted) {
          setCategories(data)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message)
          setCategories([])
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetch()
    return () => {
      isMounted = false
    }
  }, [])

  return { categories, loading, error }
}
