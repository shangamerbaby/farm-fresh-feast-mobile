
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Package, Clock, CheckCircle } from 'lucide-react';

interface OrderType {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'delivered';
  items: string[];
  total: number;
}

// Sample orders data
const sampleOrders: OrderType[] = [
  {
    id: 'ORD-2023-001',
    date: '2023-05-01',
    status: 'delivered',
    items: ['Premium Ribeye Steak', 'Chicken Thighs'],
    total: 54.97,
  },
  {
    id: 'ORD-2023-002',
    date: '2023-05-15',
    status: 'processing',
    items: ['Mutton Chops', 'Beef Brisket'],
    total: 45.98,
  },
  {
    id: 'ORD-2023-003',
    date: '2023-05-20',
    status: 'pending',
    items: ['Chicken Drumsticks'],
    total: 13.99,
  },
];

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
  const navigate = useNavigate();
  const orders = sampleOrders;
  const currencySymbol = getCurrencySymbol();

  return (
    <div className="container px-4 pt-4 pb-20">
      {/* Header with back button */}
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">{t('orders')}</h1>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-lg font-semibold mb-2">No orders yet</h2>
          <p className="text-muted-foreground mb-4">
            You haven't placed any orders yet. Start shopping to place your first order!
          </p>
          <Button onClick={() => navigate('/')}>
            Browse Products
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
                      {new Date(order.date).toLocaleDateString()}
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
                    {order.items.map((item, index) => (
                      <li key={index}>{item}</li>
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
