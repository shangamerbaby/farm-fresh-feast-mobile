
import { Product } from '../context/CartContext';

// Empty product data - all products will come from the database
export const products: Product[] = [];

// Get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

// Get product by ID
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

// Get products by cut
export const getProductsByCut = (cut: string): Product[] => {
  return products.filter(product => product.cut === cut);
};

// Get all product categories
export const getCategories = (): string[] => {
  return [...new Set(products.map(product => product.category))];
};

// Get all product cuts
export const getCuts = (): string[] => {
  return [...new Set(products.filter(p => p.cut).map(product => product.cut as string))];
};

// Get featured products
export const getFeaturedProducts = (count: number = 4): Product[] => {
  return [];
};

// Get best selling products
export const getBestSellingProducts = (count: number = 4): Product[] => {
  return [];
};
