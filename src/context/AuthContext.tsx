
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  userData: { role: string } | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error: any }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<{ role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (data.session?.user) {
        setUser(data.session.user);
        
        // Get user data from users table
        const { data: userData } = await supabase
          .from('users')
          .select('role')
          .eq('id', data.session.user.id)
          .single();
        
        setUserData(userData);
      }
      
      setLoading(false);
    };
    
    checkSession();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          
          // Get user data from users table
          const { data: userData } = await supabase
            .from('users')
            .select('role')
            .eq('id', session.user.id)
            .single();
          
          setUserData(userData);
        } else {
          setUser(null);
          setUserData(null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Get user data from users table
      const { data: userData } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .single();
      
      setUserData(userData);
      
      return { success: true, error: null };
    } catch (error) {
      return { success: false, error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserData(null);
  };

  const isAdmin = userData?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading,
        signIn,
        signOut,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
