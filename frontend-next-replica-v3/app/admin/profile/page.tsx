'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function ProfilePage() {
  const router = useRouter();

  // Profile data states
  const [name, setName] = useState('AAI Super Admin');
  const [email, setEmail] = useState('superadmin@aai.aero');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [role] = useState('Super Admin');
  const [dept, setDept] = useState('Global Infrastructure Ops');
  const [avatar, setAvatar] = useState(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA2GesO-YP3f1uzTyVSdDUVpTEQxwdDpd6APuZ5Pg-4I9-r_TTny1j4oiP3R4pKdldmFGyU-IAGdNzHrgTHSGJQdbQh1b1SKxNKdg14pUdaRUHI3XwkWXFDlOMyT5rAAZ8PL1WmbIpc6CciQyHFBwqmHBPgi6Rl5MWmiJgaYdirFOKPsiW5Y1CbLLC_BbaKg3mexsmf-yiP9C-8rjbthogxCvLVivtGoUY5O3fvSSn5DC-cVEE5_L5TNft_ccIWXVzSwliR3Uuis8Ds'
  );

  // Editing state
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editDept, setEditDept] = useState('');
  const [editAvatar, setEditAvatar] = useState('');

  // Password Modal states
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem('user_profile_name');
    const savedEmail = localStorage.getItem('user_profile_email');
    const savedPhone = localStorage.getItem('user_profile_phone');
    const savedDept = localStorage.getItem('user_profile_dept');
    const savedAvatar = localStorage.getItem('user_profile_avatar');

    if (savedName) setName(savedName);
    if (savedEmail) setEmail(savedEmail);
    if (savedPhone) setPhone(savedPhone);
    if (savedDept) setDept(savedDept);
    if (savedAvatar) setAvatar(savedAvatar);
  }, []);

  const handleStartEditing = () => {
    setEditName(name);
    setEditEmail(email);
    setEditPhone(phone);
    setEditDept(dept);
    setEditAvatar(avatar);
    setIsEditing(true);
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim() || !editEmail.trim() || !editPhone.trim() || !editDept.trim()) {
      alert('All profile fields must be filled out.');
      return;
    }

    setName(editName);
    setEmail(editEmail);
    setPhone(editPhone);
    setDept(editDept);
    setAvatar(editAvatar);

    localStorage.setItem('user_profile_name', editName);
    localStorage.setItem('user_profile_email', editEmail);
    localStorage.setItem('user_profile_phone', editPhone);
    localStorage.setItem('user_profile_dept', editDept);
    localStorage.setItem('user_profile_avatar', editAvatar);

    setIsEditing(false);
    window.dispatchEvent(new Event('user-profile-updated'));
    showToast('Profile updated successfully!');
  };

  const handleCancelChanges = () => {
    setIsEditing(false);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill in all password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }

    // Success flow
    setShowPasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showToast('Password changed successfully!');
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      router.push('/logout');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  return (
    <>
      <Header title="User Profile" />

      {/* Main Workspace Scrollable Content */}
      <main className="flex-1 p-margin-page bg-surface-container-low/30 relative overflow-y-auto">
        
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 bg-secondary text-white px-6 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-2 animate-bounce">
            <span className="material-symbols-outlined">check_circle</span>
            <span className="font-label-md font-bold">{toastMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter max-w-7xl mx-auto">
          {/* Profile Overview Card (Left Panel) */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white rounded-xl border border-outline-variant p-card-padding flex flex-col items-center text-center gap-4 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
              
              {/* Avatar Picture */}
              <div className="relative group w-32 h-32 rounded-full border-4 border-primary-container/10 overflow-hidden shadow-md">
                <img
                  src={avatar}
                  alt="Admin Avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuA2GesO-YP3f1uzTyVSdDUVpTEQxwdDpd6APuZ5Pg-4I9-r_TTny1j4oiP3R4pKdldmFGyU-IAGdNzHrgTHSGJQdbQh1b1SKxNKdg14pUdaRUHI3XwkWXFDlOMyT5rAAZ8PL1WmbIpc6CciQyHFBwqmHBPgi6Rl5MWmiJgaYdirFOKPsiW5Y1CbLLC_BbaKg3mexsmf-yiP9C-8rjbthogxCvLVivtGoUY5O3fvSSn5DC-cVEE5_L5TNft_ccIWXVzSwliR3Uuis8Ds';
                  }}
                />
                {isEditing && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="material-symbols-outlined text-white text-3xl">photo_camera</span>
                  </div>
                )}
              </div>
              
              {/* User Identity Details */}
              <div>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">{name}</h3>
                <p className="text-body-sm text-on-surface-variant font-medium mt-1">{dept}</p>
              </div>

              {/* Status & Role Badges */}
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-primary/10 text-primary font-bold text-[10px] rounded-full uppercase tracking-wider">
                  {role}
                </span>
                <span className="px-3 py-1 bg-secondary/10 text-secondary font-bold text-[10px] rounded-full uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block animate-pulse"></span> Active
                </span>
              </div>

              {/* Action Buttons */}
              <div className="w-full border-t border-outline-variant/50 pt-4 flex flex-col gap-2 mt-2">
                {!isEditing && (
                  <button
                    onClick={handleStartEditing}
                    className="w-full bg-primary text-white hover:bg-primary-container px-4 py-2.5 rounded-lg font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-xs cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">edit</span>
                    Edit Profile
                  </button>
                )}
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="w-full border border-outline-variant text-on-surface hover:bg-surface-container-low px-4 py-2.5 rounded-lg font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">lock_reset</span>
                  Change Password
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full border border-error/20 text-error hover:bg-error-container/20 px-4 py-2.5 rounded-lg font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">logout</span>
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Details & Settings (Right Panel) */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            <div className="bg-white rounded-xl border border-outline-variant p-card-padding shadow-sm flex flex-col gap-6">
              <div className="flex items-center gap-2 border-b border-outline-variant/30 pb-4">
                <span className="material-symbols-outlined text-primary text-2xl">account_circle</span>
                <h3 className="font-title-lg text-title-lg font-bold text-on-surface">Account Details</h3>
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveChanges} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-label-md text-label-md text-outline block font-semibold">Full Name</label>
                      <input
                        className="w-full rounded-lg border border-outline-variant focus:border-primary focus:ring-primary font-body-md text-body-md p-2.5 focus:outline-none"
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="AAI Super Admin"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-label-md text-label-md text-outline block font-semibold">Email Address</label>
                      <input
                        className="w-full rounded-lg border border-outline-variant focus:border-primary focus:ring-primary font-body-md text-body-md p-2.5 focus:outline-none"
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        placeholder="superadmin@aai.aero"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-label-md text-label-md text-outline block font-semibold">Phone Number</label>
                      <input
                        className="w-full rounded-lg border border-outline-variant focus:border-primary focus:ring-primary font-body-md text-body-md p-2.5 focus:outline-none"
                        type="text"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-label-md text-label-md text-outline block font-semibold">Department</label>
                      <input
                        className="w-full rounded-lg border border-outline-variant focus:border-primary focus:ring-primary font-body-md text-body-md p-2.5 focus:outline-none"
                        type="text"
                        value={editDept}
                        onChange={(e) => setEditDept(e.target.value)}
                        placeholder="Global Infrastructure Ops"
                        required
                      />
                    </div>
                    <div className="col-span-1 md:col-span-2 space-y-1">
                      <label className="font-label-md text-label-md text-outline block font-semibold">Avatar Image URL</label>
                      <input
                        className="w-full rounded-lg border border-outline-variant focus:border-primary focus:ring-primary font-body-md text-body-md p-2.5 focus:outline-none font-mono text-xs"
                        type="text"
                        value={editAvatar}
                        onChange={(e) => setEditAvatar(e.target.value)}
                        placeholder="Avatar image URL"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/30">
                    <button
                      type="submit"
                      className="bg-primary text-white hover:bg-primary-container px-6 py-2.5 rounded-lg font-bold transition-all active:scale-[0.98] text-xs cursor-pointer"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelChanges}
                      className="border border-outline-variant text-on-surface hover:bg-surface-container-low px-6 py-2.5 rounded-lg font-bold transition-all active:scale-[0.98] text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <span className="text-label-md text-on-surface-variant font-semibold">Full Name</span>
                    <span className="text-body-md font-bold mt-1 text-on-surface">{name}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-label-md text-on-surface-variant font-semibold">Email Address</span>
                    <span className="text-body-md font-bold mt-1 text-on-surface break-all">{email}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-label-md text-on-surface-variant font-semibold">Phone Number</span>
                    <span className="text-body-md font-bold mt-1 text-on-surface">{phone}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-label-md text-on-surface-variant font-semibold">Department</span>
                    <span className="text-body-md font-bold mt-1 text-on-surface">{dept}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-label-md text-on-surface-variant font-semibold">Access Level</span>
                    <span className="text-body-md font-bold mt-1 text-on-surface flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-primary text-lg">shield</span>
                      {role}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-label-md text-on-surface-variant font-semibold">Account Status</span>
                    <span className="text-body-md font-bold mt-1 text-secondary flex items-center gap-1">
                      <span className="material-symbols-outlined text-lg">verified</span>
                      Verified Personnel
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Security Configurations Card */}
            <div className="bg-white rounded-xl border border-outline-variant p-card-padding shadow-sm flex flex-col gap-6">
              <div className="flex items-center gap-2 border-b border-outline-variant/30 pb-4">
                <span className="material-symbols-outlined text-primary text-2xl">security</span>
                <h3 className="font-title-lg text-title-lg font-bold text-on-surface">Security &amp; Permissions</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-lg border border-outline-variant/50">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary text-2xl">vibration</span>
                    <div>
                      <p className="font-label-md text-label-md font-bold text-on-surface">Two-Factor Authentication (2FA)</p>
                      <p className="text-[11px] text-on-surface-variant">Enhanced account verification via mobile push</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-secondary-container text-on-secondary-container font-bold text-[10px] rounded-full uppercase tracking-wider">
                    Enabled
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-lg border border-outline-variant/50">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-2xl">dns</span>
                    <div>
                      <p className="font-label-md text-label-md font-bold text-on-surface">Active Admin Session IP</p>
                      <p className="text-[11px] text-on-surface-variant">Current administrative network footprint</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-on-surface-variant bg-white px-2.5 py-1 rounded border border-outline-variant/30">
                    10.14.88.29
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Password Change Dialog Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 border border-outline-variant shadow-2xl relative">
            <h3 className="text-title-lg font-bold text-on-surface mb-4">Change Password</h3>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-outline uppercase block mb-1">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full border border-outline-variant rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-body-md"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-outline uppercase block mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-outline-variant rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-body-md"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-outline uppercase block mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-outline-variant rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-body-md"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 text-on-surface-variant font-bold hover:bg-surface-container rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white font-bold rounded-lg text-xs hover:bg-primary-container transition-colors cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
