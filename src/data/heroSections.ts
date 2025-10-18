export interface ServiceFeature {
  icon: string;
  title: string;
  description: string;
  stat: string;
}

export interface OnsenStat {
  number: string;
  label: string;
}

export const serviceFeatures: ServiceFeature[] = [
  {
    icon: "Search",
    title: "Análisis personalizado",
    description: "Responde 4 preguntas sobre tu estilo de vida y preferencias para descubrir tu onsen ideal",
    stat: "Solo 2 minutos"
  },
  {
    icon: "Droplets",
    title: "10 tipos de agua mineral",
    description: "Cada tipo tiene propiedades únicas con beneficios específicos para tu salud y bienestar",
    stat: "Respaldado por ciencia"
  },
  {
    icon: "MapPin",
    title: "Destinos auténticos",
    description: "Recomendaciones de onsen reales en Japón, perfectos para tu tipo de agua",
    stat: "3,000+ onsen"
  }
];

export const onsenStats: OnsenStat[] = [
  { number: "3,000+", label: "Onsen en Japón" },
  { number: "10", label: "Tipos de agua mineral" },
  { number: "47", label: "Prefecturas con onsen" }
];
