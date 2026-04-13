# 🖼️ Fix Portfolio Images - Sanity Studio Guide

Error di console: `Unable to resolve image URL from source`

**Penyebab:** Image di Sanity tidak ter-upload dengan benar atau asset reference tidak lengkap.

---

## ✅ Solusi: Re-upload Images di Sanity

### Step 1: Buka Sanity Studio

```bash
cd portfolio-blog-cms
npm run dev
```

Buka: http://localhost:3333

### Step 2: Edit Setiap Portfolio Item

1. Klik **"Portfolio Items"** di sidebar
2. Buka item yang ada error (lihat console apakah ada warning)
3. Field **"Thumbnail Image"** - cek apakah gambar sudah ter-upload?

### Step 3: Fix Thumbnail Image

**Jika gambar kosong atau error:**

1. Klik field **"Thumbnail Image"**
2. Klik **"X"** untuk hapus gambar yang error
3. Upload gambar baru:
   - Drag & drop image ke field
   - Atau klik "Upload"
4. Tunggu sampai upload selesai (lihat preview)
5. Klik **"Publish"** untuk save

### Step 4: Fix Gallery Images (jika ada)

Sama seperti thumbnail:

1. Klik field **"Gallery Images"** (jika ada)
2. Hapus gambar yang error
3. Re-upload gambar baru
4. **"Publish"** untuk save

### Step 5: Refresh Frontend

1. Buka browser di http://localhost:5173
2. Press **F5** untuk refresh
3. Lihat console - seharusnya `✅ Sanity data loaded successfully` sekarang

---

## 🎯 Checklist Setiap Item

Pastikan setiap portfolio item di Sanity memiliki:

- ✅ **Title** - ada nilai
- ✅ **Category** - dipilih (webdesign, graphic, dll)
- ✅ **Project Type** - dipilih (website, design, dll)
- ✅ **Thumbnail Image** - gambar ter-upload (bukan error)
- ✅ **Preview Type** - dipilih (iframe, image, video, gallery)
- ✅ **Preview URL** - ada nilai sesuai preview type
- ✅ **Status** - "Published" (bukan "Draft")

---

## 💡 Best Practices

- 📷 Gunakan gambar berukuran **400x300px** atau lebih untuk thumbnail
- 📦 Format file: **JPG, PNG, WebP** (hindari GIF besar)
- 🎨 Compress gambar sebelum upload (gunakan [TinyPNG](https://tinypng.com) atau [ImageOptim](https://imageoptim.com))
- 📝 Selalu **Publish** setelah edit data

---

## ✨ Verifikasi Berhasil

Di browser console (F12), seharusnya muncul:

```
[Portfolio] ✅ Sanity data loaded successfully 5 items
```

Dan portfolio items tampil di website dengan gambar.

---

## 🐛 Jika Masih Error

1. **Clear Sanity cache:**
   - Stop dev server (Ctrl+C)
   - Delete folder: `portfolio-blog-cms/.sanity`
   - Jalankan lagi: `npm run dev`

2. **Cek browser console di Sanity Studio:**
   - F12 → Console tab
   - Ada error message?
   - Screenshot dan cek

3. **Update schema:**
   ```bash
   cd portfolio-blog-cms
   npx sanity@latest schema validate
   ```

4. **Redeploy schema:**
   ```bash
   npx sanity@latest schema push
   ```

---

**Upload ulang setiap gambar, publish, lalu refresh frontend!** 🎉
