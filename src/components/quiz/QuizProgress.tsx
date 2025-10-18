import { Progress } from '@/components/ui/progress';

interface QuizProgressProps {
  progress: number;
}

export const QuizProgress = ({ progress }: QuizProgressProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Progreso</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <Progress 
        value={progress} 
        className="h-2"
      />
    </div>
  );
};
