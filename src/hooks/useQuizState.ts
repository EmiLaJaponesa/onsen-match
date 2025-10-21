import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizAnswers } from '@/types/onsen';
import { questions } from '@/data/questions';
import { calculateOnsenType } from '@/utils/calculateResult';
import { calculateOnsenTypeV2 } from '@/utils/calculateResultV2';
import { saveQuizAnswer, saveQuizResult } from '@/utils/saveQuizData';

const USE_V2_ALGORITHM = import.meta.env.VITE_USE_V2_ALGORITHM === 'true';
import { useToast } from '@/hooks/use-toast';
import { trackEvent } from '@/utils/analytics';
import { onsenImages } from '@/utils/onsenImages';

export const useQuizState = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Track quiz start
  useEffect(() => {
    if (currentQuestion === 0 && Object.keys(answers).length === 0) {
      const startTime = Date.now().toString();
      localStorage.setItem('quiz_start_time', startTime);
      
      trackEvent({ 
        eventType: 'quiz_started',
        eventData: { question_count: questions.length }
      });
    }
  }, [currentQuestion, answers]);

  const handleNext = useCallback(async () => {
    if (!selectedOption || isSaving) return;

    setIsSaving(true);

    const newAnswers = { ...answers, [question.id]: selectedOption };
    setAnswers(newAnswers);

    await saveQuizAnswer(question.id, selectedOption);

    if (isLastQuestion) {
      const calculationResult = USE_V2_ALGORITHM 
        ? await calculateOnsenTypeV2(newAnswers)
        : { topType: calculateOnsenType(newAnswers), topPercentage: 100, confidence: 'high' as const, rawScores: {}, frequencyAdjusted: false };
      
      const result = calculationResult.topType;
      
      // Prefetch result image
      if (onsenImages[result]) {
        const img = new Image();
        img.src = onsenImages[result];
      }
      
      // Calculate time spent
      const startTime = localStorage.getItem('quiz_start_time');
      const timeSpent = startTime ? Math.floor((Date.now() - parseInt(startTime)) / 1000) : null;
      
      // Track quiz completion
      trackEvent({
        eventType: 'quiz_completed',
        eventData: { 
          result: result,
          time_spent: timeSpent,
          algorithm_version: USE_V2_ALGORITHM ? 'v2' : 'v1'
        }
      });
      
      const saveResult = await saveQuizResult(result, newAnswers, timeSpent);
      
      if (!saveResult.success) {
        toast({
          title: "Advertencia",
          description: "No se pudo guardar el resultado, pero puedes continuar.",
          variant: "destructive",
        });
      }
      
      localStorage.removeItem('quiz_start_time');
      setIsSaving(false);
      
      navigate(`/result/${result}`, { state: { calculationResult: USE_V2_ALGORITHM ? calculationResult : undefined } });
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption('');
      setIsSaving(false);
    }
  }, [selectedOption, isSaving, answers, question, isLastQuestion, currentQuestion, navigate, toast]);

  const handleBack = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const previousAnswer = answers[questions[currentQuestion - 1].id];
      setSelectedOption(previousAnswer || '');
    } else {
      navigate('/');
    }
  }, [currentQuestion, answers, navigate]);

  return {
    currentQuestion,
    question,
    selectedOption,
    setSelectedOption,
    isSaving,
    isLastQuestion,
    progress,
    handleNext,
    handleBack,
  };
};
