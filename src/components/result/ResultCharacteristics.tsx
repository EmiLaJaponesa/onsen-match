import { Beaker, Heart, User, Sparkles } from 'lucide-react';
import { InfoSection } from './InfoSection';

interface ResultCharacteristicsProps {
  characteristics: string;
  effects: string;
  idealFor: string;
  experience: string;
}

export const ResultCharacteristics = ({ 
  characteristics, 
  effects, 
  idealFor, 
  experience 
}: ResultCharacteristicsProps) => {
  return (
    <>
      <div className="animate-fade-in" style={{ animationDelay: '0.15s' }}>
        <InfoSection 
          icon={<Beaker className="w-6 h-6" />}
          title="Características"
          content={characteristics}
        />
      </div>

      <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <InfoSection 
          icon={<Heart className="w-6 h-6" />}
          title="Efectos"
          content={effects}
        />
      </div>

      <div className="animate-fade-in" style={{ animationDelay: '0.25s' }}>
        <InfoSection 
          icon={<User className="w-6 h-6" />}
          title="Ideal para"
          content={idealFor}
        />
      </div>

      <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <InfoSection 
          icon={<Sparkles className="w-6 h-6" />}
          title="Experiencia"
          content={experience}
        />
      </div>
    </>
  );
};
