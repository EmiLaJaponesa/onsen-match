-- Fix function search path security warning
CREATE OR REPLACE FUNCTION update_onsen_frequencies()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;