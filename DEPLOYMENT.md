# 🚀 Deployment Guide

## Deploy ke Netlify dengan Netlify Functions

### Prerequisites
- GitHub account (recommend)
- Netlify account (free tier sufficient)
- EmailJS account dengan service setup

---

## Step 1: Setup EmailJS (Preparation)

1. Buka https://www.emailjs.com/
2. Login / Sign up (free tier)
3. Buat Email Service:
   - Dashboard → Email Services → Create New Service
   - Pilih email provider (Gmail, Outlook, dll)
   - Copy **Service ID**
4. Buat Email Template:
   - Dashboard → Email Templates → Create New Template
   - Template should have: `{{name}}`, `{{email}}`, `{{comments}}`
   - Copy **Template ID**
5. Copy **Public API Key**

### Credentials yang Dibutuhkan
```
EMAILJS_SERVICE_ID = service_xxx...
EMAILJS_TEMPLATE_ID = template_xxx...
EMAILJS_PUBLIC_KEY = xxx...
```

---

## Step 2: Deploy ke Netlify

### Option A: Manual Deploy (Drag & Drop)

1. Build aplikasi:
   ```bash
   npm run build
   ```

2. Buka https://app.netlify.com → Login

3. Klik **"Add new site"** → **"Deploy manually"**

4. Drag & drop folder `dist/` ke upload area

5. Netlify akan otomatis assign URL (e.g., `xyz.netlify.app`)

6. Set environment variables:
   - Site settings → **Build & deploy** → **Environment**
   - Click **"Edit variables"**
   - Add:
     ```
     EMAILJS_SERVICE_ID = ...
     EMAILJS_TEMPLATE_ID = ...
     EMAILJS_PUBLIC_KEY = ...
     ```
   - **IMPORTANT**: Jangan set `VITE_` prefix di Netlify ENV!

7. Trigger redeploy (setelah setup env vars):
   - Klik **"Deploys"** → **"Trigger deploy"**

### Option B: GitHub Integration (Recommended)

1. Push code ke GitHub:
   ```bash
   git add .
   git commit -m "Setup security improvements"
   git push origin main
   ```

2. Buka https://app.netlify.com → Login

3. Klik **"Add new site"** → **"Import from Git"**

4. Pilih repository

5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Functions directory**: `netlify/functions`

6. Set environment variables (sebelum deploy):
   - **Advanced build settings** → **Add environment variables**
   - Add:
     ```
     EMAILJS_SERVICE_ID = ...
     EMAILJS_TEMPLATE_ID = ...
     EMAILJS_PUBLIC_KEY = ...
     ```

7. Click **"Deploy site"**

8. Setiap push ke GitHub akan otomatis deploy! 🎉

---

## Step 3: Verify Netlify Functions

1. Deploy berhasil? Check:
   ```
   https://your-site.netlify.app/.netlify/functions/send-email
   ```

2. Should return:
   ```json
   {"error": "Method not allowed"}
   ```
   (Karena GET request, not POST — ini expected!)

3. Test form submission:
   - Go to site
   - Fill contact form
   - Submit
   - Browser DevTools → Network: should see POST to `send-email`

---

## Step 4: Setup Environment Variables untuk Client

### VITE Variables (untuk development)

1. Copy `.env.example` ke `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill dengan development credentials:
   ```
   VITE_SUPABASE_URL=your_dev_url
   VITE_SUPABASE_ANON_KEY=your_dev_key
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   ```

3. Run locally:
   ```bash
   npm run dev
   ```

### IMPORTANT NOTES

- `.env` bersifat **LOCAL ONLY** (tidak di-commit)
- Netlify menggunakan **server environment** untuk Netlify Functions
- Client selalu gunakan `VITE_` prefix
- Server (Functions) gunakan tanpa prefix

---

## Step 5: Test Deployment

### Test Contact Form
1. Fill form dengan test data
2. Submit
3. Check email (should receive email)
4. Check browser console untuk errors

### Test Netlify Functions
```bash
# Local testing (sebelum deploy)
npm install -D netlify-cli
netlify dev

# Browser: http://localhost:8888
# Functions: http://localhost:8888/.netlify/functions/send-email
```

### Troubleshooting

| Issue | Solution |
|-------|----------|
| 502 Bad Gateway | Check Netlify Function logs → Deployed Functions |
| "Email failed" | Verify EmailJS credentials di Netlify env vars |
| CORS error | Make sure sending POST to `/.netlify/functions/send-email` |
| Form not working | Check browser console untuk error messages |

---

## Step 6: Custom Domain (Optional)

1. Di Netlify: Site settings → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `andreyportfolio.com`)
4. Follow DNS setup instructions
5. DNS propagation: 24-48 hours

---

## Step 7: SSL/HTTPS (Automatic)

- ✅ Netlify automatically provides SSL certificate
- ✅ HTTPS enabled by default
- ✅ Auto-renews

---

## Monitoring & Maintenance

### Check Deployment Status
- Site settings → **Builds & deploys** → see history
- Deploys → filter by status

### View Logs
- Click deploy → **Logs** → see build/deploy logs
- Check Netlify Function logs in admin

### Update Environment Variables
- Any time: Site settings → **Environment**
- Changes take effect on next deploy

---

## Rollback ke Previous Version

1. Go to **Deploys** tab
2. Find previous good deploy
3. Click → **Restore**

---

## Gunakan Netlify Environment untuk Different Stages

### Development
```
VITE_SUPABASE_URL = dev_url
VITE_EMAILJS_PUBLIC_KEY = dev_key
```

### Production
```
VITE_SUPABASE_URL = prod_url
VITE_EMAILJS_PUBLIC_KEY = prod_key
```

Setup di Netlify:
- Site settings → **Deploy contexts** → pilih context
- Set different env vars per context

---

## ✅ Final Checklist

- [ ] EmailJS account setup
- [ ] Credentials copied
- [ ] Repository pushed to GitHub
- [ ] Netlify site created
- [ ] Build settings configured
- [ ] Environment variables set
- [ ] Deploy successful (green checkmark)
- [ ] Netlify Functions deployed
- [ ] Contact form tested
- [ ] Email received successfully
- [ ] Custom domain set (optional)

---

## 📞 Support

- [Netlify Docs](https://docs.netlify.com/)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [EmailJS Docs](https://www.emailjs.com/docs/)
- [Build Environment](https://docs.netlify.com/configure-builds/environment/)
