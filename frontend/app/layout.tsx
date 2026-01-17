export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif', backgroundColor: '#f9fafb' }}>
        <nav style={{ backgroundColor: 'white', padding: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>XBorg</h1>
          </div>
        </nav>
        <main style={{ maxWidth: '80rem', margin: '0 auto', padding: '1.5rem 1rem' }}>
          {children}
        </main>
      </body>
    </html>
  )
}
