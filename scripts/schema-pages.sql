
-- Pages Table for dynamic content
create table if not exists pages (
  id text primary key, -- e.g. 'home', 'about', 'contact'
  title text not null,
  content jsonb, -- Flexible JSON structure for different page sections
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS
alter table pages enable row level security;
create policy "Public pages are viewable by everyone" on pages for select using (true);
create policy "Admins can update pages" on pages for update using (auth.role() = 'authenticated');
create policy "Admins can insert pages" on pages for insert using (auth.role() = 'authenticated');

-- Initial Seed Data for Pages
insert into pages (id, title, content) values
(
  'home', 
  'Home Page', 
  '{
    "hero_title": "Handcrafted Ice Cream",
    "hero_subtitle": "Experience the joy of fresh, premium ingredients",
    "hero_button_text": "Order Now"
  }'::jsonb
),
(
  'about', 
  'About Us', 
  '{
    "title": "Our Story",
    "description": "We started with a simple dream: to serve the best ice cream in Kampala."
  }'::jsonb
),
(
  'contact', 
  'Contact Us', 
  '{
    "phone": "+256 753 522 992",
    "address": "Opp. Lohana Academy, Kisement, Kampala",
    "email": "info@frozenbasket.com"
  }'::jsonb
)
on conflict (id) do nothing;
