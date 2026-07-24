'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

export default function SettingsPage() {
  const [fullName, setFullName] = useState('Alex Thompson');
  const [email, setEmail] = useState('alex.thompson@aerometric.com');
  const [dept, setDept] = useState('Operations Control Center');

  // Sliders states
  const [congestion, setCongestion] = useState(85);
  const [heatWarning, setHeatWarning] = useState(42);
  const [slaTime, setSlaTime] = useState(350);

  // Operational Mode State
  const [opMode, setOpMode] = useState('standard');

  // Notifications state
  const [notifs, setNotifs] = useState({
    criticalInApp: true,
    criticalEmail: true,
    criticalSMS: true,
    perfInApp: true,
    perfEmail: true,
    perfSMS: false,
    maintInApp: true,
    maintEmail: false,
    maintSMS: false,
  });

  const toggleNotif = (key: keyof typeof notifs) => {
    setNotifs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile configurations successfully saved!');
  };

  return (
    <>
      <Header title="Settings" placeholder="Search settings..." />

      {/* Content Canvas */}
      <div className="p-stack-lg max-w-[1200px] mx-auto w-full flex-grow">
        <div className="grid grid-cols-12 gap-gutter">
          {/* Profile Section */}
          <section className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
            <div className="glass-card rounded-xl p-card-padding shadow-sm bg-white border border-outline-variant">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-shrink-0">
                  <img
                    alt="Profile"
                    className="w-20 h-20 rounded-full border-4 border-surface-container-highest shadow-md object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDY9u9jyh7jrv-1Ys95tJ91IsVNZkig5M6AYSRSUjDxoheHMz_FTjRWYkFkrYwEQQPufzdlJmWQC7uyHgmx3iSoO2eEf3n3al9q34_mPX1v9iIaUc3PoVzbFGwCvCp5NxvLkoen8NubjLTanhvqmIDd4cKePj_Gb_6gZhx2JXpmfH-2Ps6LvZnPLJwzIDqfqX6GmGJd4Ze12q8EZnL6EBLsmx8JXT5YClk4-9jpD-aIhi45ALJkWfXKjvWeoaayxR7-zxGJvbJxt8_z"
                  />
                  <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center">
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                  </button>
                </div>
                <div>
                  <h2 className="font-title-lg text-title-lg text-on-surface font-bold leading-tight">{fullName}</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">System Administrator</p>
                  <span className="inline-block mt-2 px-2 py-0.5 bg-secondary-container text-on-secondary-container rounded font-label-md text-label-md font-semibold text-[10px]">
                    Verified Personnel
                  </span>
                </div>
              </div>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="space-y-1">
                  <label className="font-label-md text-label-md text-outline block font-semibold">Full Name</label>
                  <input
                    className="w-full rounded-lg border border-outline-variant focus:border-primary focus:ring-primary font-body-md text-body-md p-2.5 focus:outline-none"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-md text-label-md text-outline block font-semibold">Email Address</label>
                  <input
                    className="w-full rounded-lg border border-outline-variant focus:border-primary focus:ring-primary font-body-md text-body-md p-2.5 focus:outline-none"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-md text-label-md text-outline block font-semibold">Department</label>
                  <select
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                    className="w-full rounded-lg border border-outline-variant focus:border-primary focus:ring-primary font-body-md text-body-md p-2.5 cursor-pointer focus:outline-none bg-white"
                  >
                    <option>Operations Control Center</option>
                    <option>IT Infrastructure</option>
                    <option>Facility Management</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-on-primary py-2.5 rounded-lg font-title-lg text-title-lg hover:opacity-90 transition-all active:scale-[0.98] font-bold text-xs"
                >
                  Save Profile
                </button>
              </form>
            </div>
          </section>

          {/* System Config & Notifications */}
          <section className="col-span-12 lg:col-span-8 flex flex-col gap-gutter">
            {/* System Thresholds */}
            <div className="glass-card rounded-xl p-card-padding shadow-sm bg-white border border-outline-variant">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">tune</span>
                  <h3 className="font-title-lg text-title-lg font-bold">System Configurations</h3>
                </div>
                <span className="text-xs text-outline italic">Last sync: 02m ago</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-label-md text-label-md font-bold text-on-surface-variant uppercase tracking-wider">
                    Alert Thresholds
                  </h4>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between font-label-md text-label-md">
                        <span>Critical Congestion</span>
                        <span className="text-primary font-bold">{congestion}%</span>
                      </div>
                      <input
                        className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
                        type="range"
                        min="50"
                        max="100"
                        value={congestion}
                        onChange={(e) => setCongestion(Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between font-label-md text-label-md">
                        <span>Hardware Heat Map Warning</span>
                        <span className="text-secondary font-bold">{heatWarning}°C</span>
                      </div>
                      <input
                        className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-secondary"
                        type="range"
                        min="20"
                        max="80"
                        value={heatWarning}
                        onChange={(e) => setHeatWarning(Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between font-label-md text-label-md">
                        <span>Response Time SLA</span>
                        <span className="text-tertiary font-bold">{slaTime}ms</span>
                      </div>
                      <input
                        className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-tertiary"
                        type="range"
                        min="100"
                        max="1000"
                        value={slaTime}
                        onChange={(e) => setSlaTime(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-label-md text-label-md font-bold text-on-surface-variant uppercase tracking-wider">
                    Operational Mode
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    <label
                      onClick={() => setOpMode('standard')}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                        opMode === 'standard'
                          ? 'border-primary bg-primary-container/10'
                          : 'border-outline-variant hover:border-primary'
                      }`}
                    >
                      <input
                        checked={opMode === 'standard'}
                        onChange={() => setOpMode('standard')}
                        className="text-primary focus:ring-primary mr-3 cursor-pointer"
                        name="mode"
                        type="radio"
                      />
                      <div className="flex flex-col">
                        <span className={`font-label-md text-label-md font-bold ${opMode === 'standard' ? 'text-primary' : 'text-on-surface'}`}>
                          Standard Optimization
                        </span>
                        <span className="text-[11px] text-on-surface-variant">Balanced resource allocation and monitoring.</span>
                      </div>
                    </label>
                    <label
                      onClick={() => setOpMode('density')}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                        opMode === 'density'
                          ? 'border-primary bg-primary-container/10'
                          : 'border-outline-variant hover:border-primary'
                      }`}
                    >
                      <input
                        checked={opMode === 'density'}
                        onChange={() => setOpMode('density')}
                        className="text-primary focus:ring-primary mr-3 cursor-pointer"
                        name="mode"
                        type="radio"
                      />
                      <div className="flex flex-col">
                        <span className={`font-label-md text-label-md font-bold ${opMode === 'density' ? 'text-primary' : 'text-on-surface'}`}>
                          High Density Response
                        </span>
                        <span className="text-[11px] text-on-surface-variant">Increased polling frequency for peak traffic.</span>
                      </div>
                    </label>
                    <label
                      onClick={() => setOpMode('energy')}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                        opMode === 'energy'
                          ? 'border-primary bg-primary-container/10'
                          : 'border-outline-variant hover:border-primary'
                      }`}
                    >
                      <input
                        checked={opMode === 'energy'}
                        onChange={() => setOpMode('energy')}
                        className="text-primary focus:ring-primary mr-3 cursor-pointer"
                        name="mode"
                        type="radio"
                      />
                      <div className="flex flex-col">
                        <span className={`font-label-md text-label-md font-bold ${opMode === 'energy' ? 'text-primary' : 'text-on-surface'}`}>
                          Energy Conservation
                        </span>
                        <span className="text-[11px] text-on-surface-variant">Reduced sensor reporting for low-traffic hours.</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="glass-card rounded-xl p-card-padding shadow-sm bg-white border border-outline-variant">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">notifications_active</span>
                <h3 className="font-title-lg text-title-lg font-bold">Notification Preferences</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-outline-variant">
                    <tr>
                      <th className="pb-3 font-label-md text-label-md text-outline">Category</th>
                      <th className="pb-3 font-label-md text-label-md text-outline text-center">In-App</th>
                      <th className="pb-3 font-label-md text-label-md text-outline text-center">Email</th>
                      <th className="pb-3 font-label-md text-label-md text-outline text-center">SMS / Push</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30">
                    <tr>
                      <td className="py-4">
                        <p className="font-label-md text-label-md font-bold text-on-surface">Critical Incidents</p>
                        <p className="text-[11px] text-on-surface-variant">Hardware failure, Security breaches</p>
                      </td>
                      <td className="py-4 text-center">
                        <input
                          checked={notifs.criticalInApp}
                          onChange={() => toggleNotif('criticalInApp')}
                          className="rounded text-primary focus:ring-primary cursor-pointer"
                          type="checkbox"
                        />
                      </td>
                      <td className="py-4 text-center">
                        <input
                          checked={notifs.criticalEmail}
                          onChange={() => toggleNotif('criticalEmail')}
                          className="rounded text-primary focus:ring-primary cursor-pointer"
                          type="checkbox"
                        />
                      </td>
                      <td className="py-4 text-center">
                        <input
                          checked={notifs.criticalSMS}
                          onChange={() => toggleNotif('criticalSMS')}
                          className="rounded text-primary focus:ring-primary cursor-pointer"
                          type="checkbox"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4">
                        <p className="font-label-md text-label-md font-bold text-on-surface">Performance Reports</p>
                        <p className="text-[11px] text-on-surface-variant">Daily summaries and weekly analytics</p>
                      </td>
                      <td className="py-4 text-center">
                        <input
                          checked={notifs.perfInApp}
                          onChange={() => toggleNotif('perfInApp')}
                          className="rounded text-primary focus:ring-primary cursor-pointer"
                          type="checkbox"
                        />
                      </td>
                      <td className="py-4 text-center">
                        <input
                          checked={notifs.perfEmail}
                          onChange={() => toggleNotif('perfEmail')}
                          className="rounded text-primary focus:ring-primary cursor-pointer"
                          type="checkbox"
                        />
                      </td>
                      <td className="py-4 text-center">
                        <input
                          checked={notifs.perfSMS}
                          onChange={() => toggleNotif('perfSMS')}
                          className="rounded text-primary focus:ring-primary cursor-pointer"
                          type="checkbox"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4">
                        <p className="font-label-md text-label-md font-bold text-on-surface">System Maintenance</p>
                        <p className="text-[11px] text-on-surface-variant">Scheduled downtime and updates</p>
                      </td>
                      <td className="py-4 text-center">
                        <input
                          checked={notifs.maintInApp}
                          onChange={() => toggleNotif('maintInApp')}
                          className="rounded text-primary focus:ring-primary cursor-pointer"
                          type="checkbox"
                        />
                      </td>
                      <td className="py-4 text-center">
                        <input
                          checked={notifs.maintEmail}
                          onChange={() => toggleNotif('maintEmail')}
                          className="rounded text-primary focus:ring-primary cursor-pointer"
                          type="checkbox"
                        />
                      </td>
                      <td className="py-4 text-center">
                        <input
                          checked={notifs.maintSMS}
                          onChange={() => toggleNotif('maintSMS')}
                          className="rounded text-primary focus:ring-primary cursor-pointer"
                          type="checkbox"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Audit Log Preview */}
          <section className="col-span-12">
            <div className="glass-card rounded-xl p-card-padding shadow-sm bg-white border border-outline-variant">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-title-lg text-title-lg font-bold">Recent Administrative Actions</h3>
                <Link
                  href="/admin/audit-logs"
                  className="text-primary font-label-md text-label-md font-bold flex items-center gap-1 text-xs hover:underline"
                >
                  View Full Audit Log
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3 p-3 bg-surface-container-low rounded-lg">
                  <span className="material-symbols-outlined text-secondary bg-secondary-container p-2 rounded-full text-[20px] flex-shrink-0">
                    settings_suggest
                  </span>
                  <div>
                    <p className="font-label-md text-label-md font-bold text-on-surface">Threshold Modified</p>
                    <p className="text-[11px] text-on-surface-variant">Changed &apos;Critical Congestion&apos; from 80% to 85%</p>
                    <p className="text-[10px] text-outline mt-1 font-semibold">Today, 10:45 AM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-surface-container-low rounded-lg">
                  <span className="material-symbols-outlined text-primary bg-primary-container/20 p-2 rounded-full text-[20px] flex-shrink-0">
                    person_add
                  </span>
                  <div>
                    <p className="font-label-md text-label-md font-bold text-on-surface">New User Invited</p>
                    <p className="text-[11px] text-on-surface-variant">Sarah Jenkins (Level 2 Technician)</p>
                    <p className="text-[10px] text-outline mt-1 font-semibold">Yesterday, 4:12 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-surface-container-low rounded-lg">
                  <span className="material-symbols-outlined text-tertiary bg-tertiary-fixed p-2 rounded-full text-[20px] flex-shrink-0">
                    security
                  </span>
                  <div>
                    <p className="font-label-md text-label-md font-bold text-on-surface">Security Rule Update</p>
                    <p className="text-[11px] text-on-surface-variant">Forced 2FA for all Administrative roles</p>
                    <p className="text-[10px] text-outline mt-1 font-semibold">Oct 24, 09:30 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer Info */}
      <footer className="mt-auto px-margin-page py-6 border-t border-outline-variant flex justify-between items-center bg-surface-container-lowest shrink-0">
        <span className="font-label-md text-label-md text-on-surface-variant font-medium">
          © 2024 AeroMetric Insight. Infrastructure OS v4.2.0-stable
        </span>
        <div className="flex gap-4">
          <a className="font-label-md text-label-md text-primary hover:underline" href="#">
            Privacy Policy
          </a>
          <a className="font-label-md text-label-md text-primary hover:underline" href="#">
            System Status
          </a>
        </div>
      </footer>
    </>
  );
}
