import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizAnswers } from '@/types/onsen';
import { questions } from '@/data/questions';
import { calculateOnsenType } from '@/utils/calculateResult';
import { saveQuizAnswer, saveQuizResult } from '@/utils/saveQuizData';
import { useToast } from '@/hooks/use-toast';

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

  const handleNext = useCallback(async () => {
    if (!selectedOption || isSaving) return;

    setIsSaving(true);

    const newAnswers = { ...answers, [question.id]: selectedOption };
    setAnswers(newAnswers);

    await saveQuizAnswer(question.id, selectedOption);

    if (isLastQuestion) {
      const result = calculateOnsenType(newAnswers);
      const saveResult = await saveQuizResult(result, newAnswers);
      
      if (!saveResult.success) {
        toast({
          title: "Advertencia",
          description: "No se pudo guardar el resultado, pero puedes continuar.",
          variant: "destructive",
        });
      }
      
      setIsSaving(false);
      navigate(`/result/${result}`);
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
