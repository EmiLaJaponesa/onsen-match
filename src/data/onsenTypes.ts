import { OnsenResult, OnsenType } from '@/types/onsen';

export const onsenResults: Record<OnsenType, OnsenResult> = {
  chloride: {
    type: 'chloride',
    title: 'Agua clorurada – Calor y descanso',
    emoji: '🧡',
    characteristics: 'Contiene sal natural. Al salir del baño, forma una película que conserva el calor.',
    effects: 'Calienta el cuerpo desde el interior, mejora la circulación y relaja músculos tensos.',
    idealFor: 'Quienes sufren de frío, rigidez o estrés físico.',
    experience: 'Perfecta para invierno o después de un día largo. Sensación duradera de bienestar.',
    description: 'Este tipo de agua retiene el calor en tu cuerpo y ayuda a aliviar la tensión muscular. Es ideal si sientes frío constante, dolor en los hombros o necesitas un descanso profundo.',
    destinations: [
      {
        name: 'Atami Onsen',
        kanji: '熱海温泉',
        location: 'Shizuoka',
        description: 'Junto al mar; retiene el calor y afloja la tensión muscular.'
      },
      {
        name: 'Wakura Onsen',
        kanji: '和倉温泉',
        location: 'Ishikawa',
        description: 'Bahía tranquila; baño de larga permanencia térmica.'
      },
      {
        name: 'Shirahama Onsen',
        kanji: '白浜温泉',
        location: 'Wakayama',
        description: 'Costero y luminoso; recuperación con vista oceánica.'
      }
    ]
  },
  bicarbonate: {
    type: 'bicarbonate',
    title: 'Agua bicarbonatada – Belleza natural',
    emoji: '✨',
    characteristics: 'Conocida como "agua de belleza natural".',
    effects: 'Limpia los poros, suaviza la piel y elimina células muertas.',
    idealFor: 'Personas con piel seca o quienes buscan un efecto rejuvenecedor.',
    experience: 'Deja la piel como seda. Es el secreto de la piel japonesa luminosa.',
    description: 'Conocida como el agua de la belleza, suaviza la piel y le da un aspecto más limpio y luminoso. Perfecta si buscas cuidar tu piel de forma natural.',
    destinations: [
      {
        name: 'Ureshino Onsen',
        kanji: '嬉野温泉',
        location: 'Saga',
        description: 'Conocida como "agua de belleza"; piel sedosa.'
      },
      {
        name: 'Shima Onsen',
        kanji: '四万温泉',
        location: 'Gunma',
        description: 'Transparente y amable con la piel; descanso en valle sereno.'
      },
      {
        name: 'Yamanaka Onsen / Yamashiro Onsen',
        kanji: '山中温泉・山代温泉',
        location: 'Ishikawa',
        description: 'Tradición de belleza y artes; baños que suavizan la piel.'
      }
    ]
  },
  sulfur: {
    type: 'sulfur',
    title: 'Agua sulfurosa – Energía y purificación',
    emoji: '💛',
    characteristics: 'Tiene un aroma distintivo al azufre y un color ligeramente turbio.',
    effects: 'Purifica la piel, mejora problemas cutáneos y alivia reumatismo y dolores musculares.',
    idealFor: 'Personas con piel grasa o con acné, o quienes desean desintoxicar cuerpo y mente.',
    experience: 'El "onsen de la purificación". Sentirás que tu cuerpo se reinicia desde dentro.',
    description: 'Con su aroma característico, esta agua ayuda a revitalizar el cuerpo y mejorar la circulación. Ideal para quienes buscan energía renovada y limpiar la piel profundamente.',
    destinations: [
      {
        name: 'Kusatsu Onsen',
        kanji: '草津温泉',
        location: 'Gunma',
        description: 'Famosa por su "yubatake"; purificación intensa.'
      },
      {
        name: 'Zao Onsen',
        kanji: '蔵王温泉',
        location: 'Yamagata',
        description: 'Ácida y sulfurosa; piel más limpia y sensación profunda de reset.'
      },
      {
        name: 'Noboribetsu Onsen',
        kanji: '登別温泉',
        location: 'Hokkaido',
        description: '"Valle del infierno"; múltiples manantiales ricos en azufre.'
      }
    ]
  },
  carbonated: {
    type: 'carbonated',
    title: 'Agua carbonatada – Activación y vitalidad',
    emoji: '💙',
    characteristics: 'Contiene gas carbónico natural, con burbujas finas en la superficie.',
    effects: 'Estimula la circulación, reduce la presión arterial y relaja profundamente.',
    idealFor: 'Personas con estrés o tensión mental, que buscan un descanso total.',
    experience: 'Bañarte en esta agua es como recibir un masaje invisible. Ligereza absoluta.',
    description: 'Las burbujas naturales estimulan la circulación y activan tu sistema. Perfecta si necesitas un impulso de energía o quieres mejorar tu flujo sanguíneo.',
    destinations: [
      {
        name: 'Nagayu Onsen',
        kanji: '長湯温泉',
        location: 'Oita',
        description: 'Alta concentración de CO₂; ligereza inmediata.'
      },
      {
        name: 'Tanohara / Kuju área',
        kanji: '田の原温泉・久住',
        location: 'Kumamoto–Oita',
        description: 'Burbujas finas; descanso profundo en montaña.'
      },
      {
        name: 'Hida-Osaka área',
        kanji: '飛騨小坂',
        location: 'Gifu',
        description: 'Manantiales carbónicos en valle; baño vivificante.'
      }
    ]
  },
  sulfate: {
    type: 'sulfate',
    title: 'Agua sulfatada – Recuperación y renovación',
    emoji: '💜',
    characteristics: 'Rica en minerales como calcio y sodio.',
    effects: 'Favorece la regeneración celular y mejora la circulación sanguínea.',
    idealFor: 'Personas con hipertensión, arteriosclerosis leve o problemas circulatorios.',
    experience: 'Refuerza tu vitalidad desde adentro. Sensación de energía limpia y orden interior.',
    description: 'Ayuda a calmar dolores articulares y musculares, promoviendo la recuperación física. Ideal si sientes rigidez o necesitas reparar tu cuerpo.',
    destinations: [
      {
        name: 'Tamatsukuri Onsen',
        kanji: '玉造温泉',
        location: 'Shimane',
        description: '"Onsen de los dioses"; apoyo a la regeneración cutánea.'
      },
      {
        name: 'Naruko Onsen',
        kanji: '鳴子温泉',
        location: 'Miyagi',
        description: 'Aguas minerales variadas; bienestar para circulación.'
      },
      {
        name: 'Shiobara Onsen',
        kanji: '塩原温泉',
        location: 'Tochigi',
        description: 'Bosques y caminatas; sensación de energía ordenada.'
      }
    ]
  },
  simple: {
    type: 'simple',
    title: 'Agua alcalina simple – Suavidad y equilibrio',
    emoji: '🤍',
    characteristics: 'Suave, clara y sin un aroma fuerte. Apta para todo tipo de piel y edades.',
    effects: 'Relaja el cuerpo, mejora la circulación y alivia el cansancio diario.',
    idealFor: 'Quienes buscan descanso sin estímulos fuertes, y desean equilibrio físico y mental.',
    experience: 'Un baño sencillo, pero profundo. El tipo de agua más universal de Japón.',
    description: 'Con una composición suave y equilibrada, esta agua es perfecta para pieles sensibles o para quienes buscan una experiencia relajante sin estímulos fuertes.',
    destinations: [
      {
        name: 'Dogo Onsen',
        kanji: '道後温泉',
        location: 'Ehime',
        description: 'Suave y clara; descanso clásico con historia.'
      },
      {
        name: 'Hakone Onsen',
        kanji: '箱根温泉',
        location: 'Kanagawa',
        description: 'Fácil acceso desde Tokio; cerca del Monte Fuji y variedad de baños.'
      },
      {
        name: 'Kinosaki Onsen',
        kanji: '城崎温泉',
        location: 'Hyogo',
        description: 'Paseo de soto-yu por siete baños; relajación sin estímulos fuertes.'
      }
    ]
  },
  ferruginous: {
    type: 'ferruginous',
    title: 'Agua ferruginosa – Calor interno y fuerza',
    emoji: '🧡',
    characteristics: 'De color rojizo o marrón debido a su alto contenido en hierro.',
    effects: 'Mejora la anemia, la fatiga y la debilidad general.',
    idealFor: 'Quienes necesitan recuperar energía o fortalecer el cuerpo.',
    experience: '"El baño de hierro" que da fuerza y estabilidad.',
    description: 'Rica en hierro, esta agua ayuda a calentar el cuerpo desde dentro y es ideal para quienes tienen anemia o sienten frío constante.',
    destinations: [
      {
        name: 'Arima Onsen – Kinsen',
        kanji: '有馬温泉・金泉',
        location: 'Hyogo',
        description: 'Rojiza y salina; calidez que fortalece.'
      },
      {
        name: 'Ikaho Onsen – Kogane no Yu',
        kanji: '伊香保温泉・黄金の湯',
        location: 'Gunma',
        description: 'Tono ámbar; confort para manos y pies fríos.'
      },
      {
        name: 'Takarazuka Onsen',
        kanji: '宝塚温泉',
        location: 'Hyogo',
        description: 'Baños con hierro; relajación suave en ciudad termal histórica.'
      }
    ]
  },
  acidic: {
    type: 'acidic',
    title: 'Agua ácida – Limpieza profunda',
    emoji: '💚',
    characteristics: 'Con un pH bajo, tiene efecto antibacteriano natural.',
    effects: 'Equilibra la piel grasa, combate el acné y deja una sensación de limpieza profunda.',
    idealFor: 'Piel mixta o grasa, o quienes buscan un baño purificante.',
    experience: '"Belleza a través de la renovación". Refresca cuerpo y mente.',
    description: 'Con propiedades antibacterianas, esta agua es excelente para limpiar la piel y tratar problemas como el acné o la piel grasa.',
    destinations: [
      {
        name: 'Manza Onsen',
        kanji: '万座温泉',
        location: 'Gunma',
        description: 'Alta montaña; sensación de limpieza intensa.'
      },
      {
        name: 'Zao Onsen',
        kanji: '蔵王温泉',
        location: 'Yamagata',
        description: 'Histórica y poderosa; equilibrio para piel grasa.'
      },
      {
        name: 'Tamagawa Onsen',
        kanji: '玉川温泉',
        location: 'Akita',
        description: 'Muy ácida; experiencia de purificación concentrada.'
      }
    ]
  },
  radon: {
    type: 'radon',
    title: 'Agua radonada – Calma y bienestar profundo',
    emoji: '💙',
    characteristics: 'Contiene pequeñas cantidades naturales de radón, sin olor ni color. Es agua fría.',
    effects: 'Estimula el metabolismo, fortalece el sistema inmunológico y alivia el dolor crónico.',
    idealFor: 'Personas mayores o con dolores persistentes.',
    experience: 'El baño de la curación silenciosa. Su efecto se siente lentamente, día tras día.',
    description: 'Este tipo de agua es conocida por sus propiedades calmantes y su capacidad para aliviar el estrés y la fatiga. Perfecta para un descanso profundo.',
    destinations: [
      {
        name: 'Misasa Onsen',
        kanji: '三朝温泉',
        location: 'Tottori',
        description: 'Estancias de salud; calma sostenida día a día.'
      },
      {
        name: 'Masutomi Onsen',
        kanji: '増富温泉',
        location: 'Yamanashi',
        description: '"Radium onsen"; ritmo lento para recuperación.'
      },
      {
        name: 'Arima Onsen – Ginsen',
        kanji: '有馬温泉・銀泉',
        location: 'Hyogo',
        description: 'Mezcla suave (radón/carbonatos); descanso sereno.'
      }
    ]
  },
  alkaline: {
    type: 'alkaline',
    title: 'Agua de sosa – Piel sedosa',
    emoji: '💚',
    characteristics: 'Conocida como "agua de belleza natural".',
    effects: 'Limpia los poros, suaviza la piel y elimina células muertas.',
    idealFor: 'Personas con piel seca o quienes buscan un efecto rejuvenecedor.',
    experience: 'Deja la piel como seda. Es el secreto de la piel japonesa luminosa.',
    description: 'Suaviza la piel como ninguna otra agua, dejándola hidratada y con una textura sedosa. Ideal para quienes buscan el máximo cuidado de la piel.',
    destinations: [
      {
        name: 'Ureshino Onsen',
        kanji: '嬉野温泉',
        location: 'Saga',
        description: 'Conocida como "agua de belleza"; piel sedosa.'
      },
      {
        name: 'Tamatsukuri Onsen',
        kanji: '玉造温泉',
        location: 'Shimane',
        description: 'Tradición de belleza; regeneración de piel.'
      },
      {
        name: 'Gero Onsen',
        kanji: '下呂温泉',
        location: 'Gifu',
        description: 'Una de las tres mejores; suavidad excepcional.'
      }
    ]
  }
};
