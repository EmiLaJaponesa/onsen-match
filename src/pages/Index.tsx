import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import onsenHero from '@/assets/onsen-hero.jpg';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Background with Minimal Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${onsenHero})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-20">
          <main className="max-w-4xl mx-auto text-center">
            {/* Main Title with Animation */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in drop-shadow-2xl">
              Descubre el tipo de onsen perfecto para ti
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/95 mb-12 animate-fade-in drop-shadow-lg font-light" style={{ animationDelay: '0.1s' }}>
              Tu cuerpo, tu piel y tu mente te dirán cuál necesitas.
            </p>

            {/* Glassmorphism Card with Info */}
            <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border border-white/30 p-8 md:p-10 mb-10 text-left max-w-2xl mx-auto rounded-2xl shadow-2xl animate-fade-in transition-all duration-300 hover:shadow-[0_12px_40px_0_rgba(0,0,0,0.3)]" style={{ animationDelay: '0.2s' }}>
              <p className="text-lg md:text-xl text-gray-900 dark:text-white leading-relaxed">
                En Japón, cada onsen (agua termal natural) tiene una energía distinta: 
                algunas relajan el cuerpo, otras mejoran la piel o ayudan a dormir mejor.
              </p>
              <p className="text-lg md:text-xl text-gray-900 dark:text-white leading-relaxed mt-4">
                Responde unas breves preguntas y descubre cuál sería tu tipo de agua ideal.
              </p>
            </div>

            {/* CTA Button */}
            <Button 
              size="lg" 
              className="text-lg md:text-xl px-12 py-8 hover:scale-105 transition-all duration-300 animate-fade-in bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold shadow-xl hover:shadow-2xl"
              style={{ animationDelay: '0.3s' }}
              onClick={() => navigate('/quiz')}
            >
              Comenzar el test
            </Button>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
