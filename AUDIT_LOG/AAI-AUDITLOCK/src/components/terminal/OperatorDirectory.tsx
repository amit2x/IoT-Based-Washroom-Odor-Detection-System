'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';

const operators = [
  { id: 'OP-4421', role: 'System Admin', status: 'active'  as const },
  { id: 'OP-7891', role: 'Terminal Op',  status: 'active'  as const },
  { id: 'OP-1122', role: 'Junior Op',   status: 'idle'    as const },
  { id: 'OP-9902', role: 'Senior Op',   status: 'active'  as const },
];

export default function OperatorDirectory() {
  return (
    <div className="bg-[#1e293b] rounded-xl shadow-sm p-6 h-full flex flex-col border border-slate-700/40">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
          <span className="text-blue-400">⬡</span>
          Operator Directory
        </h3>
        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
          {operators.filter(o => o.status === 'active').length}/{operators.length} Active
        </span>
      </div>

      {/* List */}
      <div className="space-y-2 flex-1">
        {operators.map((op) => (
          <div
            key={op.id}
            className="flex items-center justify-between px-3 py-3 rounded-lg bg-[#0f172a] border border-slate-700/60 hover:border-blue-500/40 transition-colors group cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  op.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
              <div>
                <p className="text-[13px] font-mono font-bold text-slate-100 tracking-wide">
                  {op.id}
                </p>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  {op.role}
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
}
