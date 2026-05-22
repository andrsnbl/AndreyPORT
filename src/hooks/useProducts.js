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
    if (!supabase) throw new Error('Supabase tidak tersedia')

    // Validasi tipe file
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowed.includes(file.type))
      throw new Error('Format file tidak didukung. Gunakan JPG, PNG, atau WebP.')

    // Validasi ukuran (max 5MB)
    if (file.size > 5 * 1024 * 1024)
      throw new Error('Ukuran file terlalu besar. Maksimal 5MB.')

    const ext  = file.name.split('.').pop().toLowerCase()
    const path = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(path, file, { upsert: true, contentType: file.type })

    if (uploadError) {
      // Pesan error yang lebih jelas
      if (uploadError.message.includes('Bucket not found'))
        throw new Error('Bucket storage belum dibuat. Buat bucket "products" di Supabase Storage.')
      if (uploadError.message.includes('policy') || uploadError.message.includes('security'))
        throw new Error('Akses ditolak. Pastikan sudah login sebagai admin dan policy storage sudah diset.')
      throw new Error(`Upload gagal: ${uploadError.message}`)
    }

    const { data } = supabase.storage.from('products').getPublicUrl(path)
    return data.publicUrl
  }

  return { products, loading, error, fetchProducts, createProduct, updateProduct, deleteProduct, uploadImage }
}
