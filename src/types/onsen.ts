export type OnsenType = 
  | 'chloride'
  | 'bicarbonate'
  | 'sulfur'
  | 'carbonated'
  | 'sulfate'
  | 'simple'
  | 'ferruginous'
  | 'acidic'
  | 'radon'
  | 'alkaline';

export interface Question {
  id: number;
  text: string;
  description: string;
  weight?: number; // Question weight (0.10 to 0.30) - optional for V1 compatibility
  hardBoosters?: Record<string, Partial<Record<OnsenType, number>>>; // Hard boosters per option text
  options: QuestionOption[];
}

export interface QuestionOption {
  id: string;
  text: string;
  weights: Partial<Record<OnsenType, number>>;
}

export interface OnsenDestination {
  name: string;
  kanji: string;
  location: string;
  description: string;
}

export interface OnsenResult {
  type: OnsenType;
  title: string;
  japaneseTitle: string;
  emoji: string;
  characteristics: string;
  effects: string;
  idealFor: string;
  experience: string;
  description: string;
  destinations: OnsenDestination[];
}

export type QuizAnswers = Record<number, string>;

// V2 Algorithm types
export interface CalculationResult {
  topType: OnsenType;
  topPercentage: number; // 0-100
  alternativeType?: OnsenType;
  alternativePercentage?: number;
  confidence: 'high' | 'medium' | 'exploratory';
  rawScores: Record<OnsenType, number>; // For debugging
  frequencyAdjusted: boolean; // If frequency balance was applied
}

export interface OnsenFrequency {
  onsen_type: OnsenType;
  frequency: number; // 0-1
  result_count: number;
}
