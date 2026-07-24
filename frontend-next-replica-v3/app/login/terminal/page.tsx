'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TerminalLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberSession, setRememberSession] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/admin/dashboard');
    }, 1200);
  };

  return (
    <div className="bg-gradient-to-br from-[#f8f9ff] via-[#e8f5e9]/10 to-[#e5eeff] min-h-screen flex flex-col font-body-md">
      {/* Top AppBar */}
      <header className="bg-surface-container-lowest border-b border-outline-variant flex justify-between items-center w-full px-margin-page py-4 max-w-container-max mx-auto top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-2xl">account_balance</span>
          <h1 className="text-title-lg font-headline-md font-bold text-primary">AAI Smart Washroom</h1>
        </div>
        <div className="flex items-center gap-stack-md">
          <Link className="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors" href="/">Home</Link>
          <a className="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors" href="#">Support</a>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Login Container */}
        <div className="relative z-10 w-full max-w-[480px]">
          <div className="bg-surface-container-lowest rounded-xl p-10 shadow-lg border border-outline-variant">
            {/* Brand & Title Section */}
            <div className="flex flex-col items-center mb-10 text-center">
              <div className="bg-surface-container-low p-4 rounded-full mb-6">
                <svg fill="none" height="60" viewBox="0 0 100 100" width="60" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 10L20 80H35L50 45L65 80H80L50 10Z" fill="#006e2e"></path>
                  <circle cx="50" cy="30" fill="#006e2e" r="6"></circle>
                </svg>
              </div>
              <p className="text-on-surface-variant font-label-md text-label-md tracking-widest uppercase mb-1">
                Airports Authority of India
              </p>
              <h2 className="text-headline-md font-headline-md text-on-background font-bold">
                TERMINAL ADMIN LOGIN
              </h2>
              <p className="text-on-surface-variant font-body-sm text-body-sm mt-2">
                Access real-time washroom operational data for your terminal
              </p>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-on-surface-variant font-label-md text-label-md block" htmlFor="username">
                  Username
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-outline group-focus-within:text-secondary">
                    <span className="material-symbols-outlined text-[20px]">person</span>
                  </div>
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-background border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary focus:outline-none transition-all text-body-md font-body-md"
                    id="username"
                    placeholder="Enter username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-on-surface-variant font-label-md text-label-md block" htmlFor="password">
                    Password
                  </label>
                  <a className="text-secondary font-label-md text-label-md hover:underline" href="#">
                    Forgot?
                  </a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-outline group-focus-within:text-secondary">
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                  </div>
                  <input
                    className="w-full pl-10 pr-12 py-3 bg-background border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary focus:outline-none transition-all text-body-md font-body-md"
                    id="password"
                    placeholder="Enter password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface-variant focus:outline-none transition-colors"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  className="rounded border-outline-variant text-secondary focus:ring-secondary cursor-pointer"
                  id="remember"
                  type="checkbox"
                  checked={rememberSession}
                  onChange={(e) => setRememberSession(e.target.checked)}
                />
                <label className="ml-2 text-on-surface-variant font-body-sm text-body-sm cursor-pointer" htmlFor="remember">
                  Remember terminal session
                </label>
              </div>

              <button
                disabled={isLoading}
                className="w-full bg-secondary hover:bg-on-secondary-container text-on-secondary font-bold py-4 rounded-lg transition-all active:scale-[0.98] shadow-lg shadow-secondary/10 flex justify-center items-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
                type="submit"
              >
                {isLoading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    Authenticating...
                  </>
                ) : (
                  <>
                    <span>Login</span>
                    <span className="material-symbols-outlined">login</span>
                  </>
                )}
              </button>
            </form>

            {/* Help/Back Section */}
            <div className="mt-8 pt-8 border-t border-outline-variant text-center">
              <p className="text-on-surface-variant font-body-sm text-body-sm">
                Not a Terminal Admin?
                <Link className="text-primary font-bold hover:underline ml-1" href="/login/admin">
                  Switch to Super Admin
                </Link>
              </p>
            </div>
          </div>

          {/* Context Info */}
          <div className="mt-8 flex justify-center gap-stack-lg opacity-60">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
              <span className="text-label-md font-label-md text-on-surface-variant">Secure SSL Connection</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-secondary">terminal</span>
              <span className="text-label-md font-label-md text-on-surface-variant">V3.2.0-STABLE</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-highest border-t border-outline-variant w-full py-stack-lg px-margin-page flex flex-col md:flex-row justify-between items-center gap-stack-md mt-auto">
        <p className="text-on-surface-variant font-body-sm text-body-sm">© 2024 Airports Authority of India. All rights reserved.</p>
        <div className="flex gap-stack-md">
          <a className="text-on-surface-variant font-label-md text-label-md hover:text-secondary transition-colors" href="#">Privacy Policy</a>
          <a className="text-on-surface-variant font-label-md text-label-md hover:text-secondary transition-colors" href="#">Terms of Service</a>
          <a className="text-on-surface-variant font-label-md text-label-md hover:text-secondary transition-colors" href="#">Support</a>
          <a className="text-on-surface-variant font-label-md text-label-md hover:text-secondary transition-colors" href="#">Contact</a>
        </div>
      </footer>
    </div>
  );
}
