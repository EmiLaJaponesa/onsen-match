import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

export type UserRole = 'admin' | 'editor' | 'viewer';

interface AuthState {
  user: User | null;
  session: Session | null;
  role: UserRole | null;
  loading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    role: null,
    loading: true,
  });

  useEffect(() => {
    // 初期セッション取得
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const role = await fetchUserRole(session.user.id);
        setAuthState({
          user: session.user,
          session,
          role,
          loading: false,
        });
      } else {
        setAuthState({ user: null, session: null, role: null, loading: false });
      }
    };

    initAuth();

    // 認証状態の変更を監視
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const role = await fetchUserRole(session.user.id);
          setAuthState({
            user: session.user,
            session,
            role,
            loading: false,
          });
        } else {
          setAuthState({ user: null, session: null, role: null, loading: false });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRole = async (userId: string): Promise<UserRole | null> => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .order('role', { ascending: false }) // admin > editor > viewer
      .limit(1)
      .single();

    if (error || !data) return null;
    return data.role as UserRole;
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return {
    ...authState,
    signIn,
    signOut,
    isAdmin: authState.role === 'admin',
    isEditor: authState.role === 'editor' || authState.role === 'admin',
  };
};
