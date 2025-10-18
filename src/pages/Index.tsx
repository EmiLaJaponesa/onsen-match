import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import onsenHero from '@/assets/onsen-hero.jpg';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Background with Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${onsenHero})` }}
      >
        <div className="absolute inset-0 hero-gradient" />
        {/* CSS Mist Effect */}
        <div className="mist-effect" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-20">
          <main className="max-w-4xl mx-auto text-center">
            {/* Main Title with Animation */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in drop-shadow-lg">
              Descubre el tipo de onsen perfecto para ti
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/90 mb-12 animate-fade-in drop-shadow-md font-light" style={{ animationDelay: '0.1s' }}>
              Tu cuerpo, tu piel y tu mente te dirán cuál necesitas.
            </p>

            {/* Glass Card with Info */}
            <div className="glass-card p-8 md:p-10 mb-10 text-left max-w-2xl mx-auto shadow-large animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <p className="text-lg md:text-xl text-white drop-shadow-lg leading-relaxed">
                En Japón, cada onsen (agua termal natural) tiene una energía distinta: 
                algunas relajan el cuerpo, otras mejoran la piel o ayudan a dormir mejor.
              </p>
              <p className="text-lg md:text-xl text-white drop-shadow-lg leading-relaxed mt-4">
                Responde unas breves preguntas y descubre cuál sería tu tipo de agua ideal.
              </p>
            </div>

            {/* CTA Button */}
            <Button 
              size="lg" 
              className="text-lg md:text-xl px-12 py-8 shadow-[0_0_30px_hsl(28_60%_55%/0.4)] hover:shadow-[0_0_40px_hsl(28_60%_55%/0.6)] hover:scale-110 transition-smooth animate-fade-in bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold"
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
