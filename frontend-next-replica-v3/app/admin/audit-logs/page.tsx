'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { initialAuditLogs } from '@/lib/mockData';

export default function AuditLogsPage() {
  const [logs] = useState(initialAuditLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState('All Users');
  const [selectedCategory, setSelectedCategory] = useState('All Actions');

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress.includes(searchTerm);

    const matchesUser = selectedUser === 'All Users' || log.user === selectedUser;

    const matchesCategory =
      selectedCategory === 'All Actions' ||
      (selectedCategory === 'System Logins' && log.action === 'System Login') ||
      (selectedCategory === 'Configuration Changes' && log.action === 'Configuration Modified') ||
      (selectedCategory === 'Incident Reports' && log.action.includes('Alert')) ||
      (selectedCategory === 'User Permissions' && (log.action.includes('User') || log.action.includes('Permissions')));

    return matchesSearch && matchesUser && matchesCategory;
  });

  return (
    <>
      <Header
        title="Audit Logs"
        placeholder="Search logs..."
        onSearchChange={setSearchTerm}
      />

      <div className="flex-1 p-margin-page overflow-y-auto flex flex-col gap-6 bg-surface">
        {/* Filters Section */}
        <section className="grid grid-cols-1 gap-4 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <label className="font-label-md text-label-md text-on-surface-variant font-semibold">Date Range</label>
            <input
              className="w-full border border-outline-variant rounded-lg font-body-sm text-body-sm px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none bg-white"
              type="date"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-md text-label-md text-on-surface-variant font-semibold">User Profile</label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full border border-outline-variant rounded-lg font-body-sm text-body-sm px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none bg-white cursor-pointer"
            >
              <option>All Users</option>
              <option>Rahul S.</option>
              <option>Sarah Lin</option>
              <option>Marcus Wainwright</option>
              <option>Elena Moretti</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-md text-label-md text-on-surface-variant font-semibold">Action Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border border-outline-variant rounded-lg font-body-sm text-body-sm px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none bg-white cursor-pointer"
            >
              <option>All Actions</option>
              <option>System Logins</option>
              <option>Configuration Changes</option>
              <option>Incident Reports</option>
              <option>User Permissions</option>
            </select>
          </div>
        </section>

        {/* Audit Table Section */}
        <section className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm flex flex-col overflow-hidden">
          <div className="overflow-x-auto flex-1 custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-surface-container-low z-10">
                <tr className="border-b border-outline-variant">
                  <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-bold">Status</th>
                  <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-bold">Timestamp</th>
                  <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-bold">User Entity</th>
                  <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-bold">Action Type</th>
                  <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-bold">IP Address</th>
                  <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-bold">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant bg-white">
                {filteredLogs.map((log) => {
                  let statusBadge = '';
                  let statusIcon = 'check_circle';
                  if (log.status === 'Success') {
                    statusBadge = 'bg-secondary-container text-on-secondary-container';
                  } else if (log.status === 'Warning') {
                    statusBadge = 'bg-primary-container text-on-primary-container';
                    statusIcon = 'info';
                  } else {
                    statusBadge = 'bg-tertiary-container text-on-tertiary-container';
                    statusIcon = 'error';
                  }

                  const initials = log.user.split(' ').map((n) => n[0]).join('').substring(0, 2);

                  return (
                    <tr key={log.id} className="hover:bg-surface-container-low transition-colors duration-150">
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full font-label-md text-[10px] flex items-center w-fit gap-1 font-bold ${statusBadge}`}>
                          <span className="material-symbols-outlined text-[12px]">{statusIcon}</span>
                          {log.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-body-sm text-body-sm text-on-surface">{log.timestamp}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center text-[10px] font-bold text-primary">
                            {initials}
                          </div>
                          <span className="font-body-sm text-body-sm text-on-surface">{log.user}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-label-md text-label-md text-primary font-semibold">{log.action}</td>
                      <td className="px-6 py-4 font-body-sm text-body-sm text-on-surface-variant">{log.ipAddress}</td>
                      <td className="px-6 py-4 font-body-sm text-body-sm text-on-surface-variant">{log.target}</td>
                    </tr>
                  );
                })}
                {filteredLogs.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-outline text-body-sm bg-white">
                      No logs match your search filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <footer className="p-4 bg-surface-container-low border-t border-outline-variant flex items-center justify-between">
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Showing 1 to {filteredLogs.length} of {filteredLogs.length} entries
            </span>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-container-high text-on-surface-variant disabled:opacity-50" disabled>
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-on-primary font-label-md text-xs font-bold">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-container-high text-on-surface-variant disabled:opacity-50" disabled>
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </footer>
        </section>

        {/* Activity Stats Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Log Density Heatmap Card */}
          <div className="col-span-1 md:col-span-2 bg-white p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-4 relative overflow-hidden">
            <div className="flex justify-between items-center relative z-10">
              <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">Weekly Log Intensity</h3>
              <span className="font-label-md text-label-md text-secondary font-bold">+12% vs last week</span>
            </div>
            <div className="grid grid-cols-7 gap-2 flex-1 relative z-10">
              <div className="h-16 rounded bg-surface-container-highest flex flex-col items-center justify-center font-label-md text-[10px] font-bold text-on-surface-variant">
                <span>MON</span>
                <span className="mt-1 w-2 h-2 rounded-full bg-secondary"></span>
              </div>
              <div className="h-16 rounded bg-primary-container/20 border border-primary/20 flex flex-col items-center justify-center font-label-md text-[10px] font-bold">
                <span>TUE</span>
              </div>
              <div className="h-16 rounded bg-primary-container/40 border border-primary/30 flex flex-col items-center justify-center font-label-md text-[10px] font-bold">
                <span>WED</span>
              </div>
              <div className="h-16 rounded bg-primary-container/60 border border-primary/40 flex flex-col items-center justify-center font-label-md text-[10px] font-bold">
                <span>THU</span>
              </div>
              <div className="h-16 rounded bg-primary-container/20 border border-primary/20 flex flex-col items-center justify-center font-label-md text-[10px] font-bold">
                <span>FRI</span>
              </div>
              <div className="h-16 rounded bg-primary-container/80 border border-primary/50 flex flex-col items-center justify-center font-label-md text-[10px] font-bold">
                <span>SAT</span>
              </div>
              <div className="h-16 rounded bg-primary-container/40 border border-primary/30 flex flex-col items-center justify-center font-label-md text-[10px] font-bold">
                <span>SUN</span>
              </div>
            </div>
            <div className="absolute -right-8 -bottom-8 opacity-5">
              <span className="material-symbols-outlined text-[160px]">monitoring</span>
            </div>
          </div>
          {/* Security Summary Card */}
          <div className="bg-primary text-on-primary p-6 rounded-xl shadow-lg flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-[32px] mb-2 text-white">security</span>
              <h3 className="font-title-lg text-title-lg mb-1 text-white font-bold">Security Health</h3>
              <p className="font-body-sm text-body-sm opacity-80 text-white">Last 24 hours review</p>
            </div>
            <div className="mt-4 relative z-10">
              <span className="font-data-num-lg text-data-num-lg text-white font-extrabold">99.8%</span>
              <p className="font-label-md text-label-md mt-1 text-white font-semibold">Authenticity Score</p>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          </div>
        </section>
      </div>
    </>
  );
}
