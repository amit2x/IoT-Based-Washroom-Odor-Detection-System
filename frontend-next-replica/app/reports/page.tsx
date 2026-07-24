'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  LineChart, 
  Line, 
  ReferenceLine,
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const reportsChartData = [
  { name: 'WK 01', actual: 40 },
  { name: 'WK 02', actual: 60 },
  { name: 'WK 03', actual: 55 },
  { name: 'WK 04', actual: 70 },
  { name: 'WK 05', actual: 65 },
  { name: 'WK 06', actual: 85 },
  { name: 'WK 07', actual: 72 },
  { name: 'WK 08', actual: 94 }
];

export default function Reports() {
  const router = useRouter();

  return (
    <div className="p-xl space-y-xl animate-fade-in">
      {/* Controls Bar */}
      <section className="flex flex-wrap items-center justify-between gap-md mb-xl bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant/30">
        <div className="flex items-center gap-md flex-wrap">
          <div className="flex items-center gap-xs bg-surface-container-low border border-outline-variant px-sm py-xs rounded-lg text-on-surface">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">calendar_today</span>
            <select className="bg-transparent border-none focus:ring-0 font-body-md p-0 focus:outline-none cursor-pointer">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>This Quarter</option>
              <option>Custom Range</option>
            </select>
          </div>
          <div className="flex items-center gap-xs bg-surface-container-low border border-outline-variant px-sm py-xs rounded-lg text-on-surface">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">filter_alt</span>
            <select className="bg-transparent border-none focus:ring-0 font-body-md p-0 focus:outline-none cursor-pointer">
              <option>All Terminal Zones</option>
              <option>Arrivals</option>
              <option>Departures</option>
              <option>Security Check</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center gap-sm flex-wrap">
          <button className="flex items-center gap-xs px-md py-xs bg-surface-container-high text-on-surface-variant rounded-lg font-label-sm hover:bg-surface-container-highest transition-colors cursor-pointer text-on-surface">
            <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
            Export PDF
          </button>
          <button className="flex items-center gap-xs px-md py-xs bg-surface-container-high text-on-surface-variant rounded-lg font-label-sm hover:bg-surface-container-highest transition-colors cursor-pointer text-on-surface">
            <span className="material-symbols-outlined text-[18px]">csv</span>
            Export CSV
          </button>
          <button className="flex items-center gap-xs px-md py-xs bg-primary text-on-primary rounded-lg font-label-sm hover:opacity-90 transition-opacity cursor-pointer shadow-sm">
            <span className="material-symbols-outlined text-[18px]">refresh</span>
            Regenerate All
          </button>
        </div>
      </section>

      {/* Bento Grid Analytics */}
      <div className="grid grid-cols-12 gap-lg mb-xl">
        {/* Hygiene Trends Chart */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/30 relative overflow-hidden flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-xl gap-sm">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Hygiene Trends over Time</h3>
              <p className="font-caption text-caption text-on-surface-variant">Aggregate WHI (Washroom Hygiene Index) across all Terminal 2 levels</p>
            </div>
            <div className="flex gap-md items-center text-on-surface">
              <div className="flex items-center gap-xs">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="font-caption text-caption">Actual</span>
              </div>
              <div className="flex items-center gap-xs">
                <div className="w-3 h-3 rounded-full bg-outline-variant"></div>
                <span className="font-caption text-caption">Target (85)</span>
              </div>
            </div>
          </div>

          <div className="h-64 relative flex items-end">
            {/* Grid bg simulator */}
            <div className="absolute inset-0 chart-grid opacity-25"></div>
            
            <div className="w-full h-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={reportsChartData} margin={{ top: 20, right: 10, bottom: 5, left: -20 }}>
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 10, fill: '#565e74' }} 
                    axisLine={false} 
                    tickLine={false}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    tick={{ fontSize: 10, fill: '#565e74' }} 
                    axisLine={false} 
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#2d3133', 
                      borderColor: '#6d7b6c', 
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '11px'
                    }}
                  />
                  <ReferenceLine 
                    y={85} 
                    stroke="#bccbb9" 
                    strokeDasharray="4 4" 
                    label={{ value: 'Target (85)', fill: '#bccbb9', fontSize: 10, position: 'top' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#006e2f" 
                    strokeWidth={3} 
                    dot={{ fill: '#006e2f', r: 4 }} 
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-lg pt-lg border-t border-outline-variant/30 flex justify-around">
            <div className="text-center">
              <p className="font-caption text-caption text-on-surface-variant">Peak Score</p>
              <p className="font-headline-md text-headline-md text-primary">94</p>
            </div>
            <div className="text-center border-x border-outline-variant/30 px-md flex-1">
              <p className="font-caption text-caption text-on-surface-variant">Avg Score</p>
              <p className="font-headline-md text-headline-md text-on-surface">82</p>
            </div>
            <div className="text-center">
              <p className="font-caption text-caption text-on-surface-variant">YoY Change</p>
              <p className="font-headline-md text-headline-md text-primary">+4.2%</p>
            </div>
          </div>
        </div>

        {/* Incident Response Rates */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">Incident Response</h3>
            <p className="font-caption text-caption text-on-surface-variant mb-xl">Efficiency analysis by priority level</p>
            <div className="space-y-lg">
              <div>
                <div className="flex justify-between font-label-sm mb-xs">
                  <span className="text-error font-bold">URGENT</span>
                  <span className="text-on-surface">98.2% S.L.A.</span>
                </div>
                <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-error rounded-full" style={{ width: '98.2%' }}></div>
                </div>
                <p className="font-caption text-caption text-on-surface-variant mt-1 text-right">Avg: 4.2 mins</p>
              </div>
              
              <div>
                <div className="flex justify-between font-label-sm mb-xs">
                  <span className="text-secondary font-bold">HIGH</span>
                  <span className="text-on-surface">92.5% S.L.A.</span>
                </div>
                <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: '92.5%' }}></div>
                </div>
                <p className="font-caption text-caption text-on-surface-variant mt-1 text-right">Avg: 11.5 mins</p>
              </div>

              <div>
                <div className="flex justify-between font-label-sm mb-xs">
                  <span className="text-on-surface-variant font-bold">MEDIUM</span>
                  <span className="text-on-surface">88.1% S.L.A.</span>
                </div>
                <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-outline rounded-full" style={{ width: '88.1%' }}></div>
                </div>
                <p className="font-caption text-caption text-on-surface-variant mt-1 text-right">Avg: 22.8 mins</p>
              </div>
            </div>
          </div>

          <div className="mt-xl p-md bg-surface-container-low rounded-xl">
            <div className="flex items-center gap-sm mb-xs text-primary">
              <span className="material-symbols-outlined">stars</span>
              <span className="font-label-sm text-on-surface font-bold">Operational Insight</span>
            </div>
            <p className="font-caption text-caption text-on-surface-variant italic leading-relaxed">
              &quot;Urgent response times have improved by 15% since the introduction of the new zone-based dispatch system.&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Recent Exported Reports */}
      <section className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/30">
        <h3 className="font-headline-md text-headline-md text-on-surface mb-lg">Recent Reports History</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          
          <div className="p-md border border-outline-variant rounded-xl hover:shadow-md transition-all group flex items-center gap-md cursor-pointer">
            <div className="w-12 h-12 rounded-lg bg-error-container/30 flex items-center justify-center text-error">
              <span className="material-symbols-outlined text-[28px]">picture_as_pdf</span>
            </div>
            <div className="flex-1">
              <p className="font-body-md text-body-md font-bold text-on-surface">Monthly_Compliance_May.pdf</p>
              <p className="font-caption text-caption text-on-surface-variant">Generated 2h ago • 4.2 MB</p>
            </div>
            <button className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              download
            </button>
          </div>

          <div className="p-md border border-outline-variant rounded-xl hover:shadow-md transition-all group flex items-center gap-md cursor-pointer">
            <div className="w-12 h-12 rounded-lg bg-secondary-container/30 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[28px]">csv</span>
            </div>
            <div className="flex-1">
              <p className="font-body-md text-body-md font-bold text-on-surface">Inventory_Usage_Q2.csv</p>
              <p className="font-caption text-caption text-on-surface-variant">Generated yesterday • 850 KB</p>
            </div>
            <button className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              download
            </button>
          </div>

          <div className="p-md border border-outline-variant rounded-xl hover:shadow-md transition-all group flex items-center gap-md cursor-pointer">
            <div className="w-12 h-12 rounded-lg bg-primary-container/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[28px]">description</span>
            </div>
            <div className="flex-1">
              <p className="font-body-md text-body-md font-bold text-on-surface">Terminal_2_Audit_Full.pdf</p>
              <p className="font-caption text-caption text-on-surface-variant">Generated 3 days ago • 12.4 MB</p>
            </div>
            <button className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              download
            </button>
          </div>

        </div>
        <div className="text-center mt-lg">
          <button className="text-primary font-label-sm text-label-sm hover:underline cursor-pointer uppercase tracking-widest">
            View All Generated Reports
          </button>
        </div>
      </section>
    </div>
  );
}
