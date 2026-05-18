# 🛍️ Storefront Setup Guide

Panduan lengkap untuk mengonfigurasi dan menggunakan komponen Storefront yang bold dan modern.

## ✨ Fitur Utama

- **Kartu Produk Modern** - Desain bold dengan hover effects yang smooth
- **Filter Kategori** - 4 kategori produk (Fashion, Electronics, Accessories, Lifestyle)
- **Integrasi WhatsApp** - Tombol WhatsApp langsung ke pelanggan (dalam kartu & CTA)
- **Responsive Design** - Sempurna di desktop, tablet, dan mobile
- **Multi-bahasa** - Dukungan Inggris & Indonesia
- **Rating & Diskon** - Tampilkan rating produk, ulasan, dan badge diskon

---

## 🔧 Konfigurasi WhatsApp

### 1. Update Nomor WhatsApp

Di file `src/components/Storefront.jsx`, cari fungsi `handleWhatsApp` dan `handleWhatsAppBulk`:

```javascript
// SEBELUM:
const whatsappUrl = `https://wa.me/628xxx? (ganti dengan nomor Anda)&text=${message}`

// SESUDAH (contoh nomor Indonesia):
const whatsappUrl = `https://wa.me/6281211001234&text=${message}`
```

**Catatan:**
- Ganti `628xxx` dengan nomor WhatsApp Anda
- Format: `62` + nomor tanpa `0` di awal (Indonesia)
- Contoh: `6281211001234` untuk nomor `0812-1100-1234`

---

## 📦 Menambah/Edit Produk

### File: `src/data/portfolioData.js`

Produk disimpan dalam array `PRODUCTS`. Struktur setiap produk:

```javascript
{
  id: 'prod-001',              // ID unik (gunakan format prod-XXX)
  name: 'Product Name',         // Nama produk
  category: 'fashion',          // Kategori: fashion | electronics | accessories | lifestyle
  price: 1299000,              // Harga saat ini (Rp)
  originalPrice: 1799000,      // Harga asli (untuk diskon, opsional)
  discount: 28,                // Persentase diskon (opsional)
  description: 'Deskripsi...',  // Deskripsi singkat produk
  image: 'https://...',         // URL gambar (min 300x240px)
  rating: 4.8,                 // Rating bintang 1-5 (opsional)
  reviews: 245,                // Jumlah ulasan (opsional)
}
```

### Contoh Menambah Produk Baru:

```javascript
{
  id: 'prod-010',
  name: 'Gaming Mouse Wireless',
  category: 'electronics',
  price: 599000,
  originalPrice: 799000,
  discount: 25,
  description: 'Mouse gaming nirkabel dengan DPI tinggi dan respon cepat.',
  image: 'https://via.placeholder.com/300x240?text=Gaming+Mouse',
  rating: 4.9,
  reviews: 156,
}
```

### Kategori Produk yang Tersedia:

```javascript
export const PRODUCT_CATEGORIES = [
  { id: 'fashion', name: 'Fashion', icon: '👗' },
  { id: 'electronics', name: 'Electronics', icon: '⚡' },
  { id: 'accessories', name: 'Accessories', icon: '✨' },
  { id: 'lifestyle', name: 'Lifestyle', icon: '🌿' },
]
```

---

## 🎨 Mengubah Gambar Produk

### Opsi 1: Placeholder (Gratis)
```javascript
image: 'https://via.placeholder.com/300x240?text=Product+Name'
```

### Opsi 2: Gambar Nyata
Gunakan URL gambar Anda sendiri:
```javascript
image: 'https://example.com/product-image.jpg'
```

### Opsi 3: Upload Lokal
1. Simpan gambar di folder `public/img/products/`
2. Gunakan path: `image: '/img/products/product-name.jpg'`

**Tips Gambar:**
- Ukuran minimum: 300x240px (aspect ratio 5:4)
- Format: JPG, PNG, WebP
- Optimalkan ukuran file (<100KB)

---

## 🌐 Terjemahan & Konten

### Inggris: `src/locales/en.json`
```json
"storefront": {
  "tag": "🛍️ Product Collection",
  "title": "Our",
  "titleSpan": "Store",
  "subtitle": "Premium products with best quality",
  ...
}
```

### Indonesia: `src/locales/id.json`
```json
"storefront": {
  "tag": "🛍️ Koleksi Produk",
  "title": "Toko",
  "titleSpan": "Kami",
  "subtitle": "Produk pilihan dengan kualitas terbaik",
  ...
}
```

Sunting nilai untuk menyesuaikan teks sesuai brand Anda.

---

## 🎯 Styling & Warna

File CSS: `src/components/Storefront.module.css`

### Warna Utama (menggunakan CSS variables):
- `--accent` - Warna accent (ungu default)
- `--card` - Background kartu
- `--border` - Warna border
- `--text` - Teks utama
- `--text2` - Teks sekunder

Jika ingin mengubah warna WhatsApp button:

```css
/* Cari di Storefront.module.css */
.whatsappBtn {
  background: linear-gradient(135deg, #25d366 0%, #20ba5d 100%);
  /* Ubah hex codes ini */
}
```

---

## 📱 Fitur Responsive

Storefront otomatis responsive di:
- ✅ Desktop (3 kolom)
- ✅ Tablet (2 kolom)
- ✅ Mobile (1 kolom)

Breakpoints:
- 1024px - Tablet (2 kolom)
- 768px - Tablet kecil
- 640px - Mobile

---

## 🔄 Filter Kategori

Fitur filter sudah terintegrasi otomatis:
- Tombol "Semua Produk" - Tampilkan semua
- Tombol kategori - Filter by category
- Animasi smooth saat switch kategori

### Custom Filter Logic:
```javascript
const filteredProducts = useMemo(() => {
  if (activeCategory === 'all') return PRODUCTS
  return PRODUCTS.filter(product => product.category === activeCategory)
}, [activeCategory])
```

---

## 💬 WhatsApp Integration

### Pesan Otomatis:

Saat pelanggan klik tombol WhatsApp:

**Untuk produk tertentu:**
```
Halo! Saya tertarik dengan produk: [NAMA PRODUK]

Bisakah Anda memberikan informasi lebih lanjut?
```

**Untuk CTA umum:**
```
Halo! Saya tertarik melihat produk-produk Anda. 

Bisakah Anda mengirimkan katalog lengkap?
```

### Customisasi Pesan:
Di `Storefront.jsx`, edit string di fungsi `handleWhatsApp`:
```javascript
const message = encodeURIComponent(
  `Halo! [Custom message Anda]`
)
```

---

## 🚀 Deploy & Tips

### Pre-Deploy Checklist:
- [ ] Update nomor WhatsApp
- [ ] Tambahkan minimal 6-9 produk
- [ ] Ganti gambar placeholder dengan gambar nyata
- [ ] Test filter kategori
- [ ] Test WhatsApp button di mobile
- [ ] Check terjemahan (EN & ID)

### Performa Tips:
- Gunakan lazy loading untuk gambar besar
- Optimize image size <50KB per file
- Test di mobile device sebelum deploy

---

## ❌ Troubleshooting

### Produk tidak muncul?
- Pastikan kategori sesuai: `fashion`, `electronics`, `accessories`, `lifestyle`
- Cek format JSON di `portfolioData.js`
- Buka DevTools (F12) untuk error console

### WhatsApp link tidak berfungsi?
- Cek nomor format: harus `62XXXXXXXXXX` (tanpa +, spasi, atau -)
- Pastikan di perangkat terdapat aplikasi WhatsApp
- Desktop: akan buka web.whatsapp.com

### Gambar tidak tampil?
- Cek URL gambar (pastikan accessible)
- Ukuran file terlalu besar? Compress dulu
- Gunakan HTTPS URL untuk keamanan

---

## 📊 Analytics

Untuk tracking konversi WhatsApp:
1. Setup WhatsApp Business API (opsional)
2. Use Google Analytics event tracking
3. Track conversion funnels di dashboard

---

## 📝 Template Cepat Menambah Produk

Copas template ini dan edit sesuai kebutuhan:

```javascript
{
  id: 'prod-XXX',
  name: 'Nama Produk',
  category: 'fashion', // pilih: fashion, electronics, accessories, lifestyle
  price: 299000,
  originalPrice: 399000,
  discount: 25,
  description: 'Deskripsi singkat produk...',
  image: 'https://via.placeholder.com/300x240?text=Product',
  rating: 4.7,
  reviews: 50,
}
```

---

## 🎉 Siap! 

Storefront Anda sudah jalan! Sekarang tinggal:
1. Customize dengan produk & gambar Anda
2. Update WhatsApp number
3. Test & deploy! 🚀

Pertanyaan? Cek file component:
- `src/components/Storefront.jsx` - Logic
- `src/components/Storefront.module.css` - Styling
- `src/data/portfolioData.js` - Data produk
