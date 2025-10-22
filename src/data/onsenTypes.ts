import { OnsenResult, OnsenType } from "@/types/onsen";

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
    destinations: [
      {
        name: "Atami Onsen",
        kanji: "熱海温泉",
        location: "Shizuoka",
        description: "Junto al mar; retiene el calor y afloja la tensión muscular.",
      },
      {
        name: "Wakura Onsen",
        kanji: "和倉温泉",
        location: "Ishikawa",
        description: "Bahía tranquila; baño de larga permanencia térmica.",
      },
      {
        name: "Shirahama Onsen",
        kanji: "白浜温泉",
        location: "Wakayama",
        description: "Costero y luminoso; recuperación con vista oceánica.",
      },
      {
        name: "Shibu Onsen",
        kanji: "渋温泉",
        location: "Nagano",
        description: "Pueblo tradicional japonés y está cerca del famoso Snow Monkey.",
      },
    ],
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
    destinations: [
      {
        name: "Ureshino Onsen",
        kanji: "嬉野温泉",
        location: "Saga",
        description: 'Conocida como "agua de belleza"; piel sedosa.',
      },
      {
        name: "Beppu Onsen",
        kanji: "別府温泉",
        location: "Oita",
        description: "Transparente y amable con la piel; descanso en valle sereno.",
      },
      {
        name: "Ryujin Onsen",
        kanji: "龍神温泉",
        location: "Wakayama",
        description: "Tradición de belleza y artes; baños que suavizan la piel.",
      },
      {
        name: "Hirayu Onsen",
        kanji: "平湯温泉",
        location: "Gifu",
        description: "Un pueblo tradicional japonés; purificación intensa.",
      },
    ],
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
    destinations: [
      {
        name: "Kusatsu Onsen",
        kanji: "草津温泉",
        location: "Gunma",
        description: 'Famosa por su "yubatake"; purificación intensa.',
      },
      {
        name: "Zao Onsen",
        kanji: "蔵王温泉",
        location: "Yamagata",
        description: "Ácida y sulfurosa; piel más limpia y sensación profunda de reset.",
      },
      {
        name: "Noboribetsu Onsen",
        kanji: "登別温泉",
        location: "Hokkaido",
        description: '"Valle del infierno"; múltiples manantiales ricos en azufre.',
      },
    ],
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
    destinations: [
      {
        name: "Nagayu Onsen",
        kanji: "長湯温泉",
        location: "Oita",
        description: "Alta concentración de CO₂; ligereza inmediata.",
      },
      {
        name: "Tanohara / Kuju área",
        kanji: "田の原温泉・久住",
        location: "Kumamoto–Oita",
        description: "Burbujas finas; descanso profundo en montaña.",
      },
      {
        name: "Hida-Osaka área",
        kanji: "飛騨小坂",
        location: "Gifu",
        description: "Manantiales carbónicos en valle; baño vivificante.",
      },
    ],
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
    destinations: [
      {
        name: "Tamatsukuri Onsen",
        kanji: "玉造温泉",
        location: "Shimane",
        description: '"Onsen de los dioses"; apoyo a la regeneración cutánea.',
      },
      {
        name: "Naruko Onsen",
        kanji: "鳴子温泉",
        location: "Miyagi",
        description: "Aguas minerales variadas; bienestar para circulación.",
      },
      {
        name: "Shiobara Onsen",
        kanji: "塩原温泉",
        location: "Tochigi",
        description: "Bosques y caminatas; sensación de energía ordenada.",
      },
      {
        name: "Shima Onsen",
        kanji: "四万温泉",
        location: "Gunma",
        description: "Transparente y amable con la piel; descanso en valle sereno.",
      },
    ],
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
    destinations: [
      {
        name: "Dogo Onsen",
        kanji: "道後温泉",
        location: "Ehime",
        description: "Suave y clara; descanso clásico con historia.",
      },
      {
        name: "Hakone Onsen",
        kanji: "箱根温泉",
        location: "Kanagawa",
        description: "Fácil acceso desde Tokio; cerca del Monte Fuji y variedad de baños.",
      },
      {
        name: "Kinosaki Onsen",
        kanji: "城崎温泉",
        location: "Hyogo",
        description: "Paseo de soto-yu por siete baños; relajación sin estímulos fuertes.",
      },
    ],
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
    destinations: [
      {
        name: "Arima Onsen – Kinsen",
        kanji: "有馬温泉・金泉",
        location: "Hyogo",
        description: "Rojiza y salina; calidez que fortalece.",
      },
      {
        name: "Ikaho Onsen – Kogane no Yu",
        kanji: "伊香保温泉・黄金の湯",
        location: "Gunma",
        description: "Tono ámbar; confort para manos y pies fríos.",
      },
      {
        name: "Takarazuka Onsen",
        kanji: "宝塚温泉",
        location: "Hyogo",
        description: "Baños con hierro; relajación suave en ciudad termal histórica.",
      },
    ],
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
    destinations: [
      {
        name: "Sukayu Onsen",
        kanji: "酸ヶ湯温泉",
        location: "Aomori",
        description: "Alta montaña; sensación de limpieza intensa.",
      },
      {
        name: "Myoban Onsen",
        kanji: "明礬温泉",
        location: "Oita",
        description: "Histórica y poderosa; equilibrio para piel grasa.",
      },
      {
        name: "Tamagawa Onsen",
        kanji: "玉川温泉",
        location: "Akita",
        description: "Muy ácida; experiencia de purificación concentrada.",
      },
      {
        name: "Kusatsu Onsen",
        kanji: "草津温泉",
        location: "Gunma",
        description: 'Famosa por su "yubatake"; purificación intensa.',
      },
    ],
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
    destinations: [
      {
        name: "Misasa Onsen",
        kanji: "三朝温泉",
        location: "Tottori",
        description: "Estancias de salud; calma sostenida día a día.",
      },
      {
        name: "Masutomi Onsen",
        kanji: "増富温泉",
        location: "Yamanashi",
        description: '"Radium onsen"; ritmo lento para recuperación.',
      },
      {
        name: "Arima Onsen – Ginsen",
        kanji: "有馬温泉・銀泉",
        location: "Hyogo",
        description: "Mezcla suave (radón/carbonatos); descanso sereno.",
      },
    ],
  },
  alkaline: {
    type: "alkaline",
    title: "Yodada – Piel sedosa",
    japaneseTitle: "含よう素泉",
    emoji: "💎",
    characteristics: 'Conocida como "agua de belleza natural".',
    effects: "Antiséptica; apoyo a piel con tendencia a infecciones; coadyuvante en circulación.",
    idealFor: "Personas con piel seca o quienes buscan un efeLicto rejuvenecedor.",
    experience: "Deja la piel como seda. Es el secreto de la piel japonesa luminosa.",
    description:
      "Suaviza la piel como ninguna otra agua, dejándola hidratada y con una textura sedosa. Ideal para quienes buscan el máximo cuidado de la piel.",
    destinations: [
      {
        name: "Otemachi Onsen",
        kanji: "大手町温泉",
        location: "Tokio",
        description: 'Conocida como "agua de belleza"; piel sedosa.',
      },
      {
        name: "Tamatsukuri Onsen",
        kanji: "玉造温泉",
        location: "Shimane",
        description: "Tradición de belleza; regeneración de piel.",
      },
      {
        name: "Gero Onsen",
        kanji: "下呂温泉",
        location: "Gifu",
        description: "Una de las tres mejores; suavidad excepcional.",
      },
    ],
  },
};
