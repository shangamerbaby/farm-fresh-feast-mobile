
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Package, Clock, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface OrderType {
  id: string;
  created_at: string;
  status: 'pending' | 'processing' | 'delivered';
  total: number;
  items?: Array<{
    product_id: string;
    quantity: number;
    name?: string;
  }>;
}

const OrderStatusIcon: React.FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case 'processing':
      return <Package className="h-5 w-5 text-blue-500" />;
    case 'delivered':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    default:
      return <Clock className="h-5 w-5 text-gray-500" />;
  }
};

const OrderStatusText: React.FC<{ status: string }> = ({ status }) => {
  const { t } = useLanguage();
  return <span className={`
    ${status === 'pending' ? 'text-yellow-500' : ''}
    ${status === 'processing' ? 'text-blue-500' : ''}
    ${status === 'delivered' ? 'text-green-500' : ''}
  `}>{t(status)}</span>;
};

const Orders: React.FC = () => {
  const { t, getCurrencySymbol } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const currencySymbol = getCurrencySymbol();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      setLoading(true);
      try {
        // Fetch orders
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (ordersError) throw ordersError;

        // For each order, fetch its items
        const ordersWithItems = await Promise.all(
          (ordersData || []).map(async (order) => {
            const { data: itemsData } = await supabase
              .from('order_items')
              .select('*, products:product_id(name)')
              .eq('order_id', order.id);

            return {
              ...order,
              items: (itemsData || []).map(item => ({
                product_id: item.product_id,
                quantity: item.quantity,
                name: item.products?.name
              }))
            };
          })
        );

        setOrders(ordersWithItems);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="container px-4 pt-4 pb-20">
      {/* Header with back button */}
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">{t('orders')}</h1>
      </div>

      {loading ? (
        <div className="text-center py-4">{t('loading')}...</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-lg font-semibold mb-2">{t('noOrdersYet')}</h2>
          <p className="text-muted-foreground mb-4">
            {t('noOrdersDescription')}
          </p>
          <Button onClick={() => navigate('/app')}>
            {t('browseProducts')}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <OrderStatusIcon status={order.status} />
                    <span className="ml-1 text-sm">
                      <OrderStatusText status={order.status} />
                    </span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-sm font-medium">{t('items')}:</p>
                  <ul className="text-sm text-muted-foreground">
                    {order.items && order.items.map((item, index) => (
                      <li key={index}>
                        {item.name || item.product_id} (x{item.quantity})
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              
              <CardFooter className="bg-muted p-4 flex justify-between">
                <span className="text-sm font-medium">{t('total')}</span>
                <span className="font-semibold">{currencySymbol}{order.total.toFixed(2)}</span>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
