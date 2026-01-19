'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import Cookies from 'js-cookie';
import api from '../lib/api';

interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  github_url?: string;
  resume_url?: string;
  motivation?: string;
  challenge_url?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
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
    const storedToken = Cookies.get('auth_token'); // Changed from 'access_token' to 'auth_token'
    
    if (storedToken) {
      setToken(storedToken);
      fetchUserProfile(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserProfile = async (userToken: string) => {
    try {
      const response = await api.get('/user/profile');
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = useCallback((newToken: string, userData: User) => {
    Cookies.set('auth_token', newToken, { expires: 7 }); // Changed from 'access_token' to 'auth_token'
    setToken(newToken);
    setUser(userData);
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    Cookies.remove('auth_token'); // Changed from 'access_token' to 'auth_token'
    Cookies.remove('user');
    setToken(null);
    setUser(null);
    window.location.href = '/auth/signin';
  }, []);

  const updateUser = async (userData: Partial<User>) => {
    if (!token) return;

    try {
      const response = await api.put('/user/profile', userData);
      setUser(prev => prev ? { ...prev, ...response.data.user } : response.data.user);
    } catch (error) {
      console.error('Failed to update user profile:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      isLoading, 
      login, 
      logout,
      updateUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
};