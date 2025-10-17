import { QuizAnswers, OnsenType } from '@/types/onsen';
import { questions } from '@/data/questions';

export function calculateOnsenType(answers: QuizAnswers): OnsenType {
  const scores: Partial<Record<OnsenType, number>> = {};

  Object.entries(answers).forEach(([questionId, optionId]) => {
    const question = questions.find(q => q.id === Number(questionId));
    if (!question) return;

    const option = question.options.find(o => o.id === optionId);
    if (!option) return;

    Object.entries(option.weights).forEach(([type, weight]) => {
      const onsenType = type as OnsenType;
      scores[onsenType] = (scores[onsenType] || 0) + weight;
    });
  });

  let maxScore = 0;
  let resultType: OnsenType = 'simple';

  Object.entries(scores).forEach(([type, score]) => {
    if (score > maxScore) {
      maxScore = score;
      resultType = type as OnsenType;
    }
  });

  return resultType;
}
