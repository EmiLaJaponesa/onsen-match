import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Lock } from 'lucide-react';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().trim().email('有効なメールアドレスを入力してください').max(255, 'メールアドレスは255文字以内で入力してください'),
  password: z.string().min(8, 'パスワードは8文字以上で入力してください').max(128, 'パスワードは128文字以内で入力してください')
});

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input before API call
    const validation = loginSchema.safeParse({ email, password });
    
    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast({
        title: '入力エラー',
        description: firstError.message,
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    const { error } = await signIn(validation.data.email, validation.data.password);

    if (error) {
      toast({
        title: 'ログイン失敗',
        description: 'メールアドレスまたはパスワードが正しくありません',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'ログイン成功',
        description: '管理画面にリダイレクトします',
      });
      navigate('/admin/onsen-images');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">管理者ログイン</CardTitle>
          <CardDescription>
            画像管理システムにアクセスするにはログインが必要です
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                メールアドレス
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                パスワード
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="h-11"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ログイン中...
                </>
              ) : (
                'ログイン'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
