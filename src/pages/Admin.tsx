
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ProductsManager from '../components/admin/ProductsManager';
import OrdersManager from '../components/admin/OrdersManager';
import OrderLogs from '../components/admin/OrderLogs';

const Admin: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");

  // Simple admin authentication check - in a real app, use proper auth
  const [isAuthenticated] = useState(true); // For demo purposes

  if (!isAuthenticated) {
    return (
      <div className="container px-4 py-8 flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold mb-4">{t('adminAccessDenied')}</h1>
        <Button onClick={() => navigate('/')}>{t('backToHome')}</Button>
      </div>
    );
  }

  return (
    <div className="container px-4 pt-4 pb-20">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold ml-2">{t('adminDashboard')}</h1>
      </div>

      {/* Tabs for different admin functions */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="products">{t('manageProducts')}</TabsTrigger>
          <TabsTrigger value="orders">{t('activeOrders')}</TabsTrigger>
          <TabsTrigger value="logs">{t('orderLogs')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="mt-6">
          <ProductsManager />
        </TabsContent>
        
        <TabsContent value="orders" className="mt-6">
          <OrdersManager />
        </TabsContent>

        <TabsContent value="logs" className="mt-6">
          <OrderLogs />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
