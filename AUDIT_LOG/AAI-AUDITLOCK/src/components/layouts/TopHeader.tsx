'use client';

import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { Bell, Search, Settings, ShieldCheck, User } from 'lucide-react';

interface TopHeaderProps {
  showSearch?: boolean;
}

export default function TopHeader({ showSearch = true }: TopHeaderProps) {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40 shrink-0">
      {/* Search Input */}
      <div className="flex-1 max-w-2xl relative">
        {showSearch ? (
          <>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Global search for trace IDs, source IPs, or event types..."
            />
          </>
        ) : (
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-blue-900 tracking-tighter font-mono">
              AUDIT_LOCK
            </h1>
          </div>
        )}
      </div>

      {/* Action / Profile items */}
      <div className="flex items-center space-x-6 ml-8">
        {/* System Uptime Metric */}
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-semibold text-slate-800 tracking-tight">
            System Status:{' '}
            <span className="text-slate-900 font-bold uppercase tracking-wider font-mono">
              Nominal
            </span>
          </span>
        </div>

        <div className="h-8 w-px bg-slate-200"></div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-1 text-slate-600 hover:text-blue-600 transition-colors">
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
          </button>

          {/* Settings */}
          <button className="p-1 text-slate-600 hover:text-blue-600 transition-colors">
            <Settings className="w-6 h-6" />
          </button>

          {/* Profile Details */}
          <div className="flex items-center space-x-3 ml-2">
            {user?.role === 'TERMINAL_ADMIN' && (
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-800 font-mono">
                  {user.id}
                </p>
              </div>
            )}
            <div className="bg-blue-600 h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
              <User className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-800 hidden md:inline font-mono">
              {user?.role === 'AAI_ADMIN' ? 'Admin' : 'Operator'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
