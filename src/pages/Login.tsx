
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import LanguageSelector from '../components/auth/LanguageSelector';
import ConnectionError from '../components/auth/ConnectionError';
import LoginForm from '../components/auth/LoginForm';
import DemoCredentials from '../components/auth/DemoCredentials';
import TestAccountsInitializer from '../components/auth/TestAccountsInitializer';

const Login: React.FC = () => {
  const { t } = useLanguage();
  const { signIn, user, isAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const navigate = useNavigate();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate(isAdmin ? '/app/admin' : '/app');
    }
  }, [user, isAdmin, navigate]);

  // Handle login form submission
  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setConnectionError(false);
    
    try {
      const { success, error } = await signIn(email, password);
      
      if (success) {
        toast.success(t('loginSuccess'));
        // Navigation will happen in the useEffect
      } else if (error) {
        console.error('Login error:', error);
        
        // Check if it's a connection error
        if (error.message === 'Failed to fetch' || error.status === 0) {
          setConnectionError(true);
          toast.error(t('connectionError') || 'Connection error. Please check your Supabase configuration.');
        } else {
          // Regular auth error
          toast.error(error?.message || t('invalidCredentials'));
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setConnectionError(true);
      toast.error(t('connectionError') || 'Connection error. Please check your internet connection or Supabase configuration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-50 dark:bg-gray-900">
      <TestAccountsInitializer />
      <div className="w-full max-w-md">
        <div className="flex justify-end mb-4">
          <LanguageSelector />
        </div>
        
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-bold">{t('login')}</CardTitle>
            <CardDescription className="text-center">{t('appName')}</CardDescription>
          </CardHeader>
          
          <CardContent>
            {connectionError && <ConnectionError />}
            <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <DemoCredentials />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
