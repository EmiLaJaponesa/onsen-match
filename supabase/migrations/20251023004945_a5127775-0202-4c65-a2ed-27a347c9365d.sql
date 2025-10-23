-- Phase 1: alkaline → yodo migration (正しい順序)

-- Step 1: 既存の制約を削除
ALTER TABLE quiz_results DROP CONSTRAINT IF EXISTS valid_onsen_type;
ALTER TABLE onsen_type_frequency DROP CONSTRAINT IF EXISTS valid_onsen_type;

-- Step 2: データを更新（制約なしの状態で）
UPDATE quiz_results 
SET onsen_type = 'yodo' 
WHERE onsen_type = 'alkaline';

UPDATE onsen_type_frequency 
SET onsen_type = 'yodo' 
WHERE onsen_type = 'alkaline';

-- Step 3: 新しい制約を追加（yodoを含む）
ALTER TABLE quiz_results 
ADD CONSTRAINT valid_onsen_type 
CHECK (onsen_type IN (
  'chloride', 
  'bicarbonate', 
  'sulfur', 
  'carbonated', 
  'sulfate', 
  'simple', 
  'ferruginous', 
  'acidic', 
  'radon', 
  'yodo'
));

ALTER TABLE onsen_type_frequency 
ADD CONSTRAINT valid_onsen_type 
CHECK (onsen_type IN (
  'chloride', 
  'bicarbonate', 
  'sulfur', 
  'carbonated', 
  'sulfate', 
  'simple', 
  'ferruginous', 
  'acidic', 
  'radon', 
  'yodo'
));

-- Step 4: コメントを追加
COMMENT ON COLUMN quiz_results.onsen_type IS 'Onsen type classification: chloride, bicarbonate, sulfur, carbonated, sulfate, simple, ferruginous, acidic, radon, yodo';
COMMENT ON COLUMN onsen_type_frequency.onsen_type IS 'Onsen type classification: chloride, bicarbonate, sulfur, carbonated, sulfate, simple, ferruginous, acidic, radon, yodo';