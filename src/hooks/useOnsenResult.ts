import { useMemo } from 'react';
import { OnsenType } from '@/types/onsen';
import { onsenResults } from '@/data/onsenTypes';
import { onsenImages } from '@/utils/onsenImages';

export const useOnsenResult = (type: OnsenType | undefined) => {
  return useMemo(() => {
    if (!type) return { result: null, image: null };
    return {
      result: onsenResults[type],
      image: onsenImages[type]
    };
  }, [type]);
};
