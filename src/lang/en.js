// ─────────────────────────────────────────────────────────────
//  en.js — English Text
//  All text displayed on the English version of the website.
// ─────────────────────────────────────────────────────────────

const en = {

  // ── Navbar ──────────────────────────────────────────────────
  nav: {
    home:        'Home',
    about:       'About',
    resume:      'Resume',
    services:    'Services',
    portfolio:   'Portfolio',
    clients:     'Clients',
    blog:        'Blog',
    contact:     'Contact',
  },

  // ── Hero ────────────────────────────────────────────────────
  hero: {
    available:   'Available for Freelance Projects',
    greeting:    "I'M",
    typedWords:  ['UI Designer.', 'Web Designer.', 'Web Developer.'],
    desc:        'Fresh web development graduate with solid foundation in design & development. Based in Medan, Indonesia — building clean, modern digital experiences.',
    downloadCV:  '⬇ Download CV',
    getInTouch:  'Get In Touch →',
    stats: [
      { number: '25+', label: 'Projects' },
      { number: '27+', label: 'Clients'  },
      { number: '2+',  label: 'Years'    },
      { number: '4',   label: 'Services' },
    ],
  },

  // ── About ───────────────────────────────────────────────────
  about: {
    tag:         'About Me',
    title:       "Hello, I'm",
    desc:        'A passionate web designer and developer from Medan, Indonesia. Graduated in Information Systems with hands-on experience in UI/UX, graphic design, and web development.',
    badge:       'Projects Completed',
    downloadCV:  '⬇ Download CV',
    sendEmail:   '✉ Send Email',
    info: [
      { key: 'Birthday',  value: 'July 1999'             },
      { key: 'Age',       value: '25'                     },
      { key: 'Degree',    value: 'Information Systems'    },
      { key: 'Freelance', value: 'Available'              },
      { key: 'Location',  value: 'Medan, Indonesia'       },
      { key: 'Email',     value: 'andreyulius@gmail.com'  },
    ],
    stats: [
      { icon: '⬇',  number: '2',   label: 'Downloads' },
      { icon: '✏️', number: '25',  label: 'Projects'  },
      { icon: '🏅', number: '20+', label: 'Awards'    },
      { icon: '😊', number: '27+', label: 'Clients'   },
    ],
  },

  // ── Resume ──────────────────────────────────────────────────
  resume: {
    tag:         'Resume',
    title:       'Resume',
    subtitle:    'I am available for freelance projects',
    education:   'Education',
    experience:  'Experience',
    skillsTitle: 'Technical Skills',
    edu: [
      {
        title:  'Bachelor in Information Systems',
        period: '2020 – 2024',
        desc:   'Graduated from STMK Triguna Dharma Medan with GPA 3.71/4.00. Focused on information systems, web development, and software engineering.',
      },
      {
        title:  'Universitas Mikroskil',
        period: '2017 – 2020',
        desc:   'Built a strong foundation before pivoting to professional work experience in design and development.',
      },
    ],
    exp: [
      {
        title:  'Administrative & Graphic Design',
        period: 'Present',
        desc:   'Working at a construction planning firm — creating graphic designs, handling admin tasks, and assisting in site surveys.',
      },
      {
        title:  'Sales & Social Media Admin',
        period: '2023 – 2024',
        desc:   'Managed social media sales accounts (live selling), tracked payments, and handled inventory for a secondhand shoe store.',
      },
      {
        title:  'Sysadmin & Cybersecurity Intern — Infinite Learning / IBM',
        period: '2022 – 2023',
        desc:   'Hands-on experience managing IT systems, exploring AI concepts, and studying ethical hacking.',
      },
      {
        title:  'Web Design & UI/UX Intern — PT. GLU',
        period: '2022 – 2023',
        desc:   'Created responsive web layouts at a Medan-based startup, collaborating with developers and product teams.',
      },
      {
        title:  'Junior Web Developer — Freelance',
        period: '2019 – 2023',
        desc:   'Handled website projects for individual and small business clients across various industries.',
      },
    ],
  },

  // ── Services ─────────────────────────────────────────────────
  services: {
    tag:      'What I Do',
    title:    'Services',
    subtitle: 'Services I offer to my clients',
    items: [
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
        desc:  'Fully adaptive websites that deliver optimal viewing experience across all devices from desktop to mobile.',
      },
      {
        icon:  '🌐',
        title: 'Go Beyond Limits',
        desc:  'Innovative solutions pushing boundaries through cutting-edge technologies and unconventional approaches.',
      },
    ],
  },

  // ── Portfolio ─────────────────────────────────────────────────
  portfolio: {
    tag:      'My Work',
    title:    'Creative Works',
    subtitle: 'Meet my awesome works and enjoy',
    filters: [
      { key: 'all',          label: 'All'          },
      { key: 'webdesign',    label: 'Web Design'   },
      { key: 'mobiledesign', label: 'Mobile Design'},
      { key: 'seo',          label: 'SEO'          },
      { key: 'graphic',      label: 'Graphic'      },
    ],
  },

  // ── Testimonial ──────────────────────────────────────────────
  testimonial: {
    tag:      'Testimonials',
    title:    'Clients',
    subtitle: 'What my clients say about me',
  },

  // ── Blog ─────────────────────────────────────────────────────
  blog: {
    tag:      'Blog',
    title:    'Latest News',
    subtitle: 'Check out my latest blog posts',
    by:       'by Andrey',
    readMore: 'Read More →',
    label:    'Blog Post',
    posts: [
      {
        title:   'Be Your Best Version',
        excerpt: 'Focus on your strengths, work on your weaknesses, and always keep learning.',
        content: 'The journey to self-improvement is lifelong and rewarding. Focus on your strengths, work on your weaknesses, and always keep learning. Writing down your goals creates accountability and gives you a roadmap to follow. Start small, stay consistent, and celebrate every milestone along the way.',
      },
      {
        title:   '5 Tips In UI/UX Web Design',
        excerpt: 'Always put the user first. Keep it simple, intuitive, and accessible to everyone.',
        content: '1. Always put the user first.\n2. Keep it simple and intuitive.\n3. Use consistent design patterns.\n4. Make it accessible to everyone.\n5. Test, iterate, and improve.\n\nGood UI/UX design is not just about aesthetics — it is about creating experiences that delight and empower users.',
      },
      {
        title:   'Write Your Dreams',
        excerpt: 'Writing down your dreams and goals is one of the most powerful habits you can develop.',
        content: 'Writing down your dreams and goals is one of the most powerful habits you can develop. It forces clarity of thought, creates accountability, and gives you a roadmap to follow. Start with small dreams and work your way up. The act of writing transforms abstract wishes into concrete plans.',
      },
    ],
  },

  // ── Contact ──────────────────────────────────────────────────
  contact: {
    tag:         'Contact',
    title:       'Get In Touch',
    subtitle:    'Feel free to contact me any time',
    colLeft:     "Let's Work Together",
    colLeftDesc: 'Fresh web development graduate with solid foundation in HTML/CSS/JavaScript. Looking for opportunities to contribute while learning from experienced developers.',
    colRight:    'How Can I Help You?',
    info: [
      { icon: '📍', label: 'Address', value: 'Medan, North Sumatera, Indonesia' },
      { icon: '📞', label: 'Phone',   value: '+62 812-1100-XXXX'                },
      { icon: '✉️', label: 'Email',   value: 'andreyulius@gmail.com'            },
    ],
    form: {
      name:        'Your Name',
      namePh:      'Andrey Julius',
      email:       'Email Address',
      emailPh:     'you@example.com',
      message:     'Message',
      messagePh:   'Tell me about your project...',
      send:        '✉ Send Message',
      sending:     '⏳ Sending...',
      successMsg:  "✅ Message sent! I'll get back to you soon.",
      errorMsg:    '⚠️ Please fill in all fields correctly.',
    },
  },

  // ── Footer ───────────────────────────────────────────────────
  footer: {
    copy: 'Built with React. All rights reserved.',
  },

}

export default en
