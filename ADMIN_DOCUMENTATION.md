# Frozen Basket Admin Dashboard - Complete Documentation

## Table of Contents
1. [Overview](#overview)
2. [Authentication System](#authentication-system)
3. [Dashboard Structure](#dashboard-structure)
4. [Product Management](#product-management)
5. [Content Management](#content-management)
6. [Website Settings](#website-settings)
7. [Order Management](#order-management)
8. [Database Structure](#database-structure)
9. [API Endpoints](#api-endpoints)
10. [Image Upload System](#image-upload-system)

---

## Overview

The Frozen Basket admin dashboard is a comprehensive content management system built for managing an ice cream e-commerce website. It provides full control over products, content, orders, and website settings.

**Access URL:** `/admin`  
**Login URL:** `/auth/login`  
**Admin Passcode:** `202512`

### Key Features
- Passcode-only authentication (no email/password required)
- Real-time order management with status updates
- Product catalog management (add, edit, delete, activate/deactivate)
- Dynamic content management (hero text, carousel, about page)
- Website customization (colors, branding, images)
- Image upload functionality via Vercel Blob storage
- Dashboard analytics (revenue, orders, users, average order value)

---

## Authentication System

### Login Process
**Location:** `/auth/login`

The admin dashboard uses a simple passcode-based authentication system:

1. **Passcode Entry:** Enter the 6-digit passcode: `202512`
2. **Cookie-Based Session:** Upon successful authentication, a secure HTTP-only cookie is created
3. **Session Validation:** All admin pages validate the session via `/api/check-admin` endpoint

### Security Features
- Session stored in HTTP-only cookies (not accessible via JavaScript)
- Server-side validation on every admin page
- Automatic redirect to login if session is invalid
- Logout functionality clears the session cookie

### Code Implementation
\`\`\`typescript
// Login Action
export async function loginWithPasscode(passcode: string) {
  if (passcode === '202512') {
    cookies().set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 // 24 hours
    })
    return { success: true }
  }
  return { success: false, error: 'Invalid passcode' }
}
\`\`\`

### Logout
\`\`\`typescript
// Logout Action
export async function logoutAction() {
  cookies().delete('admin_session')
  redirect('/auth/login')
}
\`\`\`

---

## Dashboard Structure

### Main Dashboard (`/admin`)
The main dashboard provides an overview of the entire system with quick access to all management sections.

#### Dashboard Statistics
Displays real-time metrics:
- **Total Revenue:** Sum of all completed orders in UGX
- **Active Orders:** Count of orders with status "pending" or "processing"
- **Total Users:** Number of registered users in the system
- **Average Order Value:** Total revenue divided by number of orders

#### Quick Access Cards
Three main management sections accessible via cards:
1. **Product Management** → `/admin/products`
2. **Content Management** → `/admin/content`
3. **Website Settings** → `/admin/settings`

#### Recent Orders Table
Displays the 10 most recent orders with:
- Order ID (truncated for display)
- Customer name and email
- Order items (product names and quantities)
- Total amount in UGX
- Status dropdown (editable inline)
- Order date
- View details action button

#### Status Options
Orders can be set to:
- `pending` - Order received, awaiting confirmation
- `confirmed` - Order confirmed by admin
- `processing` - Being prepared
- `completed` - Delivered/completed
- `cancelled` - Order cancelled

**Status Update:** Click the status dropdown on any order to instantly change its status. The change is saved to the database immediately.

---

## Product Management

**Location:** `/admin/products`

Complete CRUD (Create, Read, Update, Delete) operations for ice cream products.

### Product Database Schema
\`\`\`sql
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  notes TEXT,
  allergens TEXT[],
  price NUMERIC NOT NULL,
  category TEXT,
  image TEXT,
  color TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
\`\`\`

### Features

#### 1. View All Products
- Grid display of all products with preview cards
- Shows: name, category, image, description, notes, price, allergens
- Visual indicator for inactive products (opacity reduced)
- Color swatch display for each product

#### 2. Add New Product
**Button:** "+ Add New Product"

Opens an edit form with fields:
- **Product Name** (text input) - e.g., "Vanilla Bean"
- **Category** (dropdown) - Options: Classic, Premium, Fruit, Sorbet, Kulfi
- **Description** (textarea) - Full product description for customers
- **Notes** (text input) - Short notes like "Sweet, Creamy"
- **Price** (number input) - Price in UGX
- **Product Image** (image uploader) - Upload product photo
- **Color** (text input) - Hex color code for product theme (e.g., #FFF8E7)
- **Allergens** (text input) - Comma-separated list (e.g., "Milk, Nuts")

**Actions:**
- Save Product - Creates new product in database
- Cancel - Discard changes

#### 3. Edit Existing Product
**Button:** "Edit" on any product card

Opens the same form pre-filled with current product data. All fields are editable.

#### 4. Toggle Product Status
**Button:** "Activate" / "Deactivate"

- **Active Products:** Visible on the website, available for purchase
- **Inactive Products:** Hidden from customers, kept in database for records

Use case: Seasonal flavors or out-of-stock items

#### 5. Delete Product
**Button:** "Delete" (red/destructive style)

- Shows confirmation dialog before deletion
- Permanently removes product from database
- **Warning:** Cannot be undone

### Product Categories
Pre-defined categories for organization:
- **Classic:** Traditional flavors (Vanilla, Chocolate, Strawberry)
- **Premium:** Luxury flavors (Salted Caramel, Tiramisu)
- **Fruit:** Fruit-based flavors (Mango, Strawberry)
- **Sorbet:** Non-dairy options
- **Kulfi:** Indian-style ice creams

### Image Upload
Products support image uploads via Vercel Blob storage:
- **Max Size:** 5MB
- **Supported Formats:** JPG, PNG, WebP
- **Features:** Drag-and-drop, click to upload, image preview, remove image
- **Storage:** Automatically uploaded to Vercel Blob, URL stored in database

---

## Content Management

**Location:** `/admin/content`

Manage all website text content, images, and dynamic elements across multiple pages.

### Tab Structure
The content management interface is organized into 4 tabs:

#### 1. Home Page Tab
Manage homepage hero section content:

**Hero Section:**
- **Badge Text** - Small badge above title (e.g., "New Seasonal Flavor")
- **Main Title** - Large headline (e.g., "Create Your Dream Scoop")
- **Subtitle** - Descriptive paragraph below title
- **Hero Image** - Background or feature image with upload
- **Statistics:**
  - Flavors Stat (e.g., "24+")
  - Delivery Time (e.g., "15min")
  - Rating (e.g., "4.9")

**Save Button:** "Save Hero Content"

#### 2. Carousel Tab
Manage homepage image carousel:

**Features:**
- Add multiple carousel images (unlimited)
- Each image has:
  - Image uploader (drag-and-drop or click)
  - Alt text field for accessibility
  - Remove button (X icon)
- Reorder images (top to bottom = display order)

**Actions:**
- "+ Add Image" - Add new carousel slide
- "Save Carousel" - Save all changes

**Use Cases:**
- Showcase products
- Feature seasonal offerings
- Display brand imagery
- Highlight team/store photos

#### 3. About Page Tab
Edit about page content:

**Fields:**
- **Page Title** - Main heading (e.g., "About Frozen Basket")
- **Subtitle** - Brief introduction paragraph
- **Mission Title** - Section heading (e.g., "Our Mission")
- **Mission Text** - Detailed mission statement (textarea)

**Save Button:** "Save About Content"

#### 4. Mix Builder Tab
Configure mix builder page settings:

**Settings:**
- **Page Title** - Mix builder heading
- **Max Mix-ins** - Number input (1-10) - Maximum mix-ins customers can select
- **Max Toppings** - Number input (1-10) - Maximum toppings customers can select

**Save Button:** "Save Builder Settings"

These limits control customer choices when building custom ice cream mixes.

### Database Storage
All content is stored in the `website_settings` table:
\`\`\`sql
CREATE TABLE website_settings (
  id UUID PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID
);
\`\`\`

**Keys:**
- `home_hero` - Hero section data
- `carousel_images` - Array of carousel images
- `about_page` - About page content
- `mix_builder_settings` - Builder configuration

---

## Website Settings

**Location:** `/admin/settings`

Customize website appearance, branding, and global content.

### Settings Categories

#### 1. Brand Images
Upload and manage key brand assets:

**Logo Upload:**
- Max size: 2MB
- Used in header/navbar
- Displayed across all pages

**Hero Background Image:**
- Max size: 5MB
- Homepage hero section background
- Full-width display

**Features:**
- Drag-and-drop upload
- Image preview
- Remove/replace functionality
- Automatic Vercel Blob storage

#### 2. Brand Colors
Customize 5 primary brand colors with visual color pickers:

**Color Variables:**
1. **Primary** - Main brand color (buttons, links)
2. **Secondary** - Accent color (highlights, badges)
3. **Accent** - Tertiary color (decorative elements)
4. **Dark** - Dark text/backgrounds
5. **Light** - Light backgrounds/cards

**Each Color Has:**
- Visual color picker (click to select)
- Hex code input field (manual entry)
- Live preview

**Default Values:**
- Primary: `#4A90E2` (Blue)
- Secondary: `#FFB3BA` (Pink)
- Accent: `#C9A9E2` (Purple)
- Dark: `#5C4B51` (Brown)
- Light: `#FFF8E7` (Cream)

#### 3. Hero Section Text
Edit homepage hero content:

**Fields:**
- **Hero Title** - Main headline
- **Hero Subtitle** - Subheading text

This duplicates some content management features for convenience.

#### 4. About Section
Edit about page text:

**Fields:**
- **Mission Statement** - Textarea for detailed mission (3+ lines)
- **Core Values** - Single line (e.g., "Quality, Innovation, Community")

### Save All Settings
Single button saves all changes to database simultaneously.

**Save Button:** "Save All Settings"

---

## Order Management

Order management is integrated into the main dashboard (`/admin`).

### Order Display
Recent orders table shows:
- **Order ID:** Unique identifier (first 8 characters shown)
- **Customer Info:** Name and email
- **Items:** Product names and quantities
- **Total:** Order amount in UGX
- **Status:** Current order status (editable dropdown)
- **Date:** Order creation timestamp
- **Actions:** View details button

### Order Status Workflow

**Status Progression:**
1. **Pending** → Order placed, awaiting admin review
2. **Confirmed** → Admin has acknowledged order
3. **Processing** → Order is being prepared
4. **Completed** → Order delivered/finished
5. **Cancelled** → Order cancelled (by admin or customer)

**Status Change:**
Click the status dropdown on any order and select new status. Database updates instantly.

### Order Database Schema
\`\`\`sql
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  user_id UUID,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  delivery_address TEXT,
  total_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_method TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY,
  order_id UUID REFERENCES orders(id),
  product_id TEXT,
  product_name TEXT NOT NULL,
  product_image TEXT,
  quantity INTEGER NOT NULL,
  price NUMERIC NOT NULL,
  customizations JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
\`\`\`

### Order Analytics
Dashboard displays calculated statistics:
- **Total Revenue:** `SUM(orders.total_amount)` for all orders
- **Active Orders:** Count where `status IN ('pending', 'processing')`
- **Average Order Value:** `Total Revenue / Number of Orders`

---

## Database Structure

### Complete Database Schema

#### 1. Products Table
Stores all ice cream products and flavors.

**Columns:**
- `id` (TEXT, PRIMARY KEY) - Unique product identifier
- `name` (TEXT) - Product name
- `description` (TEXT) - Full description
- `notes` (TEXT) - Short flavor notes
- `allergens` (TEXT[]) - Array of allergen strings
- `price` (NUMERIC) - Price in UGX
- `category` (TEXT) - Product category
- `image` (TEXT) - Image URL (Vercel Blob)
- `color` (TEXT) - Hex color code
- `is_active` (BOOLEAN) - Active/inactive status
- `created_at` (TIMESTAMPTZ) - Creation timestamp
- `updated_at` (TIMESTAMPTZ) - Last update timestamp

**RLS Policies:**
- `products_select_all` (SELECT) - Public can view active products
- `products_insert_admin` (INSERT) - Only admins can insert
- `products_update_admin` (UPDATE) - Only admins can update
- `products_delete_admin` (DELETE) - Only admins can delete

#### 2. Orders Table
Customer orders and order information.

**Columns:**
- `id` (UUID, PRIMARY KEY)
- `user_id` (UUID) - Reference to user
- `customer_name` (TEXT)
- `customer_email` (TEXT)
- `customer_phone` (TEXT)
- `delivery_address` (TEXT)
- `total_amount` (NUMERIC)
- `status` (TEXT) - Order status
- `payment_method` (TEXT)
- `notes` (TEXT)
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

**RLS Policies:**
- `orders_select_own` - Users can view own orders
- `orders_insert_authenticated` - Authenticated users can create
- `orders_update_admin` - Only admins can update

#### 3. Order Items Table
Individual items within each order.

**Columns:**
- `id` (UUID, PRIMARY KEY)
- `order_id` (UUID, FOREIGN KEY → orders.id)
- `product_id` (TEXT)
- `product_name` (TEXT)
- `product_image` (TEXT)
- `quantity` (INTEGER)
- `price` (NUMERIC)
- `customizations` (JSONB) - Custom mix details
- `created_at` (TIMESTAMPTZ)

**RLS Policies:**
- `order_items_select` - Can view items for accessible orders
- `order_items_insert` - Can insert for new orders

#### 4. Profiles Table
User profiles and authentication.

**Columns:**
- `id` (UUID, PRIMARY KEY)
- `email` (TEXT)
- `full_name` (TEXT)
- `role` (TEXT) - 'admin' or 'customer'
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

**RLS Policies:**
- `profiles_select_own` - Users can view own profile
- `profiles_insert_own` - Users can create own profile
- `profiles_update_own` - Users can update own profile

#### 5. Website Settings Table
Dynamic website configuration.

**Columns:**
- `id` (UUID, PRIMARY KEY)
- `key` (TEXT, UNIQUE) - Setting identifier
- `value` (JSONB) - Setting data (flexible structure)
- `updated_at` (TIMESTAMPTZ)
- `updated_by` (UUID)

**RLS Policies:**
- `settings_select_all` - Everyone can read settings
- `settings_update_admin` - Only admins can modify

**Common Keys:**
- `brand_colors` - Color scheme
- `hero_text` - Homepage hero
- `about_text` - About page content
- `logo` - Logo URL
- `hero_image` - Hero background URL
- `home_hero` - Complete hero data
- `carousel_images` - Carousel slides
- `about_page` - About page data
- `mix_builder_settings` - Mix builder config

---

## API Endpoints

### Authentication Endpoints

#### POST `/auth/login/actions.ts` → `loginWithPasscode()`
**Purpose:** Authenticate admin with passcode

**Request:**
\`\`\`typescript
loginWithPasscode(passcode: string)
\`\`\`

**Response:**
\`\`\`typescript
{ success: boolean, error?: string }
\`\`\`

**Behavior:**
- Validates passcode against `202512`
- Creates HTTP-only cookie on success
- Returns error message on failure

#### POST `/auth/login/logout-action.ts` → `logoutAction()`
**Purpose:** Logout admin user

**Behavior:**
- Deletes admin session cookie
- Redirects to login page

### Validation Endpoints

#### GET `/api/check-admin/route.ts`
**Purpose:** Verify admin session is valid

**Response:**
\`\`\`typescript
{ isAdmin: boolean }
\`\`\`

**Behavior:**
- Checks for `admin_session` cookie
- Returns `true` if authenticated, `false` otherwise
- Used by all admin pages for authorization

### Content Management Endpoints

#### GET `/api/website-content/route.ts`
**Purpose:** Fetch all website content settings

**Response:**
\`\`\`typescript
{
  home_hero: { badge_text, main_title, subtitle, ... },
  carousel_images: [{ src, alt }, ...],
  about_page: { title, subtitle, ... },
  mix_builder_settings: { title, max_mixins, max_toppings }
}
\`\`\`

#### POST `/api/website-content/route.ts`
**Purpose:** Update website content

**Request Body:**
\`\`\`typescript
{
  key: string,  // e.g., "home_hero"
  value: any    // JSON object with settings
}
\`\`\`

**Response:**
\`\`\`typescript
{ success: boolean }
\`\`\`

**Behavior:**
- Upserts data to `website_settings` table
- Updates `updated_at` timestamp

### Image Upload Endpoints

#### POST `/api/upload-image/route.ts`
**Purpose:** Upload image to Vercel Blob storage

**Request:**
- Multipart form data with image file

**Response:**
\`\`\`typescript
{
  success: boolean,
  url?: string,      // Blob URL if successful
  error?: string     // Error message if failed
}
\`\`\`

**Supported Formats:** JPG, PNG, WebP, GIF  
**Max Size:** Configurable per uploader (2-5MB)

**Behavior:**
- Validates file type and size
- Uploads to Vercel Blob
- Returns permanent URL
- Returns error for invalid files

---

## Image Upload System

### Component: `ImageUploader`
**Location:** `components/image-uploader.tsx`

A reusable component for uploading images throughout the admin dashboard.

### Features
1. **Drag-and-Drop:** Drag files directly onto the upload area
2. **Click to Upload:** Click to open file browser
3. **Live Preview:** Shows current image or uploaded image
4. **Remove Image:** X button to clear image
5. **Validation:** File type and size validation
6. **Loading State:** Shows spinner during upload
7. **Error Handling:** Displays error messages for invalid files

### Usage Example
\`\`\`tsx
<ImageUploader
  currentImage={product.image}
  onImageChange={(url) => setProduct({...product, image: url})}
  label="Product Image"
  maxSize={5}  // Max 5MB
/>
\`\`\`

### Props
- `currentImage` (string) - Current image URL to display
- `onImageChange` (function) - Callback with new image URL
- `label` (string) - Label text above uploader
- `maxSize` (number) - Max file size in MB (default: 5)

### Validation Rules
- **File Types:** image/jpeg, image/png, image/webp, image/gif
- **Max Size:** Configurable (typically 2-5MB)
- **Error Messages:**
  - "File is too large. Maximum size is XMB"
  - "Invalid file type. Please upload an image"

### Image Storage
- **Service:** Vercel Blob Storage
- **URL Pattern:** `https://[blob-id].public.blob.vercel-storage.com/[filename]`
- **Persistence:** Permanent storage, URLs don't expire
- **Access:** Public read access, admin write access

---

## Troubleshooting Guide

### Common Issues

#### 1. Cannot Login
**Problem:** Passcode not working  
**Solution:**
- Verify passcode is exactly `202512`
- Clear browser cookies
- Check browser console for errors
- Verify `/api/check-admin` endpoint is accessible

#### 2. Images Not Uploading
**Problem:** Image upload fails  
**Solution:**
- Check file size (must be under max limit)
- Verify file format (JPG, PNG, WebP only)
- Check `BLOB_READ_WRITE_TOKEN` environment variable is set
- Review network tab for API errors

#### 3. Products Not Appearing
**Problem:** Products added but not showing on website  
**Solution:**
- Verify product `is_active` is set to `true`
- Check product has valid category
- Refresh website cache
- Check browser console for database errors

#### 4. Content Changes Not Saving
**Problem:** Changes revert after save  
**Solution:**
- Check for JavaScript errors in console
- Verify Supabase connection is active
- Check RLS policies on `website_settings` table
- Ensure admin session is valid

#### 5. Order Status Won't Update
**Problem:** Cannot change order status  
**Solution:**
- Verify admin session is authenticated
- Check RLS policies on `orders` table
- Review network requests for 403/401 errors
- Reload dashboard and try again

---

## Best Practices

### Product Management
1. **Always add product images** - Visual appeal is crucial for e-commerce
2. **Use clear, descriptive names** - Help customers find what they want
3. **Specify all allergens** - Important for customer safety
4. **Keep prices updated** - Reflect current market rates
5. **Use categories consistently** - Makes browsing easier

### Content Management
1. **Update seasonal content regularly** - Keep homepage fresh
2. **Use high-quality carousel images** - First impression matters
3. **Keep hero text concise** - Short, impactful messages work best
4. **Test mix builder limits** - Ensure reasonable customer options
5. **Update stats regularly** - Keep numbers current and impressive

### Order Management
1. **Process orders promptly** - Update status as orders progress
2. **Confirm orders quickly** - Customer satisfaction depends on it
3. **Add notes if needed** - Document special requests or issues
4. **Monitor active orders** - Keep dashboard open during business hours
5. **Complete orders after delivery** - Maintain accurate statistics

### Website Settings
1. **Test color changes** - Preview on live site before saving
2. **Keep brand colors consistent** - Maintain professional appearance
3. **Optimize images** - Compress before uploading
4. **Backup settings** - Take screenshots before major changes
5. **Update gradually** - Make small changes and test

---

## Security Considerations

### Admin Access
- **Passcode Security:** Change default passcode in production
- **Session Duration:** 24-hour cookie expiration
- **HTTP-Only Cookies:** JavaScript cannot access session
- **Logout:** Always logout when finished

### Database Security
- **Row Level Security (RLS):** All tables have RLS enabled
- **Admin-Only Operations:** Products/orders require admin role
- **Input Validation:** Server-side validation on all inputs
- **SQL Injection Protection:** Parameterized queries throughout

### Image Upload Security
- **File Type Validation:** Only image formats accepted
- **Size Limits:** Prevent large file uploads
- **Virus Scanning:** Vercel Blob automatically scans
- **Public URLs:** Images are publicly accessible

---

## Future Enhancements

Potential features to add:
1. **Multi-admin support** - Multiple admin accounts with different permissions
2. **Order notifications** - Email/SMS alerts for new orders
3. **Inventory management** - Track stock levels
4. **Sales reports** - Detailed analytics and charts
5. **Customer management** - View and edit customer profiles
6. **Discount codes** - Create and manage promotional codes
7. **Bulk operations** - Import/export products, bulk status updates
8. **Audit logs** - Track all admin actions
9. **Mobile app** - Native mobile admin interface
10. **AI insights** - Predictive analytics for sales trends

---

## Support and Maintenance

### Regular Maintenance Tasks
- **Weekly:** Review and process all orders
- **Monthly:** Update product catalog with seasonal items
- **Quarterly:** Review and update website content
- **Annually:** Change admin passcode for security

### Monitoring
- Check dashboard daily for new orders
- Monitor customer feedback
- Track sales statistics
- Review error logs in Supabase dashboard

### Database Backups
Supabase automatically backs up your database. Access backups:
1. Go to Supabase dashboard
2. Select your project
3. Navigate to "Database" → "Backups"
4. Download or restore as needed

---

## Technical Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **UI Library:** React 19.2
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui
- **State Management:** Zustand + React Context
- **Forms:** Native HTML5 validation

### Backend
- **Database:** PostgreSQL (via Supabase)
- **Authentication:** Cookie-based sessions
- **Storage:** Vercel Blob
- **API:** Next.js Route Handlers
- **ORM:** Supabase Client (direct SQL queries)

### Deployment
- **Platform:** Vercel
- **Build Tool:** Turbopack
- **CI/CD:** Automatic deployment via GitHub integration
- **Environment:** Production-ready configuration

---

## Quick Reference

### Login Credentials
- **Passcode:** `202512`
- **Login URL:** `/auth/login`
- **Session Duration:** 24 hours

### Important URLs
- Dashboard: `/admin`
- Products: `/admin/products`
- Content: `/admin/content`
- Settings: `/admin/settings`
- Login: `/auth/login`

### Database Tables
- `products` - Ice cream products
- `orders` - Customer orders
- `order_items` - Order line items
- `profiles` - User accounts
- `website_settings` - Dynamic content

### Default Limits
- Product image: 5MB max
- Logo image: 2MB max
- Mix-ins: 4 max (configurable)
- Toppings: 3 max (configurable)

---

**Document Version:** 1.0  
**Last Updated:** December 2025  
**System Version:** Frozen Basket Admin Dashboard v1.0
