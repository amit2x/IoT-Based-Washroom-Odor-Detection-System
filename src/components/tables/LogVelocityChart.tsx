'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface DataPoint {
  time: string;
  eps: number;
}

const mockData: DataPoint[] = [
  { time: '24h ago', eps: 800 },
  { time: '20h ago', eps: 950 },
  { time: '16h ago', eps: 700 },
  { time: '12h ago', eps: 1200 },
  { time: '8h ago', eps: 900 },
  { time: '4h ago', eps: 1100 },
  { time: 'Current', eps: 1229 },
];

interface LogVelocityChartProps {
  value?: string;
  percentage?: string;
}

export default function LogVelocityChart({ 
  value = '1,229', 
  percentage = '+12.5% from avg' 
}: LogVelocityChartProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 overflow-hidden">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Log Velocity</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 font-mono">
            Events Per Second (EPS)
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-baseline justify-end space-x-2">
            <span className="text-4xl font-bold text-blue-700 font-mono">{value}</span>
            <span className="text-sm font-bold text-slate-400 font-mono">EPS</span>
          </div>
          <p className="text-xs font-bold text-emerald-500 mt-1 flex items-center justify-end font-mono">
            <svg
              className="w-3 h-3 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 11l5-5m0 0l5 5m-5-5v12"
              />
            </svg>
            {percentage}
          </p>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-44 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={mockData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="velocityColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{ 
                fontFamily: 'monospace', 
                fontSize: 12, 
                borderRadius: 4, 
                borderColor: '#e2e8f0' 
              }}
            />
            <Area
              type="monotone"
              dataKey="eps"
              stroke="#2563eb"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#velocityColor)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
