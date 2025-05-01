
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { getProductById, getProductsByCategory } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, getCurrencySymbol } = useLanguage();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const currencySymbol = getCurrencySymbol();

  const product = getProductById(id || '');
  
  if (!product) {
    return (
      <div className="container px-4 py-8 text-center">
        <p className="text-lg">Product not found</p>
        <Button onClick={() => navigate('/')} className="mt-4">
          Go back to home
        </Button>
      </div>
    );
  }

  const similarProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="container px-4 pt-4 pb-20">
      {/* Header with back button */}
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">{t('viewDetails')}</h1>
      </div>

      {/* Product image */}
      <div className="rounded-lg overflow-hidden mb-4 shadow-sm">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Product details */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">{product.name}</h1>
        <p className="text-muted-foreground mb-3">
          {product.cut && `${product.cut} • `}{t(product.category)}
        </p>
        <p className="text-primary text-2xl font-semibold mb-4">
          {currencySymbol}{product.price.toFixed(2)}
        </p>
        <p className="text-muted-foreground mb-6">{product.description}</p>

        {/* Quantity selector */}
        <div className="flex items-center justify-between mb-4 w-full">
          <span className="font-medium">Quantity:</span>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="mx-2 w-6 text-center">{quantity}</span>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8"
              onClick={incrementQuantity}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <Button 
          className="w-full"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          {t('addToCart')}
        </Button>
      </div>

      {/* Similar products */}
      {similarProducts.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Similar Products</h2>
          <div className="grid grid-cols-2 gap-4">
            {similarProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
