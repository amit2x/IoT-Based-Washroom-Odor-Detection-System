'use client';

import { useEffect } from 'react';

export default function LogoutPage() {
  useEffect(() => {
    // 1. Clear session cookies on client side
    document.cookie = 'aai_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
    document.cookie = 'auth_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';

    // 2. Clear localStorage variables for profile drawer
    localStorage.removeItem('user_profile_name');
    localStorage.removeItem('user_profile_email');
    localStorage.removeItem('user_profile_phone');
    localStorage.removeItem('user_profile_avatar');
    localStorage.removeItem('user_profile_role');
    localStorage.removeItem('user_profile_dept');

    // 3. Redirect to the Login Portal
    const loginPortalUrl = process.env.NEXT_PUBLIC_LOGIN_PORTAL_URL || 'http://localhost:3000';
    window.location.href = loginPortalUrl;
  }, []);

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'monospace',
      background: '#070b13',
      color: '#e2e8f0',
      gap: '16px'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid #3b82f6',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      <span>Signing out safely...</span>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
