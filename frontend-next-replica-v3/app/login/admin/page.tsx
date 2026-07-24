'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/admin/dashboard');
    }, 1200);
  };

  return (
    <div className="bg-background min-h-screen flex flex-col font-body-md">
      {/* TopAppBar */}
      <header className="bg-surface-container-lowest dark:bg-on-background border-b border-outline-variant dark:border-outline fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-center w-full px-margin-page py-4 max-w-container-max mx-auto">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              account_balance
            </span>
            <span className="text-title-lg font-headline-md font-bold text-primary dark:text-primary-fixed-dim">
              AAI Smart Washroom
            </span>
          </div>
          <div className="hidden md:flex gap-8">
            <Link className="text-primary dark:text-primary-fixed-dim border-b-2 border-primary dark:border-primary-fixed-dim font-bold font-label-md text-label-md py-1" href="/">Home</Link>
            <a className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim transition-colors font-label-md text-label-md py-1" href="#">About Us</a>
            <a className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim transition-colors font-label-md text-label-md py-1" href="#">System Overview</a>
            <a className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim transition-colors font-label-md text-label-md py-1" href="#">Contact</a>
          </div>
          <Link href="/" className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-md text-label-md flex items-center gap-2 hover:opacity-90 transition-all font-bold">
            Back to Portal
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center pt-24 px-margin-page">
        {/* Login Container */}
        <div className="w-full max-w-[480px] bg-white rounded-xl login-card border border-outline-variant/30 overflow-hidden">
          <div className="p-10 flex flex-col items-center">
            {/* AAI Logo Placeholder */}
            <div className="mb-8 flex flex-col items-center">
              <span className="material-symbols-outlined text-6xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                account_balance
              </span>
              <div className="text-center mt-2">
                <div className="text-primary font-bold text-sm tracking-widest">AIRPORTS AUTHORITY</div>
                <div className="text-primary font-bold text-sm tracking-widest leading-none">OF INDIA</div>
              </div>
            </div>
            <h1 className="font-headline-md text-headline-md text-on-surface mb-8 tracking-tight uppercase font-bold text-center">
              AAI ADMIN LOGIN
            </h1>
            <form onSubmit={handleSubmit} className="w-full space-y-6">
              {/* Username Field */}
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface-variant block ml-1" htmlFor="username">
                  Username
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                    person
                  </span>
                  <input
                    className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-on-surface font-body-md text-body-md placeholder:text-on-surface-variant/50 focus:outline-none"
                    id="username"
                    placeholder="Enter username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              {/* Password Field */}
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface-variant block ml-1" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                    lock
                  </span>
                  <input
                    className="w-full pl-12 pr-12 py-3.5 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-on-surface font-body-md text-body-md placeholder:text-on-surface-variant/50 focus:outline-none"
                    id="password"
                    placeholder="Enter password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary focus:outline-none"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>
              {/* Action Button */}
              <div className="pt-4">
                <button
                  disabled={isLoading}
                  className="w-full bg-primary text-on-primary py-4 rounded-lg font-headline-md text-title-lg flex items-center justify-center gap-2 hover:bg-primary-container active:scale-[0.98] transition-all shadow-md shadow-primary/20 disabled:opacity-50 disabled:pointer-events-none"
                  type="submit"
                >
                  {isLoading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">progress_activity</span>
                      Authenticating...
                    </>
                  ) : (
                    <>
                      Login
                      <span className="material-symbols-outlined">login</span>
                    </>
                  )}
                </button>
              </div>
              {/* Extra Actions */}
              <div className="flex justify-between items-center text-label-md font-label-md text-primary">
                <a className="hover:underline" href="#">Forgot password?</a>
                <Link className="flex items-center gap-1 hover:underline font-bold" href="/login/terminal">
                  Terminal Login
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </form>
          </div>
          {/* Bottom Accent */}
          <div className="h-1.5 w-full bg-gradient-to-r from-primary to-primary-container"></div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-highest border-t border-outline-variant mt-auto">
        <div className="w-full py-stack-lg px-margin-page flex flex-col md:flex-row justify-between items-center gap-stack-md max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <span className="text-title-lg font-headline-md text-on-background font-bold">AAI Smart Washroom</span>
            <span className="text-body-sm font-body-sm text-on-surface-variant">
              © 2024 Airports Authority of India. All rights reserved.
            </span>
          </div>
          <div className="flex gap-8">
            <a className="text-on-surface-variant hover:text-primary font-label-md text-label-md transition-colors" href="#">Privacy Policy</a>
            <a className="text-on-surface-variant hover:text-primary font-label-md text-label-md transition-colors" href="#">Terms of Service</a>
            <a className="text-on-surface-variant hover:text-primary font-label-md text-label-md transition-colors" href="#">Support</a>
            <a className="text-on-surface-variant hover:text-primary font-label-md text-label-md transition-colors" href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
