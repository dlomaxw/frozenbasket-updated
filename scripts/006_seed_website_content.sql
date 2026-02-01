-- Seed website content settings
INSERT INTO website_settings (id, key, value, updated_at) VALUES
(gen_random_uuid(), 'home_hero', jsonb_build_object(
  'badge_text', 'New Seasonal Flavor: Caramelised Fig',
  'main_title', 'Create Your Dream Scoop',
  'subtitle', 'Experience the joy of handcrafted ice cream. Choose from 24 premium flavors or build your own custom mix with our interactive builder.',
  'hero_image', '/images/products/sundae-bowl.png',
  'stat_flavors', '24+',
  'stat_delivery', '15min',
  'stat_rating', '4.9'
), NOW()),

(gen_random_uuid(), 'carousel_images', jsonb_build_array(
  jsonb_build_object('src', '/images/carousel/ice-cream-cup.png', 'alt', 'Frozen Basket chocolate ice cream with toppings'),
  jsonb_build_object('src', '/images/carousel/staff-preparing.png', 'alt', 'Frozen Basket staff preparing ice cream cones'),
  jsonb_build_object('src', '/images/carousel/adding-toppings.png', 'alt', 'Frozen Basket team member adding toppings'),
  jsonb_build_object('src', '/images/carousel/mascot-sundae.png', 'alt', 'Frozen Basket mascot with ice cream sundae'),
  jsonb_build_object('src', '/images/carousel/serving-milkshakes.png', 'alt', 'Frozen Basket serving milkshakes to customers')
), NOW()),

(gen_random_uuid(), 'about_page', jsonb_build_object(
  'title', 'About Frozen Basket',
  'subtitle', 'Crafting moments of pure joy, one scoop at a time. We believe ice cream should be an experience, not just a dessert.',
  'cards', jsonb_build_array(
    jsonb_build_object('title', 'Handcrafted with Love', 'icon', 'heart', 'description', 'Every batch is made fresh daily using traditional techniques and premium ingredients sourced from local suppliers.'),
    jsonb_build_object('title', 'Natural Ingredients', 'icon', 'leaf', 'description', 'No artificial flavors or preservatives. We use real fruits, nuts, and premium chocolate in all our creations.'),
    jsonb_build_object('title', 'Award Winning', 'icon', 'award', 'description', 'Recognized as Kampala''s best artisan ice cream, with awards for innovation and quality excellence.'),
    jsonb_build_object('title', 'Fast Delivery', 'icon', 'truck', 'description', 'We deliver your ice cream frozen solid within 15 minutes, ensuring perfect quality when it arrives.')
  ),
  'mission_title', 'Our Mission',
  'mission_text', 'To bring people together through exceptional ice cream experiences. We''re not just selling dessert - we''re creating memories, celebrating moments, and spreading happiness one delicious scoop at a time.'
), NOW()),

(gen_random_uuid(), 'mix_builder_settings', jsonb_build_object(
  'title', 'Mix Builder',
  'max_mixins', 4,
  'max_toppings', 3,
  'size_multipliers', jsonb_build_object('S', 0.8, 'M', 1.0, 'L', 1.3),
  'size_labels', jsonb_build_object(
    'S', 'Small - Perfect for a quick treat',
    'M', 'Medium - Our most popular size',
    'L', 'Large - Share the joy!'
  )
), NOW())

ON CONFLICT (key) DO UPDATE SET 
  value = EXCLUDED.value,
  updated_at = EXCLUDED.updated_at;
