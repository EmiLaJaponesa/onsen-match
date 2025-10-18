import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ExternalLink, Home, Sparkles } from 'lucide-react';
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
    <div className="min-h-screen bg-background py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Result Card */}
          <Card className="shadow-2xl border border-white/20 animate-fade-in overflow-hidden backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 transition-all duration-300">
            <div className="backdrop-blur-md bg-white/50 dark:bg-gray-800/50 p-8 md:p-12 text-center border-b border-white/20">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full backdrop-blur-sm bg-primary/20 mb-6 animate-scale-in">
                <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-primary" />
              </div>
              <CardTitle className="text-2xl md:text-3xl mb-4 text-foreground">
                Tu tipo de onsen ideal es:
              </CardTitle>
              <CardDescription className="text-3xl md:text-5xl font-bold text-primary">
                {result.title}
              </CardDescription>
            </div>

            <CardContent className="p-8 md:p-12 space-y-8">
              {/* Description Section */}
              <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <h3 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                  Descripción
                </h3>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  {result.description}
                </p>
              </div>

              {/* Destinations Section */}
              <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-2xl font-semibold text-foreground">
                  Destinos recomendados
                </h3>
                <div className="grid gap-3">
                  {result.destinations.map((destination, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-3 p-4 rounded-lg backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border border-transparent hover:bg-white/70 dark:hover:bg-gray-800/70 hover:border-primary/30 hover:scale-[1.01] transition-all duration-200"
                    >
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                      <span className="text-base md:text-lg text-foreground">
                        {destination}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="backdrop-blur-md bg-white/60 dark:bg-gray-800/60 border border-white/30 rounded-2xl p-8 md:p-10 space-y-6 shadow-xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="text-center space-y-2">
                  <p className="text-xl md:text-2xl font-semibold text-foreground">
                    ¿Quieres visitar un onsen con este tipo de agua?
                  </p>
                  <p className="text-base text-muted-foreground">
                    Descubre experiencias únicas en Japón
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="flex-1 h-14 text-base md:text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    size="lg"
                    asChild
                  >
                    <a 
                      href="https://japontoursenespanol.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-5 w-5" />
                      Consulta tu viaje
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 h-14 text-base md:text-lg transition-all duration-200 hover:scale-105 backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border-2"
                    size="lg"
                    onClick={() => navigate('/')}
                  >
                    <Home className="mr-2 h-5 w-5" />
                    Volver al inicio
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Result;
