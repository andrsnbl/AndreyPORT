// ─────────────────────────────────────────────────────────────
//  portfolioData.js
//  Semua data konten portfolio disimpan di sini.
//  Jika ingin mengubah teks, cukup edit file ini saja.
// ─────────────────────────────────────────────────────────────

// Navigasi
export const NAV_LINKS = [
  { href: '#hero',        label: 'Home'     },
  { href: '#about',       label: 'About'    },
  { href: '#resume',      label: 'Resume'   },
  { href: '#services',    label: 'Services' },
  { href: '#portfolio',   label: 'Portfolio'},
  { href: '#testimonial', label: 'Clients'  },
  { href: '#blog',        label: 'Blog'     },
  { href: '#contact',     label: 'Contact'  },
]

// Hero — kata-kata yang diketik otomatis
export const TYPED_WORDS = [
  'UI Designer.',
  'Web Designer.',
  'Web Developer.',
]

// Hero — statistik singkat
export const HERO_STATS = [
  { number: '25+', label: 'Projects' },
  { number: '27+', label: 'Clients'  },
  { number: '2+',  label: 'Years'    },
  { number: '4',   label: 'Services' },
]

// About — informasi pribadi
export const ABOUT_INFO = [
  { key: 'Birthday',  value: 'July 1999'              },
  { key: 'Age',       value: '25'                      },
  { key: 'Degree',    value: 'Sistem Informasi'        },
  { key: 'Freelance', value: 'Available'               },
  { key: 'Location',  value: 'Medan, Indonesia'        },
  { key: 'Email',     value: 'andreyulius@gmail.com'   },
]

// About — kartu statistik bawah
export const ABOUT_STATS = [
  { icon: '⬇',  number: '2',   label: 'Downloads' },
  { icon: '✏️', number: '25',  label: 'Projects'  },
  { icon: '🏅', number: '20+', label: 'Awards'    },
  { icon: '😊', number: '27+', label: 'Clients'   },
]

// Resume — pendidikan
export const EDUCATION = [
  {
    title: 'Bachelor in Information Systems',
    period: '2020 – 2024',
    desc: 'Graduated from STMK Triguna Dharma Medan with a GPA of 3.71/4.00. Focused on information systems, web development, and software engineering.',
  },
  {
    title: 'Universitas Mikroskil',
    period: '2017 – 2020',
    desc: 'Started studies at Universitas Mikroskil, building a strong foundation before pivoting to professional work experience.',
  },
]

// Resume — pengalaman kerja
export const EXPERIENCE = [
  {
    title: 'Administrative & Graphic Design',
    period: 'Present',
    desc: 'Working at a construction planning firm — creating graphic designs, handling admin tasks, and assisting in site surveys.',
  },
  {
    title: 'Sales & Social Media Admin',
    period: '2023 – 2024',
    desc: 'Managed social media sales accounts (live selling), tracked incoming payments, and handled inventory for a secondhand shoe store.',
  },
  {
    title: 'Sysadmin & Cybersecurity Intern — Infinite Learning / IBM',
    period: '2022 – 2023',
    desc: 'Gained hands-on experience managing IT systems, exploring AI concepts, and studying ethical hacking at Infinite Learning.',
  },
  {
    title: 'Web Design & UI/UX Intern — PT. GLU',
    period: '2022 – 2023',
    desc: 'Created responsive web layouts at a Medan-based startup, collaborating closely with developers and product teams.',
  },
  {
    title: 'Junior Web Developer — Freelance',
    period: '2019 – 2023',
    desc: 'Handled website projects for individual and small business clients across various industries.',
  },
]

// Resume — skill bar
export const SKILLS = [
  { name: 'HTML',           pct: 95 },
  { name: 'CSS',            pct: 80 },
  { name: 'PHP',            pct: 80 },
  { name: 'jQuery',         pct: 60 },
  { name: 'Python',         pct: 85 },
  { name: 'JavaScript',     pct: 70 },
  { name: 'Microsoft Office', pct: 95 },
  { name: 'Photoshop',      pct: 85 },
]

// Services
export const SERVICES = [
  {
    icon:  '🎨',
    title: 'Graphic Design',
    desc:  'Creative visual solutions for branding, marketing materials, and digital assets with attention-grabbing aesthetics.',
  },
  {
    icon:  '💼',
    title: 'Portfolio of Works',
    desc:  'Curated showcase of completed projects demonstrating expertise and diverse capabilities across industries.',
  },
  {
    icon:  '📱',
    title: 'Responsive Theme',
    desc:  'Fully adaptive websites that deliver optimal viewing experience across all devices, from desktop to mobile.',
  },
  {
    icon:  '🌐',
    title: 'Go Beyond Limits',
    desc:  'Innovative solutions pushing boundaries through cutting-edge technologies and unconventional approaches.',
  },
]

// Portfolio — item karya
export const PORTFOLIO_ITEMS = [
  { img: '/img/portfolio/001.jpg', title: 'SEO Project',    cat: 'seo'          },
  { img: '/img/portfolio/002.jpg', title: 'Graphic Design', cat: 'graphic'      },
  { img: '/img/portfolio/003.jpg', title: 'Web Design',     cat: 'webdesign'    },
  { img: '/img/portfolio/004.jpg', title: 'Web Design',     cat: 'webdesign'    },
  { img: '/img/portfolio/005.jpg', title: 'Mobile Design',  cat: 'mobiledesign' },
  { img: '/img/portfolio/007.jpg', title: 'Web & SEO',      cat: 'webdesign'    },
  { img: '/img/portfolio/009.jpg', title: 'Mobile App',     cat: 'mobiledesign' },
  { img: '/img/portfolio/006.jpg', title: 'Mobile Web',     cat: 'mobiledesign' },
  { img: '/img/portfolio/008.jpg', title: 'Web & Mobile',   cat: 'webdesign'    },
]

// Portfolio — tombol filter
export const PORTFOLIO_FILTERS = [
  { key: 'all',          label: 'All'          },
  { key: 'webdesign',    label: 'Web Design'   },
  { key: 'mobiledesign', label: 'Mobile Design'},
  { key: 'seo',          label: 'SEO'          },
  { key: 'graphic',      label: 'Graphic'      },
]

// Testimonial
export const TESTIMONIALS = [
  {
    img:   '/img/client-01.png',
    name:  'Jane Doe',
    role:  'SEO Manager',
    quote: 'In a professional context it often happens that private or corporate clients order a publication to be made. Andrey delivered exceptional results.',
  },
  {
    img:   '/img/client-02.png',
    name:  'Andrey',
    role:  'UI Designer',
    quote: 'Andrey is a talented designer with great attention to detail. The project was delivered on time and exceeded our expectations.',
  },
  {
    img:   '/img/client-03.png',
    name:  'Jully Doe',
    role:  'UX Designer',
    quote: 'Working with Andrey was a great experience. His design sense and technical knowledge are top notch.',
  },
  {
    img:   '/img/client-04.png',
    name:  'Mike Smith',
    role:  'Product Manager',
    quote: 'Highly recommended! Andrey brought creative ideas and professional execution to our project.',
  },
]

// Blog — artikel
export const BLOG_POSTS = [
  {
    img:     '/img/blog-img-01.jpg',
    title:   'Be Your Best Version',
    excerpt: 'Focus on your strengths, work on your weaknesses, and always keep learning.',
    content: 'The journey to self-improvement is lifelong and rewarding. Focus on your strengths, work on your weaknesses, and always keep learning. Writing down your goals creates accountability and gives you a roadmap to follow. Start small, stay consistent, and celebrate every milestone along the way.',
  },
  {
    img:     '/img/blog-img-02.jpg',
    title:   '5 Tips In UI/UX Web Design',
    excerpt: 'Always put the user first. Keep it simple, intuitive, and accessible to everyone.',
    content: '1. Always put the user first.\n2. Keep it simple and intuitive.\n3. Use consistent design patterns.\n4. Make it accessible to everyone.\n5. Test, iterate, and improve.\n\nGood UI/UX design is not just about aesthetics — it is about creating experiences that delight and empower users.',
  },
  {
    img:     '/img/blog-img-03.jpg',
    title:   'Write Your Dreams',
    excerpt: 'Writing down your dreams and goals is one of the most powerful habits you can develop.',
    content: 'Writing down your dreams and goals is one of the most powerful habits you can develop. It forces clarity of thought, creates accountability, and gives you a clear roadmap to follow. Start with small dreams and work your way up. The act of writing transforms abstract wishes into concrete plans.',
  },
]

// Contact — info
export const CONTACT_INFO = [
  { icon: '📍', label: 'Address', value: 'Medan, North Sumatera, Indonesia' },
  { icon: '📞', label: 'Phone',   value: '+62 812-1100-XXXX'                },
  { icon: '✉️', label: 'Email',   value: 'andreyulius@gmail.com'            },
]

// Contact — social media
export const SOCIAL_LINKS = [
  { icon: '📸', href: 'https://www.instagram.com/andreyulius8',         label: 'Instagram' },
  { icon: '🐱', href: 'https://github.com/ucoktebas00',                 label: 'GitHub'    },
  { icon: '💼', href: 'https://www.linkedin.com/in/andreysinambela',    label: 'LinkedIn'  },
]

// EmailJS credentials
export const EMAILJS_CONFIG = {
  publicKey:  'RStndPUO0m7CSmmFp',
  serviceId:  'service_wzvlg6u',
  templateId: 'template_cet5bxp',
}
