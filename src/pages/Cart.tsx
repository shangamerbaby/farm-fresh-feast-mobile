
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { toast } from "@/components/ui/sonner";

const Cart: React.FC = () => {
  const { t } = useLanguage();
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    toast("Order placed successfully!");
    clearCart();
    navigate('/orders');
  };

  if (items.length === 0) {
    return (
      <div className="container px-4 pt-4 pb-20 flex flex-col items-center justify-center h-[70vh]">
        <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6 text-center">
          Looks like you haven't added any products to your cart yet.
        </p>
        <Button onClick={() => navigate('/categories')}>
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="container px-4 pt-4 pb-20">
      {/* Header with back button */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">{t('orders')}</h1>
        </div>
        {items.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearCart}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Cart items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <Card key={item.product.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-24 w-24 object-cover"
                />
                <div className="flex-1 p-3">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground"
                      onClick={() => removeItem(item.product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    ${item.product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="mx-2 w-6 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order summary */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 mb-4">
        <h2 className="font-semibold mb-3">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Delivery Fee</span>
            <span>$5.00</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${(totalPrice + 5).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Checkout button */}
      <Button className="w-full" onClick={handleCheckout}>
        {t('checkout')} (${(totalPrice + 5).toFixed(2)})
      </Button>
    </div>
  );
};

export default Cart;
