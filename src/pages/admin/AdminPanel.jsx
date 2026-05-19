// src/pages/admin/AdminPanel.jsx
import { useState, useRef } from 'react'
import { useProducts } from '../../hooks/useProducts'
import { useAdminAuth } from '../../hooks/useAdminAuth'
import { PRODUCT_CATEGORIES } from '../../data/portfolioData'
import styles from './AdminPanel.module.css'

const EMPTY_FORM = {
  name: '', category: 'electronics', price: '', original_price: '',
  discount: '', description: '', image_url: '', rating: '', reviews: '',
}

const formatIDR = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n)

export default function AdminPanel() {
  const { products, loading, error, createProduct, updateProduct, deleteProduct, uploadImage } = useProducts()
  const { logout, session } = useAdminAuth()

  const [form, setForm]           = useState(EMPTY_FORM)
  const [editId, setEditId]       = useState(null)
  const [saving, setSaving]       = useState(false)
  const [uploading, setUploading] = useState(false)
  const [toast, setToast]         = useState(null)
  const [search, setSearch]       = useState('')
  const [confirm, setConfirm]     = useState(null)   // id produk yang akan dihapus
  const [preview, setPreview]     = useState(null)   // preview gambar upload
  const fileRef = useRef()

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  // Upload gambar ke Supabase Storage
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) { showToast('Ukuran file max 5MB', 'error'); return }
    setUploading(true)
    setPreview(URL.createObjectURL(file))
    try {
      const url = await uploadImage(file)
      setForm(prev => ({ ...prev, image_url: url }))
      showToast('Gambar berhasil diupload')
    } catch (err) {
      showToast(err.message, 'error')
      setPreview(null)
    } finally {
      setUploading(false)
    }
  }

  const validate = () => {
    if (!form.name.trim())        return 'Nama produk wajib diisi'
    if (!form.price || form.price <= 0) return 'Harga wajib diisi'
    if (!form.description.trim()) return 'Deskripsi wajib diisi'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validate()
    if (err) { showToast(err, 'error'); return }

    setSaving(true)
    const payload = {
      name:           form.name.trim(),
      category:       form.category,
      price:          Number(form.price),
      original_price: form.original_price ? Number(form.original_price) : null,
      discount:       form.discount ? Number(form.discount) : null,
      description:    form.description.trim(),
      image_url:      form.image_url || null,
      rating:         form.rating ? Number(form.rating) : 0,
      reviews:        form.reviews ? Number(form.reviews) : 0,
    }

    try {
      if (editId) {
        await updateProduct(editId, payload)
        showToast('Produk berhasil diperbarui ✓')
      } else {
        await createProduct(payload)
        showToast('Produk berhasil ditambahkan ✓')
      }
      resetForm()
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (product) => {
    setEditId(product.id)
    setForm({
      name:           product.name,
      category:       product.category,
      price:          product.price,
      original_price: product.original_price || '',
      discount:       product.discount || '',
      description:    product.description || '',
      image_url:      product.image_url || '',
      rating:         product.rating || '',
      reviews:        product.reviews || '',
    })
    setPreview(product.image_url || null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id)
      showToast('Produk dihapus ✓')
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setConfirm(null)
    }
  }

  const resetForm = () => {
    setForm(EMPTY_FORM)
    setEditId(null)
    setPreview(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className={styles.page}>
      {/* ── Toast ── */}
      {toast && (
        <div className={`${styles.toast} ${styles[toast.type]}`}>
          {toast.type === 'success' ? '✓' : '✕'} {toast.msg}
        </div>
      )}

      {/* ── Confirm Delete Modal ── */}
      {confirm && (
        <div className={styles.overlay}>
          <div className={styles.confirmBox}>
            <h3>Hapus produk ini?</h3>
            <p>Tindakan ini tidak bisa dibatalkan.</p>
            <div className={styles.confirmActions}>
              <button className={styles.btnCancel} onClick={() => setConfirm(null)}>Batal</button>
              <button className={styles.btnDanger} onClick={() => handleDelete(confirm)}>Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>⚙️ Admin Panel</h1>
          <p className={styles.subtitle}>Login sebagai <strong>{session?.user?.email}</strong></p>
        </div>
        <button className={styles.btnLogout} onClick={logout}>Logout</button>
      </header>

      {/* ── Form ── */}
      <section className={styles.formSection}>
        <h2 className={styles.sectionTitle}>
          {editId ? '✏️ Edit Produk' : '➕ Tambah Produk Baru'}
        </h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>

            {/* Nama */}
            <div className={`${styles.field} ${styles.fullWidth}`}>
              <label>Nama Produk *</label>
              <input name="name" value={form.name} onChange={handleChange}
                placeholder="Contoh: Premium Wireless Headphones" required />
            </div>

            {/* Kategori */}
            <div className={styles.field}>
              <label>Kategori *</label>
              <select name="category" value={form.category} onChange={handleChange}>
                {PRODUCT_CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                ))}
              </select>
            </div>

            {/* Harga */}
            <div className={styles.field}>
              <label>Harga (IDR) *</label>
              <input type="number" name="price" value={form.price} onChange={handleChange}
                placeholder="1299000" min="0" required />
            </div>

            {/* Harga asli */}
            <div className={styles.field}>
              <label>Harga Asli (IDR)</label>
              <input type="number" name="original_price" value={form.original_price}
                onChange={handleChange} placeholder="1799000" min="0" />
            </div>

            {/* Diskon */}
            <div className={styles.field}>
              <label>Diskon (%)</label>
              <input type="number" name="discount" value={form.discount}
                onChange={handleChange} placeholder="28" min="0" max="100" />
            </div>

            {/* Rating */}
            <div className={styles.field}>
              <label>Rating (0–5)</label>
              <input type="number" name="rating" value={form.rating}
                onChange={handleChange} placeholder="4.8" min="0" max="5" step="0.1" />
            </div>

            {/* Reviews */}
            <div className={styles.field}>
              <label>Jumlah Ulasan</label>
              <input type="number" name="reviews" value={form.reviews}
                onChange={handleChange} placeholder="245" min="0" />
            </div>

            {/* Deskripsi */}
            <div className={`${styles.field} ${styles.fullWidth}`}>
              <label>Deskripsi *</label>
              <textarea name="description" value={form.description} onChange={handleChange}
                placeholder="Deskripsi singkat produk..." rows={3} required />
            </div>

            {/* Upload Gambar */}
            <div className={`${styles.field} ${styles.fullWidth}`}>
              <label>Gambar Produk</label>
              <div className={styles.uploadRow}>
                <input ref={fileRef} type="file" accept="image/*"
                  onChange={handleImageUpload} className={styles.fileInput} />
                <span className={styles.uploadHint}>atau masukkan URL gambar:</span>
                <input name="image_url" value={form.image_url} onChange={handleChange}
                  placeholder="https://..." className={styles.urlInput} />
              </div>
              {uploading && <p className={styles.hint}>⏳ Mengupload gambar...</p>}
              {preview && (
                <div className={styles.previewWrap}>
                  <img src={preview} alt="preview" className={styles.preview} />
                  <button type="button" className={styles.removePreview}
                    onClick={() => { setPreview(null); setForm(p => ({ ...p, image_url: '' })); if (fileRef.current) fileRef.current.value = '' }}>
                    ✕ Hapus gambar
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className={styles.formActions}>
            {editId && (
              <button type="button" className={styles.btnCancel} onClick={resetForm}>
                Batal Edit
              </button>
            )}
            <button type="submit" className={styles.btnSave} disabled={saving || uploading}>
              {saving ? '⏳ Menyimpan...' : editId ? '✓ Simpan Perubahan' : '➕ Tambah Produk'}
            </button>
          </div>
        </form>
      </section>

      {/* ── Daftar Produk ── */}
      <section className={styles.listSection}>
        <div className={styles.listHeader}>
          <h2 className={styles.sectionTitle}>📦 Daftar Produk ({products.length})</h2>
          <input className={styles.search} value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Cari nama atau kategori..." />
        </div>

        {loading && <p className={styles.hint}>Memuat produk...</p>}
        {error   && <p className={styles.hintError}>Error: {error}</p>}

        {!loading && filtered.length === 0 && (
          <p className={styles.hint}>Belum ada produk. Tambahkan produk pertama kamu!</p>
        )}

        <div className={styles.table}>
          {filtered.map(p => (
            <div key={p.id} className={`${styles.row} ${editId === p.id ? styles.rowActive : ''}`}>
              {/* Gambar */}
              <div className={styles.rowImg}>
                {p.image_url
                  ? <img src={p.image_url} alt={p.name} />
                  : <div className={styles.noImg}>📷</div>}
              </div>

              {/* Info */}
              <div className={styles.rowInfo}>
                <span className={styles.rowName}>{p.name}</span>
                <span className={styles.rowMeta}>
                  {PRODUCT_CATEGORIES.find(c => c.id === p.category)?.icon} {p.category}
                  &nbsp;·&nbsp;
                  {formatIDR(p.price)}
                  {p.discount ? ` · -${p.discount}%` : ''}
                </span>
              </div>

              {/* Actions */}
              <div className={styles.rowActions}>
                <button className={styles.btnEdit} onClick={() => handleEdit(p)}>✏️ Edit</button>
                <button className={styles.btnDanger} onClick={() => setConfirm(p.id)}>🗑 Hapus</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
