import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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
    <div className="min-h-screen bg-background py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-large border-border/50 animate-fade-in">
            <CardHeader className="space-y-4 pb-8">
              <div className="flex items-center justify-between">
                <CardTitle className="text-3xl md:text-4xl">
                  Pregunta {currentQuestion + 1}
                </CardTitle>
                <span className="text-sm font-medium text-muted-foreground bg-muted px-4 py-2 rounded-full">
                  {currentQuestion + 1} / {questions.length}
                </span>
              </div>
              <CardDescription className="text-xl md:text-2xl font-medium text-foreground">
                {question.text}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {question.description}
              </p>

              <RadioGroup 
                value={selectedOption} 
                onValueChange={setSelectedOption}
                className="space-y-3"
              >
                {question.options.map((option) => (
                  <div 
                    key={option.id} 
                    className={`group relative flex items-center space-x-4 p-5 rounded-xl border-2 transition-smooth cursor-pointer
                      ${selectedOption === option.id
                        ? 'border-primary bg-primary/5 shadow-soft' 
                        : 'border-border hover:border-primary/50 hover:bg-accent/5'
                      }`}
                  >
                    <RadioGroupItem 
                      value={option.id}
                      id={option.id}
                      className="transition-smooth"
                    />
                    <Label 
                      htmlFor={option.id}
                      className="flex-1 cursor-pointer text-base md:text-lg leading-relaxed"
                    >
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="pt-6 space-y-6">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Progreso</span>
                    <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                  </div>
                  <Progress 
                    value={((currentQuestion + 1) / questions.length) * 100} 
                    className="h-2"
                  />
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1 h-12 text-base transition-smooth hover:scale-105"
                    size="lg"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Atrás
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!selectedOption}
                    className="flex-1 h-12 text-base transition-smooth hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    size="lg"
                  >
                    {isLastQuestion ? 'Ver resultado' : 'Siguiente'}
                    {!isLastQuestion && <ArrowRight className="ml-2 h-5 w-5" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
