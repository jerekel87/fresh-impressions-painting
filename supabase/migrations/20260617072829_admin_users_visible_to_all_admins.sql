-- Allow any authenticated admin to view and manage the full admin list.
-- A SECURITY DEFINER helper avoids RLS recursion when referencing admin_users
-- from within its own policies.

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid());
$$;

DROP POLICY IF EXISTS "Admins can read admin users" ON admin_users;
CREATE POLICY "Admins can read admin users" ON admin_users
  FOR SELECT TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete admin users" ON admin_users;
CREATE POLICY "Admins can delete admin users" ON admin_users
  FOR DELETE TO authenticated
  USING (public.is_admin());
