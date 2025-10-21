import { OnsenType, OnsenDestination } from '@/types/onsen';

// Extended destination interface with coordinates for Google Maps
export interface OnsenDestinationWithCoords extends OnsenDestination {
  coordinates?: { lat: number; lng: number };
}

// Centralized destinations database (easy to maintain)
export const destinationsDatabase: Record<string, OnsenDestinationWithCoords> = {
  // Chloride
  atami: {
    name: "Atami Onsen",
    kanji: "熱海温泉",
    location: "Shizuoka",
    description: "Junto al mar; retiene el calor y afloja la tensión muscular.",
    coordinates: { lat: 35.0956, lng: 139.0728 }
  },
  wakura: {
    name: "Wakura Onsen",
    kanji: "和倉温泉",
    location: "Ishikawa",
    description: "Bahía tranquila; baño de larga permanencia térmica.",
    coordinates: { lat: 37.0733, lng: 136.9186 }
  },
  shirahama: {
    name: "Shirahama Onsen",
    kanji: "白浜温泉",
    location: "Wakayama",
    description: "Costero y luminoso; recuperación con vista oceánica.",
    coordinates: { lat: 33.6833, lng: 135.3333 }
  },
  
  // Bicarbonate
  ureshino: {
    name: "Ureshino Onsen",
    kanji: "嬉野温泉",
    location: "Saga",
    description: 'Conocida como "agua de belleza"; piel sedosa.',
    coordinates: { lat: 33.1, lng: 130.05 }
  },
  shima: {
    name: "Shima Onsen",
    kanji: "四万温泉",
    location: "Gunma",
    description: "Transparente y amable con la piel; descanso en valle sereno.",
    coordinates: { lat: 36.6667, lng: 138.8167 }
  },
  yamanaka: {
    name: "Yamanaka Onsen / Yamashiro Onsen",
    kanji: "山中温泉・山代温泉",
    location: "Ishikawa",
    description: "Tradición de belleza y artes; baños que suavizan la piel.",
    coordinates: { lat: 36.2833, lng: 136.3667 }
  },
  
  // Sulfur
  kusatsu: {
    name: "Kusatsu Onsen",
    kanji: "草津温泉",
    location: "Gunma",
    description: 'Famosa por su "yubatake"; purificación intensa.',
    coordinates: { lat: 36.6167, lng: 138.5833 }
  },
  zao: {
    name: "Zao Onsen",
    kanji: "蔵王温泉",
    location: "Yamagata",
    description: "Ácida y sulfurosa; piel más limpia y sensación profunda de reset.",
    coordinates: { lat: 38.15, lng: 140.45 }
  },
  noboribetsu: {
    name: "Noboribetsu Onsen",
    kanji: "登別温泉",
    location: "Hokkaido",
    description: '"Valle del infierno"; múltiples manantiales ricos en azufre.',
    coordinates: { lat: 42.5, lng: 141.1667 }
  },
  
  // Carbonated
  nagayu: {
    name: "Nagayu Onsen",
    kanji: "長湯温泉",
    location: "Oita",
    description: "Alta concentración de CO₂; ligereza inmediata.",
    coordinates: { lat: 33.05, lng: 131.2833 }
  },
  tanohara: {
    name: "Tanohara / Kuju área",
    kanji: "田の原温泉・久住",
    location: "Kumamoto–Oita",
    description: "Burbujas finas; descanso profundo en montaña.",
    coordinates: { lat: 33.0833, lng: 131.2 }
  },
  hidaOsaka: {
    name: "Hida-Osaka área",
    kanji: "飛騨小坂",
    location: "Gifu",
    description: "Manantiales carbónicos en valle; baño vivificante.",
    coordinates: { lat: 35.85, lng: 137.2667 }
  },
  
  // Sulfate
  tamatsukuri: {
    name: "Tamatsukuri Onsen",
    kanji: "玉造温泉",
    location: "Shimane",
    description: '"Onsen de los dioses"; apoyo a la regeneración cutánea.',
    coordinates: { lat: 35.4167, lng: 132.9833 }
  },
  naruko: {
    name: "Naruko Onsen",
    kanji: "鳴子温泉",
    location: "Miyagi",
    description: "Aguas minerales variadas; bienestar para circulación.",
    coordinates: { lat: 38.7333, lng: 140.7333 }
  },
  shiobara: {
    name: "Shiobara Onsen",
    kanji: "塩原温泉",
    location: "Tochigi",
    description: "Bosques y caminatas; sensación de energía ordenada.",
    coordinates: { lat: 36.9167, lng: 139.8333 }
  },
  
  // Simple
  dogo: {
    name: "Dogo Onsen",
    kanji: "道後温泉",
    location: "Ehime",
    description: "Suave y clara; descanso clásico con historia.",
    coordinates: { lat: 33.85, lng: 132.7833 }
  },
  hakone: {
    name: "Hakone Onsen",
    kanji: "箱根温泉",
    location: "Kanagawa",
    description: "Fácil acceso desde Tokio; cerca del Monte Fuji y variedad de baños.",
    coordinates: { lat: 35.2333, lng: 139.0333 }
  },
  kinosaki: {
    name: "Kinosaki Onsen",
    kanji: "城崎温泉",
    location: "Hyogo",
    description: "Paseo de soto-yu por siete baños; relajación sin estímulos fuertes.",
    coordinates: { lat: 35.6167, lng: 134.8 }
  },
  
  // Ferruginous
  arimaKinsen: {
    name: "Arima Onsen – Kinsen",
    kanji: "有馬温泉・金泉",
    location: "Hyogo",
    description: "Rojiza y salina; calidez que fortalece.",
    coordinates: { lat: 34.8, lng: 135.25 }
  },
  ikaho: {
    name: "Ikaho Onsen – Kogane no Yu",
    kanji: "伊香保温泉・黄金の湯",
    location: "Gunma",
    description: "Tono ámbar; confort para manos y pies fríos.",
    coordinates: { lat: 36.5, lng: 138.9167 }
  },
  takarazuka: {
    name: "Takarazuka Onsen",
    kanji: "宝塚温泉",
    location: "Hyogo",
    description: "Baños con hierro; relajación suave en ciudad termal histórica.",
    coordinates: { lat: 34.8, lng: 135.35 }
  },
  
  // Acidic
  sukayu: {
    name: "Sukayu Onsen",
    kanji: "酸ヶ湯温泉",
    location: "Aomori",
    description: "Alta montaña; sensación de limpieza intensa.",
    coordinates: { lat: 40.65, lng: 140.85 }
  },
  myoban: {
    name: "Myoban Onsen",
    kanji: "明礬温泉",
    location: "Oita",
    description: "Histórica y poderosa; equilibrio para piel grasa.",
    coordinates: { lat: 33.2667, lng: 131.5 }
  },
  tamagawa: {
    name: "Tamagawa Onsen",
    kanji: "玉川温泉",
    location: "Akita",
    description: "Muy ácida; experiencia de purificación concentrada.",
    coordinates: { lat: 40.15, lng: 140.75 }
  },
  
  // Radon
  misasa: {
    name: "Misasa Onsen",
    kanji: "三朝温泉",
    location: "Tottori",
    description: "Estancias de salud; calma sostenida día a día.",
    coordinates: { lat: 35.4, lng: 133.85 }
  },
  masutomi: {
    name: "Masutomi Onsen",
    kanji: "増富温泉",
    location: "Yamanashi",
    description: '"Radium onsen"; ritmo lento para recuperación.',
    coordinates: { lat: 35.9167, lng: 138.5 }
  },
  arimaGinsen: {
    name: "Arima Onsen – Ginsen",
    kanji: "有馬温泉・銀泉",
    location: "Hyogo",
    description: "Mezcla suave (radón/carbonatos); descanso sereno.",
    coordinates: { lat: 34.8, lng: 135.25 }
  },
  
  // Alkaline (Yodada)
  otemachi: {
    name: "Otemachi Onsen",
    kanji: "大手町温泉",
    location: "Tokio",
    description: 'Conocida como "agua de belleza"; piel sedosa.',
    coordinates: { lat: 35.6833, lng: 139.765 }
  },
  tamatsukuriBeauty: {
    name: "Tamatsukuri Onsen",
    kanji: "玉造温泉",
    location: "Shimane",
    description: "Tradición de belleza; regeneración de piel.",
    coordinates: { lat: 35.4167, lng: 132.9833 }
  },
  gero: {
    name: "Gero Onsen",
    kanji: "下呂温泉",
    location: "Gifu",
    description: "Una de las tres mejores; suavidad excepcional.",
    coordinates: { lat: 35.8, lng: 137.25 }
  }
};

// Mapping: Onsen type → Recommended destination IDs
export const onsenTypeDestinations: Record<OnsenType, string[]> = {
  chloride: ['atami', 'wakura', 'shirahama'],
  bicarbonate: ['ureshino', 'shima', 'yamanaka'],
  sulfur: ['kusatsu', 'zao', 'noboribetsu'],
  carbonated: ['nagayu', 'tanohara', 'hidaOsaka'],
  sulfate: ['tamatsukuri', 'naruko', 'shiobara'],
  simple: ['dogo', 'hakone', 'kinosaki'],
  ferruginous: ['arimaKinsen', 'ikaho', 'takarazuka'],
  acidic: ['sukayu', 'myoban', 'tamagawa'],
  radon: ['misasa', 'masutomi', 'arimaGinsen'],
  alkaline: ['otemachi', 'tamatsukuriBeauty', 'gero']
};
