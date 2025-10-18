import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { onsenImages } from "@/utils/onsenImages";
import { OnsenType } from "@/types/onsen";

const onsenTypeNames: Record<OnsenType, { title: string; subtitle: string }> = {
  chloride: { title: "Cloruro", subtitle: "Hidratante y cálido" },
  bicarbonate: { title: "Bicarbonato", subtitle: "Suaviza la piel" },
  sulfur: { title: "Azufre", subtitle: "Purificante" },
  carbonated: { title: "Carbonatado", subtitle: "Revitalizante" },
  sulfate: { title: "Sulfato", subtitle: "Relajante muscular" },
  simple: { title: "Simple", subtitle: "Suave y delicado" },
  ferruginous: { title: "Ferruginoso", subtitle: "Rico en hierro" },
  acidic: { title: "Ácido", subtitle: "Estimulante" },
  radon: { title: "Radón", subtitle: "Terapéutico" },
  alkaline: { title: "Yodada", subtitle: "Rejuvenecedor" },
};

export const OnsenTypesPreview = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            10 tipos de agua de onsen japonés y sus beneficios
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Cada tipo de agua termal (onsen) tiene una composición mineral diferente. Sus propiedades terapéuticas
            ayudan a aliviar diversas molestias y promover el bienestar natural.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6 mb-12 justify-items-center">
          {(Object.keys(onsenTypeNames) as OnsenType[]).map((type, index) => (
            <div
              key={type}
              className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer animate-fade-in hover:scale-105 transition-transform duration-300 will-change-transform will-change-opacity"
              style={{ animationDelay: index < 3 ? `${index * 100}ms` : "0ms" }}
            >
              <img
                src={onsenImages[type]}
                alt={onsenTypeNames[type].title}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-end p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white text-sm md:text-base font-semibold text-center mb-1">
                  {onsenTypeNames[type].title}
                </h3>
                <p className="text-white/80 text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {onsenTypeNames[type].subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center animate-fade-in" style={{ animationDelay: "500ms" }}>
          <Button
            onClick={() => navigate("/quiz")}
            size="lg"
            className="text-base md:text-lg px-8 py-6 hover:scale-105 transition-transform duration-200"
          >
            ¿Cuál sería tu tipo de onsen ideal?
          </Button>
        </div>
      </div>
    </section>
  );
};
