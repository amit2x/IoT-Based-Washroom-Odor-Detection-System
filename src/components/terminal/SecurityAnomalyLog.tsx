'use client';

import React from 'react';
import { ShieldAlert } from 'lucide-react';

type AlertLevel = 'CRITICAL' | 'WARNING' | 'INFO';

const anomalies = [
  {
    id: 'ALERT-001',
    level: 'CRITICAL' as AlertLevel,
    description: 'Unauthorized protocol switch detected on TERM-003 prior to offline state.',
    node: 'TERM-003',
    age: 'Just now',
    action: 'Investigate',
  },
  {
    id: 'ALERT-002',
    level: 'WARNING' as AlertLevel,
    description: 'Elevated latency spike on TERM-004 during standard handshake.',
    node: 'TERM-004',
    age: '–12m',
    action: 'View Logs',
  },
  {
    id: 'ALERT-003',
    level: 'INFO' as AlertLevel,
    description: 'Routine firmware update deployed to US-East zone nodes successfully.',
    node: 'TERM-001',
    age: '–45m',
    action: 'Details',
  },
];

const levelCfg: Record<AlertLevel, { border: string; labelColor: string }> = {
  CRITICAL: { border: 'border-l-red-500',   labelColor: 'text-red-600'   },
  WARNING:  { border: 'border-l-amber-500', labelColor: 'text-amber-600' },
  INFO:     { border: 'border-l-blue-500',  labelColor: 'text-blue-600'  },
};

export default function SecurityAnomalyLog() {
  return (
    <div>
      <div className="flex items-center space-x-2 mb-5">
        <ShieldAlert className="w-5 h-5 text-red-500" />
        <h3 className="text-xl font-bold text-slate-800 tracking-tight">Security Anomaly Log</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {anomalies.map((alert) => {
          const cfg = levelCfg[alert.level];
          return (
            <div
              key={alert.id}
              className={`bg-white rounded-xl border border-slate-200 border-l-4 ${cfg.border} shadow-sm p-5`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className={`text-[11px] font-bold font-mono uppercase tracking-widest ${cfg.labelColor}`}>
                  {alert.level}
                </span>
                <span className="text-[11px] font-mono text-slate-400">{alert.age}</span>
              </div>

              <h4 className="font-mono font-bold text-slate-800 text-sm mb-1">{alert.id}</h4>

              <p className="text-[12px] text-slate-500 leading-relaxed mb-2">{alert.description}</p>

              <span className="inline-block text-[10px] font-mono bg-slate-100 text-slate-500 border border-slate-200 px-2 py-0.5 rounded uppercase tracking-wide">
                {alert.node}
              </span>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <button className={`text-[12px] font-mono font-semibold hover:underline transition-colors ${cfg.labelColor}`}>
                  {alert.action} →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
