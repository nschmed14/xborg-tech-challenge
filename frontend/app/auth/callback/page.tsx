'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export const dynamic = 'force-dynamic';

export default function AuthCallbackPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const processedRef = useRef(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || processedRef.current) return;

    // Mark as processed to prevent duplicate execution
    processedRef.current = true;

    console.log('=== CALLBACK PAGE DEBUG ===');
    console.log('Window location:', window.location.href);
    console.log('Window search:', window.location.search);

    // Get token and user from URL query params
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userParam = urlParams.get('user');

    console.log('URL Params received:', {
      hasToken: !!token,
      tokenLength: token?.length || 0,
      tokenPreview: token ? token.substring(0, 50) + '...' : 'null',
      hasUserParam: !!userParam,
      userParamLength: userParam?.length || 0,
      userParamPreview: userParam ? userParam.substring(0, 100) + '...' : 'null',
    });

    if (token && userParam) {
      try {
        const userData = JSON.parse(decodeURIComponent(userParam));
        console.log('✓ Successfully parsed user data:', userData);
        console.log('✓ Calling login function with token and user data');
        login(token, userData);
        console.log('✓ Login function called');
        
        console.log('✓ Executing redirect to /profile immediately');
        // Use window.location for guaranteed redirect
        window.location.href = '/profile';
      } catch (error) {
        console.error('❌ Error parsing user data:', error);
        setError('Invalid authentication response');
        setTimeout(() => {
          window.location.href = '/auth/signin?error=invalid_response';
        }, 2000);
      }
    } else {
      console.error('❌ Missing authentication parameters');
      console.log('Backend did not send token and user parameters');
      setError('Missing authentication parameters');
      setTimeout(() => {
        window.location.href = '/auth/signin?error=missing_params';
      }, 2000);
    }
  }, [isClient, login]);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold">Authentication Error</p>
          <p className="mt-2">{error}</p>
          <p className="text-sm text-gray-500 mt-4">Redirecting to sign in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4">Completing authentication...</p>
        <p className="text-sm text-gray-500 mt-2">You will be redirected shortly</p>
      </div>
    </div>
  );
}