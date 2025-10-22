-- Remove public read access from all analytics tables
-- This prevents client-side queries while maintaining INSERT capabilities

DROP POLICY IF EXISTS "Anyone can read analytics events" ON public.analytics_events;
DROP POLICY IF EXISTS "Anyone can read quiz attempts" ON public.quiz_attempts;
DROP POLICY IF EXISTS "Anyone can read quiz results" ON public.quiz_results;
DROP POLICY IF EXISTS "Anyone can read utm tracking" ON public.utm_tracking;

-- Analytics data can now only be accessed via:
-- 1. Backend/admin tools with service role key
-- 2. Database functions with SECURITY DEFINER
-- 3. Supabase dashboard

-- INSERT policies remain unchanged - tracking continues to work