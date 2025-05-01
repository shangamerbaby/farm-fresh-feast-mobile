
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

// Completed order logs
interface CompletedOrderType {
  id: string;
  date: string;
  completedDate: string;
  customerName: string;
  items: { name: string; quantity: number }[];
  total: number;
}

// Sample completed orders
const completedOrders: CompletedOrderType[] = [
  {
    id: 'ORD-2023-001',
    date: '2023-05-01',
    completedDate: '2023-05-02',
    customerName: 'John Doe',
    items: [
      { name: 'Premium Ribeye Steak', quantity: 2 },
      { name: 'Chicken Thighs', quantity: 1 }
    ],
    total: 54.97
  },
  {
    id: 'ORD-2023-002',
    date: '2023-05-15',
    completedDate: '2023-05-16',
    customerName: 'Jane Smith',
    items: [
      { name: 'Mutton Chops', quantity: 1 },
      { name: 'Beef Brisket', quantity: 1 }
    ],
    total: 45.98
  },
  {
    id: 'ORD-2023-003',
    date: '2023-05-20',
    completedDate: '2023-05-20',
    customerName: 'Michael Johnson',
    items: [
      { name: 'Chicken Drumsticks', quantity: 2 }
    ],
    total: 17.98
  }
];

const OrderLogs: React.FC = () => {
  const { t } = useLanguage();
  
  // Format the items list for display
  const formatItems = (items: { name: string; quantity: number }[]) => {
    return items.map(item => `${item.name} x${item.quantity}`).join(', ');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{t('completedOrders')}</h2>
      
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('orderId')}</TableHead>
              <TableHead>{t('customer')}</TableHead>
              <TableHead>{t('orderDate')}</TableHead>
              <TableHead>{t('completedDate')}</TableHead>
              <TableHead>{t('items')}</TableHead>
              <TableHead className="text-right">{t('total')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {completedOrders.map(order => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {order.id}
                  </div>
                </TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(order.completedDate).toLocaleDateString()}</TableCell>
                <TableCell className="max-w-[200px] truncate" title={formatItems(order.items)}>
                  {formatItems(order.items)}
                </TableCell>
                <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default OrderLogs;
