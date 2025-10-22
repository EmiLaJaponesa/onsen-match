-- Remove overly permissive UPDATE policy on frequency table
-- The trigger function uses SECURITY DEFINER and will bypass RLS anyway
DROP POLICY IF EXISTS "System can update frequencies" ON public.onsen_type_frequency;