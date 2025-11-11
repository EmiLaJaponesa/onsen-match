-- フェーズ1: ストレージバケットを公開に変更（画像表示の復旧）
UPDATE storage.buckets 
SET public = true 
WHERE id = 'onsen-images';

-- フェーズ2: 重複RLSポリシーのクリーンアップ
DROP POLICY IF EXISTS "Admins and editors can update images" ON storage.objects;
DROP POLICY IF EXISTS "Public read access" ON storage.objects;

-- 残すポリシー:
-- 1. "Admins and editors can upload" (INSERT)
-- 2. "Admins and editors can update" (UPDATE)  
-- 3. "Anyone can view onsen images" (SELECT)