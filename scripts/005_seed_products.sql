-- Seed products table with ice cream flavors
-- This adds all 24 flavors to the database so admins can manage them

INSERT INTO products (id, name, description, notes, allergens, price, category, image, color, is_active) VALUES
  ('1', 'Vanilla Bean Royale', 'Real Madagascan vanilla pods, creamy base.', 'Aromatic, Smooth', ARRAY['Milk'], 8000, 'Classic', '/images/products/sundae-bowl.png', '#F3E5AB', true),
  ('2', 'Belgian Chocolate Intenso', 'Deep dark chocolate, velvet texture.', 'Rich, Dark', ARRAY['Milk', 'Soy'], 9000, 'Classic', '/images/products/chocolate-bar.png', '#3B2F2F', true),
  ('3', 'Fresh Mango Sorbet', 'Real seasonal mango, dairy-free.', 'Tangy, Refreshing', ARRAY[]::text[], 8000, 'Sorbet', '/images/products/mango-bar.png', '#FFD700', true),
  ('4', 'Strawberry Field', 'Fresh strawberry puree, soft texture.', 'Sweet, Berry', ARRAY['Milk'], 8000, 'Fruit', '/images/products/parfait-sundae.png', '#FF69B4', true),
  ('5', 'Passionfruit Zest', 'Tangy passionfruit with citrus lift.', 'Citrus, Tropical', ARRAY['Milk'], 8500, 'Fruit', '/images/products/mango-bar.png', '#E3A857', true),
  ('6', 'Pistachio Crème', 'Roasted pistachios ground into a rich base.', 'Nutty, Creamy', ARRAY['Milk', 'Nuts'], 10000, 'Premium', '/images/products/pistachio-bar.png', '#93C572', true),
  ('7', 'Salted Caramel Dream', 'Buttery caramel with sea salt finish.', 'Sweet, Salty', ARRAY['Milk'], 9000, 'Classic', '/images/products/caramel-bar.png', '#C68E17', true),
  ('8', 'Kulfi Cardamom', 'Traditional Indian kulfi, cardamom & condensed milk.', 'Dense, Aromatic', ARRAY['Milk'], 9500, 'Kulfi', '/images/products/plain-bar.png', '#F0EAD6', true),
  ('9', 'Rose & Lychee', 'Delicate rose aroma with lychee pieces.', 'Floral, Sweet', ARRAY['Milk'], 9500, 'Premium', '/images/products/white-drizzle-bar.png', '#FF007F', true),
  ('10', 'Coconut Crush', 'Creamy coconut base with shredded coconut.', 'Tropical, Creamy', ARRAY['Coconut'], 8500, 'Fruit', '/images/products/sundae-bowl.png', '#FFF5EE', true),
  ('11', 'Coffee Arabica', 'Single-origin coffee infusion.', 'Bold, Roasted', ARRAY['Milk'], 9000, 'Classic', '/images/products/chocolate-bar.png', '#6F4E37', true),
  ('12', 'Banana Foster', 'Banana with caramelized sugar notes.', 'Sweet, Smooth', ARRAY['Milk'], 8500, 'Fruit', '/images/products/ice-cream-boat.png', '#FFE135', true),
  ('13', 'Choco Hazelnut Swirl', 'Chocolate base with hazelnut ripple.', 'Nutty, Chocolate', ARRAY['Milk', 'Nuts'], 9500, 'Classic', '/images/products/chocolate-bar.png', '#4B3621', true),
  ('14', 'Lemon Sorbet', 'Clean lemon zing. Dairy-free.', 'Tart, Clean', ARRAY[]::text[], 8000, 'Sorbet', '/images/products/plain-bar.png', '#FFF44F', true),
  ('15', 'Blueberry Cheesecake', 'Blueberry swirl in cheesecake cream base.', 'Rich, Berry', ARRAY['Milk', 'Gluten'], 9500, 'Premium', '/images/products/ice-cream-boat.png', '#464196', true),
  ('16', 'Black Sesame', 'Nutty, deep sesame flavor.', 'Nutty, Earthy', ARRAY['Sesame', 'Milk'], 11000, 'Premium', '/images/products/plain-bar.png', '#3C4142', true),
  ('17', 'Matcha Green Tea', 'Ceremonial matcha with bitter sweet balance.', 'Earthy, Sweet', ARRAY['Milk'], 10000, 'Premium', '/images/products/pistachio-bar.png', '#B2D3C2', true),
  ('18', 'Rum & Raisin Reserve', 'Soaked raisins, subtle rum finish.', 'Boozy, Sweet', ARRAY['Milk'], 9500, 'Classic', '/images/products/parfait-sundae.png', '#704214', true),
  ('19', 'Tropical Guava', 'Bright guava purée, tropical feel.', 'Sweet, Tropical', ARRAY['Milk'], 8500, 'Fruit', '/images/products/mango-bar.png', '#FE5A1D', true),
  ('20', 'Chili Chocolate', 'Spicy warm chilli with dark chocolate.', 'Spicy, Chocolate', ARRAY['Milk'], 9000, 'Classic', '/images/products/chocolate-bar.png', '#8B0000', true),
  ('21', 'Custard Apple', 'Local fruit inclusion when in season.', 'Sweet, Creamy', ARRAY['Milk'], 9500, 'Fruit', '/images/products/pistachio-bar.png', '#90EE90', true),
  ('22', 'Pomegranate Splash', 'Tart pomegranate ribbons in cream.', 'Tart, Sweet', ARRAY['Milk'], 9000, 'Fruit', '/images/products/parfait-sundae.png', '#C0392B', true),
  ('23', 'Honey Lavender', 'Subtle floral honey base.', 'Floral, Sweet', ARRAY['Milk'], 9500, 'Premium', '/images/products/white-drizzle-bar.png', '#E6E6FA', true),
  ('24', 'Caramelised Fig', 'Fig preserves in cream.', 'Sweet, Earthy', ARRAY['Milk'], 10000, 'Premium', '/images/products/caramel-bar.png', '#800080', true)
ON CONFLICT (id) DO NOTHING;
