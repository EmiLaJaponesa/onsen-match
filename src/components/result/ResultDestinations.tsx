import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { OnsenDestination } from '@/types/onsen';
import { DestinationCard } from './DestinationCard';
import useEmblaCarousel from 'embla-carousel-react';

interface ResultDestinationsProps {
  destinations: OnsenDestination[];
}

export const ResultDestinations = ({ destinations }: ResultDestinationsProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

  return (
    <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.35s' }}>
      <div className="flex items-center gap-3">
        <MapPin className="w-7 h-7 text-primary" />
        <h3 className="text-2xl font-semibold text-foreground">
          Destinos recomendados
        </h3>
      </div>
      
      {/* Mobile Carousel */}
      <div className="md:hidden space-y-4">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {destinations.map((destination, index) => (
              <div key={index} className="flex-[0_0_88%] min-w-0">
                <DestinationCard 
                  name={destination.name}
                  kanji={destination.kanji}
                  location={destination.location}
                  description={destination.description}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Dot Navigation */}
        {scrollSnaps.length > 1 && (
          <div className="flex justify-center gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === selectedIndex 
                    ? "bg-primary w-8" 
                    : "bg-primary/30 w-2"
                }`}
                onClick={() => scrollTo(index)}
                aria-label={`スライド${index + 1}へ移動`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid gap-4 md:grid-cols-2">
        {destinations.map((destination, index) => (
          <DestinationCard 
            key={index}
            name={destination.name}
            kanji={destination.kanji}
            location={destination.location}
            description={destination.description}
          />
        ))}
      </div>
    </div>
  );
};
