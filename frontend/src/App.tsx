import React from 'react';

function App() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#f0f4f8', color: '#333', padding: '2rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '1rem' }}>Welcome to Legal Estate</h1>
      <p style={{ maxWidth: '600px', textAlign: 'center', fontSize: '1.125rem' }}>
        This is your secure and modern legal case management platform. Upload documents, manage your cases,
        and collaborate with clients and staff — all in one place.
      </p>
    </main>
  );
}

export default App;
