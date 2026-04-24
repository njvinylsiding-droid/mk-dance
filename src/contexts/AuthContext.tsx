import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface Student {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  member_since: string;
  level: string;
  total_classes_attended: number;
  preferred_styles?: string[];
  avatar_url?: string;
  phone?: string;
}

interface AuthContextType {
  student: Student | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  signup: (data: { email: string; password: string; first_name: string; last_name: string; phone?: string }) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  student: null,
  loading: true,
  login: async () => ({}),
  signup: async () => ({}),
  logout: async () => {},
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const token = localStorage.getItem('mk_student_token');
    if (token) {
      verifySession(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifySession = async (token: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('student-portal', {
        body: { action: 'verify', token },
      });
      if (error || data?.error) {
        localStorage.removeItem('mk_student_token');
        setStudent(null);
      } else {
        setStudent(data.student);
      }
    } catch {
      localStorage.removeItem('mk_student_token');
      setStudent(null);
    } finally {
      setLoading(false);
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('student-portal', {
        body: { action: 'login', email, password },
      });
      if (error) return { error: 'Network error. Please try again.' };
      if (data?.error) return { error: data.error };
      localStorage.setItem('mk_student_token', data.token);
      setStudent(data.student);
      return {};
    } catch {
      return { error: 'Something went wrong. Please try again.' };
    }
  }, []);

  const signup = useCallback(async (params: { email: string; password: string; first_name: string; last_name: string; phone?: string }) => {
    try {
      const { data, error } = await supabase.functions.invoke('student-portal', {
        body: { action: 'signup', ...params },
      });
      if (error) return { error: 'Network error. Please try again.' };
      if (data?.error) return { error: data.error };
      localStorage.setItem('mk_student_token', data.token);
      setStudent(data.student);
      return {};
    } catch {
      return { error: 'Something went wrong. Please try again.' };
    }
  }, []);

  const logout = useCallback(async () => {
    const token = localStorage.getItem('mk_student_token');
    if (token) {
      await supabase.functions.invoke('student-portal', {
        body: { action: 'logout', token },
      });
    }
    localStorage.removeItem('mk_student_token');
    setStudent(null);
  }, []);

  return (
    <AuthContext.Provider value={{ student, loading, login, signup, logout, isAuthenticated: !!student }}>
      {children}
    </AuthContext.Provider>
  );
};
