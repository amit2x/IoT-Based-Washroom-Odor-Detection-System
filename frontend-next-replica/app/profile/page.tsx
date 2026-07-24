'use client';

import React, { useState, useRef } from 'react';

interface ActivityLog {
  id: string;
  type: 'system' | 'security' | 'alert';
  action: string;
  timestamp: string;
  details: string;
  icon: string;
}

export default function ProfilePage() {
  // Form states
  const [firstName, setFirstName] = useState('Rajesh');
  const [lastName, setLastName] = useState('Kumar');
  const [department, setDepartment] = useState('Terminal Operations');
  const [bio, setBio] = useState(
    'Overseeing Terminal 3 operations with 15+ years of experience in high-density transportation hubs. Focused on optimizing passenger flow and maintaining critical safety infrastructure.'
  );

  // Focus ref for first name
  const firstNameInputRef = useRef<HTMLInputElement>(null);

  // Notification states
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [pushAlerts, setPushAlerts] = useState(true);

  // Password modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Mock activity logs
  const [activities] = useState<ActivityLog[]>([
    {
      id: 'L-101',
      type: 'system',
      action: 'Successful login from Terminal Control Station 4',
      timestamp: 'Today, 08:14 AM',
      details: 'IP: 10.22.45.109',
      icon: 'login',
    },
    {
      id: 'L-102',
      type: 'security',
      action: 'Password successfully changed',
      timestamp: 'Oct 14, 2024',
      details: '04:30 PM',
      icon: 'security_update_good',
    },
    {
      id: 'L-103',
      type: 'alert',
      action: 'Failed login attempt (Incorrect MFA)',
      timestamp: 'Oct 12, 2024',
      details: '11:55 PM • IP: 192.168.1.1',
      icon: 'dangerous',
    },
  ]);

  const showToastMessage = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      showToastMessage('First name and Last name are required.', 'error');
      return;
    }
    showToastMessage('Personal details successfully updated.');
  };

  const handleExportProfile = () => {
    const profileData = {
      firstName,
      lastName,
      employeeId: 'EMP-T3-2024-4492',
      department,
      bio,
      notificationPrefs: { emailAlerts, smsAlerts, pushAlerts },
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(profileData, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `profile_${firstName.toLowerCase()}_${lastName.toLowerCase()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToastMessage('Profile exported successfully.');
  };

  const handleEditPersonalInfo = () => {
    firstNameInputRef.current?.focus();
    firstNameInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    showToastMessage('Editing personal details mode active.', 'success');
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      showToastMessage('Please enter your current password.', 'error');
      return;
    }
    if (newPassword.length < 8) {
      showToastMessage('New password must be at least 8 characters long.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToastMessage('New password and confirmation do not match.', 'error');
      return;
    }

    showToastMessage('Password updated successfully.');
    setShowPasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="p-lg max-w-6xl mx-auto space-y-lg animate-fade-in">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-lg right-lg z-50 flex items-center gap-sm px-md py-sm rounded-xl shadow-lg border text-body-md transition-all transform translate-y-0 scale-100 ${
            toast.type === 'success'
              ? 'bg-primary-container text-on-primary-container border-primary/20'
              : 'bg-error-container text-on-error-container border-error/20'
          }`}
        >
          <span className="material-symbols-outlined">
            {toast.type === 'success' ? 'check_circle' : 'error'}
          </span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Profile Header Card */}
      <section className="bg-surface-container-lowest rounded-xl border border-outline-variant p-xl shadow-sm flex flex-col md:flex-row gap-xl items-center md:items-start relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-24 -mt-24 pointer-events-none"></div>
        <div className="relative group">
          <img
            alt="Rajesh Kumar Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover transition-transform group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPAWJ-6FW9SkApwo11t3FtK_ObnU6M_MYuUkfvvbDHRptn3-iB9xhsJOax03zWOdz2VInr5FEcagzThYnMGy305Zbid_qv8rBZrhZ0K63tfYNdMaN0ZEqZWVV1TDuRMyKxe2h_3LSgf5IcCYwP1MK06KmMIZF3D-jaiIv2dhjVch7KU8jcx6s6OPG6KJLBpfcGw0NurElZ3sLf2AnUO4x1JO0KuawekQr_qQsOZNfRaxCVidmtAbNyqaGGmemCOmm9t4PhvGvWfxo"
          />
          <button
            onClick={handleEditPersonalInfo}
            className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform"
            title="Edit Photo"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
        </div>
        <div className="flex-1 text-center md:text-left space-y-xs">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">{firstName} {lastName}</h2>
            <p className="font-body-lg text-body-lg text-primary font-bold">Senior Terminal Manager</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-md pt-sm">
            <div className="flex items-center gap-xs text-secondary">
              <span className="material-symbols-outlined text-[20px]">mail</span>
              <span className="font-body-md text-body-md">rajesh.k@skyhub.aero</span>
            </div>
            <div className="flex items-center gap-xs text-secondary">
              <span className="material-symbols-outlined text-[20px]">call</span>
              <span className="font-body-md text-body-md">+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-xs text-secondary">
              <span className="material-symbols-outlined text-[20px]">location_on</span>
              <span className="font-body-md text-body-md">Terminal 3, Level 4, Office 402</span>
            </div>
          </div>
          <div className="pt-md flex gap-sm justify-center md:justify-start">
            <span className="px-sm py-1 bg-secondary-container text-on-secondary-container rounded-full font-label-sm text-label-sm">
              Operations Lead
            </span>
            <span className="px-sm py-1 bg-secondary-container text-on-secondary-container rounded-full font-label-sm text-label-sm">
              Level 5 Security
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-sm w-full md:w-auto">
          <button
            onClick={handleExportProfile}
            className="w-full sm:w-auto px-lg py-2 bg-primary text-white rounded-lg font-label-sm text-label-sm hover:opacity-90 active:scale-95 transition-all shadow-sm cursor-pointer text-center"
          >
            Export Profile
          </button>
          <button
            onClick={handleEditPersonalInfo}
            className="w-full sm:w-auto px-lg py-2 border border-outline text-on-surface rounded-lg font-label-sm text-label-sm hover:bg-surface-container-low active:scale-95 transition-all cursor-pointer text-center"
          >
            Edit Personal Info
          </button>
        </div>
      </section>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
        {/* Personal Details Form (Left - 8 Columns) */}
        <section className="md:col-span-8 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col justify-between">
          <div className="px-xl py-lg border-b border-outline-variant bg-surface-container-low/50">
            <h3 className="font-headline-md text-headline-md text-on-surface">Personal Details</h3>
          </div>
          <form onSubmit={handleSaveChanges} className="p-xl space-y-lg flex-1 flex flex-col justify-between">
            <div className="space-y-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
                <div className="space-y-xs transition-transform duration-200">
                  <label className="font-label-sm text-label-sm text-secondary uppercase tracking-wider block">
                    First Name
                  </label>
                  <input
                    ref={firstNameInputRef}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm font-body-md text-body-md focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-xs transition-transform duration-200">
                  <label className="font-label-sm text-label-sm text-secondary uppercase tracking-wider block">
                    Last Name
                  </label>
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm font-body-md text-body-md focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="space-y-xs">
                  <label className="font-label-sm text-label-sm text-secondary uppercase tracking-wider block">
                    Employee ID
                  </label>
                  <input
                    className="w-full bg-surface-variant border border-outline-variant rounded-lg px-md py-sm font-body-md text-body-md text-secondary cursor-not-allowed outline-none"
                    disabled
                    type="text"
                    value="EMP-T3-2024-4492"
                  />
                </div>
                <div className="space-y-xs transition-transform duration-200">
                  <label className="font-label-sm text-label-sm text-secondary uppercase tracking-wider block">
                    Department
                  </label>
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm font-body-md text-body-md focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-xs transition-transform duration-200">
                <label className="font-label-sm text-label-sm text-secondary uppercase tracking-wider block">
                  Bio / Professional Summary
                </label>
                <textarea
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm font-body-md text-body-md focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end pt-md">
              <button
                type="submit"
                className="px-xl py-2 bg-primary text-white rounded-lg font-body-lg text-body-lg shadow-sm hover:opacity-95 active:scale-95 transition-all cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </section>

        {/* Security & Notifications (Right - 4 Columns) */}
        <div className="md:col-span-4 space-y-lg flex flex-col">
          {/* Notification Preferences */}
          <section className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
            <div className="px-lg py-md border-b border-outline-variant bg-surface-container-low/50">
              <h3 className="font-headline-md text-headline-md text-on-surface">Notifications</h3>
            </div>
            <div className="p-lg space-y-md">
              <div className="flex items-center justify-between">
                <div
                  className={`flex items-center gap-sm transition-colors duration-200 ${
                    emailAlerts ? 'text-primary' : 'text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined">mail</span>
                  <span className="font-body-md text-body-md">Email Alerts</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    checked={emailAlerts}
                    onChange={(e) => {
                      setEmailAlerts(e.target.checked);
                      showToastMessage(
                        `Email Alerts ${e.target.checked ? 'enabled' : 'disabled'}.`
                      );
                    }}
                    className="sr-only peer"
                    type="checkbox"
                  />
                  <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div
                  className={`flex items-center gap-sm transition-colors duration-200 ${
                    smsAlerts ? 'text-primary' : 'text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined">sms</span>
                  <span className="font-body-md text-body-md">SMS Notifications</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    checked={smsAlerts}
                    onChange={(e) => {
                      setSmsAlerts(e.target.checked);
                      showToastMessage(
                        `SMS Notifications ${e.target.checked ? 'enabled' : 'disabled'}.`
                      );
                    }}
                    className="sr-only peer"
                    type="checkbox"
                  />
                  <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div
                  className={`flex items-center gap-sm transition-colors duration-200 ${
                    pushAlerts ? 'text-primary' : 'text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined">smart_toy</span>
                  <span className="font-body-md text-body-md">App Push Notifications</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    checked={pushAlerts}
                    onChange={(e) => {
                      setPushAlerts(e.target.checked);
                      showToastMessage(
                        `Push Notifications ${e.target.checked ? 'enabled' : 'disabled'}.`
                      );
                    }}
                    className="sr-only peer"
                    type="checkbox"
                  />
                  <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Security Settings */}
          <section className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden flex-grow mt-lg">
            <div className="px-lg py-md border-b border-outline-variant bg-surface-container-low/50">
              <h3 className="font-headline-md text-headline-md text-on-surface">Security</h3>
            </div>
            <div className="p-lg space-y-md">
              <button
                onClick={() => setShowPasswordModal(true)}
                className="w-full flex items-center justify-between p-sm rounded-lg hover:bg-surface-container-low transition-colors group cursor-pointer text-left"
              >
                <div className="flex items-center gap-sm text-on-surface">
                  <span className="material-symbols-outlined text-secondary group-hover:text-primary">
                    lock
                  </span>
                  <span className="font-body-md text-body-md">Change Password</span>
                </div>
                <span className="material-symbols-outlined text-secondary text-[18px]">
                  chevron_right
                </span>
              </button>

              <div className="p-sm rounded-lg border border-primary/20 bg-primary/5 flex items-start gap-sm">
                <span
                  className="material-symbols-outlined text-primary text-[20px] mt-0.5"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified_user
                </span>
                <div>
                  <p className="font-body-md text-body-md text-on-surface font-bold">Two-Factor Auth</p>
                  <p className="font-caption text-caption text-secondary">
                    Currently active via Authenticator App
                  </p>
                  <button
                    onClick={() => showToastMessage('Redirecting to 2FA settings...')}
                    className="mt-2 font-label-sm text-label-sm text-primary hover:underline cursor-pointer block"
                  >
                    Manage 2FA Settings
                  </button>
                </div>
              </div>

              <button
                onClick={() => showToastMessage('Logging out of other devices...')}
                className="w-full flex items-center justify-between p-sm rounded-lg hover:bg-error-container/20 transition-colors group cursor-pointer text-left text-error"
              >
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined">logout</span>
                  <span className="font-body-md text-body-md">Log out of all devices</span>
                </div>
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Audit Trail / Recent Activity */}
      <section className="bg-surface-container-lowest rounded-xl border border-outline-variant p-xl shadow-sm">
        <div className="flex justify-between items-center mb-lg">
          <h3 className="font-headline-md text-headline-md text-on-surface">Recent Account Activity</h3>
          <button
            onClick={() => showToastMessage('Navigating to full audit log...')}
            className="font-label-sm text-label-sm text-primary hover:underline cursor-pointer"
          >
            View Full Audit Log
          </button>
        </div>
        <div className="space-y-sm">
          {activities.map((act) => {
            let containerBg = 'bg-primary/10 text-primary';
            let tagBg = 'bg-surface-container-high text-secondary';
            let tagText = 'System';

            if (act.type === 'security') {
              containerBg = 'bg-tertiary/10 text-tertiary';
              tagText = 'Security';
            } else if (act.type === 'alert') {
              containerBg = 'bg-error/10 text-error';
              tagBg = 'bg-error-container text-on-error-container';
              tagText = 'Alert';
            }

            return (
              <div
                key={act.id}
                className="flex items-center gap-md p-md hover:bg-surface-container-low transition-colors rounded-lg border border-transparent hover:border-outline-variant"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${containerBg}`}>
                  <span className="material-symbols-outlined">{act.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="font-body-md text-body-md text-on-surface">{act.action}</p>
                  <p className="font-caption text-caption text-secondary">
                    {act.timestamp} • {act.details}
                  </p>
                </div>
                <span className={`px-sm py-1 rounded-lg font-label-sm text-label-sm ${tagBg}`}>
                  {tagText}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-md animate-fade-in">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-xl py-lg border-b border-outline-variant bg-surface-container-low/50 flex justify-between items-center">
              <h3 className="font-headline-md text-headline-md text-on-surface">Change Password</h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="material-symbols-outlined text-secondary hover:text-on-surface cursor-pointer"
              >
                close
              </button>
            </div>
            <form onSubmit={handleChangePasswordSubmit} className="p-xl space-y-md">
              <div className="space-y-xs">
                <label className="font-label-sm text-label-sm text-secondary uppercase tracking-wider block">
                  Current Password
                </label>
                <input
                  required
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm font-body-md text-body-md focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
              <div className="space-y-xs">
                <label className="font-label-sm text-label-sm text-secondary uppercase tracking-wider block">
                  New Password
                </label>
                <input
                  required
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm font-body-md text-body-md focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="Min. 8 characters"
                />
              </div>
              <div className="space-y-xs">
                <label className="font-label-sm text-label-sm text-secondary uppercase tracking-wider block">
                  Confirm New Password
                </label>
                <input
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm font-body-md text-body-md focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
              <div className="flex justify-end gap-sm pt-md border-t border-outline-variant mt-lg">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-lg py-2 border border-outline text-on-surface rounded-lg font-label-sm text-label-sm hover:bg-surface-container-low cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-lg py-2 bg-primary text-white rounded-lg font-label-sm text-label-sm hover:opacity-95 cursor-pointer"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
