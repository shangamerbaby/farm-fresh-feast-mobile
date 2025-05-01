
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ProductsManager from '../components/admin/ProductsManager';
import OrdersManager from '../components/admin/OrdersManager';
import OrderLogs from '../components/admin/OrderLogs';
import UserManager from '../components/admin/UserManager';

const Admin: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    // Check if user is an admin
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.role === 'admin') {
        setIsAdmin(true);
      } else {
        // Redirect non-admin users
        navigate('/app');
      }
    } else {
      // Redirect to login if no user data
      navigate('/login');
    }
  }, [navigate]);

  if (!isAdmin) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container px-4 pt-4 pb-20">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/app')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold ml-2">{t('adminDashboard')}</h1>
      </div>

      {/* Tabs for different admin functions */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="products">{t('manageProducts')}</TabsTrigger>
          <TabsTrigger value="orders">{t('activeOrders')}</TabsTrigger>
          <TabsTrigger value="logs">{t('orderLogs')}</TabsTrigger>
          <TabsTrigger value="users">{t('manageUsers')}</TabsTrigger>
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

        <TabsContent value="users" className="mt-6">
          <UserManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
