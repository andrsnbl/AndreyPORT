# 🔧 Fix: "Failed to fetch" Error - Supabase CORS Setup

## ❌ Error yang Terjadi:
```
[Supabase] getDownloadCount error: TypeError: Failed to fetch
```

## 🔍 Penyebab:

Error "Failed to fetch" biasanya disebabkan oleh:

1. **CORS tidak dikonfigurasi** di Supabase Dashboard
2. **No internet connection** - Koneksi terputus
3. **Invalid URL/Key** - URL atau Anon Key salah
4. **Supabase project paused** - Project sedang tidak aktif

---

## ✅ Solusi Step-by-Step:

### **Step 1: Verifikasi Environment Variables**

Pastikan file `.env` ada dan konfigurasi benar:

```env
VITE_SUPABASE_URL=https://ryzswbexwanzxxpparfq.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Check di Browser Console:**
```javascript
console.log('URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('Key:', import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 20) + '...')
```

**Expected:**
- URL harus valid (https://...supabase.co)
- Key harus dimulai dengan `eyJ`

---

### **Step 2: Setup CORS di Supabase Dashboard**

Ini adalah **penyebab paling umum** dari error "Failed to fetch"!

#### **Cara Setup CORS:**

1. **Buka Supabase Dashboard**
   - Login ke https://supabase.com/dashboard
   - Pilih project Anda: `ryzswbexwanzxxpparfq`

2. **Navigate ke API Settings**
   - Klik **Settings** (gear icon) di sidebar
   - Pilih **API**

3. **Add CORS Origin**
   - Scroll ke bagian **CORS Origins**
   - Klik **Add Origin**
   - Tambahkan URL berikut:
     ```
     http://localhost:5173
     http://localhost:3000
     http://localhost:5174
     ```
   - Klik **Save**

4. **Verify CORS**
   - CORS Origins sekarang harus include:
     - `https://ryzswbexwanzxxpparfq.supabase.co` (default)
     - `http://localhost:5173` (your dev server)

---

### **Step 3: Verifikasi Tabel stats**

Pastikan tabel `stats` sudah ada di Supabase:

1. **Buka Table Editor**
   - Di dashboard, klik **Table Editor**
   - Cek apakah tabel `stats` ada

2. **Jika tabel belum ada:**
   - Buka **SQL Editor**
   - Jalankan script ini:

```sql
-- 1. Buat tabel stats
CREATE TABLE IF NOT EXISTS stats (
  id TEXT PRIMARY KEY DEFAULT 'main',
  download_count INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Insert row awal
INSERT INTO stats (id, download_count) VALUES ('main', 0)
ON CONFLICT (id) DO NOTHING;

-- 3. Buat fungsi increment
CREATE OR REPLACE FUNCTION increment_download_count()
RETURNS TABLE (download_count INTEGER) AS $$
BEGIN
  UPDATE stats
  SET download_count = stats.download_count + 1,
      updated_at = NOW()
  WHERE id = 'main';
  RETURN QUERY SELECT s.download_count FROM stats s WHERE s.id = 'main';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Row Level Security
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

-- Allow anon untuk SELECT
CREATE POLICY "Allow public read stats"
  ON stats FOR SELECT
  TO anon
  USING (true);

-- Allow anon untuk EXECUTE function
GRANT EXECUTE ON FUNCTION increment_download_count() TO anon;
```

---

### **Step 4: Test Connection**

Buka browser console dan test:

```javascript
// Test 1: Check environment
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('Supabase Key:', import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 30) + '...')

// Test 2: Test direct fetch
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

try {
  const response = await fetch(`${url}/rest/v1/stats?select=*&id=eq.main`, {
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json'
    }
  })
  
  console.log('Response status:', response.status)
  console.log('Response OK:', response.ok)
  
  const data = await response.json()
  console.log('Direct API result:', data)
} catch (error) {
  console.error('Fetch failed:', error)
}
```

**Expected Output:**
```
Response status: 200
Response OK: true
Direct API result: [{download_count: 0}]
```

**Jika masih error:**
- `Failed to fetch` → CORS belum dikonfigurasi
- `404 Not Found` → Tabel `stats` belum ada
- `401 Unauthorized` → Anon Key tidak valid
- `403 Forbidden` → RLS policy blocking access

---

### **Step 5: Check Network Tab**

1. **Buka DevTools** (F12)
2. **Tab Network**
3. **Refresh page**
4. **Filter:** `supabase.co`

**Check request ke Supabase:**
- URL: `https://ryzswbexwanzxxpparfq.supabase.co/rest/v1/stats...`
- Method: `GET` atau `POST`
- Status: Harus `200 OK`
- Response: Harus ada data

**Jika status 4xx/5xx:**
- Klik request → Tab **Response**
- Lihat error message dari Supabase

---

## 🚨 Common Issues & Solutions

### **Issue 1: CORS Error**
```
Access to fetch at 'https://...supabase.co' from origin 'http://localhost:5173' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present
```

**Solution:**
- Setup CORS di Supabase Dashboard (lihat Step 2)
- Restart dev server: `npm run dev`

---

### **Issue 2: Table Not Found**
```
relation "stats" does not exist
Code: 42P01
```

**Solution:**
- Jalankan SQL setup (lihat Step 3)
- Verify di Table Editor

---

### **Issue 3: Permission Denied**
```
permission denied for table stats
```

**Solution:**
```sql
-- Enable RLS
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Allow public read stats"
  ON stats FOR SELECT
  TO anon
  USING (true);

-- Grant function execution
GRANT EXECUTE ON FUNCTION increment_download_count() TO anon;
```

---

### **Issue 4: Invalid API Key**
```
Invalid API key
Code: PGRST301
```

**Solution:**
- Check Anon Key di `.env`
- Get new key dari Supabase Dashboard → Settings → API
- Restart dev server

---

### **Issue 5: Project Paused**
```
Failed to fetch
```

**Solution:**
- Login ke Supabase Dashboard
- Check project status
- Jika paused, klik **Resume**
- Free tier projects auto-pause setelah 7 days inactive

---

## 🧪 Testing Checklist

Setelah setup, test dengan langkah berikut:

### **1. Environment Check**
```bash
# Restart dev server
npm run dev
```

### **2. Console Logs**
Buka browser console, harus muncul:
```
[Supabase] Fetching download count...
[Supabase] Download count fetched: 0
[About] Download count loaded: 0
```

### **3. Test Download**
1. Klik tombol **"⬇ Download CV"**
2. Console harus menampilkan:
```
[Supabase] Incrementing download count...
[Supabase] Download count incremented to: 1
```

### **4. Verify in Supabase**
1. Buka **Supabase Dashboard** → **Table Editor**
2. Pilih tabel `stats`
3. Check `download_count` sudah increment

---

## 🔍 Debugging Commands

### **Check CORS Configuration:**
```javascript
// Di browser console
const response = await fetch(import.meta.env.VITE_SUPABASE_URL, {
  method: 'OPTIONS',
  headers: {
    'Access-Control-Request-Method': 'GET'
  }
})
console.log('CORS headers:', response.headers.get('Access-Control-Allow-Origin'))
```

**Expected:** `*` atau URL Supabase Anda

---

### **Check Table Exists:**
```javascript
const { data, error } = await supabase
  .from('stats')
  .select('*')
  .limit(1)

console.log('Table check:', { data, error })
```

---

### **Check RLS Policies:**
```sql
-- Jalankan di SQL Editor
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE tablename = 'stats';
```

**Expected:** Harus ada policy untuk `SELECT` dengan `roles = anon`

---

## 📊 Quick Fix Commands

### **Reset Everything (Last Resort):**

```sql
-- Drop semua
DROP TABLE IF EXISTS stats CASCADE;
DROP FUNCTION IF EXISTS increment_download_count();

-- Recreate from scratch
CREATE TABLE stats (
  id TEXT PRIMARY KEY DEFAULT 'main',
  download_count INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO stats (id, download_count) VALUES ('main', 0);

CREATE OR REPLACE FUNCTION increment_download_count()
RETURNS TABLE (download_count INTEGER) AS $$
BEGIN
  UPDATE stats
  SET download_count = stats.download_count + 1,
      updated_at = NOW()
  WHERE id = 'main';
  RETURN QUERY SELECT s.download_count FROM stats s WHERE s.id = 'main';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read stats"
  ON stats FOR SELECT
  TO anon
  USING (true);

GRANT EXECUTE ON FUNCTION increment_download_count() TO anon;
```

---

## ✅ Verification Checklist

- [ ] File `.env` ada dengan konfigurasi yang benar
- [ ] Restart dev server setelah edit `.env`
- [ ] CORS origin `http://localhost:5173` sudah ditambahkan di Supabase Dashboard
- [ ] Tabel `stats` ada di Table Editor
- [ ] Row dengan `id='main'` ada di tabel `stats`
- [ ] Function `increment_download_count()` ada
- [ ] RLS policy sudah dikonfigurasi
- [ ] Console logs menunjukkan success
- [ ] Download count increment saat klik tombol

---

## 🆘 Masih Bermasalah?

### **1. Check Supabase Project Status**
- Login ke https://supabase.com/dashboard
- Pastikan project tidak paused
- Check project URL: `https://ryzswbexwanzxxpparfq.supabase.co`

### **2. Test di Incognito Mode**
- Buka browser incognito
- Navigate ke `http://localhost:5173`
- Check console untuk errors

### **3. Clear Cache**
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Reinstall dependencies
npm install

# Restart dev server
npm run dev
```

### **4. Check Firewall/Antivirus**
- Pastikan firewall tidak block koneksi ke Supabase
- Test dengan disable antivirus sementara

### **5. Test Internet Connection**
```javascript
// Di browser console
const response = await fetch('https://supabase.com')
console.log('Internet connection:', response.ok)
```

---

**Last Updated:** April 13, 2026  
**Status:** 🔧 Enhanced error handling & CORS setup guide
