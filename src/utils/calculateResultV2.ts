import { QuizAnswers, OnsenType, CalculationResult, OnsenFrequency } from '@/types/onsen';
import { questionsV2 } from '@/data/questionsV2';
import { supabase } from '@/integrations/supabase/client';

// Algorithm constants
const FREQUENCY_PENALTY = 0.15; // 15% penalty per frequency unit
const RARE_BOOST_THRESHOLD = 0.10; // If Top2 is within 10% of Top1
const RARE_BOOST_AMOUNT = 0.05;
const ALTERNATIVE_GAP_THRESHOLD = 0.08; // 8% difference to show alternative

/**
 * V2 Algorithm: Weighted calculation with normalization and balancing
 */
export async function calculateOnsenTypeV2(
  answers: QuizAnswers
): Promise<CalculationResult> {
  // 1. Fetch historical frequencies
  const frequencies = await fetchFrequencies();
  
  // 2. Initialize scores
  const scores: Record<OnsenType, number> = initializeScores();
  
  // 3. Process each question with normalization
  for (const [qIdStr, optionId] of Object.entries(answers)) {
    const qId = Number(qIdStr);
    const question = questionsV2.find(q => q.id === qId);
    if (!question) continue;
    
    const option = question.options.find(o => o.id === optionId);
    if (!option) continue;
    
    // 3a. Normalize option weights (0-1)
    const normalized = normalizeWeights(option.weights);
    
    // 3b. Apply question weight and accumulate
    for (const [type, value] of Object.entries(normalized)) {
      scores[type as OnsenType] += value * (question.weight || 0.25);
    }
    
    // 3c. Apply hard boosters if applicable
    if (question.hardBoosters && question.hardBoosters[option.text]) {
      applyHardBoosters(scores, question.hardBoosters[option.text]);
    }
  }
  
  // 4. Apply frequency balancing
  const frequencyAdjusted = applyFrequencyBalance(scores, frequencies);
  
  // 5. Apply rare boost (if Q6 points to rare type and it's close to top)
  const q6Answer = answers[6];
  if (q6Answer) {
    applyRareBoost(scores, q6Answer, frequencies);
  }
  
  // 6. Normalize to percentages
  const percentages = normalizeToPercentages(scores);
  
  // 7. Get top 2
  const sorted = Object.entries(percentages)
    .sort(([, a], [, b]) => b - a);
  
  const [top1Type, top1Pct] = sorted[0];
  const [top2Type, top2Pct] = sorted[1] || [null, 0];
  
  // 8. Determine if showing alternative
  const gap = top1Pct - top2Pct;
  const showAlternative = gap < ALTERNATIVE_GAP_THRESHOLD * 100;
  
  // 9. Classify confidence
  const confidence = classifyConfidence(top1Pct);
  
  return {
    topType: top1Type as OnsenType,
    topPercentage: Math.round(top1Pct * 100) / 100, // 2 decimals
    alternativeType: showAlternative ? (top2Type as OnsenType) : undefined,
    alternativePercentage: showAlternative ? Math.round(top2Pct * 100) / 100 : undefined,
    confidence,
    rawScores: scores,
    frequencyAdjusted
  };
}

// ========== HELPERS ==========

function initializeScores(): Record<OnsenType, number> {
  return {
    chloride: 0,
    bicarbonate: 0,
    sulfur: 0,
    carbonated: 0,
    sulfate: 0,
    simple: 0,
    ferruginous: 0,
    acidic: 0,
    radon: 0,
    alkaline: 0
  };
}

async function fetchFrequencies(): Promise<Record<OnsenType, number>> {
  const { data, error } = await supabase
    .from('onsen_type_frequency')
    .select('onsen_type, frequency');
  
  if (error) {
    console.error('Error fetching frequencies:', error);
    return initializeScores();
  }
  
  const freqs = initializeScores();
  for (const item of data || []) {
    freqs[item.onsen_type as OnsenType] = item.frequency;
  }
  return freqs;
}

/**
 * Min-max normalization: scales values to 0-1
 */
function normalizeWeights(
  weights: Partial<Record<OnsenType, number>>
): Record<OnsenType, number> {
  const values = Object.values(weights).filter(v => v !== undefined);
  
  if (values.length === 0) {
    return initializeScores();
  }
  
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;
  
  if (range === 0) {
    // All values equal → 1.0 for all
    const normalized: any = {};
    for (const type of Object.keys(weights)) {
      normalized[type] = 1.0;
    }
    return normalized;
  }
  
  const normalized: any = {};
  for (const [type, value] of Object.entries(weights)) {
    normalized[type] = (value - min) / range;
  }
  
  return normalized;
}

function applyHardBoosters(
  scores: Record<OnsenType, number>,
  boosters: Partial<Record<OnsenType, number>>
) {
  for (const [type, boost] of Object.entries(boosters)) {
    if (boost !== undefined) {
      scores[type as OnsenType] += boost;
    }
  }
}

/**
 * Frequency penalty: popular types get lower scores
 * score[t] = score[t] * (1 - PENALTY * freq[t])
 */
function applyFrequencyBalance(
  scores: Record<OnsenType, number>,
  frequencies: Record<OnsenType, number>
): boolean {
  let adjusted = false;
  
  for (const type of Object.keys(scores) as OnsenType[]) {
    const freq = frequencies[type] || 0;
    if (freq > 0) {
      scores[type] *= (1 - FREQUENCY_PENALTY * freq);
      adjusted = true;
    }
  }
  
  return adjusted;
}

/**
 * Rare boost: if Q6 points to rare type and it's close to top
 */
function applyRareBoost(
  scores: Record<OnsenType, number>,
  q6OptionId: string,
  frequencies: Record<OnsenType, number>
) {
  // Get question 6
  const q6 = questionsV2.find(q => q.id === 6);
  if (!q6) return;
  
  const option = q6.options.find(o => o.id === q6OptionId);
  if (!option) return;
  
  // Types mentioned in Q6
  const q6Types = Object.keys(option.weights) as OnsenType[];
  
  // Current top score
  const maxScore = Math.max(...Object.values(scores));
  
  for (const type of q6Types) {
    const freq = frequencies[type] || 0;
    const isRare = freq < 0.05; // Less than 5% appearance
    const isNearTop = scores[type] >= maxScore * (1 - RARE_BOOST_THRESHOLD);
    
    if (isRare && isNearTop) {
      scores[type] += RARE_BOOST_AMOUNT;
    }
  }
}

/**
 * Convert scores to percentages (0-100)
 */
function normalizeToPercentages(
  scores: Record<OnsenType, number>
): Record<OnsenType, number> {
  const total = Object.values(scores).reduce((sum, s) => sum + s, 0);
  
  if (total === 0) {
    // Fallback: uniform distribution
    return Object.fromEntries(
      Object.keys(scores).map(t => [t, 10]) // 10% each
    ) as Record<OnsenType, number>;
  }
  
  const percentages: any = {};
  for (const [type, score] of Object.entries(scores)) {
    percentages[type] = (score / total) * 100;
  }
  
  return percentages;
}

function classifyConfidence(percentage: number): 'high' | 'medium' | 'exploratory' {
  if (percentage >= 75) return 'high';
  if (percentage >= 60) return 'medium';
  return 'exploratory';
}
