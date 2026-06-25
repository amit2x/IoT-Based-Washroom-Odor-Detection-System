'use client';

import React from 'react';

interface HeatmapItem {
  region: string;
  percentage: number;
  colorClass: string;
}

const heatmapData: HeatmapItem[] = [
  { region: 'US-East-1 (Nova)', percentage: 64, colorClass: 'bg-blue-700' },
  { region: 'EU-West-1 (Dublin)', percentage: 22, colorClass: 'bg-blue-500' },
  { region: 'AP-South-1 (Mumbai)', percentage: 14, colorClass: 'bg-blue-400' },
];

export default function OriginHeatmap() {
  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
      <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-6 font-mono">
        Origin Heatmap
      </div>
      <div className="space-y-6">
        {heatmapData.map((item) => (
          <div key={item.region}>
            <div className="flex justify-between text-xs font-medium text-slate-600 mb-2 font-mono">
              <span>{item.region}</span>
              <span className="font-mono text-blue-600 font-semibold">{item.percentage}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${item.colorClass} rounded-full transition-all duration-500`}
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
