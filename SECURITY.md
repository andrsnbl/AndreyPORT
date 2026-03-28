# 🔐 Security Best Practices

## Overview
Portfolio ini mengimplementasikan security best practices untuk melindungi API keys, user data, dan aplikasi dari common vulnerabilities.

---

## 🔑 Environment Variables & Secret Management

### ✅ DO (BENAR)
```bash
# 1. Never commit .env file
echo ".env" >> .gitignore

# 2. Use .env.example untuk dokumentasi
# File ini aman untuk di-commit

# 3. Set secrets di Netlify UI, bukan di file
# Site settings → Build & deploy → Environment
```

### ❌ DON'T (SALAH)
```bash
# Jangan pernah hardcode secrets di code
export const SECRET_KEY = "abc123xyz"

# Jangan commit .env file ke repository
git add .env  # ❌ JANGAN LAKUKAN INI

# Jangan share API keys di public channels
```

### Environment Variables yang Digunakan
```
VITE_SUPABASE_URL          - Database URL (read-only key untuk client)
VITE_SUPABASE_ANON_KEY     - Database access key (terbatas)
VITE_EMAILJS_PUBLIC_KEY    - EmailJS public key (safe di client)
VITE_EMAILJS_SERVICE_ID    - EmailJS service ID
VITE_EMAILJS_TEMPLATE_ID   - EmailJS template ID
```

---

## 📧 Email Form Security

### Previous (❌ TIDAK AMAN)
```javascript
// EmailJS credentials hardcoded di client
export const EMAILJS_CONFIG = {
  publicKey: 'RStndPUO0m7CSmmFp',  // ❌ Visible di browser
  serviceId: 'service_wzvlg6u',
  templateId: 'template_cet5bxp',
}
```

### Current (✅ AMAN)
```javascript
// Menggunakan Netlify Function (backend)
// Client tidak send email langsung ke EmailJS
// Credentials disembunyikan di server

// Frontend: send ke Netlify Function
POST /.netlify/functions/send-email
{ name, email, message }

// Backend: send ke EmailJS dengan API key
```

### Deployment Setup di Netlify
1. Login ke Netlify Dashboard
2. Go to: **Site settings** → **Build & deploy** → **Environment**
3. Set environment variables:
   ```
   EMAILJS_SERVICE_ID = your_service_id
   EMAILJS_TEMPLATE_ID = your_template_id
   EMAILJS_PUBLIC_KEY = your_public_key
   ```
4. Setiap deploy akan otomatis menggunakan values ini

---

## 🛡️ Error Boundary

### What is Error Boundary?
Component yang catch React errors dan prevent white screen of death.

```javascript
// ✅ Semua errors di component tree akan di-catch
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### Features
- ✅ Catch component errors
- ✅ Show fallback UI
- ✅ Log errors untuk debugging
- ✅ Recovery button untuk retry

### Limitations (tidak bisa catch)
- ❌ Event handlers (gunakan try-catch)
- ❌ Async code (gunakan try-catch)
- ❌ Server-side rendering
- ❌ Error boundary sendiri

---

## 🔒 Input Validation

### Form Validation (Contact Form)
```javascript
// ✅ Backend validation
if (!name || !email || !message) {
  return 400 error  // Reject at server
}

// ✅ Email format validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
if (!emailRegex.test(email)) {
  return 400 error
}
```

### Validasi Tambahan (TODO)
- [ ] Rate limiting: max 5 submissions per IP per hour
- [ ] CAPTCHA integration untuk prevent spam
- [ ] Content length limits
- [ ] SQL injection prevention (jika pakai database)

---

## 🚫 XSS Prevention

### ✅ React Auto Escapes
```javascript
// React automatically escapes values
<div>{userInput}</div>  // ✅ Safe

// innerHTML tidak di-escape
<div dangerouslySetInnerHTML={{__html: userInput}} />  // ❌ Risky
```

### Best Practices
- ✅ Gunakan `.textContent` atau JSX untuk text
- ✅ Avoid `dangerouslySetInnerHTML`
- ✅ Sanitize user input dengan library (DOMPurify)
- ❌ Jangan inject user input ke `<script>` tags

---

## 🔐 CORS & Authentication

### Current Setup
- ✅ Supabase uses Row Level Security (RLS)
- ✅ Anonymous key limited to specific tables
- ✅ Netlify Function menghandle authentication

### Best Practices
- ✅ Use RLS policies untuk database
- ✅ Validate requests di backend
- ✅ Never trust client-side checks alone
- ✅ Use secure headers (HTTPS only)

---

## 📋 TODO: Security Improvements

- [ ] Implement rate limiting pada contact form
- [ ] Add CAPTCHA untuk prevent bot submissions
- [ ] Setup Content Security Policy (CSP) headers
- [ ] Enable HTTPS for all requests
- [ ] Regular security audits (npm audit)
- [ ] Dependency version pinning
- [ ] Add request signing untuk API calls
- [ ] Implement API key rotation policy

---

## 🔍 Monitoring & Logging

### Development
```javascript
// Error logs di console
console.error('[Component]', error)
console.warn('[Service]', warning)
```

### Production (TODO)
- [ ] Setup error tracking (Sentry)
- [ ] Setup analytics (Google Analytics)
- [ ] Monitor API usage
- [ ] Alert untuk suspicious activity

---

## 📖 Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [React Security](https://reactrouter.com/en/start/overview)
- [Netlify Functions Security](https://docs.netlify.com/functions/overview/)
- [Supabase Security](https://supabase.com/docs/guides/auth)
- [EmailJS Security](https://www.emailjs.com/docs/)

---

## 🚨 Security Checklist sebelum Deploy

- [ ] `.env` file di `.gitignore`
- [ ] `.env.example` di-commit sebagai template
- [ ] Environment variables set di Netlify UI
- [ ] Error Boundary active di production
- [ ] Backend validation enabled
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Dependencies up-to-date
- [ ] No hardcoded secrets
- [ ] Form input validated & sanitized
