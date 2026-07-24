'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import { useAuthStore } from '@/store/useAuthStore';

interface PortalLayoutProps {
  children: React.ReactNode;
  role: 'AAI_ADMIN' | 'TERMINAL_ADMIN';
  showSearch?: boolean;
}

export default function PortalLayout({ 
  children, 
  role, 
  showSearch = true 
}: PortalLayoutProps) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-900 text-white font-mono">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Verifying Session Integrity...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex overflow-hidden w-screen select-none">
      {/* Dynamic Sidebar */}
      <Sidebar role={role} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-slate-50">
        {/* Top bar */}
        <TopHeader showSearch={showSearch} />

        {/* Dynamic page contents */}
        <main className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}
