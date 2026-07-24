'use client';

import { useState, useEffect } from 'react';
import UserProfileDrawer from './UserProfileDrawer';

interface HeaderProps {
  title: string;
  placeholder?: string;
  onSearchChange?: (val: string) => void;
}

export default function Header({ title, placeholder = 'Search facilities...', onSearchChange }: HeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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

  return (
    <>
      <header className="sticky top-0 z-40 bg-surface-container-lowest/80 backdrop-blur-md border-b border-outline-variant px-margin-page py-4 flex justify-between items-center shrink-0">
        <h1 className="text-headline-md font-headline-md text-on-surface leading-tight font-bold">{title}</h1>
        <div className="flex items-center gap-6">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-on-surface-variant">search</span>
            <input
              className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full text-body-sm w-64 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
              placeholder={placeholder}
              type="text"
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </div>
          <button className="relative p-2 rounded-full hover:bg-surface-variant transition-colors text-on-surface-variant">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
          </button>
          <button className="p-2 hover:bg-surface-variant rounded-full transition-colors text-on-surface-variant">
            <span className="material-symbols-outlined">help_outline</span>
          </button>
          <div className="h-8 w-[1px] bg-outline-variant"></div>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-3 hover:opacity-85 transition-opacity cursor-pointer border-none bg-transparent p-0 text-left"
          >
            <div className="text-right hidden sm:block">
              <p className="font-label-md text-label-md font-bold text-on-surface leading-normal">{userName}</p>
              <p className="text-[10px] text-primary font-semibold leading-normal">AeroMetric Insight</p>
            </div>
            <img
              alt="Super Admin Profile Avatar"
              className="w-8 h-8 rounded-full border border-outline-variant object-cover"
              src={avatar}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuA2GesO-YP3f1uzTyVSdDUVpTEQxwdDpd6APuZ5Pg-4I9-r_TTny1j4oiP3R4pKdldmFGyU-IAGdNzHrgTHSGJQdbQh1b1SKxNKdg14pUdaRUHI3XwkWXFDlOMyT5rAAZ8PL1WmbIpc6CciQyHFBwqmHBPgi6Rl5MWmiJgaYdirFOKPsiW5Y1CbLLC_BbaKg3mexsmf-yiP9C-8rjbthogxCvLVivtGoUY5O3fvSSn5DC-cVEE5_L5TNft_ccIWXVzSwliR3Uuis8Ds';
              }}
            />
          </button>
        </div>
      </header>

      <UserProfileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}

