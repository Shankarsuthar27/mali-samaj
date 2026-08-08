import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { AdminUser } from '../types/admin';

interface AdminAuthContextType {
  isAdmin: boolean;
  adminProfile: AdminUser | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const LOCAL_ADMIN_KEY = 'mali_samaj_admin_session';

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminProfile, setAdminProfile] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAdminSession();
  }, []);

  const checkAdminSession = async () => {
    setLoading(true);
    try {
      // Check local storage session for initial fallback admin
      const localSession = localStorage.getItem(LOCAL_ADMIN_KEY);
      if (localSession) {
        const parsed = JSON.parse(localSession);
        setIsAdmin(true);
        setAdminProfile(parsed);
        setLoading(false);
        return;
      }

      if (isSupabaseConfigured()) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: adminData } = await supabase
            .from('admin_users')
            .select('*')
            .eq('user_id', session.user.id)
            .single();

          if (adminData) {
            setIsAdmin(true);
            setAdminProfile(adminData);
          }
        }
      }
    } catch (err) {
      console.error('Error checking admin session:', err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);

    // Initial default credentials check: admin2233 / admin@2233
    if (username === 'admin2233' && password === 'admin@2233') {
      const mockAdmin: AdminUser = {
        id: 'admin-001',
        user_id: '00000000-0000-0000-0000-000000000001',
        username: 'admin2233',
        role: 'admin',
        created_at: new Date().toISOString(),
      };

      // Try Supabase Auth first if configured
      if (isSupabaseConfigured()) {
        try {
          const email = 'admin2233@malisamaj.org';
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (!error && data.user) {
            const { data: adminRecord } = await supabase
              .from('admin_users')
              .select('*')
              .eq('user_id', data.user.id)
              .single();

            if (adminRecord) {
              setIsAdmin(true);
              setAdminProfile(adminRecord);
              localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(adminRecord));
              setLoading(false);
              return { success: true };
            }
          }
        } catch (e) {
          console.warn('Supabase auth login failed, falling back to local admin mode', e);
        }
      }

      // Local admin session fallback
      setIsAdmin(true);
      setAdminProfile(mockAdmin);
      localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(mockAdmin));
      setLoading(false);
      return { success: true };
    }

    // Try custom login with email/password if valid email supplied
    if (isSupabaseConfigured() && username.includes('@')) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: username,
          password,
        });

        if (error) {
          setLoading(false);
          return { success: false, error: error.message };
        }

        if (data.user) {
          const { data: adminRecord } = await supabase
            .from('admin_users')
            .select('*')
            .eq('user_id', data.user.id)
            .single();

          if (adminRecord) {
            setIsAdmin(true);
            setAdminProfile(adminRecord);
            localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(adminRecord));
            setLoading(false);
            return { success: true };
          } else {
            await supabase.auth.signOut();
            setLoading(false);
            return { success: false, error: 'Access Denied: Not registered as an administrator.' };
          }
        }
      } catch (err: any) {
        setLoading(false);
        return { success: false, error: err.message || 'Login failed' };
      }
    }

    setLoading(false);
    return { success: false, error: 'गलत यूज़रनेम या पासवर्ड! (Invalid Admin Credentials)' };
  };

  const logout = async () => {
    localStorage.removeItem(LOCAL_ADMIN_KEY);
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
    setIsAdmin(false);
    setAdminProfile(null);
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin, adminProfile, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
