'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { IncidentsOverviewLineChart, WashroomHealthDonutChart } from '@/components/Charts';
import { initialIncidents } from '@/lib/mockData';

export default function DashboardPage() {
  const [incidents] = useState(initialIncidents);

  return (
    <>
      <Header title="Admin Dashboard" placeholder="Search facilities, terminals, or alerts..." />

      {/* Dashboard Content */}
      <div className="p-margin-page space-y-gutter max-w-container-max mx-auto w-full flex-grow">
        {/* KPI Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md lg:grid-cols-4">
          <Link href="/admin/terminals" className="lg:col-span-1 glass-card p-card-padding rounded-xl flex flex-col justify-between hover:translate-y-[-2px] transition-transform cursor-pointer">
            <div>
              <span className="text-label-md font-label-md text-on-surface-variant tracking-wider uppercase">Terminals</span>
              <h2 className="text-data-num-lg font-data-num-lg text-primary mt-1 font-bold">18</h2>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-secondary font-bold mt-2">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +2 New
            </div>
          </Link>
          
          <Link href="/admin/incidents/active" className="lg:col-span-1 glass-card p-card-padding rounded-xl flex flex-col justify-between border-l-4 border-l-tertiary hover:translate-y-[-2px] transition-transform cursor-pointer">
            <div>
              <span className="text-label-md font-label-md text-on-surface-variant tracking-wider uppercase">Active Incidents</span>
              <h2 className="text-data-num-lg font-data-num-lg text-tertiary mt-1 font-bold">8</h2>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-tertiary font-bold mt-2">
              <span className="material-symbols-outlined text-[14px]">warning</span> Priority Red
            </div>
          </Link>

          <Link href="/admin/incidents/critical" className="lg:col-span-1 glass-card p-card-padding rounded-xl flex flex-col justify-between border-l-4 border-l-error hover:translate-y-[-2px] transition-transform cursor-pointer">
            <div>
              <span className="text-label-md font-label-md text-on-surface-variant tracking-wider uppercase">Critical Alerts</span>
              <h2 className="text-data-num-lg font-data-num-lg text-error mt-1 font-bold">2</h2>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-error font-bold mt-2">
              <span className="material-symbols-outlined text-[14px]">error</span> Immediate Action
            </div>
          </Link>

          <Link href="/admin/devices/online" className="lg:col-span-1 glass-card p-card-padding rounded-xl flex flex-col justify-between hover:translate-y-[-2px] transition-transform cursor-pointer">
            <div>
              <span className="text-label-md font-label-md text-on-surface-variant tracking-wider uppercase">Online Devices</span>
              <h2 className="text-data-num-lg font-data-num-lg text-secondary mt-1 font-bold">315</h2>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-secondary font-bold mt-2">
              <span className="material-symbols-outlined text-[14px]">check_circle</span> 98.4% Up
            </div>
          </Link>
        </div>

        {/* Main Grid: Charts & Activity */}
        <div className="grid grid-cols-12 gap-gutter">
          {/* Line Chart: Incidents Overview */}
          <div className="col-span-12 lg:col-span-7 glass-card p-card-padding rounded-2xl flex flex-col bg-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-title-lg font-headline-md text-on-surface font-semibold">
                Incidents Overview (This Week)
              </h3>
              <select className="text-label-md bg-surface-container border-none rounded-lg py-1 px-3 focus:ring-0 cursor-pointer">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <IncidentsOverviewLineChart />
            <div className="flex gap-4 mt-6 justify-center">
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-on-surface-variant">
                <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span> Critical
              </div>
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-on-surface-variant">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary inline-block"></span> Urgent
              </div>
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-on-surface-variant">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed-dim inline-block"></span> Medium
              </div>
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-on-surface-variant">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-fixed-dim inline-block"></span> Low
              </div>
            </div>
          </div>

          {/* Donut Chart: Health Overview */}
          <div className="col-span-12 lg:col-span-5 glass-card p-card-padding rounded-2xl flex flex-col bg-white">
            <h3 className="text-title-lg font-headline-md text-on-surface mb-6 font-semibold">
              Washroom Health Overview
            </h3>
            <div className="flex items-center justify-between flex-grow">
              <WashroomHealthDonutChart />
              <div className="space-y-3">
                <div className="flex justify-between items-center gap-8 group">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary inline-block"></span>
                    <span className="text-body-sm font-medium">Excellent</span>
                  </div>
                  <span className="text-body-sm font-bold text-on-surface-variant">196 (61%)</span>
                </div>
                <div className="flex justify-between items-center gap-8 group">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary-fixed-dim inline-block"></span>
                    <span className="text-body-sm font-medium">Good</span>
                  </div>
                  <span className="text-body-sm font-bold text-on-surface-variant">72 (22%)</span>
                </div>
                <div className="flex justify-between items-center gap-8 group">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ffb2b7] inline-block"></span>
                    <span className="text-body-sm font-medium">Average</span>
                  </div>
                  <span className="text-body-sm font-bold text-on-surface-variant">28 (9%)</span>
                </div>
                <div className="flex justify-between items-center gap-8 group">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-tertiary inline-block"></span>
                    <span className="text-body-sm font-medium">Poor</span>
                  </div>
                  <span className="text-body-sm font-bold text-on-surface-variant">16 (5%)</span>
                </div>
                <div className="flex justify-between items-center gap-8 group">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-error inline-block"></span>
                    <span className="text-body-sm font-medium">Critical</span>
                  </div>
                  <span className="text-body-sm font-bold text-on-surface-variant">8 (3%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Incidents Table */}
          <div className="col-span-12 glass-card rounded-2xl overflow-hidden bg-white">
            <div className="p-card-padding border-b border-outline-variant flex justify-between items-center">
              <h3 className="text-title-lg font-headline-md text-on-surface font-semibold">Recent Incidents</h3>
              <Link className="text-primary text-label-md font-bold hover:underline" href="/admin/incidents/active">
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-container-low">
                  <tr>
                    <th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase tracking-wider">
                      Facility ID
                    </th>
                    <th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase tracking-wider">
                      Assigned To
                    </th>
                    <th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {incidents.map((incident) => {
                    const isCritical = incident.priority === 'Critical';
                    const isUrgent = incident.priority === 'Urgent';
                    const isMedium = incident.priority === 'Medium';
                    const badgeClass = isCritical
                      ? 'bg-error-container text-on-error-container'
                      : isUrgent
                      ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
                      : isMedium
                      ? 'bg-secondary-container text-on-secondary-container'
                      : 'bg-primary-fixed text-on-primary-fixed-variant';

                    return (
                      <tr key={incident.id} className="hover:bg-surface-container/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-on-surface">{incident.id}</td>
                        <td className="px-6 py-4 text-body-sm">{incident.location}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase ${badgeClass}`}>
                            {incident.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-body-sm">{incident.assignedTo.split(' (')[0]}</td>
                        <td className="px-6 py-4 text-body-sm text-on-surface-variant">{incident.timestamp}</td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/admin/incidents/${incident.id}`}
                            className="material-symbols-outlined text-primary hover:bg-primary-fixed p-1 rounded transition-colors inline-block align-middle"
                          >
                            chevron_right
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-stack-lg px-margin-page flex flex-col md:flex-row justify-between items-center gap-stack-md bg-surface-container-highest dark:bg-on-background border-t border-outline-variant dark:border-outline">
        <p className="text-body-sm font-body-sm text-on-surface-variant dark:text-surface-variant">
          © 2024 Airports Authority of India. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a className="text-label-md font-label-md text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-secondary-fixed-dim transition-colors" href="#">Privacy Policy</a>
          <a className="text-label-md font-label-md text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-secondary-fixed-dim transition-colors" href="#">Terms of Service</a>
          <a className="text-label-md font-label-md text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-secondary-fixed-dim transition-colors" href="#">Support</a>
          <a className="text-label-md font-label-md text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-secondary-fixed-dim transition-colors" href="#">Contact</a>
        </div>
      </footer>

      {/* FAB */}
      <Link href="/admin/incidents/active" className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group">
        <span className="material-symbols-outlined text-2xl group-hover:rotate-90 transition-transform">add</span>
        <div className="absolute right-16 bg-on-background text-white px-4 py-2 rounded-lg text-body-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
          Create Incident Manual
        </div>
      </Link>
    </>
  );
}
