'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [hasProcessed, setHasProcessed] = useState(false);

  useEffect(() => {
    // Only process once
    if (hasProcessed) return;

    const token = searchParams.get('token');
    const userParam = searchParams.get('user');

    if (token && userParam) {
      try {
        const userData = JSON.parse(decodeURIComponent(userParam));
        login(token, userData);
        setHasProcessed(true);
        
        // Redirect after a short delay
        setTimeout(() => {
          router.push('/profile');
        }, 100);
      } catch (error) {
        console.error('Error parsing user data:', error);
        router.push('/auth/signin?error=invalid_response');
      }
    } else {
      router.push('/auth/signin?error=missing_params');
    }
  }, [searchParams, login, router, hasProcessed]);

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
