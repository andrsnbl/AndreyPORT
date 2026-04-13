# 🔧 Troubleshooting: Download Count Tidak Berjalan

## 📋 Masalah yang Ditemukan

Fungsi `getDownloadCount` tidak berjalan dengan baik karena:
1. ❌ Tidak ada error handling yang proper
2. ❌ Tidak ada logging untuk debugging
3. ❌ Tidak ada loading state di UI
4. ❌ Tidak ada fallback jika Supabase gagal

---

## ✅ Perbaikan yang Sudah Dilakukan

### 1. **Enhanced Error Handling di `src/lib/supabase.js`**

#### Fungsi `getDownloadCount()` - SEBELUM:
```javascript
export async function getDownloadCount() {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('stats')
    .select('download_count')
    .eq('id', 'main')
    .single()
  if (error) {
    console.error('[Supabase] getDownloadCount error:', error.message)
    return null
  }
  return data?.download_count ?? 0
}
```

#### Fungsi `getDownloadCount()` - SESUDAH:
```javascript
export async function getDownloadCount() {
  if (!supabase) {
    console.warn('[Supabase] Client not initialized. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
    return null
  }
  
  try {
    console.log('[Supabase] Fetching download count...')
    const { data, error } = await supabase
      .from('stats')
      .select('download_count')
      .eq('id', 'main')
      .single()
    
    if (error) {
      console.error('[Supabase] getDownloadCount error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return null
    }
    
    console.log('[Supabase] Download count fetched:', data?.download_count)
    return data?.download_count ?? 0
  } catch (err) {
    console.error('[Supabase] getDownloadCount unexpected error:', err.message)
    return null
  }
}
```

#### Fungsi `incrementDownloadCount()` - SESUDAH:
```javascript
export async function incrementDownloadCount() {
  if (!supabase) {
    console.warn('[Supabase] Client not initialized. Cannot increment download count')
    return null
  }
  
  try {
    console.log('[Supabase] Incrementing download count...')
    const { data, error } = await supabase.rpc('increment_download_count')
    
    if (error) {
      console.error('[Supabase] incrementDownloadCount error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return null
    }
    
    const row = Array.isArray(data) ? data[0] : data
    console.log('[Supabase] Download count incremented to:', row?.download_count)
    return row?.download_count ?? null
  } catch (err) {
    console.error('[Supabase] incrementDownloadCount unexpected error:', err.message)
    return null
  }
}
```

### 2. **Enhanced Component di `src/components/About.jsx`**

#### SEBELUM:
```javascript
const [downloadCount, setDownloadCount] = useState(null)

useEffect(() => {
  getDownloadCount().then((count) => {
    if (count !== null) setDownloadCount(count)
  })
}, [])
```

#### SESUDAH:
```javascript
const [downloadCount, setDownloadCount] = useState(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

useEffect(() => {
  let isMounted = true
  
  async function fetchDownloadCount() {
    try {
      console.log('[About] Fetching download count...')
      const count = await getDownloadCount()
      if (isMounted) {
        if (count !== null) {
          setDownloadCount(count)
          setError(null)
          console.log('[About] Download count loaded:', count)
        } else {
          setError('Failed to load download count')
          console.warn('[About] Download count is null, using fallback')
        }
      }
    } catch (err) {
      if (isMounted) {
        setError(err.message)
        console.error('[About] Error fetching download count:', err)
      }
    } finally {
      if (isMounted) setLoading(false)
    }
  }

  fetchDownloadCount()
  return () => {
    isMounted = false
  }
}, [])
```

### 3. **UI dengan Loading & Error States**

```javascript
<div className={styles.statsRow}>
  {ABOUT_STATS.map((stat, i) => {
    // Handle special case for downloads stat
    let displayValue = stat.number
    if (stat.key === 'downloads') {
      if (loading) {
        displayValue = '...' // Loading state
      } else if (error) {
        displayValue = stat.number // Fallback ke default jika error
      } else if (downloadCount !== null) {
        displayValue = downloadCount // Use actual count from Supabase
      }
    }

    return (
      <div key={stat.key} className={`${styles.statCard} fade-in fade-in-delay-${i + 1}`}>
        <span className={styles.statIcon}>{stat.icon}</span>
        <span className={styles.statNum}>
          {displayValue}
        </span>
        <span className={styles.statLabel}>
          {t(`about.stats.${stat.key}`, { defaultValue: stat.key })}
        </span>
      </div>
    )
  })}
</div>
```

---

## 🧪 Testing & Debugging

### 1. **Check Console Logs**

Jalankan aplikasi dan buka browser console:
```bash
npm run dev
```

**Log yang seharusnya muncul:**
```
[Supabase] Fetching download count...
[Supabase] Download count fetched: 0
[About] Download count loaded: 0
```

**Jika ada error:**
```
[Supabase] getDownloadCount error: {
  message: "relation \"stats\" does not exist",
  code: "42P01"
}
```

### 2. **Verifikasi Supabase Setup**

#### A. Cek Environment Variables
File `.env` harus ada dengan konfigurasi yang benar:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

#### B. Jalankan SQL Setup di Supabase Dashboard

1. Buka **Supabase Dashboard** → **SQL Editor**
2. Copy dan jalankan script dari `supabase-setup.sql`:

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

-- 3. Buat fungsi untuk increment
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

-- 4. Row Level Security (RLS)
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

-- Allow anon untuk SELECT
CREATE POLICY "Allow public read stats"
  ON stats FOR SELECT
  TO anon
  USING (true);

-- Allow anon untuk EXECUTE fungsi increment
GRANT EXECUTE ON FUNCTION increment_download_count() TO anon;
```

#### C. Verifikasi Tabel dan Fungsi

Jalankan query ini di **SQL Editor**:
```sql
-- Cek apakah tabel stats ada
SELECT * FROM stats;

-- Cek apakah fungsi ada
SELECT * FROM pg_proc WHERE proname = 'increment_download_count';

-- Cek RLS policies
SELECT * FROM pg_policies WHERE tablename = 'stats';
```

### 3. **Test Manual di Browser Console**

Buka browser console dan jalankan:
```javascript
// Test getDownloadCount
import { getDownloadCount } from './src/lib/supabase.js'
getDownloadCount().then(count => console.log('Count:', count))

// Test incrementDownloadCount
import { incrementDownloadCount } from './src/lib/supabase.js'
incrementDownloadCount().then(count => console.log('New count:', count))
```

---

## 🚨 Common Errors & Solutions

### Error 1: `relation "stats" does not exist`
**Penyebab:** Tabel `stats` belum dibuat di Supabase

**Solusi:**
1. Buka Supabase Dashboard → SQL Editor
2. Jalankan SQL setup (lihat di atas)

### Error 2: `permission denied for table stats`
**Penyebab:** RLS policy belum dikonfigurasi dengan benar

**Solusi:**
```sql
-- Enable RLS
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

-- Create policy untuk anon read
CREATE POLICY "Allow public read stats"
  ON stats FOR SELECT
  TO anon
  USING (true);
```

### Error 3: `permission denied for function increment_download_count`
**Penyebab:** Function belum di-grant ke anon user

**Solusi:**
```sql
GRANT EXECUTE ON FUNCTION increment_download_count() TO anon;
```

### Error 4: `Supabase Client not initialized`
**Penyebab:** Environment variables tidak ter-load

**Solusi:**
1. Pastikan file `.env` ada di root folder
2. Restart dev server (`npm run dev`)
3. Cek di browser console:
   ```javascript
   console.log(import.meta.env.VITE_SUPABASE_URL)
   ```

### Error 5: Download count tidak increment
**Penyebab:** RPC function tidak dipanggil dengan benar

**Solusi:**
```javascript
// Pastikan menggunakan .rpc() bukan .from()
const { data, error } = await supabase.rpc('increment_download_count')
```

---

## 📊 Monitoring & Debugging Tools

### 1. **Supabase Dashboard**

- **Table Editor:** Lihat data di tabel `stats`
- **Logs:** Cek error logs di **Settings** → **Logs**
- **API Docs:** Lihat generated API docs di **Settings** → **API**

### 2. **Browser DevTools**

- **Console:** Lihat log dari fungsi
- **Network:** Monitor Supabase API requests
- **Application:** Cek environment variables

### 3. **Manual Testing**

```javascript
// Di browser console, test langsung:
const response = await fetch('https://YOUR-PROJECT.supabase.co/rest/v1/stats?select=download_count&id=eq.main', {
  headers: {
    'apikey': 'YOUR-ANON-KEY',
    'Authorization': 'Bearer YOUR-ANON-KEY'
  }
})
const data = await response.json()
console.log('Direct API result:', data)
```

---

## ✅ Checklist Verifikasi

- [ ] File `.env` ada dengan konfigurasi yang benar
- [ ] Tabel `stats` sudah dibuat di Supabase
- [ ] Row dengan `id='main'` sudah ada di tabel `stats`
- [ ] Function `increment_download_count()` sudah dibuat
- [ ] RLS policy sudah dikonfigurasi
- [ ] Function sudah di-grant ke anon user
- [ ] Console logs menunjukkan data berhasil di-fetch
- [ ] UI menampilkan download count yang benar
- [ ] Download count increment saat tombol diklik

---

## 🎯 Next Steps

1. **Production Deployment:**
   - Setup environment variables di Netlify/Vercel
   - Test di production environment

2. **Monitoring:**
   - Setup alerts untuk errors
   - Track download events di Google Analytics

3. **Optimization:**
   - Cache download count di localStorage
   - Debounce increment calls untuk mencegah spam

---

**Last Updated:** April 13, 2026  
**Status:** ✅ Fixed - Enhanced error handling, logging, and UI states
