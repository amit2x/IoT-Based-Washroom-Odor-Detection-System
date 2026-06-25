'use client';

import React, { useState } from 'react';
import { 
  Download, 
  Wifi, 
  Cpu, 
  HardDrive, 
  RefreshCw, 
  Search, 
  Filter 
} from 'lucide-react';
import LogVelocityChart from '@/components/tables/LogVelocityChart';
import SystemLogsTable from '@/components/tables/SystemLogsTable';

export default function AdminSystemLogsPage() {
  const [isLive, setIsLive] = useState(true);

  const handleExport = () => {
    // Export CSV logic
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto w-full">
      {/* Title & Page Actions */}
      <div className="flex justify-between items-end flex-wrap gap-4 select-none">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-sans">
            System Logs
          </h2>
          <p className="text-sm text-slate-500 mt-1 font-sans">
            Real-time audit trail and event ingestion pipeline.
          </p>
        </div>
        <div className="flex gap-2 font-mono">
          <div className="flex items-center border border-slate-200 rounded overflow-hidden">
            <button 
              onClick={handleExport}
              className="bg-white p-2 border-r border-slate-200 hover:bg-slate-50 cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-600" />
            </button>
            <button 
              onClick={handleExport}
              className="bg-white px-4 py-2 text-[10px] font-bold text-blue-800 hover:bg-slate-50 uppercase cursor-pointer"
            >
              EXPORT CSV
            </button>
          </div>
          <button
            onClick={() => setIsLive(!isLive)}
            className={`text-white px-4 py-2 flex items-center gap-2 rounded transition-colors cursor-pointer ${
              isLive ? 'bg-blue-600 hover:bg-blue-700 animate-pulse' : 'bg-slate-600 hover:bg-slate-700'
            }`}
          >
            <Wifi className="w-4 h-4" />
            <span className="text-xs font-bold tracking-widest uppercase">
              {isLive ? 'LIVE FEED' : 'PAUSED'}
            </span>
          </button>
        </div>
      </div>

      {/* Log Velocity Line Chart */}
      <LogVelocityChart value="1,284" percentage="+8.4% since last hour" />

      {/* Simplified Filters Bar specific to System Logs template */}
      <section className="bg-white border border-slate-200 rounded-lg p-4 flex flex-wrap gap-4 items-end shadow-sm select-none">
        <div className="flex-1 min-w-[240px] space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
            GLOBAL SEARCH
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-mono"
              placeholder="Search by message, trace ID, or node..."
            />
          </div>
        </div>

        <div className="w-48 space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
            SEVERITY
          </label>
          <select className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:ring-1 focus:ring-blue-500 font-mono text-slate-700">
            <option>All Severities</option>
            <option>CRIT</option>
            <option>WARN</option>
            <option>INFO</option>
          </select>
        </div>

        <div className="w-48 space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
            EVENT CATEGORY
          </label>
          <select className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:ring-1 focus:ring-blue-500 font-mono text-slate-700">
            <option>All Events</option>
            <option>Security</option>
            <option>System</option>
            <option>Application</option>
          </select>
        </div>

        <button className="bg-blue-600 text-white px-8 py-2 rounded font-bold text-xs uppercase hover:bg-blue-700 h-10 cursor-pointer font-mono">
          APPLY
        </button>
        <button className="border border-slate-200 p-2 rounded hover:bg-slate-50 h-10 cursor-pointer text-slate-400">
          <Filter className="w-5 h-5" />
        </button>
      </section>

      {/* System Logs Data Table */}
      <SystemLogsTable />

      {/* System Health Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none font-mono">
        
        {/* CPU Load Card */}
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-lg flex items-center gap-4">
          <div className="w-12 h-12 bg-white border border-blue-200 rounded-md flex items-center justify-center shadow-sm text-blue-600">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">
              CPU CLUSTER LOAD
            </p>
            <p className="text-2xl font-bold text-slate-900">
              42.8%{' '}
              <span className="text-[10px] font-medium text-emerald-500 bg-emerald-50 px-1.5 py-0.5 ml-1 rounded">
                Stable
              </span>
            </p>
          </div>
        </div>

        {/* Ingestion Queue Card */}
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-lg flex items-center gap-4">
          <div className="w-12 h-12 bg-white border border-blue-200 rounded-md flex items-center justify-center shadow-sm text-blue-600">
            <Wifi className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">
              INGESTION QUEUE
            </p>
            <p className="text-2xl font-bold text-slate-900">
              1.2k <span className="text-sm font-medium text-slate-400">/sec</span>
            </p>
          </div>
        </div>

        {/* S3 Sync State Card */}
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-lg flex items-center gap-4">
          <div className="w-12 h-12 bg-white border border-blue-200 rounded-md flex items-center justify-center shadow-sm text-blue-600">
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">
              S3 SYNC STATE
            </p>
            <p className="text-2xl font-bold text-slate-900">
              99.9%{' '}
              <span className="text-[10px] font-medium text-blue-500 ml-1 italic">
                Syncing
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
