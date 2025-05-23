
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '../context/LanguageContext';
import { getCategories, getFeaturedProducts, getBestSellingProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Beef, Bird, Drumstick, Search, ChevronRight } from 'lucide-react';

const CategoryIcon: React.FC<{ category: string }> = ({ category }) => {
  switch (category) {
    case 'cow':
      return <Beef className="h-6 w-6" />;
    case 'chicken':
      return <Drumstick className="h-6 w-6" />;
    case 'mutton':
      return <Bird className="h-6 w-6" />;
    default:
      return <Beef className="h-6 w-6" />;
  }
};

const Index: React.FC = () => {
  const { t, language, setLanguage, availableLanguages } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  // Fetch data with React Query
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });
  
  const { data: featuredProducts = [] } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: () => getFeaturedProducts(4)
  });
  
  const { data: bestSellers = [] } = useQuery({
    queryKey: ['bestSellers'],
    queryFn: () => getBestSellingProducts(4)
  });

  const handleCategoryClick = (category: string) => {
    navigate('/categories', { state: { selectedCategory: category } });
  };

  return (
    <div className="container px-4 pt-4 pb-20">
      {/* Header with language selector */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold text-primary">{t('appName')}</h1>
          <p className="text-sm text-muted-foreground">{t('tagline')}</p>
        </div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as any)}
          className="text-sm border rounded-md p-1"
        >
          {availableLanguages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
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

      {/* Categories */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{t('categories')}</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary flex items-center"
            onClick={() => navigate('/categories')}
          >
            {t('viewAll')}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {categories.map((category) => (
            <Card
              key={category}
              className="cursor-pointer hover:bg-secondary transition-colors"
              onClick={() => handleCategoryClick(category)}
            >
              <CardContent className="flex flex-col items-center justify-center p-4">
                <CategoryIcon category={category} />
                <span className="mt-2 text-sm font-medium">{t(category)}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Fresh cuts section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{t('freshCuts')}</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary flex items-center"
            onClick={() => navigate('/categories')}
          >
            {t('viewAll')}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Best Sellers */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{t('bestSellers')}</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary flex items-center"
            onClick={() => navigate('/categories')}
          >
            {t('viewAll')}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
