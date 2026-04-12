# 🚀 Quick Database Setup

## Step 1: Run the Complete Setup SQL

1. Open your Supabase Dashboard
2. Go to **SQL Editor** (left sidebar)
3. Click **New Query**
4. Open the file: `supabase-setup-complete.sql`
5. Copy **ALL** the content
6. Paste it into the SQL Editor
7. Click **Run** (or press Ctrl+Enter)

✅ This will create:
- All 14 tables (orders, bookings, reviews, etc.)
- Profiles table for user roles
- All security policies (RLS)
- All indexes for performance
- Automatic profile creation on signup
- Helper functions for admin checks

## Step 2: Create Your Admin Account

### Option A: Sign Up First (Recommended)
1. Go to `http://localhost:3000/sign-up`
2. Sign up with your email (e.g., `admin@luxemotors.com`)
3. Complete email verification
4. Go back to Supabase SQL Editor
5. Run this SQL (replace with your email):
```sql
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'admin@luxemotors.com';
```
6. Sign out and sign in again
7. You'll be redirected to `/admin/dashboard` ✅

### Option B: Promote Existing User
If you already have an account:
```sql
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'your-existing-email@example.com';
```

## Step 3: Verify Everything Works

Run this in SQL Editor to check:
```sql
-- See all tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check your profile
SELECT * FROM profiles WHERE email = 'your-email@example.com';

-- Verify you're admin
SELECT email, role FROM profiles WHERE role = 'admin';
```

## Troubleshooting

**Error: "relation does not exist"**
- Make sure you ran the ENTIRE `supabase-setup-complete.sql` file
- Check for any error messages in the SQL Editor output

**Can't see profiles table**
- Refresh your Supabase dashboard
- Go to Table Editor and look for `profiles` table

**Not redirecting to admin dashboard**
- Make sure you ran the UPDATE query to set role = 'admin'
- Sign out completely and sign in again
- Check browser console for errors

**Profile not created on signup**
- The trigger should create it automatically
- If not, manually create it:
```sql
INSERT INTO profiles (id, email, full_name, role)
VALUES (
  'your-user-id-from-auth-users',
  'your@email.com',
  'Your Name',
  'admin'
);
```

---

## That's it! 🎉

Your database is now fully set up with:
- ✅ All tables created
- ✅ Security policies enabled
- ✅ Admin system ready
- ✅ Automatic profile creation

Now you can:
- Sign up users
- Create admin accounts
- Use all features (checkout, bookings, reviews, etc.)
- Access admin dashboard at `/admin/dashboard`
