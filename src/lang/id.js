// ─────────────────────────────────────────────────────────────
//  id.js — Teks Bahasa Indonesia
//  Semua teks yang tampil di website versi Indonesia.
//  Untuk ubah teks, edit file ini saja.
// ─────────────────────────────────────────────────────────────

const id = {

  // ── Navbar ──────────────────────────────────────────────────
  nav: {
    home:        'Beranda',
    about:       'Tentang',
    resume:      'Resume',
    services:    'Layanan',
    portfolio:   'Portfolio',
    clients:     'Klien',
    blog:        'Blog',
    contact:     'Kontak',
  },

  // ── Hero ────────────────────────────────────────────────────
  hero: {
    available:   'Tersedia untuk Proyek Freelance',
    greeting:    "SAYA",
    typedWords:  ['UI Designer.', 'Web Designer.', 'Web Developer.'],
    desc:        'Fresh graduate web development dengan fondasi kuat dalam desain & pengembangan. Berbasis di Medan, Indonesia — membangun pengalaman digital yang bersih dan modern.',
    downloadCV:  '⬇ Unduh CV',
    getInTouch:  'Hubungi Saya →',
    stats: [
      { number: '25+', label: 'Proyek'  },
      { number: '27+', label: 'Klien'   },
      { number: '2+',  label: 'Tahun'   },
      { number: '4',   label: 'Layanan' },
    ],
  },

  // ── About ───────────────────────────────────────────────────
  about: {
    tag:         'Tentang Saya',
    title:       'Halo, Saya',
    desc:        'Seorang web designer dan developer yang bersemangat dari Medan, Indonesia. Lulusan Sistem Informasi dengan pengalaman langsung di UI/UX, desain grafis, dan pengembangan web.',
    badge:       'Proyek Selesai',
    downloadCV:  '⬇ Unduh CV',
    sendEmail:   '✉ Kirim Email',
    info: [
      { key: 'Tanggal Lahir', value: 'Juli 1999'              },
      { key: 'Usia',          value: '25'                      },
      { key: 'Jurusan',       value: 'Sistem Informasi'        },
      { key: 'Freelance',     value: 'Tersedia'                },
      { key: 'Lokasi',        value: 'Medan, Indonesia'        },
      { key: 'Email',         value: 'andreyulius@gmail.com'   },
    ],
    stats: [
      { icon: '⬇',  number: '2',   label: 'Unduhan' },
      { icon: '✏️', number: '25',  label: 'Proyek'  },
      { icon: '🏅', number: '20+', label: 'Penghargaan' },
      { icon: '😊', number: '27+', label: 'Klien'   },
    ],
  },

  // ── Resume ──────────────────────────────────────────────────
  resume: {
    tag:         'Resume',
    title:       'Resume',
    subtitle:    'Saya tersedia untuk proyek freelance',
    education:   'Pendidikan',
    experience:  'Pengalaman',
    skillsTitle: 'Keahlian',
    edu: [
      {
        title:  'Sarjana Sistem Informasi',
        period: '2020 – 2024',
        desc:   'Lulus dari STMK Triguna Dharma Medan dengan IPK 3.71/4.00. Fokus pada sistem informasi, pengembangan web, dan rekayasa perangkat lunak.',
      },
      {
        title:  'Universitas Mikroskil',
        period: '2017 – 2020',
        desc:   'Membangun fondasi yang kuat sebelum beralih ke pengalaman kerja profesional di bidang desain dan pengembangan.',
      },
    ],
    exp: [
      {
        title:  'Admin & Desain Grafis',
        period: 'Sekarang',
        desc:   'Bekerja di perusahaan perencanaan konstruksi — membuat desain grafis, menangani tugas admin, dan membantu survei lapangan.',
      },
      {
        title:  'Admin Penjualan & Media Sosial',
        period: '2023 – 2024',
        desc:   'Mengelola akun penjualan media sosial (live selling), melacak pembayaran, dan menangani inventaris toko sepatu bekas.',
      },
      {
        title:  'Magang Sysadmin & Keamanan Siber — Infinite Learning / IBM',
        period: '2022 – 2023',
        desc:   'Pengalaman langsung mengelola sistem IT, menjelajahi konsep AI, dan mempelajari ethical hacking.',
      },
      {
        title:  'Magang Web Design & UI/UX — PT. GLU',
        period: '2022 – 2023',
        desc:   'Membuat tata letak web responsif di startup berbasis Medan, berkolaborasi dengan developer dan tim produk.',
      },
      {
        title:  'Junior Web Developer — Freelance',
        period: '2019 – 2023',
        desc:   'Menangani proyek website untuk klien individu dan usaha kecil di berbagai industri.',
      },
    ],
  },

  // ── Services ─────────────────────────────────────────────────
  services: {
    tag:      'Yang Saya Lakukan',
    title:    'Layanan',
    subtitle: 'Layanan yang saya tawarkan kepada klien',
    items: [
      {
        icon:  '🎨',
        title: 'Desain Grafis',
        desc:  'Solusi visual kreatif untuk branding, materi pemasaran, dan aset digital dengan estetika yang menarik perhatian.',
      },
      {
        icon:  '💼',
        title: 'Portfolio Karya',
        desc:  'Tampilan karya terpilih yang menunjukkan keahlian dan kemampuan beragam di berbagai industri.',
      },
      {
        icon:  '📱',
        title: 'Tema Responsif',
        desc:  'Website yang sepenuhnya adaptif untuk pengalaman tampilan optimal di semua perangkat, dari desktop hingga mobile.',
      },
      {
        icon:  '🌐',
        title: 'Melampaui Batas',
        desc:  'Solusi inovatif yang melampaui batas melalui teknologi mutakhir dan pendekatan yang tidak konvensional.',
      },
    ],
  },

  // ── Portfolio ─────────────────────────────────────────────────
  portfolio: {
    tag:      'Karya Saya',
    title:    'Karya Kreatif',
    subtitle: 'Lihat karya-karya terbaik saya',
    filters: [
      { key: 'all',          label: 'Semua'          },
      { key: 'webdesign',    label: 'Web Design'     },
      { key: 'mobiledesign', label: 'Mobile Design'  },
      { key: 'seo',          label: 'SEO'            },
      { key: 'graphic',      label: 'Grafis'         },
    ],
  },

  // ── Testimonial ──────────────────────────────────────────────
  testimonial: {
    tag:      'Testimoni',
    title:    'Klien',
    subtitle: 'Apa yang klien saya katakan',
  },

  // ── Blog ─────────────────────────────────────────────────────
  blog: {
    tag:      'Blog',
    title:    'Berita Terbaru',
    subtitle: 'Lihat artikel blog terbaru saya',
    by:       'oleh Andrey',
    readMore: 'Baca Selengkapnya →',
    label:    'Artikel Blog',
    posts: [
      {
        title:   'Jadilah Versi Terbaik Dirimu',
        excerpt: 'Fokus pada kekuatanmu, kerjakan kelemahanmu, dan teruslah belajar.',
        content: 'Perjalanan menuju perbaikan diri berlangsung seumur hidup dan penuh manfaat. Fokus pada kekuatanmu, kerjakan kelemahanmu, dan teruslah belajar. Menuliskan tujuanmu menciptakan akuntabilitas dan memberimu peta jalan untuk diikuti. Mulailah dari hal kecil, tetap konsisten, dan rayakan setiap pencapaian.',
      },
      {
        title:   '5 Tips Desain UI/UX Web',
        excerpt: 'Selalu utamakan pengguna. Buat sederhana, intuitif, dan mudah diakses semua orang.',
        content: '1. Selalu utamakan pengguna.\n2. Buat sesederhana dan seintuitif mungkin.\n3. Gunakan pola desain yang konsisten.\n4. Buat dapat diakses oleh semua orang.\n5. Uji, iterasi, dan tingkatkan.\n\nDesain UI/UX yang baik bukan hanya tentang estetika — ini tentang menciptakan pengalaman yang menyenangkan dan memberdayakan pengguna.',
      },
      {
        title:   'Tuliskan Mimpimu',
        excerpt: 'Menuliskan mimpi dan tujuanmu adalah salah satu kebiasaan paling kuat yang bisa kamu kembangkan.',
        content: 'Menuliskan mimpi dan tujuanmu adalah salah satu kebiasaan paling kuat yang bisa kamu kembangkan. Ini memaksa kejelasan pikiran, menciptakan akuntabilitas, dan memberimu peta jalan yang jelas untuk diikuti. Mulailah dari mimpi kecil dan naik ke yang lebih besar. Tindakan menulis mengubah keinginan abstrak menjadi rencana konkret.',
      },
    ],
  },

  // ── Contact ──────────────────────────────────────────────────
  contact: {
    tag:         'Kontak',
    title:       'Hubungi Saya',
    subtitle:    'Jangan ragu untuk menghubungi saya kapan saja',
    colLeft:     'Mari Bekerja Sama',
    colLeftDesc: 'Fresh graduate pengembangan web dengan fondasi kuat dalam HTML/CSS/JavaScript. Mencari kesempatan untuk berkontribusi sambil belajar dari developer berpengalaman.',
    colRight:    'Bagaimana Saya Bisa Membantu?',
    info: [
      { icon: '📍', label: 'Alamat', value: 'Medan, Sumatera Utara, Indonesia' },
      { icon: '📞', label: 'Telepon', value: '+62 812-1100-XXXX'               },
      { icon: '✉️', label: 'Email',  value: 'andreyulius@gmail.com'            },
    ],
    form: {
      name:        'Nama Lengkap',
      namePh:      'Andrey Julius',
      email:       'Alamat Email',
      emailPh:     'kamu@contoh.com',
      message:     'Pesan',
      messagePh:   'Ceritakan tentang proyekmu...',
      send:        '✉ Kirim Pesan',
      sending:     '⏳ Mengirim...',
      successMsg:  '✅ Pesan terkirim! Saya akan segera membalas.',
      errorMsg:    '⚠️ Mohon isi semua kolom dengan benar.',
    },
  },

  // ── Footer ───────────────────────────────────────────────────
  footer: {
    copy: 'Dibuat dengan React. Hak cipta dilindungi.',
  },

}

export default id
