// src/hooks/useSupabase.js
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

// Hook generik untuk fetch data dari tabel apapun
function useSupabaseData(table, options = {}) {
  const [data,    setData]    = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        let query = supabase.from(table).select('*')

        if (options.orderBy) {
          query = query.order(options.orderBy, { ascending: true })
        }

        const { data, error } = await query

        if (error) throw error
        setData(data || [])
      } catch (err) {
        console.error(`Error fetching ${table}:`, err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [table])

  return { data, loading, error }
}

// Hook spesifik per tabel
export function usePortfolio()     { return useSupabaseData('portfolio_items', { orderBy: 'order_index' }) }
export function useBlogPosts()     { return useSupabaseData('blog_posts',      { orderBy: 'created_at'  }) }
export function useTestimonials()  { return useSupabaseData('testimonials',    { orderBy: 'created_at'  }) }
export function useServices()      { return useSupabaseData('services',        { orderBy: 'order_index' }) }