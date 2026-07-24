'use client';

import React from 'react';
import PortalLayout from '@/components/layouts/PortalLayout';

export default function TerminalLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalLayout role="TERMINAL_ADMIN" showSearch={true}>
      {children}
    </PortalLayout>
  );
}
