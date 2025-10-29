import { useOnsenTypeConfig } from '@/hooks/useOnsenTypeConfig';
import { OnsenImageUploadCard } from '@/components/admin/OnsenImageUploadCard';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';

export default function AdminOnsenImages() {
  const { data: onsenTypes, isLoading } = useOnsenTypeConfig();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  const handleUploadSuccess = () => {
    // React Queryのキャッシュを完全削除して即座に再取得
    queryClient.invalidateQueries({ queryKey: ['onsen-type-config'] });
    queryClient.removeQueries({ queryKey: ['onsen-type-config'] });
    queryClient.refetchQueries({ queryKey: ['onsen-type-config'] });
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['onsen-type-config'] });
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* ヘッダー */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                トップページに戻る
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {user?.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span className="hidden sm:inline">更新</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">ログアウト</span>
              </Button>
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">温泉タイプ画像管理</h1>
            <p className="text-muted-foreground">
              各温泉タイプの画像をアップロードして更新できます。
              画像は自動的にSupabase Storageに保存され、トップページに反映されます。
            </p>
          </div>
        </div>

        {/* 画像アップロードカードグリッド */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} className="h-[400px] rounded-lg" />
            ))
          ) : (
            onsenTypes?.map((onsenType) => (
              <OnsenImageUploadCard
                key={onsenType.type}
                type={onsenType.type}
                title={onsenType.title}
                subtitle={onsenType.subtitle}
                currentImageUrl={onsenType.image_url}
                onUploadSuccess={handleUploadSuccess}
              />
            ))
          )}
        </div>

        {/* 使い方ガイド */}
        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h2 className="text-xl font-semibold mb-3">使い方</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>変更したい温泉タイプのカードを見つける</li>
            <li>「ファイルを選択」ボタンをクリックして画像を選択</li>
            <li>アップロードが自動的に開始される</li>
            <li>成功メッセージが表示されたら完了</li>
            <li>トップページに戻って新しい画像を確認</li>
          </ol>
          
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-950 rounded border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>⚠️ 注意:</strong> アップロードした画像は即座にトップページに反映されます。
              適切な画像を選択してください（推奨サイズ: 800x800px以上）。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
