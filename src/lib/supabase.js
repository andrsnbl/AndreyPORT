// ─────────────────────────────────────────────────────────────
//  supabase.js
//  Supabase client untuk tracking download CV
// ─────────────────────────────────────────────────────────────

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate Supabase credentials
function validateSupabaseConfig(url, key) {
  if (!url || !key) {
    return { valid: false, error: 'Missing URL or Anon Key' }
  }
  
  // Check URL format
  if (!url.startsWith('https://') || !url.includes('.supabase.co')) {
    return { valid: false, error: 'Invalid Supabase URL format' }
  }
  
  // Check key format (JWT tokens start with eyJ)
  if (!key.startsWith('eyJ')) {
    return { valid: false, error: 'Invalid Anon Key format' }
  }
  
  return { valid: true }
}

const configValidation = validateSupabaseConfig(supabaseUrl, supabaseAnonKey)

if (!configValidation.valid) {
  console.error('[Supabase] Configuration error:', configValidation.error)
  console.error('[Supabase] URL:', supabaseUrl ? '✅ Present' : '❌ Missing')
  console.error('[Supabase] Key:', supabaseAnonKey ? '✅ Present' : '❌ Missing')
}

export const supabase = configValidation.valid
  ? createClient(supabaseUrl, supabaseAnonKey, {
      // Add fetch options for better error handling
      fetch: async (url, options = {}) => {
        try {
          const response = await fetch(url, {
            ...options,
            // Add timeout
            signal: AbortSignal.timeout(10000) // 10 second timeout
          })
          
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            console.error('[Supabase] HTTP error:', {
              status: response.status,
              statusText: response.statusText,
              url: url.substring(0, 100),
              ...errorData
            })
          }
          
          return response
        } catch (error) {
          console.error('[Supabase] Fetch error:', {
            message: error.message,
            name: error.name,
            url: url.substring(0, 100)
          })
          throw error
        }
      }
    })
  : null

if (!supabase) {
  console.warn('[Supabase] Client not initialized. Check .env configuration')
}

/** Mendapatkan jumlah download dari Supabase */
export async function getDownloadCount() {
  if (!supabase) {
    console.error('[Supabase] Client not initialized. Check .env file:')
    console.error('  - VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL ? '✅' : '❌')
    console.error('  - VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅' : '❌')
    return null
  }
  
  try {
    console.log('[Supabase] Fetching download count...')
    const { data, error } = await supabase
      .from('stats')
      .select('download_count')
      .eq('id', 'main')
      .single()
    
    if (error) {
      // Handle specific error types
      if (error.message.includes('Failed to fetch')) {
        console.error('[Supabase] Network error - Cannot connect to Supabase')
        console.error('[Supabase] Possible causes:')
        console.error('  1. No internet connection')
        console.error('  2. CORS not configured in Supabase dashboard')
        console.error('  3. Invalid Supabase URL or Anon Key')
        console.error('  4. Supabase project is paused or deleted')
        console.error('[Supabase] Check your project at: https://supabase.com/dashboard')
      } else if (error.code === 'PGRST116') {
        console.error('[Supabase] Table "stats" not found or RLS policy blocking access')
        console.error('[Supabase] Run the SQL setup in Supabase Dashboard > SQL Editor')
      } else if (error.code === '42P01') {
        console.error('[Supabase] Table "stats" does not exist')
        console.error('[Supabase] Run supabase-setup.sql in Supabase Dashboard')
      }
      
      console.error('[Supabase] getDownloadCount error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return null
    }
    
    console.log('[Supabase] Download count fetched:', data?.download_count)
    return data?.download_count ?? 0
  } catch (err) {
    console.error('[Supabase] getDownloadCount unexpected error:', {
      message: err.message,
      name: err.name,
      stack: err.stack?.substring(0, 200)
    })
    return null
  }
}

/** Menambah jumlah download di Supabase (RPC mengembalikan array) */
export async function incrementDownloadCount() {
  if (!supabase) {
    console.warn('[Supabase] Client not initialized. Cannot increment download count')
    return null
  }
  
  try {
    console.log('[Supabase] Incrementing download count...')
    const { data, error } = await supabase.rpc('increment_download_count')
    
    if (error) {
      console.error('[Supabase] incrementDownloadCount error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return null
    }
    
    const row = Array.isArray(data) ? data[0] : data
    console.log('[Supabase] Download count incremented to:', row?.download_count)
    return row?.download_count ?? null
  } catch (err) {
    console.error('[Supabase] incrementDownloadCount unexpected error:', err.message)
    return null
  }
}
