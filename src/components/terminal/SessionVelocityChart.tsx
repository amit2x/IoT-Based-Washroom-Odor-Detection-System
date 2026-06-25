'use client';

import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const sessionData = [
  { time: '00:00', sessions: 120 },
  { time: '02:00', sessions: 88  },
  { time: '04:00', sessions: 62  },
  { time: '06:00', sessions: 105 },
  { time: '08:00', sessions: 190 },
  { time: '10:00', sessions: 240 },
  { time: '12:00', sessions: 284 },
  { time: '14:00', sessions: 260 },
  { time: '16:00', sessions: 310 },
  { time: '18:00', sessions: 275 },
  { time: '20:00', sessions: 215 },
  { time: '22:00', sessions: 160 },
  { time: '23:59', sessions: 130 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded px-3 py-2 shadow text-xs font-mono">
        <p className="text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-blue-600 font-bold">{payload[0].value} sessions</p>
      </div>
    );
  }
  return null;
};

export default function SessionVelocityChart() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col" style={{ minHeight: 280 }}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-bold text-slate-800 text-sm font-mono">Session Velocity</h3>
          <p className="text-[11px] text-slate-400 font-mono mt-0.5">Active sessions over last 24h</p>
        </div>
        <span className="text-[11px] text-slate-500 border border-slate-200 rounded px-2.5 py-1 font-mono bg-slate-50">
          Last 24 Hours
        </span>
      </div>

      <div style={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sessionData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
            <defs>
              <linearGradient id="sessionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 9, fill: '#94a3b8', fontFamily: 'monospace' }}
              axisLine={false}
              tickLine={false}
              interval={2}
            />
            <YAxis
              tick={{ fontSize: 9, fill: '#94a3b8', fontFamily: 'monospace' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="sessions"
              stroke="#2563eb"
              strokeWidth={2}
              fill="url(#sessionGradient)"
              dot={false}
              activeDot={{ r: 4, fill: '#2563eb', strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
