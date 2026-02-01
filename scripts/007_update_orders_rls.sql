-- Update RLS policies for orders to allow public order submission
-- Drop existing policies
DROP POLICY IF EXISTS orders_insert_authenticated ON orders;
DROP POLICY IF EXISTS orders_select_own ON orders;
DROP POLICY IF EXISTS orders_update_admin ON orders;
DROP POLICY IF EXISTS order_items_select ON order_items;
DROP POLICY IF EXISTS order_items_insert ON order_items;

-- Create new policies that allow public order insertion
CREATE POLICY orders_insert_public ON orders
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY orders_select_all ON orders
    FOR SELECT
    USING (true);

CREATE POLICY orders_update_all ON orders
    FOR UPDATE
    USING (true);

CREATE POLICY order_items_insert_public ON order_items
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY order_items_select_all ON order_items
    FOR SELECT
    USING (true);
