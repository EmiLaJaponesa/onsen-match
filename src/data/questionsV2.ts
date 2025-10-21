import { Question } from '@/types/onsen';

export const questionsV2: Question[] = [
  {
    id: 1,
    text: '¿Qué te gustaría mejorar hoy?',
    description: 'Elige lo que más resuena contigo en este momento.',
    weight: 0.15,
    options: [
      {
        id: '1a',
        text: 'Relajar cuerpo y mente',
        weights: { simple: 1, radon: 1 }
      },
      {
        id: '1b',
        text: 'Mejorar circulación y aliviar músculos',
        weights: { carbonated: 1, chloride: 1 }
      },
      {
        id: '1c',
        text: 'Hidratar o suavizar mi piel',
        weights: { bicarbonate: 1, sulfate: 1 }
      },
      {
        id: '1d',
        text: 'Purificar la piel / controlar acné',
        weights: { acidic: 1, sulfur: 1 }
      },
      {
        id: '1e',
        text: 'Recuperar energía / anemia',
        weights: { ferruginous: 1, alkaline: 1 }
      }
    ]
  },
  {
    id: 2,
    text: '¿Cómo prefieres que se sienta el agua?',
    description: 'La textura del agua también habla a tu cuerpo.',
    weight: 0.10,
    hardBoosters: {
      'Con burbujas / efervescente': { carbonated: 0.3 }
    },
    options: [
      {
        id: '2a',
        text: 'Ligera y sedosa',
        weights: { simple: 1, bicarbonate: 1 }
      },
      {
        id: '2b',
        text: 'Con burbujas / efervescente',
        weights: { carbonated: 1 }
      },
      {
        id: '2c',
        text: 'Densa y salada, que conserve el calor',
        weights: { chloride: 1 }
      },
      {
        id: '2d',
        text: 'Mineral marcada, más "consistente"',
        weights: { sulfate: 1, ferruginous: 1 }
      }
    ]
  },
  {
    id: 3,
    text: '¿Qué aromas minerales toleras o disfrutas?',
    description: 'Cada onsen tiene su propia firma aromática.',
    weight: 0.10,
    hardBoosters: {
      'Volcánico / azufrado': { sulfur: 0.3 },
      'Metálico / hierro': { ferruginous: 0.3 },
      'Marino / yodado': { alkaline: 0.2 }
    },
    options: [
      {
        id: '3a',
        text: 'Neutro (sin olor fuerte)',
        weights: { simple: 1, radon: 1, bicarbonate: 1 }
      },
      {
        id: '3b',
        text: 'Volcánico / azufrado',
        weights: { sulfur: 1 }
      },
      {
        id: '3c',
        text: 'Metálico / hierro',
        weights: { ferruginous: 1 }
      },
      {
        id: '3d',
        text: 'Marino / yodado',
        weights: { chloride: 1, alkaline: 1 }
      }
    ]
  },
  {
    id: 4,
    text: '¿Cómo está tu piel hoy?',
    description: 'El agua termal puede adaptarse a tu piel.',
    weight: 0.15,
    options: [
      {
        id: '4a',
        text: 'Seca / sensible',
        weights: { simple: 1, bicarbonate: 1 }
      },
      {
        id: '4b',
        text: 'Grasa / acné (puedo tolerar más intensidad)',
        weights: { acidic: 1, sulfur: 1 }
      },
      {
        id: '4c',
        text: 'Con pequeñas heridas / cicatrización',
        weights: { sulfate: 1 }
      },
      {
        id: '4d',
        text: 'Normal; busco confort y calidez',
        weights: { chloride: 1, radon: 1 }
      }
    ]
  },
  {
    id: 5,
    text: '¿Qué molestias físicas te gustaría aliviar?',
    description: 'Adecuaciones generales (一般適応症).',
    weight: 0.20,
    options: [
      {
        id: '5a',
        text: 'Dolor muscular o articular',
        weights: { chloride: 1, carbonated: 1, radon: 1 }
      },
      {
        id: '5b',
        text: 'Estrés / fatiga crónica / insomnio',
        weights: { simple: 1, radon: 1, carbonated: 1 }
      },
      {
        id: '5c',
        text: 'Mala circulación / sensación de frío',
        weights: { chloride: 1, carbonated: 1, ferruginous: 1 }
      },
      {
        id: '5d',
        text: 'Recuperación post esfuerzo físico / deporte',
        weights: { chloride: 1, carbonated: 1 }
      }
    ]
  },
  {
    id: 6,
    text: '¿Tienes alguna condición específica que quieras mejorar?',
    description: 'Adecuaciones específicas (特定適応症) – la más importante.',
    weight: 0.30,
    hardBoosters: {
      'Piel sensible/irritada o con acné': { acidic: 0.2, sulfur: 0.1 }
    },
    options: [
      {
        id: '6a',
        text: 'Piel sensible/irritada o con acné',
        weights: { acidic: 1, sulfur: 1, sulfate: 1 }
      },
      {
        id: '6b',
        text: 'Piel seca / eczema',
        weights: { bicarbonate: 1, simple: 1 }
      },
      {
        id: '6c',
        text: 'Circulación / presión baja / anemia',
        weights: { ferruginous: 1, alkaline: 1, carbonated: 1 }
      },
      {
        id: '6d',
        text: 'Estrés nervioso / menopausia / equilibrio hormonal',
        weights: { radon: 1, simple: 1 }
      },
      {
        id: '6e',
        text: 'Problemas digestivos leves',
        weights: { sulfate: 1, bicarbonate: 1 }
      },
      {
        id: '6f',
        text: 'Ninguna en especial, solo relajarme',
        weights: {}
      }
    ]
  }
];
