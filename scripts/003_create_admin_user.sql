-- Create default admin user
-- This will create an admin account that can log into the dashboard

-- Insert admin user into auth.users (Supabase auth system)
-- Email: admin@frozenbasket.com
-- Password: Admin@2024

-- Note: In Supabase, you need to create this user through the Supabase Dashboard
-- or via the Supabase Auth API. This script creates the profile entry.

-- First, you need to sign up the admin user via the sign-up page or Supabase Dashboard
-- Then run this script to update their role to admin

-- Update any user with the admin email to have admin role
update public.profiles
set role = 'admin', full_name = 'Frozen Basket Admin'
where email = 'admin@frozenbasket.com';

-- If the profile doesn't exist yet, you can manually insert it
-- after creating the user in Supabase Auth:
-- insert into public.profiles (id, email, full_name, role)
-- values (
--   'USER_UUID_FROM_AUTH', 
--   'admin@frozenbasket.com', 
--   'Frozen Basket Admin', 
--   'admin'
-- );
