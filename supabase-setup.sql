-- ─────────────────────────────────────────────────────────────
--  supabase-setup.sql
--  Jalankan di Supabase Dashboard → SQL Editor
--  Untuk setup tabel dan fungsi tracking download CV
-- ─────────────────────────────────────────────────────────────

-- 1. Buat tabel stats
CREATE TABLE IF NOT EXISTS stats (
  id TEXT PRIMARY KEY DEFAULT 'main',
  download_count INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Insert row awal
INSERT INTO stats (id, download_count) VALUES ('main', 0)
ON CONFLICT (id) DO NOTHING;

-- 3. Buat fungsi untuk increment (lebih aman dari update langsung)
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

-- Allow anon untuk SELECT (membaca jumlah)
CREATE POLICY "Allow public read stats"
  ON stats FOR SELECT
  TO anon
  USING (true);

-- Allow anon untuk EXECUTE fungsi increment
GRANT EXECUTE ON FUNCTION increment_download_count() TO anon;
