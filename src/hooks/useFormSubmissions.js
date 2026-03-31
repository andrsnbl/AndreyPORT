// ─────────────────────────────────────────────────────────────
//  src/hooks/useFormSubmissions.js
//  Hook untuk fetch form submissions dari Supabase
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

/**
 * Hook: Fetch semua form submissions (admin only)
 */
export function useFormSubmissions(filters = {}) {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pageInfo, setPageInfo] = useState({ page: 1, perPage: 10, total: 0 })

  const { status = null, page = 1, perPage = 10, sortBy = 'created_at', sortOrder = 'desc' } = filters

  useEffect(() => {
    if (!supabase) {
      setError('Supabase tidak terkonfigurasi')
      setLoading(false)
      return
    }

    let isMounted = true

    async function fetch() {
      try {
        let query = supabase
          .from('contact_submissions')
          .select('*', { count: 'exact' })

        // Apply status filter
        if (status) {
          query = query.eq('status', status)
        }

        // Apply sorting
        query = query.order(sortBy, { ascending: sortOrder === 'asc' })

        // Apply pagination
        const start = (page - 1) * perPage
        query = query.range(start, start + perPage - 1)

        const { data, error: fetchError, count } = await query

        if (fetchError) throw fetchError

        if (isMounted) {
          setSubmissions(data || [])
          setPageInfo({
            page,
            perPage,
            total: count || 0,
          })
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message)
          setSubmissions([])
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetch()
    return () => {
      isMounted = false
    }
  }, [status, page, perPage, sortBy, sortOrder])

  return { submissions, loading, error, pageInfo }
}

/**
 * Hook: Fetch single submission by ID
 */
export function useFormSubmission(id) {
  const [submission, setSubmission] = useState(null)
  const [loading, setLoading] = useState(!!id)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id || !supabase) {
      setSubmission(null)
      setLoading(false)
      return
    }

    let isMounted = true

    async function fetch() {
      try {
        const { data, error: fetchError } = await supabase
          .from('contact_submissions')
          .select('*')
          .eq('id', id)
          .single()

        if (fetchError) throw fetchError

        if (isMounted) {
          setSubmission(data)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message)
          setSubmission(null)
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetch()
    return () => {
      isMounted = false
    }
  }, [id])

  return { submission, loading, error }
}

/**
 * Update submission status
 */
export async function updateSubmissionStatus(id, newStatus) {
  if (!supabase) {
    return { error: 'Supabase tidak terkonfigurasi' }
  }

  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .update({
        status: newStatus,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()

    if (error) throw error

    return { data, error: null }
  } catch (err) {
    return { data: null, error: err.message }
  }
}

/**
 * Delete submission
 */
export async function deleteSubmission(id) {
  if (!supabase) {
    return { error: 'Supabase tidak terkonfigurasi' }
  }

  try {
    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id)

    if (error) throw error

    return { error: null }
  } catch (err) {
    return { error: err.message }
  }
}

/**
 * Get form submission statistics
 */
export async function getSubmissionStats() {
  if (!supabase) {
    return { stats: null, error: 'Supabase tidak terkonfigurasi' }
  }

  try {
    const { data, error } = await supabase.rpc('get_submission_stats')

    if (error) throw error

    return { stats: data, error: null }
  } catch (err) {
    // Fallback: query secara manual
    try {
      const { data: allData, error: queryError } = await supabase
        .from('contact_submissions')
        .select('status')

      if (queryError) throw queryError

      const stats = {
        total: allData.length,
        new: allData.filter(x => x.status === 'new').length,
        read: allData.filter(x => x.status === 'read').length,
        replied: allData.filter(x => x.status === 'replied').length,
      }

      return { stats, error: null }
    } catch (fallbackErr) {
      return { stats: null, error: fallbackErr.message }
    }
  }
}
