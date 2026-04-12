-- ============================================
-- Create Admin Profile - SIMPLE VERSION
-- ============================================

-- STEP 1: Find your user ID
-- Go to Supabase Dashboard → Authentication → Users
-- Copy your user ID (it looks like: 12345678-1234-1234-1234-123456789abc)

-- STEP 2: Create your profile and make it admin
-- Replace 'YOUR_USER_ID' and 'your-email@example.com' below

INSERT INTO public.profiles (id, email, full_name, role)
VALUES (
  'YOUR_USER_ID',  -- Replace with your actual user ID from auth.users
  'your-email@example.com',  -- Replace with your email
  'Your Name',  -- Replace with your name
  'admin'  -- This makes you admin
)
ON CONFLICT (id) 
DO UPDATE SET role = 'admin';

-- STEP 3: Verify you're admin
SELECT email, role FROM public.profiles WHERE email = 'your-email@example.com';

-- ============================================
-- OR: If you already have a profile, just promote to admin
-- ============================================

UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'your-email@example.com';

-- ============================================
-- OR: Create profiles for ALL existing users at once
-- ============================================

INSERT INTO public.profiles (id, email, full_name, role)
SELECT 
  u.id,
  u.email,
  COALESCE(u.raw_user_meta_data->>'full_name', ''),
  CASE 
    WHEN u.email = 'your-email@example.com' THEN 'admin'  -- Replace with your email
    ELSE 'user'
  END as role
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE p.id IS NULL;

-- ============================================
-- Quick Check: See all users and their profiles
-- ============================================

SELECT 
  u.email,
  u.id,
  p.role,
  CASE WHEN p.id IS NULL THEN '❌ No Profile' ELSE '✅ Has Profile' END as status
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
ORDER BY u.created_at DESC;
