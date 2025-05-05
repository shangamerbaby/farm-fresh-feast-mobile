
import { supabase } from '../lib/supabase';

export const sampleProducts = [
  {
    name: 'Premium Ribeye Steak',
    category: 'beef',
    cut: 'ribeye',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=800&auto=format&fit=crop',
    description: 'Our best-selling premium ribeye steak, perfectly marbled for maximum flavor.',
  },
  {
    name: 'Bone-in New York Strip',
    category: 'beef',
    cut: 'strip',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?w=800&auto=format&fit=crop',
    description: 'Classic New York Strip steak with the bone in for extra flavor.',
  },
  {
    name: 'Grass-Fed Ground Beef',
    category: 'beef',
    cut: 'ground',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&auto=format&fit=crop',
    description: '100% grass-fed ground beef, perfect for burgers or meatloaf.',
  },
  {
    name: 'Filet Mignon',
    category: 'beef',
    cut: 'filet',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1618241803264-e2bf4b159e33?w=800&auto=format&fit=crop',
    description: 'The most tender cut of beef for an unforgettable meal.',
  },
  {
    name: 'Boneless Chicken Breast',
    category: 'poultry',
    cut: 'breast',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop',
    description: 'Fresh, boneless chicken breasts perfect for any meal.',
  },
  {
    name: 'Chicken Thighs',
    category: 'poultry',
    cut: 'thigh',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&auto=format&fit=crop',
    description: 'Juicy chicken thighs with skin on for extra flavor.',
  },
  {
    name: 'Whole Chicken',
    category: 'poultry',
    cut: 'whole',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1501200291289-c5a76c232e5f?w=800&auto=format&fit=crop',
    description: 'Farm-fresh whole chicken, perfect for roasting.',
  },
  {
    name: 'Lamb Chops',
    category: 'lamb',
    cut: 'chop',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1603048297172-6fabbc4896bc?w=800&auto=format&fit=crop',
    description: 'Tender lamb chops perfect for grilling or roasting.',
  },
  {
    name: 'Leg of Lamb',
    category: 'lamb',
    cut: 'leg',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1514516816566-de580c621376?w=800&auto=format&fit=crop',
    description: 'Boneless leg of lamb, great for special occasions.',
  },
  {
    name: 'Pork Chops',
    category: 'pork',
    cut: 'chop',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=800&auto=format&fit=crop',
    description: 'Thick-cut bone-in pork chops, perfect for grilling.',
  },
  {
    name: 'Bacon',
    category: 'pork',
    cut: 'bacon',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1606851091851-e8c8c0fca7fa?w=800&auto=format&fit=crop',
    description: 'Thick-sliced, hickory-smoked bacon. A breakfast essential.',
  },
  {
    name: 'Pork Tenderloin',
    category: 'pork',
    cut: 'tenderloin',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1599921841143-819065a55cc6?w=800&auto=format&fit=crop',
    description: 'Lean, tender pork tenderloin, perfect for roasting.',
  }
];

export const seedProducts = async () => {
  try {
    // Check if products already exist
    const { data: existingProducts, error: checkError } = await supabase
      .from('products')
      .select('id')
      .limit(1);
    
    if (checkError) throw checkError;
    
    if (existingProducts && existingProducts.length > 0) {
      console.log('Products already seeded, skipping...');
      return;
    }
    
    // Insert sample products
    const { error: insertError } = await supabase
      .from('products')
      .insert(sampleProducts);
    
    if (insertError) throw insertError;
    
    console.log('Successfully seeded products!');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};
