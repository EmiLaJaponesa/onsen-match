import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ExternalLink, Beaker, Heart, User, Sparkles, MapPin, Share2 } from 'lucide-react';
import { onsenResults } from '@/data/onsenTypes';
import { OnsenType } from '@/types/onsen';
import { onsenImages } from '@/utils/onsenImages';
import { useToast } from '@/hooks/use-toast';
import { InfoSection } from '@/components/result/InfoSection';
import { DestinationCard } from '@/components/result/DestinationCard';
import { FAQSection } from '@/components/result/FAQSection';
import { RelatedTypesSection } from '@/components/result/RelatedTypesSection';
import useEmblaCarousel from 'embla-carousel-react';
import { useState, useEffect } from 'react';

const Result = () => {
  const { type } = useParams<{ type: OnsenType }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [emblaRef] = useEmblaCarousel({ loop: false, align: 'start' });
  
  const result = type ? onsenResults[type] : null;
  const resultImage = type ? onsenImages[type] : null;

  // Scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getShareText = () => {
    return `¡Descubrí mi tipo de onsen ideal: ${result?.title}! 🇯🇵♨️ Encuentra el tuyo aquí:`;
  };

  const getShareUrl = () => window.location.href;

  const handleTwitterShare = () => {
    const text = getShareText();
    const url = getShareUrl();
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const handleFacebookShare = () => {
    const url = getShareUrl();
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const handleWhatsAppShare = () => {
    const text = getShareText();
    const url = getShareUrl();
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
  };

  const handleInstagramShare = async () => {
    const url = getShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "¡Enlace copiado!",
        description: "Pégalo en tu historia o publicación de Instagram",
      });
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
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
        <div 
          className="h-full bg-primary transition-all duration-150 will-change-[width]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Share Button */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <div className="relative">
          {showShareMenu && (
            <div className="absolute bottom-16 right-0 bg-background/95 backdrop-blur-lg border border-border rounded-lg shadow-xl p-3 space-y-2 animate-fade-in will-change-[opacity,transform]">
              <Button
                onClick={handleTwitterShare}
                variant="outline"
                size="sm"
                className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-black/5 hover:border-black/20"
                aria-label="Compartir en X (Twitter)"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                X
              </Button>
              <Button
                onClick={handleFacebookShare}
                variant="outline"
                size="sm"
                className="w-full justify-start text-muted-foreground hover:text-blue-600 hover:bg-blue-500/5 hover:border-blue-500/20"
                aria-label="Compartir en Facebook"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>
              <Button
                onClick={handleWhatsAppShare}
                variant="outline"
                size="sm"
                className="w-full justify-start text-muted-foreground hover:text-green-600 hover:bg-green-500/5 hover:border-green-500/20"
                aria-label="Compartir en WhatsApp"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp
              </Button>
              <Button
                onClick={handleInstagramShare}
                variant="outline"
                size="sm"
                className="w-full justify-start text-muted-foreground hover:text-purple-600 hover:bg-purple-500/5 hover:border-purple-500/20"
                aria-label="Compartir en Instagram"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </Button>
            </div>
          )}
          <Button
            onClick={() => setShowShareMenu(!showShareMenu)}
            size="icon"
            className="h-14 w-14 rounded-full shadow-2xl bg-primary hover:bg-primary/90 transition-transform hover:scale-110 will-change-transform"
          >
            <Share2 className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Fixed CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border p-4 z-40 md:hidden shadow-2xl">
        <Button 
          className="w-full h-12 text-base font-bold bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          asChild
        >
          <a 
            href="https://japontoursenespanol.com/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            ¡Quiero viajar a Japón!
          </a>
        </Button>
      </div>

      <div className="container mx-auto px-4 pb-20 md:pb-4">
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
              </div>
            )}

            <div className="backdrop-blur-md bg-white/50 dark:bg-gray-800/50 p-8 md:p-12 text-center border-b border-white/20">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full backdrop-blur-sm bg-primary/20 mb-6 animate-scale-in">
                <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-primary" />
              </div>
              <CardTitle className="text-2xl md:text-3xl mb-4 text-foreground">
                Tu tipo de onsen ideal es:
              </CardTitle>
              <div className="space-y-2">
                <CardDescription className="text-3xl md:text-5xl font-bold text-primary">
                  {result.title.split(' – ')[0]}
                </CardDescription>
                {result.title.split(' – ')[1] && (
                  <CardDescription className="text-xl md:text-2xl font-semibold text-primary/80">
                    {result.title.split(' – ')[1]}
                  </CardDescription>
                )}
                <CardDescription className="text-lg md:text-xl text-primary/70 mt-2">
                  {result.japaneseTitle}
                </CardDescription>
              </div>
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

              {/* Description Section - Enhanced readability */}
              <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
                  Descripción
                </h3>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed" style={{ lineHeight: '1.8' }}>
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
                
                {/* Mobile Carousel */}
                <div className="md:hidden overflow-hidden" ref={emblaRef}>
                  <div className="flex gap-4">
                    {result.destinations.map((destination, index) => (
                      <div key={index} className="flex-[0_0_85%] min-w-0">
                        <DestinationCard 
                          name={destination.name}
                          kanji={destination.kanji}
                          location={destination.location}
                          description={destination.description}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop Grid */}
                <div className="hidden md:grid gap-4 md:grid-cols-2">
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

              {/* Related Types Section */}
              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <RelatedTypesSection currentType={type as OnsenType} />
              </div>

              {/* FAQ Section */}
              <div className="animate-fade-in" style={{ animationDelay: '0.45s' }}>
                <FAQSection />
              </div>

              {/* CTA Section - Redesigned */}
              <div className="space-y-6 animate-fade-in will-change-[opacity,transform]" style={{ animationDelay: '0.5s' }}>
                <div className="backdrop-blur-md bg-gradient-to-br from-secondary/20 to-secondary/10 border-2 border-secondary/30 rounded-3xl p-10 md:p-14 space-y-8 shadow-2xl">
                  <div className="text-center space-y-3">
                    <p className="text-2xl md:text-3xl font-bold text-foreground">
                      ¿Quieres visitar un onsen de {result.title}?
                    </p>
                    <p className="text-lg text-muted-foreground">
                      Tours personalizados con expertos locales
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 pt-2">
                      <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">✓ Guías en español</span>
                      <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">✓ Experiencias auténticas</span>
                      <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">✓ Sin complicaciones</span>
                    </div>
                  </div>
                  
                  {/* Main CTA Button - Large and prominent */}
                  <Button 
                    className="w-full min-h-[48px] md:min-h-[80px] text-lg md:text-2xl font-bold transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-secondary/50 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-2xl py-4 will-change-transform"
                    size="lg"
                    asChild
                  >
                    <a 
                      href="https://japontoursenespanol.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center whitespace-normal text-center"
                    >
                      <span className="whitespace-normal">¡Sí, quiero viajar a Japón!</span>
                    </a>
                  </Button>
                </div>
                
                {/* Social Share Buttons */}
                <div className="text-center pt-6 space-y-4">
                  <p className="text-sm text-muted-foreground font-medium">
                    Comparte tu resultado:
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center items-center">
                    {/* Twitter/X Button */}
                    <Button
                      onClick={handleTwitterShare}
                      variant="outline"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground hover:bg-black/5 hover:border-black/20"
                      aria-label="Compartir en X (Twitter)"
                    >
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      X
                    </Button>

                    {/* Facebook Button */}
                    <Button
                      onClick={handleFacebookShare}
                      variant="outline"
                      size="sm"
                      className="text-muted-foreground hover:text-blue-600 hover:bg-blue-500/5 hover:border-blue-500/20"
                      aria-label="Compartir en Facebook"
                    >
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </Button>

                    {/* WhatsApp Button */}
                    <Button
                      onClick={handleWhatsAppShare}
                      variant="outline"
                      size="sm"
                      className="text-muted-foreground hover:text-green-600 hover:bg-green-500/5 hover:border-green-500/20"
                      aria-label="Compartir en WhatsApp"
                    >
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      WhatsApp
                    </Button>

                    {/* Instagram Button */}
                    <Button
                      onClick={handleInstagramShare}
                      variant="outline"
                      size="sm"
                      className="text-muted-foreground hover:text-purple-600 hover:bg-purple-500/5 hover:border-purple-500/20"
                      aria-label="Compartir en Instagram"
                    >
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      Instagram
                    </Button>
                  </div>
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
