import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { onsenResults } from '@/data/onsenTypes';
import { OnsenType } from '@/types/onsen';

const Result = () => {
  const { type } = useParams<{ type: OnsenType }>();
  const navigate = useNavigate();
  
  const result = type ? onsenResults[type] : null;

  if (!result) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Resultado no encontrado</h2>
          <Button onClick={() => navigate('/')}>Volver al inicio</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 md:p-12">
            <div className="text-center mb-8">
              <p className="text-lg text-muted-foreground mb-2">
                Tu tipo de onsen ideal es:
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {result.title}
              </h1>
            </div>

            <div className="mb-8">
              <p className="text-lg text-foreground leading-relaxed">
                {result.description}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Destinos recomendados:
              </h2>
              <ul className="space-y-2">
                {result.destinations.map((destination, index) => (
                  <li 
                    key={index}
                    className="text-lg text-foreground pl-4 border-l-4 border-primary"
                  >
                    {destination}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border pt-8 text-center">
              <p className="text-lg text-foreground mb-6">
                ¿Quieres visitar un onsen con este tipo de agua?
              </p>
              <Button 
                size="lg"
                className="w-full md:w-auto px-8"
                asChild
              >
                <a 
                  href="https://japontoursenespanol.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Consulta tu viaje en JaponToursEnEspanol.com
                </a>
              </Button>
              
              <div className="mt-6">
                <Button 
                  variant="outline"
                  onClick={() => navigate('/')}
                >
                  Volver al inicio
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Result;
