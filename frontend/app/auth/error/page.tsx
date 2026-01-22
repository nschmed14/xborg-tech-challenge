'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const message = searchParams.get('message');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
        <div>
          <h2 className="text-center text-2xl font-extrabold text-red-400">
            Authentication Failed
          </h2>
        </div>
        <div className="bg-red-900 border border-red-700 rounded-md p-4 mt-4">
          <p className="text-red-100 text-sm font-medium">{error || 'Unknown Error'}</p>
          {message && (
            <p className="text-red-200 text-xs mt-2">{message}</p>
          )}
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-300 mb-4">
            If you're stuck on "Completing authentication...", please check:
          </p>
          <ul className="text-gray-400 text-sm space-y-2 mb-6 text-left">
            <li>• Google OAuth redirect URI is configured in Google Console</li>
            <li>• Backend URL is: xborg-tech-challenge-production.up.railway.app</li>
            <li>• Callback path is: /auth/validate/google</li>
          </ul>
          <Link href="/auth/signin">
            <button className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              Back to Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  );
}
