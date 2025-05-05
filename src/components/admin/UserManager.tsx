
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
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
import { supabase } from '../../lib/supabase';

interface UserType {
  id: string;
  email: string;
  role: 'admin' | 'customer';
  created_at: string;
}

const UserManager: React.FC = () => {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'customer'>('customer');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('users').select('*');
      
      if (error) throw error;
      
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error(t('errorFetchingUsers'));
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    if (!email || !password) {
      toast.error(t('pleaseCompleteAllFields'));
      return;
    }
    
    try {
      // First, create the auth user
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });
      
      if (authError) throw authError;
      
      if (!authUser.user) {
        throw new Error('User could not be created');
      }
      
      // Then, add the user metadata to the users table
      const { error: profileError } = await supabase.from('users').insert({
        id: authUser.user.id,
        email,
        role,
        created_at: new Date().toISOString(),
      });
      
      if (profileError) throw profileError;
      
      toast.success(t('userAdded'));
      fetchUsers(); // Refresh the users list
      
      // Reset form
      setEmail('');
      setPassword('');
      setRole('customer');
      setOpen(false);
    } catch (error: any) {
      console.error('Error adding user:', error);
      toast.error(error.message || t('errorAddingUser'));
    }
  };

  const handleDeleteUser = async (id: string, email: string) => {
    const currentUser = await supabase.auth.getUser();
    
    // Prevent deleting own account
    if (currentUser.data.user?.id === id) {
      toast.error(t('cannotDeleteOwnAccount'));
      return;
    }
    
    try {
      // Delete from auth
      const { error: authError } = await supabase.auth.admin.deleteUser(id);
      if (authError) throw authError;
      
      // Delete from users table
      const { error: profileError } = await supabase.from('users').delete().eq('id', id);
      if (profileError) throw profileError;
      
      setUsers(users.filter(user => user.id !== id));
      toast.success(t('userDeleted'));
    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast.error(error.message || t('errorDeletingUser'));
    }
  };

  if (!isAdmin) {
    return <div>{t('adminAccessRequired')}</div>;
  }

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
      
      {loading ? (
        <div className="text-center py-4">{t('loading')}...</div>
      ) : (
        <div className="space-y-4">
          {users.length === 0 ? (
            <div className="text-center py-4">{t('noUsersFound')}</div>
          ) : (
            users.map((user) => (
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
                            {t('added')}: {new Date(user.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDeleteUser(user.id, user.email)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default UserManager;
