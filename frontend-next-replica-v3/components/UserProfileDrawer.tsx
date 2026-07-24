'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UserProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserProfileDrawer({ isOpen, onClose }: UserProfileDrawerProps) {
  const router = useRouter();

  // Profile data state
  const [name, setName] = useState('AAI Super Admin');
  const [email, setEmail] = useState('superadmin@aai.aero');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [role, setRole] = useState('Super Admin');
  const [dept, setDept] = useState('Global Infrastructure Ops');
  const [avatar, setAvatar] = useState(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA2GesO-YP3f1uzTyVSdDUVpTEQxwdDpd6APuZ5Pg-4I9-r_TTny1j4oiP3R4pKdldmFGyU-IAGdNzHrgTHSGJQdbQh1b1SKxNKdg14pUdaRUHI3XwkWXFDlOMyT5rAAZ8PL1WmbIpc6CciQyHFBwqmHBPgi6Rl5MWmiJgaYdirFOKPsiW5Y1CbLLC_BbaKg3mexsmf-yiP9C-8rjbthogxCvLVivtGoUY5O3fvSSn5DC-cVEE5_L5TNft_ccIWXVzSwliR3Uuis8Ds'
  );

  // Edit states
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAvatar, setEditAvatar] = useState('');

  // Load from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem('user_profile_name');
    const savedEmail = localStorage.getItem('user_profile_email');
    const savedPhone = localStorage.getItem('user_profile_phone');
    const savedAvatar = localStorage.getItem('user_profile_avatar');
    const savedRole = localStorage.getItem('user_profile_role');
    const savedDept = localStorage.getItem('user_profile_dept');

    if (savedName) setName(savedName);
    if (savedEmail) setEmail(savedEmail);
    if (savedPhone) setPhone(savedPhone);
    if (savedAvatar) setAvatar(savedAvatar);
    if (savedRole) setRole(savedRole);
    if (savedDept) setDept(savedDept);
  }, []);

  // Sync editing fields when entering edit mode
  const handleStartEditing = () => {
    setEditName(name);
    setEditEmail(email);
    setEditPhone(phone);
    setEditAvatar(avatar);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!editName.trim() || !editEmail.trim() || !editPhone.trim()) {
      alert('Name, Email, and Phone fields cannot be empty.');
      return;
    }

    // Save to state
    setName(editName);
    setEmail(editEmail);
    setPhone(editPhone);
    setAvatar(editAvatar);

    // Save to localStorage
    localStorage.setItem('user_profile_name', editName);
    localStorage.setItem('user_profile_email', editEmail);
    localStorage.setItem('user_profile_phone', editPhone);
    localStorage.setItem('user_profile_avatar', editAvatar);

    setIsEditing(false);

    // Dispatch custom event to notify Header and other components to update
    window.dispatchEvent(new Event('user-profile-updated'));
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      onClose();
      router.push('/logout');
    }
  };

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop with fade-in animation */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 cursor-pointer"
        onClick={onClose}
      />

      {/* Slide-in drawer container */}
      <div className="relative w-full max-w-md h-full bg-surface-container-lowest border-l border-outline-variant shadow-2xl flex flex-col animate-slide-in-right z-50 text-on-surface">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/30">
          <h2 className="text-title-lg font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">account_circle</span>
            User Profile
          </h2>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-surface-variant transition-colors text-outline hover:text-on-surface cursor-pointer flex items-center justify-center"
            aria-label="Close drawer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
          
          {/* Avatar and Primary Details */}
          <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-outline-variant/20">
            <div className="relative w-24 h-24 rounded-full border-4 border-primary/10 overflow-hidden shadow-md">
              <img
                src={isEditing ? (editAvatar || avatar) : avatar}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuA2GesO-YP3f1uzTyVSdDUVpTEQxwdDpd6APuZ5Pg-4I9-r_TTny1j4oiP3R4pKdldmFGyU-IAGdNzHrgTHSGJQdbQh1b1SKxNKdg14pUdaRUHI3XwkWXFDlOMyT5rAAZ8PL1WmbIpc6CciQyHFBwqmHBPgi6Rl5MWmiJgaYdirFOKPsiW5Y1CbLLC_BbaKg3mexsmf-yiP9C-8rjbthogxCvLVivtGoUY5O3fvSSn5DC-cVEE5_L5TNft_ccIWXVzSwliR3Uuis8Ds';
                }}
              />
            </div>
            
            {!isEditing && (
              <>
                <div>
                  <h3 className="text-headline-sm font-bold">{name}</h3>
                  <p className="text-body-sm text-outline font-medium mt-0.5">{dept}</p>
                </div>
                <span className="px-3 py-1 bg-primary/10 text-primary font-bold text-xs rounded-full uppercase tracking-wider">
                  {role}
                </span>
              </>
            )}
          </div>

          {/* Form fields */}
          {isEditing ? (
            <div className="space-y-4">
              <h4 className="font-bold text-body-md text-primary border-b border-primary/20 pb-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">edit</span>
                Edit Profile Information
              </h4>
              
              <div className="space-y-3">
                <div className="flex flex-col">
                  <label className="text-label-sm text-outline font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="px-3 py-2 bg-surface-container-low border border-outline-variant/40 rounded-lg text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Enter full name"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-label-sm text-outline font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="px-3 py-2 bg-surface-container-low border border-outline-variant/40 rounded-lg text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Enter email address"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-label-sm text-outline font-semibold mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="px-3 py-2 bg-surface-container-low border border-outline-variant/40 rounded-lg text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-label-sm text-outline font-semibold mb-1">Avatar Image URL</label>
                  <input
                    type="text"
                    value={editAvatar}
                    onChange={(e) => setEditAvatar(e.target.value)}
                    className="px-3 py-2 bg-surface-container-low border border-outline-variant/40 rounded-lg text-[11px] font-mono focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Enter avatar URL"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleSave}
                  className="flex-1 py-2 bg-primary text-on-primary rounded-lg font-bold hover:shadow-md hover:bg-primary-container active:scale-[0.98] transition-all cursor-pointer text-center text-body-md"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 py-2 bg-surface-variant text-on-surface-variant border border-outline-variant/50 rounded-lg font-semibold hover:bg-surface-container-high transition-colors cursor-pointer text-center text-body-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h4 className="font-bold text-body-md text-outline border-b border-outline-variant/20 pb-1">
                Profile Details
              </h4>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-outline mt-0.5">badge</span>
                  <div className="flex flex-col">
                    <span className="text-label-sm text-outline font-semibold">Department</span>
                    <span className="text-body-md font-medium mt-0.5">{dept}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-outline mt-0.5">mail</span>
                  <div className="flex flex-col">
                    <span className="text-label-sm text-outline font-semibold">Email Address</span>
                    <span className="text-body-md font-medium mt-0.5 break-all">{email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-outline mt-0.5">phone</span>
                  <div className="flex flex-col">
                    <span className="text-label-sm text-outline font-semibold">Phone Number</span>
                    <span className="text-body-md font-medium mt-0.5">{phone}</span>
                  </div>
                </div>
              </div>

              {/* Edit Trigger */}
              <div className="pt-4">
                <button
                  onClick={handleStartEditing}
                  className="w-full py-2.5 bg-primary/5 text-primary border border-primary/20 rounded-lg font-bold hover:bg-primary/10 transition-colors flex items-center justify-center gap-2 cursor-pointer text-body-md"
                >
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                  Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer / Logout */}
        <div className="p-6 border-t border-outline-variant/30 bg-surface-container-low">
          <button
            onClick={handleLogout}
            className="w-full py-2.5 border border-error/30 text-error font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-error-container/20 active:scale-[0.98] transition-all cursor-pointer text-body-md"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Logout
          </button>
        </div>
      </div>

      {/* Slide-in styles inline */}
      <style jsx global>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
