-- ============================================
-- FASE 1: BACKEND - FREQUENCY TRACKING SYSTEM
-- ============================================

-- 1.1 Create frequency tracking table
CREATE TABLE IF NOT EXISTS public.onsen_type_frequency (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  onsen_type text NOT NULL UNIQUE,
  frequency numeric(5,4) DEFAULT 0, -- 0.0000 to 1.0000
  result_count integer DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.onsen_type_frequency ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read frequencies (needed for algorithm)
CREATE POLICY "Anyone can read frequencies"
ON public.onsen_type_frequency
FOR SELECT
USING (true);

-- Policy: Only system can update (via trigger)
CREATE POLICY "System can update frequencies"
ON public.onsen_type_frequency
FOR UPDATE
USING (true);

-- Populate with initial onsen types (all at 0)
INSERT INTO public.onsen_type_frequency (onsen_type, frequency, result_count)
VALUES 
  ('chloride', 0, 0),
  ('bicarbonate', 0, 0),
  ('sulfur', 0, 0),
  ('carbonated', 0, 0),
  ('sulfate', 0, 0),
  ('simple', 0, 0),
  ('ferruginous', 0, 0),
  ('acidic', 0, 0),
  ('radon', 0, 0),
  ('alkaline', 0, 0)
ON CONFLICT (onsen_type) DO NOTHING;

-- 1.2 Add V2 algorithm fields to quiz_results
ALTER TABLE public.quiz_results
ADD COLUMN IF NOT EXISTS top_percentage numeric(5,2),
ADD COLUMN IF NOT EXISTS alternative_type text,
ADD COLUMN IF NOT EXISTS alternative_percentage numeric(5,2),
ADD COLUMN IF NOT EXISTS confidence_level text CHECK (confidence_level IN ('high', 'medium', 'exploratory')),
ADD COLUMN IF NOT EXISTS raw_scores jsonb;

-- Indexes for frequency queries
CREATE INDEX IF NOT EXISTS idx_quiz_results_onsen_type 
ON public.quiz_results(onsen_type);

CREATE INDEX IF NOT EXISTS idx_quiz_results_created_at 
ON public.quiz_results(created_at DESC);

-- 1.3 Automatic frequency update trigger
CREATE OR REPLACE FUNCTION update_onsen_frequencies()
RETURNS TRIGGER AS $$
DECLARE
  total_count integer;
  type_counts record;
BEGIN
  -- Count last 100 results
  SELECT COUNT(*) INTO total_count
  FROM (
    SELECT onsen_type 
    FROM public.quiz_results 
    ORDER BY created_at DESC 
    LIMIT 100
  ) recent;

  -- If not enough data, keep frequencies at 0
  IF total_count < 10 THEN
    RETURN NEW;
  END IF;

  -- Calculate frequencies per type
  FOR type_counts IN
    SELECT 
      onsen_type,
      COUNT(*)::numeric / total_count AS freq,
      COUNT(*) as cnt
    FROM (
      SELECT onsen_type 
      FROM public.quiz_results 
      ORDER BY created_at DESC 
      LIMIT 100
    ) recent
    GROUP BY onsen_type
  LOOP
    -- Update frequencies
    UPDATE public.onsen_type_frequency
    SET 
      frequency = type_counts.freq,
      result_count = type_counts.cnt,
      updated_at = now()
    WHERE onsen_type = type_counts.onsen_type;
  END LOOP;

  -- Reset types not present in last 100
  UPDATE public.onsen_type_frequency
  SET frequency = 0, result_count = 0, updated_at = now()
  WHERE onsen_type NOT IN (
    SELECT DISTINCT onsen_type 
    FROM (
      SELECT onsen_type 
      FROM public.quiz_results 
      ORDER BY created_at DESC 
      LIMIT 100
    ) recent
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Execute after each INSERT in quiz_results
DROP TRIGGER IF EXISTS trigger_update_frequencies ON public.quiz_results;
CREATE TRIGGER trigger_update_frequencies
AFTER INSERT ON public.quiz_results
FOR EACH ROW
EXECUTE FUNCTION update_onsen_frequencies();