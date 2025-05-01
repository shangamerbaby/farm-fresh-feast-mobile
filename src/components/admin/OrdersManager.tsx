
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Package, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

// Extended order type for admin functionality
interface AdminOrderType {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'delivered';
  items: {
    id: string;
    name: string;
    quantity: number;
    packed: boolean;
  }[];
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  total: number;
}

// Sample active orders
const sampleActiveOrders: AdminOrderType[] = [
  {
    id: 'ORD-2023-004',
    date: '2023-05-25',
    status: 'pending',
    customerName: 'Rajesh Kumar',
    customerAddress: '123 Main St, City Center',
    customerPhone: '+91 98765 43210',
    items: [
      { id: 'beef-ribeye', name: 'Premium Ribeye Steak', quantity: 2, packed: false },
      { id: 'chicken-breast', name: 'Chicken Breast', quantity: 1, packed: false }
    ],
    total: 72.97
  },
  {
    id: 'ORD-2023-005',
    date: '2023-05-26',
    status: 'processing',
    customerName: 'Anita Patel',
    customerAddress: '456 Park Avenue, Suburb',
    customerPhone: '+91 87654 32109',
    items: [
      { id: 'mutton-leg', name: 'Mutton Leg', quantity: 1, packed: true },
      { id: 'beef-sirloin', name: 'Sirloin Steak', quantity: 2, packed: false }
    ],
    total: 72.97
  }
];

const OrdersManager: React.FC = () => {
  const { t } = useLanguage();
  const [activeOrders, setActiveOrders] = useState<AdminOrderType[]>(sampleActiveOrders);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrderType | null>(null);
  
  // Toggle checked status of item
  const toggleItemPacked = (orderId: string, itemId: string) => {
    setActiveOrders(orders => 
      orders.map(order => 
        order.id === orderId 
          ? {
              ...order,
              items: order.items.map(item => 
                item.id === itemId 
                  ? { ...item, packed: !item.packed }
                  : item
              )
            }
          : order
      )
    );
  };

  // Check if all items in an order are packed
  const areAllItemsPacked = (order: AdminOrderType): boolean => {
    return order.items.every(item => item.packed);
  };
  
  // Mark order as complete and move to logs
  const completeOrder = (orderId: string) => {
    setActiveOrders(prev => prev.filter(order => order.id !== orderId));
    toast.success(t('orderCompleted'));
    // In a real app, this would add the order to the logs database
  };
  
  // Calculate percentage of items packed
  const calculateProgress = (order: AdminOrderType): number => {
    const packedCount = order.items.filter(item => item.packed).length;
    return Math.round((packedCount / order.items.length) * 100);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{t('activeOrders')}</h2>
      
      {activeOrders.length === 0 ? (
        <div className="text-center py-8">
          <Package className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
          <h3 className="text-lg font-medium mb-1">{t('noActiveOrders')}</h3>
          <p className="text-muted-foreground">{t('allOrdersCompleted')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activeOrders.map(order => (
            <Card key={order.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="font-medium">{order.id}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {order.status === 'pending' ? (
                      <Clock className="h-5 w-5 text-yellow-500 mr-1" />
                    ) : (
                      <Package className="h-5 w-5 text-blue-500 mr-1" />
                    )}
                    <span className="text-sm">
                      {t(order.status)}
                    </span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm">{order.customerName}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {order.customerAddress}
                  </p>
                </div>
                
                <div className="h-2 w-full bg-gray-100 rounded-full mb-3">
                  <div 
                    className="h-2 bg-primary rounded-full" 
                    style={{ width: `${calculateProgress(order)}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm">
                    {calculateProgress(order)}% {t('packed')}
                  </span>
                  <span className="text-sm font-medium">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </CardContent>
              
              <CardFooter className="px-4 py-3 bg-muted/50 flex justify-between">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedOrder(order)}
                    >
                      {t('viewItems')}
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    {selectedOrder && (
                      <>
                        <SheetHeader>
                          <SheetTitle>{selectedOrder.id} - {t('packingList')}</SheetTitle>
                          <SheetDescription>
                            {t('customerName')}: {selectedOrder.customerName}
                          </SheetDescription>
                        </SheetHeader>
                        <div className="mt-6 space-y-4">
                          <h4 className="text-sm font-medium">{t('items')}</h4>
                          <div className="space-y-4">
                            {selectedOrder.items.map(item => (
                              <div key={item.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`${selectedOrder.id}-${item.id}`}
                                  checked={item.packed}
                                  onCheckedChange={() => toggleItemPacked(selectedOrder.id, item.id)}
                                />
                                <label
                                  htmlFor={`${selectedOrder.id}-${item.id}`}
                                  className={`text-sm ${item.packed ? 'line-through text-muted-foreground' : ''}`}
                                >
                                  {item.name} x {item.quantity}
                                </label>
                              </div>
                            ))}
                          </div>
                          
                          <div className="pt-4 border-t">
                            <Button 
                              className="w-full"
                              disabled={!areAllItemsPacked(selectedOrder)}
                              onClick={() => completeOrder(selectedOrder.id)}
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              {t('completeOrder')}
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </SheetContent>
                </Sheet>
                
                <Button
                  variant="default"
                  size="sm"
                  disabled={!areAllItemsPacked(order)}
                  onClick={() => completeOrder(order.id)}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  {t('complete')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersManager;
