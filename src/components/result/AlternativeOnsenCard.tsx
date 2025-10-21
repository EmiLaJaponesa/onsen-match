import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { OnsenType } from '@/types/onsen';
import { onsenResults } from '@/data/onsenTypes';

interface AlternativeOnsenCardProps {
  type: OnsenType;
  percentage: number;
}

export const AlternativeOnsenCard = ({ type, percentage }: AlternativeOnsenCardProps) => {
  const result = onsenResults[type];
  
  return (
    <div className="mt-8 p-6 border-2 border-dashed border-primary/30 rounded-xl bg-gradient-to-br from-primary/5 to-transparent backdrop-blur-sm animate-fade-in">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Opción cercana</p>
          <h3 className="text-xl md:text-2xl font-semibold text-foreground flex items-center gap-2">
            {result.emoji} {result.title}
          </h3>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{percentage}%</p>
          <p className="text-xs text-muted-foreground">compatibilidad</p>
        </div>
      </div>
      
      <p className="text-sm md:text-base text-muted-foreground mb-4">
        {result.characteristics}
      </p>
      
      <Button 
        asChild 
        variant="outline" 
        className="w-full group hover:bg-primary/10 hover:text-primary hover:border-primary/50"
      >
        <Link to={`/result/${type}`}>
          Ver detalles completos
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </Button>
    </div>
  );
};
