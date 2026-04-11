-- ─────────────────────────────────────────────────────────────
-- STEP 1: Add user_id columns
-- ─────────────────────────────────────────────────────────────

alter table enquiries add column if not exists user_id uuid references auth.users(id) on delete set null;
alter table test_drives add column if not exists user_id uuid references auth.users(id) on delete set null;
alter table rental_bookings add column if not exists user_id uuid references auth.users(id) on delete set null;
alter table sell_requests add column if not exists user_id uuid references auth.users(id) on delete set null;
