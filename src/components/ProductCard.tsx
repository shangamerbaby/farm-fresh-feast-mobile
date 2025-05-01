
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart, Product } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ShoppingCart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t } = useLanguage();
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-shadow hover:shadow-md">
      <div className="card-zoom" onClick={handleViewDetails}>
        <img
          src={product.image}
          alt={product.name}
          className="card-zoom-image h-48 w-full object-cover cursor-pointer"
        />
      </div>

      <CardContent className="pt-4 flex-grow">
        <h3 className="font-medium text-lg truncate">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.cut}</p>
        <p className="font-semibold mt-2">${product.price.toFixed(2)}</p>
      </CardContent>

      <CardFooter className="pt-0 gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={handleViewDetails}
        >
          <Eye className="h-4 w-4 mr-1" />
          {t('viewDetails')}
        </Button>
        <Button 
          size="sm" 
          className="flex-1"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-1" />
          {t('addToCart')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
