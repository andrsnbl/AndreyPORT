// src/hooks/useAdminAuth.js
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'andreyulius8@gmail.com'

export function useAdminAuth() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Guard: supabase null jika env tidak tersedia (Netlify tanpa env var)
    if (!supabase) {
      setLoading(false)
      return
    }

    // onAuthStateChange sudah mencakup initial session —
    // tidak perlu getSession() terpisah, menghindari race condition
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const isAdmin = !!session?.user?.email &&
    session.user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()

  const login = async (email, password) => {
    if (!supabase) throw new Error('Supabase tidak tersedia')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error(error.message)
  }

  const logout = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    setSession(null)
  }

  return { session, isAdmin, loading, login, logout }
}
