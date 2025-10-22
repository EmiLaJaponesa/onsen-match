import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getGoogleMapsUrl, getDirectionsUrl } from '@/utils/mapsHelper';

interface DestinationCardProps {
  name: string;
  kanji: string;
  location: string;
  description: string;
}

export const DestinationCard = ({ name, kanji, location, description }: DestinationCardProps) => {
  const destination = { name, kanji, location, description };
  return (
    <div className="p-6 rounded-xl backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border border-transparent hover:bg-white/70 dark:hover:bg-gray-800/70 hover:border-primary/30 hover:scale-105 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-2xl will-change-transform cursor-pointer h-full">
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
        
        {/* Google Maps buttons */}
        <div className="flex gap-2 mt-4">
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1"
            asChild
          >
            <a 
              href={getGoogleMapsUrl(destination)} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={`Ver ${name} en Google Maps`}
            >
              <MapPin className="w-4 h-4 mr-1" />
              Ver mapa
            </a>
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1"
            asChild
          >
            <a 
              href={getDirectionsUrl(destination)} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={`Cómo llegar a ${name}`}
            >
              <Navigation className="w-4 h-4 mr-1" />
              Cómo llegar
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};
