import { Question } from "@/types/onsen";

export const questions: Question[] = [
  {
    id: 1,
    text: "¿Qué te gustaría mejorar hoy?",
    description: "Elige el objetivo principal de tu visita al onsen",
    options: [
      {
        id: "1a",
        text: "Relajar cuerpo y mente",
        weights: { simple: 1, radon: 1 },
      },
      {
        id: "1b",
        text: "Mejorar circulación y aliviar músculos",
        weights: { carbonated: 1, chloride: 1 },
      },
      {
        id: "1c",
        text: "Hidratar o suavizar mi piel",
        weights: { bicarbonate: 1, sulfate: 1 },
      },
      {
        id: "1d",
        text: "Purificar la piel / controlar acné",
        weights: { acidic: 1, sulfur: 1 },
      },
      {
        id: "1e",
        text: "Recuperar energía / anemia",
        weights: { ferruginous: 1, alkaline: 1 },
      },
    ],
  },
  {
    id: 2,
    text: "¿Cómo prefieres que se sienta el agua?",
    description: "La textura del agua afecta tu experiencia",
    options: [
      {
        id: "2a",
        text: "Ligera y sedosa",
        weights: { simple: 1, bicarbonate: 1 },
      },
      {
        id: "2b",
        text: "Con burbujas / efervescente",
        weights: { carbonated: 1 },
        hardBoost: { carbonated: 0.3 },
      },
      {
        id: "2c",
        text: "Densa y salada, que conserve el calor",
        weights: { chloride: 1 },
      },
      {
        id: "2d",
        text: 'Mineral marcada, más "consistente"',
        weights: { sulfate: 1, ferruginous: 1 },
      },
    ],
  },
  {
    id: 3,
    text: "¿Qué aromas minerales toleras o disfrutas?",
    description: "Algunos onsens tienen aromas característicos",
    options: [
      {
        id: "3a",
        text: "Neutro (sin olor fuerte)",
        weights: { simple: 1, radon: 1, bicarbonate: 1 },
      },
      {
        id: "3b",
        text: "Volcánico / azufrado",
        weights: { sulfur: 1 },
        hardBoost: { sulfur: 0.3 },
      },
      {
        id: "3c",
        text: "Metálico / hierro",
        weights: { ferruginous: 1 },
        hardBoost: { ferruginous: 0.3 },
      },
      {
        id: "3d",
        text: "Marino / yodado",
        weights: { chloride: 1, alkaline: 1 },
        hardBoost: { alkaline: 0.2 },
      },
    ],
  },
  {
    id: 4,
    text: "¿Cómo está tu piel hoy?",
    description: "El tipo de agua puede mejorar tu condición de piel",
    options: [
      {
        id: "4a",
        text: "Seca / sensible",
        weights: { simple: 1, bicarbonate: 1 },
      },
      {
        id: "4b",
        text: "Grasa / acné (puedo tolerar más intensidad)",
        weights: { acidic: 1, sulfur: 1 },
      },
      {
        id: "4c",
        text: "Con pequeñas heridas / cicatrización",
        weights: { sulfate: 1 },
      },
      {
        id: "4d",
        text: "Normal; busco confort y calidez",
        weights: { chloride: 1, radon: 1 },
      },
    ],
  },
  {
    id: 5,
    text: "¿Qué molestias físicas te gustaría aliviar?",
    description: "Beneficios generales del onsen",
    options: [
      {
        id: "5a",
        text: "Dolor muscular o articular",
        weights: { chloride: 1, carbonated: 1, radon: 1 },
      },
      {
        id: "5b",
        text: "Estrés / fatiga crónica / insomnio",
        weights: { simple: 1, radon: 1, carbonated: 1 },
      },
      {
        id: "5c",
        text: "Mala circulación / sensación de frío",
        weights: { chloride: 1, carbonated: 1, ferruginous: 1 },
      },
      {
        id: "5d",
        text: "Recuperación post esfuerzo físico / deporte",
        weights: { chloride: 1, carbonated: 1 },
      },
    ],
  },
  {
    id: 6,
    text: "¿Tienes alguna condición específica que quieras mejorar?",
    description: "Esta es la última pregunta para el diagnóstico",
    options: [
      {
        id: "6a",
        text: "Piel sensible/irritada o con acné",
        weights: { acidic: 1, sulfur: 1, sulfate: 1 },
        hardBoost: { acidic: 0.2, sulfur: 0.1 },
      },
      {
        id: "6b",
        text: "Piel seca / eczema",
        weights: { bicarbonate: 1, simple: 1 },
      },
      {
        id: "6c",
        text: "Circulación / presión baja / anemia",
        weights: { ferruginous: 1, alkaline: 1, carbonated: 1 },
      },
      {
        id: "6d",
        text: "Estrés nervioso / menopausia / equilibrio hormonal",
        weights: { radon: 1, simple: 1 },
      },
      {
        id: "6e",
        text: "Problemas digestivos leves",
        weights: { sulfate: 1, bicarbonate: 1 },
      },
      {
        id: "6f",
        text: "Ninguna en especial, solo relajarme",
        weights: {},
      },
    ],
  },
];
