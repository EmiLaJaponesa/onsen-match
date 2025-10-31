import { useEffect, useState } from 'react';
import { OnsenType } from '@/types/onsen';
import { supabase } from '@/integrations/supabase/client';
import { getSessionId } from '@/utils/sessionManager';

interface DiagnosisData {
  confidence?: 'high' | 'medium' | 'exploratory';
  alternativeType?: OnsenType;
  alternativeScore?: number;
}

/**
 * Hook to fetch additional diagnosis data for the current session
 * Returns confidence level and alternative onsen type if available
 */
export const useOnsenDiagnosis = (currentType: OnsenType | undefined) => {
  const [diagnosisData, setDiagnosisData] = useState<DiagnosisData>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentType) {
      setIsLoading(false);
      return;
    }

    const fetchDiagnosisData = async () => {
      try {
        const sessionId = getSessionId();
        
        const { data, error } = await supabase
          .from('quiz_results')
          .select('confidence_level, alternative_type, alternative_percentage')
          .eq('session_id', sessionId)
          .eq('onsen_type', currentType)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (!error && data) {
          setDiagnosisData({
            confidence: data.confidence_level as 'high' | 'medium' | 'exploratory' | undefined,
            alternativeType: data.alternative_type as OnsenType | undefined,
            alternativeScore: data.alternative_percentage ? Math.round(data.alternative_percentage) : undefined,
          });
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('Failed to fetch diagnosis data:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiagnosisData();
  }, [currentType]);

  return { ...diagnosisData, isLoading };
};
