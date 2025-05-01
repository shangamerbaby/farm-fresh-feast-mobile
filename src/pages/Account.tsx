
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  User,
  Settings,
  ShoppingBag,
  Languages,
  ArrowLeft,
  LogOut,
  Shield,
} from 'lucide-react';

const Account: React.FC = () => {
  const { t, language, setLanguage, availableLanguages } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="container px-4 pt-4 pb-20">
      {/* Header with back button */}
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold ml-2">{t('account')}</h1>
      </div>

      {/* User info section */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle>Guest User</CardTitle>
              <CardDescription>guest@example.com</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Account options */}
      <div className="space-y-4">
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-lg">{t('settings')}</CardTitle>
          </CardHeader>
          <CardContent className="py-0 space-y-0 divide-y">
            <Link to="/orders" className="flex items-center py-3">
              <ShoppingBag className="h-5 w-5 mr-3 text-primary" />
              <span>{t('orders')}</span>
            </Link>
            
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center">
                <Languages className="h-5 w-5 mr-3 text-primary" />
                <span>{t('language')}</span>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="text-sm border rounded-md p-1"
              >
                {availableLanguages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <Link to="/admin" className="flex items-center py-3">
              <Shield className="h-5 w-5 mr-3 text-primary" />
              <span>{t('adminDashboard')}</span>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardFooter className="justify-center py-4">
            <Button variant="outline" className="w-full">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Account;
