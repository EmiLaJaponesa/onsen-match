import { supabase } from '@/integrations/supabase/client';

interface UploadResult {
  success: boolean;
  error?: string;
  imageUrl?: string;
}

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MIN_IMAGE_DIMENSION = 400; // 最小400x400px

interface ValidationResult {
  valid: boolean;
  error?: string;
}

const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.width, height: img.height });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('画像の読み込みに失敗しました'));
    };

    img.src = url;
  });
};

const validateImageFile = async (file: File): Promise<ValidationResult> => {
  // MIME typeチェック
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'サポートされていない画像形式です（JPEG、PNG、WebPのみ）',
    };
  }

  // ファイルサイズチェック
  if (file.size > MAX_FILE_SIZE) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
    return {
      valid: false,
      error: `ファイルサイズが大きすぎます（${sizeMB}MB > 5MB）`,
    };
  }

  // 画像サイズチェック（非同期）
  try {
    const dimensions = await getImageDimensions(file);
    if (dimensions.width < MIN_IMAGE_DIMENSION || dimensions.height < MIN_IMAGE_DIMENSION) {
      return {
        valid: false,
        error: `画像サイズが小さすぎます（最小${MIN_IMAGE_DIMENSION}x${MIN_IMAGE_DIMENSION}px）`,
      };
    }
  } catch (error) {
    return {
      valid: false,
      error: '画像の検証に失敗しました',
    };
  }

  return { valid: true };
};

export const uploadOnsenImage = async (
  file: File,
  onsenType: string
): Promise<UploadResult> => {
  try {
    // 強化されたバリデーション
    const validation = await validateImageFile(file);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    // ファイル名を正規化
    const fileExt = file.name.split('.').pop();
    const fileName = `${onsenType}.${fileExt}`;
    const filePath = fileName;

    // Supabase Storageにアップロード（既存ファイルを上書き）
    const { error: uploadError } = await supabase.storage
      .from('onsen-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return { success: false, error: 'アップロードに失敗しました' };
    }

    // パブリックURLを生成
    const { data: { publicUrl } } = supabase.storage
      .from('onsen-images')
      .getPublicUrl(filePath);

    // データベースのimage_urlを更新
    const { error: updateError } = await supabase
      .from('onsen_type_config')
      .update({
        image_url: publicUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('type', onsenType);

    if (updateError) {
      console.error('DB update error:', updateError);
      return { success: false, error: 'データベース更新に失敗しました' };
    }

    return { success: true, imageUrl: publicUrl };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, error: '予期しないエラーが発生しました' };
  }
};
