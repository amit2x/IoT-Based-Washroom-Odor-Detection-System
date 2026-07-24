'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { 
  ShieldCheck, 
  Activity, 
  FileText, 
  LogOut, 
  HelpCircle,
  Terminal
} from 'lucide-react';

interface SidebarProps {
  role: 'AAI_ADMIN' | 'TERMINAL_ADMIN';
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);

  const isAdmin = role === 'AAI_ADMIN';

  // Navigation config based on role
  const navigation = isAdmin
    ? [
        {
          name: 'AI Admin',
          href: '/admin/dashboard',
          icon: ShieldCheck,
        },
        {
          name: 'Terminal Admin',
          href: '/admin/terminal-admin',
          icon: Terminal,
        },
        {
          name: 'Audit Logs',
          href: '/admin/audit',
          icon: FileText,
        },
        {
          name: 'System Logs',
          href: '/admin/system',
          icon: Activity,
        },
      ]
    : [
        {
          name: 'Terminal Admin',
          href: '/terminal/dashboard',
          icon: Terminal,
        },
        {
          name: 'Logs',
          href: '/terminal/logs',
          icon: FileText,
        },
      ];

  const sidebarBg = isAdmin ? 'bg-[#1a2b4b]' : 'bg-[#0f172a]';
  const logoText = isAdmin ? 'AUDIT_LOCK' : 'CONSOLE';
  const subText = isAdmin ? 'Enterprise Security' : 'System Console';

  return (
    <aside className={`w-64 ${sidebarBg} text-slate-300 flex flex-col shrink-0 h-full`}>
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-700/50 flex items-center space-x-3">
        <div className="bg-blue-600 p-2 rounded-lg text-white">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-white font-bold text-sm leading-tight tracking-wider font-mono">
            {logoText}
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
            {subText}
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="mt-8 flex-1 px-3 space-y-1">
        <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest px-2 mb-2">
          Ecosystem
        </p>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg font-semibold'
                  : 'hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-5 h-5 mr-3 shrink-0" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="mt-auto border-t border-slate-700/50 px-3 py-6 space-y-1">
        <a
          href="#"
          className="flex items-center px-4 py-3 text-sm font-medium rounded-md hover:text-white hover:bg-slate-800 transition-colors"
        >
          <HelpCircle className="w-5 h-5 mr-3 opacity-60" />
          Support
        </a>
        <button
          onClick={() => logout()}
          className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-md hover:text-white hover:bg-slate-800 transition-colors text-left"
        >
          <LogOut className="w-5 h-5 mr-3 opacity-60" />
          Sign Out
        </button>

        <div className="p-3 pt-4 border-t border-slate-800/50 flex items-center space-x-2">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
            {isAdmin ? 'System Stable' : 'v4.2.0-STABLE'}
          </span>
        </div>
      </div>
    </aside>
  );
}
