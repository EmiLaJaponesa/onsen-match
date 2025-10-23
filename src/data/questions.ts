import { Question } from "@/types/onsen";

export const questions: Question[] = [
  {
    id: 1,
    text: "¿Qué te gustaría sentir después del onsen?",
    description: "Elige lo que más deseas obtener de esta experiencia.",
    options: [
      {
        id: "1a",
        text: "Relajar mi cuerpo y calmar la mente",
        weights: { simple: 1, radon: 1 },
      },
      {
        id: "1b",
        text: "Mejorar la circulación y aliviar el cansancio muscular",
        weights: { carbonated: 1, chloride: 1 },
      },
      {
        id: "1c",
        text: "Hidratar o suavizar mi piel",
        weights: { bicarbonate: 1, sulfate: 1 },
      },
      {
        id: "1d",
        text: "Purificar mi piel y reducir el acné",
        weights: { acidic: 1, sulfur: 1 },
      },
      {
        id: "1e",
        text: "Recuperar energía y vitalidad",
        weights: { ferruginous: 1, yodo: 1 },
      },
    ],
  },
  {
    id: 2,
    text: "¿Cómo te gusta que se sienta el agua termal?",
    description: "La textura del agua influye en tu sensación de descanso.",
    options: [
      {
        id: "2a",
        text: "Ligera y sedosa, como una caricia",
        weights: { simple: 1, bicarbonate: 1 },
      },
      {
        id: "2b",
        text: "Con burbujas suaves, como un baño efervescente",
        weights: { carbonated: 1 },
        hardBoost: { carbonated: 0.3 },
      },
      {
        id: "2c",
        text: "Densa y salada, que mantiene el calor",
        weights: { chloride: 1 },
      },
      {
        id: "2d",
        text: "Más mineral, con textura consistente",
        weights: { sulfate: 1, ferruginous: 1 },
      },
    ],
  },
  {
    id: 3,
    text: "¿Qué aroma te llama la atención en un baño termal?",
    description: "El olor natural del agua mineral puede transformar la experiencia.",
    options: [
      {
        id: "3a",
        text: "Suave y neutro, sin olor fuerte",
        weights: { simple: 1, radon: 1, bicarbonate: 1 },
      },
      {
        id: "3b",
        text: "Volcánico o con aroma a azufre",
        weights: { sulfur: 1 },
        hardBoost: { sulfur: 0.3 },
      },
      {
        id: "3c",
        text: "Metálico, como el hierro natural",
        weights: { ferruginous: 1 },
        hardBoost: { ferruginous: 0.3 },
      },
      {
        id: "3d",
        text: "Marino, con un toque salino o yodado",
        weights: { chloride: 1, yodo: 1 },
        hardBoost: { yodo: 0.2 },
      },
    ],
  },
  {
    id: 4,
    text: "¿Cómo describirías tu piel hoy?",
    description: "El tipo de agua puede equilibrar y cuidar tu piel.",
    options: [
      {
        id: "4a",
        text: "Sensible o un poco seca",
        weights: { simple: 1, bicarbonate: 1 },
      },
      {
        id: "4b",
        text: "Grasa o con tendencia al acné",
        weights: { acidic: 1, sulfur: 1 },
      },
      {
        id: "4c",
        text: "Con pequeñas heridas o necesita cicatrizar",
        weights: { sulfate: 1 },
      },
      {
        id: "4d",
        text: "Normal, solo busco confort y calidez",
        weights: { chloride: 1, radon: 1 },
      },
    ],
  },
  {
    id: 5,
    text: "¿Qué parte de tu cuerpo necesita más alivio?",
    description: "Los onsen ofrecen beneficios naturales para distintas molestias.",
    options: [
      {
        id: "5a",
        text: "Músculos o articulaciones cansadas",
        weights: { chloride: 1, carbonated: 1, radon: 1 },
      },
      {
        id: "5b",
        text: "Estrés, tensión o dificultad para dormir",
        weights: { simple: 1, radon: 1, carbonated: 1 },
      },
      {
        id: "5c",
        text: "Mala circulación o sensación de frío",
        weights: { chloride: 1, carbonated: 1, ferruginous: 1 },
      },
      {
        id: "5d",
        text: "Recuperación después de hacer ejercicio",
        weights: { chloride: 1, carbonated: 1 },
      },
    ],
  },
  {
    id: 6,
    text: "¿Hay algo específico que te gustaría mejorar en tu bienestar?",
    description: "Esta es la última pregunta, para ajustar tu tipo de onsen ideal.",
    options: [
      {
        id: "6a",
        text: "Piel sensible, irritada o con acné",
        weights: { acidic: 1, sulfur: 1, sulfate: 1 },
        hardBoost: { acidic: 0.2, sulfur: 0.1 },
      },
      {
        id: "6b",
        text: "Piel seca o con eczema",
        weights: { bicarbonate: 1, simple: 1 },
      },
      {
        id: "6c",
        text: "Problemas de circulación o presión baja",
        weights: { ferruginous: 1, yodo: 1, carbonated: 1 },
      },
      {
        id: "6d",
        text: "Estrés nervioso o cambios hormonales",
        weights: { radon: 1, simple: 1 },
      },
      {
        id: "6e",
        text: "Malestares digestivos leves",
        weights: { sulfate: 1, bicarbonate: 1 },
      },
      {
        id: "6f",
        text: "Ninguno en especial, solo relajarme",
        weights: {},
      },
    ],
  },
];
