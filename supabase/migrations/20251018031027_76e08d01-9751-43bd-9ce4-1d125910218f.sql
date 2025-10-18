-- Create tables for quiz results tracking

-- Table for storing quiz results
CREATE TABLE IF NOT EXISTS public.quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL,
  onsen_type TEXT NOT NULL,
  answers JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  
  -- Add constraint for valid onsen types
  CONSTRAINT valid_onsen_type CHECK (
    onsen_type IN (
      'chloride', 'bicarbonate', 'sulfur', 'carbonated', 
      'sulfate', 'simple', 'ferruginous', 'acidic', 'radon', 'alkaline'
    )
  )
);

-- Table for storing individual quiz attempts (each answer)
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL,
  question_id INTEGER NOT NULL,
  selected_option_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Allow anyone to insert and read their own data
CREATE POLICY "Anyone can insert quiz results"
  ON public.quiz_results
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read quiz results"
  ON public.quiz_results
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert quiz attempts"
  ON public.quiz_attempts
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read quiz attempts"
  ON public.quiz_attempts
  FOR SELECT
  USING (true);

-- Create indexes for better query performance
CREATE INDEX idx_quiz_results_session_id ON public.quiz_results(session_id);
CREATE INDEX idx_quiz_results_created_at ON public.quiz_results(created_at DESC);
CREATE INDEX idx_quiz_attempts_session_id ON public.quiz_attempts(session_id);
CREATE INDEX idx_quiz_attempts_created_at ON public.quiz_attempts(created_at DESC);