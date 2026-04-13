# 🔧 Portfolio Sanity - Troubleshooting Guide

Data sudah ditambahkan ke Sanity tetapi **tidak tampil di frontend**? Mari debug bersama! 

---

## 📋 Checklist Diagnosis

### ✅ Step 1: Verifikasi Data Sudah Tersimpan di Sanity

1. Buka [https://manage.sanity.io](https://manage.sanity.io/)
2. Pilih project **scenq4gg**
3. Klik **Studio** atau go to http://localhost:3333 (jika local)
4. Di sidebar, cari **"Portfolio Items"** atau **"Portfolio"**
5. Pastikan ada data yang sudah Anda buat

**Jika tidak ada:**
- Berarti belum add data
- Klik **"Create"** atau **"+"** untuk tambah portfolio item baru
- Isi semua field yang wajib (marked with *)
- Klik **"Publish"**

---

### ✅ Step 2: Pastikan Schema Sudah Deploy ke Sanity

Schema mungkin belum di-push ke cloud. Jalankan:

```bash
cd portfolio-blog-cms
npx sanity@latest schema push
```

Atau jika menggunakan Sanity Studio:
1. Buka terminal di folder `portfolio-blog-cms`
2. Jalankan: `npm run dev`
3. Studio akan memberi notifikasi jika ada schema yang belum di-sync
4. Klik tombol **"Deploy"** atau follow instruksi di UI

---

### ✅ Step 3: Cek Environment Variables

Pastikan `.env` file di root folder punya:

```env
VITE_SANITY_PROJECT_ID=scenq4gg
VITE_SANITY_DATASET=production
VITE_SANITY_TOKEN=YOUR_TOKEN_HERE
```

**Bagaimana dapat TOKEN?**
1. Buka https://manage.sanity.io/
2. Pilih project **scenq4gg**
3. Settings → API keys
4. Create new API token dengan access **Read**
5. Copy token dan paste ke `.env`

**Verifikasi:**
- Jangan ada typo di `.env`
- Project ID: `scenq4gg`
- Dataset: `production` (default)
- Token harus dapat akses "Read" minimal

---

### ✅ Step 4: Restart Frontend Dev Server

Setelah update `.env`, **HARUS restart** dev server:

```bash
# Dari folder root project
npm run dev
```

Jika belum restart, `.env` tidak akan ter-load.

---

### ✅ Step 5: Debug dengan Console

Buka **Browser DevTools** (F12) → Console tab

Cari log messages seperti:
```
[Portfolio] Fetching from Sanity...
[Portfolio] Data received: 3 items
[Portfolio] Sanity data loaded successfully
```

**Jika ada error:**
```
[Portfolio] Error fetching from Sanity: ...
[Portfolio] Falling back to local data
```

Berarti ada masalah dengan Sanity connection.

---

## 🐛 Common Issues & Solutions

### Issue 1: "Sanity not configured"

**Gejala:** 
- Console: `Sanity not configured`
- Portfolio menampilkan data default

**Solusi:**
1. Cek `.env` file:
   ```bash
   cat .env | grep SANITY
   ```
2. Pastikan 3 line ini ada dan benar:
   ```env
   VITE_SANITY_PROJECT_ID=scenq4gg
   VITE_SANITY_DATASET=production
   VITE_SANITY_TOKEN=skCPX...
   ```
3. Restart dev server: `npm run dev`

---

### Issue 2: "Error: unauthorized"

**Gejala:**
- Console: `Error: 401 Unauthorized`
- Data tidak muncul

**Solusi:**
1. Token tidak valid atau tidak punya permission
2. Buat token baru:
   - Manage.sanity.io → API keys
   - Delete token lama
   - Create "Read" token baru
   - Copy ke `.env`
3. Restart dev server

---

### Issue 3: "CORS error" atau "not accessible"

**Gejala:**
- Console: `CORS error` atau `network error`

**Solusi:**
1. Sanity support CORS by default - cek network tab di DevTools
2. Pastikan internet connection OK
3. Cek apakah Sanity API endpoint accessible:
   ```
   https://scenq4gg.api.sanity.io/v2024-01-01/data/query/production
   ```

---

### Issue 4: Data di Sanity tapi tidak tampil di frontend

**Gejala:**
- Sanity Studio menunjukkan data
- Frontend menampilkan loading terus atau kosong
- Console tidak ada error yang jelas

**Solusi:**

1. **Clear cache browser:**
   - Buka DevTools (F12)
   - Right-click refresh button → **"Empty Cache and Hard Refresh"**
   - Atau tekan `Ctrl+Shift+Delete`

2. **Cek kategori field:**
   - Data harus punya `category` field yang benar
   - Pastikan category value cocok dengan filter list:
     - `webdesign`
     - `mobiledesign`
     - `seo`
     - `graphic`
     - `photography`
     - `video`
     - `branding`
   - Case-sensitive! Harus lowercase, no spaces

3. **Cek field types:**
   - `projectType` harus diisi (website, design, photography, dll)
   - `previewType` harus diisi (iframe, image, video, gallery)
   - `thumbnail` harus punya image

4. **Check console log lagi:**
   ```
   [Portfolio] Data received: X items
   ```
   Berapa jumlah items? Sesuai dengan yang di Sanity?

---

### Issue 5: "Sanity returned empty"

**Gejala:**
- Console: `Sanity returned empty. Using fallback data.`
- Tampil data default, bukan dari Sanity

**Sebab:**
1. Query GROQ kosong - tidak ada data di Sanity
2. Token tidak punya akses

**Solusi:**
1. Cek apakah sudah add data di Sanity Studio
2. Publish data (jangan hanya save draft)
3. Tunggu beberapa detik, refresh page
4. Cek token permission

---

## 🔍 Advanced Debugging

### Open Debug Panel

Saya sudah buat debug page untuk monitoring. Untuk akses:

1. **Edit `src/App.jsx`** - tambahkan route debug:

```jsx
// Tambahkan ini di App.jsx, setelah import:
import DebugPortfolio from './pages/DebugPortfolio'

// Di component, tambahkan:
const [showDebug, setShowDebug] = useState(false)

// Di JSX return, sebelum Footer:
{showDebug && <DebugPortfolio />}

// Tekan tombol debug (optional):
{/* Or add link: */}
<button onClick={() => setShowDebug(!showDebug)}>
  DEBUG
</button>
```

2. **Atau akses direct** dengan import temporary:
```jsx
// Di App.jsx:
import DebugPortfolio from './pages/DebugPortfolio'

export default function App() {
  return <DebugPortfolio /> // Tampilkan debug page
}
```

Debug panel akan menampilkan:
- Sanity connection status
- Berapa items di database
- Detail setiap item
- Environment variables check

---

## 📞 Step-by-Step Fix untuk Common Scenario

### Scenario: "Sudah add data tapi tidak muncul"

1. **Buka terminal** di folder root:
   ```bash
   npm run dev
   ```

2. **Buka browser**, lihat console (F12):
   ```
   [Portfolio] Fetching from Sanity...
   ```

3. **Tunggu response:**
   - Kalau muncul `Data received: 0 items` → data emang belum di Sanity
   - Kalau muncul `Data received: 3 items` → data ada tapi ada bug parsing
   - Kalau error → ada masalah connection/token

4. **Kalo "0 items":**
   - Buka Sanity Studio
   - Create portfolio item baru (yang benar)
   - Publish
   - Refresh frontend

5. **Kalo ada items tapi tidak muncul:**
   - Check console lebih detail
   - Lihat di Network tab: apakah Sanity API di-call?
   - Response dari Sanity apa isi-nya?

6. **Kalo ada error:**
   - Copy error message
   - Check di section "Common Issues" di atas
   - Follow solution-nya

---

## ✅ Verifikasi Berhasil

Jika setup berhasil, seharusnya di console Anda lihat:

```
[Portfolio] Fetching from Sanity...
[Portfolio] Data received: X items
[Portfolio] Sanity data loaded successfully
```

Dan di website, section Portfolio menampilkan item-item dari Sanity, bukan data default.

---

## 💡 Tips

- ✅ **Selalu publish** data di Sanity (jangan hanya draft)
- ✅ **Wait a few seconds** setelah publish sebelum refresh
- ✅ **Restart dev server** setelah update `.env`
- ✅ **Clear browser cache** jika ada problem
- ✅ **Check console regularly** untuk melihat log debug

---

## 🆘 Masih Tidak Berhasil?

Cek ini:

1. **Console message apa yang muncul?** (Copy-paste di sini)
2. **Error message apa?** (Copy-paste full error)
3. **Berapa items di Sanity?** (Confirm dari Studio)
4. **Token valid?** (Test di Sanity API docs)

Dengan info ini saya bisa bantu debug lebih lanjut!
