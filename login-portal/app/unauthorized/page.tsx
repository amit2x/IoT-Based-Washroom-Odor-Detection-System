'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
  const router = useRouter();
  
  const [userRole, setUserRole] = useState('');
  const [requiredRole, setRequiredRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      setUserRole(searchParams.get('userRole') || 'UNKNOWN');
      setRequiredRole(searchParams.get('requiredRole') || 'AUTHORIZED');
    }
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/';
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const handleGoToAllowedPortal = () => {
    const adminUrl = process.env.NEXT_PUBLIC_ADMIN_PORTAL_URL || 'http://localhost:3001';
    const terminalUrl = process.env.NEXT_PUBLIC_TERMINAL_PORTAL_URL || 'http://localhost:3002';
    const auditUrl = process.env.NEXT_PUBLIC_AUDIT_PORTAL_URL || 'http://localhost:3003';

    if (userRole === 'ADMIN') {
      window.location.href = `${adminUrl}/admin/dashboard`;
    } else if (userRole === 'TERMINAL') {
      window.location.href = `${terminalUrl}/`;
    } else if (userRole === 'AUDITOR') {
      window.location.href = `${auditUrl}/`;
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#070b13] p-4 text-[#e2e8f0]">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-rose-600/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

      <main className="w-full max-w-[480px] z-10">
        <div className="backdrop-blur-md bg-slate-900/60 border border-slate-800/80 rounded-2xl p-8 shadow-2xl text-center">
          
          {/* Warning Icon */}
          <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-rose-500/5">
            <span className="material-symbols-outlined text-3xl text-rose-500 font-bold">
              gpp_bad
            </span>
          </div>

          <h1 className="text-2xl font-extrabold text-white tracking-wide">Access Restricted</h1>
          <p className="text-slate-400 text-xs mt-2 uppercase tracking-widest font-semibold">RBAC Validation Failed</p>

          {/* Details Panel */}
          <div className="bg-slate-950/60 border border-slate-800/60 rounded-xl p-5 my-6 text-left space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 uppercase tracking-wider font-semibold">Your Current Role:</span>
              <span className="font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/50 uppercase">
                {userRole}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 uppercase tracking-wider font-semibold">Required Role:</span>
              <span className="font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase">
                {requiredRole}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed text-center pt-2 border-t border-slate-900">
              The credentials you logged in with do not have permission to view this specific management portal.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {userRole !== 'UNKNOWN' && (
              <button
                onClick={handleGoToAllowedPortal}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3 px-4 rounded-xl font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-blue-500/10 active:scale-[0.98]"
              >
                Go to My Permitted Portal
              </button>
            )}
            
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="w-full bg-slate-950/60 hover:bg-slate-800 text-slate-300 py-3 px-4 rounded-xl border border-slate-800/80 font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                  <span>Clearing Session...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">logout</span>
                  <span>Logout & Switch Account</span>
                </>
              )}
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
