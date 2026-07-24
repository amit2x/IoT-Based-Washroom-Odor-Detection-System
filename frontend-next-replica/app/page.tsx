'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { mockIncidents, mockLiveFeed } from '@/lib/mockData';

export default function Dashboard() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'heatmap' | '2d'>('heatmap');
  
  // Only display the unassigned or in-progress incidents for active overview
  const activeIncidents = mockIncidents.filter(inc => inc.status !== 'Resolved');

  const handleRowClick = (id: string) => {
    router.push(`/incidents/summary-details`);
  };

  return (
    <div className="p-lg grid grid-cols-12 gap-lg animate-fade-in">
      {/* Top Stats Cards */}
      <div 
        onClick={() => router.push('/washrooms')}
        className="col-span-12 md:col-span-3 bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant hover:shadow-md cursor-pointer hover:scale-[1.02] transition-all"
      >
        <div className="flex items-center justify-between mb-sm">
          <span className="font-label-sm text-label-sm text-secondary">Total Washrooms</span>
          <span className="material-symbols-outlined text-primary">wc</span>
        </div>
        <div className="font-metric-xl text-metric-xl text-on-surface">35</div>
        <div className="font-caption text-caption text-primary flex items-center gap-1 mt-xs">
          <span className="material-symbols-outlined text-[14px]">check_circle</span>
          All functional
        </div>
      </div>

      <div 
        onClick={() => router.push('/incidents?status=active')}
        className="col-span-12 md:col-span-3 bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant hover:shadow-md cursor-pointer hover:scale-[1.02] transition-all"
      >
        <div className="flex items-center justify-between mb-sm">
          <span className="font-label-sm text-label-sm text-secondary">Active Incidents</span>
          <span className="material-symbols-outlined text-error">report_problem</span>
        </div>
        <div className="font-metric-xl text-metric-xl text-on-surface">{activeIncidents.length}</div>
        <div className="font-caption text-caption text-error flex items-center gap-1 mt-xs">
          <span className="material-symbols-outlined text-[14px]">warning</span>
          Requires attention
        </div>
      </div>

      <div 
        onClick={() => router.push('/device-status?status=online')}
        className="col-span-12 md:col-span-3 bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant hover:shadow-md cursor-pointer hover:scale-[1.02] transition-all"
      >
        <div className="flex items-center justify-between mb-sm">
          <span className="font-label-sm text-label-sm text-secondary">Online Devices</span>
          <span className="material-symbols-outlined text-primary">sensors</span>
        </div>
        <div className="font-metric-xl text-metric-xl text-on-surface">34</div>
        <div className="font-caption text-caption text-on-surface-variant flex items-center gap-1 mt-xs">
          <span className="material-symbols-outlined text-[14px]">signal_cellular_alt</span>
          98.5% uptime
        </div>
      </div>

      {/* Low WHI Alert Card */}
      <div 
        onClick={() => router.push('/live-whi')}
        className="col-span-12 md:col-span-3 bg-error-container/20 p-md rounded-xl shadow-sm border border-error/20 hover:shadow-md cursor-pointer hover:scale-[1.02] transition-all relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-sm">
          <span className="font-label-sm text-label-sm text-on-error-container">Low WHI Alert</span>
          <span className="material-symbols-outlined text-error">trending_down</span>
        </div>
        <div className="font-metric-xl text-metric-xl text-error">42</div>
        <div className="font-caption text-caption text-error flex items-center gap-1 mt-xs">
          <span className="material-symbols-outlined text-[14px]">priority_high</span>
          Critical Hygiene Threshold
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-10">
          <span className="material-symbols-outlined text-[80px]">warning</span>
        </div>
      </div>

      {/* Main Interactive Heatmap */}
      <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden flex flex-col h-[500px]">
        <div className="p-md flex items-center justify-between border-b border-outline-variant bg-surface-bright">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface">Interactive Zone Map</h3>
            <p className="font-caption text-caption text-secondary">Terminal 2 - Concourse B Live View</p>
          </div>
          <div className="flex gap-xs">
            <button
              onClick={() => setViewMode('2d')}
              className={`px-sm py-1 text-label-sm rounded-lg transition-colors cursor-pointer ${
                viewMode === '2d'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              2D View
            </button>
            <button
              onClick={() => setViewMode('heatmap')}
              className={`px-sm py-1 text-label-sm rounded-lg transition-colors cursor-pointer ${
                viewMode === 'heatmap'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              Heatmap
            </button>
          </div>
        </div>

        <div className="flex-1 relative bg-surface-container-high overflow-hidden">
          <img
            alt="Terminal Heatmap"
            className={`w-full h-full object-cover mix-blend-multiply transition-all duration-500 ${
              viewMode === 'heatmap' ? 'opacity-90 grayscale-0' : 'opacity-30 grayscale'
            }`}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoRPynPA7-uwaznrB91MN2H3_Z8Vk89xf3FiiWbH_4x0wBa5lBSvGdQ1BlC_HG83KT7ikt3--JoolykLR-ftftawO9lwDBJGRyB22I_RyyOa5CXLZT-B41rdVZPu-MHByaUaRxY88q7TGmE_a30hifVac8fWs8e0ZD5-Cinr4EaVPPjVtC5KsC9uOJSv4UX8iWqGLdpsnfZbLtkCIVmizTIRZjPQeA4kPIRMFm-qVvXfsy-3T_S8PcnxlgFwc25UIOpCvtRrsqzfU"
          />
          
          {/* Floating Legend */}
          <div className="absolute bottom-4 left-4 p-xs bg-surface-container-lowest/90 backdrop-blur border border-outline-variant rounded-lg flex flex-col gap-xs z-10">
            <div className="flex items-center gap-xs">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-[10px] font-bold text-on-surface">Good (&gt;80)</span>
            </div>
            <div className="flex items-center gap-xs">
              <div className="w-3 h-3 bg-tertiary-container rounded-full"></div>
              <span className="text-[10px] font-bold text-on-surface">Fair (60-80)</span>
            </div>
            <div className="flex items-center gap-xs">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-[10px] font-bold text-on-surface">Critical (&lt;60)</span>
            </div>
          </div>

          {/* Interactive Tooltip Simulation */}
          <div className="absolute top-[40%] left-[30%] p-xs bg-inverse-surface text-inverse-on-surface rounded shadow-lg flex flex-col gap-base border border-outline animate-pulse z-10 cursor-pointer"
               onClick={() => router.push('/floor-heatmap')}>
            <span className="text-[10px] font-bold">G12 Washroom Area</span>
            <div className="flex items-center gap-xs">
              <div className="w-1.5 h-1.5 bg-error rounded-full"></div>
              <span className="text-[10px]">WHI: 42 (Critical)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar: Live WHI Feed */}
      <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden flex flex-col h-[500px]">
        <div className="p-md border-b border-outline-variant bg-surface-bright flex items-center justify-between">
          <h3 className="font-headline-md text-headline-md text-on-surface">Live WHI Feed</h3>
          <span className="material-symbols-outlined text-secondary cursor-pointer">more_vert</span>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-md flex flex-col gap-sm">
          {mockLiveFeed.map((item) => {
            const borderClass = 
              item.status === 'critical' ? 'border-error' : 
              item.status === 'fair' ? 'border-tertiary-container' : 
              'border-primary-container';
            const textClass = 
              item.status === 'critical' ? 'text-error' : 
              item.status === 'fair' ? 'text-on-tertiary-container' : 
              'text-primary';

            return (
              <div 
                key={item.id} 
                className={`p-sm rounded-lg bg-surface-container-low border-l-4 ${borderClass} hover:bg-surface-container transition-colors`}
              >
                <div className="flex justify-between items-start mb-base">
                  <span className="font-label-sm text-label-sm text-on-surface">{item.zone}</span>
                  <span className={`font-caption text-caption ${textClass} font-bold`}>{item.whi}</span>
                </div>
                <p className="font-caption text-caption text-secondary">{item.message}</p>
                <span className="text-[10px] text-secondary mt-xs block">{item.time}</span>
              </div>
            );
          })}
        </div>
        <div className="p-sm text-center border-t border-outline-variant">
          <Link href="/live-whi" className="text-primary font-label-sm text-label-sm hover:underline block">
            View All Metrics
          </Link>
        </div>
      </div>

      {/* Bottom Section: Active Incidents Table */}
      <div className="col-span-12 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden">
        <div className="p-md flex items-center justify-between border-b border-outline-variant bg-surface-bright">
          <div className="flex items-center gap-md">
            <h3 className="font-headline-md text-headline-md text-on-surface">Active Incidents</h3>
            <span className="px-2 py-0.5 bg-error-container text-on-error-container text-[10px] font-bold rounded-full">
              {activeIncidents.filter(inc => inc.priority === 'HIGH' || inc.priority === 'URGENT').length} CRITICAL
            </span>
          </div>
          <button 
            onClick={() => router.push('/incidents')}
            className="flex items-center gap-xs px-md py-1.5 bg-inverse-surface text-inverse-on-surface rounded-lg font-label-sm text-label-sm hover:bg-on-surface-variant transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Report
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-lg py-md font-label-sm text-label-sm text-secondary uppercase tracking-wider">Incident ID</th>
                <th className="px-lg py-md font-label-sm text-label-sm text-secondary uppercase tracking-wider">Location</th>
                <th className="px-lg py-md font-label-sm text-label-sm text-secondary uppercase tracking-wider">Issue</th>
                <th className="px-lg py-md font-label-sm text-label-sm text-secondary uppercase tracking-wider">Priority</th>
                <th className="px-lg py-md font-label-sm text-label-sm text-secondary uppercase tracking-wider">Status</th>
                <th className="px-lg py-md font-label-sm text-label-sm text-secondary uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {activeIncidents.map((incident) => {
                const priorityClass = 
                  incident.priority === 'URGENT' || incident.priority === 'HIGH' 
                    ? 'bg-error-container text-error' 
                    : 'bg-secondary-container text-on-secondary-container';
                
                const statusDotColor = 
                  incident.status === 'Unassigned' ? 'bg-error' : 'bg-tertiary-container';

                return (
                  <tr 
                    key={incident.id} 
                    onClick={() => handleRowClick(incident.id)}
                    className="hover:bg-surface-container-low transition-colors cursor-pointer group"
                  >
                    <td className="px-lg py-md font-body-md text-body-md font-bold text-primary">{incident.id}</td>
                    <td className="px-lg py-md font-body-md text-body-md text-on-surface">{incident.location}</td>
                    <td className="px-lg py-md font-body-md text-body-md text-on-surface-variant">{incident.issue}</td>
                    <td className="px-lg py-md">
                      <span className={`px-2 py-1 text-[11px] font-bold rounded-full ${priorityClass}`}>
                        {incident.priority}
                      </span>
                    </td>
                    <td className="px-lg py-md">
                      <div className="flex items-center gap-xs">
                        <div className={`w-2 h-2 rounded-full ${statusDotColor} ${incident.status === 'Unassigned' ? 'animate-pulse' : ''}`}></div>
                        <span className="font-body-md text-body-md">{incident.status}</span>
                      </div>
                    </td>
                    <td className="px-lg py-md">
                      <span className="material-symbols-outlined text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all">
                        chevron_right
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
