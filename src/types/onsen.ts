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
  | 'yodo';

export interface Question {
  id: number;
  text: string;
  description: string;
  options: QuestionOption[];
}

export interface QuestionOption {
  id: string;
  text: string;
  weights: Partial<Record<OnsenType, number>>;
  hardBoost?: Partial<Record<OnsenType, number>>;
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

export interface HardBoostRule {
  questionId: number;
  optionId: string;
  boosts: Partial<Record<OnsenType, number>>;
}

export interface DiagnosisResult {
  primaryType: OnsenType;
  primaryScore: number;
  alternativeType?: OnsenType;
  alternativeScore?: number;
  confidence: 'high' | 'medium' | 'exploratory';
  allScores: Record<OnsenType, number>;
}

export type QuizAnswers = Record<number, string>;
