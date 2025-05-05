
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, LogOut, User, Settings } from 'lucide-react';
import { toast } from 'sonner';

const Account: React.FC = () => {
  const { t } = useLanguage();
  const { user, userData, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    toast.success(t('logoutSuccess'));
    navigate('/login');
  };

  if (!user) {
    return null;
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
              <p className="font-medium">{user.email}</p>
              <p className="text-sm text-muted-foreground capitalize">{userData?.role || 'user'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {isAdmin && (
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
