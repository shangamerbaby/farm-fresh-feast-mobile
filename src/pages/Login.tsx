
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Lock, User } from 'lucide-react';
import { toast } from 'sonner';

// Sample users for demonstration - in a real app, these would be in a database
const USERS = [
  { email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { email: 'customer@example.com', password: 'customer123', role: 'customer' }
];

const Login: React.FC = () => {
  const { t, language, setLanguage, availableLanguages } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate authentication
    const user = USERS.find(user => user.email === email && user.password === password);
    
    if (user) {
      // Store user info in localStorage (in a real app, use a proper auth system)
      localStorage.setItem('currentUser', JSON.stringify({
        email: user.email,
        role: user.role,
        isAuthenticated: true
      }));
      
      toast.success(t('loginSuccess'));
      
      // Redirect based on role
      if (user.role === 'admin') {
        navigate('/app/admin');
      } else {
        navigate('/app');
      }
    } else {
      toast.error(t('invalidCredentials'));
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
              
              <Button type="submit" className="w-full">{t('signIn')}</Button>
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
