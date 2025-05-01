
import React, { useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Home, ShoppingBag, User, Menu } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '../context/CartContext';

const Layout: React.FC = () => {
  const { t } = useLanguage();
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col pb-16">
      <div className="flex-grow">
        <Outlet />
      </div>
      
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-around py-2">
          <Link 
            to="/app" 
            className={`flex flex-col items-center p-2 ${
              location.pathname === '/app' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <Home size={20} />
            <span className="text-xs mt-1">{t('home')}</span>
          </Link>
          
          <Link 
            to="/app/categories" 
            className={`flex flex-col items-center p-2 ${
              location.pathname === '/app/categories' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <Menu size={20} />
            <span className="text-xs mt-1">{t('categories')}</span>
          </Link>
          
          <Link 
            to="/app/cart" 
            className={`flex flex-col items-center p-2 relative ${
              location.pathname === '/app/cart' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] bg-primary" 
                variant="secondary"
              >
                {totalItems}
              </Badge>
            )}
            <span className="text-xs mt-1">{t('orders')}</span>
          </Link>
          
          <Link 
            to="/app/account" 
            className={`flex flex-col items-center p-2 ${
              location.pathname === '/app/account' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <User size={20} />
            <span className="text-xs mt-1">{t('account')}</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
