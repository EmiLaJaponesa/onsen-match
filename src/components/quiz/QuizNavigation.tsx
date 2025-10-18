import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface QuizNavigationProps {
  onBack: () => void;
  onNext: () => void;
  disabled: boolean;
  isSaving: boolean;
  isLastQuestion: boolean;
}

export const QuizNavigation = ({ 
  onBack, 
  onNext, 
  disabled, 
  isSaving, 
  isLastQuestion 
}: QuizNavigationProps) => {
  return (
    <div className="flex gap-4">
      <Button
        variant="outline"
        onClick={onBack}
        className="flex-1 h-12 text-base transition-smooth hover:scale-105"
        size="lg"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Atrás
      </Button>
      <Button
        onClick={onNext}
        disabled={disabled}
        className="flex-1 h-12 text-base transition-smooth hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        size="lg"
      >
        {isSaving ? 'Guardando...' : (isLastQuestion ? 'Ver resultado' : 'Siguiente')}
        {!isSaving && !isLastQuestion && <ArrowRight className="ml-2 h-5 w-5" />}
      </Button>
    </div>
  );
};
