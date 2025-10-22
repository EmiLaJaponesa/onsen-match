import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { OnsenType } from '@/types/onsen';
import { useOnsenResult } from '@/hooks/useOnsenResult';
import { ScrollProgress } from '@/components/result/ScrollProgress';
import { ShareButton } from '@/components/result/ShareButton';
import { ResultHero } from '@/components/result/ResultHero';
import { ResultDescription } from '@/components/result/ResultDescription';
import { ResultCharacteristics } from '@/components/result/ResultCharacteristics';
import { ResultDestinations } from '@/components/result/ResultDestinations';
import { ResultCTA } from '@/components/result/ResultCTA';
import { FAQSection } from '@/components/result/FAQSection';
import { Footer } from '@/components/layout/Footer';
import { RelatedTypesSection } from '@/components/result/RelatedTypesSection';
import { EXTERNAL_LINKS } from '@/constants/app';

const Result = () => {
  const { type } = useParams<{ type: OnsenType }>();
  const navigate = useNavigate();
  const { result, image } = useOnsenResult(type);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [type]);

  if (!result || !image) {
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
      <ScrollProgress />
      <ShareButton title={result.title} />

      <div className="py-12 md:py-20">
        <div className="container mx-auto px-4 pb-24 md:pb-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="shadow-2xl border border-white/20 animate-fade-in overflow-hidden backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 transition-all duration-300">
            <ResultHero 
              image={image}
              title={result.title}
              japaneseTitle={result.japaneseTitle}
            />

            <CardContent className="p-8 md:p-12 space-y-10">
              <ResultDescription description={result.description} />
              
              <ResultCharacteristics 
                characteristics={result.characteristics}
                effects={result.effects}
                idealFor={result.idealFor}
                experience={result.experience}
              />

              <ResultDestinations destinations={result.destinations} />

              <ResultCTA onsenType={result.title.split(' – ')[0]} />

              <RelatedTypesSection currentType={result.type} />

              <FAQSection />

              <div className="text-center pt-6">
                <Link to="/" className="inline-block">
                  <Button variant="outline" size="lg">
                    Volver al inicio
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>

      {/* Mobile Sticky CTA Bar */}
      <div className="sticky bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border p-4 z-40 md:hidden shadow-2xl">
        <Button 
          className="w-full h-12 text-base font-bold bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          asChild
        >
          <a 
            href={EXTERNAL_LINKS.JAPAN_TOURS}
            target="_blank" 
            rel="noopener noreferrer"
          >
            ¡Quiero viajar a Japón!
          </a>
        </Button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Result;
