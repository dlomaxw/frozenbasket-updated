-- Products table for managing ice cream flavors
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  notes TEXT,
  allergens TEXT[],
  price NUMERIC NOT NULL,
  category TEXT NOT NULL,
  image TEXT,
  color TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Website settings table for managing colors, text, etc
CREATE TABLE IF NOT EXISTS website_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by UUID REFERENCES profiles(id)
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_settings ENABLE ROW LEVEL SECURITY;

-- Products policies: Everyone can read, only admins can modify
CREATE POLICY "products_select_all" ON products
  FOR SELECT TO authenticated, anon
  USING (true);

CREATE POLICY "products_insert_admin" ON products
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "products_update_admin" ON products
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "products_delete_admin" ON products
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Website settings policies: Everyone can read, only admins can modify
CREATE POLICY "settings_select_all" ON website_settings
  FOR SELECT TO authenticated, anon
  USING (true);

CREATE POLICY "settings_update_admin" ON website_settings
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Insert default website settings
INSERT INTO website_settings (key, value) VALUES
  ('brand_colors', '{"primary": "#4A90E2", "secondary": "#FFB3BA", "accent": "#C9A9E2", "dark": "#5C4B51", "light": "#FFF8E7"}'),
  ('hero_text', '{"title": "Craft Your Perfect Ice Cream", "subtitle": "24 flavors, infinite combinations"}'),
  ('about_text', '{"mission": "We make premium, local ice creams with love.", "values": "Quality, Innovation, Community"}')
ON CONFLICT (key) DO NOTHING;
