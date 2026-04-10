-- ─────────────────────────────────────────────────────────────
-- LUXE Auto Gallery — Supabase Schema (Simplified)
-- Run this in your Supabase SQL Editor
-- ─────────────────────────────────────────────────────────────

-- Cars
create table if not exists cars (
  id              bigint primary key generated always as identity,
  name            text not null,
  brand           text not null,
  year            int  not null,
  price           numeric not null,
  mileage         int  not null,
  fuel            text not null,
  category        text not null,
  badge           text,
  available       boolean default true,
  description     text,
  specs           jsonb,
  images          text[],
  horsepower      int,
  torque          int,
  engine          text,
  transmission    text,
  drivetrain      text,
  top_speed       int,
  zero_to_sixty   numeric,
  fuel_type       text,
  mpg             text,
  range           text,
  seating         int,
  infotainment    text,
  safety_features text[],
  colors          jsonb,
  created_at      timestamptz default now()
);

-- Enquiries
create table if not exists enquiries (
  id          bigint primary key generated always as identity,
  name        text not null,
  email       text not null,
  phone       text,
  subject     text,
  message     text,
  car_id      bigint references cars(id) on delete set null,
  car_name    text,
  status      text default 'new',
  created_at  timestamptz default now()
);

-- Test drive bookings
create table if not exists test_drives (
  id             bigint primary key generated always as identity,
  name           text not null,
  email          text not null,
  phone          text not null,
  car_id         bigint references cars(id) on delete set null,
  car_name       text,
  preferred_date date,
  preferred_time text,
  showroom       text,
  notes          text,
  status         text default 'pending',
  created_at     timestamptz default now()
);

-- Rental bookings
create table if not exists rental_bookings (
  id               bigint primary key generated always as identity,
  name             text not null,
  email            text not null,
  phone            text not null,
  rental_id        bigint,
  car_name         text,
  pickup_date      date,
  return_date      date,
  delivery_address text,
  special_requests text,
  daily_rate       numeric,
  status           text default 'pending',
  created_at       timestamptz default now()
);

-- Sell / valuation requests
create table if not exists sell_requests (
  id          bigint primary key generated always as identity,
  name        text not null,
  email       text not null,
  phone       text not null,
  make        text not null,
  model       text not null,
  year        int,
  mileage     int,
  condition   text,
  notes       text,
  status      text default 'new',
  offer_price numeric,
  created_at  timestamptz default now()
);

-- ── Row Level Security ────────────────────────────────────────
alter table cars            enable row level security;
alter table enquiries       enable row level security;
alter table test_drives     enable row level security;
alter table rental_bookings enable row level security;
alter table sell_requests   enable row level security;

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

-- Create simplified policies (public access for demo)
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

-- Admin policies (requires authentication)
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
