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
  { number: "1", label: "Responde un breve cuestionario. Solo toma 2 minutos." },
  { number: "2", label: "La IA analiza tus respuestas y selecciona uno de los 10 tipos de agua termal." },
  { number: "3", label: "Descubre tu próximo destino de onsen. ¡Empieza a planear tu viaje a Japón!" },
];
