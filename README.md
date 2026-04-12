# 🚗 LUXE Motors - Premium Automotive Platform

A luxury car dealership platform built with Next.js 14, TypeScript, Supabase, and Tailwind CSS.

## 🌟 Features Implemented

### ✅ Core Features
- **Authentication System**
  - Email/password sign up and sign in
  - Email verification with 6-digit code
  - Password strength requirements (8+ chars, uppercase, lowercase, number, special char)
  - Forgot password & reset password flow
  - OAuth callback support (Google, GitHub, etc.)
  - Session management

- **Inventory Management**
  - 20+ luxury vehicles with detailed specifications
  - Advanced search with real-time filtering
  - Multi-currency support (16 currencies)
  - Category filters (SUV, Sedan, Sport, Electric)
  - Brand filters
  - Fuel type filters
  - Price range slider
  - Sort options (Price, Year, Mileage, Featured)
  - Availability filter
  - Active filter chips with quick removal

- **Car Detail Pages**
  - Image gallery with lightbox
  - Full specifications
  - Performance metrics (0-60, top speed, horsepower)
  - Color swatches
  - Safety features
  - Infotainment details
  - Finance calculator preview
  - Similar vehicles recommendations
  - Inquiry form
  - Reviews system
  - Social sharing (Facebook, Twitter, LinkedIn, Copy Link)

- **Shopping Experience**
  - Cart system with Supabase sync
  - Wishlist (localStorage + database ready)
  - Compare feature (up to 3 vehicles)
  - Guest cart support
  - Add to cart from detail pages

- **Checkout Flow** ⭐ NEW
  - Multi-step checkout (5 steps)
  - Vehicle selection
  - Delivery options (Pickup/Home Delivery)
  - Insurance & warranty selection
  - Trade-in valuation
  - Order summary with breakdown
  - 60% down payment calculation
  - Monthly payment preview

- **Test Drive Booking** ⭐ NEW
  - Calendar date picker (14-day view)
  - Time slot selection (9 AM - 5 PM)
  - Multiple showroom locations
  - Customer information form
  - Booking summary
  - Email/phone validation

- **Reviews & Ratings** ⭐ NEW
  - 5-star rating system
  - Review form with title and comment
  - Review list with verified purchase badges
  - Average rating calculation
  - Rating distribution chart
  - User authentication required

- **Notifications** ⭐ NEW
  - Notification center in navbar
  - Unread count badge
  - Price drop alerts
  - New inventory notifications
  - Appointment reminders
  - Order updates
  - Mark as read/unread
  - Delete notifications

- **Finance Calculator**
  - 60% down payment default
  - Adjustable loan terms
  - Interest rate calculator
  - Monthly payment breakdown
  - Total cost visualization

- **Rental System**
  - Daily, weekly, monthly rates
  - Rental calculator
  - Availability calendar
  - Insurance options

- **Admin Dashboard**
  - Inventory management
  - Booking management
  - Enquiry management
  - Rental management
  - Sell request management

### 🎨 UI/UX Features
- **Responsive Design**
  - Mobile-first approach
  - Tablet and desktop optimized
  - Touch-friendly interactions
  - Mobile navigation pill

- **Animations**
  - Framer Motion page transitions
  - Smooth scroll animations
  - Hover effects
  - Loading states

- **Components**
  - Toast notifications (react-hot-toast)
  - Loading skeletons
  - Back to top button
  - Live chat widget
  - Compare bar
  - Cart drawer
  - Search overlay
  - Mobile menu drawer

### 🔒 Security & Performance
- Row Level Security (RLS) on all tables
- Environment variable protection
- Secure authentication flow
- Optimized images with Next.js Image
- Code splitting
- Lazy loading

## 🗄️ Database Schema

### Tables Implemented
1. **users** - Supabase Auth
2. **cart_items** - Shopping cart
3. **verification_codes** - Email verification
4. **orders** ⭐ NEW - Purchase orders
5. **test_drive_bookings** ⭐ NEW - Test drive appointments
6. **showroom_bookings** ⭐ NEW - Showroom visits
7. **reviews** ⭐ NEW - Customer reviews
8. **wishlist_items** ⭐ NEW - Saved vehicles
9. **notifications** ⭐ NEW - User notifications
10. **price_alerts** ⭐ NEW - Price drop alerts
11. **referrals** ⭐ NEW - Referral program
12. **blog_posts** ⭐ NEW - Blog system
13. **newsletter_subscribers** ⭐ NEW - Email marketing
14. **enquiries** ⭐ NEW - Contact form submissions

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **Charts:** Recharts
- **Date Handling:** date-fns
- **File Upload:** React Dropzone
- **Validation:** Zod
- **Data Fetching:** TanStack Query
- **PDF Generation:** jsPDF + html2canvas

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

## 🔑 Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 📊 Database Setup

Run the migration file in Supabase SQL Editor:

```bash
# Run the complete schema
supabase-complete-schema.sql
```

## 🎯 Key Routes

- `/` - Homepage
- `/inventory` - Vehicle listing
- `/inventory/[id]` - Vehicle details
- `/compare` - Compare vehicles
- `/checkout` - Checkout flow ⭐ NEW
- `/book-test-drive` - Test drive booking ⭐ NEW
- `/finance` - Finance calculator
- `/rental` - Rental system
- `/account` - User account
- `/admin` - Admin dashboard
- `/saved` - Wishlist
- `/(auth)/sign-in` - Sign in
- `/(auth)/sign-up` - Sign up
- `/(auth)/forgot-password` - Password reset ⭐ NEW
- `/(auth)/reset-password` - New password ⭐ NEW

## 🎨 Design System

### Colors
- **Primary Gold:** #C9A84C
- **Background:** #080808, #0d0d0d
- **Text:** White with opacity variants

### Typography
- **Primary Font:** DM Sans
- **Accent Font:** Cormorant Garamond

### Spacing
- Consistent 8px grid system
- Responsive padding/margins

## 📱 Mobile Features

- Bottom navigation pill (Home, Inventory, Rental, Finance, Call)
- Chat button positioned above nav
- Responsive grid layouts
- Touch-optimized buttons
- Mobile-friendly forms

## 🔄 State Management

- **Auth:** React Context (AuthProvider)
- **Cart:** React Context + Supabase sync
- **Wishlist:** React Context + localStorage
- **Compare:** React Context + localStorage

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run E2E tests (when implemented)
npm run test:e2e
```

## 📈 Performance

- Lighthouse Score: 90+ (target)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

## 🚧 Roadmap

### Phase 1: ✅ COMPLETED
- [x] Forgot/Reset Password
- [x] Advanced Search & Filters
- [x] Complete Compare Page
- [x] Checkout Flow
- [x] Test Drive Booking
- [x] Reviews System
- [x] Notifications
- [x] Social Sharing
- [x] Back to Top Button

### Phase 2: In Progress
- [ ] Admin Analytics Dashboard
- [ ] Customer Management
- [ ] Bulk Upload
- [ ] Email Templates
- [ ] Blog System
- [ ] PWA Support

### Phase 3: Planned
- [ ] Stripe Payment Integration
- [ ] Finance Pre-qualification
- [ ] Document Upload
- [ ] SEO Optimization
- [ ] Email Marketing Integration
- [ ] CRM Integration

## 🤝 Contributing

This is a portfolio project. Contributions are welcome!

## 📄 License

MIT License

## 👤 Author

Built for portfolio demonstration

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- Vercel for hosting
- Unsplash for vehicle images

---

**Live Demo:** https://car-sandy-pi.vercel.app

**Last Updated:** January 2025
