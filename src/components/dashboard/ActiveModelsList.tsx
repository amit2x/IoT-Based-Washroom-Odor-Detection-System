'use client';

import React from 'react';

interface ModelItem {
  name: string;
  type: string;
  status: 'active' | 'idle';
}

const activeModels: ModelItem[] = [
  { name: 'Protocol-Alpha-V4', type: 'L-70B', status: 'active' },
  { name: 'Shield-Guardian-LLM', type: 'L-7B', status: 'active' },
  { name: 'Legacy-Audit-Node', type: 'Idle', status: 'idle' },
];

export default function ActiveModelsList() {
  return (
    <div className="bg-[#1e293b] text-slate-300 p-6 rounded-lg shadow-inner h-full flex flex-col justify-between">
      <div>
        <div className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-4 font-mono">
          Active Models
        </div>
        <div className="space-y-4">
          {activeModels.map((model) => (
            <div
              key={model.name}
              className="flex justify-between items-center text-xs py-2 border-b border-slate-700/50 last:border-b-0 font-mono"
            >
              <div className="flex items-center space-x-3">
                <span
                  className={`w-2 h-2 rounded-full ${
                    model.status === 'active' ? 'bg-emerald-500' : 'bg-slate-500'
                  }`}
                ></span>
                <span>{model.name}</span>
              </div>
              <span className="text-slate-500 font-mono">
                {model.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
