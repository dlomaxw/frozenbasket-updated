# Admin Setup Instructions

To set up the admin account for Frozen Basket:

## Step 1: Sign Up with Admin Credentials

1. Go to `/auth/sign-up` on your website
2. Create an account with:
   - **Email**: `admin@frozenbasket.com`
   - **Password**: `Admin@2024` (or your preferred secure password)
   - **Full Name**: `Admin User`

3. Complete the email verification if required

## Step 2: Grant Admin Role

After creating the account, you need to update the role in the database. Run the following SQL in your Supabase SQL Editor:

\`\`\`sql
-- Find your user ID
SELECT id, email FROM auth.users WHERE email = 'admin@frozenbasket.com';

-- Update the profile to admin role (replace YOUR_USER_ID with the ID from above)
UPDATE profiles 
SET role = 'admin' 
WHERE id = 'YOUR_USER_ID';
\`\`\`

## Step 3: Login

Now you can login at `/auth/login` with your admin credentials and access the admin dashboard at `/admin`.

## Alternative: Using v0 Supabase Tools

If the SQL scripts in the `scripts` folder haven't been run yet, you can ask v0 to:
1. Run the migration scripts to create tables
2. Execute SQL to create and set up the admin user

## Security Notes

- Change the default password immediately after first login
- Keep admin credentials secure
- Consider using 2FA for admin accounts in production
- Regularly review admin access logs
