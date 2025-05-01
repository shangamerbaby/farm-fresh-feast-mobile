
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  User, Settings, Globe, CreditCard, 
  MapPin, Bell, HelpCircle, LogOut 
} from 'lucide-react';
import { toast } from "@/components/ui/sonner";

const Account: React.FC = () => {
  const { t, language, setLanguage, availableLanguages } = useLanguage();
  
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as any);
    toast(`Language changed to ${e.target.options[e.target.selectedIndex].text}`);
  };

  return (
    <div className="container px-4 pt-4 pb-20">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-xl font-bold">Restaurant User</h1>
        <p className="text-muted-foreground">restaurant@example.com</p>
      </div>

      {/* Account sections */}
      <div className="space-y-6">
        {/* Settings section */}
        <Card>
          <CardContent className="p-0">
            <div className="p-4">
              <h2 className="font-semibold flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                {t('settings')}
              </h2>
            </div>
            <Separator />
            
            {/* Language setting */}
            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{t('language')}</span>
              </div>
              <select
                value={language}
                onChange={handleLanguageChange}
                className="text-sm border rounded-md p-1"
              >
                {availableLanguages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
            <Separator />
            
            {/* Payment Methods */}
            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center">
                <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Payment Methods</span>
              </div>
              <Button variant="ghost" size="sm">
                Manage
              </Button>
            </div>
            <Separator />
            
            {/* Address */}
            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Delivery Address</span>
              </div>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </div>
            <Separator />
            
            {/* Notifications */}
            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center">
                <Bell className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Notifications</span>
              </div>
              <Button variant="ghost" size="sm">
                Manage
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Support section */}
        <Card>
          <CardContent className="p-0">
            <div className="p-4">
              <h2 className="font-semibold flex items-center">
                <HelpCircle className="h-4 w-4 mr-2" />
                Support
              </h2>
            </div>
            <Separator />
            
            <Button variant="ghost" className="w-full justify-start p-4 rounded-none">
              Contact Us
            </Button>
            <Separator />
            
            <Button variant="ghost" className="w-full justify-start p-4 rounded-none">
              FAQs
            </Button>
            <Separator />
            
            <Button variant="ghost" className="w-full justify-start p-4 rounded-none">
              Privacy Policy
            </Button>
          </CardContent>
        </Card>

        {/* Logout button */}
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => toast("This would log you out in a real app")}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Account;
