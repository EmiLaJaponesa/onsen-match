import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <main className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Descubre el tipo de onsen perfecto para ti
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            Tu cuerpo, tu piel y tu mente te dirán cuál necesitas.
          </p>

          <Card className="p-8 mb-8 text-left">
            <p className="text-lg text-foreground leading-relaxed">
              En Japón, cada onsen (agua termal natural) tiene una energía distinta: 
              algunas relajan el cuerpo, otras mejoran la piel o ayudan a dormir mejor.
            </p>
            <p className="text-lg text-foreground leading-relaxed mt-4">
              Responde unas breves preguntas y descubre cuál sería tu tipo de agua ideal.
            </p>
          </Card>

          <Button 
            size="lg" 
            className="text-lg px-8 py-6"
            onClick={() => navigate('/quiz')}
          >
            Comenzar el test
          </Button>
        </main>
      </div>
    </div>
  );
};

export default Index;
