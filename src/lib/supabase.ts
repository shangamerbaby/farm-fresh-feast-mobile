import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase URL and anon key
// These are placeholders and need to be replaced with your actual Supabase credentials
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co',
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'
);

// User related functions
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

// Database functions - Users
export async function getUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*');
  return { data, error };
}

export async function createUser(userData: { email: string, password: string, role: string }) {
  // First create auth user
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: userData.email,
    password: userData.password,
    email_confirm: true,
  });

  if (authError) return { data: null, error: authError };

  // Then add user to users table with role
  const { data, error } = await supabase
    .from('users')
    .insert({
      id: authData.user?.id,
      email: userData.email,
      role: userData.role,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  return { data, error };
}

// Database functions - Products
export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*');
  return { data, error };
}

export async function getProductsByCategory(category: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category);
  return { data, error };
}

// Database functions - Orders
export async function getOrders(userId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('user_id', userId);
  return { data, error };
}

export async function createOrder(orderData: {
  userId: string,
  total: number,
  items: Array<{ productId: string; quantity: number; price: number }>
}) {
  // First create the order
  const { data: createdOrder, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: orderData.userId,
      total: orderData.total,
      status: 'pending',
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (orderError) return { data: null, error: orderError };

  // Then create order items
  const orderItems = orderData.items.map(item => ({
    order_id: createdOrder.id,
    product_id: item.productId,
    quantity: item.quantity,
    price: item.price,
  }));

  const { data: itemsData, error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) return { data: null, error: itemsError };

  return { data: createdOrder, error: null };
}

// Database functions - Order History
export async function getOrderHistory(userId: string) {
  const { data, error } = await supabase
    .from('order_history')
    .select('*, order_id(*)')
    .eq('user_id', userId);
  return { data, error };
}
