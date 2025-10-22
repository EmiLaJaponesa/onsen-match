import { Link } from 'react-router-dom';
import { OnsenType, OnsenResult } from '@/types/onsen';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface AlternativeTypeProps {
  type: OnsenType;
  score: number;
  result: OnsenResult;
}

export const AlternativeType = ({ type, score, result }: AlternativeTypeProps) => {
  return (
    <div className="mt-8 p-6 rounded-xl backdrop-blur-sm bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-blue-900/30 dark:to-cyan-900/30 border border-blue-200/50 dark:border-blue-700/50 animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{result.emoji}</span>
            <h3 className="text-lg font-semibold text-foreground">
              Opción alternativa cercana
            </h3>
          </div>
          
          <p className="text-base font-medium text-foreground mb-1">
            {result.title} ({score}%)
          </p>
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            {result.characteristics}
          </p>
          
          <p className="text-xs text-muted-foreground mt-3 italic">
            💡 Esta opción también coincide bien con tus respuestas. Considera explorar ambos tipos.
          </p>
        </div>
        
        <Link to={`/result/${type}`}>
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            Ver detalles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
