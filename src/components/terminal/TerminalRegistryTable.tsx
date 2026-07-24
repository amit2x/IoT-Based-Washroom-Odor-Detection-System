'use client';

import React from 'react';
import { RefreshCw } from 'lucide-react';

type NodeStatus = 'ONLINE' | 'OFFLINE' | 'DEGRADED';

interface TerminalNode {
  id:        string;
  location:  string;
  operator:  string | null;
  status:    NodeStatus;
  sessions:  number;
  lastPing:  string;
}

const nodes: TerminalNode[] = [
  { id: 'TERM-001', location: 'US-East Lobby', operator: 'OP-4421', status: 'ONLINE',   sessions: 42, lastPing: '0.8s' },
  { id: 'TERM-002', location: 'Floor B2',      operator: 'OP-7891', status: 'ONLINE',   sessions: 31, lastPing: '1.2s' },
  { id: 'TERM-003', location: 'Server Room',   operator: null,       status: 'OFFLINE',  sessions: 0,  lastPing: '8m'   },
  { id: 'TERM-004', location: 'Reception',     operator: 'OP-1122', status: 'DEGRADED', sessions: 12, lastPing: '2.1s' },
  { id: 'TERM-005', location: 'IT Dept',       operator: 'OP-9902', status: 'ONLINE',   sessions: 55, lastPing: '0.5s' },
];

const statusCfg: Record<NodeStatus, { dot: string; badge: string; text: string }> = {
  ONLINE:   { dot: 'bg-emerald-500', badge: 'bg-emerald-50  border-emerald-200  text-emerald-700', text: '• ONLINE'   },
  OFFLINE:  { dot: 'bg-red-500',     badge: 'bg-red-50     border-red-200      text-red-700',     text: '• OFFLINE'  },
  DEGRADED: { dot: 'bg-amber-500',   badge: 'bg-amber-50   border-amber-200    text-amber-700',   text: '• DEGRADED' },
};

const pingColor: Record<NodeStatus, string> = {
  ONLINE:   'text-slate-500',
  OFFLINE:  'text-red-500 font-bold',
  DEGRADED: 'text-amber-600 font-bold',
};

export default function TerminalRegistryTable() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

      {/* Table Header */}
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <h3 className="font-bold text-slate-800 font-mono text-sm">Live Terminal Registry</h3>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full uppercase tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block" />
            Live
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors" title="Filter">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M10 12h4" />
            </svg>
          </button>
          <button className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors" title="More">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100">
              {['Terminal ID','Location','Operator','Status','Sessions','Last Ping','Actions'].map((col, i) => (
                <th
                  key={col}
                  className={`px-6 py-3 text-[10px] font-bold text-slate-400 tracking-widest uppercase font-mono ${i === 6 ? 'text-right' : ''}`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {nodes.map((node) => {
              const cfg = statusCfg[node.status];
              return (
                <tr
                  key={node.id}
                  className={`hover:bg-slate-50/80 transition-colors group ${node.status === 'OFFLINE' ? 'bg-red-50/30' : ''}`}
                >
                  {/* ID */}
                  <td className="px-6 py-4 font-mono font-bold text-slate-800 text-sm">
                    {node.id}
                  </td>

                  {/* Location */}
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {node.location}
                  </td>

                  {/* Operator */}
                  <td className="px-6 py-4 text-sm font-mono">
                    {node.operator
                      ? <span className="text-blue-600 font-semibold">{node.operator}</span>
                      : <span className="text-slate-400">—</span>
                    }
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono border ${cfg.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {node.status}
                    </span>
                  </td>

                  {/* Sessions */}
                  <td className="px-6 py-4 font-mono text-sm text-slate-600">
                    {node.sessions}
                  </td>

                  {/* Last Ping */}
                  <td className={`px-6 py-4 font-mono text-sm ${pingColor[node.status]}`}>
                    {node.lastPing}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {node.status === 'OFFLINE' ? (
                        <button className="inline-flex items-center gap-1 text-[11px] font-mono text-red-600 border border-red-200 bg-red-50 px-2.5 py-1 rounded hover:bg-red-100 transition-colors">
                          <RefreshCw className="w-3 h-3" />
                          Reconnect
                        </button>
                      ) : (
                        <>
                          <button className="text-[11px] font-mono text-blue-600 border border-blue-200 bg-blue-50 px-2.5 py-1 rounded hover:bg-blue-100 transition-colors">
                            View
                          </button>
                          <button className="text-[11px] font-mono text-slate-600 border border-slate-200 px-2.5 py-1 rounded hover:bg-slate-100 transition-colors">
                            Suspend
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] font-mono text-slate-400">Showing 5 of 47 terminal nodes</span>
        <div className="flex items-center space-x-1.5">
          <button className="text-[11px] font-mono text-slate-500 border border-slate-200 px-3 py-1 rounded bg-white hover:bg-slate-50 transition-colors">
            ← Prev
          </button>
          <button className="text-[11px] font-mono text-white border border-blue-600 bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition-colors">
            1
          </button>
          <button className="text-[11px] font-mono text-slate-500 border border-slate-200 px-3 py-1 rounded bg-white hover:bg-slate-50 transition-colors">
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
