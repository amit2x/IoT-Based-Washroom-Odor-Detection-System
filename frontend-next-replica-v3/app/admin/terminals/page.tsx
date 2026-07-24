'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { initialTerminals } from '@/lib/mockData';

export default function TerminalsPage() {
  const [terminals, setTerminals] = useState(initialTerminals);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Maintenance'>('All');

  const filteredTerminals = terminals.filter((term) => {
    const matchesSearch =
      term.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.location.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterStatus === 'All') return matchesSearch;
    if (filterStatus === 'Active') return matchesSearch && term.status === 'Active';
    if (filterStatus === 'Maintenance') return matchesSearch && term.status === 'Maintenance';
    return matchesSearch;
  });

  return (
    <>
      <Header
        title="Terminals Overview"
        placeholder="Search terminals, locations, or IDs..."
        onSearchChange={setSearchTerm}
      />

      {/* Scrollable Content */}
      <section className="flex-1 p-margin-page bg-surface-container-low/30 relative">
        {/* Page Header & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-stack-lg">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Terminals List</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Monitoring {terminals.length} assets across the facility network
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white p-1 rounded-xl shadow-sm border border-outline-variant/50">
            <button
              onClick={() => setFilterStatus('All')}
              className={`px-4 py-2 rounded-lg font-label-md transition-all ${
                filterStatus === 'All' ? 'bg-primary text-white' : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('Active')}
              className={`px-4 py-2 rounded-lg font-label-md transition-all ${
                filterStatus === 'Active' ? 'bg-primary text-white' : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilterStatus('Maintenance')}
              className={`px-4 py-2 rounded-lg font-label-md transition-all ${
                filterStatus === 'Maintenance' ? 'bg-primary text-white' : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              Maintenance
            </button>
          </div>
        </div>

        {/* Bento Grid Layout for Terminals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
          {filteredTerminals.map((term) => {
            const isCritical = term.status === 'Critical';
            const isWarning = term.status === 'Warning';
            const isMaintenance = term.status === 'Maintenance';

            let statusColor = 'bg-secondary';
            let statusText = 'Active';
            let statusClass = 'bg-secondary-container text-on-secondary-container';

            if (isCritical) {
              statusColor = 'bg-error';
              statusText = 'Critical';
              statusClass = 'bg-error-container text-on-error-container';
            } else if (isWarning) {
              statusColor = 'bg-tertiary';
              statusText = 'Warning';
              statusClass = 'bg-tertiary-fixed text-on-tertiary-fixed-variant';
            } else if (isMaintenance) {
              statusColor = 'bg-outline';
              statusText = 'Maintenance';
              statusClass = 'bg-surface-container-highest text-on-surface-variant';
            }

            const healthTextColor = isCritical
              ? 'text-error'
              : isWarning
              ? 'text-tertiary'
              : 'text-secondary';
            const healthBarColor = isCritical
              ? 'bg-error'
              : isWarning
              ? 'bg-tertiary'
              : 'bg-secondary';

            // Large card styling for critical items
            const isLargeCard = isCritical;

            return (
              <div
                key={term.id}
                className={`bg-white rounded-xl border border-outline-variant p-card-padding flex flex-col gap-4 shadow-sm hover:shadow-md transition-all relative overflow-hidden group ${
                  isLargeCard ? 'lg:col-span-2 xl:col-span-2' : ''
                }`}
              >
                <div className="absolute top-0 right-0 p-4">
                  <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusClass}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statusColor} ${isCritical ? 'animate-pulse' : ''}`} />
                    {statusText}
                  </span>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary-container/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-3xl">
                      {isLargeCard ? 'precision_manufacturing' : 'domain'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-title-lg text-title-lg font-bold">{term.id}</h3>
                    <p className="text-body-sm text-on-surface-variant">{term.location}</p>
                  </div>
                </div>

                <div className="flex-grow mt-2">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-label-md text-on-surface-variant">Health Score</span>
                    <span className={`font-data-num-lg text-data-num-lg font-bold ${healthTextColor}`}>
                      {term.healthScore}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${healthBarColor}`}
                      style={{ width: `${term.healthScore}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-outline-variant mt-2">
                  <div className="flex -space-x-2">
                    {term.assignedTechs.map((tech, idx) => (
                      <img
                        key={idx}
                        alt={tech.name}
                        className="w-8 h-8 rounded-full border-2 border-white"
                        src={tech.avatar}
                      />
                    ))}
                    {term.assignedTechs.length > 0 && (
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-container-highest flex items-center justify-center text-[10px] font-bold">
                        +{term.assignedTechs.length}
                      </div>
                    )}
                  </div>
                  <Link
                    href={`/admin/terminals/${term.id}`}
                    className="bg-primary px-4 py-2 rounded-lg text-white font-label-md flex items-center gap-2 hover:bg-primary-container transition-colors text-xs font-bold"
                  >
                    View Diagnostics <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Bottom Panel for Map/Cluster View Toggle */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center bg-inverse-surface text-inverse-on-surface rounded-full px-6 py-3 shadow-2xl z-50 gap-4">
          <button className="flex items-center gap-2 font-label-md hover:text-primary transition-colors">
            <span className="material-symbols-outlined">grid_view</span> Grid
          </button>
          <div className="w-[1px] h-4 bg-white/20"></div>
          <button className="flex items-center gap-2 font-label-md opacity-60 hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined">map</span> Map View
          </button>
          <div className="w-[1px] h-4 bg-white/20"></div>
          <button className="flex items-center gap-2 font-label-md opacity-60 hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined">hub</span> Network Hub
          </button>
        </div>
      </section>

      {/* Contextual Stats Overlay */}
      <div className="fixed right-6 top-24 w-72 pointer-events-none hidden xl:flex flex-col gap-4">
        <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-outline-variant/30 shadow-lg pointer-events-auto">
          <h5 className="text-xs font-bold text-primary mb-3 flex items-center justify-between">
            System Health
            <span className="material-symbols-outlined text-sm">show_chart</span>
          </h5>
          <div className="flex items-end justify-between gap-1 h-12">
            <div className="w-full bg-primary/20 rounded-t h-[60%]"></div>
            <div className="w-full bg-primary/40 rounded-t h-[85%]"></div>
            <div className="w-full bg-primary/20 rounded-t h-[45%]"></div>
            <div className="w-full bg-primary/60 rounded-t h-[92%]"></div>
            <div className="w-full bg-primary/30 rounded-t h-[70%]"></div>
            <div className="w-full bg-primary/50 rounded-t h-[80%]"></div>
            <div className="w-full bg-primary rounded-t h-[98%]"></div>
          </div>
          <div className="mt-3 flex justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] text-on-surface-variant">Uptime</span>
              <span className="text-sm font-bold">99.98%</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-on-surface-variant">Latency</span>
              <span className="text-sm font-bold">14ms</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
