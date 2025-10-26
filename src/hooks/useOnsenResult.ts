import { useMemo } from 'react';
import { OnsenType } from '@/types/onsen';
import { onsenResults } from '@/data/onsenTypes';
import { useOnsenTypeConfig } from '@/hooks/useOnsenTypeConfig';

export const useOnsenResult = (type: OnsenType | undefined) => {
  const { data: onsenTypes } = useOnsenTypeConfig();
  
  return useMemo(() => {
    if (!type) return { result: null, image: null };
    
    const imageConfig = onsenTypes?.find(t => t.type === type);
    
    return {
      result: onsenResults[type],
      image: imageConfig?.image_url || null
    };
  }, [type, onsenTypes]);
};
