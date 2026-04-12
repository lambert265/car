-- ============================================
-- Fix Existing Users Without Profiles
-- ============================================

-- Step 1: Check which users don't have profiles
SELECT 
  u.id,
  u.email,
  u.created_at,
  CASE WHEN p.id IS NULL THEN 'Missing Profile' ELSE 'Has Profile' END as status
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
ORDER BY u.created_at DESC;

-- Step 2: Create profiles for all existing users who don't have one
INSERT INTO public.profiles (id, email, full_name, role)
SELECT 
  u.id,
  u.email,
  COALESCE(u.raw_user_meta_data->>'full_name', ''),
  'user'
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE p.id IS NULL;

-- Step 3: Make your account admin (replace with your email)
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'YOUR_EMAIL@example.com';

-- Step 4: Verify all users now have profiles
SELECT 
  p.email,
  p.full_name,
  p.role,
  p.created_at
FROM public.profiles p
ORDER BY p.created_at DESC;

-- Step 5: Check if you're admin
SELECT email, role FROM public.profiles WHERE role = 'admin';
