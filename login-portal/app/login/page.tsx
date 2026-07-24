'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  
  // State variables
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [callbackUrl, setCallbackUrl] = useState('');
  const [roleDetection, setRoleDetection] = useState<{
    role: 'ADMIN' | 'TERMINAL' | 'AUDITOR' | null;
    label: string;
    colorClass: string;
    isValid: boolean;
  }>({ role: null, label: 'Unrecognized Format', colorClass: 'bg-slate-100 text-slate-500 border-slate-200', isValid: false });

  // Read query parameters
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      setCallbackUrl(searchParams.get('callbackUrl') || '');
    }
  }, []);

  // Live Role Detector
  useEffect(() => {
    const id = userId.trim().toUpperCase();
    if (!id) {
      setRoleDetection({
        role: null,
        label: 'Enter User ID',
        colorClass: 'bg-slate-100 text-slate-500 border-slate-200',
        isValid: false
      });
      return;
    }

    if (/^AP-\d{3}$/.test(id)) {
      setRoleDetection({
        role: 'ADMIN',
        label: 'ADMINISTRATOR',
        colorClass: 'bg-blue-550/10 bg-blue-50 text-blue-700 border-blue-200 shadow-sm',
        isValid: true
      });
    } else if (/^TP-\d{3}$/.test(id)) {
      setRoleDetection({
        role: 'TERMINAL',
        label: 'TERMINAL OPERATOR',
        colorClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm',
        isValid: true
      });
    } else if (/^ALP-\d{3}$/.test(id)) {
      setRoleDetection({
        role: 'AUDITOR',
        label: 'SYSTEM AUDITOR',
        colorClass: 'bg-violet-50 text-violet-700 border-violet-200 shadow-sm',
        isValid: true
      });
    } else {
      setRoleDetection({
        role: null,
        label: 'Invalid ID Format',
        colorClass: 'bg-rose-50 text-rose-700 border-rose-200',
        isValid: false
      });
    }
  }, [userId]);

  // Form submission handler
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const formattedUserId = userId.trim().toUpperCase();

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: formattedUserId, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Successful login - determine redirect target
      if (callbackUrl) {
        window.location.href = callbackUrl;
      } else {
        const adminUrl = process.env.NEXT_PUBLIC_ADMIN_PORTAL_URL || 'http://localhost:3001';
        const terminalUrl = process.env.NEXT_PUBLIC_TERMINAL_PORTAL_URL || 'http://localhost:3002';
        const auditUrl = process.env.NEXT_PUBLIC_AUDIT_PORTAL_URL || 'http://localhost:3003';

        if (data.role === 'ADMIN') {
          window.location.href = `${adminUrl}/admin/dashboard`;
        } else if (data.role === 'TERMINAL') {
          window.location.href = `${terminalUrl}/`;
        } else if (data.role === 'AUDITOR') {
          window.location.href = `${auditUrl}/`;
        } else {
          setErrorMsg('Authenticated but role mapping could not be completed.');
          setIsLoading(false);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Incorrect credentials. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#f8f9ff] p-4 text-[#0b1c30]">
      {/* Decorative Glowing Backdrop Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Main Container */}
      <main className="w-full max-w-[460px] z-10">
        <div className="bg-white border border-[#c2c6d7] rounded-2xl p-8 shadow-xl relative">
          
          {/* Top Logo and Title */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/20 mb-4">
              <span className="material-symbols-outlined text-3xl text-white font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
                account_balance
              </span>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#004cb5]">Airports Authority of India</p>
            <h1 className="text-xl font-extrabold text-[#0b1c30] tracking-wide mt-1">Smart Washroom Gateway</h1>
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            
            {/* User ID Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#424654]" htmlFor="userId-input">
                  User ID
                </label>
                {/* Live Role Badge */}
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all duration-300 ${roleDetection.colorClass}`}>
                  {roleDetection.label}
                </span>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#727786] text-xl">
                  badge
                </span>
                <input
                  id="userId-input"
                  name="userId"
                  type="text"
                  required
                  placeholder="e.g. AP-001, TP-001, ALP-001"
                  autoComplete="username"
                  className="w-full pl-11 pr-4 py-3 bg-[#f8f9ff] border border-[#c2c6d7] rounded-xl text-[#0b1c30] font-medium placeholder-[#727786]/50 focus:outline-none focus:border-[#004cb5] focus:ring-1 focus:ring-[#004cb5]/30 transition-all"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#424654] px-1" htmlFor="password-input">
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#727786] text-xl">
                  lock
                </span>
                <input
                  id="password-input"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full pl-11 pr-12 py-3 bg-[#f8f9ff] border border-[#c2c6d7] rounded-xl text-[#0b1c30] placeholder-[#727786]/50 focus:outline-none focus:border-[#004cb5] focus:ring-1 focus:ring-[#004cb5]/30 transition-all font-mono"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#727786] hover:text-[#0b1c30] transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div id="login-error-container" className="flex items-start gap-2 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs p-3.5 rounded-xl">
                <span className="material-symbols-outlined text-sm mt-0.5">error</span>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              id="login-submit-button"
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white py-3.5 px-4 rounded-xl font-bold tracking-wide shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <span className="material-symbols-outlined text-lg">login</span>
                </>
              )}
            </button>
          </form>

          {/* Form helper details for developer visibility */}
          <div className="mt-8 border-t border-[#c2c6d7] pt-6 text-center">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#727786] mb-2">Gate Access Protocol</h2>
            <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-400">
              <div className="bg-[#f8f9ff] p-2 rounded-lg border border-[#c2c6d7]/40">
                <span className="block font-bold text-[#004cb5]">ADMIN</span>
                <span className="font-mono text-[#424654]">AP-001</span>
              </div>
              <div className="bg-[#f8f9ff] p-2 rounded-lg border border-[#c2c6d7]/40">
                <span className="block font-bold text-[#006e2e]">TERMINAL</span>
                <span className="font-mono text-[#424654]">TP-001</span>
              </div>
              <div className="bg-[#f8f9ff] p-2 rounded-lg border border-[#c2c6d7]/40">
                <span className="block font-bold text-[#a70031]">AUDITOR</span>
                <span className="font-mono text-[#424654]">ALP-001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Small page footer */}
        <footer className="mt-6 text-center text-[10px] text-[#727786]">
          <span>&copy; 2026 Airports Authority of India. Security Operations Gate.</span>
        </footer>
      </main>
    </div>
  );
}
