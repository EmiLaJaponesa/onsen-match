import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const FinalCTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="backdrop-blur-sm bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-3xl p-8 md:p-12 text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">¿Listo para comenzar?</h2>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Responde 6 preguntas simples y descubre qué tipo de onsen es perfecto para ti.
            <span className="block mt-2 text-base md:text-lg">⏱️ Solo toma 2 minutos • 🔒 Sin registro necesario</span>
          </p>

          <Button
            onClick={() => navigate("/quiz")}
            size="lg"
            className="text-base md:text-lg px-6 py-4 md:px-10 md:py-6 hover:scale-105 transition-transform duration-200 shadow-lg"
          >
            Comenzar el test ahora
          </Button>
        </div>
      </div>
    </section>
  );
};
