import { OnsenResult, OnsenType } from "@/types/onsen";
import { destinationsDatabase, onsenTypeDestinations } from './destinations';

// Helper: get destinations for a type
function getDestinationsForType(type: OnsenType) {
  return onsenTypeDestinations[type].map(id => destinationsDatabase[id]);
}

export const onsenResults: Record<OnsenType, OnsenResult> = {
  chloride: {
    type: "chloride",
    title: "Clorurada – Calor y descanso",
    japaneseTitle: "塩化物泉",
    emoji: "🧂",
    characteristics: "Contiene sal natural. Al salir del baño, forma una película que conserva el calor.",
    effects: "Piel seca, eccema leve; mejora circulación periférica y retiene calor (frialdad).",
    idealFor: "Quienes sufren de frío, rigidez o estrés físico.",
    experience: "Perfecta para invierno o después de un día largo. Sensación duradera de bienestar.",
    description:
      "Este tipo de agua retiene el calor en tu cuerpo y ayuda a aliviar la tensión muscular. Es ideal si sientes frío constante, dolor en los hombros o necesitas un descanso profundo.",
    destinations: getDestinationsForType('chloride')
  },
  bicarbonate: {
    type: "bicarbonate",
    title: "Bicarbonatada – Belleza natural",
    japaneseTitle: "炭酸水素塩泉",
    emoji: "✨",
    characteristics: 'Conocida como "agua de belleza natural".',
    effects: "“Agua de belleza”: acné, seborrea, aspereza cutánea; limpieza de poros.",
    idealFor: "Personas con piel seca o quienes buscan un efecto rejuvenecedor.",
    experience: "Deja la piel como seda. Es el secreto de la piel japonesa luminosa.",
    description:
      "Conocida como el agua de la belleza, suaviza la piel y le da un aspecto más limpio y luminoso. Perfecta si buscas cuidar tu piel de forma natural.",
    destinations: getDestinationsForType('bicarbonate')
  },
  sulfur: {
    type: "sulfur",
    title: "Sulfurosa – Energía y purificación",
    japaneseTitle: "硫黄泉",
    emoji: "🌋",
    characteristics: "Tiene un aroma distintivo al azufre y un color ligeramente turbio.",
    effects: "Dermatosis crónicas, acné; reumatismo, gota; coadyuvante en diabetes leve e hipertensión leve.",
    idealFor: "Personas con piel grasa o con acné, o quienes desean desintoxicar cuerpo y mente.",
    experience: 'El "onsen de la purificación". Sentirás que tu cuerpo se reinicia desde dentro.',
    description:
      "Con su aroma característico, esta agua ayuda a revitalizar el cuerpo y mejorar la circulación. Ideal para quienes buscan energía renovada y limpiar la piel profundamente.",
    destinations: getDestinationsForType('sulfur')
  },
  carbonated: {
    type: "carbonated",
    title: "Carbonatada (CO₂) – Activación y vitalidad",
    japaneseTitle: "二酸化炭素泉",
    emoji: "💫",
    characteristics: "Contiene gas carbónico natural, con burbujas finas en la superficie.",
    effects: "Vasodilatación periférica: hipertensión leve, mala circulación, fatiga muscular, pies fríos.",
    idealFor: "Personas con estrés o tensión mental, que buscan un descanso total.",
    experience: "Bañarte en esta agua es como recibir un masaje invisible. Ligereza absoluta.",
    description:
      "Las burbujas naturales estimulan la circulación y activan tu sistema. Perfecta si necesitas un impulso de energía o quieres mejorar tu flujo sanguíneo.",
    destinations: getDestinationsForType('carbonated')
  },
  sulfate: {
    type: "sulfate",
    title: "Sulfatada – Recuperación y renovación",
    japaneseTitle: "硫酸塩泉",
    emoji: "💪",
    characteristics: "Rica en minerales como calcio y sodio.",
    effects:
      "Regeneración cutánea, cicatrización (cortes/quemaduras leves), arteriosclerosis, rehabilitación post-lesión.",
    idealFor: "Personas con hipertensión, arteriosclerosis leve o problemas circulatorios.",
    experience: "Refuerza tu vitalidad desde adentro. Sensación de energía limpia y orden interior.",
    description:
      "Ayuda a calmar dolores articulares y musculares, promoviendo la recuperación física. Ideal si sientes rigidez o necesitas reparar tu cuerpo.",
    destinations: getDestinationsForType('sulfate')
  },
  simple: {
    type: "simple",
    title: "Agua alcalina simple – Suavidad y equilibrio",
    japaneseTitle: "アルカリ性単純温泉",
    emoji: "🌸",
    characteristics: "Suave, clara y sin un aroma fuerte. Apta para todo tipo de piel y edades.",
    effects: "Estrés, fatiga general, insomnio; opción más suave para pieles sensibles.",
    idealFor: "Quienes buscan descanso sin estímulos fuertes, y desean equilibrio físico y mental.",
    experience: "Un baño sencillo, pero profundo. El tipo de agua más universal de Japón.",
    description:
      "Con una composición suave y equilibrada, esta agua es perfecta para pieles sensibles o para quienes buscan una experiencia relajante sin estímulos fuertes.",
    destinations: getDestinationsForType('simple')
  },
  ferruginous: {
    type: "ferruginous",
    title: "Ferruginosa – Calor interno y fuerza",
    japaneseTitle: "含鉄泉",
    emoji: "🔥",
    characteristics: "De color rojizo o marrón debido a su alto contenido en hierro.",
    effects: "Mejora la Anemia, debilidad, hipotensión; sensación de reponer fuerzas.",
    idealFor: "Quienes necesitan recuperar energía o fortalecer el cuerpo.",
    experience: '"El baño de hierro" que da fuerza y estabilidad.',
    description:
      "Rica en hierro, esta agua ayuda a calentar el cuerpo desde dentro y es ideal para quienes tienen anemia o sienten frío constante.",
    destinations: getDestinationsForType('ferruginous')
  },
  acidic: {
    type: "acidic",
    title: "Ácida – Limpieza profunda",
    japaneseTitle: "酸性泉",
    emoji: "🍋",
    characteristics: "Con un pH bajo, tiene efecto antibacteriano natural.",
    effects:
      "Acción antibacteriana: acné, dermatitis, infecciones cutáneas leves (impétigo, tiña). (Evitar en piel muy sensible/ heridas abiertas)",
    idealFor: "Piel mixta o grasa, o quienes buscan un baño purificante.",
    experience: '"Belleza a través de la renovación". Refresca cuerpo y mente.',
    description:
      "Con propiedades antibacterianas, esta agua es excelente para limpiar la piel y tratar problemas como el acné o la piel grasa.",
    destinations: getDestinationsForType('acidic')
  },
  radon: {
    type: "radon",
    title: "Radón (Radioactiva) – Calma y bienestar profundo",
    japaneseTitle: "放射能泉",
    emoji: "🌙",
    characteristics: "Contiene pequeñas cantidades naturales de radón, sin olor ni color. Es agua fría.",
    effects: "Artritis y dolor articular crónico, neuralgia, lumbalgia, gota; modulación del metabolismo.",
    idealFor: "Personas mayores o con dolores persistentes.",
    experience: "El baño de la curación silenciosa. Su efecto se siente lentamente, día tras día.",
    description:
      "Este tipo de agua es conocida por sus propiedades calmantes y su capacidad para aliviar el estrés y la fatiga. Perfecta para un descanso profundo.",
    destinations: getDestinationsForType('radon')
  },
  alkaline: {
    type: "alkaline",
    title: "Yodada – Piel sedosa",
    japaneseTitle: "含よう素泉",
    emoji: "💎",
    characteristics: 'Conocida como "agua de belleza natural".',
    effects: "Antiséptica; apoyo a piel con tendencia a infecciones; coadyuvante en circulación.",
    idealFor: "Personas con piel seca o quienes buscan un efecto rejuvenecedor.",
    experience: "Deja la piel como seda. Es el secreto de la piel japonesa luminosa.",
    description:
      "Suaviza la piel como ninguna otra agua, dejándola hidratada y con una textura sedosa. Ideal para quienes buscan el máximo cuidado de la piel.",
    destinations: getDestinationsForType('alkaline')
  },
};
