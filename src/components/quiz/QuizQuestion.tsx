import { CardTitle, CardDescription } from '@/components/ui/card';

interface QuizQuestionProps {
  questionNumber: number;
  totalQuestions: number;
  text: string;
  description: string;
}

export const QuizQuestion = ({ 
  questionNumber, 
  totalQuestions, 
  text, 
  description 
}: QuizQuestionProps) => {
  return (
    <div className="space-y-4 pb-8">
      <div className="flex items-center justify-between">
        <CardTitle className="text-3xl md:text-4xl">
          Pregunta {questionNumber}
        </CardTitle>
        <span className="text-sm font-medium text-white backdrop-blur-md bg-primary/90 px-4 py-2 rounded-full shadow-soft">
          {questionNumber} / {totalQuestions}
        </span>
      </div>
      <CardDescription className="text-xl md:text-2xl font-medium text-foreground">
        {text}
      </CardDescription>
      <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
};
