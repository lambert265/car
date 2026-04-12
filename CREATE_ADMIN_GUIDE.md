# 🔐 Create Admin User - Simple Guide

## ⚡ FASTEST METHOD (2 Minutes)

### Step 1: Create User in Supabase Dashboard

1. **Open Supabase Dashboard**
   - Go to: https://app.supabase.com
   - Select your project

2. **Navigate to Users**
   - Click "Authentication" in left sidebar
   - Click "Users" tab

3. **Add New User**
   - Click "Add User" button (green button, top right)
   - Fill in the form:
     ```
     Email: admin@luxemotors.com
     Password: Admin123!@#
     ☑️ Auto Confirm User (CHECK THIS BOX!)
     ```
   - Click "Create User"

4. **Copy the User ID**
   - After creation, you'll see the new user in the list
   - Copy the ID (looks like: `12345678-1234-1234-1234-123456789abc`)

### Step 2: Make Them Admin

1. **Go to SQL Editor**
   - Click "SQL Editor" in left sidebar
   - Click "New Query"

2. **Run This SQL** (replace the ID):
   ```sql
   -- Create profile and make admin
   INSERT INTO public.profiles (id, email, full_name, role)
   VALUES (
     'PASTE_USER_ID_HERE',  -- Replace with copied ID
     'admin@luxemotors.com',
     'Admin User',
     'admin'
   )
   ON CONFLICT (id) DO UPDATE SET role = 'admin';
   ```

3. **Click Run** (or press Ctrl+Enter)

### Step 3: Test Login

1. Go to: `http://localhost:3000/sign-in`
2. Sign in with:
   - Email: `admin@luxemotors.com`
   - Password: `Admin123!@#`
3. You should be redirected to `/admin/dashboard` ✅

---

## 🎯 ALTERNATIVE: Use Your Existing Account

If you already have an account, just promote it:

### Step 1: Find Your Email
Check what email you used to sign up

### Step 2: Run This SQL
```sql
-- Make your existing account admin
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'your-email@example.com';

-- If you don't have a profile yet, create it:
INSERT INTO public.profiles (id, email, full_name, role)
SELECT 
  id,
  email,
  COALESCE(raw_user_meta_data->>'full_name', ''),
  'admin'
FROM auth.users
WHERE email = 'your-email@example.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

### Step 3: Sign Out and Sign In Again
- Sign out completely
- Sign in with your email
- You'll be redirected to `/admin/dashboard` ✅

---

## 🔍 Verify It Worked

Run this in SQL Editor:
```sql
-- Check if you're admin
SELECT 
  u.email,
  p.role,
  CASE WHEN p.role = 'admin' THEN '✅ You are admin!' ELSE '❌ Not admin yet' END as status
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE u.email = 'admin@luxemotors.com';  -- Replace with your email
```

---

## ❌ Troubleshooting

### Problem: "Profile doesn't exist"
**Solution:** Create it manually
```sql
INSERT INTO public.profiles (id, email, full_name, role)
SELECT id, email, 'Admin User', 'admin'
FROM auth.users
WHERE email = 'admin@luxemotors.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

### Problem: "Still not redirecting to admin dashboard"
**Solutions:**
1. Sign out completely
2. Clear browser cache
3. Sign in again
4. Check browser console for errors

### Problem: "Can't find my user"
**Solution:** See all users
```sql
SELECT email, created_at FROM auth.users ORDER BY created_at DESC;
```

### Problem: "Email not confirmed"
**Solution:** Confirm it manually
```sql
UPDATE auth.users 
SET email_confirmed_at = NOW() 
WHERE email = 'admin@luxemotors.com';
```

---

## 📋 Quick Reference

### Default Admin Credentials (if you created via dashboard)
```
Email: admin@luxemotors.com
Password: Admin123!@#
```

### Important URLs
- Supabase Dashboard: https://app.supabase.com
- Your App Sign In: http://localhost:3000/sign-in
- Admin Dashboard: http://localhost:3000/admin/dashboard

### SQL Files
- `create-admin-with-password.sql` - Complete guide with all methods
- `create-admin-simple.sql` - Quick SQL snippets
- `fix-existing-users.sql` - Fix users without profiles

---

## 🎉 Success Checklist

- ✅ User created in Supabase Dashboard
- ✅ Email confirmed (auto confirm checked)
- ✅ Profile created in `profiles` table
- ✅ Role set to 'admin'
- ✅ Can sign in successfully
- ✅ Redirects to `/admin/dashboard`

---

## 🔒 Security Tips

1. **Use Strong Passwords**
   - Minimum 8 characters
   - Include uppercase, lowercase, numbers, special chars
   - Example: `Admin123!@#`

2. **Change Default Password**
   - After first login, change the password
   - Go to Account Settings

3. **Don't Share Credentials**
   - Keep admin credentials private
   - Use different passwords for different admins

4. **Enable 2FA** (Future)
   - Consider adding two-factor authentication
   - Extra security for admin accounts

---

**Need Help?** Check `create-admin-with-password.sql` for more detailed instructions!
