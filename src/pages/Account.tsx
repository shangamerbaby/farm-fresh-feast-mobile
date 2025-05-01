
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, LogOut, User, Settings } from 'lucide-react';
import { toast } from 'sonner';

interface UserData {
  email: string;
  role: string;
  isAuthenticated: boolean;
}

const Account: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    toast.success(t('logoutSuccess'));
    navigate('/login');
  };

  if (!userData) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container px-4 pt-4 pb-20">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/app')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold ml-2">{t('account')}</h1>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>{t('accountInfo')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="font-medium">{userData.email}</p>
              <p className="text-sm text-muted-foreground capitalize">{userData.role}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {userData.role === 'admin' && (
        <Button 
          variant="outline" 
          className="w-full mb-4 justify-start"
          onClick={() => navigate('/app/admin')}
        >
          <Settings className="mr-2 h-4 w-4" />
          {t('adminDashboard')}
        </Button>
      )}

      <Button 
        variant="destructive" 
        className="w-full justify-start"
        onClick={handleLogout}
      >
        <LogOut className="mr-2 h-4 w-4" />
        {t('logout')}
      </Button>
    </div>
  );
};

export default Account;
