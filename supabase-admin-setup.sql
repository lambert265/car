-- ============================================
-- LUXE Motors - Admin Account Setup
-- ============================================

-- Step 1: Create admin role enum (if not exists)
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('user', 'admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Step 2: Add role column to auth.users metadata (using raw_user_meta_data)
-- Note: Supabase stores custom user data in raw_user_meta_data JSON field

-- Step 3: Create a profiles table to store user roles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Step 4: Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'user'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- OPTION 1: Create Admin Account via SQL
-- ============================================
-- Replace with your desired admin credentials
-- Password will be hashed automatically by Supabase

-- Note: You need to run this in Supabase SQL Editor
-- Then manually verify the email in Supabase Dashboard > Authentication > Users

-- After creating the user through sign-up, run this to make them admin:
-- UPDATE public.profiles 
-- SET role = 'admin' 
-- WHERE email = 'admin@luxemotors.com';

-- ============================================
-- OPTION 2: Promote Existing User to Admin
-- ============================================
-- If you already have a user account, promote it to admin:

-- UPDATE public.profiles 
-- SET role = 'admin' 
-- WHERE email = 'YOUR_EMAIL@example.com';

-- ============================================
-- Helper Functions
-- ============================================

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = user_id AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get current user role
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT AS $$
BEGIN
  RETURN (
    SELECT role FROM public.profiles
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- Admin-Only Policies for Other Tables
-- ============================================

-- Example: Only admins can manage orders
CREATE POLICY "Admins can manage all orders" ON public.orders
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Example: Only admins can manage test drive bookings
CREATE POLICY "Admins can manage all bookings" ON public.test_drive_bookings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Example: Only admins can manage enquiries
CREATE POLICY "Admins can manage all enquiries" ON public.enquiries
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- INSTRUCTIONS TO CREATE ADMIN ACCOUNT
-- ============================================

/*
METHOD 1: Create Admin via Sign-Up Page
1. Go to your app: http://localhost:3000/sign-up
2. Sign up with email: admin@luxemotors.com (or your preferred email)
3. Verify the email in Supabase Dashboard
4. Run this SQL in Supabase SQL Editor:

   UPDATE public.profiles 
   SET role = 'admin' 
   WHERE email = 'admin@luxemotors.com';

5. Sign out and sign in again
6. You should now have admin access


METHOD 2: Promote Existing User
1. Sign up normally with any email
2. Run this SQL in Supabase SQL Editor:

   UPDATE public.profiles 
   SET role = 'admin' 
   WHERE email = 'your-email@example.com';

3. Sign out and sign in again
4. You should now have admin access


METHOD 3: Create Admin Directly in Supabase Dashboard
1. Go to Supabase Dashboard > Authentication > Users
2. Click "Add User"
3. Enter email and password
4. After user is created, go to SQL Editor
5. Run:

   UPDATE public.profiles 
   SET role = 'admin' 
   WHERE email = 'admin@luxemotors.com';

6. User can now sign in with admin privileges
*/

-- ============================================
-- Verify Admin Setup
-- ============================================

-- Check if profiles table exists and has data
SELECT * FROM public.profiles;

-- Check specific user role
SELECT email, role FROM public.profiles WHERE email = 'admin@luxemotors.com';

-- List all admins
SELECT email, full_name, role, created_at 
FROM public.profiles 
WHERE role = 'admin';
