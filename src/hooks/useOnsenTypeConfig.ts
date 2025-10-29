import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// 既存のsrc/assets画像をフォールバックとして使用
import chlorideImg from '@/assets/onsen-chloride.jpg';
import bicarbonateImg from '@/assets/onsen-bicarbonate.jpg';
import sulfurImg from '@/assets/onsen-sulfur.jpg';
import carbonatedImg from '@/assets/onsen-carbonated.jpg';
import sulfateImg from '@/assets/onsen-sulfate.jpg';
import simpleImg from '@/assets/onsen-simple.jpg';
import ferruginousImg from '@/assets/onsen-ferruginous.jpg';
import acidicImg from '@/assets/onsen-acidic.jpg';
import radonImg from '@/assets/onsen-radon.jpg';
import yodoImg from '@/assets/onsen-yodo.jpg';

const FALLBACK_IMAGES: Record<string, string> = {
  chloride: chlorideImg,
  bicarbonate: bicarbonateImg,
  sulfur: sulfurImg,
  carbonated: carbonatedImg,
  sulfate: sulfateImg,
  simple: simpleImg,
  ferruginous: ferruginousImg,
  acidic: acidicImg,
  radon: radonImg,
  yodo: yodoImg,
};

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
      
      // Supabase画像を優先、失敗時のみフォールバック + キャッシュバスティング
      return data.map(item => ({
        ...item,
        image_url: item.image_url 
          ? `${item.image_url}?t=${new Date(item.updated_at).getTime()}`
          : FALLBACK_IMAGES[item.type]
      })) as OnsenTypeConfig[];
    },
    staleTime: 1000 * 30, // 30秒キャッシュ
    gcTime: 1000 * 60 * 5, // 5分後にガベージコレクション
  });
};
