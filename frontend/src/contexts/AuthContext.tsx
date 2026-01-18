'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import Cookies from 'js-cookie';

interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const storedToken = Cookies.get('access_token');
    const storedUser = Cookies.get('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing user data:', e);
        Cookies.remove('user');
        Cookies.remove('access_token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((newToken: string, userData: User) => {
    Cookies.set('access_token', newToken, { expires: 7 });
    Cookies.set('user', JSON.stringify(userData), { expires: 7 });
    setToken(newToken);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    Cookies.remove('access_token');
    Cookies.remove('user');
    setToken(null);
    setUser(null);
    window.location.href = '/auth/signin';
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};