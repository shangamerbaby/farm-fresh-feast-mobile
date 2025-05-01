
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t, getCurrencySymbol } = useLanguage();
  const currencySymbol = getCurrencySymbol();
  
  return (
    <Link to={`/product/${product.id}`}>
      <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
        <div className="aspect-square overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-3">
          <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
          <p className="text-xs text-muted-foreground mb-1">
            {product.cut && `${product.cut} • `}{t(product.category)}
          </p>
          <p className="font-semibold text-primary">
            {currencySymbol}{product.price.toFixed(2)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
