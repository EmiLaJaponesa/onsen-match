import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { OnsenType } from '@/types/onsen';
import { useOnsenResult } from '@/hooks/useOnsenResult';
import { normalizeOnsenType } from '@/utils/onsenTypeMapper';
import { ScrollProgress } from '@/components/result/ScrollProgress';
import { ShareButton } from '@/components/result/ShareButton';
import { ResultHero } from '@/components/result/ResultHero';
import { ResultDescription } from '@/components/result/ResultDescription';
import { ResultCharacteristics } from '@/components/result/ResultCharacteristics';
import { ResultDestinations } from '@/components/result/ResultDestinations';
import { ResultCTA } from '@/components/result/ResultCTA';
import { Footer } from '@/components/layout/Footer';
import { EXTERNAL_LINKS } from '@/constants/app';
import { ResultCard } from '@/components/layout/ResultCard';
import { Container } from '@/components/layout/Container';
import { SectionSkeleton } from '@/components/ui/SectionSkeleton';

const RelatedTypesSection = lazy(() => import('@/components/result/RelatedTypesSection').then(m => ({ default: m.RelatedTypesSection })));
const FAQSection = lazy(() => import('@/components/result/FAQSection').then(m => ({ default: m.FAQSection })));

const Result = () => {
  const { type: rawType } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const type = normalizeOnsenType(rawType) as OnsenType;
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

      <Container className="pb-24 md:pb-4">
        <ResultCard>
          <ResultHero 
            image={image}
            title={result.title}
            japaneseTitle={result.japaneseTitle}
          />

          <ResultDescription description={result.description} />
          
          <ResultCharacteristics 
            characteristics={result.characteristics}
            effects={result.effects}
            idealFor={result.idealFor}
            experience={result.experience}
          />

          <ResultDestinations destinations={result.destinations} />
          <ResultCTA onsenType={result.title.split(' – ')[0]} />
          
          <Suspense fallback={<SectionSkeleton />}>
            <RelatedTypesSection currentType={result.type} />
          </Suspense>
          
          <Suspense fallback={<SectionSkeleton />}>
            <FAQSection />
          </Suspense>

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
