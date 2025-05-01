
import { Product } from '../context/CartContext';

// Sample product data
export const products: Product[] = [
  {
    id: "beef-ribeye",
    name: "Premium Ribeye Steak",
    category: "cow",
    cut: "ribeye",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?w=800&auto=format&fit=crop",
    description: "Tender, well-marbled ribeye steak from grass-fed cows. Perfect for grilling or pan-searing."
  },
  {
    id: "beef-sirloin",
    name: "Sirloin Steak",
    category: "cow",
    cut: "sirloin",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop",
    description: "Lean and flavorful sirloin steak, ideal for a variety of cooking methods."
  },
  {
    id: "beef-brisket",
    name: "Beef Brisket",
    category: "cow",
    cut: "brisket",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1621963563999-33754b1bda33?w=800&auto=format&fit=crop",
    description: "Perfect for slow cooking or smoking, our brisket delivers rich flavor and tenderness."
  },
  {
    id: "beef-belly",
    name: "Beef Belly",
    category: "cow",
    cut: "belly",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=800&auto=format&fit=crop",
    description: "Rich, fatty beef belly, perfect for slow cooking and braising."
  },
  {
    id: "chicken-breast",
    name: "Chicken Breast",
    category: "chicken",
    cut: "breast",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&auto=format&fit=crop",
    description: "Boneless, skinless chicken breasts. Lean, versatile, and perfect for quick meals."
  },
  {
    id: "chicken-thigh",
    name: "Chicken Thighs",
    category: "chicken",
    cut: "thigh",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1599161146640-8c1ff6ff0390?w=800&auto=format&fit=crop",
    description: "Juicy, flavorful chicken thighs, perfect for grilling, baking, or frying."
  },
  {
    id: "chicken-drumstick",
    name: "Chicken Drumsticks",
    category: "chicken",
    cut: "drumstick",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1562967915-92ae0c320a01?w=800&auto=format&fit=crop",
    description: "Perfect for grilling or baking, our drumsticks are a family favorite."
  },
  {
    id: "chicken-wings",
    name: "Chicken Wings",
    category: "chicken",
    cut: "wings",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800&auto=format&fit=crop",
    description: "Plump and meaty wings, ready for your favorite sauce or seasoning."
  },
  {
    id: "mutton-leg",
    name: "Mutton Leg",
    category: "mutton",
    cut: "leg",
    price: 22.99,
    image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=800&auto=format&fit=crop",
    description: "Tender mutton leg, perfect for roasting or slow cooking."
  },
  {
    id: "mutton-chops",
    name: "Mutton Chops",
    category: "mutton",
    cut: "chops",
    price: 26.99,
    image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=800&auto=format&fit=crop",
    description: "Flavorful, bone-in mutton chops, great for grilling or broiling."
  },
  {
    id: "mutton-shoulder",
    name: "Mutton Shoulder",
    category: "mutton",
    cut: "shoulder",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&auto=format&fit=crop",
    description: "Versatile mutton shoulder, ideal for slow cooking and stews."
  },
  {
    id: "mutton-ribs",
    name: "Mutton Ribs",
    category: "mutton",
    cut: "ribs",
    price: 23.99,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop",
    description: "Succulent mutton ribs with excellent flavor, perfect for grilling or roasting."
  }
];

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
  return [...products].sort(() => 0.5 - Math.random()).slice(0, count);
};

// Get best selling products
export const getBestSellingProducts = (count: number = 4): Product[] => {
  // In a real app, you'd determine this based on sales data
  // For now, we'll just return a random selection
  return [...products].sort(() => 0.5 - Math.random()).slice(0, count);
};
