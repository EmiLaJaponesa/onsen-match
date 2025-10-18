import { MapPin } from 'lucide-react';

interface DestinationCardProps {
  name: string;
  kanji: string;
  location: string;
  description: string;
}

export const DestinationCard = ({ name, kanji, location, description }: DestinationCardProps) => {
  return (
    <div className="p-6 rounded-xl backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border border-transparent hover:bg-white/70 dark:hover:bg-gray-800/70 hover:border-primary/30 hover:scale-[1.02] transition-all duration-300 shadow-sm hover:shadow-md">
      <div className="space-y-3">
        <div className="space-y-1">
          <div className="flex items-baseline gap-2 flex-wrap">
            <h4 className="text-lg md:text-xl font-semibold text-foreground">
              {name}
            </h4>
          <span className="text-base text-muted-foreground">
            {kanji}
          </span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-primary font-medium">
            <MapPin className="w-4 h-4" />
            {location}
          </div>
        </div>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
