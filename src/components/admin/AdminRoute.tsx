import { ReactNode } from 'react';

interface AdminRouteProps {
  children: ReactNode;
}

export const AdminRoute = ({ children }: AdminRouteProps) => {
  // 現時点では認証チェックなし（将来の拡張用）
  // TODO: Supabase Authを導入した際に、ここで認証チェックを実装
  
  // 開発環境でのアクセス警告
  if (import.meta.env.DEV) {
    console.warn('⚠️ Admin route accessed without authentication');
  }

  return <>{children}</>;
};
