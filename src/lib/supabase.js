// ─────────────────────────────────────────────────────────────
//  supabase.js
//  Supabase client untuk tracking download CV
// ─────────────────────────────────────────────────────────────

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

if (!supabase) {
  console.warn('[Supabase] Belum dikonfigurasi. Buat file .env dengan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY')
}

/** Mendapatkan jumlah download dari Supabase */
export async function getDownloadCount() {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('stats')
    .select('download_count')
    .eq('id', 'main')
    .single()
  if (error) {
    console.error('[Supabase] getDownloadCount error:', error.message)
    return null
  }
  return data?.download_count ?? 0
}

/** Menambah jumlah download di Supabase (RPC mengembalikan array) */
export async function incrementDownloadCount() {
  if (!supabase) return null
  const { data, error } = await supabase.rpc('increment_download_count')
  if (error) {
    console.error('[Supabase] incrementDownloadCount error:', error.message)
    return null
  }
  const row = Array.isArray(data) ? data[0] : data
  return row?.download_count ?? null
}
