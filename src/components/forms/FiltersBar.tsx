'use client';

import React, { useState } from 'react';
import { Calendar, Filter, ChevronDown } from 'lucide-react';

interface FiltersBarProps {
  onFilterChange?: (filters: any) => void;
}

export default function FiltersBar({ onFilterChange }: FiltersBarProps) {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('Crit');
  const [category, setCategory] = useState<string>('All Event Categories');
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  const severities = ['Crit', 'Warn', 'Info', 'Debg'];

  const handleSeverityChange = (sev: string) => {
    setSelectedSeverity(sev);
    onFilterChange?.({ severity: sev, category });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cat = e.target.value;
    setCategory(cat);
    onFilterChange?.({ severity: selectedSeverity, category: cat });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col space-y-4 shadow-sm select-none">
      <div className="flex flex-wrap items-center gap-4">
        {/* Severity Toggle */}
        <div className="flex border border-slate-200 rounded-lg overflow-hidden font-bold text-[11px] uppercase tracking-wider font-mono">
          {severities.map((sev) => {
            const isActive = selectedSeverity === sev;
            const bgClass = isActive 
              ? sev === 'Crit' ? 'bg-rose-600 text-white' 
              : sev === 'Warn' ? 'bg-amber-500 text-white'
              : sev === 'Info' ? 'bg-blue-600 text-white'
              : 'bg-slate-500 text-white'
              : 'bg-white text-slate-600 border-l border-slate-200 hover:bg-slate-50';

            return (
              <button
                key={sev}
                type="button"
                onClick={() => handleSeverityChange(sev)}
                className={`px-5 py-2.5 transition-colors cursor-pointer ${bgClass}`}
              >
                {sev}
              </button>
            );
          })}
        </div>

        <div className="w-px h-8 bg-slate-200 hidden md:block"></div>

        {/* Category Dropdown */}
        <div className="relative min-w-[200px]">
          <select
            value={category}
            onChange={handleCategoryChange}
            className="w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono text-slate-700"
          >
            <option>All Event Categories</option>
            <option>Authentication</option>
            <option>System Kernel</option>
            <option>Network</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {/* Date Range Picker Placeholder */}
        <button className="flex items-center px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white hover:bg-slate-50 transition-colors flex-1 md:flex-none justify-between cursor-pointer">
          <div className="flex items-center text-slate-600 font-medium text-xs font-mono">
            <Calendar className="w-4 h-4 text-slate-400 mr-3" />
            <span>Last 24 Hours: 2026-06-21 to 2026-06-22</span>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 ml-3" />
        </button>
      </div>

      {/* Advanced Filters Trigger */}
      <div>
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-xs font-bold text-slate-600 uppercase tracking-widest flex items-center hover:text-blue-600 w-fit cursor-pointer font-mono"
        >
          <Filter className="w-4 h-4 mr-2" />
          Advanced Filters
        </button>

        {showAdvanced && (
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 animate-[fadeIn_0.2s_ease-out]">
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Source Node</label>
              <input 
                type="text" 
                placeholder="e.g. AUTH_SERVICE" 
                className="w-full p-2 border border-slate-200 rounded-lg text-xs font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Trace ID</label>
              <input 
                type="text" 
                placeholder="e.g. tr-8812-xp" 
                className="w-full p-2 border border-slate-200 rounded-lg text-xs font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Status Code</label>
              <input 
                type="text" 
                placeholder="e.g. 500" 
                className="w-full p-2 border border-slate-200 rounded-lg text-xs font-mono"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
