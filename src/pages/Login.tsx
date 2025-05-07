import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Lock, User } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '../lib/supabase';
import { AuthError, User } from '@supabase/supabase-js';

const Login: React.FC = () => {
  const { t, language, setLanguage, availableLanguages } = useLanguage();
  const { signIn, user, isAdmin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect
    if (user) {
      navigate(isAdmin ? '/app/admin' : '/app');
    }
  }, [user, isAdmin, navigate]);

  // Create test accounts on first load (only in development)
  useEffect(() => {
    const createTestAccounts = async () => {
      try {
        // Check if admin account exists
        const { data: existingUsers } = await supabase
          .from('users')
          .select('email')
          .in('email', ['admin@example.com', 'customer@example.com']);
        
        if (existingUsers && existingUsers.length >= 2) {
          console.log('Test accounts already exist');
          return;
        }

        // Create admin test account
        const { error: adminError, data: adminAuthData } = await supabase.auth.admin.createUser({
          email: 'admin@example.com',
          password: 'admin123',
          email_confirm: true,
        });

        if (!adminError && adminAuthData?.user) {
          // Add to users table
          await supabase.from('users').insert({
            id: adminAuthData.user.id,
            email: 'admin@example.com',
            role: 'admin',
          });
          console.log('Admin account created');
        }

        // Create customer test account
        const { error: customerError, data: customerAuthData } = await supabase.auth.admin.createUser({
          email: 'customer@example.com',
          password: 'customer123',
          email_confirm: true,
        });

        if (!customerError && customerAuthData?.user) {
          // Add to users table
          await supabase.from('users').insert({
            id: customerAuthData.user.id,
            email: 'customer@example.com',
            role: 'customer',
          });
          console.log('Customer account created');
        }
      } catch (error) {
        console.error('Error creating test accounts:', error);
      }
    };

    createTestAccounts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      <div className="w-full max-w-md">
        <div className="flex justify-end mb-4">
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
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
        </div>
        
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-bold">{t('login')}</CardTitle>
            <CardDescription className="text-center">{t('appName')}</CardDescription>
          </CardHeader>
          
          <CardContent>
            {connectionError && (
              <div className="mb-4 p-3 bg-red-50 text-red-800 rounded-md border border-red-200">
                <p className="font-medium">Connection Error</p>
                <p className="text-sm">
                  Unable to connect to Supabase. Please check your Supabase configuration or internet connection.
                </p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t('password')}</Label>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-primary hover:underline"
                  >
                    {t('forgotPassword')}
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t('signingIn') : t('signIn')}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <div className="text-sm text-muted-foreground">
              {t('demoCredentialsHeading')}:
              <ul className="mt-2 list-disc pl-5">
                <li>Admin: admin@example.com / admin123</li>
                <li>Customer: customer@example.com / customer123</li>
              </ul>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
