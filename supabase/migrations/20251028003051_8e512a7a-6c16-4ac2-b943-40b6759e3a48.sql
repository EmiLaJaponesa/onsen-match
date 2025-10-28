-- Phase 1: 認証システム導入

-- ステップ1: ロール定義
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'viewer');

-- ステップ2: ユーザーロールテーブル作成
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID,
  UNIQUE (user_id, role)
);

-- ステップ3: RLS有効化
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- ステップ4: セキュリティ関数（再帰防止）
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- ステップ5: RLSポリシー
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- ステップ6: Storage RLSポリシー更新
DROP POLICY IF EXISTS "Public upload access" ON storage.objects;
DROP POLICY IF EXISTS "Public update access" ON storage.objects;
DROP POLICY IF EXISTS "Allow anonymous upload to onsen-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow anonymous update to onsen-images" ON storage.objects;

CREATE POLICY "Admins and editors can upload"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'onsen-images' 
  AND (
    public.has_role(auth.uid(), 'admin') 
    OR public.has_role(auth.uid(), 'editor')
  )
);

CREATE POLICY "Admins and editors can update"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'onsen-images' 
  AND (
    public.has_role(auth.uid(), 'admin') 
    OR public.has_role(auth.uid(), 'editor')
  )
);

CREATE POLICY "Anyone can view onsen images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'onsen-images');

-- onsen_type_config テーブルの更新権限
ALTER TABLE public.onsen_type_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins and editors can update config"
ON public.onsen_type_config
FOR UPDATE
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin') 
  OR public.has_role(auth.uid(), 'editor')
);

-- ステップ7: 初期管理者作成用関数
CREATE OR REPLACE FUNCTION public.make_user_admin(_email TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _user_id UUID;
BEGIN
  SELECT id INTO _user_id
  FROM auth.users
  WHERE email = _email;

  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'User not found: %', _email;
  END IF;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (_user_id, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;