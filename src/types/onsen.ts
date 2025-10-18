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
  emoji: string;
  characteristics: string;
  effects: string;
  idealFor: string;
  experience: string;
  description: string;
  destinations: OnsenDestination[];
}

export type QuizAnswers = Record<number, string>;
