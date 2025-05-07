
import { useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const TestAccountsInitializer: React.FC = () => {
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

  return null;
};

export default TestAccountsInitializer;
