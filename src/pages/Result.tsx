import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { OnsenType } from '@/types/onsen';
import { useOnsenResult } from '@/hooks/useOnsenResult';
import { useOnsenDiagnosis } from '@/hooks/useOnsenDiagnosis';
import { normalizeOnsenType } from '@/utils/onsenTypeMapper';
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
import { ConfidenceBadge } from '@/components/result/ConfidenceBadge';
import { AlternativeType } from '@/components/result/AlternativeType';
import { EXTERNAL_LINKS } from '@/constants/app';
import { onsenResults } from '@/data/onsenTypes';
import { ResultCard } from '@/components/layout/ResultCard';
import { Container } from '@/components/layout/Container';

const Result = () => {
  const { type: rawType } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const type = normalizeOnsenType(rawType) as OnsenType;
  const { result, image } = useOnsenResult(type);
  const { confidence, alternativeType, alternativeScore, isLoading } = useOnsenDiagnosis(type);

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

      <Container className="pb-24 md:pb-4">
        <ResultCard>
          <ResultHero 
            image={image}
            title={result.title}
            japaneseTitle={result.japaneseTitle}
          />

          {/* Confidence Badge */}
          {!isLoading && confidence && (
            <div className="flex justify-center animate-fade-in">
              <ConfidenceBadge 
                level={confidence} 
                score={confidence === 'high' ? 85 : confidence === 'medium' ? 67 : 55} 
              />
            </div>
          )}

          <ResultDescription description={result.description} />
          
          <ResultCharacteristics 
            characteristics={result.characteristics}
            effects={result.effects}
            idealFor={result.idealFor}
            experience={result.experience}
          />

          {/* Alternative Type */}
          {!isLoading && alternativeType && alternativeScore && (
            <AlternativeType 
              type={alternativeType}
              score={alternativeScore}
              result={onsenResults[alternativeType]}
            />
          )}

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
        </ResultCard>
      </Container>

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
