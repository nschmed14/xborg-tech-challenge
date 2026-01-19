'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  full_name: string;
  avatar_url: string;
  github_url: string;
  resume_url: string;
  motivation: string;
  challenge_url: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, userData: any) => void;
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

  // Create axios instance with interceptors
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  });

  // Add token to requests if it exists
  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const currentToken = Cookies.get('auth_token');
        if (currentToken) {
          config.headers.Authorization = `Bearer ${currentToken}`;
          console.log('Adding auth header to request:', config.url);
        } else {
          console.log('No auth token found for request:', config.url);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  useEffect(() => {
    // Check for existing token on mount
    const savedToken = Cookies.get('auth_token');
    if (savedToken) {
      setToken(savedToken);
      fetchUserProfile(savedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserProfile = async (userToken: string) => {
    console.log('fetchUserProfile called with token:', userToken.substring(0, 20) + '...');
    try {
      const response = await api.get('/user/profile', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log('fetchUserProfile response:', response.data);
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = (newToken: string, userData: any) => {
    console.log('AuthContext login called with token:', newToken.substring(0, 20) + '...', 'userData:', userData);
    Cookies.set('auth_token', newToken, { expires: 7 });
    console.log('AuthContext: cookie set, setting token and user state');
    setToken(newToken);
    setUser(userData);
    setIsLoading(false);
    console.log('AuthContext: login complete, user should be set');
  };

  const logout = () => {
    Cookies.remove('auth_token');
    setUser(null);
    setToken(null);
    window.location.href = '/auth/signin';
  };

  const updateUser = async (userData: Partial<User>) => {
    if (!token) return;

    try {
      const response = await api.put('/user/profile', userData);
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      console.error('Failed to update user profile:', error);
      throw error;
    }
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};