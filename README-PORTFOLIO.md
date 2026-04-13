# 📋 Portfolio Sanity CMS - Complete Setup Summary

---

## 🎯 Masalah: Data di Sanity Tidak Tampil di Frontend

Jangan khawatir! Ini biasanya karena 3 hal:

1. ❌ `.env` tidak ter-setup
2. ❌ Dev server belum ter-restart setelah `.env` update
3. ❌ Data di Sanity belum di-PUBLISH

---

## ✅ Solusi Cepat (3 Langkah)

### Langkah 1: Pastikan `.env` Setup Benar

Buka file `.env` di **root folder** (not in portfolio-blog-cms).

Pastikan ini ada:

```env
VITE_SANITY_PROJECT_ID=scenq4gg
VITE_SANITY_DATASET=production
VITE_SANITY_TOKEN=skCPX55dxgh9yhixdR87QMqY6Z77r1KiHIDZCPVg33xWY366w14WROGCAOPbUk9gTMGieGbBMVDflWnU6LVNwQdfWII0JFG7cSJyVqf7bJ17386paANbNlsOx7aexymOWZXylQc1vMy15s2Ubtg23YHf684mmRiDouBDz2cG7JmKNxuasxr2
```

✅ Jika belum ada 3 line ini → add merge/replace sekarang

❓ Mau token baru? → Lihat PORTFOLIO-TROUBLESHOOTING.md section "Issue 2"

---

### Langkah 2: **RESTART Dev Server**

⚠️ **INI PALING PENTING!**

```bash
# Di terminal/PowerShell di root folder:
# 1. Tekan Ctrl+C (untuk stop yang running)
# 2. Jalankan:

npm run dev
```

**Jangan lanjut sampai dev server selesai start** (tunggu sampai muncul "Local: http://...")

---

### Langkah 3: Publish Data di Sanity Studio

1. Buka Sanity Studio:
   - **Local:** http://localhost:3333
   - **Online:** https://manage.sanity.io/ → select project

2. Di sidebar → **"Portfolio Items"** atau **"Portfolio"**

3. Klik portfolio item yang ingin lihat di public

4. Di atas, ada text "Draft" atau "Published"?

5. Jika "Draft" → klik tombol **"Publish"**

6. Tunggu sampai status menjadi **"Published"**

7. Refresh browser frontend (http://localhost:5174)

---

## 🔍 Verify Berhasil

Buka browser → Press **F12** → Go to **Console** tab

Cari message yang dimulai dengan `[Portfolio]`:

### ✅ Berhasil:
```
[Portfolio] Fetching from Sanity...
[Portfolio] Data received: 5 items
[Portfolio] Sanity data loaded successfully
```

### ⚠️ Fallback (pakai data lokal):
```
[Portfolio] Sanity not configured. Using fallback data.
```
→ `.env` belum setup atau dev server belum ter-restart

### ❌ Ada Error:
```
[Portfolio] Error fetching from Sanity: Error: 401 Unauthorized
```
→ Token tidak valid atau tidak punya akses

---

## 📋 Full Documentation Files

| File | Guna |
|------|------|
| [PORTFOLIO-SETUP-GUIDE.md](./PORTFOLIO-SETUP-GUIDE.md) | Setup lengkap dari awal |
| [PORTFOLIO-TROUBLESHOOTING.md](./PORTFOLIO-TROUBLESHOOTING.md) | Debugging & common issues |
| [QUICK-FIX-PORTFOLIO.md](./QUICK-FIX-PORTFOLIO.md) | Quick reference checklist |
| [check-portfolio-setup.bat](./check-portfolio-setup.bat) | Auto-diagnostic (Windows) |
| [check-portfolio-setup.sh](./check-portfolio-setup.sh) | Auto-diagnostic (Mac/Linux) |

---

## 🆘 Masih Tidak Berhasil?

Follow this tree:

```
Data tidak muncul?
│
├─ Console punya [Portfolio] message?
│  ├─ YES → Apa isi message?
│  │  ├─ "Sanity configured" → Ada data di Sanity?
│  │  │  ├─ YES & PUBLISHED → Lihat Network tab, ada response dari Sanity?
│  │  │  └─ NO → Add & publish data di Sanity Studio
│  │  ├─ "Sanity not configured" → Restart dev server!
│  │  └─ "Error: 401" atau "Error: ..." → Token issue, lihat Troubleshooting
│  │
│  └─ NO → Bukan app load? Check:
│     ├─ Dev server running?
│     ├─ Port 5173 atau 5174 correct?
│     └─ Frontend file ada di http://localhost:...?
│
└─ Lihat PORTFOLIO-TROUBLESHOOTING.md bagian "Common Issues"
```

---

## 🚀 Architecture Overview

```
┌─────────────────────────────────────┐
│     Your Computer                   │
├─────────────────────────────────────┤
│                                     │
│  frontend (http://localhost:5174)   │
│  ├─ Portfolio.jsx                   │
│  ├─ usePortfolio.js (Hook)          │
│  └─ .env (environment vars)         │
│                                     │
│  "I need portfolio data"            │
│         │                           │
│         ↓                           │
│  "Fetch from Sanity API"            │
│         │                           │
└─────────┼──────────────────────────┘
          │
          │ (HTTPS)
          ↓
┌─────────────────────────────────────┐
│     Sanity Cloud (scenq4gg)         │
├─────────────────────────────────────┤
│  API: scenq4gg.api.sanity.io        │
│  Database: production               │
│  Data: Portfolio Items (JSON)       │
└─────────────────────────────────────┘
```

---

## 💡 Tips & Tricks

- ✅ **Setup sekali saja** - environment variables tidak perlu di-update setiap hari
- ✅ **Sanity Studio lokal** - testing lebih cepat dengan `npm run dev` di portfolio-blog-cms folder
- ✅ **Fallback data siap** - jika Sanity offline/error, data lokal dari `portfolioData.js` akan ditampilkan automatically
- ✅ **Real-time updates** - refresh browser setelah publish di Sanity, data langsung update (no redeploy needed)
- ✅ **Debug console** - always check console messages di DevTools, biasanya ada clue kesalahan di situ

---

## 📞 Quick Commands

```bash
# Start frontend dev server:
npm run dev

# Start Sanity Studio:
cd portfolio-blog-cms
npm run dev

# Deploy schema to Sanity:
cd portfolio-blog-cms
npx sanity@latest schema push

# Check setup (Windows):
.\check-portfolio-setup.bat

# Check setup (Mac/Linux):
bash check-portfolio-setup.sh
```

---

## ✨ What's Working

✅ Portfolio data fetched from Sanity  
✅ Fallback to local data if Sanity unavailable  
✅ Multiple preview types: iframe, image, video, gallery  
✅ Auto-generate image thumbnails  
✅ Filter by category  
✅ Responsive design  
✅ Debug logging in console  

---

## 🎓 Learning Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [React Hooks](https://react.dev/reference/react)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-modes.html)

---

**Happy coding! 🚀**

Jika masih ada pertanyaan, silakan create issue atau contact maintainer.
