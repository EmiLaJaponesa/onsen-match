import { OnsenResult, OnsenType } from '@/types/onsen';

export const onsenResults: Record<OnsenType, OnsenResult> = {
  chloride: {
    type: 'chloride',
    title: 'Agua clorurada – Calor y descanso',
    description: 'Este tipo de agua retiene el calor en tu cuerpo y ayuda a aliviar la tensión muscular. Es ideal si sientes frío constante, dolor en los hombros o necesitas un descanso profundo.',
    destinations: ['Kusatsu Onsen (Gunma)', 'Arima Onsen (Hyogo)', 'Ibusuki Onsen (Kagoshima)']
  },
  bicarbonate: {
    type: 'bicarbonate',
    title: 'Agua bicarbonatada – Belleza natural',
    description: 'Conocida como el agua de la belleza, suaviza la piel y le da un aspecto más limpio y luminoso. Perfecta si buscas cuidar tu piel de forma natural.',
    destinations: ['Yudanaka Onsen (Nagano)', 'Takeo Onsen (Saga)', 'Hakone Onsen (Kanagawa)']
  },
  sulfur: {
    type: 'sulfur',
    title: 'Agua sulfurosa – Energía y purificación',
    description: 'Con su aroma característico, esta agua ayuda a revitalizar el cuerpo y mejorar la circulación. Ideal para quienes buscan energía renovada y limpiar la piel profundamente.',
    destinations: ['Noboribetsu Onsen (Hokkaido)', 'Hakone Owakudani (Kanagawa)', 'Kusatsu Onsen (Gunma)']
  },
  carbonated: {
    type: 'carbonated',
    title: 'Agua carbonatada – Activación y vitalidad',
    description: 'Las burbujas naturales estimulan la circulación y activan tu sistema. Perfecta si necesitas un impulso de energía o quieres mejorar tu flujo sanguíneo.',
    destinations: ['Ikeda Onsen (Nagano)', 'Nagayu Onsen (Oita)', 'Tamagawa Onsen (Akita)']
  },
  sulfate: {
    type: 'sulfate',
    title: 'Agua sulfatada – Recuperación y renovación',
    description: 'Ayuda a calmar dolores articulares y musculares, promoviendo la recuperación física. Ideal si sientes rigidez o necesitas reparar tu cuerpo.',
    destinations: ['Gero Onsen (Gifu)', 'Nozawa Onsen (Nagano)', 'Beppu Onsen (Oita)']
  },
  simple: {
    type: 'simple',
    title: 'Agua simple – Suavidad y equilibrio',
    description: 'Con una composición suave y equilibrada, esta agua es perfecta para pieles sensibles o para quienes buscan una experiencia relajante sin estímulos fuertes.',
    destinations: ['Kinosaki Onsen (Hyogo)', 'Shirahama Onsen (Wakayama)', 'Zao Onsen (Yamagata)']
  },
  ferruginous: {
    type: 'ferruginous',
    title: 'Agua ferruginosa – Calor interno y fuerza',
    description: 'Rica en hierro, esta agua ayuda a calentar el cuerpo desde dentro y es ideal para quienes tienen anemia o sienten frío constante.',
    destinations: ['Arima Onsen (Hyogo)', 'Yufuin Onsen (Oita)', 'Yunishigawa Onsen (Tochigi)']
  },
  acidic: {
    type: 'acidic',
    title: 'Agua ácida – Limpieza profunda',
    description: 'Con propiedades antibacterianas, esta agua es excelente para limpiar la piel y tratar problemas como el acné o la piel grasa.',
    destinations: ['Kusatsu Onsen (Gunma)', 'Tamagawa Onsen (Akita)', 'Zao Onsen (Yamagata)']
  },
  radon: {
    type: 'radon',
    title: 'Agua radonada – Calma y bienestar profundo',
    description: 'Este tipo de agua es conocida por sus propiedades calmantes y su capacidad para aliviar el estrés y la fatiga. Perfecta para un descanso profundo.',
    destinations: ['Misasa Onsen (Tottori)', 'Tamagawa Onsen (Akita)', 'Masutomi Onsen (Yamanashi)']
  },
  alkaline: {
    type: 'alkaline',
    title: 'Agua de sosa – Piel sedosa',
    description: 'Suaviza la piel como ninguna otra agua, dejándola hidratada y con una textura sedosa. Ideal para quienes buscan el máximo cuidado de la piel.',
    destinations: ['Ureshino Onsen (Saga)', 'Tamatsukuri Onsen (Shimane)', 'Gero Onsen (Gifu)']
  }
};
