-- Create profiles table for user information
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text default 'customer' check (role in ('customer', 'admin')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- Profiles policies
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id or exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  ));

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- Create orders table
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  total_amount decimal(10, 2) not null,
  status text default 'pending' check (status in ('pending', 'confirmed', 'processing', 'completed', 'cancelled')),
  payment_method text,
  delivery_address text,
  notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS on orders
alter table public.orders enable row level security;

-- Orders policies
create policy "orders_select_own"
  on public.orders for select
  using (
    auth.uid() = user_id or
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "orders_insert_authenticated"
  on public.orders for insert
  with check (auth.uid() = user_id or auth.uid() is not null);

create policy "orders_update_admin"
  on public.orders for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Create order_items table
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text not null,
  product_name text not null,
  product_image text,
  quantity integer not null default 1,
  price decimal(10, 2) not null,
  customizations jsonb,
  created_at timestamp with time zone default now()
);

-- Enable RLS on order_items
alter table public.order_items enable row level security;

-- Order items policies (inherit from orders)
create policy "order_items_select"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and (
        orders.user_id = auth.uid() or
        exists (
          select 1 from public.profiles
          where profiles.id = auth.uid() and profiles.role = 'admin'
        )
      )
    )
  );

create policy "order_items_insert"
  on public.order_items for insert
  with check (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

-- Create indexes for better performance
create index if not exists idx_orders_user_id on public.orders(user_id);
create index if not exists idx_orders_status on public.orders(status);
create index if not exists idx_orders_created_at on public.orders(created_at desc);
create index if not exists idx_order_items_order_id on public.order_items(order_id);
create index if not exists idx_profiles_role on public.profiles(role);
