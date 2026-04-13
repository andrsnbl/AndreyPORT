# Panduan Setup Portfolio dari Sanity CMS

Sekarang portfolio Anda dapat dikelola dari **Sanity CMS** tanpa perlu hardcode! 🎉

## ✅ Apa yang Sudah Dilakukan

Saya telah setup sistem seperti ini:

```
┌─ Sanity CMS Backend ────────────────┐
│  (Tempat menambah/edit portfolio)  │
│  - Schema: Portfolio                │
│  - Fields: Title, Category, etc     │
└────────┬───────────────────────────┘
         │
         └─→ API Query (GROQ)
                │
         ┌──────▼────────┐
         │ usePortfolio  │  (Hook autofetch)
         └──────┬────────┘
                │
         ┌──────▼──────────────┐
         │ Portfolio Component │
         │ (Display items)     │
         └─────────────────────┘
```

## 🚀 Langkah-Langkah Setup

### 0. ⚠️ PENTING: Restart Dev Server Setelah Update `.env`

Setelah setup environment variables, **HARUS restart dev server:**

```bash
# Buka terminal baru atau stop yang sekarang dengan Ctrl+C
npm run dev
```

Dev server perlu restart untuk load `.env` file yang baru.

### 1. Deploy Schema ke Sanity (Sekali kali)

Buka terminal di folder `portfolio-blog-cms` dan jalankan:

```bash
npx sanity@latest schema push
```

Atau jika dari root folder:

```bash
cd portfolio-blog-cms
npx sanity@latest schema push
```

Pilih **"Yes"** saat ditanya untuk deploy.

### 2. Login ke Sanity Studio

Akses Sanity Studio Anda dengan membuka:
- **Local:** `http://localhost:3333` (atau lihat terminal saat jalankan `npm run dev`)
- **URL:** `https://sanity.io/` 

Di dashboard, pilih project `portfolio-react`.

### 3. Tambah Portfolio Items

Di Sanity Studio:

1. Klik **"Portfolio Items"** di menu kiri
2. Klik **"Create"** atau **"+"**
3. Isi form dengan data project Anda:

**Contoh 1 - Website dengan Preview Iframe:**
```
Title: Toko Online E-Commerce
Category: Web Design
Project Type: Website
Thumbnail: [Upload gambar preview]
Preview Type: Website (iframe)
Preview URL: https://example-ecommerce.com
External Link: https://example-ecommerce.com
Technologies: React, Node.js, MongoDB
Description: Website e-commerce dengan fitur keranjang belanja...
```

**Contoh 2 - Design/Fotografi:**
```
Title: Brand Identity Design
Category: Graphic Design
Project Type: Design
Thumbnail: [Upload gambar]
Preview Type: Image
Preview URL: [URL gambar] atau upload langsung
Technologies: Figma, Adobe XD
Description: Identitas visual untuk brand fashion...
```

**Contoh 3 - Video Presentation:**
```
Title: Mobile App Demo
Category: Mobile Design
Project Type: Video
Thumbnail: [Upload thumbnail]
Preview Type: Video (YouTube)
Preview URL: https://www.youtube.com/embed/VIDEO_ID
External Link: https://your-app-link.com
Description: Demo aplikasi mobile untuk booking...
```

**Contoh 4 - Gallery Multiple Images:**
```
Title: Photography Portfolio
Category: Photography
Project Type: Photography
Thumbnail: [Upload gambar utama]
Preview Type: Gallery
Gallery Images: [Upload multiple images] ← Navigasi dengan prev/next
Description: Koleksi fotografi produk...
```

### 4. Enviroment Variables

Pastikan `.env` file sudah memiliki variable ini:

```env
VITE_SANITY_PROJECT_ID=scenq4gg
VITE_SANITY_DATASET=production
VITE_SANITY_TOKEN=your_token_here
```

Jika belum punya token, buat di:
1. Sanity dashboard → Project settings → API keys
2. Buat "Read" token baru
3. Copy ke `.env`

### 5. Deploy Schema (Alternative - Jika schema push tidak berhasil)

Anda bisa deploy schema langsung dari code:

```bash
npm run deploy-schema
```

(Pastikan script ini ada di `package.json` atau buat manual)

---

## 📋 Field Explanation

| Field | Penjelasan |
|-------|-----------|
| **Title** | Nama project |
| **Slug** | URL-friendly name (auto dari title) |
| **Category** | Kategori: webdesign, mobiledesign, seo, graphic, photography, video, branding |
| **Project Type** | Tipe: website, design, photography, video, app, other |
| **Thumbnail** | Gambar preview di list portfolio |
| **Preview Type** | Cara tampilkan preview - iframe/image/video/gallery |
| **Preview URL** | URL untuk preview (website, video, atau image path) |
| **Gallery Images** | Untuk tipe "gallery" - upload multiple images |
| **External Link** | Link ke website/app Anda (optional) |
| **Technologies** | Stack yang digunakan (React, Python, dsb) |
| **Featured** | Tandai jika ingin di featured |
| **Display Order** | Urutan tampilan (0, 1, 2, ...) |
| **Description** | Deskripsi panjang tentang project |

---

## 🔄 Workflow

1. **Edit di Sanity Studio** → Langsung tersimpan
2. **Frontend refresh** → Data otomatis ter-fetch
3. **Tidak perlu deploy ulang** (unless schema berubah)

---

## 🎨 Preview Types Explained

### 1. **iframe** (Website Live)
```
Preview URL: https://your-website.com
```
Website akan ditampilkan langsung di modal

### 2. **image** (Gambar/Design)
```
Preview URL: /img/portfolio/design.jpg
atau https://your-url.com/image.jpg
```
Menampilkan satu gambar

### 3. **video** (YouTube)
```
Preview URL: https://www.youtube.com/embed/dQw4w9WgXcQ
```
Video YouTube akan ditampilkan

### 4. **gallery** (Multiple Images)
Upload di field **Gallery Images**, user bisa navigasi dengan prev/next button

---

## 🐛 Troubleshooting

### Portfolio tidak muncul?
1. Pastikan project di Sanity sudah have data
2. Check `.env` variables sudah benar
3. Lihat browser console untuk error
4. Restart dev server: `npm run dev`

### Gambar tidak loading?
1. URL gambar harus accessible (public)
2. Untuk Sanity image: gunakan image builder (sudah otomatis di code)

### Filter tidak bekerja?
1. Pastikan field `category` di Sanity matches dengan kategori yang ada
2. Format: `webdesign`, `mobiledesign`, `seo`, `graphic` (lowercase, no spaces)

---

## 💡 Tips

- ✅ Gunakan **Display Order** untuk atur urutan tampilan
- ✅ Set **Featured: true** untuk project istimewa
- ✅ Rapi semua data di Sanity sebelum publish
- ✅ Test preview types sebelum finalisasi
- ✅ Gunakan alt text untuk accessibility

---

## 📞 Next Steps

Setelah setup:
1. ✅ Deploy schema ke Sanity
2. ✅ Tambahkan beberapa portfolio items
3. ✅ Test filter dan preview modal
4. ✅ Customize warna/styling jika perlu

**Happy uploading!** 🚀
