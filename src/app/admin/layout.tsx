'use client';

import React from 'react';
import PortalLayout from '@/components/layouts/PortalLayout';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalLayout role="AAI_ADMIN" showSearch={true}>
      {children}
    </PortalLayout>
  );
}
