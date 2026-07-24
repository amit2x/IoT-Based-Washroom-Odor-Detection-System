'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockAuditLogs } from '@/lib/mockData';

interface AuditRow {
  timestamp: string;
  user: string;
  isSystem: boolean;
  type: string;
  typeColor: string;
  unit: string;
  details: string;
  status: string;
  statusColor: string;
}

export default function AuditLog() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeType, setActiveType] = useState('All Activities');
  const [activeTimeframe, setActiveTimeframe] = useState<'24h' | '7d' | 'custom'>('24h');

  const rows: AuditRow[] = [
    {
      timestamp: '2024-10-24 14:22:05',
      user: 'j.doe_admin',
      isSystem: false,
      type: 'Sensor Config',
      typeColor: 'bg-secondary-container text-on-secondary-fixed-variant',
      unit: 'T2-GATE-A14-S3',
      details: 'Threshold adjusted: 3500ms -> 5000ms response.',
      status: 'SUCCESS',
      statusColor: 'bg-primary/10 text-primary'
    },
    {
      timestamp: '2024-10-24 14:18:12',
      user: 'SYS_MONITOR_04',
      isSystem: true,
      type: 'Status Update',
      typeColor: 'bg-surface-container-high text-on-surface-variant',
      unit: 'T2-MAIN-HVAC-CTRL',
      details: 'Auto-balancing load distribution for Zone 4.',
      status: 'LIVE',
      statusColor: 'bg-primary/10 text-primary'
    },
    {
      timestamp: '2024-10-24 13:55:30',
      user: 'SYS_AUTH_AUTHX',
      isSystem: true,
      type: 'Security Alert',
      typeColor: 'bg-error-container text-on-error-container',
      unit: 'T2-AUTH-SRV-01',
      details: 'Multiple failed login attempts detected from [10.2.44.112].',
      status: 'BLOCKED',
      statusColor: 'bg-error-container text-on-error-container animate-pulse'
    },
    {
      timestamp: '2024-10-24 13:42:12',
      user: 's.smith_maint',
      isSystem: false,
      type: 'Device Login',
      typeColor: 'bg-tertiary-container text-on-tertiary-container',
      unit: 'T2-LIFT-09-SVC',
      details: 'Service panel accessed via physical NFC key.',
      status: 'AUTHORIZED',
      statusColor: 'bg-primary/10 text-primary'
    },
    {
      timestamp: '2024-10-24 13:30:00',
      user: 'CRON_BACKUP_SVR',
      isSystem: true,
      type: 'System Backup',
      typeColor: 'bg-surface-container-high text-on-surface-variant',
      unit: 'CLD-ARC-T2-01',
      details: 'Daily snapshot of T2 configuration completed.',
      status: 'ARCHIVED',
      statusColor: 'bg-primary/10 text-primary'
    },
    {
      timestamp: '2024-10-24 13:15:22',
      user: 'a.mercer_admin',
      isSystem: false,
      type: 'User Grant',
      typeColor: 'bg-secondary-container text-on-secondary-fixed-variant',
      unit: 'IAM-SYSTEM-PROV',
      details: 'Elevated privileges granted to s.maintenance_1 for 2 hours.',
      status: 'APPROVED',
      statusColor: 'bg-primary/10 text-primary'
    }
  ];

  const filteredRows = rows.filter((row) => {
    const matchesSearch = 
      row.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.user.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = activeType === 'All Activities' || row.type === activeType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="p-lg space-y-lg animate-fade-in text-on-surface">
      {/* Header Actions */}
      <div className="flex justify-between items-end flex-wrap gap-sm">
        <div>
          <h2 className="font-headline-lg text-headline-lg">Audit Log</h2>
          <p className="font-body-md text-body-md text-secondary">Terminal 2 Central Management System • Historical Records</p>
        </div>
        <button className="bg-primary text-on-primary px-lg py-sm rounded-lg font-body-md flex items-center gap-xs hover:shadow-lg transition-all active:scale-95 cursor-pointer">
          <span className="material-symbols-outlined text-[18px]">download</span> Export Report
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-md">
        <div className="bg-surface-container-lowest p-md border border-outline-variant/30 flex flex-col gap-xs rounded shadow-sm hover:shadow-md transition-shadow">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Total Events (24h)</span>
          <div className="flex items-end justify-between">
            <span className="font-metric-xl text-metric-xl font-bold">12,482</span>
            <span className="text-primary font-label-sm flex items-center"><span className="material-symbols-outlined text-[16px]">trending_up</span> 4.2%</span>
          </div>
        </div>
        
        <div className="bg-surface-container-lowest p-md border border-outline-variant/30 flex flex-col gap-xs rounded shadow-sm hover:shadow-md transition-shadow">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Security Flags</span>
          <div className="flex items-end justify-between">
            <span className="font-metric-xl text-metric-xl text-error font-bold">12</span>
            <span className="text-error font-label-sm flex items-center"><span className="material-symbols-outlined text-[16px]">warning</span> Action Required</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-md border border-outline-variant/30 flex flex-col gap-xs rounded shadow-sm hover:shadow-md transition-shadow">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">System Sync Rate</span>
          <div className="flex items-end justify-between">
            <span className="font-metric-xl text-metric-xl font-bold">99.98%</span>
            <div className="h-1.5 w-16 bg-surface-container-high rounded-full overflow-hidden mb-2">
              <div className="h-full bg-primary w-[99%]"></div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-md border border-outline-variant/30 flex flex-col gap-xs rounded shadow-sm hover:shadow-md transition-shadow">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Active Controllers</span>
          <div className="flex items-end justify-between">
            <span className="font-metric-xl text-metric-xl font-bold">48</span>
            <span className="font-label-sm text-secondary">8 standby</span>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <section className="bg-surface-container-lowest border border-outline-variant/30 p-md rounded flex items-center justify-between flex-wrap gap-md shadow-sm">
        <div className="flex items-center gap-lg flex-wrap">
          <div className="flex bg-surface-container-low p-1 rounded-lg">
            <button 
              onClick={() => setActiveTimeframe('24h')}
              className={`px-md py-1.5 text-body-md font-body-md rounded-md transition-all cursor-pointer ${
                activeTimeframe === '24h' ? 'text-primary bg-surface-container-lowest shadow-sm' : 'text-secondary hover:text-on-surface'
              }`}
            >
              Last 24h
            </button>
            <button 
              onClick={() => setActiveTimeframe('7d')}
              className={`px-md py-1.5 text-body-md font-body-md rounded-md transition-all cursor-pointer ${
                activeTimeframe === '7d' ? 'text-primary bg-surface-container-lowest shadow-sm' : 'text-secondary hover:text-on-surface'
              }`}
            >
              7 Days
            </button>
            <button 
              onClick={() => setActiveTimeframe('custom')}
              className={`px-md py-1.5 text-body-md font-body-md rounded-md transition-all cursor-pointer ${
                activeTimeframe === 'custom' ? 'text-primary bg-surface-container-lowest shadow-sm' : 'text-secondary hover:text-on-surface'
              }`}
            >
              Custom Range
            </button>
          </div>
          <div className="h-8 w-[1px] bg-outline-variant/30 hidden md:block"></div>
          <div className="flex items-center gap-sm">
            <span className="font-label-sm text-label-sm text-secondary">FILTER BY TYPE:</span>
            <select 
              value={activeType} 
              onChange={(e) => setActiveType(e.target.value)}
              className="bg-transparent border-none text-body-md font-body-md text-on-surface focus:ring-0 focus:outline-none cursor-pointer"
            >
              <option>All Activities</option>
              <option value="User Login">User Login</option>
              <option value="Sensor Config">Sensor Config</option>
              <option value="Status Update">Status Update</option>
              <option value="Security Alert">Security Alert</option>
              <option value="Device Login">Device Login</option>
            </select>
          </div>
        </div>

        <div className="relative w-full sm:w-auto">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[20px]">filter_list</span>
          <input 
            type="text" 
            placeholder="Filter by Unit ID or Keyword..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-md py-1.5 bg-surface-container-low border border-outline-variant rounded-lg text-body-md w-full sm:w-72 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
          />
        </div>
      </section>

      {/* Audit Table */}
      <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low border-b border-outline-variant/30">
              <tr>
                <th className="px-lg py-md font-label-sm text-label-sm text-secondary">TIMESTAMP</th>
                <th className="px-lg py-md font-label-sm text-label-sm text-secondary">USER / SYSTEM</th>
                <th className="px-lg py-md font-label-sm text-label-sm text-secondary">ACTION TYPE</th>
                <th className="px-lg py-md font-label-sm text-label-sm text-secondary">UNIT ID</th>
                <th className="px-lg py-md font-label-sm text-label-sm text-secondary">DETAILS</th>
                <th className="px-lg py-md font-label-sm text-label-sm text-secondary text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filteredRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-surface-container-low/50 transition-colors group cursor-pointer">
                  <td className="px-lg py-md font-body-md text-body-md whitespace-nowrap">{row.timestamp}</td>
                  <td className="px-lg py-md">
                    <div className="flex items-center gap-xs">
                      <span className="material-symbols-outlined text-[18px] text-secondary">
                        {row.isSystem ? 'robot_2' : 'person_check'}
                      </span>
                      <span className="font-body-md text-body-md text-on-surface">{row.user}</span>
                    </div>
                  </td>
                  <td className="px-lg py-md">
                    <span className={`px-xs py-0.5 rounded font-label-sm text-[10px] uppercase tracking-tighter ${row.typeColor}`}>
                      {row.type}
                    </span>
                  </td>
                  <td className="px-lg py-md font-body-md text-body-md font-mono text-secondary">{row.unit}</td>
                  <td className={`px-lg py-md font-body-md text-body-md ${row.type === 'Security Alert' ? 'text-error font-semibold' : 'text-on-surface'}`}>
                    {row.details}
                  </td>
                  <td className="px-lg py-md text-right">
                    <div className={`inline-flex items-center gap-xs px-sm py-0.5 rounded-full ${row.statusColor}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      <span className="font-label-sm text-[11px] font-bold">{row.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="bg-surface-container-low px-lg py-sm border-t border-outline-variant/30 flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-secondary">Showing 1-{filteredRows.length} of 12,482 entries</span>
          <div className="flex items-center gap-base">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-secondary hover:bg-surface-container-high transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-on-primary font-label-sm shadow-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-secondary hover:bg-surface-container-high cursor-pointer">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-secondary hover:bg-surface-container-high cursor-pointer">3</button>
            <span className="px-xs text-secondary">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-secondary hover:bg-surface-container-high transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

      {/* Live Activity Map & System Health (Bento Style) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-lg mt-lg">
        {/* Live Activity Map */}
        <div 
          onClick={() => router.push('/floor-heatmap')}
          className="lg:col-span-2 relative bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden min-h-[260px] p-md cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-center relative z-10 mb-md">
            <h4 className="font-headline-md text-headline-md text-on-surface">Live Activity Map: Terminal 2</h4>
            <span className="font-label-sm text-label-sm text-primary flex items-center gap-xs">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              34 Active Logs/min
            </span>
          </div>
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <img 
              className="w-full h-full object-cover grayscale" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBU67M5vkcFIhx3oPvYV557p3oQx4l93PNjsSOKiD6IAfONQlv1TdXh9gSWrbgUqmUZGjSRPr6DDvRYMY48g-rooZvYtZQ5Bc7R0oRt07YLigFNykXaNBRrow2AmiLd1xj98aHhf-Af_daRCTa7wRisxB6EPtRgZfRe8c4-icXYMKrQ1kZnGpP0Z7sJBLxxtgzgQ2hqJ6qyjlZZnGWmTjXx1GEeJXOjDtRhOs5MbDzZl7Osolt2mGxGwHmMMfqesywzB3p81WgKr3c" 
              alt="Terminal Floor Plan"
            />
          </div>
          
          <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_#22c55e]"></div>
          <div className="absolute top-1/4 left-2/3 w-3 h-3 bg-error rounded-full shadow-[0_0_10px_#ba1a1a]"></div>
          <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_#22c55e]"></div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="font-label-sm text-outline opacity-20">TERMINAL 2 BLUEPRINT OVERLAY</span>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md flex flex-col justify-between shadow-sm">
          <div>
            <h4 className="font-headline-md text-headline-md text-on-surface mb-md">System Health</h4>
            <div className="space-y-md">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-label-sm text-label-sm text-on-surface">DATABASE SYNC</span>
                  <span className="font-label-sm text-label-sm text-primary">OPTIMAL</span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[94%] rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-label-sm text-label-sm text-on-surface">API LATENCY</span>
                  <span className="font-label-sm text-label-sm text-primary">12ms</span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[98%] rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-label-sm text-label-sm text-on-surface">STORAGE CAPACITY</span>
                  <span className="font-label-sm text-label-sm text-secondary">64%</span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-[64%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-md bg-surface-container-low p-sm rounded-lg flex items-center gap-sm">
            <span className="material-symbols-outlined text-primary">cloud_done</span>
            <span className="font-body-md text-body-md text-on-surface">Cloud replication active</span>
          </div>
        </div>
      </section>
    </div>
  );
}
