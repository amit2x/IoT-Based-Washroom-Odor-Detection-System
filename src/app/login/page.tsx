'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { KeyRound, Shield, AlertTriangle, Fingerprint, Building2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, user, initialize } = useAuthStore();

  const [adminId, setAdminId] = useState('ADM-7700-X');
  const [accessKey, setAccessKey] = useState('•••••••••••••');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'AAI_ADMIN') {
        router.push('/admin/dashboard');
      } else {
        router.push('/terminal/dashboard');
      }
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminId.trim()) {
      setError('Administrator ID is required.');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    const success = await login(adminId, accessKey);
    setIsSubmitting(false);

    if (!success) {
      setError('Initialization failed. Verify secret key integrity.');
    }
  };

  const handleBiometric = async () => {
    setError(null);
    setIsSubmitting(true);
    // Simulate biometric login as AAI_ADMIN
    const success = await login('ADM-7700-X', 'biometric-handshake');
    setIsSubmitting(false);
    if (!success) {
      setError('Biometric handshake handshake failed.');
    }
  };

  return (
    <div className="vault-bg min-h-screen flex flex-col items-center justify-between font-mono text-slate-800 select-none relative">
      <div className="vault-bg-glow absolute inset-0 z-0 pointer-events-none"></div>

      {/* Main Form Area */}
      <main className="flex-grow flex flex-col items-center justify-center w-full px-4 pt-12 pb-24 z-10">
        
        {/* Brand Header */}
        <section className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded mb-4 shadow-lg">
            <Shield className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold tracking-widest text-slate-900 mb-1">
            AUDIT_LOCK
          </h1>
          <p className="text-xs tracking-[0.2em] text-slate-500 uppercase">
            Institutional Vault Access
          </p>
        </section>

        {/* Login Card */}
        <section className="bg-white w-full max-w-md p-10 rounded-sm shadow-md border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-sm flex items-center space-x-2 text-rose-600 text-xs font-bold uppercase">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Administrator ID Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-600 uppercase tracking-wider">
                <Building2 className="h-4 w-4 text-slate-400" />
                Administrator ID
              </label>
              <input
                type="text"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-sm font-mono text-lg tracking-wider focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                disabled={isSubmitting}
              />
            </div>

            {/* Secret Access Key Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-600 uppercase tracking-wider">
                <KeyRound className="h-4 w-4 text-slate-400" />
                Secret Access Key
              </label>
              <input
                type="password"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-sm font-mono text-lg tracking-widest focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                disabled={isSubmitting}
              />
            </div>

            {/* Primary Action */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-sm flex items-center justify-center gap-3 transition-colors shadow-md disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Initialize Session
                  <KeyRound className="h-5 w-5" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <span className="relative bg-white px-3 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                OR
              </span>
            </div>

            {/* Biometric Option */}
            <button
              type="button"
              onClick={handleBiometric}
              disabled={isSubmitting}
              className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-4 rounded-sm flex items-center justify-center gap-3 transition-colors disabled:opacity-50"
            >
              <Fingerprint className="h-6 w-6" />
              Biometric Handshake
            </button>
          </form>
        </section>

        {/* Utility Links */}
        <div className="w-full max-w-md flex justify-between mt-6 px-1 text-[11px] text-slate-500 uppercase tracking-wider">
          <a href="#" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
            Reset Credentials
          </a>
          <a href="#" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
            Contact Security
          </a>
        </div>
      </main>

      {/* Footer / Status Bar */}
      <footer className="w-full bg-white border-t border-slate-200 py-3 px-6 text-[10px] uppercase tracking-widest text-slate-500 flex flex-wrap justify-between items-center z-10">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            System Ready
          </div>
          <div className="hidden md:flex items-center gap-2">
            Server: <span className="text-slate-800">US-EAST-1_NODE_B</span>
          </div>
        </div>
        <div className="flex gap-8">
          <div>Ver: <span className="text-slate-800">v4.12.08-PRIME</span></div>
          <div className="hidden sm:block">Enc: <span className="text-slate-800">AES-GCM-256</span></div>
        </div>
      </footer>
    </div>
  );
}
