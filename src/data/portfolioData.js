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
  { key: 'email', value: 'andreyulius@gmail.com' },
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

// Blog — artikel
export const BLOG_POSTS = [
  {
    key: 'bestVersion',
    img: '/img/blog-img-01.jpg',
  },
  {
    key: 'tipsUiUx',
    img: '/img/blog-img-02.jpg',
  },
  {
    key: 'writeDreams',
    img: '/img/blog-img-03.jpg',
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

// EmailJS credentials
export const EMAILJS_CONFIG = {
  publicKey:  'RStndPUO0m7CSmmFp',
  serviceId:  'service_wzvlg6u',
  templateId: 'template_cet5bxp',
}
