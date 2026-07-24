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

const chartData = [
  { time: '08:00', whi: 60 },
  { time: '10:00', whi: 55 },
  { time: '12:00', whi: 45 },
  { time: '14:00', whi: 88 },
  { time: '16:00', whi: 55 },
  { time: '18:00', whi: 40 },
  { time: '20:00', whi: 35 }
];

export default function FloorHeatmap() {
  const router = useRouter();
  const [activeLevel, setActiveLevel] = useState<'L1' | 'L2' | 'MZ'>('L1');
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  // Group washrooms
  const maleUnits = mockWashrooms.filter(w => w.gender === 'Male');
  const femaleUnits = mockWashrooms.filter(w => w.gender === 'Female');

  const getWhiTextColor = (score: number) => {
    if (score >= 80) return 'text-primary';
    if (score >= 60) return 'text-primary-container';
    if (score >= 40) return 'text-tertiary-container';
    if (score >= 20) return 'text-secondary-fixed-dim';
    return 'text-error';
  };

  const getWhiBarColor = (score: number) => {
    if (score >= 80) return 'bg-primary';
    if (score >= 60) return 'bg-primary-container';
    if (score >= 40) return 'bg-tertiary-container';
    if (score >= 20) return 'bg-secondary-fixed-dim';
    return 'bg-error';
  };

  return (
    <div className="p-xl space-y-lg animate-fade-in">
      {/* Controls & Overview */}
      <div className="flex items-center justify-between flex-wrap gap-md">
        <div className="flex items-center gap-md">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-base flex gap-base">
            <button 
              onClick={() => setActiveLevel('L1')}
              className={`px-lg py-sm rounded-lg font-label-sm text-label-sm shadow-sm transition-all cursor-pointer ${
                activeLevel === 'L1' ? 'bg-primary text-on-primary' : 'hover:bg-surface-container-high text-on-surface-variant'
              }`}
            >
              Level 1
            </button>
            <button 
              onClick={() => setActiveLevel('L2')}
              className={`px-lg py-sm rounded-lg font-label-sm text-label-sm transition-all cursor-pointer ${
                activeLevel === 'L2' ? 'bg-primary text-on-primary' : 'hover:bg-surface-container-high text-on-surface-variant'
              }`}
            >
              Level 2
            </button>
            <button 
              onClick={() => setActiveLevel('MZ')}
              className={`px-lg py-sm rounded-lg font-label-sm text-label-sm transition-all cursor-pointer ${
                activeLevel === 'MZ' ? 'bg-primary text-on-primary' : 'hover:bg-surface-container-high text-on-surface-variant'
              }`}
            >
              Mezzanine
            </button>
          </div>
          <button className="flex items-center gap-xs px-md py-sm bg-surface-container-lowest border border-outline-variant rounded-xl font-label-sm text-label-sm text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            Filter Zones
          </button>
        </div>

        <div className="flex items-center gap-lg px-lg py-sm bg-surface-container-lowest border border-outline-variant rounded-xl flex-wrap">
          <div className="flex items-center gap-xs">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="font-caption text-caption text-on-surface-variant">80-100 (Ex)</span>
          </div>
          <div className="flex items-center gap-xs">
            <div className="w-3 h-3 bg-primary-container rounded-full"></div>
            <span className="font-caption text-caption text-on-surface-variant">60-80 (Gd)</span>
          </div>
          <div className="flex items-center gap-xs">
            <div className="w-3 h-3 bg-tertiary-container rounded-full"></div>
            <span className="font-caption text-caption text-on-surface-variant">40-60 (Av)</span>
          </div>
          <div className="flex items-center gap-xs">
            <div className="w-3 h-3 bg-secondary-fixed-dim rounded-full"></div>
            <span className="font-caption text-caption text-on-surface-variant">20-40 (Pr)</span>
          </div>
          <div className="flex items-center gap-xs">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="font-caption text-caption text-on-surface-variant">0-20 (Cr)</span>
          </div>
        </div>
      </div>

      {/* Bento Grid Heatmap */}
      <div className="grid grid-cols-12 gap-lg">
        {/* Main Interactive Map Canvas */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-xl shadow-sm relative overflow-hidden min-h-[500px]">
          <div className="absolute inset-0 heatmap-grid opacity-20"></div>
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex justify-between items-start mb-lg">
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface">Interactive Zone Map</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Real-time Washroom Hygiene Index (WHI) across Terminal 2 Arrivals</p>
              </div>
              <div className="flex gap-sm">
                <button className="w-10 h-10 bg-surface-container rounded-full flex items-center justify-center hover:bg-surface-container-high transition-colors text-on-surface-variant">
                  <span className="material-symbols-outlined">zoom_in</span>
                </button>
                <button className="w-10 h-10 bg-surface-container rounded-full flex items-center justify-center hover:bg-surface-container-high transition-colors text-on-surface-variant">
                  <span className="material-symbols-outlined">zoom_out</span>
                </button>
              </div>
            </div>

            {/* Abstract Floor Plan Representation */}
            <div className="flex-grow relative border-2 border-dashed border-outline-variant/50 rounded-2xl p-lg flex items-center justify-center">
              <div className="grid grid-cols-5 gap-md w-full max-w-4xl">
                {/* Male Zones Header */}
                <div className="col-span-1 flex items-center justify-center border-r border-outline-variant/30 pr-md">
                  <div className="flex flex-col items-center gap-sm">
                    <span className="material-symbols-outlined text-primary text-[32px]">male</span>
                    <span className="font-label-sm text-label-sm font-bold text-on-surface-variant">Male Units</span>
                  </div>
                </div>

                {/* Male Cards */}
                <div className="col-span-4 grid grid-cols-2 md:grid-cols-4 gap-md">
                  {maleUnits.map((w) => {
                    const textColor = getWhiTextColor(w.whiScore);
                    const barColor = getWhiBarColor(w.whiScore);
                    
                    return (
                      <div 
                        key={w.id} 
                        onClick={() => router.push('/washrooms')}
                        className="relative bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer"
                      >
                        <div className="flex justify-between items-start mb-base">
                          <span className="font-label-sm text-label-sm font-bold text-on-surface-variant">{w.id}</span>
                          <span className={`font-metric-xl text-metric-xl leading-none ${textColor}`}>{w.whiScore}</span>
                        </div>
                        <div className="w-full h-1 bg-outline-variant/30 rounded-full overflow-hidden">
                          <div className={`h-full ${barColor}`} style={{ width: `${w.whiScore}%` }}></div>
                        </div>
                        {w.status === 'CRITICAL' && (
                          <div className="absolute -top-2 -right-2 w-5 h-5 bg-error text-on-error flex items-center justify-center rounded-full shadow-sm">
                            <span className="material-symbols-outlined text-[14px]">warning</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="col-span-5 h-[1px] bg-outline-variant/30 my-md"></div>

                {/* Female Zones Header */}
                <div className="col-span-1 flex items-center justify-center border-r border-outline-variant/30 pr-md">
                  <div className="flex flex-col items-center gap-sm">
                    <span className="material-symbols-outlined text-secondary text-[32px]">female</span>
                    <span className="font-label-sm text-label-sm font-bold text-on-surface-variant">Female Units</span>
                  </div>
                </div>

                {/* Female Cards */}
                <div className="col-span-4 grid grid-cols-2 md:grid-cols-4 gap-md">
                  {femaleUnits.map((w) => {
                    const textColor = getWhiTextColor(w.whiScore);
                    const barColor = getWhiBarColor(w.whiScore);

                    return (
                      <div 
                        key={w.id}
                        onClick={() => router.push('/washrooms')}
                        className="relative bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer"
                      >
                        <div className="flex justify-between items-start mb-base">
                          <span className="font-label-sm text-label-sm font-bold text-on-surface-variant">{w.id}</span>
                          <span className={`font-metric-xl text-metric-xl leading-none ${textColor}`}>{w.whiScore}</span>
                        </div>
                        <div className="w-full h-1 bg-outline-variant/30 rounded-full overflow-hidden">
                          <div className={`h-full ${barColor}`} style={{ width: `${w.whiScore}%` }}></div>
                        </div>
                        {w.status === 'CRITICAL' && (
                          <div className="absolute -top-2 -right-2 w-5 h-5 bg-error text-on-error flex items-center justify-center rounded-full shadow-sm">
                            <span className="material-symbols-outlined text-[14px]">warning</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Feed & Sidebar Stats */}
        <div className="col-span-12 lg:col-span-4 space-y-lg">
          {/* Performance Summary */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
            <h4 className="font-label-sm text-label-sm font-bold uppercase tracking-widest text-on-surface-variant mb-md">Terminal Summary</h4>
            <div className="space-y-md">
              <div className="flex justify-between items-end">
                <div>
                  <p className="font-caption text-caption text-on-surface-variant">Avg. Terminal WHI</p>
                  <p className="font-metric-xl text-metric-xl text-primary">76<span className="text-body-md font-medium text-on-surface-variant ml-xs">/100</span></p>
                </div>
                <div className="text-right">
                  <span className="text-primary font-bold flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[18px]">trending_up</span>
                    +4.2%
                  </span>
                  <p className="font-caption text-caption text-on-surface-variant">vs yesterday</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-sm">
                <div className="bg-surface-container-low p-sm rounded-xl">
                  <p className="font-caption text-caption text-on-surface-variant">Optimal Units</p>
                  <p className="font-headline-md text-headline-md text-primary">28</p>
                </div>
                <div className="bg-surface-container-low p-sm rounded-xl border border-error/20">
                  <p className="font-caption text-caption text-on-surface-variant">Critical Units</p>
                  <p className="font-headline-md text-headline-md text-error">03</p>
                </div>
              </div>
            </div>
          </div>

          {/* Critical Alerts Feed */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm flex flex-col h-[350px]">
            <div className="flex justify-between items-center mb-md">
              <h4 className="font-label-sm text-label-sm font-bold uppercase tracking-widest text-on-surface-variant">Live Critical Alerts</h4>
              <span className="w-2 h-2 bg-error rounded-full animate-pulse"></span>
            </div>
            <div className="flex-grow space-y-md overflow-y-auto pr-xs custom-scrollbar">
              {/* Alert 1 */}
              <div className="p-md bg-error-container/20 border-l-4 border-error rounded-r-xl">
                <div className="flex justify-between mb-xs">
                  <span className="font-label-sm text-label-sm font-bold text-error">M03 - CRITICAL</span>
                  <span className="font-caption text-caption text-on-surface-variant">2 mins ago</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface font-bold">Odor threshold exceeded</p>
                <p className="font-caption text-caption text-on-surface-variant mb-sm">Unit requires immediate sanitation</p>
                <button 
                  onClick={() => router.push('/incidents')}
                  className="w-full py-sm bg-error text-on-error rounded-lg font-label-sm text-label-sm hover:bg-error/90 transition-colors cursor-pointer"
                >
                  Assign Team
                </button>
              </div>
              {/* Alert 2 */}
              <div className="p-md bg-secondary-container/20 border-l-4 border-secondary rounded-r-xl opacity-80">
                <div className="flex justify-between mb-xs">
                  <span className="font-label-sm text-label-sm font-bold text-secondary">F02 - POOR</span>
                  <span className="font-caption text-caption text-on-surface-variant">15 mins ago</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface font-bold">Water leak detected (Sensor A4)</p>
                <p className="font-caption text-caption text-on-surface-variant mb-sm">Plumbing task auto-generated</p>
                <div className="flex items-center gap-sm">
                  <div className="w-6 h-6 bg-secondary-fixed-dim rounded-full flex items-center justify-center text-on-surface">
                    <span className="material-symbols-outlined text-[14px]">person</span>
                  </div>
                  <span className="font-caption text-caption text-on-surface-variant font-bold">Anita Sen assigned</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => router.push('/incidents')}
              className="w-full mt-lg text-center font-label-sm text-label-sm text-primary hover:underline cursor-pointer"
            >
              View All Alerts
            </button>
          </div>
        </div>
      </div>

      {/* Hourly Trend Recharts line chart */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-xl shadow-sm">
        <div className="flex justify-between items-center mb-lg">
          <div>
            <h4 className="font-headline-md text-headline-md text-on-surface">Terminal Hygiene Trend</h4>
            <p className="font-body-md text-body-md text-on-surface-variant">Hourly average WHI score comparison (Last 24 Hours)</p>
          </div>
          <div className="flex gap-md">
            <div className="flex items-center gap-sm px-md py-xs bg-surface-container rounded-lg font-label-sm text-label-sm text-on-surface-variant">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Today
            </div>
            <div className="flex items-center gap-sm px-md py-xs bg-surface-container rounded-lg font-label-sm text-label-sm text-on-surface-variant">
              <span className="w-2 h-2 bg-outline-variant rounded-full"></span>
              Average
            </div>
          </div>
        </div>

        <div className="h-48 w-full relative mt-lg">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
              <defs>
                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#006e2f" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#006e2f" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 11, fill: '#565e74' }} 
                axisLine={false} 
                tickLine={false}
              />
              <YAxis 
                domain={[0, 100]} 
                tick={{ fontSize: 11, fill: '#565e74' }} 
                axisLine={false} 
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#2d3133', 
                  borderColor: '#6d7b6c', 
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="whi" 
                stroke="#006e2f" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#trendGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
