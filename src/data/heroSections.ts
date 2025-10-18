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
    title: "Bienestar natural comprobado",
    description:
      "Japón cuenta con más de 3,000 destinos de onsen, clasificados en 10 tipos de aguas minerales con beneficios reconocidos para tu salud.",
    stat: "Respaldado por ciencia",
  },
  {
    icon: "Droplets",
    title: "Tradición milenaria",
    description:
      " La práctica de tōji (湯治), es decir, viajar para sanar en onsen, existe desde hace más de 1,200 años y forma parte esencial de la cultura japonesa.",
    stat: "Recupera el equilibrio físico y mental",
  },
  {
    icon: "MapPin",
    title: "Diversidad de destinos",
    description:
      " Los onsen se encuentran en las 47 prefecturas de Japón: montañas, bosques y costas, etc. Cada lugar ofrece una experiencia distinta.",
    stat: "3,000+ onsen en todo Japón",
  },
];

export const onsenStats: OnsenStat[] = [
  { number: "3,000+", label: "Onsen en Japón" },
  { number: "10", label: "Tipos de agua mineral" },
  { number: "47", label: "Prefecturas con onsen" },
];
