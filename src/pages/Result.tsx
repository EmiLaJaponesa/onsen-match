import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ExternalLink, Share2, Check, Beaker, Heart, User, Sparkles, MapPin, Lightbulb } from 'lucide-react';
import { onsenResults } from '@/data/onsenTypes';
import { OnsenType } from '@/types/onsen';
import { onsenImages } from '@/utils/onsenImages';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { InfoSection } from '@/components/result/InfoSection';
import { DestinationCard } from '@/components/result/DestinationCard';

const Result = () => {
  const { type } = useParams<{ type: OnsenType }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const result = type ? onsenResults[type] : null;
  const resultImage = type ? onsenImages[type] : null;

  const handleShare = async () => {
    const url = window.location.href;
    
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({
        title: "¡Enlace copiado!",
        description: "Ahora puedes compartir tu resultado",
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo copiar el enlace",
        variant: "destructive",
      });
    }
  };

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
            {/* Hero Image */}
            {resultImage && (
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img 
                  src={resultImage} 
                  alt={result.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90" />
                <div className="absolute top-4 right-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleShare}
                    className="backdrop-blur-md bg-white/80 hover:bg-white/90 dark:bg-gray-800/80 dark:hover:bg-gray-800/90 shadow-lg"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4 mr-2" />
                        Compartir
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            <div className="backdrop-blur-md bg-white/50 dark:bg-gray-800/50 p-8 md:p-12 text-center border-b border-white/20">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full backdrop-blur-sm bg-primary/20 mb-6 animate-scale-in">
                <Lightbulb className="w-10 h-10 md:w-12 md:h-12 text-primary" />
              </div>
              <CardTitle className="text-2xl md:text-3xl mb-4 text-foreground">
                Tu tipo de onsen ideal es:
              </CardTitle>
              <CardDescription className="text-3xl md:text-5xl font-bold text-primary">
                {result.title}
              </CardDescription>
            </div>

            <CardContent className="p-8 md:p-12 space-y-10">
              {/* Características Section */}
              <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <InfoSection 
                  icon={<Beaker className="w-6 h-6" />}
                  title="Características"
                  content={result.characteristics}
                />
              </div>

              {/* Efectos Section */}
              <div className="animate-fade-in" style={{ animationDelay: '0.15s' }}>
                <InfoSection 
                  icon={<Heart className="w-6 h-6" />}
                  title="Efectos"
                  content={result.effects}
                />
              </div>

              {/* Ideal para Section */}
              <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <InfoSection 
                  icon={<User className="w-6 h-6" />}
                  title="Ideal para"
                  content={result.idealFor}
                />
              </div>

              {/* Experiencia Section with gradient background */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 animate-fade-in" style={{ animationDelay: '0.25s' }}>
                <InfoSection 
                  icon={<Sparkles className="w-6 h-6" />}
                  title="Experiencia"
                  content={result.experience}
                />
              </div>

              {/* Description Section */}
              <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <h3 className="text-2xl font-semibold text-foreground">
                  Descripción
                </h3>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  {result.description}
                </p>
              </div>

              {/* Destinations Section */}
              <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.35s' }}>
                <div className="flex items-center gap-3">
                  <MapPin className="w-7 h-7 text-primary" />
                  <h3 className="text-2xl font-semibold text-foreground">
                    Destinos recomendados
                  </h3>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {result.destinations.map((destination, index) => (
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

              {/* CTA Section - Redesigned */}
              <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="backdrop-blur-md bg-gradient-to-br from-secondary/20 to-secondary/10 border-2 border-secondary/30 rounded-3xl p-10 md:p-14 space-y-8 shadow-2xl">
                  <div className="text-center space-y-3">
                    <p className="text-2xl md:text-3xl font-bold text-foreground">
                      ¿Quieres visitar un onsen con este tipo de agua?
                    </p>
                    <p className="text-lg text-muted-foreground">
                      Descubre experiencias únicas en Japón
                    </p>
                  </div>
                  
                  {/* Main CTA Button - Large and prominent */}
                  <Button 
                    className="w-full h-16 md:h-20 text-lg md:text-2xl font-bold transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-secondary/50 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-2xl"
                    size="lg"
                    asChild
                  >
                    <a 
                      href="https://japontoursenespanol.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-3 h-6 w-6 md:h-7 md:w-7" />
                      Consulta tu viaje a Japón
                    </a>
                  </Button>
                </div>
                
                {/* Secondary link - Small and subtle */}
                <div className="text-center pt-4">
                  <button
                    onClick={() => navigate('/')}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
                  >
                    ← Volver al inicio
                  </button>
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
