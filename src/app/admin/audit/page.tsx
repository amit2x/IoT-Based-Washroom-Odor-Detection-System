'use client';

import React from 'react';
import { Download, RefreshCw, BarChart3, AlertOctagon } from 'lucide-react';
import LogVelocityChart from '@/components/tables/LogVelocityChart';
import FiltersBar from '@/components/forms/FiltersBar';
import LogsTable from '@/components/tables/LogsTable';

export default function AdminAuditPage() {
  const handleExport = () => {
    // CSV export logic
  };

  const handleRefresh = () => {
    // Refresh action
  };

  return (
    <div className="px-8 py-8 space-y-6 max-w-7xl mx-auto w-full">
      {/* Title & Page Actions */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Audit Logs</h2>
          <p className="text-slate-500 mt-1 text-sm">
            Reviewing system-wide immutable transaction and security events.
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleExport}
            className="px-4 py-2 border border-slate-300 rounded-md text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 flex items-center shadow-sm cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-600 rounded-md text-sm font-semibold text-white hover:bg-blue-700 flex items-center shadow-sm cursor-pointer transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Force Refresh
          </button>
        </div>
      </div>

      {/* Log Velocity Area Chart */}
      <LogVelocityChart value="1,229" percentage="+12.5% from avg" />

      {/* Summary KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Events */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex items-center">
          <div className="bg-blue-50 p-4 rounded-lg text-blue-600 mr-5">
            <BarChart3 className="w-8 h-8" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest font-mono">
              Total Events (24h)
            </p>
            <p className="text-2xl font-bold text-slate-800 font-mono">42,892,104</p>
          </div>
        </div>

        {/* Critical Threats */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex items-center">
          <div className="bg-red-50 p-4 rounded-lg text-red-500 mr-5">
            <AlertOctagon className="w-8 h-8" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest font-mono">
              Critical Threats
            </p>
            <p className="text-2xl font-bold text-red-600 font-mono">12</p>
          </div>
        </div>

        {/* Active Sync State */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex items-center">
          <div className="bg-indigo-50 p-4 rounded-lg text-indigo-500 mr-5">
            <RefreshCw className="w-8 h-8" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest font-mono">
              Active Sync State
            </p>
            <div className="flex items-center space-x-2 font-mono">
              <p className="text-2xl font-bold text-slate-800">Healthy</p>
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      <FiltersBar />

      {/* Main Events Grid Table */}
      <LogsTable />
    </div>
  );
}
