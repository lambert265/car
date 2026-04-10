-- ─────────────────────────────────────────────────────────────
-- LUXE Auto Gallery — Add user_id columns (Migration)
-- Run this FIRST if tables already exist
-- ─────────────────────────────────────────────────────────────

-- Add user_id columns if they don't exist
alter table enquiries add column if not exists user_id uuid references auth.users(id) on delete set null;
alter table test_drives add column if not exists user_id uuid references auth.users(id) on delete set null;
alter table rental_bookings add column if not exists user_id uuid references auth.users(id) on delete set null;
alter table sell_requests add column if not exists user_id uuid references auth.users(id) on delete set null;

-- Drop existing policies
drop policy if exists "Public read cars" on cars;
drop policy if exists "Public insert enquiries" on enquiries;
drop policy if exists "Public insert test_drives" on test_drives;
drop policy if exists "Public insert rental_bookings" on rental_bookings;
drop policy if exists "Public insert sell_requests" on sell_requests;
drop policy if exists "Users read own enquiries" on enquiries;
drop policy if exists "Users read own test_drives" on test_drives;
drop policy if exists "Users read own rentals" on rental_bookings;
drop policy if exists "Users read own sell_requests" on sell_requests;
drop policy if exists "Admin all cars" on cars;
drop policy if exists "Admin all enquiries" on enquiries;
drop policy if exists "Admin all test_drives" on test_drives;
drop policy if exists "Admin all rental_bookings" on rental_bookings;
drop policy if exists "Admin all sell_requests" on sell_requests;

-- Recreate policies
create policy "Public read cars" on cars
  for select using (true);

create policy "Public insert enquiries" on enquiries
  for insert with check (true);

create policy "Public insert test_drives" on test_drives
  for insert with check (true);

create policy "Public insert rental_bookings" on rental_bookings
  for insert with check (true);

create policy "Public insert sell_requests" on sell_requests
  for insert with check (true);

create policy "Users read own enquiries" on enquiries
  for select using (auth.uid() = user_id or email = auth.jwt()->>'email');

create policy "Users read own test_drives" on test_drives
  for select using (auth.uid() = user_id or email = auth.jwt()->>'email');

create policy "Users read own rentals" on rental_bookings
  for select using (auth.uid() = user_id or email = auth.jwt()->>'email');

create policy "Users read own sell_requests" on sell_requests
  for select using (auth.uid() = user_id or email = auth.jwt()->>'email');

create policy "Admin all cars" on cars
  for all using (auth.role() = 'authenticated');

create policy "Admin all enquiries" on enquiries
  for all using (auth.role() = 'authenticated');

create policy "Admin all test_drives" on test_drives
  for all using (auth.role() = 'authenticated');

create policy "Admin all rental_bookings" on rental_bookings
  for all using (auth.role() = 'authenticated');

create policy "Admin all sell_requests" on sell_requests
  for all using (auth.role() = 'authenticated');
