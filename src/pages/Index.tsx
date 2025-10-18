import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import onsenHero from "@/assets/onsen-hero.jpg";
import { ServiceFeaturesSection } from "@/components/hero/ServiceFeaturesSection";
import { OnsenStatsSection } from "@/components/hero/OnsenStatsSection";
import { OnsenTypesPreview } from "@/components/hero/OnsenTypesPreview";
import { FAQSection } from "@/components/result/FAQSection";
import { FinalCTASection } from "@/components/hero/FinalCTASection";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Hero Background with Enhanced Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${onsenHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="container mx-auto px-4 py-20">
            <main className="max-w-5xl mx-auto text-center space-y-12">
              {/* Main Title */}
              <h1
                className="text-6xl md:text-8xl font-bold text-white mb-8 animate-fade-in leading-[1.1]"
                style={{ animationDelay: "0.1s" }}
              >
                Descubre tu tipo de Onsen japonés ideal
              </h1>

              {/* Subtitle */}
              <p
                className="text-2xl md:text-3xl text-white/95 mb-16 animate-fade-in font-light leading-relaxed max-w-3xl mx-auto"
                style={{ animationDelay: "0.2s" }}
              >
                Tu guía con IA te propone tu próximo destino en Japón para tu bienestar
              </p>

              {/* CTA Button */}
              <Button
                size="lg"
                className="text-xl md:text-2xl px-16 py-10 h-auto hover:scale-105 transition-all duration-300 animate-fade-in bg-primary hover:bg-primary/90 text-white font-semibold shadow-[0_20px_60px_-10px_rgba(0,212,255,0.5)] hover:shadow-[0_25px_80px_-10px_rgba(0,212,255,0.7)] rounded-2xl"
                style={{ animationDelay: "0.4s" }}
                onClick={() => navigate("/quiz")}
              >
                Quiero descubrir Onsen ideal para mi
              </Button>
            </main>
          </div>
        </div>
      </div>

      {/* Service Features Section */}
      <ServiceFeaturesSection />

      {/* Onsen Stats Section */}
      <OnsenStatsSection />

      {/* Onsen Types Preview Section */}
      <OnsenTypesPreview />

      {/* FAQ Section */}
      <div className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <FAQSection />
        </div>
      </div>

      {/* Final CTA Section */}
      <FinalCTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
