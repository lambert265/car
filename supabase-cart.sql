-- Run in Supabase SQL Editor
create table if not exists cart_items (
  id         bigint primary key generated always as identity,
  user_id    uuid references auth.users(id) on delete cascade not null,
  car_id     int not null,
  car_data   jsonb not null,
  created_at timestamptz default now(),
  unique(user_id, car_id)
);

alter table cart_items enable row level security;

create policy "Users manage own cart" on cart_items
  for all using (auth.uid() = user_id);
