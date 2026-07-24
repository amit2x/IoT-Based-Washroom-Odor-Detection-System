'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { initialIncidents } from '@/lib/mockData';

export default function ActiveIncidentsPage() {
  const [incidents, setIncidents] = useState(initialIncidents);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAcknowledge = (id: string) => {
    setIncidents(
      incidents.map((inc) =>
        inc.id === id ? { ...inc, status: 'In Progress', assignedTo: 'Rahul S. (Acknowledged)' } : inc
      )
    );
  };

  const handleResolve = (id: string) => {
    setIncidents(incidents.filter((inc) => inc.id !== id));
  };

  const filteredIncidents = incidents.filter(
    (inc) =>
      inc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header
        title="Active Incidents"
        placeholder="Search incidents, assets or teams..."
        onSearchChange={setSearchTerm}
      />

      {/* Main Content Area */}
      <main className="p-margin-page min-h-screen space-y-gutter">
        {/* Dashboard Header */}
        <div className="flex justify-between items-end mb-stack-lg">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-background mb-1 font-bold">Incidents Monitoring</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Monitoring {incidents.length} unresolved system alerts and infrastructure failures.
            </p>
          </div>
          <div className="flex gap-stack-md">
            <button className="flex items-center gap-2 bg-surface-container-highest text-primary font-bold px-6 py-2.5 rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-all text-xs">
              <span className="material-symbols-outlined text-[20px]">filter_list</span>
              Filter Views
            </button>
            <button className="flex items-center gap-2 bg-primary text-on-primary font-bold px-6 py-2.5 rounded-lg hover:opacity-90 active:scale-[0.98] transition-all text-xs">
              <span className="material-symbols-outlined text-[20px]">add</span>
              Log Incident
            </button>
          </div>
        </div>

        {/* Priority Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-stack-lg">
          <div className="bg-white p-card-padding rounded-xl border border-outline-variant flex items-center justify-between shadow-sm">
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant mb-1 font-semibold">Critical (P1)</p>
              <p className="text-data-num-lg font-data-num-lg text-error font-bold">03</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-error-container flex items-center justify-center text-on-error-container">
              <span className="material-symbols-outlined fill-icon rounded-full p-2 animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
                priority_high
              </span>
            </div>
          </div>
          <div className="bg-white p-card-padding rounded-xl border border-outline-variant flex items-center justify-between shadow-sm">
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant mb-1 font-semibold">Warning (P2)</p>
              <p className="text-data-num-lg font-data-num-lg text-on-tertiary-fixed-variant font-bold">02</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined">warning</span>
            </div>
          </div>
          <div className="bg-white p-card-padding rounded-xl border border-outline-variant flex items-center justify-between shadow-sm">
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant mb-1 font-semibold">Minor (P3)</p>
              <p className="text-data-num-lg font-data-num-lg text-secondary font-bold">03</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-container">
              <span className="material-symbols-outlined">info</span>
            </div>
          </div>
          <div className="bg-white p-card-padding rounded-xl border border-outline-variant flex items-center justify-between shadow-sm">
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant mb-1 font-semibold">Response Time</p>
              <p className="text-data-num-lg font-data-num-lg text-primary font-bold">4.2m</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">speed</span>
            </div>
          </div>
        </div>

        {/* Incident Table Container */}
        <div className="bg-white rounded-xl border border-outline-variant overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
            <h3 className="font-title-lg text-title-lg text-on-surface font-bold">Live Incident Feed</h3>
            <div className="flex gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-outline-variant text-[11px] font-bold text-on-surface-variant">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                LIVE SYNC
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface text-on-surface-variant font-label-md text-label-md uppercase tracking-wider border-b border-outline-variant">
                  <th className="px-6 py-4 font-bold">Incident ID</th>
                  <th className="px-6 py-4 font-bold">Priority</th>
                  <th className="px-6 py-4 font-bold">Description &amp; Location</th>
                  <th className="px-6 py-4 font-bold">Assigned Team</th>
                  <th className="px-6 py-4 font-bold">Time Elapsed</th>
                  <th className="px-6 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {filteredIncidents.map((incident) => {
                  const isCritical = incident.priority === 'Critical';
                  const isUrgent = incident.priority === 'Urgent';
                  const isMedium = incident.priority === 'Medium';

                  let priorityClass = 'bg-primary text-on-primary';
                  if (isCritical) priorityClass = 'bg-error text-on-error';
                  else if (isUrgent) priorityClass = 'bg-tertiary text-on-tertiary';
                  else if (isMedium) priorityClass = 'bg-secondary text-on-secondary';

                  return (
                    <tr
                      key={incident.id}
                      className={`hover:bg-surface-container-low transition-colors group ${
                        isCritical ? 'bg-gradient-to-br from-white to-[#fff5f5] border-l-4 border-l-error' : ''
                      }`}
                    >
                      <td className="px-6 py-5">
                        <Link href={`/admin/incidents/${incident.id}`} className="font-bold text-on-surface hover:underline">
                          #{incident.id}
                        </Link>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-2.5 py-1 rounded font-bold text-[11px] uppercase ${priorityClass}`}>
                          {incident.priority} P{isCritical ? 1 : isUrgent ? 2 : 3}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <p className="font-bold text-on-surface">{incident.category}</p>
                        <p className="text-body-sm text-on-surface-variant">{incident.location}</p>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded bg-primary-fixed-dim flex items-center justify-center text-primary font-bold text-[10px]">
                            {incident.assignedTo.substring(0, 2).toUpperCase()}
                          </div>
                          <span className="font-body-md text-body-sm text-on-surface">
                            {incident.assignedTo.split(' (')[0]}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-error font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">timer</span> 00:18:32
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleAcknowledge(incident.id)}
                            className="bg-surface-container-highest text-primary font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-primary-container hover:text-on-primary-container transition-all"
                          >
                            Acknowledge
                          </button>
                          <button
                            onClick={() => handleResolve(incident.id)}
                            className="bg-error text-on-error font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-on-error-container transition-all"
                          >
                            Resolve
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Table Footer */}
          <div className="px-6 py-4 bg-surface-container-low flex justify-between items-center border-t border-outline-variant">
            <p className="font-label-md text-label-md text-on-surface-variant">
              Showing {filteredIncidents.length} of {filteredIncidents.length} active incidents
            </p>
            <div className="flex gap-2">
              <button className="p-2 border border-outline-variant rounded-lg hover:bg-white disabled:opacity-50" disabled>
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="p-2 border border-outline-variant rounded-lg hover:bg-white disabled:opacity-50" disabled>
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Asymmetric Visual Map Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          {/* Mini Map Card */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-outline-variant overflow-hidden h-[300px] relative group shadow-sm">
            <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg border border-outline-variant shadow-sm">
              <p className="font-bold text-label-md text-on-surface">Incident Hotspots</p>
              <p className="text-[10px] text-on-surface-variant">Real-time terminal overlay</p>
            </div>
            <div className="w-full h-full grayscale-[0.5] contrast-[1.2]">
              <img
                alt="Incident Hotspots Map"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoeiQYspUqCw8mRlRTqbeFSUokAdx5ovPcOJFdRphBwFTnEmn80KlVMZ6m5mAmNcf5qbtk1PXzA_5g-iZKyMdTtsLMzPFm1aJFWqFmOjJv0HeYEeD0Mi7WVj80_FlTeqo4SizAM7obELCStTLux0ku6384DlZis063N5vCyesqi1eZaZcK9bqwoFDI_CK8ikMohWz4DatbwMTpjKSgJymOd1T_HhsC6AGuuC8NhhMEIuV6CEzlW3Nwibj2kTYtmsiAL6zwoyAUyOq3"
              />
            </div>
            <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
              <button className="bg-primary text-on-primary p-2 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center">
                <span className="material-symbols-outlined">zoom_in</span>
              </button>
              <button className="bg-primary text-on-primary p-2 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center">
                <span className="material-symbols-outlined">my_location</span>
              </button>
            </div>
          </div>
          {/* Shift Summary Card */}
          <div className="bg-primary text-on-primary p-card-padding rounded-xl shadow-lg flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <p className="font-label-md text-label-md opacity-80 mb-2">Shift Performance</p>
              <h3 className="font-headline-md text-headline-md font-extrabold mb-stack-md leading-tight text-white font-bold">
                Critical Incidents Resolved: <span className="text-secondary-fixed">14</span>
              </h3>
              <p className="font-body-md text-body-sm opacity-90 mb-4">
                You are currently 12% faster in resolving P1 alerts compared to the monthly average.
              </p>
            </div>
            <div className="relative z-10 bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-md text-label-md">Current Capacity</span>
                <span className="font-bold text-label-md">84%</span>
              </div>
              <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                <div className="bg-secondary-fixed h-full w-[84%]"></div>
              </div>
            </div>
            {/* Background elements */}
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-32 h-32 bg-secondary-fixed/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </main>
    </>
  );
}
