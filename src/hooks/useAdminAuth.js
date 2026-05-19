// src/hooks/useAdminAuth.js
// Login/logout admin via Supabase Auth
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'andreyulius8@gmail.com'

export function useAdminAuth() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s)
    })
    return () => subscription.unsubscribe()
  }, [])

  const isAdmin = session?.user?.email === ADMIN_EMAIL

  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error(error.message)
  }

  const logout = () => supabase.auth.signOut()

  return { session, isAdmin, loading, login, logout }
}
