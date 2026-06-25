'use client';

import React from 'react';
import { 
  Clock, 
  Layers, 
  ShieldAlert, 
  CheckCircle2, 
  RefreshCw, 
  Zap 
} from 'lucide-react';
import NeuralGraphic from '@/components/dashboard/NeuralGraphic';
import OriginHeatmap from '@/components/dashboard/OriginHeatmap';
import ActiveModelsList from '@/components/dashboard/ActiveModelsList';
import AIEngineLogsTable from '@/components/dashboard/AIEngineLogsTable';

export default function AdminDashboardPage() {
  const handleResync = () => {
    // Re-sync logic
  };

  const handleOptimize = () => {
    // Optimization trigger
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      {/* Title & Page Actions */}
      <div className="flex justify-between items-start mb-8 flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
            Neural Command Center
          </h2>
          <p className="text-slate-500 mt-1 text-sm">
            Real-time oversight of LLM instances and neural pattern deployments.
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleResync}
            className="bg-white border border-slate-300 px-4 py-2 rounded-md text-sm font-semibold text-slate-700 flex items-center space-x-2 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Re-Sync</span>
          </button>
          <button
            onClick={handleOptimize}
            className="bg-blue-600 px-4 py-2 rounded-md text-sm font-semibold text-white flex items-center space-x-2 hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>Optimize</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        
        {/* Avg Latency Card */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between h-36">
          <div className="flex justify-between">
            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase font-mono">
              Avg Latency
            </span>
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-mono font-bold text-slate-800">142</span>
            <span className="text-slate-500 font-mono text-sm">ms</span>
          </div>
        </div>

        {/* Total Tokens Card */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between h-36">
          <div className="flex justify-between">
            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase font-mono">
              Total Tokens
            </span>
            <Layers className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-mono font-bold text-slate-800">2.4</span>
            <span className="text-slate-500 font-mono text-xl font-bold">M</span>
          </div>
        </div>

        {/* Threats Blocked Card */}
        <div className="bg-white p-6 rounded-lg border border-l-4 border-l-rose-500 border-slate-200 shadow-sm flex flex-col justify-between h-36">
          <div className="flex justify-between">
            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase font-mono">
              Threats Blocked
            </span>
            <ShieldAlert className="w-5 h-5 text-rose-500" />
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-4xl font-mono font-bold text-slate-800">12</span>
            <span className="text-[10px] bg-rose-50 text-rose-600 px-2 py-1 rounded font-bold border border-rose-100 uppercase tracking-tighter leading-none font-mono">
              Active Shield
            </span>
          </div>
        </div>

        {/* Model Status Card */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase font-mono">
              Model Status
            </span>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-emerald-500 w-[99.8%] rounded-full"></div>
            </div>
            <div className="flex justify-between items-center font-mono">
              <span className="text-[10px] text-slate-500">99.8% Uptime</span>
              <span className="text-emerald-600 text-xs font-bold">Optimal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Center Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Neural Graphic (2/3 width) */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-700 text-sm font-mono">
                Neural Pattern Analysis
              </h3>
            </div>
            <div className="bg-blue-50 text-blue-700 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-blue-100 font-mono flex items-center space-x-2">
              <span>Real-time Stream</span>
              <span className="inline-block w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
            </div>
          </div>
          
          <NeuralGraphic />
        </div>

        {/* Heatmap & Active Models (1/3 width) */}
        <div className="flex flex-col space-y-6">
          <OriginHeatmap />
          <div className="flex-1">
            <ActiveModelsList />
          </div>
        </div>
      </div>

      {/* Logs Table Component */}
      <AIEngineLogsTable />
    </div>
  );
}
