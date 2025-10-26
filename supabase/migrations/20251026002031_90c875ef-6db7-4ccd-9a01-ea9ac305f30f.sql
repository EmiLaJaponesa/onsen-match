-- Phase 2: 動的画像管理システム

-- 1. 泉質画像専用バケット作成
INSERT INTO storage.buckets (id, name, public)
VALUES ('onsen-images', 'onsen-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. RLSポリシー設定（誰でも読み取り可能）
DROP POLICY IF EXISTS "Public read access" ON storage.objects;
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'onsen-images');

-- 3. 泉質マスターテーブル作成
CREATE TABLE IF NOT EXISTS onsen_type_config (
  type TEXT PRIMARY KEY CHECK (type IN ('chloride', 'bicarbonate', 'sulfur', 'carbonated', 'sulfate', 'simple', 'ferruginous', 'acidic', 'radon', 'yodo')),
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. RLS有効化（公開データなので全員読み取り可能）
ALTER TABLE onsen_type_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read access for onsen types" ON onsen_type_config;
CREATE POLICY "Public read access for onsen types"
ON onsen_type_config FOR SELECT
USING (true);

-- 5. 初期データ投入
INSERT INTO onsen_type_config (type, title, subtitle, image_url, display_order) VALUES
  ('chloride', 'Cloruro', 'Hidratante y cálido', 'https://llvdddwcitjllpzzprpx.supabase.co/storage/v1/object/public/onsen-images/chloride.jpg', 1),
  ('bicarbonate', 'Bicarbonato', 'Suaviza la piel', 'https://llvdddwcitjllpzzprpx.supabase.co/storage/v1/object/public/onsen-images/bicarbonate.jpg', 2),
  ('sulfur', 'Azufre', 'Purificante', 'https://llvdddwcitjllpzzprpx.supabase.co/storage/v1/object/public/onsen-images/sulfur.jpg', 3),
  ('carbonated', 'Carbonatado', 'Revitalizante', 'https://llvdddwcitjllpzzprpx.supabase.co/storage/v1/object/public/onsen-images/carbonated.jpg', 4),
  ('sulfate', 'Sulfato', 'Relajante muscular', 'https://llvdddwcitjllpzzprpx.supabase.co/storage/v1/object/public/onsen-images/sulfate.jpg', 5),
  ('simple', 'Simple', 'Suave y delicado', 'https://llvdddwcitjllpzzprpx.supabase.co/storage/v1/object/public/onsen-images/simple.jpg', 6),
  ('ferruginous', 'Ferruginoso', 'Rico en hierro', 'https://llvdddwcitjllpzzprpx.supabase.co/storage/v1/object/public/onsen-images/ferruginous.jpg', 7),
  ('acidic', 'Ácido', 'Estimulante', 'https://llvdddwcitjllpzzprpx.supabase.co/storage/v1/object/public/onsen-images/acidic.jpg', 8),
  ('radon', 'Radón', 'Terapéutico', 'https://llvdddwcitjllpzzprpx.supabase.co/storage/v1/object/public/onsen-images/radon.jpg', 9),
  ('yodo', 'Yodada', 'Rejuvenecedor', 'https://llvdddwcitjllpzzprpx.supabase.co/storage/v1/object/public/onsen-images/yodo.jpg', 10)
ON CONFLICT (type) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  image_url = EXCLUDED.image_url,
  display_order = EXCLUDED.display_order,
  updated_at = NOW();

-- 6. トリガー関数（更新日時自動更新）
CREATE OR REPLACE FUNCTION update_onsen_type_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS onsen_type_config_updated_at ON onsen_type_config;
CREATE TRIGGER onsen_type_config_updated_at
BEFORE UPDATE ON onsen_type_config
FOR EACH ROW
EXECUTE FUNCTION update_onsen_type_updated_at();