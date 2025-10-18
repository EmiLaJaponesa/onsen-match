import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { EXTERNAL_LINKS } from '@/constants/app';

interface ResultCTAProps {
  onsenType: string;
}

export const ResultCTA = ({ onsenType }: ResultCTAProps) => {
  return (
    <div className="space-y-6 animate-fade-in will-change-[opacity,transform]" style={{ animationDelay: '0.4s' }}>
      <div className="backdrop-blur-md bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 border-2 border-border rounded-3xl p-10 md:p-14 space-y-8 shadow-2xl">
        <div className="text-center space-y-3">
          <p className="text-2xl md:text-3xl font-bold text-foreground">
            ¿Quieres visitar un onsen de {onsenType}?
          </p>
          <p className="text-lg text-muted-foreground">
            Tours personalizados con expertos locales
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">✓ Guías en español</span>
            <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">✓ Experiencias auténticas</span>
            <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">✓ Sin complicaciones</span>
          </div>
        </div>
        <Button 
          className="w-full py-4 px-6 text-base md:text-lg font-bold bg-secondary hover:bg-secondary/90 text-secondary-foreground transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          asChild
          size="lg"
        >
          <a 
            href={EXTERNAL_LINKS.JAPAN_TOURS}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            ¡Quiero viajar a Japón!
            <ExternalLink className="w-5 h-5" />
          </a>
        </Button>
      </div>
    </div>
  );
};
