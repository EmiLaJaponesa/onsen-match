-- Add new columns for improved diagnosis system
ALTER TABLE quiz_results
ADD COLUMN IF NOT EXISTS alternative_type TEXT,
ADD COLUMN IF NOT EXISTS alternative_percentage NUMERIC,
ADD COLUMN IF NOT EXISTS raw_scores JSONB,
ADD COLUMN IF NOT EXISTS confidence_level TEXT CHECK (confidence_level IN ('high', 'medium', 'exploratory'));

-- Add index for confidence level queries
CREATE INDEX IF NOT EXISTS idx_quiz_results_confidence ON quiz_results(confidence_level);

COMMENT ON COLUMN quiz_results.alternative_type IS 'Secondary onsen type recommendation';
COMMENT ON COLUMN quiz_results.alternative_percentage IS 'Score percentage for alternative type';
COMMENT ON COLUMN quiz_results.raw_scores IS 'All onsen type scores from diagnosis';
COMMENT ON COLUMN quiz_results.confidence_level IS 'Confidence level: high (≥75%), medium (60-74%), exploratory (<60%)';