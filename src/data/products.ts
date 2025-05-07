
import { Product } from '../context/CartContext';
import { supabase } from '../lib/supabase';

// Get all products
export const getAllProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*');
  
  if (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
  
  return data as Product[];
};

// Get products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category);
  
  if (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
  
  return data as Product[];
};

// Get product by ID
export const getProductById = async (id: string): Promise<Product | undefined> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching product by ID:', error);
    return undefined;
  }
  
  return data as Product;
};

// Get products by cut
export const getProductsByCut = async (cut: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('cut', cut);
  
  if (error) {
    console.error('Error fetching products by cut:', error);
    return [];
  }
  
  return data as Product[];
};

// Get all product categories
export const getCategories = async (): Promise<string[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('category');
  
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  
  return [...new Set(data.map(product => product.category))];
};

// Get all product cuts
export const getCuts = async (): Promise<string[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('cut');
  
  if (error) {
    console.error('Error fetching cuts:', error);
    return [];
  }
  
  return [...new Set(data.filter(p => p.cut).map(product => product.cut as string))];
};

// Get featured products
export const getFeaturedProducts = async (count: number = 4): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .limit(count);
  
  if (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
  
  return data as Product[];
};

// Get best selling products
export const getBestSellingProducts = async (count: number = 4): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .limit(count);
  
  if (error) {
    console.error('Error fetching best selling products:', error);
    return [];
  }
  
  return data as Product[];
};
