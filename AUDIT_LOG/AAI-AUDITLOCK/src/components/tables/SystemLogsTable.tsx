'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SystemLogEntry {
  timestamp: string;
  severity: 'CRIT' | 'WARN' | 'INFO';
  source: string;
  message: string;
}

const mockSystemLogs: SystemLogEntry[] = [
  {
    timestamp: '2026-06-22 14:22:01.442',
    severity: 'CRIT',
    source: 'DB_CLUSTER_01',
    message: 'Connection pool exhausted in production-east-01. Dropped 45 incoming requests.',
  },
  {
    timestamp: '2026-06-22 14:21:58.910',
    severity: 'WARN',
    source: 'AUTH_SERVICE',
    message: 'High frequency of failed logins (20/sec) from IP: 192.168.1.45. Throttling active.',
  },
  {
    timestamp: '2026-06-22 14:21:55.102',
    severity: 'INFO',
    source: 'LOAD_BALANCER',
    message: 'SSL handshake successful for node_7741. Certificate expires in 45 days.',
  },
  {
    timestamp: '2026-06-22 14:21:40.334',
    severity: 'INFO',
    source: 'KERNEL',
    message: "Scheduled backup task 'daily_snapshot' completed in 12.4s.",
  }
];

export default function SystemLogsTable() {
  const [selectedLog, setSelectedLog] = useState<SystemLogEntry | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const severityBadgeClass = (sev: string) => {
    switch (sev) {
      case 'CRIT':
        return 'border border-red-200 bg-red-50 text-red-600';
      case 'WARN':
        return 'border border-yellow-200 bg-yellow-50 text-yellow-600';
      case 'INFO':
      default:
        return 'border border-blue-200 bg-blue-50 text-blue-600';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm flex flex-col">
      {/* Table Data */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead className="bg-[#0f172a] text-white text-[10px] uppercase tracking-wider font-bold font-mono">
            <tr>
              <th className="px-6 py-3 border-r border-slate-700">INDEX</th>
              <th className="px-6 py-3 border-r border-slate-700">Timestamp</th>
              <th className="px-6 py-3 border-r border-slate-700">Severity</th>
              <th className="px-6 py-3 border-r border-slate-700">Source</th>
              <th className="px-6 py-3 border-r border-slate-700">Message</th>
              <th className="px-6 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-[11px] font-medium font-mono">
            {mockSystemLogs.map((log, index) => {
              const itemIndex = (currentPage - 1) * pageSize + index + 1;
              return (
                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{itemIndex}</td>
                  <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${severityBadgeClass(log.severity)}`}>
                      {log.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-blue-700 font-bold">{log.source}</td>
                  <td className="px-6 py-4 text-slate-800 leading-relaxed max-w-sm break-words">
                    {log.message}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedLog(log)}
                      className="text-blue-700 hover:underline font-bold text-[9px] uppercase cursor-pointer"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      <div className="px-6 py-4 bg-slate-50 flex items-center justify-between border-t border-slate-100 font-mono select-none">
        <span className="text-[10px] text-slate-500 font-bold">
          Showing 1-{mockSystemLogs.length} of 14,204 logs
        </span>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center border border-slate-200 bg-white rounded hover:bg-slate-100 disabled:opacity-50 cursor-pointer">
            <ChevronLeft className="w-4 h-4 text-slate-400" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded text-[10px] font-bold">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-700 hover:bg-slate-50 cursor-pointer">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-700 hover:bg-slate-50 cursor-pointer">
            3
          </button>
          <span className="text-slate-400 text-xs px-1">...</span>
          <button className="w-12 h-8 flex items-center justify-center bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-700 hover:bg-slate-50 cursor-pointer">
            568
          </button>
          <button className="w-8 h-8 flex items-center justify-center border border-slate-200 bg-white rounded hover:bg-slate-100 cursor-pointer">
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Log Detail Drawer/Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-2xl border border-slate-200 font-mono text-slate-800 animate-[scaleIn_0.15s_ease-out]">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">
              LOG RECORD DETAIL
            </h3>
            <div className="space-y-3 text-xs leading-relaxed">
              <p><span className="text-slate-400 font-bold">TIMESTAMP:</span> {selectedLog.timestamp}</p>
              <p>
                <span className="text-slate-400 font-bold">SEVERITY:</span>{' '}
                <span className={`px-2 py-0.5 rounded font-bold ${severityBadgeClass(selectedLog.severity)}`}>
                  {selectedLog.severity}
                </span>
              </p>
              <p><span className="text-slate-400 font-bold">SOURCE:</span> <span className="text-blue-700 font-bold">{selectedLog.source}</span></p>
              <div className="bg-slate-50 p-4 border border-slate-200 rounded-sm text-[11px] text-slate-700 leading-normal">
                {selectedLog.message}
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedLog(null)}
                className="bg-[#0f172a] hover:bg-slate-800 text-white font-bold py-2 px-4 rounded text-xs cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
