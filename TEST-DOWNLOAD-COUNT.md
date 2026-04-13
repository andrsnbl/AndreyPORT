# 🧪 Testing Script: Download Count

## Cara Testing di Browser Console

### 1. **Buka Browser DevTools**
- Tekan `F12` atau `Ctrl+Shift+I` (Windows/Linux)
- Buka tab **Console**

### 2. **Test Environment Variables**
```javascript
// Cek apakah Supabase terkonfigurasi
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('Supabase Anon Key:', import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 20) + '...')
```

**Expected:**
- URL harus valid (https://...)
- Anon key tidak boleh undefined

### 3. **Test Supabase Client**
```javascript
// Import Supabase client
import { supabase } from './src/lib/supabase.js'

// Cek apakah client initialized
console.log('Supabase client:', supabase ? '✅ Initialized' : '❌ Not initialized')

// Test connection dengan query sederhana
const { data, error } = await supabase.from('stats').select('*').eq('id', 'main').single()
console.log('Direct query result:', { data, error })
```

### 4. **Test getDownloadCount Function**
```javascript
// Import function
import { getDownloadCount } from './src/lib/supabase.js'

// Test
const count = await getDownloadCount()
console.log('Download count:', count)
```

**Expected Output:**
```
[Supabase] Fetching download count...
[Supabase] Download count fetched: 0
Download count: 0
```

### 5. **Test incrementDownloadCount Function**
```javascript
// Import function
import { incrementDownloadCount } from './src/lib/supabase.js'

// Test
const newCount = await incrementDownloadCount()
console.log('New download count:', newCount)
```

**Expected Output:**
```
[Supabase] Incrementing download count...
[Supabase] Download count incremented to: 1
New download count: 1
```

### 6. **Test Full Flow (Download CV)**
```javascript
// Simulate download
console.log('Simulating CV download...')
const beforeCount = await getDownloadCount()
console.log('Before:', beforeCount)

const afterCount = await incrementDownloadCount()
console.log('After:', afterCount)

console.log('Increment successful:', afterCount === beforeCount + 1)
```

---

## 🧪 Automated Test Script

Copy script ini ke browser console untuk testing otomatis:

```javascript
(async function testDownloadCount() {
  console.group('🧪 Download Count Test Suite')
  
  try {
    // Test 1: Environment Check
    console.log('\n📋 Test 1: Environment Check')
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Environment variables not configured')
      console.groupEnd()
      return
    }
    console.log('✅ Environment variables configured')
    
    // Test 2: Import Functions
    console.log('\n📋 Test 2: Import Functions')
    const { getDownloadCount, incrementDownloadCount } = await import('./src/lib/supabase.js')
    console.log('✅ Functions imported successfully')
    
    // Test 3: Get Initial Count
    console.log('\n📋 Test 3: Get Initial Count')
    const initialCount = await getDownloadCount()
    if (initialCount === null) {
      console.error('❌ Failed to get download count')
      console.groupEnd()
      return
    }
    console.log(`✅ Initial count: ${initialCount}`)
    
    // Test 4: Increment Count
    console.log('\n📋 Test 4: Increment Count')
    const newCount = await incrementDownloadCount()
    if (newCount === null) {
      console.error('❌ Failed to increment download count')
      console.groupEnd()
      return
    }
    console.log(`✅ New count: ${newCount}`)
    
    // Test 5: Verify Increment
    console.log('\n📋 Test 5: Verify Increment')
    if (newCount === initialCount + 1) {
      console.log(`✅ Increment verified: ${initialCount} + 1 = ${newCount}`)
    } else {
      console.error(`❌ Increment mismatch: expected ${initialCount + 1}, got ${newCount}`)
    }
    
    // Test 6: Get Count Again
    console.log('\n📋 Test 6: Verify Persistence')
    const verifiedCount = await getDownloadCount()
    if (verifiedCount === newCount) {
      console.log(`✅ Count persisted correctly: ${verifiedCount}`)
    } else {
      console.error(`❌ Count mismatch: expected ${newCount}, got ${verifiedCount}`)
    }
    
    console.log('\n✅ All tests completed successfully!')
    
  } catch (error) {
    console.error('\n❌ Test suite failed:', error)
  }
  
  console.groupEnd()
})()
```

---

## 🔍 Debugging Checklist

### Jika Download Count Tidak Berjalan:

1. **Check Console Logs**
   ```
   ✅ [Supabase] Fetching download count...
   ✅ [Supabase] Download count fetched: X
   ✅ [About] Download count loaded: X
   ```

2. **Check Network Tab**
   - Buka **Network** tab di DevTools
   - Filter: `supabase.co`
   - Klik download button
   - Cek apakah ada request ke `/rpc/increment_download_count`
   - Status harus `200 OK`

3. **Check Supabase Dashboard**
   - Buka **Table Editor** → `stats` table
   - Apakah row dengan `id='main'` ada?
   - Apakah `download_count` berubah setelah klik download?

4. **Check RLS Policies**
   Jalankan di SQL Editor:
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'stats';
   ```
   Harus ada policy untuk `SELECT` dan `EXECUTE` untuk anon user.

---

## 🚀 Quick Fix Commands

### Reset Download Count ke 0:
```sql
UPDATE stats SET download_count = 0 WHERE id = 'main';
```

### Check Current Count:
```sql
SELECT download_count, updated_at FROM stats WHERE id = 'main';
```

### Manual Increment:
```sql
SELECT increment_download_count();
```

### Recreate Table (Last Resort):
```sql
DROP TABLE IF EXISTS stats CASCADE;

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

## 📊 Expected Behavior

### Normal Flow:
1. Page loads → `getDownloadCount()` dipanggil
2. Console: `[Supabase] Fetching download count...`
3. Console: `[Supabase] Download count fetched: X`
4. UI menampilkan angka download count
5. User klik "Download CV"
6. Console: `[Supabase] Incrementing download count...`
7. Console: `[Supabase] Download count incremented to: X+1`
8. UI update dengan angka baru

### Error Scenarios:
1. **No Supabase config:**
   - Console: `[Supabase] Client not initialized`
   - UI: Menampilkan fallback value

2. **Table doesn't exist:**
   - Console: `[Supabase] getDownloadCount error: relation "stats" does not exist`
   - UI: Menampilkan fallback value

3. **RLS policy missing:**
   - Console: `[Supabase] getDownloadCount error: permission denied`
   - UI: Menampilkan fallback value

---

**Last Updated:** April 13, 2026
