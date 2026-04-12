-- ============================================
-- Create Admin User with Password
-- ============================================

-- IMPORTANT: You CANNOT create users with passwords directly in SQL
-- Supabase Auth handles password hashing and security
-- You must use one of these methods:

-- ============================================
-- METHOD 1: Create User via Supabase Dashboard (EASIEST)
-- ============================================

/*
1. Go to Supabase Dashboard
2. Click "Authentication" in left sidebar
3. Click "Users" tab
4. Click "Add User" button (top right)
5. Enter:
   - Email: admin@luxemotors.com
   - Password: YourSecurePassword123!
   - Auto Confirm User: YES (check this box)
6. Click "Create User"
7. Copy the User ID that appears
8. Run this SQL below to make them admin:
*/

UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'admin@luxemotors.com';

-- If profile doesn't exist, create it:
INSERT INTO public.profiles (id, email, full_name, role)
VALUES (
  'PASTE_USER_ID_HERE',  -- Replace with the user ID from step 7
  'admin@luxemotors.com',
  'Admin User',
  'admin'
)
ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- ============================================
-- METHOD 2: Sign Up via Your App (RECOMMENDED)
-- ============================================

/*
1. Go to: http://localhost:3000/sign-up
2. Sign up with:
   - Name: Admin User
   - Email: admin@luxemotors.com
   - Password: YourSecurePassword123!
3. Complete email verification
4. Run this SQL to promote to admin:
*/

UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'admin@luxemotors.com';

-- ============================================
-- METHOD 3: Use Supabase API (Advanced)
-- ============================================

/*
You can use the Supabase Admin API to create users programmatically.
This requires your Service Role Key (keep it secret!).

Run this in your terminal or create an API endpoint:
*/

-- Example using curl (replace YOUR_PROJECT_URL and YOUR_SERVICE_ROLE_KEY):
/*
curl -X POST 'https://YOUR_PROJECT_URL.supabase.co/auth/v1/admin/users' \
-H "apikey: YOUR_SERVICE_ROLE_KEY" \
-H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
-H "Content-Type: application/json" \
-d '{
  "email": "admin@luxemotors.com",
  "password": "YourSecurePassword123!",
  "email_confirm": true,
  "user_metadata": {
    "full_name": "Admin User"
  }
}'
*/

-- Then run this SQL to make them admin:
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'admin@luxemotors.com';

-- ============================================
-- VERIFY ADMIN SETUP
-- ============================================

-- Check if user exists in auth
SELECT id, email, created_at, email_confirmed_at 
FROM auth.users 
WHERE email = 'admin@luxemotors.com';

-- Check if profile exists and is admin
SELECT id, email, full_name, role, created_at 
FROM public.profiles 
WHERE email = 'admin@luxemotors.com';

-- If profile doesn't exist, create it manually:
-- (Get the user ID from the first query above)
INSERT INTO public.profiles (id, email, full_name, role)
SELECT 
  id,
  email,
  COALESCE(raw_user_meta_data->>'full_name', 'Admin User'),
  'admin'
FROM auth.users
WHERE email = 'admin@luxemotors.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- ============================================
-- QUICK FIX: Make ANY existing user admin
-- ============================================

-- See all users:
SELECT id, email, created_at FROM auth.users ORDER BY created_at DESC;

-- Make a specific user admin (replace email):
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'your-existing-email@example.com';

-- Or create profile if it doesn't exist:
INSERT INTO public.profiles (id, email, full_name, role)
SELECT 
  id,
  email,
  COALESCE(raw_user_meta_data->>'full_name', ''),
  'admin'
FROM auth.users
WHERE email = 'your-existing-email@example.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- ============================================
-- RECOMMENDED APPROACH (Step by Step)
-- ============================================

/*
STEP 1: Create user in Supabase Dashboard
- Go to: https://app.supabase.com/project/YOUR_PROJECT/auth/users
- Click "Add User"
- Email: admin@luxemotors.com
- Password: YourSecurePassword123!
- Check "Auto Confirm User"
- Click "Create User"

STEP 2: Run this SQL to make them admin
*/

-- First, check if user was created:
SELECT id, email FROM auth.users WHERE email = 'admin@luxemotors.com';

-- Then create profile and make admin:
INSERT INTO public.profiles (id, email, full_name, role)
SELECT 
  id,
  email,
  'Admin User',
  'admin'
FROM auth.users
WHERE email = 'admin@luxemotors.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- Verify:
SELECT 
  u.email,
  p.role,
  u.email_confirmed_at,
  CASE WHEN p.role = 'admin' THEN '✅ Admin' ELSE '❌ Not Admin' END as status
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE u.email = 'admin@luxemotors.com';

-- ============================================
-- TROUBLESHOOTING
-- ============================================

-- Problem: User exists but no profile
-- Solution:
INSERT INTO public.profiles (id, email, full_name, role)
SELECT id, email, COALESCE(raw_user_meta_data->>'full_name', ''), 'admin'
FROM auth.users
WHERE email = 'admin@luxemotors.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- Problem: Profile exists but not admin
-- Solution:
UPDATE public.profiles SET role = 'admin' WHERE email = 'admin@luxemotors.com';

-- Problem: Can't find user
-- Solution: Check all users
SELECT email, created_at FROM auth.users ORDER BY created_at DESC LIMIT 10;

-- ============================================
-- SECURITY NOTES
-- ============================================

/*
1. NEVER store passwords in plain text
2. NEVER share your Service Role Key
3. Use strong passwords (8+ chars, uppercase, lowercase, number, special char)
4. Always use HTTPS in production
5. Enable email verification in production
6. Consider 2FA for admin accounts
*/
