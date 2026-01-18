'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !isLoading) {
      router.push('/profile');
    }
  }, [user, isLoading, router]);

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3001/auth/login/google';
  };

  const handleTestLogin = () => {
    window.location.href = 'http://localhost:3001/auth/test/login';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-white">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign in to XBorg
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Complete the technical challenge
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Sign in with Google
          </button>
          
          <div className="text-center text-sm text-gray-400 mt-4">
            <p className="mb-2">For testing without Google OAuth:</p>
            <button
              onClick={handleTestLogin}
              className="w-full flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-200 bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              Sign in with Test Account
            </button>
            <p className="mt-2 text-xs text-gray-500">
              Note: Configure real Google OAuth credentials in backend .env for production
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
