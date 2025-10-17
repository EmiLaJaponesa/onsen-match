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

export interface OnsenResult {
  type: OnsenType;
  title: string;
  description: string;
  destinations: string[];
}

export type QuizAnswers = Record<number, string>;
