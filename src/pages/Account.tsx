import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Account: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // In a real app, you'd check if the user is logged in
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return (
      <div className="container px-4 py-8 flex flex-col items-center">
        <h1 className="text-xl font-bold mb-4">{t('account')}</h1>
        <p className="mb-4">{t('dontHaveAccount')}</p>
        <Button onClick={() => navigate('/login')}>{t('login')}</Button>
      </div>
    );
  }

  return (
    <div className="container px-4 pt-4 pb-20">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold ml-2">{t('account')}</h1>
      </div>

      {/* Account content would go here */}
    </div>
  );
};

export default Account;
