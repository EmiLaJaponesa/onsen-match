import { OnsenType } from '@/types/onsen';

export interface RelatedType {
  type: OnsenType;
  reason: string;
}

export const relatedOnsenTypes: Record<OnsenType, RelatedType[]> = {
  chloride: [
    { type: 'ferruginous', reason: 'También ofrece calor prolongado y fortalecimiento' },
    { type: 'sulfate', reason: 'Excelente para recuperación muscular y circulación' }
  ],
  bicarbonate: [
    { type: 'alkaline', reason: 'Ambas son conocidas por sus efectos embellecedores' },
    { type: 'simple', reason: 'Suave con la piel, ideal para pieles sensibles' }
  ],
  sulfur: [
    { type: 'acidic', reason: 'Ambas purifican profundamente la piel' },
    { type: 'carbonated', reason: 'Estimula la circulación y revitaliza' }
  ],
  carbonated: [
    { type: 'sulfur', reason: 'Energizante y purificante' },
    { type: 'radon', reason: 'Promueve el metabolismo y la calma profunda' }
  ],
  sulfate: [
    { type: 'chloride', reason: 'Calentamiento prolongado y recuperación' },
    { type: 'simple', reason: 'Suave pero efectivo para la circulación' }
  ],
  simple: [
    { type: 'bicarbonate', reason: 'Belleza natural sin estímulos fuertes' },
    { type: 'alkaline', reason: 'Piel sedosa con suavidad extrema' }
  ],
  ferruginous: [
    { type: 'chloride', reason: 'Retención de calor y bienestar duradero' },
    { type: 'sulfate', reason: 'Recuperación y renovación celular' }
  ],
  acidic: [
    { type: 'sulfur', reason: 'Purificación intensa y renovación' },
    { type: 'bicarbonate', reason: 'Limpieza profunda con suavidad posterior' }
  ],
  radon: [
    { type: 'carbonated', reason: 'Estimulación metabólica y relajación' },
    { type: 'simple', reason: 'Descanso profundo sin estímulos fuertes' }
  ],
  alkaline: [
    { type: 'bicarbonate', reason: 'Hermanas de la belleza natural' },
    { type: 'simple', reason: 'Suavidad equilibrada para todo tipo de piel' }
  ]
};
