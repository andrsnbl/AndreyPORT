// Data non-translatable (angka, key, asset path, link)

export const NAV_LINKS = [
  { href: '#hero', key: 'home' },
  { href: '#about', key: 'about' },
  { href: '#resume', key: 'resume' },
  { href: '#services', key: 'services' },
  { href: '#portfolio', key: 'portfolio' },
  { href: '#storefront', key: 'storefront' },
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

// Storefront — kategori produk
export const PRODUCT_CATEGORIES = [
  { id: 'fashion', name: 'Fashion', icon: '👗' },
  { id: 'electronics', name: 'Electronics', icon: '⚡' },
  { id: 'accessories', name: 'Accessories', icon: '✨' },
  { id: 'lifestyle', name: 'Lifestyle', icon: '🌿' },
]

// Storefront — produk
export const PRODUCTS = [
  {
    id: 'prod-001',
    name: 'Premium Wireless Headphones',
    category: 'electronics',
    price: 1299000,
    originalPrice: 1799000,
    discount: 28,
    description: 'Headphone nirkabel dengan noise cancellation, 30jam battery, dan kualitas audio premium.',
    image: 'https://via.placeholder.com/300x240?text=Wireless+Headphones',
    rating: 4.8,
    reviews: 245,
  },
  {
    id: 'prod-002',
    name: 'Classic Cotton T-Shirt',
    category: 'fashion',
    price: 159000,
    originalPrice: 229000,
    discount: 31,
    description: 'T-shirt cotton 100% premium dengan desain minimalis dan nyaman sepanjang hari.',
    image: 'https://via.placeholder.com/300x240?text=Cotton+TShirt',
    rating: 4.6,
    reviews: 128,
  },
  {
    id: 'prod-003',
    name: 'Stainless Steel Water Bottle',
    category: 'lifestyle',
    price: 249000,
    originalPrice: 349000,
    discount: 29,
    description: 'Botol air tahan lama, menjaga minuman tetap dingin hingga 24 jam, ramah lingkungan.',
    image: 'https://via.placeholder.com/300x240?text=Water+Bottle',
    rating: 4.7,
    reviews: 89,
  },
  {
    id: 'prod-004',
    name: 'Minimalist Leather Wallet',
    category: 'accessories',
    price: 349000,
    originalPrice: 449000,
    discount: 22,
    description: 'Dompet kulit asli dengan desain simpel, tahan lama, dan elegan untuk setiap kesempatan.',
    image: 'https://via.placeholder.com/300x240?text=Leather+Wallet',
    rating: 4.9,
    reviews: 67,
  },
  {
    id: 'prod-005',
    name: 'Wireless Charging Pad',
    category: 'electronics',
    price: 199000,
    originalPrice: 279000,
    discount: 29,
    description: 'Pad charging wireless cepat, kompatibel semua smartphone, desain sleek dan modern.',
    image: 'https://via.placeholder.com/300x240?text=Charging+Pad',
    rating: 4.5,
    reviews: 156,
  },
  {
    id: 'prod-006',
    name: 'Bamboo Sunglasses',
    category: 'accessories',
    price: 299000,
    originalPrice: 399000,
    discount: 25,
    description: 'Sunglasses dengan frame bambu alami, UV protection 100%, stylish dan eco-friendly.',
    image: 'https://via.placeholder.com/300x240?text=Bamboo+Sunglasses',
    rating: 4.7,
    reviews: 43,
  },
  {
    id: 'prod-007',
    name: 'Organic Cotton Hoodie',
    category: 'fashion',
    price: 449000,
    originalPrice: 599000,
    discount: 25,
    description: 'Hoodie dari cotton organik berkualitas tinggi, nyaman, hangat, dan sustainable.',
    image: 'https://via.placeholder.com/300x240?text=Cotton+Hoodie',
    rating: 4.8,
    reviews: 92,
  },
  {
    id: 'prod-008',
    name: 'Eco-Friendly Yoga Mat',
    category: 'lifestyle',
    price: 349000,
    originalPrice: 449000,
    discount: 22,
    description: 'Yoga mat ramah lingkungan, anti slip, mudah dibersihkan, sempurna untuk olahraga.',
    image: 'https://via.placeholder.com/300x240?text=Yoga+Mat',
    rating: 4.6,
    reviews: 74,
  },
  {
    id: 'prod-009',
    name: 'Smart Watch Series 5',
    category: 'electronics',
    price: 1999000,
    originalPrice: 2499000,
    discount: 20,
    description: 'Smartwatch dengan layar AMOLED, tracking kesehatan, dan baterai tahan 7 hari.',
    image: 'https://via.placeholder.com/300x240?text=Smart+Watch',
    rating: 4.8,
    reviews: 312,
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