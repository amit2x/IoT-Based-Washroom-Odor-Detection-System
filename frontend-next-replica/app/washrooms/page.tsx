'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { mockWashrooms } from '@/lib/mockData';
import { Washroom } from '@/types';

const occupancyTrend = [
  { hour: '06:00', occupancy: 20 },
  { hour: '08:00', occupancy: 45 },
  { hour: '10:00', occupancy: 78 },
  { hour: '12:00', occupancy: 95 },
  { hour: '14:00', occupancy: 62 },
  { hour: '16:00', occupancy: 80 },
  { hour: '18:00', occupancy: 50 },
  { hour: '20:00', occupancy: 30 }
];

export default function Washrooms() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('All Genders');
  const [levelFilter, setLevelFilter] = useState('All Levels');

  const handleRowClick = (id: string) => {
    router.push(`/washrooms/total-detail`);
  };

  // Filter logic
  const filteredWashrooms = mockWashrooms.filter((w) => {
    const matchesSearch = w.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          w.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGender = genderFilter === 'All Genders' || w.gender === genderFilter;
    const matchesLevel = levelFilter === 'All Levels' || w.level === levelFilter;

    return matchesSearch && matchesGender && matchesLevel;
  });

  return (
    <div className="p-xl space-y-xl animate-fade-in">
      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-lg">
        <div className="bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant/30 flex flex-col gap-xs hover:shadow-md transition-all">
          <div className="flex justify-between items-start">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Total Units</span>
            <span className="material-symbols-outlined text-primary">wc</span>
          </div>
          <div className="font-metric-xl text-metric-xl text-primary">35</div>
          <div className="font-caption text-caption text-on-surface-variant">Operational across T2</div>
        </div>

        <div className="bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant/30 flex flex-col gap-xs hover:shadow-md transition-all">
          <div className="flex justify-between items-start">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Average WHI</span>
            <span className="material-symbols-outlined text-primary">monitoring</span>
          </div>
          <div className="font-metric-xl text-metric-xl text-primary">74<span className="text-headline-md">%</span></div>
          <div className="font-caption text-caption text-primary">↑ 2.4% from last hour</div>
        </div>

        <div className="bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant/30 flex flex-col gap-xs border-l-4 border-l-error hover:shadow-md transition-all">
          <div className="flex justify-between items-start">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Critical Units</span>
            <span className="material-symbols-outlined text-error">warning</span>
          </div>
          <div className="font-metric-xl text-metric-xl text-error">03</div>
          <div className="font-caption text-caption text-error">Action required immediately</div>
        </div>

        <div className="bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant/30 flex flex-col gap-xs hover:shadow-md transition-all">
          <div className="flex justify-between items-start">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Maintenance</span>
            <span className="material-symbols-outlined text-secondary">engineering</span>
          </div>
          <div className="font-metric-xl text-metric-xl text-secondary">05</div>
          <div className="font-caption text-caption text-on-surface-variant">Scheduled cleaning cycle</div>
        </div>
      </div>

      {/* Management Table Container */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
        {/* Filters & Search Header */}
        <div className="p-lg border-b border-outline-variant/30 flex flex-col md:flex-row md:items-center justify-between gap-md">
          <div className="relative w-full md:w-96">
            <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input 
              type="text"
              placeholder="Search by Unit ID or Personnel..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-xl pr-md py-sm bg-surface-container-low border border-outline-variant rounded-full font-body-md focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-md flex-wrap">
            <select 
              value={genderFilter} 
              onChange={(e) => setGenderFilter(e.target.value)}
              className="bg-surface-container-low border border-outline-variant rounded-xl px-md py-sm font-label-sm text-label-sm focus:ring-primary focus:border-primary focus:outline-none cursor-pointer"
            >
              <option>All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Universal">Universal</option>
            </select>
            <select 
              value={levelFilter} 
              onChange={(e) => setLevelFilter(e.target.value)}
              className="bg-surface-container-low border border-outline-variant rounded-xl px-md py-sm font-label-sm text-label-sm focus:ring-primary focus:border-primary focus:outline-none cursor-pointer"
            >
              <option>All Levels</option>
              <option value="Level 1">Level 1</option>
              <option value="Level 2">Level 2</option>
            </select>
            <button 
              onClick={() => router.push('/incidents')}
              className="bg-primary text-on-primary px-lg py-sm rounded-xl font-label-sm text-label-sm flex items-center gap-xs hover:bg-primary/95 transition-colors cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              New Report
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-lg py-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Unit ID</th>
                <th className="px-lg py-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Gender</th>
                <th className="px-lg py-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Level</th>
                <th className="px-lg py-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">WHI Score</th>
                <th className="px-lg py-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Last Cleaned</th>
                <th className="px-lg py-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Status</th>
                <th className="px-lg py-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredWashrooms.map((w) => {
                const statusPillClass = 
                  w.status === 'CRITICAL' ? 'bg-error-container text-on-error-container' : 
                  w.status === 'CLEANING' ? 'bg-surface-container-highest text-on-surface' : 
                  w.status === 'OCCUPIED' ? 'bg-secondary-container text-on-secondary-container' : 
                  'bg-primary-container/10 text-primary';

                const barColor = 
                  w.status === 'CRITICAL' ? 'bg-error' : 
                  w.status === 'CLEANING' ? 'bg-tertiary-container' : 
                  'bg-primary';

                const fontColor = 
                  w.status === 'CRITICAL' ? 'text-error' : 'text-primary';

                return (
                  <tr 
                    key={w.id} 
                    onClick={() => handleRowClick(w.id)}
                    className="hover:bg-surface-container-low transition-colors group cursor-pointer"
                  >
                    <td className="px-lg py-md">
                      <div className="font-body-lg font-bold text-on-surface">{w.id}</div>
                      <div className="font-caption text-caption text-on-surface-variant">{w.location}</div>
                    </td>
                    <td className="px-lg py-md">
                      <div className="flex items-center gap-xs font-body-md text-on-surface">
                        <span className={`material-symbols-outlined text-[18px] ${w.gender === 'Male' ? 'text-primary' : 'text-tertiary'}`}>
                          {w.gender === 'Male' ? 'male' : w.gender === 'Female' ? 'female' : 'wc'}
                        </span>
                        {w.gender}
                      </div>
                    </td>
                    <td className="px-lg py-md font-body-md text-on-surface">{w.level}</td>
                    <td className="px-lg py-md">
                      <div className="flex items-center gap-sm">
                        <div className="w-16 h-1.5 bg-outline-variant/30 rounded-full overflow-hidden">
                          <div className={`h-full ${barColor}`} style={{ width: `${w.whiScore}%` }}></div>
                        </div>
                        <span className={`font-body-md font-bold ${fontColor}`}>{w.whiScore}%</span>
                      </div>
                    </td>
                    <td className="px-lg py-md font-body-md text-on-surface-variant">{w.lastCleaned}</td>
                    <td className="px-lg py-md">
                      <span className={`inline-flex items-center px-md py-base rounded-full font-label-sm text-label-sm font-bold ${statusPillClass}`}>
                        {w.status}
                      </span>
                    </td>
                    <td className="px-lg py-md" onClick={(e) => e.stopPropagation()}>
                      <button className="text-primary hover:bg-primary/10 p-xs rounded-lg transition-colors cursor-pointer">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-lg bg-surface-container-low/30 border-t border-outline-variant/30 flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant">Showing {filteredWashrooms.length} of 35 washrooms</span>
          <div className="flex gap-xs">
            <button className="p-xs rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-high disabled:opacity-30 cursor-pointer" disabled>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="px-md py-xs rounded-lg bg-primary text-on-primary font-label-sm text-label-sm cursor-pointer shadow-sm">1</button>
            <button className="px-md py-xs rounded-lg border border-outline-variant hover:bg-surface-container-high font-label-sm text-label-sm cursor-pointer">2</button>
            <button className="px-md py-xs rounded-lg border border-outline-variant hover:bg-surface-container-high font-label-sm text-label-sm cursor-pointer">3</button>
            <button className="p-xs rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-high cursor-pointer">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Operational Insights (Bento Style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
        <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/30 flex flex-col gap-md md:col-span-3">
          <h3 className="font-headline-md text-headline-md text-on-surface">Occupancy Trends</h3>
          <div className="flex-1 min-h-[220px] bg-surface-container-low/50 rounded-xl border border-dashed border-outline-variant p-md flex flex-col justify-end relative overflow-hidden">
            <div className="absolute inset-0 w-full h-[90%]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={occupancyTrend} margin={{ top: 20, right: 10, bottom: 5, left: -20 }}>
                  <defs>
                    <linearGradient id="occupancyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#006e2f" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#006e2f" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="hour" 
                    tick={{ fontSize: 10, fill: '#565e74' }} 
                    axisLine={false} 
                    tickLine={false}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    tick={{ fontSize: 10, fill: '#565e74' }} 
                    axisLine={false} 
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#2d3133', 
                      borderColor: '#6d7b6c', 
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '11px'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="occupancy" 
                    stroke="#006e2f" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#occupancyGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant/70 relative z-10 text-center w-full block mt-sm">
              Real-time occupancy heat index by hour
            </span>
          </div>
        </div>
      </div>

      {/* Floating Action Button (FAB) for alerts */}
      <div className="fixed bottom-xl right-xl z-50 group">
        <button 
          onClick={() => router.push('/incidents')}
          className="w-14 h-14 bg-error text-on-error rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer relative"
        >
          <span className="material-symbols-outlined text-[28px]">priority_high</span>
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-error rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm">3</span>
        </button>
        <div className="absolute bottom-full right-0 mb-md opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all flex flex-col gap-xs items-end">
          <span className="bg-inverse-surface text-inverse-on-surface px-md py-xs rounded-lg font-label-sm text-label-sm whitespace-nowrap shadow-md">
            3 Active Critical Incidents
          </span>
        </div>
      </div>
    </div>
  );
}
