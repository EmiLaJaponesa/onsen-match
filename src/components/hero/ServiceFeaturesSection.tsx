import { Search, Droplets, MapPin, LucideIcon } from "lucide-react";
import { serviceFeatures } from "@/data/heroSections";

const iconMap: Record<string, LucideIcon> = {
  Search,
  Droplets,
  MapPin,
};

export const ServiceFeaturesSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">¿Cómo funciona?</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Onsen Match es el "sommelier digital de los onsen japoneses" que te ofrece la mejor opción a través de los
            siguientes pasos:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {serviceFeatures.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <div
                key={index}
                className="group relative bg-white/30 dark:bg-gray-800/30 border border-border rounded-2xl p-8 hover:bg-white/40 dark:hover:bg-gray-800/40 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in will-change-transform"
                style={{ animationDelay: index < 3 ? `${index * 100}ms` : "0ms" }}
              >
                <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">{feature.description}</p>
                <div className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  {feature.stat}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
