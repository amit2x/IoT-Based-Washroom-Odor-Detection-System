'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BarChart, 
  Bar, 
  ResponsiveContainer 
} from 'recharts';

// Mock sparkline data
const zoneAData = [
  { val: 40 }, { val: 60 }, { val: 45 }, { val: 70 }, { val: 80 }, { val: 88 }
];
const zoneBData = [
  { val: 50 }, { val: 40 }, { val: 55 }, { val: 60 }, { val: 68 }, { val: 72 }
];
const zoneCData = [
  { val: 90 }, { val: 80 }, { val: 75 }, { val: 60 }, { val: 50 }, { val: 45 }
];

export default function LiveWhiFeed() {
  const router = useRouter();
  const [pulseColor, setPulseColor] = useState('#006e2f');

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseColor(prev => prev === '#006e2f' ? '#4ae176' : '#006e2f');
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-lg space-y-lg animate-fade-in">
      {/* Top Bento Layer: Overview & Heatmap */}
      <div className="grid grid-cols-12 gap-lg">
        {/* Live Sparkline Grid */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-lg gap-sm">
            <h3 className="font-headline-md text-headline-md flex items-center gap-sm text-on-surface">
              <span className="material-symbols-outlined text-primary">analytics</span>
              Real-time Performance Trends
            </h3>
            <div className="flex gap-xs">
              <button className="px-md py-base bg-primary text-on-primary rounded-lg text-label-sm font-label-sm shadow-sm cursor-pointer">Live</button>
              <button className="px-md py-base hover:bg-surface-container text-on-surface-variant rounded-lg text-label-sm font-label-sm cursor-pointer">1h</button>
              <button className="px-md py-base hover:bg-surface-container text-on-surface-variant rounded-lg text-label-sm font-label-sm cursor-pointer">24h</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            {/* Zone A */}
            <div className="p-md rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col justify-between h-40">
              <div className="flex justify-between items-start mb-xs">
                <span className="text-label-sm font-label-sm text-on-surface-variant">ZONE A (INTERNATIONAL)</span>
                <span className="text-primary font-bold text-body-md">↑ 4%</span>
              </div>
              <div className="text-metric-xl font-metric-xl text-primary leading-none mb-sm">88</div>
              <div className="h-12 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={zoneAData}>
                    <Bar dataKey="val" fill="#22c55e" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Zone B */}
            <div className="p-md rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col justify-between h-40">
              <div className="flex justify-between items-start mb-xs">
                <span className="text-label-sm font-label-sm text-on-surface-variant">ZONE B (DOMESTIC)</span>
                <span className="text-secondary font-bold text-body-md">→ 0%</span>
              </div>
              <div className="text-metric-xl font-metric-xl text-secondary leading-none mb-sm">72</div>
              <div className="h-12 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={zoneBData}>
                    <Bar dataKey="val" fill="#565e74" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Zone C */}
            <div className="p-md rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col justify-between h-40">
              <div className="flex justify-between items-start mb-xs">
                <span className="text-label-sm font-label-sm text-on-surface-variant">ZONE C (LOUNGES)</span>
                <span className="text-error font-bold text-body-md">↓ 12%</span>
              </div>
              <div className="text-metric-xl font-metric-xl text-error leading-none mb-sm">45</div>
              <div className="h-12 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={zoneCData}>
                    <Bar dataKey="val" fill="#ba1a1a" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Critical Attention Sidebar */}
        <div className="col-span-12 lg:col-span-4 bg-error-container/30 p-lg rounded-xl border border-error/20 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center gap-sm mb-md">
              <span className="material-symbols-outlined text-error animate-pulse" style={{ color: pulseColor }}>warning</span>
              <h3 className="font-headline-md text-headline-md text-on-error-container">Critical Attention</h3>
            </div>
            <p className="text-label-sm font-label-sm text-on-error-container/70 mb-md">UNITS BELOW 20 WHI THRESHOLD</p>
            <div className="space-y-sm">
              <div 
                onClick={() => router.push('/washrooms')}
                className="bg-surface-container-lowest p-md rounded-xl border-l-4 border-error flex items-center justify-between shadow-sm cursor-pointer hover:bg-surface-container-low transition-colors"
              >
                <div>
                  <p className="font-bold text-on-surface">M03 - Male</p>
                  <p className="text-caption font-caption text-secondary">Domestic Arrivals - L1</p>
                </div>
                <div className="text-right">
                  <p className="text-headline-md font-bold text-error">18</p>
                  <p className="text-caption font-caption text-error font-bold">URGENT</p>
                </div>
              </div>

              <div 
                onClick={() => router.push('/washrooms')}
                className="bg-surface-container-lowest p-md rounded-xl border-l-4 border-error flex items-center justify-between shadow-sm cursor-pointer hover:bg-surface-container-low transition-colors"
              >
                <div>
                  <p className="font-bold text-on-surface">F09 - Female</p>
                  <p className="text-caption font-caption text-secondary">Gate 14 - Departure</p>
                </div>
                <div className="text-right">
                  <p className="text-headline-md font-bold text-error">22</p>
                  <p className="text-caption font-caption text-error font-bold">MONITOR</p>
                </div>
              </div>
            </div>
          </div>
          <button 
            onClick={() => router.push('/incidents')}
            className="mt-lg w-full py-md bg-error text-on-error rounded-xl font-bold flex items-center justify-center gap-sm hover:brightness-110 transition-all cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined">emergency_share</span>
            Dispatch Rapid Response
          </button>
        </div>
      </div>

      {/* Bottom Layer: Leaderboard & Regional Map */}
      <div className="grid grid-cols-12 gap-lg">
        {/* Leaderboard */}
        <div className="col-span-12 lg:col-span-7 bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-lg gap-sm">
            <h3 className="font-headline-md text-headline-md text-on-surface">Performance Leaderboard</h3>
            <div className="flex items-center gap-xs text-on-surface-variant bg-surface-container-low px-md py-base rounded-full cursor-pointer hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-body-md">filter_list</span>
              <span className="text-label-sm font-label-sm">Filter: Terminal 2 Wide</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="border-b border-outline-variant">
                <tr>
                  <th className="py-md px-sm text-label-sm font-label-sm text-secondary uppercase tracking-wider">Rank</th>
                  <th className="py-md px-sm text-label-sm font-label-sm text-secondary uppercase tracking-wider">Unit Designation</th>
                  <th className="py-md px-sm text-label-sm font-label-sm text-secondary uppercase tracking-wider">WHI Score</th>
                  <th className="py-md px-sm text-label-sm font-label-sm text-secondary uppercase tracking-wider">Last 1h</th>
                  <th className="text-right py-md px-sm text-label-sm font-label-sm text-secondary uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                <tr className="hover:bg-surface-container-low transition-colors group cursor-pointer" onClick={() => router.push('/washrooms')}>
                  <td className="py-md px-sm"><span className="w-8 h-8 flex items-center justify-center bg-primary-fixed text-on-primary-fixed font-bold rounded-full text-label-sm">#1</span></td>
                  <td className="py-md px-sm font-bold text-on-surface">M01 - International Dep.</td>
                  <td className="py-md px-sm"><span className="text-primary font-bold">96</span></td>
                  <td className="py-md px-sm text-primary">+2%</td>
                  <td className="py-md px-sm text-right">
                    <span className="px-md py-base rounded-full bg-primary-container/20 text-primary text-caption font-bold">EXCELLENT</span>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-low transition-colors group cursor-pointer" onClick={() => router.push('/washrooms')}>
                  <td className="py-md px-sm"><span className="w-8 h-8 flex items-center justify-center bg-secondary-fixed text-on-secondary-fixed font-bold rounded-full text-label-sm">#2</span></td>
                  <td className="py-md px-sm font-bold text-on-surface">F04 - Central Plaza L2</td>
                  <td className="py-md px-sm"><span className="text-primary font-bold">92</span></td>
                  <td className="py-md px-sm text-secondary">0%</td>
                  <td className="py-md px-sm text-right">
                    <span className="px-md py-base rounded-full bg-primary-container/20 text-primary text-caption font-bold">EXCELLENT</span>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-low transition-colors group cursor-pointer" onClick={() => router.push('/washrooms')}>
                  <td className="py-md px-sm"><span className="w-8 h-8 flex items-center justify-center bg-surface-container-highest text-on-surface font-bold rounded-full text-label-sm">#3</span></td>
                  <td className="py-md px-sm font-bold text-on-surface">M12 - Lounge East</td>
                  <td className="py-md px-sm"><span className="text-primary font-bold">89</span></td>
                  <td className="py-md px-sm text-error">-1%</td>
                  <td className="py-md px-sm text-right">
                    <span className="px-md py-base rounded-full bg-primary-container/20 text-primary text-caption font-bold">EXCELLENT</span>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-low transition-colors group cursor-pointer" onClick={() => router.push('/washrooms')}>
                  <td className="py-md px-sm"><span className="w-8 h-8 flex items-center justify-center text-on-surface-variant font-bold text-label-sm">#4</span></td>
                  <td className="py-md px-sm font-bold text-on-surface">F02 - Baggage Claim</td>
                  <td className="py-md px-sm"><span className="text-secondary font-bold">78</span></td>
                  <td className="py-md px-sm text-primary">+5%</td>
                  <td className="py-md px-sm text-right">
                    <span className="px-md py-base rounded-full bg-secondary-container/30 text-secondary text-caption font-bold">GOOD</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Zone Density Grid Map */}
        <div className="col-span-12 lg:col-span-5 bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/30 flex flex-col relative overflow-hidden justify-between">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">Terminal Hygiene Map</h3>
            <p className="text-caption font-caption text-on-surface-variant mb-lg">Visual density and health hotspots</p>
          </div>
          <div className="grid grid-cols-5 grid-rows-4 gap-base h-64 cursor-pointer" onClick={() => router.push('/floor-heatmap')}>
            {/* Grid density visualizer boxes */}
            <div className="bg-primary/80 rounded-sm hover:brightness-105 transition-all"></div>
            <div className="bg-primary/90 rounded-sm hover:brightness-105 transition-all"></div>
            <div className="bg-primary/60 rounded-sm hover:brightness-105 transition-all"></div>
            <div className="bg-primary/40 rounded-sm hover:brightness-105 transition-all"></div>
            <div className="bg-secondary/40 rounded-sm hover:brightness-105 transition-all"></div>
            
            <div className="bg-primary/70 rounded-sm hover:brightness-105 transition-all"></div>
            <div className="bg-error/30 rounded-sm border border-error/50 hover:brightness-105 transition-all"></div>
            <div className="bg-error/60 rounded-sm border border-error/50 hover:brightness-105 transition-all"></div>
            <div className="bg-secondary/50 rounded-sm hover:brightness-105 transition-all"></div>
            <div className="bg-primary/80 rounded-sm hover:brightness-105 transition-all"></div>
            
            <div className="bg-secondary/30 rounded-sm hover:brightness-105 transition-all"></div>
            <div className="bg-primary/50 rounded-sm hover:brightness-105 transition-all"></div>
            <div className="bg-primary/90 rounded-sm hover:brightness-105 transition-all"></div>
            <div className="bg-primary/70 rounded-sm hover:brightness-105 transition-all"></div>
            <div className="bg-primary/40 rounded-sm hover:brightness-105 transition-all"></div>
            
            <div className="bg-primary/60 rounded-sm hover:brightness-105 transition-all"></div>
            <div className="bg-secondary/60 rounded-sm hover:brightness-105 transition-all"></div>
            <div className="bg-secondary/40 rounded-sm hover:brightness-105 transition-all"></div>
            <div className="bg-primary/80 rounded-sm hover:brightness-105 transition-all"></div>
            <div className="bg-primary/90 rounded-sm hover:brightness-105 transition-all"></div>
          </div>
          <div className="mt-lg flex items-center justify-between text-caption font-caption text-secondary">
            <div className="flex items-center gap-xs">
              <span className="w-3 h-3 bg-error rounded-xs"></span>
              <span>Action Required</span>
            </div>
            <div className="flex items-center gap-xs">
              <span className="w-3 h-3 bg-secondary rounded-xs"></span>
              <span>Average</span>
            </div>
            <div className="flex items-center gap-xs">
              <span className="w-3 h-3 bg-primary rounded-xs"></span>
              <span>Optimal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
