'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { initialIncidents } from '@/lib/mockData';

export default function CriticalAlertsPage() {
  const [incidents, setIncidents] = useState(
    initialIncidents.filter((inc) => inc.priority === 'Critical')
  );
  const [searchTerm, setSearchTerm] = useState('');

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
        title="Critical Alerts"
        placeholder="Search critical alerts..."
        onSearchChange={setSearchTerm}
      />

      {/* Main Content */}
      <main className="p-margin-page min-h-screen space-y-gutter">
        <div className="flex justify-between items-end mb-stack-lg">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-background mb-1 font-bold">
              Immediate Action Required
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Active P1 status anomalies requiring immediate technical dispatch.
            </p>
          </div>
        </div>

        {/* Table list */}
        <div className="bg-white rounded-xl border border-outline-variant overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-[#fff5f5]">
            <h3 className="font-title-lg text-title-lg text-error font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-error animate-pulse">priority_high</span>
              Priority Red Alerts
            </h3>
            <span className="px-3 py-1 bg-error-container text-error rounded-full text-xs font-bold">
              {filteredIncidents.length} ALERTS ACTIVE
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface text-on-surface-variant font-label-md text-label-md uppercase tracking-wider border-b border-outline-variant">
                  <th className="px-6 py-4 font-bold">Alert ID</th>
                  <th className="px-6 py-4 font-bold">Location</th>
                  <th className="px-6 py-4 font-bold">Sensor Device</th>
                  <th className="px-6 py-4 font-bold">Details</th>
                  <th className="px-6 py-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {filteredIncidents.map((incident) => (
                  <tr key={incident.id} className="hover:bg-surface-container-low transition-colors group bg-gradient-to-br from-white to-[#fff5f5] border-l-4 border-l-error">
                    <td className="px-6 py-5 font-bold text-on-surface">
                      <Link href={`/admin/incidents/${incident.id}`} className="hover:underline">
                        #{incident.id}
                      </Link>
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-bold text-on-surface">{incident.location}</p>
                      <p className="text-xs text-on-surface-variant">{incident.facilityId}</p>
                    </td>
                    <td className="px-6 py-5 text-body-sm font-medium">
                      {incident.device}
                    </td>
                    <td className="px-6 py-5 text-body-sm text-on-surface-variant">
                      {incident.description}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => handleResolve(incident.id)}
                        className="bg-error text-on-error font-bold px-4 py-2 rounded-lg text-xs hover:bg-on-error-container transition-all"
                      >
                        Resolve Alert
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredIncidents.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-outline text-body-md">
                      No active critical alerts found. All systems nominal.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
