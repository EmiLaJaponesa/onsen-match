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
      
      // Supabase画像URLにキャッシュバスティングパラメータを追加
      return data.map(item => ({
        ...item,
        image_url: item.image_url 
          ? `${item.image_url}?t=${new Date(item.updated_at).getTime()}`
          : null
      })) as OnsenTypeConfig[];
    },
    staleTime: Infinity, // 画像URLは更新頻度が低いため無期限キャッシュ
    gcTime: 1000 * 60 * 30, // 30分後にガベージコレクション
    refetchOnWindowFocus: false, // ウィンドウフォーカス時の再取得を無効化
    refetchOnMount: false, // マウント時の再取得を無効化
    refetchOnReconnect: false, // 再接続時の再取得も無効化
  });
};
