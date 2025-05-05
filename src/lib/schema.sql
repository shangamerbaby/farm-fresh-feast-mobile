
-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'customer')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  cut TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'delivered')),
  total DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id),
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order history table
CREATE TABLE order_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id),
  user_id UUID NOT NULL REFERENCES users(id),
  status TEXT NOT NULL,
  changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial admin user (You'll need to create this user through auth UI or API first)
-- This is just an example, you'll need to replace with the actual UUID from auth
INSERT INTO users (id, email, role, created_at)
VALUES 
  ('replace-with-actual-uuid', 'admin@example.com', 'admin', NOW()),
  ('replace-with-actual-uuid', 'customer@example.com', 'customer', NOW());

-- Create a trigger to add order history when order status changes
CREATE OR REPLACE FUNCTION add_order_history()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS NULL OR NEW.status <> OLD.status THEN
    INSERT INTO order_history (order_id, user_id, status)
    VALUES (NEW.id, NEW.user_id, NEW.status);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER order_status_changed
AFTER INSERT OR UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION add_order_history();

-- Set up RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_history ENABLE ROW LEVEL SECURITY;

-- Users policy (only see own data, admin sees all)
CREATE POLICY users_select ON users 
  FOR SELECT USING (
    auth.uid() = id OR 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Products policy (anyone can read)
CREATE POLICY products_select ON products FOR SELECT USING (true);

-- Orders policy (only see own orders, admin sees all)
CREATE POLICY orders_select ON orders 
  FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Order items policy (only see own order items, admin sees all)
CREATE POLICY order_items_select ON order_items 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders WHERE 
        orders.id = order_items.order_id AND 
        (orders.user_id = auth.uid() OR 
         EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'))
    )
  );

-- Order history policy (only see own order history, admin sees all)
CREATE POLICY order_history_select ON order_history 
  FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );
