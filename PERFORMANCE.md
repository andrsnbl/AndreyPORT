# ⚡ Performance & SEO Optimization Guide

## Overview

Project ini sudah dioptimasi untuk:
- ✅ **Performance**: Lighthouse scores, Core Web Vitals
- ✅ **SEO**: Search engine visibility, rankings
- ✅ **Analytics**: User behavior tracking

---

## 🖼️ Image Optimization

### Current Setup
```javascript
// Hook untuk lazy loading
import { useImageLazyLoad } from '../hooks/useImageOptimization'

// Component
function Portfolio() {
  const { ref, isVisible } = useImageLazyLoad()

  return (
    <div ref={ref}>
      {isVisible && <img src="..." alt="..." loading="lazy" />}
    </div>
  )
}
```

### Best Practices
- ✅ Use `loading="lazy"` attribute
- ✅ Use smaller file sizes (compress images)
- ✅ Use WebP format untuk modern browsers
- ✅ Blur placeholder untuk better UX
- ✅ Responsive images dengan srcset

### TODO: Image Optimization
- [ ] Compress portfolio images (reduce size)
- [ ] Convert JPG to WebP format
- [ ] Add `srcset` untuk responsive images
- [ ] Use Image CDN (Cloudinary, Imgix)
- [ ] Add blur placeholder effect

---

## 🔍 SEO Improvements

### 1. Dynamic Meta Tags
```javascript
// Di setiap section main, update meta tags:
import { useSEO, SEO_DATA } from '../hooks/useSEO'

export function Portfolio() {
  useSEO(SEO_DATA.portfolio)
  // Component render...
}
```

### 2. Sitemap & Robots
- ✅ `public/sitemap.xml` - For search engine crawlers
- ✅ `public/robots.txt` - Crawling rules
- Accessible di: `/sitemap.xml` dan `/robots.txt`

### 3. Open Graph Tags
```html
<!-- Social media sharing preview -->
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="..." />
<meta property="og:url" content="..." />
```

### 4. Structured Data (JSON-LD)
```javascript
// StructuredData.jsx automatically adds:
- Person schema (profile info)
- CreativeWork schema (portfolio)
- LocalBusiness schema (contact info)
```

### 5. Deployment Setup

#### Step 1: Update Site URLs
Edit files dengan domain Anda:
```
// robots.txt
Sitemap: https://your-domain.com/sitemap.xml

// index.html & useSEO.js
og:url: https://your-domain.com

// StructuredData.jsx
url: https://your-domain.com
```

---

## 📊 Google Analytics Integration

### Setup GA4

1. **Create Google Analytics Account**
   - Go to https://analytics.google.com/
   - Create new property
   - Get **Measurement ID** (format: `G-XXXXXXXXXX`)

2. **Set Environment Variable**
   ```
   # .env
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

3. **Track Custom Events**
   ```javascript
   import { trackEvent, GA_EVENTS } from '../hooks/useGoogleAnalytics'

   // Track CV download
   trackEvent(GA_EVENTS.CV_DOWNLOAD, {
     value: 1,
   })

   // Track portfolio filter
   trackEvent(GA_EVENTS.PORTFOLIO_FILTER, {
     category: 'webdesign',
   })

   // Track form submission
   trackEvent(GA_EVENTS.CONTACT_SUBMIT, {
     section: 'contact',
   })
   ```

### Available Events
```javascript
CV_DOWNLOAD      // CV downloads
PORTFOLIO_FILTER // Portfolio filtering
PORTFOLIO_VIEW   // View portfolio item
BLOG_READ        // Read blog post
CONTACT_SUBMIT   // Contact form submission
LINK_CLICK       // External link clicks
THEME_TOGGLE     // Dark mode toggle
LANGUAGE_CHANGE  // Language switching
```

### View Analytics
- Dashboard: https://analytics.google.com/
- Real-time: Melihat visitor sekarang
- Audience: Demographics, locations, devices
- Acquisition: Where traffic comes from
- Events: Custom event tracking

---

## 📦 Bundle Size & Performance

### Current Optimization
```javascript
// vite.config.js - Automatic optimization:
- Code splitting (react, i18n, supabase chunks)
- CSS optimization & minification
- JavaScript minification (terser)
- Console logs removal in production
- Source map disabled (faster build)
```

### Bundle Size Report
Run untuk check size:
```bash
npm run build  # Shows bundle size
```

### Improve Bundle Size
1. **Use dynamic imports untuk lazy loading**
   ```javascript
   const Blog = lazy(() => import('./components/Blog'))
   <Suspense fallback={<div>Loading...</div>}>
     <Blog />
   </Suspense>
   ```

2. **Remove unused dependencies**
   ```bash
   npm audit
   npm prune
   ```

3. **Monitor with tools**
   - Lighthouse (Chrome DevTools)
   - Bundle Analyzer (bundlesize.io)
   - WebPageTest (webpagetest.org)

---

## ⚡ Performance Tips

### 1. Core Web Vitals Target
```
LCP (Largest Contentful Paint)  < 2.5s
FID (First Input Delay)         < 100ms
CLS (Cumulative Layout Shift)   < 0.1
```

### 2. Lighthouse Scores Target
```
Performance  > 90
SEO          > 95
Accessibility > 90
Best Practices > 90
```

### 3. Quick Wins
- ✅ Enable gzip compression (Netlify automatic)
- ✅ Use CDN (Netlify included)
- ✅ Cache busting (automatic via build)
- ✅ Minify CSS/JS (vite automatic)
- ✅ Lazy load images (implemented)

### 4. Browser DevTools
```
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Generate report
4. Follow recommendations
```

---

## 🔧 Vite Configuration

### Development
```bash
npm run dev
# Fast HMR (Hot Module Replacement)
# Quick rebuild on changes
```

### Production Build
```bash
npm run build
# Optimized bundle
# Minified code
# Tree-shaking (unused code removal)
```

### Build Optimizations (vite.config.js)
```javascript
build: {
  // Code splitting
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom'],
        'i18n': ['i18next', 'react-i18next'],
        'supabase': ['@supabase/supabase-js'],
      },
    },
  },

  // Minify
  minify: 'terser',

  // Remove console in production
  terserOptions: {
    compress: {
      drop_console: true,
    },
  },

  // CSS code splitting
  cssCodeSplit: true,
}
```

---

## 📈 Monitoring & Tracking

### Setup Monitoring
1. **Netlify Analytics**
   - Site settings → Analytics
   - View traffic, top pages, referrers

2. **Google Search Console**
   - https://search.google.com/search-console
   - Submit sitemap
   - Monitor indexing status
   - View search queries

3. **Google Analytics**
   - Real-time visitors
   - User behavior
   - Conversion tracking

### Key Metrics to Monitor
```
- Bounce rate (should be < 50%)
- Average session duration
- Pages per session
- Conversion rate (CV downloads)
- Form submission rate
```

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Images optimized & compressed
- [ ] Sitemap URL updated with domain
- [ ] robots.txt domain updated
- [ ] Structured data URLs updated
- [ ] GA Measurement ID set
- [ ] Meta tags & OG tags correct
- [ ] Lighthouse scores > 90
- [ ] Mobile responsive tested
- [ ] All links working
- [ ] `.env` variables set in Netlify

---

## 📖 Resources

### Performance
- [Web.dev - Performance](https://web.dev/performance/)
- [Chrome DevTools - Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/)
- [Vite - Build Optimization](https://vitejs.dev/config/build-options.html)

### SEO
- [Google SEO Guide](https://developers.google.com/search/docs)
- [Schema.org](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)

### Analytics
- [Google Analytics 4](https://support.google.com/analytics/answer/10089681)
- [Search Console Help](https://support.google.com/webmasters/)

---

## 🎯 Next Steps

### Short Term (1-2 weeks)
- [ ] Test Lighthouse scores locally
- [ ] Compress portfolio images
- [ ] Setup Google Analytics
- [ ] Verify sitemap & robots.txt
- [ ] Configure custom domain

### Medium Term (1 month)
- [ ] Implement image CDN
- [ ] Add blog section
- [ ] Monitor analytics
- [ ] Improve Lighthouse scores to 95+
- [ ] Add Pinterest verification

### Long Term (3+ months)
- [ ] Build backlinks
- [ ] Guest posting
- [ ] Social media integration
- [ ] Video content
- [ ] Regular content updates
