import { onsenStats } from "@/data/heroSections";

export const OnsenStatsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">¿Por qué ir a un onsen en Japón?</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Más que un baño, un onsen es un ritual de bienestar, conexión con la naturaleza y parte esencial de la
            cultura japonesa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {onsenStats.map((stat, index) => (
            <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
              <div className="mb-4 inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 backdrop-blur-sm">
                <span className="text-4xl md:text-5xl font-bold text-primary">{stat.number}</span>
              </div>
              <p className="text-lg md:text-xl font-medium text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
