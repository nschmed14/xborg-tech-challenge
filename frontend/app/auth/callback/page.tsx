'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Get token from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
      // Store token in localStorage for future requests
      localStorage.setItem('auth_token', token);
      
      // Redirect to profile page
      router.push('/profile');
    } else {
      // No token found, redirect to home
      router.push('/');
    }
  }, [router]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Authenticating...</h2>
      <p>Please wait while we complete your authentication.</p>
    </div>
  );
}
