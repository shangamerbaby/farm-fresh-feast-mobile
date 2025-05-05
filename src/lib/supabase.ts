
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://janvznwulosbrsknishq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphbnZ6bnd1bG9zYnJza25pc2hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMTE4ODksImV4cCI6MjA2MTY4Nzg4OX0.Jxv9RZ9MZsxMcbjL2RtFenATdv1_J_8dyBl-ZGO68sA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

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

export async function createUser({ email, password, role }: { email: string, password: string, role: 'admin' | 'customer' }) {
  // First create auth user
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (authError) return { data: null, error: authError };

  // Then add user to users table with role
  const { data, error } = await supabase
    .from('users')
    .insert({
      id: authData.user?.id,
      email,
      role,
    })
    .select()
    .single();

  return { data, error };
}

// Database functions - Users
export async function getUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*');
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

export async function getProductById(id: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
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
