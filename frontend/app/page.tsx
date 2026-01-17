export default function Home() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        XBorg Technical Challenge ?
      </h1>
      <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '2rem' }}>
        Full-stack user profile management application
      </p>
      
      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', width: '300px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#10b981' }}>Backend API</h2>
          <p style={{ fontWeight: '600' }}>http://localhost:3001</p>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '1rem' }}>
            <strong>Endpoints:</strong>
            <ul style={{ textAlign: 'left', marginLeft: '1rem', marginTop: '0.5rem' }}>
              <li>GET /auth/login/google</li>
              <li>GET /auth/validate/google</li>
              <li>GET /user/profile</li>
              <li>PUT /user/profile</li>
            </ul>
          </p>
        </div>
        
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', width: '300px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#10b981' }}>Frontend</h2>
          <p style={{ fontWeight: '600' }}>http://localhost:3000</p>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '1rem' }}>
            <strong>Features:</strong>
            <ul style={{ textAlign: 'left', marginLeft: '1rem', marginTop: '0.5rem' }}>
              <li>Google OAuth authentication</li>
              <li>JWT session management</li>
              <li>Profile management</li>
              <li>Persistent sessions</li>
            </ul>
          </p>
        </div>
      </div>
      
      <div style={{ maxWidth: '48rem', margin: '3rem auto 0', backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Quick Test</h2>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
          To test the backend API, open a new terminal and run:
        </p>
        <div style={{ backgroundColor: '#f3f4f6', padding: '1rem', borderRadius: '0.375rem', fontFamily: 'monospace', textAlign: 'left', fontSize: '0.875rem' }}>
          curl -X POST http://localhost:3001/auth/test-login \<br />
          &nbsp;&nbsp;-H "Content-Type: application/json" \<br />
          &nbsp;&nbsp;-d '{"email":"test@example.com","firstName":"Test","lastName":"User"}'
        </div>
        <p style={{ color: '#6b7280', marginTop: '1.5rem', fontSize: '0.875rem' }}>
          This will return a JWT token for testing protected endpoints.
        </p>
      </div>
    </div>
  )
}
