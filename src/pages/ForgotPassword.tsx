
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MailQuestion } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-bold">{t('forgotPassword')}</CardTitle>
            <CardDescription className="text-center">{t('contactAdminForPasswordReset')}</CardDescription>
          </CardHeader>
          
          <CardContent className="flex flex-col items-center py-8">
            <MailQuestion className="h-16 w-16 text-primary mb-6" />
            <p className="text-center mb-6">
              {t('passwordResetMessage')}
            </p>
            <p className="text-center font-medium">
              {t('contactEmail')}: support@example.com
            </p>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <Button 
              variant="outline" 
              onClick={() => navigate('/login')}
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> {t('backToLogin')}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
