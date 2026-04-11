# Authentication Flow - Complete Guide

## 🔐 Sign In Flow

### For Admin Users:
```
1. Go to: /sign-in
2. Enter: admin@luxemotors.com (or your admin email)
3. Enter: your password
4. Click: Sign In
5. ✅ Redirected to: /admin/dashboard
```

### For Regular Users:
```
1. Go to: /sign-in
2. Enter: your email
3. Enter: your password
4. Click: Sign In
5. ✅ Redirected to: /account
```

---

## 📝 Sign Up Flow

### New User Registration:
```
1. Go to: /sign-up
2. Enter: Full Name
3. Enter: Email
4. Enter: Password (min 8 characters)
5. Confirm: Password
6. Click: Create Account
7. ✅ Check email for verification code
```

### Email Verification:
```
Option A - Click Link:
1. Open verification email
2. Click verification link
3. ✅ Auto-verified → redirected to /sign-in

Option B - Manual Entry:
1. Go to: /verify
2. Enter: your email
3. Enter: 6-digit code from email
4. Click: Verify Email
5. ✅ Verified → redirected to /sign-in
```

---

## 🎯 Admin Dashboard Access

### Routes:
- `/admin` → Auto-redirects to `/admin/dashboard`
- `/admin/dashboard` → Main admin overview
- `/admin/inventory` → Manage vehicles
- `/admin/enquiries` → Customer enquiries
- `/admin/bookings` → Test drive bookings
- `/admin/rentals` → Rental bookings
- `/admin/sell-requests` → Sell/trade-in requests

### Features:
- ✅ Stats overview (vehicles, enquiries, bookings, etc.)
- ✅ Recent enquiries list
- ✅ Quick actions menu
- ✅ Sidebar navigation
- ✅ User profile display
- ✅ Sign out functionality

---

## 🔑 Setting Up Admin Access

### Method 1: Via Supabase Dashboard
```
1. Go to: Supabase Dashboard
2. Navigate to: Authentication → Users
3. Click: Add User
4. Email: admin@luxemotors.com
5. Password: [your secure password]
6. Click: Create User
7. ✅ This user now has admin access
```

### Method 2: Via Sign Up (then promote)
```
1. Sign up normally at /sign-up
2. Verify email
3. Go to Supabase Dashboard
4. Find the user in Authentication → Users
5. Update their email to: admin@luxemotors.com
6. ✅ User now has admin access
```

---

## 🛡️ Security Notes

### Current Setup:
- Admin detection based on email match
- Email stored in environment variable
- Protected routes check authentication
- Auto-redirect if not authenticated

### Recommended Improvements:
```typescript
// Add to Supabase user metadata
{
  role: "admin" | "user",
  permissions: ["manage_inventory", "view_enquiries", etc.]
}

// Then check in middleware:
const { data: { user } } = await supabase.auth.getUser();
if (user?.user_metadata?.role !== 'admin') {
  redirect('/account');
}
```

---

## 📊 Admin Dashboard Features

### Stats Cards:
- Total Vehicles
- New Enquiries
- Test Drive Bookings
- Rental Bookings
- Sell Requests

### Recent Activity:
- Latest enquiries with status
- Customer names and car interests
- Timestamps
- Quick status indicators

### Quick Actions:
- Add New Vehicle
- View Enquiries
- Manage Bookings
- Rental Bookings
- Sell Requests
- View Live Site

---

## 🚀 Testing the Complete Flow

### Test Admin Login:
```bash
# 1. Create admin user in Supabase
Email: admin@luxemotors.com
Password: Admin123!

# 2. Test login
Go to: http://localhost:3000/sign-in
Enter credentials
Expected: Redirect to /admin/dashboard
```

### Test Regular User:
```bash
# 1. Sign up
Go to: http://localhost:3000/sign-up
Email: user@example.com
Password: User123!

# 2. Verify email
Go to: /verify
Enter code from email

# 3. Sign in
Go to: /sign-in
Enter credentials
Expected: Redirect to /account
```

---

## 🔧 Environment Variables

### Required in .env.local:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Admin
NEXT_PUBLIC_ADMIN_EMAIL=admin@luxemotors.com

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📱 Mobile Responsive

The admin dashboard is fully responsive:
- Mobile: Hamburger menu for sidebar
- Tablet: Collapsible sidebar
- Desktop: Fixed sidebar navigation

---

## 🎨 Branding

Current branding in admin:
- Logo: "VANTA Admin Panel"
- Colors: Gold (#C9A84C) accents
- Dark theme: #080808 background
- Consistent with main site design

---

## ❓ Common Issues

### Issue: Can't access admin dashboard
**Solution:** 
- Check email matches NEXT_PUBLIC_ADMIN_EMAIL
- Verify user is authenticated
- Check browser console for errors

### Issue: Redirected to sign-in
**Solution:**
- Session may have expired
- Sign in again
- Check Supabase auth settings

### Issue: Stats not loading
**Solution:**
- Check Supabase tables exist
- Verify RLS policies allow read access
- Check browser network tab for errors

---

## 📞 Support

If you need to change the admin email:
1. Update `.env.local`
2. Change `NEXT_PUBLIC_ADMIN_EMAIL`
3. Restart dev server
4. Create user with new email in Supabase
