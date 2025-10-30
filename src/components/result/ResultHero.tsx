import { CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';

interface ResultHeroProps {
  image: string;
  title: string;
  japaneseTitle: string;
}

export const ResultHero = ({ image, title, japaneseTitle }: ResultHeroProps) => {
  return (
    <>
      <div className="relative h-64 md:h-80 overflow-hidden">
        <OptimizedImage
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90" />
      </div>

      <div className="backdrop-blur-md bg-white/50 dark:bg-gray-800/50 p-8 md:p-12 text-center border-b border-white/20">
        <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full backdrop-blur-sm bg-primary/20 mb-6 animate-scale-in">
          <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-primary" />
        </div>
        <CardTitle className="text-2xl md:text-3xl mb-4 text-foreground">
          Tu tipo de onsen ideal es:
        </CardTitle>
        <div className="space-y-2">
          <CardDescription className="text-3xl md:text-5xl font-bold text-primary">
            {title.split(' – ')[0]}
          </CardDescription>
          {title.split(' – ')[1] && (
            <CardDescription className="text-xl md:text-2xl font-semibold text-primary/80">
              {title.split(' – ')[1]}
            </CardDescription>
          )}
          <CardDescription className="text-lg md:text-xl text-primary/70 mt-2">
            {japaneseTitle}
          </CardDescription>
        </div>
      </div>
    </>
  );
};
