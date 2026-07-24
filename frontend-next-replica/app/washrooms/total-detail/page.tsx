'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface UnitDetails {
  id: string;
  gender: 'man' | 'woman' | 'wc';
  status: 'Functional' | 'Service Req.' | 'Critical';
  score: number;
  occupancy: string;
  airQuality: number;
  consumables: number;
  lastCheck: string;
  alertText?: string;
  techEnRoute?: boolean;
}

export default function TotalWashroomsDetail() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'grid' | 'list'>('grid');

  const initialUnits: UnitDetails[] = [
    {
      id: 'T2-L2-B14',
      gender: 'man',
      status: 'Functional',
      score: 94,
      occupancy: '12/18',
      airQuality: 90,
      consumables: 75,
      lastCheck: '14m ago'
    },
    {
      id: 'T2-L1-A05',
      gender: 'woman',
      status: 'Service Req.',
      score: 68,
      occupancy: '8/8',
      airQuality: 60,
      consumables: 15,
      lastCheck: 'Low Paper/Soap'
    },
    {
      id: 'T2-L2-W12',
      gender: 'wc',
      status: 'Critical',
      score: 42,
      occupancy: 'OFFLINE',
      airQuality: 30,
      consumables: 20,
      lastCheck: 'Water Leak (Cubicle 4)',
      alertText: 'Water Leak Detected (Cubicle 4)',
      techEnRoute: true
    },
    {
      id: 'T2-L3-M02',
      gender: 'woman',
      status: 'Functional',
      score: 91,
      occupancy: '4/12',
      airQuality: 95,
      consumables: 88,
      lastCheck: '2h 15m ago'
    },
    {
      id: 'T2-L1-B02',
      gender: 'man',
      status: 'Functional',
      score: 85,
      occupancy: '5/10',
      airQuality: 82,
      consumables: 70,
      lastCheck: 'Live Telemetry Active'
    },
    {
      id: 'T2-L2-A09',
      gender: 'woman',
      status: 'Functional',
      score: 89,
      occupancy: '11/15',
      airQuality: 89,
      consumables: 75,
      lastCheck: 'Live Telemetry Active'
    },
    {
      id: 'T2-L1-C04',
      gender: 'wc',
      status: 'Service Req.',
      score: 72,
      occupancy: '3/4',
      airQuality: 70,
      consumables: 50,
      lastCheck: 'Live Telemetry Active'
    },
    {
      id: 'T2-L3-A01',
      gender: 'man',
      status: 'Functional',
      score: 96,
      occupancy: '1/12',
      airQuality: 96,
      consumables: 90,
      lastCheck: 'Live Telemetry Active'
    }
  ];

  const [units, setUnits] = useState<UnitDetails[]>(initialUnits);

  return (
    <div className="p-lg min-h-[calc(100vh-80px)] space-y-xl animate-fade-in">
      {/* Hero Metrics Section */}
      <section className="grid grid-cols-12 gap-lg">
        {/* Total Units Hero */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest p-lg rounded-xl border border-outline-variant metric-card-glow flex flex-col justify-between hover:shadow-sm transition-shadow">
          <div>
            <h3 className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-xs">Total Units Managed</h3>
            <div className="flex items-baseline gap-xs">
              <span className="font-metric-xl text-metric-xl text-primary">35</span>
              <span className="font-body-md text-body-md text-on-surface-variant">Active Terminals</span>
            </div>
          </div>
          <div className="mt-lg pt-lg border-t border-outline-variant/30 grid grid-cols-3 gap-md">
            <div className="text-center">
              <p className="font-headline-md text-headline-md text-primary">28</p>
              <p className="font-caption text-caption text-outline">FUNCTIONAL</p>
            </div>
            <div className="text-center border-x border-outline-variant/30">
              <p className="font-headline-md text-headline-md text-secondary">5</p>
              <p className="font-caption text-caption text-outline">SERVICE</p>
            </div>
            <div className="text-center">
              <p className="font-headline-md text-headline-md text-error">2</p>
              <p className="font-caption text-caption text-outline">CRITICAL</p>
            </div>
          </div>
        </div>

        {/* Operational Context Area */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-lg rounded-xl border border-outline-variant metric-card-glow grid grid-cols-1 md:grid-cols-3 gap-lg hover:shadow-sm transition-shadow">
          <div className="flex flex-col gap-xs">
            <h4 className="font-label-sm text-label-sm text-outline">AVERAGE WHI SCORE</h4>
            <div className="flex items-center gap-sm">
              <div className="h-16 w-16 rounded-full border-4 border-primary/20 flex items-center justify-center relative">
                <span className="font-headline-md text-headline-md text-primary">88</span>
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle 
                    className="text-primary" 
                    cx="32" 
                    cy="32" 
                    fill="transparent" 
                    r="28" 
                    stroke="currentColor" 
                    strokeDasharray="175" 
                    strokeDashoffset="21" 
                    strokeWidth="4"
                  />
                </svg>
              </div>
              <div>
                <p className="font-body-md text-body-md font-bold text-on-surface">Target: 90+</p>
                <p className="font-caption text-caption text-outline">Last 24h average</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-xs">
            <h4 className="font-label-sm text-label-sm text-outline">OCCUPANCY PEAK</h4>
            <div className="flex flex-col h-full justify-center">
              <div className="flex justify-between items-end mb-xs">
                <span className="font-headline-md text-headline-md">72%</span>
                <span className="font-caption text-caption text-primary flex items-center gap-base">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span> 4%
                </span>
              </div>
              <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-secondary-fixed-dim" style={{ width: '72%' }}></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-xs">
            <h4 className="font-label-sm text-label-sm text-outline">SERVICE ALERTS</h4>
            <div className="bg-error-container/20 border border-error/10 p-md rounded-lg flex items-start gap-md h-full">
              <span className="material-symbols-outlined text-error">assignment_late</span>
              <div>
                <p className="font-body-md text-body-md font-bold text-error">2 Urgent Cleanups</p>
                <p className="font-caption text-caption text-on-error-container/85">Terminal 2 West, Gate 42</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Control Bar */}
      <section className="bg-surface-container-lowest p-md rounded-lg border border-outline-variant flex flex-wrap items-center justify-between gap-md shadow-sm">
        <div className="flex items-center gap-md flex-wrap">
          <span className="material-symbols-outlined text-outline">filter_list</span>
          <select className="bg-surface-bright border border-outline-variant rounded px-md py-xs font-label-sm text-label-sm focus:ring-primary focus:outline-none cursor-pointer">
            <option>All Terminal Levels</option>
            <option>Level 1 (Arrivals)</option>
            <option>Level 2 (Departures)</option>
            <option>Level 3 (Mezzanine)</option>
          </select>
          <select className="bg-surface-bright border border-outline-variant rounded px-md py-xs font-label-sm text-label-sm focus:ring-primary focus:outline-none cursor-pointer">
            <option>All Zones</option>
            <option>Zone A (International)</option>
            <option>Zone B (Domestic)</option>
            <option>Zone C (Remote)</option>
          </select>
          <div className="flex rounded-lg overflow-hidden border border-outline-variant">
            <button 
              onClick={() => setActiveTab('grid')}
              className={`px-md py-xs font-label-sm text-label-sm cursor-pointer ${
                activeTab === 'grid' ? 'bg-primary text-on-primary' : 'bg-surface-bright text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              Grid
            </button>
            <button 
              onClick={() => setActiveTab('list')}
              className={`px-md py-xs font-label-sm text-label-sm cursor-pointer ${
                activeTab === 'list' ? 'bg-primary text-on-primary' : 'bg-surface-bright text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              List
            </button>
          </div>
        </div>
        <div className="flex items-center gap-md">
          <button className="flex items-center gap-xs px-md py-xs bg-surface-container text-on-surface-variant font-label-sm text-label-sm rounded border border-outline-variant hover:bg-surface-container-high transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">refresh</span> Sync Live
          </button>
          <button 
            onClick={() => router.push('/incidents')}
            className="flex items-center gap-xs px-md py-xs bg-primary text-on-primary font-label-sm text-label-sm rounded shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span> Schedule Service
          </button>
        </div>
      </section>

      {/* Washroom Units Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-lg">
        {units.map((u) => {
          const isCritical = u.status === 'Critical';
          const isService = u.status === 'Service Req.';

          const borderClass = 
            isCritical ? 'border-2 border-error' : 'border border-outline-variant hover:border-primary/50';

          const cardHeaderBg = 
            isCritical ? 'bg-error-container/10' : 'bg-surface-container-low';

          const pillClass = 
            isCritical ? 'bg-error text-on-error' : 
            isService ? 'bg-secondary-container text-on-secondary-container' : 
            'bg-primary/10 text-primary';

          const scoreColorClass = 
            isCritical ? 'text-error' : 
            isService ? 'text-secondary' : 
            'text-primary';

          const indicatorClass = (val: number) => {
            if (val >= 80) return 'bg-primary';
            if (val >= 50) return 'bg-secondary';
            return 'bg-error';
          };

          return (
            <div 
              key={u.id}
              onClick={() => router.push('/washrooms')}
              className={`bg-surface-container-lowest rounded-xl overflow-hidden transition-all cursor-pointer group shadow-sm hover:shadow-md ${borderClass}`}
            >
              <div className={`p-md border-b border-outline-variant ${cardHeaderBg} flex justify-between items-center`}>
                <div className="flex items-center gap-sm">
                  <span className={`material-symbols-outlined ${isCritical ? 'text-error' : 'text-outline'}`}>
                    {u.gender === 'man' ? 'man' : u.gender === 'woman' ? 'woman' : 'wc'}
                  </span>
                  <span className={`font-body-md text-body-md font-bold ${isCritical ? 'text-error' : ''}`}>{u.id}</span>
                </div>
                <span className={`status-pill ${pillClass}`}>{u.status}</span>
              </div>
              
              <div className="p-md">
                <div className="flex justify-between items-center mb-md">
                  <div>
                    <p className="font-caption text-caption text-outline">WHI SCORE</p>
                    <p className={`font-headline-md text-headline-md ${scoreColorClass}`}>{u.score}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-caption text-caption text-outline">OCCUPANCY</p>
                    <p className={`font-headline-md text-headline-md ${isCritical ? 'text-error' : ''}`}>{u.occupancy}</p>
                  </div>
                </div>

                {u.alertText ? (
                  <div className="flex items-center gap-md p-sm bg-error-container/20 rounded border border-error/20">
                    <span className="material-symbols-outlined text-error">leak_add</span>
                    <span className="font-caption text-caption text-on-error-container">{u.alertText}</span>
                  </div>
                ) : (
                  <div className="space-y-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-caption text-caption text-on-surface-variant">Air Quality</span>
                      <div className="w-24 h-1.5 bg-surface-container rounded-full overflow-hidden">
                        <div className={`h-full ${indicatorClass(u.airQuality)}`} style={{ width: `${u.airQuality}%` }}></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-caption text-caption text-on-surface-variant">Consumables</span>
                      <div className="w-24 h-1.5 bg-surface-container rounded-full overflow-hidden">
                        <div className={`h-full ${indicatorClass(u.consumables)}`} style={{ width: `${u.consumables}%` }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className={`px-md py-xs flex justify-between items-center ${isCritical ? 'bg-error-container/10' : 'bg-surface-container-low'}`}>
                <span className={`font-caption text-caption ${isCritical ? 'text-error font-bold' : 'text-outline'}`}>
                  {isCritical && u.techEnRoute ? 'Technician En Route' : `Last check: ${u.lastCheck}`}
                </span>
                <span className={`material-symbols-outlined text-outline group-hover:text-primary ${isCritical ? 'text-error' : ''}`}>
                  {isCritical && u.techEnRoute ? 'engineering' : 'chevron_right'}
                </span>
              </div>
            </div>
          );
        })}
      </section>

      {/* Insights / Activity Section */}
      <section className="grid grid-cols-12 gap-lg">
        {/* Maintenance Log Table */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
          <div className="p-lg border-b border-outline-variant flex justify-between items-center bg-surface-bright">
            <h3 className="font-headline-md text-headline-md text-on-surface">Recent Maintenance Log</h3>
            <button className="text-primary font-label-sm text-label-sm hover:underline cursor-pointer">
              View History
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body-md text-body-md">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant text-outline uppercase font-label-sm text-[10px] tracking-widest">
                  <th className="px-lg py-sm">Timestamp</th>
                  <th className="px-lg py-sm">Unit ID</th>
                  <th className="px-lg py-sm">Action Performed</th>
                  <th className="px-lg py-sm">Technician</th>
                  <th className="px-lg py-sm">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                <tr className="hover:bg-surface-container-high transition-colors">
                  <td className="px-lg py-md text-on-surface-variant">Today, 08:42</td>
                  <td className="px-lg py-md font-bold">T2-L2-B14</td>
                  <td className="px-lg py-md">Consumable Restock</td>
                  <td className="px-lg py-md flex items-center gap-sm">
                    <div className="w-6 h-6 rounded-full bg-secondary-fixed text-[10px] flex items-center justify-center font-bold text-on-surface">JD</div>
                    <span>J. Doe</span>
                  </td>
                  <td className="px-lg py-md">
                    <span className="status-pill bg-primary/10 text-primary">Completed</span>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-high transition-colors">
                  <td className="px-lg py-md text-on-surface-variant">Today, 07:15</td>
                  <td className="px-lg py-md font-bold">T2-L1-A05</td>
                  <td className="px-lg py-md">Deep Clean Cycle</td>
                  <td className="px-lg py-md flex items-center gap-sm">
                    <div className="w-6 h-6 rounded-full bg-secondary-fixed text-[10px] flex items-center justify-center font-bold text-on-surface">MS</div>
                    <span>M. Smith</span>
                  </td>
                  <td className="px-lg py-md">
                    <span className="status-pill bg-primary/10 text-primary">Completed</span>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-high transition-colors">
                  <td className="px-lg py-md text-on-surface-variant">Today, 06:30</td>
                  <td className="px-lg py-md font-bold">T2-L2-W12</td>
                  <td className="px-lg py-md">Water Main Shutdown</td>
                  <td className="px-lg py-md flex items-center gap-sm">
                    <div className="w-6 h-6 rounded-full bg-secondary-fixed text-[10px] flex items-center justify-center font-bold text-on-surface">RK</div>
                    <span>R. Kane</span>
                  </td>
                  <td className="px-lg py-md">
                    <span className="status-pill bg-secondary-container text-on-secondary-container">In Progress</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Heatmap Visual summary on Right */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
          <h4 className="font-label-sm text-label-sm text-outline uppercase mb-md">Terminal Heatmap Summary</h4>
          <div className="aspect-video bg-surface-container rounded-lg overflow-hidden relative border border-outline-variant">
            <img 
              className="w-full h-full object-cover opacity-60" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHRVm_pKUcybZ2X-naxQcbRR5kCAdpS_G0Fwjt6LYsi-NAZmtFhafkYVAC45rndSevVR32715V5UEqQ3sICo23tQ8uA4rCGuVAA76t3VsTq1Nq8q0Xqs6TgR0a4N5ISyMBRRFpKG4JUAINZrI36BljuWEugQ985X_dRqQFqXaS_b8s9x7YBXbOti-VUF9l2TsMvb5tUbWBNSp02CZstGN2bxqdoZb5zU87rLLAryU6y7O9sI8VcRSKHjnc9Iac36hjo_Z38Uy0ENw" 
              alt="Terminal architectural plan"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span 
                className="bg-white/90 backdrop-blur-sm px-md py-xs rounded-full shadow-lg font-label-sm text-label-sm text-primary flex items-center gap-xs cursor-pointer"
                onClick={() => router.push('/floor-heatmap')}
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> Terminal 2 Live View
              </span>
            </div>
          </div>
          <div className="mt-md flex justify-between items-center text-on-surface-variant">
            <p className="font-caption text-caption">High traffic detected in Zone B</p>
            <button 
              onClick={() => router.push('/floor-heatmap')}
              className="material-symbols-outlined text-primary cursor-pointer hover:bg-surface-container-high p-xs rounded-full transition-all"
            >
              fullscreen
            </button>
          </div>
        </div>
      </section>

      {/* Floating Action Button for Emergency Response */}
      <button className="fixed bottom-lg right-lg w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-50 group cursor-pointer">
        <span className="material-symbols-outlined text-[28px]">emergency_home</span>
        <span className="absolute right-16 bg-inverse-surface text-inverse-on-surface px-md py-xs rounded text-label-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Emergency Response
        </span>
      </button>
    </div>
  );
}
