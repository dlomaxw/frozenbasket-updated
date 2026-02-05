
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Categories Table
create table if not exists categories (
  id text primary key,
  title text not null,
  description text,
  image text,
  display_order serial
);

-- Menu Items Table
create table if not exists menu_items (
  id text primary key,
  category_id text references categories(id) on delete set null,
  name text not null,
  description text,
  price numeric not null,
  image text,
  is_available boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Menu Variants Table
create table if not exists menu_variants (
  id text primary key,
  parent_item_id text references menu_items(id) on delete cascade,
  name text not null,
  description text,
  price numeric not null,
  image text,
  is_available boolean default true
);

-- Analytics/Visits Table
create table if not exists analytics_visits (
  id uuid default uuid_generate_v4() primary key,
  path text not null,
  user_agent text,
  ip_address text,
  visited_at timestamp with time zone default timezone('utc'::text, now())
);

-- Admin Users Table (Optional, easier to stick with Supabase Auth Users)
-- We'll creating a secure table to whitelist admin emails if needed, 
-- or just use row-level security (RLS) policies based on user metadata.
-- For now, let's keep it simple and assume any authenticated user in this project is an admin 
-- (since it's a personal project), or we can add a 'profiles' table.

create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique,
  role text default 'user', -- 'admin', 'user'
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS Policies (Basic examples, refine as needed)
alter table categories enable row level security;
alter table menu_items enable row level security;
alter table menu_variants enable row level security;

-- Allow public read access
create policy "Public categories are viewable by everyone" on categories for select using (true);
create policy "Public menu items are viewable by everyone" on menu_items for select using (true);
create policy "Public menu variants are viewable by everyone" on menu_variants for select using (true);

-- Allow authenticated admins to insert/update/delete
-- (For simplicity during dev, you might want to allow anon for now if not logged in, but better to lock it down)
create policy "Admins can manage categories" on categories using (auth.role() = 'authenticated');
create policy "Admins can manage menu items" on menu_items using (auth.role() = 'authenticated'); 
create policy "Admins can manage menu variants" on menu_variants using (auth.role() = 'authenticated');

