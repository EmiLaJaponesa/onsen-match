import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import onsenHero from "@/assets/onsen-hero-new.webp";
import { OnsenStatsSection } from "@/components/hero/OnsenStatsSection";
import { SectionSkeleton } from "@/components/ui/SectionSkeleton";
import { Footer } from "@/components/layout/Footer";

// Lazy load heavy sections for better initial load performance
const ServiceFeaturesSection = lazy(() => import("@/components/hero/ServiceFeaturesSection").then(m => ({ default: m.ServiceFeaturesSection })));
const OnsenTypesPreview = lazy(() => import("@/components/hero/OnsenTypesPreview").then(m => ({ default: m.OnsenTypesPreview })));
const FAQSection = lazy(() => import("@/components/result/FAQSection").then(m => ({ default: m.FAQSection })));
const FinalCTASection = lazy(() => import("@/components/hero/FinalCTASection").then(m => ({ default: m.FinalCTASection })));

const Index = () => {
  const navigate = useNavigate();
  const [heroLoaded, setHeroLoaded] = useState(false);

  // Tiny 20x12 base64 placeholder (1KB) for instant FCP
  const heroPlaceholder = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAMABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAcI/8QAJBAAAgEEAQQCAwAAAAAAAAAAAQIDBAUGBxEAEiExCBMUQVH/xAAVAQEBAAAAAAAAAAAAAAAAAAAGCP/EAB4RAAIBBAMBAAAAAAAAAAAAAAECAwAEBRExEhOB/9oADAMBAAIRAxEAPwBm5B5T5O5Kv9cvWQ3+puVQyh3aRlWPY2I1vtP1g8nqQCQCSo2dVbkrmvPt0vHf9eYrr7WIqYQxokiHwrKRsHb3kz5p/HvKmLZ5c73Z7bI9uvchM6dDq0U/ftXo/Igb0R/sav8Ay17blyaXyzaanJpKpF3cAXuAn7IqggE/bO3gDXPXGlsXbFKgBPv33q//2Q==";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Hero Background with Enhanced Overlay and LQIP */}
        <div className="absolute inset-0">
          {/* Low-quality placeholder for instant FCP */}
          {!heroLoaded && (
            <img
              src={heroPlaceholder}
              alt=""
              className="w-full h-full object-cover blur-xl scale-110"
              aria-hidden="true"
            />
          )}
          {/* Main hero image */}
          <img
            src={onsenHero}
            alt="Japanese Onsen"
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              heroLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            fetchPriority="high"
            decoding="async"
            width="1920"
            height="1080"
            onLoad={() => setHeroLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="container mx-auto px-4 py-20">
            <main className="max-w-5xl mx-auto text-center space-y-12">
              {/* Main Title */}
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-8 animate-fade-in leading-[1.1] px-2"
                style={{ animationDelay: "0.1s" }}
              >
                Descubre tu tipo de Onsen japonés ideal
              </h1>

              {/* Subtitle */}
              <p
                className="text-2xl md:text-3xl text-white/95 mb-16 animate-fade-in font-light leading-relaxed max-w-3xl mx-auto"
                style={{ animationDelay: "0.2s" }}
              >
                Onsen Match te propone tu próximo destino en Japón para tu bienestar
              </p>

              {/* CTA Button */}
              <Button
                size="lg"
                className="text-base md:text-xl lg:text-2xl px-6 py-6 md:px-12 md:py-8 lg:px-16 lg:py-10 h-auto hover:scale-105 transition-all duration-300 animate-fade-in bg-primary hover:bg-primary/90 text-white font-semibold shadow-[0_20px_60px_-10px_rgba(0,212,255,0.5)] hover:shadow-[0_25px_80px_-10px_rgba(0,212,255,0.7)] rounded-2xl"
                style={{ animationDelay: "0.4s" }}
                onClick={() => navigate("/quiz")}
              >
                Quiero explorar mi onsen ideal
              </Button>
            </main>
          </div>
        </div>
      </div>

      {/* Onsen Stats Section - Load immediately */}
      <OnsenStatsSection />

      {/* Service Features Section - Lazy loaded */}
      <Suspense fallback={
        <div className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 max-w-7xl">
            <SectionSkeleton lines={4} />
          </div>
        </div>
      }>
        <ServiceFeaturesSection />
      </Suspense>

      {/* Onsen Types Preview Section - Lazy loaded */}
      <Suspense fallback={
        <div className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <SectionSkeleton lines={5} />
          </div>
        </div>
      }>
        <OnsenTypesPreview />
      </Suspense>

      {/* FAQ Section - Lazy loaded */}
      <Suspense fallback={
        <div className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <SectionSkeleton lines={6} />
          </div>
        </div>
      }>
        <div className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <FAQSection />
          </div>
        </div>
      </Suspense>

      {/* Final CTA Section - Lazy loaded */}
      <Suspense fallback={
        <div className="py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto px-4">
            <SectionSkeleton lines={3} />
          </div>
        </div>
      }>
        <FinalCTASection />
      </Suspense>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
