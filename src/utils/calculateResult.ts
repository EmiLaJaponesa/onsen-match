import { QuizAnswers, OnsenType, DiagnosisResult } from '@/types/onsen';
import { questions } from '@/data/questions';
import { hardBoostRules } from '@/data/hardBoosts';
import { supabase } from '@/integrations/supabase/client';

/**
 * Question weights according to sommelier methodology
 * Q6 (specific indications) has highest priority at 30%
 */
const QUESTION_WEIGHTS = [0.15, 0.10, 0.10, 0.15, 0.20, 0.30];

const ALL_TYPES: OnsenType[] = [
  'simple', 'chloride', 'bicarbonate', 'sulfate', 'carbonated',
  'ferruginous', 'acidic', 'alkaline', 'sulfur', 'radon'
];

/**
 * Min-Max normalization (0-1 scale) for fair comparison
 */
function normalize(scores: Record<OnsenType, number>): Record<OnsenType, number> {
  const values = Object.values(scores);
  const min = Math.min(...values);
  const max = Math.max(...values);
  
  if (max === min) return scores;
  
  const normalized: Partial<Record<OnsenType, number>> = {};
  for (const [type, score] of Object.entries(scores)) {
    normalized[type as OnsenType] = (score - min) / (max - min);
  }
  return normalized as Record<OnsenType, number>;
}

/**
 * Get frequency data from last 100 quiz results
 * Used to balance onsen type distribution
 */
async function getFrequencyData(): Promise<Record<OnsenType, number>> {
  try {
    const { data } = await supabase
      .from('onsen_type_frequency')
      .select('onsen_type, frequency');
    
    const freq: Partial<Record<OnsenType, number>> = {};
    data?.forEach(row => {
      freq[row.onsen_type as OnsenType] = row.frequency || 0;
    });
    
    ALL_TYPES.forEach(type => {
      if (!(type in freq)) freq[type] = 0;
    });
    
    return freq as Record<OnsenType, number>;
  } catch (error) {
    console.error('Frequency data fetch failed:', error);
    return ALL_TYPES.reduce((acc, type) => ({ ...acc, [type]: 0 }), {}) as Record<OnsenType, number>;
  }
}

/**
 * Main diagnosis function - Sommelier style with specific indication priority
 * 
 * Algorithm:
 * 1. Calculate scores per question with weights
 * 2. Apply hard boosts for distinctive choices
 * 3. Balance by frequency (reduce overrepresented types)
 * 4. Rare type rescue (boost underrepresented if Q6 matches)
 * 5. Select top 2 and calculate confidence
 */
export async function calculateOnsenType(answers: QuizAnswers): Promise<DiagnosisResult> {
  // Step 1: Calculate scores for each question
  const questionScores: Record<OnsenType, number>[] = [];
  
  for (let qIndex = 0; qIndex < questions.length; qIndex++) {
    const question = questions[qIndex];
    const optionId = answers[question.id];
    const option = question.options.find(o => o.id === optionId);
    
    if (!option) continue;
    
    // Initialize raw scores from option weights
    const rawScores: Partial<Record<OnsenType, number>> = {};
    ALL_TYPES.forEach(type => rawScores[type] = 0);
    
    Object.entries(option.weights).forEach(([type, weight]) => {
      rawScores[type as OnsenType] = weight;
    });
    
    // Normalize to 0-1 scale, then apply question weight
    const normalizedScores = normalize(rawScores as Record<OnsenType, number>);
    const weightedScores: Record<OnsenType, number> = {} as Record<OnsenType, number>;
    
    ALL_TYPES.forEach(type => {
      weightedScores[type] = normalizedScores[type] * QUESTION_WEIGHTS[qIndex];
    });
    
    questionScores.push(weightedScores);
  }
  
  // Step 2: Sum all question scores
  const totalScores: Record<OnsenType, number> = {} as Record<OnsenType, number>;
  ALL_TYPES.forEach(type => {
    totalScores[type] = questionScores.reduce((sum, qScore) => sum + qScore[type], 0);
  });
  
  // Step 3: Apply hard boosts for distinctive choices
  hardBoostRules.forEach(rule => {
    const selectedOptionId = answers[rule.questionId];
    if (selectedOptionId === rule.optionId) {
      Object.entries(rule.boosts).forEach(([type, boost]) => {
        totalScores[type as OnsenType] += boost;
      });
    }
  });
  
  // Step 4: Frequency balance correction
  // Penalize overrepresented types by 15% of their frequency
  const frequencies = await getFrequencyData();
  ALL_TYPES.forEach(type => {
    totalScores[type] = totalScores[type] * (1 - 0.15 * frequencies[type]);
  });
  
  // Step 5: Rare type rescue
  // If Q6 suggests a rare type (within 10% of top score), give +5% bonus
  const q6Answer = answers[6];
  const q6Option = questions[5].options.find(o => o.id === q6Answer);
  
  if (q6Option) {
    const sortedTypes = ALL_TYPES.sort((a, b) => totalScores[b] - totalScores[a]);
    const topScore = totalScores[sortedTypes[0]];
    
    Object.keys(q6Option.weights).forEach(type => {
      const t = type as OnsenType;
      if (totalScores[t] >= topScore * 0.9 && totalScores[t] <= topScore * 1.0) {
        totalScores[t] += 0.05;
      }
    });
  }
  
  // Step 6: Normalize to percentages (0-100)
  const sum = ALL_TYPES.reduce((acc, type) => acc + totalScores[type], 0);
  const percentages: Record<OnsenType, number> = {} as Record<OnsenType, number>;
  
  ALL_TYPES.forEach(type => {
    percentages[type] = sum > 0 ? (totalScores[type] / sum) * 100 : 0;
  });
  
  // Step 7: Select top 2 results
  const sortedResults = ALL_TYPES
    .map(type => ({ type, score: percentages[type] }))
    .sort((a, b) => b.score - a.score);
  
  const primary = sortedResults[0];
  const secondary = sortedResults[1];
  const gap = primary.score - secondary.score;
  
  // Step 8: Determine confidence level
  let confidence: 'high' | 'medium' | 'exploratory';
  if (primary.score >= 75) confidence = 'high';
  else if (primary.score >= 60) confidence = 'medium';
  else confidence = 'exploratory';
  
  return {
    primaryType: primary.type,
    primaryScore: Math.round(primary.score),
    alternativeType: gap < 8 ? secondary.type : undefined,
    alternativeScore: gap < 8 ? Math.round(secondary.score) : undefined,
    confidence,
    allScores: percentages
  };
}
