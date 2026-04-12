# 📊 Where User Data is Stored

## User Authentication & Profile Data

### 1. **auth.users** (Supabase Auth - Built-in)
**Location:** Supabase Dashboard → Authentication → Users

**What's stored:**
- User ID (UUID)
- Email
- Password (hashed)
- Email verified status
- Created date
- Last sign in
- Metadata (name, etc.)

**How to view:**
- Go to Supabase Dashboard
- Click "Authentication" in left sidebar
- Click "Users"
- You'll see all registered users

### 2. **public.profiles** (Custom table we created)
**Location:** Supabase Dashboard → Table Editor → profiles

**What's stored:**
- User ID (links to auth.users)
- Email
- Full name
- Role (user/admin)
- Created/Updated dates

**How to view:**
```sql
SELECT * FROM profiles;
```

---

## User Activity Data

### 3. **orders** - Purchase Orders
**What's stored:**
- Order details
- Car purchased
- Payment info
- Delivery options
- Insurance/warranty selections
- Trade-in details

**View user's orders:**
```sql
SELECT * FROM orders WHERE user_id = 'USER_UUID';
```

### 4. **test_drive_bookings** - Test Drive Appointments
**What's stored:**
- Booking date/time
- Car ID
- Location
- Customer info
- Status (pending/confirmed/completed)

**View user's bookings:**
```sql
SELECT * FROM test_drive_bookings WHERE user_id = 'USER_UUID';
```

### 5. **wishlist_items** - Saved Vehicles
**What's stored:**
- User ID
- Car ID
- Date saved

**View user's wishlist:**
```sql
SELECT * FROM wishlist_items WHERE user_id = 'USER_UUID';
```

### 6. **reviews** - Car Reviews
**What's stored:**
- Rating (1-5 stars)
- Review title
- Comment
- Verified purchase status

**View user's reviews:**
```sql
SELECT * FROM reviews WHERE user_id = 'USER_UUID';
```

### 7. **notifications** - User Notifications
**What's stored:**
- Notification type
- Title & message
- Read status
- Link

**View user's notifications:**
```sql
SELECT * FROM notifications WHERE user_id = 'USER_UUID';
```

### 8. **price_alerts** - Price Drop Alerts
**What's stored:**
- Car ID
- Target price
- Active status

**View user's alerts:**
```sql
SELECT * FROM price_alerts WHERE user_id = 'USER_UUID';
```

### 9. **enquiries** - Contact Form Submissions
**What's stored:**
- Name, email, phone
- Message
- Car ID (if enquiring about specific car)
- Status (new/contacted/closed)

**View user's enquiries:**
```sql
SELECT * FROM enquiries WHERE user_id = 'USER_UUID';
```

---

## Other Tables (Not User-Specific)

### 10. **newsletter_subscribers** - Newsletter Signups
**What's stored:**
- Email
- Subscribed status

### 11. **blog_posts** - Blog Articles
**What's stored:**
- Title, content, excerpt
- Author ID
- Published status
- Featured image

### 12. **showroom_bookings** - Showroom Visits
**What's stored:**
- Date/time
- Location
- Customer info

### 13. **referrals** - Referral Program
**What's stored:**
- Referrer ID
- Referred email
- Status
- Reward amount

---

## How to View All Your Data in Supabase

### Method 1: Table Editor (Visual)
1. Go to Supabase Dashboard
2. Click "Table Editor" in left sidebar
3. Select any table from the list
4. You'll see all data in a spreadsheet view
5. Click any row to view/edit details

### Method 2: SQL Editor (Query)
1. Go to Supabase Dashboard
2. Click "SQL Editor" in left sidebar
3. Run queries like:
```sql
-- See all tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Count records in each table
SELECT 
  'profiles' as table_name, COUNT(*) as count FROM profiles
UNION ALL
SELECT 'orders', COUNT(*) FROM orders
UNION ALL
SELECT 'test_drive_bookings', COUNT(*) FROM test_drive_bookings
UNION ALL
SELECT 'reviews', COUNT(*) FROM reviews
UNION ALL
SELECT 'wishlist_items', COUNT(*) FROM wishlist_items
UNION ALL
SELECT 'notifications', COUNT(*) FROM notifications
UNION ALL
SELECT 'newsletter_subscribers', COUNT(*) FROM newsletter_subscribers;
```

### Method 3: API Explorer
1. Go to Supabase Dashboard
2. Click "API" in left sidebar
3. Select a table
4. You'll see example API calls

---

## Quick Check: Is Everything Set Up?

Run this in SQL Editor:
```sql
-- Check all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Should show:
-- blog_posts
-- enquiries
-- newsletter_subscribers
-- notifications
-- orders
-- price_alerts
-- profiles
-- referrals
-- reviews
-- showroom_bookings
-- test_drive_bookings
-- wishlist_items
```

---

## Where to Find User Data in the App

### Frontend (User View)
- `/account` - User dashboard
- `/account/orders` - Order history
- `/saved` - Wishlist
- Notification bell icon - Notifications

### Admin View
- `/admin/dashboard` - Overview
- `/admin/inventory` - Manage cars
- `/admin/bookings` - All bookings
- `/admin/enquiries` - All enquiries

---

## Common Issues

**"I don't see any tables"**
- Make sure you ran `supabase-setup-complete.sql`
- Refresh your Supabase dashboard
- Check you're looking at the right project

**"I don't have a profile"**
- Run `fix-existing-users.sql` to create profiles for existing users

**"Tables are empty"**
- That's normal! They'll fill up as users:
  - Sign up (creates profile)
  - Place orders (creates order records)
  - Book test drives (creates booking records)
  - Leave reviews (creates review records)
  - Subscribe to newsletter (creates subscriber records)
