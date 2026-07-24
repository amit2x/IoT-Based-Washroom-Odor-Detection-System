'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UserProfileRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/profile');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-on-background">
      <div className="flex flex-col items-center gap-4">
        <span className="material-symbols-outlined text-4xl text-primary animate-spin">
          sync
        </span>
        <p className="font-label-md text-label-md text-on-surface-variant font-bold">
          Redirecting to profile...
        </p>
      </div>
    </div>
  );
}
