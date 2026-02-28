# Andrey Julius — Portfolio (React + Vite)

Portfolio pribadi yang dibangun dengan **React** dan **Vite**, siap di-deploy ke **Netlify**.

---

## 📁 Struktur Project

```
portfolio-react/
│
├── index.html                  ← Entry point HTML
├── vite.config.js              ← Konfigurasi Vite
├── package.json                ← Dependencies project
├── netlify.toml                ← Konfigurasi deploy Netlify
│
├── public/                     ← File statis (gambar, PDF)
│   ├── img/
│   │   ├── Judol.png           ← Foto profil hero
│   │   ├── judul.png           ← Foto about
│   │   ├── blog-img-01.jpg     ← Gambar blog
│   │   ├── blog-img-02.jpg
│   │   ├── blog-img-03.jpg
│   │   ├── client-01.png       ← Foto testimonial
│   │   ├── client-02.png
│   │   ├── client-03.png
│   │   ├── client-04.png
│   │   └── portfolio/
│   │       ├── 001.jpg – 009.jpg  ← Gambar karya
│   └── ResumeCV-Andrey.pdf     ← File CV untuk didownload
│
└── src/
    ├── main.jsx                ← Entry point React
    ├── App.jsx                 ← Root komponen (menyatukan semua)
    │
    ├── data/
    │   └── portfolioData.js    ← ✏️ EDIT DI SINI untuk ubah konten
    │
    ├── hooks/
    │   ├── useTyped.js         ← Hook: efek ketik otomatis (Hero)
    │   └── useScrollAnimation.js ← Hook: animasi fade-in saat scroll
    │
    ├── styles/
    │   └── global.css          ← CSS global, variabel tema, animasi
    │
    └── components/             ← Satu file per section
        ├── Navbar.jsx          ← Navigasi atas
        ├── Navbar.module.css
        ├── Hero.jsx            ← Section pertama (nama + orbit)
        ├── Hero.module.css
        ├── About.jsx           ← Info pribadi
        ├── About.module.css
        ├── Resume.jsx          ← Timeline & skill bars
        ├── Resume.module.css
        ├── Services.jsx        ← 4 kartu layanan
        ├── Services.module.css
        ├── Portfolio.jsx       ← Grid karya + filter + lightbox
        ├── Portfolio.module.css
        ├── Testimonial.jsx     ← Kartu klien
        ├── Testimonial.module.css
        ├── Blog.jsx            ← Kartu artikel + modal
        ├── Blog.module.css
        ├── Contact.jsx         ← Peta + form EmailJS
        ├── Contact.module.css
        ├── Footer.jsx          ← Footer bawah
        ├── Footer.module.css
        ├── ScrollTop.jsx       ← Tombol kembali ke atas
        └── ScrollTop.module.css
```

---

## 🚀 Cara Jalankan Lokal

```bash
# 1. Masuk ke folder project
cd portfolio-react

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev

# 4. Buka di browser
# http://localhost:5173
```

---

## 🌐 Deploy ke Netlify

### Cara 1: Drag & Drop (Paling Mudah)
1. Jalankan build: `npm run build`
2. Buka **https://app.netlify.com** → Login
3. Klik **"Add new site" → "Deploy manually"**
4. Drag & drop folder **`dist/`** ke area upload
5. Selesai! Netlify langsung kasih URL gratis

### Cara 2: Via GitHub (Otomatis Deploy)
1. Push folder ini ke GitHub repo
2. Di Netlify: "Add new site" → "Import from Git"
3. Pilih repo → **Build command:** `npm run build` → **Publish dir:** `dist`
4. Klik Deploy → setiap push otomatis deploy ulang

---

## ✏️ Cara Edit Konten

Semua teks, data, dan link tersimpan di satu file:

```
src/data/portfolioData.js
```

Cukup edit file itu untuk mengubah:
- Nama, deskripsi, info pribadi
- Pengalaman & pendidikan
- Skill dan persentasenya
- Item portfolio
- Testimonial klien
- Artikel blog
- Info kontak & sosial media

---

## ✨ Fitur

| Fitur | Keterangan |
|---|---|
| 🌙 Dark / Light Mode | Toggle di navbar kanan atas |
| 🎞 Scroll Animations | Setiap section fade-in saat di-scroll |
| 🔤 Typing Animation | Teks berubah otomatis di Hero |
| 🖼 Portfolio Lightbox | Klik gambar → tampil full screen |
| 🔍 Filter Portfolio | Saring karya berdasarkan kategori |
| 📝 Blog Modal | Klik "Read More" → buka artikel |
| ✉ Contact Form | Kirim pesan via EmailJS |
| 📱 Responsive | Tampil optimal di semua ukuran layar |
| ⬆ Scroll to Top | Tombol muncul saat scroll ke bawah |

---

## 🛠 Tech Stack

- **React 18** — library UI
- **Vite 5** — build tool cepat
- **CSS Modules** — styling per komponen (tidak tabrakan)
- **EmailJS** — form kontak tanpa backend
- **Google Fonts** — Syne + DM Sans
