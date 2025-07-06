
-- First, let's ensure we have the auth trigger for user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    'owner'::text -- default role, can be changed by site managers
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger if it doesn't exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add RLS policies for users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Site managers can view all users" ON public.users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'site_manager'
    )
  );

-- Update existing RLS policies to work with auth system
-- Sites policies
DROP POLICY IF EXISTS "Owner accesses only their site" ON public.sites;
DROP POLICY IF EXISTS "Site managers access all sites" ON public.sites;

CREATE POLICY "Owners can view their assigned site" ON public.sites
  FOR SELECT USING (
    auth.role() = 'authenticated' AND (
      EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() 
        AND assigned_site = sites.id
        AND role = 'owner'
      )
      OR
      EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() 
        AND role = 'site_manager'
      )
    )
  );

CREATE POLICY "Site managers can manage all sites" ON public.sites
  FOR ALL USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'site_manager'
    )
  );

-- Update other table policies to use the users table instead of direct role checks
-- Daily updates policies
DROP POLICY IF EXISTS "Manager full access" ON public.daily_updates;
DROP POLICY IF EXISTS "Owner read own site" ON public.daily_updates;

CREATE POLICY "Site managers full access to daily updates" ON public.daily_updates
  FOR ALL USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'site_manager'
    )
  );

CREATE POLICY "Owners can view their site daily updates" ON public.daily_updates
  FOR SELECT USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND assigned_site = daily_updates.site_id
      AND role = 'owner'
    )
  );

-- Apply similar pattern to other tables
-- Materials log
DROP POLICY IF EXISTS "Manager full access" ON public.materials_log;
DROP POLICY IF EXISTS "Owner read own site" ON public.materials_log;

CREATE POLICY "Site managers full access to materials" ON public.materials_log
  FOR ALL USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'site_manager'
    )
  );

CREATE POLICY "Owners can view their site materials" ON public.materials_log
  FOR SELECT USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND assigned_site = materials_log.site_id
      AND role = 'owner'
    )
  );

-- Stock tracker
DROP POLICY IF EXISTS "Manager full access" ON public.stock_tracker;
DROP POLICY IF EXISTS "Owner read own site" ON public.stock_tracker;

CREATE POLICY "Site managers full access to stock" ON public.stock_tracker
  FOR ALL USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'site_manager'
    )
  );

CREATE POLICY "Owners can view their site stock" ON public.stock_tracker
  FOR SELECT USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND assigned_site = stock_tracker.site_id
      AND role = 'owner'
    )
  );

-- Payments
DROP POLICY IF EXISTS "Manager full access" ON public.payments;
DROP POLICY IF EXISTS "Owner read own site" ON public.payments;

CREATE POLICY "Site managers full access to payments" ON public.payments
  FOR ALL USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'site_manager'
    )
  );

CREATE POLICY "Owners can view and approve their site payments" ON public.payments
  FOR SELECT USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND assigned_site = payments.site_id
      AND role = 'owner'
    )
  );

CREATE POLICY "Owners can update payment status" ON public.payments
  FOR UPDATE USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND assigned_site = payments.site_id
      AND role = 'owner'
    )
  ) WITH CHECK (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND assigned_site = payments.site_id
      AND role = 'owner'
    )
  );

-- Apply similar patterns to remaining tables (blueprints, paint_picker, progress_tasks, contacts)
-- Blueprints
DROP POLICY IF EXISTS "Manager full access" ON public.blueprints;
DROP POLICY IF EXISTS "Owner read own site" ON public.blueprints;

CREATE POLICY "Site managers full access to blueprints" ON public.blueprints
  FOR ALL USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'site_manager'
    )
  );

CREATE POLICY "Owners can view their site blueprints" ON public.blueprints
  FOR SELECT USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND assigned_site = blueprints.site_id
      AND role = 'owner'
    )
  );

-- Paint picker
DROP POLICY IF EXISTS "Manager full access" ON public.paint_picker;
DROP POLICY IF EXISTS "Owner read own site" ON public.paint_picker;

CREATE POLICY "Site managers full access to paint picker" ON public.paint_picker
  FOR ALL USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'site_manager'
    )
  );

CREATE POLICY "Owners can view their site paint designs" ON public.paint_picker
  FOR SELECT USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND assigned_site = paint_picker.site_id
      AND role = 'owner'
    )
  );

-- Progress tasks
DROP POLICY IF EXISTS "Manager full access" ON public.progress_tasks;
DROP POLICY IF EXISTS "Owner read own site" ON public.progress_tasks;

CREATE POLICY "Site managers full access to progress tasks" ON public.progress_tasks
  FOR ALL USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'site_manager'
    )
  );

CREATE POLICY "Owners can view their site progress" ON public.progress_tasks
  FOR SELECT USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND assigned_site = progress_tasks.site_id
      AND role = 'owner'
    )
  );

-- Contacts
DROP POLICY IF EXISTS "Manager full access" ON public.contacts;
DROP POLICY IF EXISTS "Owner read own site" ON public.contacts;

CREATE POLICY "Site managers full access to contacts" ON public.contacts
  FOR ALL USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'site_manager'
    )
  );

CREATE POLICY "Owners can view their site contacts" ON public.contacts
  FOR SELECT USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND assigned_site = contacts.site_id
      AND role = 'owner'
    )
  );
