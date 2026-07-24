'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export default function Home() {
  const router = useRouter();
  const { initialize, isAuthenticated, user, isLoading } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && user) {
        if (user.role === 'AAI_ADMIN') {
          router.replace('/admin/dashboard');
        } else {
          router.replace('/terminal/dashboard');
        }
      } else {
        router.replace('/login');
      }
    }
  }, [isAuthenticated, user, isLoading, router]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#0f172a] text-white font-mono select-none">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span>Verifying Security Protocol...</span>
      </div>
    </div>
  );
}

