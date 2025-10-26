-- セキュリティ修正: 関数のsearch_pathを設定

CREATE OR REPLACE FUNCTION update_onsen_type_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public;