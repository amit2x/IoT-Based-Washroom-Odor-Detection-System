'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { initialUsers } from '@/lib/mockData';

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'ALL' | 'ADMIN' | 'TERMINAL MANAGER' | 'MAINTENANCE STAFF'>('ALL');

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filterRole === 'ALL' || user.role === filterRole;

    return matchesSearch && matchesRole;
  });

  return (
    <>
      <Header
        title="User Management"
        placeholder="Search system users..."
        onSearchChange={setSearchTerm}
      />

      <div className="flex-1 overflow-y-auto p-margin-page custom-scrollbar bg-background">
        {/* Dashboard Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-stack-lg">
          <div className="tonal-card p-card-padding rounded-xl flex flex-col gap-1 bg-white">
            <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Total Users</p>
            <div className="flex items-end justify-between">
              <h3 className="font-data-num-lg text-data-num-lg text-primary font-bold">1,284</h3>
              <span className="text-secondary font-label-md flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                12%
              </span>
            </div>
          </div>
          <div className="tonal-card p-card-padding rounded-xl flex flex-col gap-1 bg-white">
            <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Active Now</p>
            <div className="flex items-end justify-between">
              <h3 className="font-data-num-lg text-data-num-lg text-secondary font-bold">422</h3>
              <div className="w-12 h-6 bg-secondary-container rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="tonal-card p-card-padding rounded-xl flex flex-col gap-1 bg-white">
            <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Admins</p>
            <div className="flex items-end justify-between">
              <h3 className="font-data-num-lg text-data-num-lg text-on-surface font-bold">18</h3>
              <span className="material-symbols-outlined text-primary">shield_person</span>
            </div>
          </div>
          <div className="tonal-card p-card-padding rounded-xl flex flex-col gap-1 bg-white">
            <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Maintenance</p>
            <div className="flex items-end justify-between">
              <h3 className="font-data-num-lg text-data-num-lg text-tertiary font-bold">156</h3>
              <span className="material-symbols-outlined text-tertiary">engineering</span>
            </div>
          </div>
        </div>

        {/* Main Table Section */}
        <section className="tonal-card rounded-xl overflow-hidden flex flex-col bg-white">
          <div className="p-card-padding flex flex-wrap justify-between items-center bg-surface-container-low border-b border-outline-variant gap-4">
            <div className="flex items-center gap-4">
              <h4 className="font-title-lg text-title-lg text-on-surface font-bold">System Directory</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterRole('ALL')}
                  className={`px-3 py-1 font-label-md rounded-full text-[11px] font-bold ${
                    filterRole === 'ALL'
                      ? 'bg-primary-container text-primary'
                      : 'bg-white text-on-surface-variant border border-outline-variant hover:bg-surface-container'
                  }`}
                >
                  ALL USERS
                </button>
                <button
                  onClick={() => setFilterRole('ADMIN')}
                  className={`px-3 py-1 font-label-md rounded-full text-[11px] font-bold ${
                    filterRole === 'ADMIN'
                      ? 'bg-primary-container text-primary'
                      : 'bg-white text-on-surface-variant border border-outline-variant hover:bg-surface-container'
                  }`}
                >
                  ADMINS
                </button>
                <button
                  onClick={() => setFilterRole('TERMINAL MANAGER')}
                  className={`px-3 py-1 font-label-md rounded-full text-[11px] font-bold ${
                    filterRole === 'TERMINAL MANAGER'
                      ? 'bg-primary-container text-primary'
                      : 'bg-white text-on-surface-variant border border-outline-variant hover:bg-surface-container'
                  }`}
                >
                  MANAGERS
                </button>
                <button
                  onClick={() => setFilterRole('MAINTENANCE STAFF')}
                  className={`px-3 py-1 font-label-md rounded-full text-[11px] font-bold ${
                    filterRole === 'MAINTENANCE STAFF'
                      ? 'bg-primary-container text-primary'
                      : 'bg-white text-on-surface-variant border border-outline-variant hover:bg-surface-container'
                  }`}
                >
                  MAINTENANCE
                </button>
              </div>
            </div>
            <button className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-md flex items-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-md text-xs font-bold">
              <span className="material-symbols-outlined text-sm">person_add</span>
              ADD NEW USER
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-lowest border-b border-outline-variant">
                  <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase font-bold">User Details</th>
                  <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase font-bold">Role</th>
                  <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase font-bold">Location</th>
                  <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase font-bold">Status</th>
                  <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase font-bold">Last Login</th>
                  <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {filteredUsers.map((user) => {
                  const isActive = user.status === 'Active';
                  const isPending = user.status === 'Pending';

                  let statusText = 'Inactive';
                  let statusDot = 'bg-outline';
                  let statusTextClass = 'text-on-surface-variant';
                  if (isActive) {
                    statusText = 'Active';
                    statusDot = 'bg-secondary';
                    statusTextClass = 'text-secondary';
                  } else if (isPending) {
                    statusText = 'Pending';
                    statusDot = 'bg-primary';
                    statusTextClass = 'text-primary';
                  }

                  let roleBadge = 'bg-primary-container text-on-primary-container border-primary/20';
                  let roleIcon = 'admin_panel_settings';
                  if (user.role === 'TERMINAL MANAGER') {
                    roleBadge = 'bg-secondary-container text-on-secondary-container border-secondary/20';
                    roleIcon = 'business_center';
                  } else if (user.role === 'MAINTENANCE STAFF') {
                    roleBadge = 'bg-tertiary-fixed text-on-tertiary-fixed-variant border-tertiary/20';
                    roleIcon = 'build';
                  }

                  return (
                    <tr key={user.id} className="hover:bg-surface-container-low transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high border-2 border-white shadow-sm flex-shrink-0">
                            <img alt={user.name} className="w-full h-full object-cover" src={user.avatarUrl} />
                          </div>
                          <div>
                            <p className="font-body-md text-body-md font-bold text-on-surface">{user.name}</p>
                            <p className="font-label-md text-label-md text-on-surface-variant">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[12px] font-semibold border ${roleBadge}`}>
                          <span className="material-symbols-outlined text-[14px]">{roleIcon}</span>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-body-sm text-body-sm text-on-surface">
                        {user.location}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${statusDot}`}></div>
                          <span className={`font-label-md text-label-md font-semibold ${statusTextClass}`}>{statusText}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-body-sm text-body-sm text-on-surface-variant">
                        {user.lastLogin}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary-container/20 rounded-lg transition-colors">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="p-6 bg-surface-container-lowest border-t border-outline-variant flex flex-wrap justify-between items-center gap-4">
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Showing <span className="font-bold text-on-surface">1 - {filteredUsers.length}</span> of {filteredUsers.length} users
            </p>
            <div className="flex items-center gap-1">
              <button className="p-2 rounded hover:bg-surface-container-low text-outline disabled:opacity-30" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-8 h-8 rounded flex items-center justify-center font-label-md text-on-primary bg-primary text-xs font-bold">1</button>
              <button className="p-2 rounded hover:bg-surface-container-low text-on-surface">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
