
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '../context/LanguageContext';
import { getCategories, getProductsByCategory, getAllProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, ArrowLeft } from 'lucide-react';

const Categories: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const preSelectedCategory = location.state?.selectedCategory;
  
  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });
  
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Set initial category once categories are loaded
  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(preSelectedCategory || categories[0]);
    }
  }, [preSelectedCategory, categories]);
  
  // Fetch products by selected category
  const { data: categoryProducts = [] } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () => selectedCategory ? getProductsByCategory(selectedCategory) : getAllProducts(),
    enabled: !!selectedCategory
  });
  
  // Filter products by search query
  const filteredProducts = categoryProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (p.cut && p.cut.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container px-4 pt-4 pb-20">
      {/* Header */}
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/app')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">{t('categories')}</h1>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('search')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category tabs */}
      {categories.length > 0 && (
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
          <TabsList className="mb-4 w-full overflow-x-auto flex space-x-2 bg-transparent">
            {categories.map(category => (
              <TabsTrigger 
                key={category} 
                value={category} 
                className="px-4 py-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                {t(category)}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map(category => (
            <TabsContent key={category} value={category} className="mt-0">
              {searchQuery && filteredProducts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No products found matching "{searchQuery}"
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default Categories;
