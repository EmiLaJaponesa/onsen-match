import { OnsenType } from '@/types/onsen';

/**
 * Normalizes onsen type names for backward compatibility
 * Maps legacy 'alkaline' to the new 'yodo' naming
 */
export const normalizeOnsenType = (type: string | undefined): OnsenType | undefined => {
  if (!type) return undefined;
  if (type === 'alkaline') return 'yodo';
  return type as OnsenType;
};

/**
 * Legacy type mapping for backward compatibility
 */
export const LEGACY_TYPE_MAP: Record<string, OnsenType> = {
  'alkaline': 'yodo'
};
