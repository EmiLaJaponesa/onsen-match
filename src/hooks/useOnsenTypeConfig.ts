import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface OnsenTypeConfig {
  type: string;
  title: string;
  subtitle: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
}

export const useOnsenTypeConfig = () => {
  return useQuery({
    queryKey: ['onsen-type-config'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('onsen_type_config')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      
      return data as OnsenTypeConfig[];
    },
    staleTime: 1000 * 60 * 10, // 10分キャッシュ
  });
};
