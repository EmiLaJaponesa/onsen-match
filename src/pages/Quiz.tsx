import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { QuizQuestion } from '@/components/quiz/QuizQuestion';
import { QuizOptions } from '@/components/quiz/QuizOptions';
import { QuizProgress } from '@/components/quiz/QuizProgress';
import { QuizNavigation } from '@/components/quiz/QuizNavigation';
import { useQuizState } from '@/hooks/useQuizState';
import { questions } from '@/data/questions';
import { Footer } from '@/components/layout/Footer';

const Quiz = () => {
  const {
    currentQuestion,
    question,
    selectedOption,
    setSelectedOption,
    isSaving,
    isLastQuestion,
    progress,
    handleNext,
    handleBack,
  } = useQuizState();

  return (
    <div className="min-h-screen bg-background">
      <div className="py-12 md:py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-2xl border border-white/20 animate-fade-in backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 transition-all duration-300 hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.2)]">
              <CardHeader className="space-y-4">
                <QuizQuestion 
                  questionNumber={currentQuestion + 1}
                  totalQuestions={questions.length}
                  text={question.text}
                  description={question.description}
                />
              </CardHeader>
              
              <CardContent className="space-y-8">
                <QuizOptions 
                  options={question.options}
                  selectedOption={selectedOption}
                  onOptionChange={setSelectedOption}
                />

                <div className="pt-6 space-y-6">
                  <QuizProgress progress={progress} />
                  
                  <QuizNavigation 
                    onBack={handleBack}
                    onNext={handleNext}
                    disabled={!selectedOption || isSaving}
                    isSaving={isSaving}
                    isLastQuestion={isLastQuestion}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Quiz;
