// Data non-translatable (angka, key, asset path, link)

export const NAV_LINKS = [
  { href: '#hero', key: 'home' },
  { href: '#about', key: 'about' },
  { href: '#resume', key: 'resume' },
  { href: '#services', key: 'services' },
  { href: '#portfolio', key: 'portfolio' },
  { href: '#testimonial', key: 'clients' },
  { href: '#blog', key: 'blog' },
  { href: '#contact', key: 'contact' },
]

export const TYPED_WORDS = [
  'UI Designer.',
  'Web Designer.',
  'Web Developer.',
]

export const HERO_STATS = [
  { number: '25+', key: 'projects' },
  { number: '27+', key: 'clients' },
  { number: '2+', key: 'years' },
  { number: '4', key: 'services' },
]

export const ABOUT_INFO = [
  { key: 'birthday', value: 'July 1999' },
  { key: 'age', value: '25' },
  { key: 'degree', value: 'Sistem Informasi' },
  { key: 'freelance', value: 'Available' },
  { key: 'location', value: 'Medan, Indonesia' },
  { key: 'email', value: 'andreyulius8@gmail.com' },
]

export const ABOUT_STATS = [
  { icon: '⬇', number: '2', key: 'downloads' },
  { icon: '✏️', number: '25', key: 'projects' },
  { icon: '🏅', number: '20+', key: 'awards' },
  { icon: '😊', number: '27+', key: 'clients' },
]

// Resume — pendidikan
export const EDUCATION = [
  {
    key: 'infoSystems',
    period: '2020 – 2024',
  },
  {
    key: 'mikroskil',
    period: '2017 – 2020',
  },
]

// Resume — pengalaman kerja
export const EXPERIENCE = [
  {
    key: 'adminGraphic',
    period: 'Present',
  },
  {
    key: 'salesSocial',
    period: '2023 – 2024',
  },
  {
    key: 'sysadminIntern',
    period: '2022 – 2023',
  },
  {
    key: 'uiuxIntern',
    period: '2022 – 2023',
  },
  {
    key: 'juniorFreelance',
    period: '2019 – 2023',
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
    key: 'graphicDesign',
    icon: '🎨',
  },
  {
    key: 'portfolioWorks',
    icon: '💼',
  },
  {
    key: 'responsiveTheme',
    icon: '📱',
  },
  {
    key: 'goBeyondLimits',
    icon: '🌐',
  },
]

// Portfolio — item karya
export const PORTFOLIO_ITEMS = [
  {
    id: 1,
    img: '/img/portfolio/001.jpg',
    title: 'SEO Project',
    cat: 'seo',
    type: 'website',
    previewType: 'iframe', // 'image', 'iframe', 'video', 'html'
    previewUrl: 'https://example-seo.com',
    description: 'SEO optimization project untuk meningkatkan ranking',
  },
  {
    id: 2,
    img: '/img/portfolio/002.jpg',
    title: 'Graphic Design',
    cat: 'graphic',
    type: 'design',
    previewType: 'image',
    previewUrl: '/img/portfolio/002.jpg',
    description: 'Desain grafis untuk brand identity',
  },
  {
    id: 3,
    img: '/img/portfolio/003.jpg',
    title: 'Web Design',
    cat: 'webdesign',
    type: 'website',
    previewType: 'iframe',
    previewUrl: 'https://example-website.com',
    description: 'Website design responsif dengan konsep modern',
  },
  {
    id: 4,
    img: '/img/portfolio/004.jpg',
    title: 'Web Design',
    cat: 'webdesign',
    type: 'website',
    previewType: 'iframe',
    previewUrl: 'https://example2-website.com',
    description: 'Dashboard admin dengan UI yang intuitif',
  },
  {
    id: 5,
    img: '/img/portfolio/005.jpg',
    title: 'Mobile Design',
    cat: 'mobiledesign',
    type: 'design',
    previewType: 'image',
    previewUrl: '/img/portfolio/005.jpg',
    description: 'Mobile app design untuk e-commerce',
  },
  {
    id: 6,
    img: '/img/portfolio/007.jpg',
    title: 'Web & SEO',
    cat: 'webdesign',
    type: 'website',
    previewType: 'iframe',
    previewUrl: 'https://example-seo-web.com',
    description: 'Website dengan optimasi SEO lengkap',
  },
  {
    id: 7,
    img: '/img/portfolio/009.jpg',
    title: 'Mobile App',
    cat: 'mobiledesign',
    type: 'photography',
    previewType: 'video',
    previewUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Presentation video aplikasi mobile',
  },
  {
    id: 8,
    img: '/img/portfolio/006.jpg',
    title: 'Mobile Web',
    cat: 'mobiledesign',
    type: 'website',
    previewType: 'iframe',
    previewUrl: 'https://example-mobile-web.com',
    description: 'Responsive website mobile-first',
  },
  {
    id: 9,
    img: '/img/portfolio/008.jpg',
    title: 'Web & Mobile',
    cat: 'webdesign',
    type: 'photography',
    previewType: 'image',
    previewUrl: '/img/portfolio/008.jpg',
    description: 'Fotografi interface design showcase',
  },
]

export const PORTFOLIO_FILTERS = [
  { key: 'all' },
  { key: 'webdesign' },
  { key: 'mobiledesign' },
  { key: 'seo' },
  { key: 'graphic' },
]

// Testimonial
export const TESTIMONIALS = [
  {
    key: 'jane',
    img: '/img/client-01.png',
  },
  {
    key: 'andrey',
    img: '/img/client-02.png',
  },
  {
    key: 'jully',
    img: '/img/client-03.png',
  },
  {
    key: 'mike',
    img: '/img/client-04.png',
  },
]

// Blog — artikel fallback (dipakai jika Sanity tidak dikonfigurasi)
// FIX BUG UTAMA: Tambahkan title, excerpt, content agar Blog.jsx bisa render
export const BLOG_POSTS = [
  {
    key: 'bestVersion',
    img: '/img/blog-img-01.jpg',
    title: 'Becoming the Best Version of Yourself',
    excerpt: 'Tips and insights on personal growth, mindset, and building habits that last.',
    content: 'Personal growth is a lifelong journey. It starts with small, consistent actions every day. Whether it\'s reading, exercising, or simply reflecting on your day — every step counts toward becoming the best version of yourself.',
  },
  {
    key: 'tipsUiUx',
    img: '/img/blog-img-02.jpg',
    title: 'Tips & Tricks for Better UI/UX Design',
    excerpt: 'Practical design tips to improve user experience and create beautiful interfaces.',
    content: 'Good UI/UX design is about empathy. Understanding your users\' needs, reducing friction, and guiding them naturally through your interface. Always test with real users and iterate based on feedback.',
  },
  {
    key: 'writeDreams',
    img: '/img/blog-img-03.jpg',
    title: 'Write Down Your Dreams & Make Them Real',
    excerpt: 'Why writing your goals down is the first step to actually achieving them.',
    content: 'Studies show that people who write down their goals are significantly more likely to achieve them. Writing transforms vague wishes into concrete intentions. Start today — grab a notebook and write down what you truly want.',
  },
]

export const CONTACT_INFO = [
  { icon: '📍', key: 'address', value: 'Medan, North Sumatera, Indonesia' },
  { icon: '📞', key: 'phone', value: '+62 812-1100-XXXX' },
  { icon: '✉️', key: 'email', value: 'andreyulius@gmail.com' },
]

// Contact — social media
export const SOCIAL_LINKS = [
  { icon: '📸', href: 'https://www.instagram.com/andreyulius8',         label: 'Instagram' },
  { icon: '🐱', href: 'https://github.com/ucoktebas00',                 label: 'GitHub'    },
  { icon: '💼', href: 'https://www.linkedin.com/in/andreysinambela',    label: 'LinkedIn'  },
]