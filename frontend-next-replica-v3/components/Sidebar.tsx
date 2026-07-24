'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const [userName, setUserName] = useState('AAI Super Admin');
  const [avatar, setAvatar] = useState(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA2GesO-YP3f1uzTyVSdDUVpTEQxwdDpd6APuZ5Pg-4I9-r_TTny1j4oiP3R4pKdldmFGyU-IAGdNzHrgTHSGJQdbQh1b1SKxNKdg14pUdaRUHI3XwkWXFDlOMyT5rAAZ8PL1WmbIpc6CciQyHFBwqmHBPgi6Rl5MWmiJgaYdirFOKPsiW5Y1CbLLC_BbaKg3mexsmf-yiP9C-8rjbthogxCvLVivtGoUY5O3fvSSn5DC-cVEE5_L5TNft_ccIWXVzSwliR3Uuis8Ds'
  );

  const updateProfile = () => {
    const savedName = localStorage.getItem('user_profile_name');
    const savedAvatar = localStorage.getItem('user_profile_avatar');
    if (savedName) setUserName(savedName);
    if (savedAvatar) setAvatar(savedAvatar);
  };

  useEffect(() => {
    updateProfile();
    window.addEventListener('user-profile-updated', updateProfile);
    return () => {
      window.removeEventListener('user-profile-updated', updateProfile);
    };
  }, []);

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: 'dashboard' },
    { name: 'Terminals', href: '/admin/terminals', icon: 'domain' },
    { name: 'Incidents', href: '/admin/incidents/active', icon: 'warning' },
    { name: 'Analytics', href: '/admin/analytics', icon: 'bar_chart' },
    { name: 'Users', href: '/admin/users', icon: 'group' },
    { name: 'Audit Logs', href: '/admin/audit-logs', icon: 'history' },
    { name: 'Settings', href: '/admin/settings', icon: 'settings' },
  ];

  return (
    <aside className="h-screen w-[240px] fixed left-0 top-0 bg-white border-r border-[#c2c6d7] z-50 flex flex-col p-4 transition-all duration-300">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 px-2 py-4 mb-8">
        <span className="material-symbols-outlined text-[#004cb5] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          account_balance
        </span>
        <div className="flex flex-col">
          <span className="text-[18px] leading-[24px] font-bold text-[#004cb5] leading-tight">AAI SMART</span>
          <span className="text-[10px] font-medium tracking-widest uppercase text-[#424654]">
            Washroom Admin
          </span>
        </div>
      </div>

      {/* Profile Section */}
      <Link
        href="/admin/profile"
        className="bg-[#eff4ff] rounded-xl p-3 mb-6 flex items-center gap-3 border border-[#c2c6d7]/30 hover:bg-[#dce9ff] transition-colors group cursor-pointer text-[#0b1c30]"
      >
        <div className="w-10 h-10 rounded-full bg-[#004cb5]/10 flex items-center justify-center text-[#004cb5] font-bold overflow-hidden">
          <img
            alt="Admin Avatar"
            className="w-full h-full object-cover"
            src={avatar}
          />
        </div>
        <div className="overflow-hidden flex-1">
          <p className="text-[14px] leading-[20px] font-bold truncate group-hover:text-[#004cb5] transition-colors text-[#0b1c30]">{userName}</p>
          <p className="text-[11px] text-[#424654] flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#006e2e] inline-block"></span> Active
          </p>
        </div>
      </Link>

      {/* Nav Items */}
      <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-[#87fb9c] text-[#007432] font-bold'
                  : 'text-[#424654] hover:bg-[#eff4ff] hover:text-[#004cb5]'
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : undefined }}
              >
                {item.icon}
              </span>
              <span className="text-[16px] leading-[24px] font-normal">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mt-auto pt-4 border-t border-[#c2c6d7]">
        <Link
          href="/logout"
          className="flex items-center gap-3 px-3 py-3 text-[#ba1a1a] hover:bg-[#ffdad6] rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="text-[16px] leading-[24px] font-normal">Logout</span>
        </Link>
      </div>
    </aside>
  );
}
