// src/hooks/useProducts.js
// CRUD produk via Supabase — dipakai oleh Storefront & AdminPanel
import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useProducts() {
  const [products, setProducts]   = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)

  const fetchProducts = useCallback(async () => {
    if (!supabase) { setLoading(false); return }   // env tidak tersedia
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) setError(error.message)
    else setProducts(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  // ── Create ──────────────────────────────────────────
  const createProduct = async (payload) => {
    const { data, error } = await supabase
      .from('products')
      .insert([payload])
      .select()
      .single()
    if (error) throw new Error(error.message)
    setProducts(prev => [data, ...prev])
    return data
  }

  // ── Update ──────────────────────────────────────────
  const updateProduct = async (id, payload) => {
    const { data, error } = await supabase
      .from('products')
      .update(payload)
      .eq('id', id)
      .select()
      .single()
    if (error) throw new Error(error.message)
    setProducts(prev => prev.map(p => p.id === id ? data : p))
    return data
  }

  // ── Delete ──────────────────────────────────────────
  const deleteProduct = async (id) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    if (error) throw new Error(error.message)
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  // ── Upload gambar ke Supabase Storage ───────────────
  const uploadImage = async (file) => {
    const ext  = file.name.split('.').pop()
    const path = `products/${Date.now()}.${ext}`
    const { error } = await supabase.storage
      .from('products')
      .upload(path, file, { upsert: true })
    if (error) throw new Error(error.message)
    const { data } = supabase.storage.from('products').getPublicUrl(path)
    return data.publicUrl
  }

  return { products, loading, error, fetchProducts, createProduct, updateProduct, deleteProduct, uploadImage }
}
