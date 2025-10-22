import { HardBoostRule } from '@/types/onsen';

/**
 * Hard Boost Rules - Critical decision points that strongly influence diagnosis
 * These boost specific onsen types when user makes distinctive choices
 */
export const hardBoostRules: HardBoostRule[] = [
  // Q2: Carbonated water is very distinctive
  { questionId: 2, optionId: '2b', boosts: { carbonated: 0.3 } },
  
  // Q3: Strong mineral aromas are key identifiers
  { questionId: 3, optionId: '3b', boosts: { sulfur: 0.3 } },
  { questionId: 3, optionId: '3c', boosts: { ferruginous: 0.3 } },
  { questionId: 3, optionId: '3d', boosts: { alkaline: 0.2 } },
  
  // Q6: Specific medical indications (most important)
  { questionId: 6, optionId: '6a', boosts: { acidic: 0.2, sulfur: 0.1 } },
];
