'use client';

import React, { useState } from 'react';
import { Search, MoreVertical } from 'lucide-react';

interface LogEntry {
  timestamp: string;
  eventType: string;
  originId: string;
  model: string;
  latency: string;
  status: string;
}

const mockLogs: LogEntry[] = [
  {
    timestamp: '2026-06-20 10:00:02.645',
    eventType: 'PROMPT_EXEC',
    originId: 'NODE-8821-XP',
    model: 'Protocol-Alpha-V4',
    latency: '128ms',
    status: '200 OK',
  },
  {
    timestamp: '2026-06-20 10:00:02.112',
    eventType: 'PROMPT_EXEC',
    originId: 'NODE-4192-TY',
    model: 'Shield-Guardian-LLM',
    latency: '84ms',
    status: '200 OK',
  },
  {
    timestamp: '2026-06-20 09:59:58.983',
    eventType: 'GUARD_BLOCK',
    originId: 'NODE-1120-ZW',
    model: 'Shield-Guardian-LLM',
    latency: '12ms',
    status: '403 BLOCKED',
  },
  {
    timestamp: '2026-06-20 09:59:45.301',
    eventType: 'PROMPT_EXEC',
    originId: 'NODE-8821-XP',
    model: 'Protocol-Alpha-V4',
    latency: '141ms',
    status: '200 OK',
  },
  {
    timestamp: '2026-06-20 09:59:12.774',
    eventType: 'SYNC_CHECK',
    originId: 'NODE-9902-LK',
    model: 'Legacy-Audit-Node',
    latency: '190ms',
    status: '200 OK',
  }
];

export default function AIEngineLogsTable() {
  const [filterText, setFilterText] = useState('');

  const filteredLogs = mockLogs.filter((log) =>
    Object.values(log).some((val) =>
      val.toLowerCase().includes(filterText.toLowerCase())
    )
  );

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden mt-8">
      {/* Table Header */}
      <div className="p-4 flex justify-between items-center border-b border-slate-100 flex-wrap gap-4">
        <h3 className="font-bold text-slate-800 text-sm font-mono">AI Engine Logs</h3>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="pl-10 pr-4 py-1.5 border border-slate-200 rounded-md text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-64"
              placeholder="Filter events..."
            />
          </div>
          <button className="text-slate-400 hover:text-slate-600">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                Timestamp
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                Event Type
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                Origin ID
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                Model
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                Latency
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="font-mono text-sm divide-y divide-slate-100">
            {filteredLogs.map((log, index) => {
              const isError = log.status.includes('403') || log.eventType.includes('BLOCK');
              const statusColor = isError ? 'text-rose-600' : 'text-emerald-600';
              const dotColor = isError ? 'bg-rose-500' : 'bg-emerald-500';
              const badgeClass = isError 
                ? 'bg-rose-50 text-rose-700 border border-rose-100'
                : 'bg-blue-50 text-blue-700 border border-blue-100';

              return (
                <tr key={index} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-4 text-slate-500 text-xs">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${badgeClass}`}>
                      {log.eventType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-xs">{log.originId}</td>
                  <td className="px-6 py-4 text-slate-800 text-xs">{log.model}</td>
                  <td className="px-6 py-4 text-slate-600 text-xs">{log.latency}</td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center ${statusColor} font-bold text-xs`}>
                      <span className={`w-2 h-2 rounded-full ${dotColor} mr-2`}></span>
                      {log.status}
                    </div>
                  </td>
                </tr>
              );
            })}
            {filteredLogs.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-slate-400 font-sans text-xs">
                  No events match filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
