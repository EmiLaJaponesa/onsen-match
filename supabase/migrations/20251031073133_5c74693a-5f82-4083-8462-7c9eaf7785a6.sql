-- Add admin-only SELECT policies for analytics tables
-- This prevents unauthorized access to user behavior data

CREATE POLICY "Admins can view analytics events"
ON public.analytics_events
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view quiz attempts"
ON public.quiz_attempts
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view quiz results"
ON public.quiz_results
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view UTM tracking"
ON public.utm_tracking
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));