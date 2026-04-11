-- ─────────────────────────────────────────────────────────────
-- STEP 2: Update policies (run AFTER step 1)
-- ─────────────────────────────────────────────────────────────

-- Drop existing policies
drop policy if exists "Users read own enquiries" on enquiries;
drop policy if exists "Users read own test_drives" on test_drives;
drop policy if exists "Users read own rentals" on rental_bookings;
drop policy if exists "Users read own sell_requests" on sell_requests;

-- Create new policies with user_id
create policy "Users read own enquiries" on enquiries
  for select using (auth.uid() = user_id or email = auth.jwt()->>'email');

create policy "Users read own test_drives" on test_drives
  for select using (auth.uid() = user_id or email = auth.jwt()->>'email');

create policy "Users read own rentals" on rental_bookings
  for select using (auth.uid() = user_id or email = auth.jwt()->>'email');

create policy "Users read own sell_requests" on sell_requests
  for select using (auth.uid() = user_id or email = auth.jwt()->>'email');
