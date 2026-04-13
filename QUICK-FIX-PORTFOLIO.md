# ⚡ Quick Start - Portfolio Data Tidak Tampil?

Ikuti langkah ini untuk cepat fix:

---

## 🎯 Quick Checklist

- [ ] 1. Dev server running? → `npm run dev` dari root folder
- [ ] 2. `.env` punya `VITE_SANITY_*` variables?
- [ ] 3. Sudah **RESTART dev server** setelah setup `.env`?
- [ ] 4. Data sudah ada di Sanity Studio dan **PUBLISHED**?
- [ ] 5. Kategori field sesuai: `webdesign`, `mobiledesign`, `seo`, `graphic`, dll?

---

## 🔑 3 Hal Paling Penting

### 1️⃣ Environment Variables (.env)

Harus ada di file `.env` di **root folder**:

```env
VITE_SANITY_PROJECT_ID=scenq4gg
VITE_SANITY_DATASET=production
VITE_SANITY_TOKEN=skCPX55dxgh9yhixdR87QMqY6Z77r1KiHIDZCPVg33xWY366w14WROGCAOPbUk9gTMGieGbBMVDflWnU6LVNwQdfWII0JFG7cSJyVqf7bJ17386paANbNlsOx7aexymOWZXylQc1vMy15s2Ubtg23YHf684mmRiDouBDz2cG7JmKNxuasxr2
```

✅ Check: Buka `.env` file dan pastikan ada 3 line ini

---

### 2️⃣ Restart Dev Server SETELAH Update .env

**PENTING:** Setelah update `.env`, HARUS restart:

```bash
# Di terminal/powershell
# 1. Tekan Ctrl+C untuk stop yang running
# 2. Jalankan lagi:
npm run dev
```

❌ Lupa restart = `.env` tidak ter-load = Sanity tidak connect

---

### 3️⃣ Data di Sanity Sudah di-PUBLISH

Di Sanity Studio:
- ✅ **Create** portfolio item
- ✅ Isi semua field (terutama: title, category, projectType, thumbnail, previewType)
- ✅ **PUBLISH** (bukan hanya Save Draft!)

Jika hanya draft, data tidak bisa di-fetch dari API.

---

## 🚀 Langkah Pertama

Buka **browser DevTools** (Tekan F12):

1. Buka **Console** tab
2. Cari message yang dimulai dengan `[Portfolio]`
3. Lihat apa yang ditampilkan:

### ✅ Berhasil (loading dari Sanity):
```
[Portfolio] Fetching from Sanity...
[Portfolio] Data received: 3 items
[Portfolio] Sanity data loaded successfully
```

### ⚠️ Fallback (pakai data lokal):
```
[Portfolio] Sanity not configured. Using fallback data.
```
→ Berarti `.env` tidak ter-load

### ❌ Error:
```
[Portfolio] Error fetching from Sanity: ...
```
→ Ada masalah connection, lihat error message-nya di bawah

---

## 🐛 Jika Masih Tidak Muncul

**Screenshot console message dan cek:**

1. **Sudah add data di Sanity?**
   - Login ke http://localhost:3333 atau https://sanity.io
   - Portfolio Items → berapa banyak item?
   - Kalo 0 → belum add data

2. **Data sudah PUBLISHED?**
   - Buka setiap item
   - Ada text "PUBLISHED" atau "Published"?
   - Kalo hanya "Draft" → klik Publish button

3. **Console message apa?**
   - Copy exact message dari console
   - Cek dengan ChatGPT atau dev yang familiar

4. **Network tab:**
   - Open DevTools → Network tab
   - Refresh page
   - Cari request ke `sanity.io` atau `scenq4gg`
   - Lihat response - ada data?

---

## 📖 Referensi Lengkap

- **Setup guide:** [PORTFOLIO-SETUP-GUIDE.md](./PORTFOLIO-SETUP-GUIDE.md)
- **Troubleshooting:** [PORTFOLIO-TROUBLESHOOTING.md](./PORTFOLIO-TROUBLESHOOTING.md)

---

## 💬 TL;DR

```bash
# 1. Setup .env dengan token
# 2. Restart dev server: npm run dev
# 3. Add data di Sanity Studio
# 4. Publish data
# 5. Refresh browser
# 6. Done!
```

Jika masih ada masalah, lihat troubleshooting guide atau contact support! 📞
