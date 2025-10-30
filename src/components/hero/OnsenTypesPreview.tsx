import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useOnsenTypeConfig } from "@/hooks/useOnsenTypeConfig";
import { Skeleton } from "@/components/ui/skeleton";
import { OptimizedImage } from "@/components/OptimizedImage";

export const OnsenTypesPreview = () => {
  const navigate = useNavigate();
  const { data: onsenTypes, isLoading } = useOnsenTypeConfig();

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            10 tipos de agua de onsen japonés y sus beneficios
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Cada tipo de agua termal (onsen) tiene una composición mineral diferente. 
            Sus propiedades terapéuticas ayudan a aliviar diversas molestias y promover el bienestar natural.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mb-12">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} className="w-full aspect-square rounded-xl" />
            ))
          ) : (
            onsenTypes?.map((onsenType, index) => (
              <div
                key={onsenType.type}
                onClick={() => navigate(`/result/${onsenType.type}`)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(`/result/${onsenType.type}`);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Ver detalles de ${onsenType.title} - ${onsenType.subtitle}`}
                className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer 
                           animate-fade-in hover:scale-105 transition-smooth 
                           will-change-transform focus-ring touch-target"
                style={{ animationDelay: index < 4 ? `${index * 100}ms` : "0ms" }}
              >
                <OptimizedImage
                  src={onsenType.image_url}
                  alt={onsenType.title}
                  className="w-full h-full object-cover"
                  priority={index < 4}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  width={300}
                  height={300}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-4 
                                translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-sm md:text-base font-semibold text-center mb-1">
                    {onsenType.title}
                  </h3>
                  <p className="text-white/80 text-xs text-center opacity-0 group-hover:opacity-100 
                                transition-opacity duration-300">
                    {onsenType.subtitle}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="text-center animate-fade-in" style={{ animationDelay: "500ms" }}>
          <Button
            onClick={() => navigate("/quiz")}
            size="lg"
            className="text-base md:text-lg px-8 py-6 hover:scale-105 transition-smooth touch-target"
          >
            ¿Cuál sería tu tipo de onsen ideal?
          </Button>
        </div>
      </div>
    </section>
  );
};
