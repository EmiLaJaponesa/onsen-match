import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { uploadOnsenImage } from '@/utils/uploadOnsenImage';
import { Loader2, Check, AlertCircle } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';

interface OnsenImageUploadCardProps {
  type: string;
  title: string;
  subtitle: string;
  currentImageUrl: string;
  onUploadSuccess: () => void;
}

export const OnsenImageUploadCard = ({
  type,
  title,
  subtitle,
  currentImageUrl,
  onUploadSuccess,
}: OnsenImageUploadCardProps) => {
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadStatus('idle');
    setUploadProgress(0);

    // プログレスバーアニメーション（疑似的）
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => Math.min(prev + 10, 90));
    }, 200);

    const result = await uploadOnsenImage(file, type);

    clearInterval(progressInterval);
    setUploadProgress(100);
    setUploading(false);

    if (result.success) {
      setUploadStatus('success');
      toast({
        title: '✅ アップロード成功',
        description: `${title}の画像を更新しました`,
      });
      onUploadSuccess();

      // 3秒後にステータスをリセット
      setTimeout(() => setUploadStatus('idle'), 3000);
    } else {
      setUploadStatus('error');
      toast({
        title: '❌ アップロード失敗',
        description: result.error,
        variant: 'destructive',
      });
    }

    // ファイル選択をリセット
    e.target.value = '';
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>{title}</span>
          {uploadStatus === 'success' && (
            <Check className="h-5 w-5 text-green-500 animate-in fade-in" />
          )}
          {uploadStatus === 'error' && (
            <AlertCircle className="h-5 w-5 text-red-500 animate-in fade-in" />
          )}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 現在の画像プレビュー */}
        <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
          <OptimizedImage
            src={currentImageUrl}
            alt={title}
            className="w-full h-full object-cover"
            priority={true}
          />
          
          {/* 成功/失敗オーバーレイアニメーション */}
          {uploadStatus === 'success' && (
            <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center animate-in fade-in zoom-in duration-500">
              <div className="bg-green-500 text-white p-4 rounded-full">
                <Check className="h-8 w-8" />
              </div>
            </div>
          )}

          {uploadStatus === 'error' && (
            <div className="absolute inset-0 bg-red-500/10 flex items-center justify-center animate-in fade-in zoom-in duration-500">
              <div className="bg-red-500 text-white p-4 rounded-full">
                <AlertCircle className="h-8 w-8" />
              </div>
            </div>
          )}
        </div>

        {/* アップロードボタン */}
        <div className="space-y-2">
          <Input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            disabled={uploading}
            className="cursor-pointer file:cursor-pointer"
          />
          
          {uploading && (
            <div className="space-y-2">
              <Progress value={uploadProgress} className="h-2" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>アップロード中... {uploadProgress}%</span>
              </div>
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            推奨: JPEG/PNG/WebP、最大5MB、400x400px以上
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
