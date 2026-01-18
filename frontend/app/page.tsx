'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (hasRedirected || isLoading) return;

    if (user) {
      setHasRedirected(true);
      router.push('/profile');
    } else {
      setHasRedirected(true);
      router.push('/auth/signin');
    }
  }, [user, isLoading, router, hasRedirected]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4">Redirecting...</p>
      </div>
    </div>
  );
}
