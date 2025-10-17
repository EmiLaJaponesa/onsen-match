import { Question } from '@/types/onsen';

export const questions: Question[] = [
  {
    id: 1,
    text: '¿Cómo se siente tu cuerpo últimamente?',
    description: 'Tu cuerpo te habla. ¿Qué te está pidiendo hoy?',
    options: [
      {
        id: '1a',
        text: 'Me siento cansado/a, con estrés o tensión.',
        weights: { radon: 3, simple: 2, alkaline: 2 }
      },
      {
        id: '1b',
        text: 'Tengo dolor muscular o rigidez en los hombros.',
        weights: { chloride: 3, sulfate: 2, ferruginous: 2 }
      },
      {
        id: '1c',
        text: 'Siento molestias en las articulaciones.',
        weights: { sulfate: 3, chloride: 2, sulfur: 2 }
      },
      {
        id: '1d',
        text: 'Tengo frío fácilmente o mala circulación.',
        weights: { ferruginous: 3, chloride: 2, carbonated: 2 }
      },
      {
        id: '1e',
        text: 'Me siento bien, solo quiero relajarme.',
        weights: { simple: 3, alkaline: 2, bicarbonate: 2 }
      }
    ]
  },
  {
    id: 2,
    text: '¿Cómo describirías tu tipo de piel?',
    description: 'El agua termal japonesa puede cambiar cómo se siente tu piel.',
    options: [
      {
        id: '2a',
        text: 'Seca, necesito más hidratación.',
        weights: { alkaline: 3, bicarbonate: 2, simple: 2 }
      },
      {
        id: '2b',
        text: 'Grasa o con tendencia al acné.',
        weights: { acidic: 3, sulfur: 2, carbonated: 2 }
      },
      {
        id: '2c',
        text: 'Sensible o fácilmente irritada.',
        weights: { simple: 3, alkaline: 2, bicarbonate: 2 }
      },
      {
        id: '2d',
        text: 'Normal, sin problemas especiales.',
        weights: { bicarbonate: 3, simple: 2, chloride: 1 }
      }
    ]
  },
  {
    id: 3,
    text: '¿Qué esperas al visitar un onsen?',
    description: 'Piensa en lo que más necesitas en este momento.',
    options: [
      {
        id: '3a',
        text: 'Relajarme y liberar el estrés.',
        weights: { radon: 3, simple: 2, chloride: 2 }
      },
      {
        id: '3b',
        text: 'Cuidar mi piel y sentirme más bella/o.',
        weights: { bicarbonate: 3, alkaline: 2, acidic: 2 }
      },
      {
        id: '3c',
        text: 'Recuperar energía y mejorar mi salud.',
        weights: { sulfur: 3, sulfate: 2, ferruginous: 2 }
      },
      {
        id: '3d',
        text: 'Conocer la cultura japonesa y disfrutar algo diferente.',
        weights: { carbonated: 2, simple: 2, chloride: 2 }
      }
    ]
  },
  {
    id: 4,
    text: '¿En qué entorno te gustaría disfrutarlo?',
    description: 'El lugar también cambia la experiencia del agua.',
    options: [
      {
        id: '4a',
        text: 'En la montaña, rodeado de naturaleza.',
        weights: { sulfur: 2, radon: 2, simple: 2 }
      },
      {
        id: '4b',
        text: 'Cerca del mar, escuchando las olas.',
        weights: { chloride: 2, alkaline: 2, bicarbonate: 1 }
      },
      {
        id: '4c',
        text: 'En un pueblo tradicional japonés.',
        weights: { ferruginous: 2, sulfate: 2, acidic: 1 }
      },
      {
        id: '4d',
        text: 'En la ciudad, sin alejarme demasiado.',
        weights: { carbonated: 2, simple: 2, bicarbonate: 1 }
      }
    ]
  }
];
