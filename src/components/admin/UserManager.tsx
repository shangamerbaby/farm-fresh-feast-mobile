
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { User, Plus, Trash, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';

interface UserType {
  id: string;
  email: string;
  role: 'admin' | 'customer';
  dateAdded: string;
}

// Sample users - in a real app, these would come from a database
const initialUsers: UserType[] = [
  { 
    id: '1', 
    email: 'admin@example.com', 
    role: 'admin',
    dateAdded: '2023-01-15'
  },
  { 
    id: '2', 
    email: 'customer@example.com', 
    role: 'customer',
    dateAdded: '2023-02-20'
  },
];

const UserManager: React.FC = () => {
  const { t } = useLanguage();
  const [users, setUsers] = useState<UserType[]>(initialUsers);
  const [open, setOpen] = useState(false);
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'customer'>('customer');

  const handleAddUser = () => {
    if (!email || !password) {
      toast.error(t('pleaseCompleteAllFields'));
      return;
    }
    
    // Check if email already exists
    if (users.some(user => user.email === email)) {
      toast.error(t('emailAlreadyExists'));
      return;
    }
    
    const newUser: UserType = {
      id: Date.now().toString(),
      email,
      role,
      dateAdded: new Date().toISOString().split('T')[0]
    };
    
    setUsers([...users, newUser]);
    toast.success(t('userAdded'));
    
    // Reset form
    setEmail('');
    setPassword('');
    setRole('customer');
    setOpen(false);
  };

  const handleDeleteUser = (id: string) => {
    // Prevent deleting the main admin account
    if (id === '1') {
      toast.error(t('cannotDeleteMainAdmin'));
      return;
    }
    
    setUsers(users.filter(user => user.id !== id));
    toast.success(t('userDeleted'));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{t('manageUsers')}</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t('addUser')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('addNewUser')}</DialogTitle>
              <DialogDescription>{t('createAccountForCustomer')}</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">{t('password')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">{t('role')}</Label>
                <Select value={role} onValueChange={(value) => setRole(value as 'admin' | 'customer')}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('selectRole')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">{t('admin')}</SelectItem>
                    <SelectItem value="customer">{t('customer')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                {t('cancel')}
              </Button>
              <Button onClick={handleAddUser}>
                {t('addUser')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{user.email}</p>
                    <div className="flex items-center">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        user.role === 'admin' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {user.role}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {t('added')}: {user.dateAdded}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDeleteUser(user.id)}
                  disabled={user.id === '1'} // Prevent deleting the main admin
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserManager;
