# Frozen Basket Admin Credentials

## Default Admin Account

**How to Set Up Admin Access:**

1. **Create the Admin User:**
   - Go to your app: `/auth/sign-up`
   - Sign up with these credentials:
     - **Email:** `admin@frozenbasket.com`
     - **Password:** `Admin@2024`

2. **Grant Admin Role:**
   - After signing up, the user will be created in Supabase Auth
   - Run the SQL script `scripts/003_create_admin_user.sql` in your Supabase SQL Editor
   - This will update the user's role to 'admin'

3. **Log In:**
   - Go to `/auth/login`
   - Use the admin credentials above
   - You'll be redirected to `/admin` dashboard

## Alternative Method (Supabase Dashboard)

1. Go to your Supabase Dashboard → Authentication → Users
2. Click "Add User" or "Invite User"
3. Enter:
   - Email: `admin@frozenbasket.com`
   - Password: `Admin@2024`
   - Auto Confirm: Yes
4. After user is created, run the SQL script to grant admin role

## Security Note

**IMPORTANT:** Change these default credentials immediately after first login for production use!

## Admin Dashboard Features

Once logged in as admin, you can:
- View all orders and customer information
- Update order status (pending, confirmed, processing, completed, cancelled)
- See real-time sales analytics and statistics
- Monitor revenue and order trends
- Manage customer accounts
