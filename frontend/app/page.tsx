'use client';

export default function HomePage() {
  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth endpoint
    window.location.href = 'http://localhost:3001/auth/login/google';
  };

  const handleTestLogin = () => {
    // Redirect to test login endpoint
    window.location.href = 'http://localhost:3001/auth/test-login';
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>XBorg Technical Challenge</h1>
      <p>Welcome to the user profile management system.</p>
      
      <div style={{ marginTop: '2rem', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Sign In</h2>
        <p>For testing purposes, use the test login button:</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <button
            onClick={handleTestLogin}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#48bb78',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Test Login (Development)
          </button>
          
          <div style={{ textAlign: 'center', color: '#666' }}>or</div>
          
          <button
            onClick={handleGoogleLogin}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#4285f4',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Sign in with Google (Requires OAuth Setup)
          </button>
        </div>
      </div>
      
      <div style={{ marginTop: '2rem', fontSize: '14px', color: '#666' }}>
        <p>This application demonstrates:</p>
        <ul>
          <li>Google OAuth 2.0 authentication</li>
          <li>JWT token-based authorization</li>
          <li>User profile management</li>
          <li>Persistent sessions</li>
        </ul>
      </div>
    </div>
  );
}
