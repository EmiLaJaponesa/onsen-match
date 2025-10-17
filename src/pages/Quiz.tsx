import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { questions } from '@/data/questions';
import { QuizAnswers } from '@/types/onsen';
import { calculateOnsenType } from '@/utils/calculateResult';

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [selectedOption, setSelectedOption] = useState<string>('');

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleNext = () => {
    if (!selectedOption) return;

    const newAnswers = { ...answers, [question.id]: selectedOption };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      const result = calculateOnsenType(newAnswers);
      navigate(`/result/${result}`);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption('');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const previousAnswer = answers[questions[currentQuestion - 1].id];
      setSelectedOption(previousAnswer || '');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Pregunta {currentQuestion + 1} de {questions.length}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <Card className="p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {question.text}
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              {question.description}
            </p>

            <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
              <div className="space-y-4">
                {question.options.map((option) => (
                  <div key={option.id} className="flex items-start space-x-3">
                    <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                    <Label 
                      htmlFor={option.id} 
                      className="text-base cursor-pointer leading-relaxed flex-1"
                    >
                      {option.text}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            <div className="flex gap-4 mt-8">
              <Button 
                variant="outline" 
                onClick={handleBack}
                className="flex-1"
              >
                Atrás
              </Button>
              <Button 
                onClick={handleNext}
                disabled={!selectedOption}
                className="flex-1"
              >
                {isLastQuestion ? 'Ver resultado' : 'Siguiente'}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
