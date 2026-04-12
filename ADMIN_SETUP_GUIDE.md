# 🔐 Admin Account Setup Guide

## Quick Setup (3 Steps)

### Step 1: Run the SQL Script
1. Open Supabase Dashboard
2. Go to **SQL Editor**
3. Copy and paste the entire content of `supabase-admin-setup.sql`
4. Click **Run**

This will create:
- `profiles` table to store user roles
- Automatic profile creation on signup
- Admin policies for all tables
- Helper functions to check admin status

### Step 2: Create Admin User

**Option A: Sign Up Through App (Recommended)**
1. Go to `http://localhost:3000/sign-up`
2. Sign up with email: `admin@luxemotors.com`
3. Complete the verification process
4. Go to Supabase Dashboard > SQL Editor
5. Run this SQL:
```sql
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'admin@luxemotors.com';
```

**Option B: Promote Existing User**
1. If you already have an account, run:
```sql
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'YOUR_EMAIL@example.com';
```

**Option C: Create in Supabase Dashboard**
1. Go to Supabase Dashboard > Authentication > Users
2. Click "Add User"
3. Enter email and password
4. After creation, run the UPDATE SQL above

### Step 3: Test Admin Access
1. Sign out if you're signed in
2. Go to `http://localhost:3000/sign-in`
3. Sign in with your admin email
4. You should be redirected to `/admin/dashboard`

---

## Verify Setup

Run this SQL to check your admin account:
```sql
-- Check if profiles table exists
SELECT * FROM public.profiles;

-- Check specific user role
SELECT email, role FROM public.profiles 
WHERE email = 'admin@luxemotors.com';

-- List all admins
SELECT email, full_name, role, created_at 
FROM public.profiles 
WHERE role = 'admin';
```

---

## How It Works

1. **Profiles Table**: Stores user roles (user/admin)
2. **Auto-Creation**: When someone signs up, a profile is automatically created with role='user'
3. **Admin Check**: Sign-in page checks the profiles table for admin role
4. **Redirect**: Admins go to `/admin/dashboard`, users go to `/account`

---

## Admin Features

Once you're an admin, you have access to:
- `/admin/dashboard` - Admin dashboard
- `/admin/inventory` - Manage inventory
- `/admin/bookings` - View all bookings
- `/admin/enquiries` - View all enquiries
- `/admin/rentals` - Manage rentals
- `/admin/sell-requests` - View sell requests

---

## Security Notes

- Admin role is stored in the `profiles` table
- Row Level Security (RLS) is enabled
- Only admins can view/manage all data
- Regular users can only see their own data
- Admin email can be set via environment variable: `NEXT_PUBLIC_ADMIN_EMAIL`

---

## Troubleshooting

**Issue: Not redirecting to admin dashboard**
- Check if profile exists: `SELECT * FROM profiles WHERE email = 'your@email.com'`
- Check role: `SELECT role FROM profiles WHERE email = 'your@email.com'`
- Make sure you signed out and signed in again after promoting to admin

**Issue: Profiles table doesn't exist**
- Run the `supabase-admin-setup.sql` script again
- Check for errors in SQL Editor

**Issue: Can't access admin pages**
- Make sure you're signed in as admin
- Check browser console for errors
- Verify the profile role is set to 'admin'

---

## Default Admin Credentials

You can set these in your `.env.local`:
```env
NEXT_PUBLIC_ADMIN_EMAIL=admin@luxemotors.com
```

Then create a user with that email and promote them to admin.

---

**Ready to go!** 🚀
