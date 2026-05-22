// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
// Support dua nama key yang umum dipakai
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
        || import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !key) {
  console.warn('[Supabase] env variables missing:', {
    hasUrl: !!url,
    hasKey: !!key,
  })
}

export const supabase = (url && key) ? createClient(url, key) : null

/**
 * Get CV download count from Supabase
 * Returns null if table doesn't exist or error occurs
 */
export async function getDownloadCount() {
  try {
    const { data, error } = await supabase
      .from('cv_downloads')
      .select('count')
      .eq('id', 'cv_count')
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // Table doesn't exist yet
        console.log('[CV Downloads] Table tidak ada, returning 0')
        return 0
      }
      throw error
    }

    return data?.count || 0
  } catch (error) {
    console.error('[CV Downloads] Error fetching count:', error.message)
    return null // Return null jika error, agar tidak crash
  }
}

/**
 * Increment CV download count in Supabase
 * Returns new count if successful, null if error
 */
export async function incrementDownloadCount() {
  try {
    // Cek apakah record sudah ada
    const { data: existing } = await supabase
      .from('cv_downloads')
      .select('count')
      .eq('id', 'cv_count')
      .single()

    if (existing) {
      // Update existing record
      const { data, error } = await supabase
        .from('cv_downloads')
        .update({ count: existing.count + 1 })
        .eq('id', 'cv_count')
        .select('count')
        .single()

      if (error) throw error
      return data?.count || null
    } else {
      // Insert new record jika tidak ada
      const { data, error } = await supabase
        .from('cv_downloads')
        .insert([{ id: 'cv_count', count: 1 }])
        .select('count')
        .single()

      if (error) throw error
      return data?.count || null
    }
  } catch (error) {
    console.error('[CV Downloads] Error incrementing count:', error.message)
    return null // Return null jika error, agar tidak crash
  }
}
