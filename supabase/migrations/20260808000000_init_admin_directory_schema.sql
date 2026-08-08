-- ================================================================
-- Supabase Schema Migration: Admin Panel, Registration Approval & Directory
-- ================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------
-- 1. Table: profiles (Public Approved Members)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  slug TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  father_name TEXT,
  gotra TEXT,
  marwar_location TEXT,
  current_city TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT DEFAULT 'भारत',
  occupation TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  profile_image TEXT,
  designation TEXT,
  company_name TEXT,
  category TEXT DEFAULT 'व्यापार / व्यवसाय',
  address TEXT,
  bio TEXT,
  website TEXT,
  social_links JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'approved' CHECK (status IN ('approved', 'disabled')),
  registration_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast directory queries
CREATE INDEX IF NOT EXISTS idx_profiles_status ON public.profiles(status);
CREATE INDEX IF NOT EXISTS idx_profiles_city ON public.profiles(current_city);
CREATE INDEX IF NOT EXISTS idx_profiles_state ON public.profiles(state);
CREATE INDEX IF NOT EXISTS idx_profiles_category ON public.profiles(category);
CREATE INDEX IF NOT EXISTS idx_profiles_full_name ON public.profiles(full_name);
CREATE INDEX IF NOT EXISTS idx_profiles_slug ON public.profiles(slug);

-- ----------------------------------------------------------------
-- 2. Table: registration_requests (Approval Queue)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.registration_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  father_name TEXT NOT NULL,
  gotra TEXT NOT NULL,
  marwar_location TEXT NOT NULL,
  current_city TEXT NOT NULL,
  state TEXT NOT NULL,
  occupation TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  profile_image TEXT,
  registration_data JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  rejection_reason TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reg_requests_status ON public.registration_requests(status);
CREATE INDEX IF NOT EXISTS idx_reg_requests_phone ON public.registration_requests(phone);
CREATE INDEX IF NOT EXISTS idx_reg_requests_submitted ON public.registration_requests(submitted_at DESC);

-- ----------------------------------------------------------------
-- 3. Table: admin_users (Admin Role Mapping)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  username TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------
-- 4. Table: admin_activity_logs
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  admin_username TEXT,
  action TEXT NOT NULL,
  target_id TEXT,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_logs_created_at ON public.admin_activity_logs(created_at DESC);

-- ----------------------------------------------------------------
-- 4b. Table: blogs (Community Blogs & News)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.blogs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  "desc" TEXT NOT NULL,
  image TEXT NOT NULL,
  meta TEXT NOT NULL,
  category TEXT DEFAULT 'मारवाड़',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON public.blogs(created_at DESC);

-- ----------------------------------------------------------------
-- 5. Updated At Trigger Function
-- ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reg_requests_updated_at
  BEFORE UPDATE ON public.registration_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ----------------------------------------------------------------
-- 6. Helper Function: Helper to check if current user is Admin
-- ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ----------------------------------------------------------------
-- 7. Row Level Security (RLS) Policies
-- ----------------------------------------------------------------

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registration_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- RLS: blogs
CREATE POLICY "Public read blogs"
  ON public.blogs FOR SELECT
  USING (true);

CREATE POLICY "Public write blogs"
  ON public.blogs FOR ALL
  USING (true) WITH CHECK (true);

-- RLS: profiles
-- Public can ONLY view approved profiles
CREATE POLICY "Public profiles read policy"
  ON public.profiles FOR SELECT
  USING (status = 'approved');

-- Admins full access on profiles
CREATE POLICY "Admins full access on profiles"
  ON public.profiles FOR ALL
  USING (public.is_admin());

-- RLS: registration_requests
-- Anyone (guest or logged in) can submit a registration request
CREATE POLICY "Public insert registration requests"
  ON public.registration_requests FOR INSERT
  WITH CHECK (true);

-- Anyone can check status of their request by phone/email or user_id
CREATE POLICY "Public select registration requests by phone/email"
  ON public.registration_requests FOR SELECT
  USING (
    public.is_admin() OR 
    (auth.uid() IS NOT NULL AND user_id = auth.uid())
  );

-- Admins full access on registration_requests
CREATE POLICY "Admins full access on registration requests"
  ON public.registration_requests FOR ALL
  USING (public.is_admin());

-- RLS: admin_users
CREATE POLICY "Admins read admin_users"
  ON public.admin_users FOR SELECT
  USING (public.is_admin() OR auth.uid() = user_id);

CREATE POLICY "Super admins manage admin_users"
  ON public.admin_users FOR ALL
  USING (public.is_admin());

-- RLS: admin_activity_logs
CREATE POLICY "Admins read/write activity logs"
  ON public.admin_activity_logs FOR ALL
  USING (public.is_admin());

-- ----------------------------------------------------------------
-- 8. RPC: Approve Registration Request
-- ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION approve_registration_request(
  p_request_id UUID,
  p_admin_id UUID
)
RETURNS JSONB AS $$
DECLARE
  v_req RECORD;
  v_slug TEXT;
  v_admin_username TEXT;
  v_profile_id UUID;
BEGIN
  -- Verify admin status
  IF NOT EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = p_admin_id) THEN
    RAISE EXCEPTION 'Unauthorized: Only admins can approve registrations.';
  END IF;

  -- Fetch request
  SELECT * INTO v_req FROM public.registration_requests WHERE id = p_request_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Registration request not found.';
  END IF;

  -- Generate unique slug from full name
  v_slug := lower(regexp_replace(v_req.full_name, '[^a-zA-Z0-9]+', '-', 'g'));
  IF v_slug = '' OR v_slug IS NULL THEN
    v_slug := 'member-' || substring(p_request_id::text, 1, 8);
  END IF;

  -- Ensure slug uniqueness
  IF EXISTS (SELECT 1 FROM public.profiles WHERE slug = v_slug) THEN
    v_slug := v_slug || '-' || substring(p_request_id::text, 1, 4);
  END IF;

  -- Fetch admin username
  SELECT username INTO v_admin_username FROM public.admin_users WHERE user_id = p_admin_id;

  -- Upsert into profiles
  INSERT INTO public.profiles (
    user_id,
    slug,
    full_name,
    father_name,
    gotra,
    marwar_location,
    current_city,
    state,
    occupation,
    phone,
    email,
    profile_image,
    designation,
    company_name,
    category,
    status
  ) VALUES (
    v_req.user_id,
    v_slug,
    v_req.full_name,
    v_req.father_name,
    v_req.gotra,
    v_req.marwar_location,
    v_req.current_city,
    v_req.state,
    v_req.occupation,
    v_req.phone,
    v_req.email,
    v_req.profile_image,
    v_req.occupation,
    COALESCE((v_req.registration_data->>'company_name'), v_req.occupation),
    'व्यापार / व्यवसाय',
    'approved'
  )
  RETURNING id INTO v_profile_id;

  -- Update request status
  UPDATE public.registration_requests
  SET status = 'approved',
      reviewed_at = NOW(),
      reviewed_by = p_admin_id,
      rejection_reason = NULL
  WHERE id = p_request_id;

  -- Log action
  INSERT INTO public.admin_activity_logs (
    admin_id,
    admin_username,
    action,
    target_id,
    description
  ) VALUES (
    p_admin_id,
    COALESCE(v_admin_username, 'admin'),
    'APPROVE_REGISTRATION',
    p_request_id::text,
    'Approved registration request for ' || v_req.full_name || ' (' || v_req.current_city || ')'
  );

  RETURN jsonb_build_object(
    'success', true,
    'profile_id', v_profile_id,
    'slug', v_slug
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ----------------------------------------------------------------
-- 9. RPC: Reject Registration Request
-- ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION reject_registration_request(
  p_request_id UUID,
  p_reason TEXT,
  p_admin_id UUID
)
RETURNS JSONB AS $$
DECLARE
  v_req RECORD;
  v_admin_username TEXT;
BEGIN
  -- Verify admin
  IF NOT EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = p_admin_id) THEN
    RAISE EXCEPTION 'Unauthorized: Only admins can reject registrations.';
  END IF;

  SELECT * INTO v_req FROM public.registration_requests WHERE id = p_request_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Registration request not found.';
  END IF;

  SELECT username INTO v_admin_username FROM public.admin_users WHERE user_id = p_admin_id;

  -- Update request
  UPDATE public.registration_requests
  SET status = 'rejected',
      rejection_reason = p_reason,
      reviewed_at = NOW(),
      reviewed_by = p_admin_id
  WHERE id = p_request_id;

  -- Disable profile if previously approved
  UPDATE public.profiles
  SET status = 'disabled'
  WHERE phone = v_req.phone OR (v_req.email IS NOT NULL AND email = v_req.email);

  -- Log action
  INSERT INTO public.admin_activity_logs (
    admin_id,
    admin_username,
    action,
    target_id,
    description
  ) VALUES (
    p_admin_id,
    COALESCE(v_admin_username, 'admin'),
    'REJECT_REGISTRATION',
    p_request_id::text,
    'Rejected registration request for ' || v_req.full_name || '. Reason: ' || COALESCE(p_reason, 'No reason specified')
  );

  RETURN jsonb_build_object('success', true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ----------------------------------------------------------------
-- 10. Seed Default Admin User Helper
-- ----------------------------------------------------------------
-- To seed the initial admin account (admin2233 / admin@2233), run the following in SQL Editor:
-- 
-- 1. Create User in Supabase Auth Dashboard or via SQL:
-- INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data)
-- VALUES (
--   '00000000-0000-0000-0000-000000000001',
--   'admin2233@malisamaj.org',
--   crypt('admin@2233', gen_salt('bf')),
--   now(),
--   '{"provider":"email","providers":["email"]}',
--   '{"username":"admin2233"}'
-- ) ON CONFLICT DO NOTHING;
--
-- 2. Link to admin_users:
-- INSERT INTO public.admin_users (user_id, username, role)
-- VALUES ('00000000-0000-0000-0000-000000000001', 'admin2233', 'admin')
-- ON CONFLICT DO NOTHING;
