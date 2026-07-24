'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [timeStr, setTimeStr] = useState('14:45 PM');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const minutesStr = minutes < 10 ? '0' + minutes : minutes;
      setTimeStr(`${hours}:${minutesStr} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Map pathnames to title / subtitle
  const getHeaderDetails = () => {
    switch (pathname) {
      case '/':
      case '/dashboard':
        return {
          title: 'Airport Terminal Control',
          subtitle: 'Terminal 2 Dashboard',
          showSearch: true
        };
      case '/floor-heatmap':
        return {
          title: 'Floor Heatmap - Terminal 2',
          subtitle: 'Netaji Subhash Chandra Bose International Airport',
          showSearch: false
        };
      case '/washrooms':
      case '/washrooms/total-detail':
        return {
          title: 'Washrooms Inventory',
          subtitle: 'Netaji Subhash Chandra Bose International Airport',
          showSearch: false
        };
      case '/live-whi':
        return {
          title: 'Live WHI Feed',
          subtitle: 'Netaji Subhash Chandra Bose International Airport',
          showSearch: false
        };
      case '/incidents':
      case '/incidents/active-detail':
      case '/incidents/summary-details':
        return {
          title: 'Active Incidents Dashboard',
          subtitle: 'Terminal 2 Incidents Feed',
          showSearch: false
        };
      case '/device-status':
        return {
          title: 'Device Status',
          subtitle: 'Terminal 2 IoT Network',
          showSearch: false
        };
      case '/reports':
        return {
          title: 'Reports & Analytics',
          subtitle: 'Netaji Subhash Chandra Bose International Airport',
          showSearch: false
        };
      case '/audit-log':
        return {
          title: 'Audit Log & History',
          subtitle: 'Security Action Registry',
          showSearch: false
        };
      case '/profile':
        return {
          title: 'User Profile & Roles',
          subtitle: 'Ops Lead Terminal Control',
          showSearch: false
        };
      case '/settings':
        return {
          title: 'System Settings',
          subtitle: 'Hygiene & Security Configuration',
          showSearch: false
        };
      default:
        return {
          title: 'Airport Terminal Control',
          subtitle: 'Terminal 2 Ops',
          showSearch: false
        };
    }
  };

  const details = getHeaderDetails();

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-260px)] h-20 bg-surface-bright flex items-center justify-between px-lg border-b border-outline-variant z-40">
      <div className="flex flex-col">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">{details.title}</h2>
        <p className="font-caption text-caption text-secondary">{details.subtitle}</p>
      </div>

      <div className="flex items-center gap-lg">
        {details.showSearch && (
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-secondary">search</span>
            <input
              type="text"
              placeholder="Search facilities, devices..."
              className="bg-surface-container-low border-none rounded-full pl-10 pr-4 py-1.5 text-body-md w-64 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
            />
          </div>
        )}

        <div className="flex items-center gap-sm bg-primary/10 px-md py-xs rounded-full border border-primary/20">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          <span className="font-label-sm text-label-sm text-primary font-bold">System Live</span>
        </div>

        <div className="flex items-center gap-md">
          <button className="material-symbols-outlined p-xs hover:bg-surface-container-high rounded-full transition-all text-on-surface-variant cursor-pointer">
            notifications
          </button>
          <button className="material-symbols-outlined p-xs hover:bg-surface-container-high rounded-full transition-all text-on-surface-variant cursor-pointer">
            schedule
          </button>
          <div className="h-6 w-[1px] bg-outline-variant/30"></div>
          <span className="font-label-sm text-label-sm font-bold text-on-surface-variant">{timeStr}</span>
        </div>
      </div>
    </header>
  );
}
