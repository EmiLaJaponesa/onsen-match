import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';
import { OnsenType } from '@/types/onsen';
import { relatedOnsenTypes } from '@/data/relatedTypes';
import { onsenResults } from '@/data/onsenTypes';

interface RelatedTypesSectionProps {
  currentType: OnsenType;
}

export const RelatedTypesSection = ({ currentType }: RelatedTypesSectionProps) => {
  const related = relatedOnsenTypes[currentType];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Lightbulb className="w-7 h-7 text-primary" />
        <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
          También te podría gustar
        </h3>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {related.map((item, index) => {
          const onsenInfo = onsenResults[item.type];
          return (
            <div
              key={index}
              className="p-6 rounded-xl backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg space-y-3"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-lg md:text-xl font-semibold text-foreground">
                  {onsenInfo.title.split(' – ')[0]}
                </h4>
                <span className="text-2xl">{onsenInfo.emoji}</span>
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                {item.reason}
              </p>
              <Button 
                asChild 
                variant="outline" 
                className="w-full mt-2"
                size="sm"
              >
                <Link to={`/result/${item.type}`}>
                  Ver detalles
                </Link>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
