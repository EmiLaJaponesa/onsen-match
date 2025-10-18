-- Create analytics_events table for flexible event tracking
CREATE TABLE public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL,
  event_type TEXT NOT NULL,
  event_data JSONB,
  page_path TEXT,
  referrer TEXT,
  device_type TEXT,
  browser_language TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for query performance
CREATE INDEX idx_analytics_session ON public.analytics_events(session_id);
CREATE INDEX idx_analytics_event_type ON public.analytics_events(event_type);
CREATE INDEX idx_analytics_created_at ON public.analytics_events(created_at);

-- Enable RLS
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert analytics events (anonymous tracking)
CREATE POLICY "Anyone can insert analytics events"
ON public.analytics_events
FOR INSERT
WITH CHECK (true);

-- Allow anyone to read analytics events (for dashboard)
CREATE POLICY "Anyone can read analytics events"
ON public.analytics_events
FOR SELECT
USING (true);

-- Create utm_tracking table for campaign tracking
CREATE TABLE public.utm_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  landing_page TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index for utm tracking
CREATE INDEX idx_utm_session ON public.utm_tracking(session_id);
CREATE INDEX idx_utm_source ON public.utm_tracking(utm_source);

-- Enable RLS
ALTER TABLE public.utm_tracking ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert UTM tracking data
CREATE POLICY "Anyone can insert utm tracking"
ON public.utm_tracking
FOR INSERT
WITH CHECK (true);

-- Allow anyone to read UTM tracking data
CREATE POLICY "Anyone can read utm tracking"
ON public.utm_tracking
FOR SELECT
USING (true);

-- Extend quiz_results table with analytics fields
ALTER TABLE public.quiz_results
ADD COLUMN completed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
ADD COLUMN time_spent_seconds INTEGER,
ADD COLUMN device_type TEXT,
ADD COLUMN referrer_domain TEXT;