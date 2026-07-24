'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: 'dashboard' },
    { name: 'Floor Heatmap', path: '/floor-heatmap', icon: 'layers' },
    { name: 'Washrooms', path: '/washrooms', icon: 'wc' },
    { name: 'Incidents', path: '/incidents', icon: 'warning' },
    { name: 'Device Status', path: '/device-status', icon: 'router' },
    { name: 'Reports', path: '/reports', icon: 'description' },
    { name: 'Audit Log', path: '/audit-log', icon: 'history' },
    { name: 'Profile', path: '/profile', icon: 'person' },
    { name: 'Settings', path: '/settings', icon: 'settings' }
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-[260px] bg-surface-container-lowest border-r border-outline-variant flex flex-col gap-xs p-md shadow-sm z-50 overflow-y-auto custom-scrollbar">
      <div className="mb-lg px-xs">
        <h1 className="font-headline-lg text-headline-lg text-primary">AAI Smart</h1>
        <p className="font-body-md text-body-md text-secondary">Terminal 2 Ops</p>
      </div>

      <div className="flex items-center gap-md p-sm mb-lg bg-surface-container-low rounded-xl border border-outline-variant/30">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            alt="Terminal Admin Avatar"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOnZXv1RPqIag8weDPPi-tEwIEIL9cYR-FIWIWLSesltWkYvwrsHEiys6BmPu00LDuG5yo8UFnkUNPS6OCVfgy5AsjV4-z-gi0q2rHaDu5q3K6U53cvq8xn_26_nXQDPxxjJQPkb8wfYfjz0bZNOU6q9uzHpdUq_D7SHE3SznXxnOKasFAAXWt1Y_0aNBs-NmmtvkRg1dVD1EJbaR2_2i_3zj3fpv6lLH3HKH6D4ySFkX9RvW1JQacHqblhwWDSEjAnMgQ4BjBNKw"
          />
        </div>
        <div className="overflow-hidden">
          <p className="font-body-md text-body-md font-bold text-on-surface truncate">Alex Thompson</p>
          <p className="font-caption text-caption text-on-surface-variant">T2 Ops Lead</p>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-base">
        {navItems.map((item) => {
          // Exact logic to determine if current path is active
          const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
          
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-md px-md py-sm transition-colors rounded-xl cursor-pointer ${
                isActive
                  ? 'bg-primary-container/15 text-primary font-bold'
                  : 'text-secondary hover:bg-surface-container-high'
              }`}
            >
              <span 
                className="material-symbols-outlined" 
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className="font-body-md text-body-md">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-md border-t border-outline-variant flex flex-col gap-base">
        <Link 
          href="/logout"
          className="flex items-center gap-md px-md py-sm text-error hover:bg-error-container/10 transition-colors rounded-xl font-body-md text-body-md"
        >
          <span className="material-symbols-outlined">logout</span>
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}
