'use client';

import Header from '@/components/Header';
import { WashroomHealthTrendsChart, IncidentFrequencyBarChart } from '@/components/Charts';
import Heatmap from '@/components/Heatmap';

export default function AnalyticsPage() {
  return (
    <>
      <Header title="Analytics Report" placeholder="Search analytics insights..." />

      {/* Analytics Content */}
      <div className="p-margin-page flex flex-col gap-stack-lg max-w-container-max mx-auto w-full flex-grow">
        {/* Filters & Global Actions */}
        <section className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm border border-outline-variant/30">
            <div className="flex flex-col px-3 border-r border-outline-variant">
              <label className="font-label-md text-[10px] uppercase tracking-wider text-outline mb-0.5 font-bold">
                Date Range
              </label>
              <select className="border-none bg-transparent p-0 font-label-md text-label-md text-on-surface focus:ring-0 cursor-pointer focus:outline-none">
                <option>Last 30 Days</option>
                <option>Last Quarter</option>
                <option>Year to Date</option>
              </select>
            </div>

            <div className="flex flex-col px-3">
              <label className="font-label-md text-[10px] uppercase tracking-wider text-outline mb-0.5 font-bold">
                Terminal
              </label>
              <select className="border-none bg-transparent p-0 font-label-md text-label-md text-on-surface focus:ring-0 cursor-pointer focus:outline-none">
                <option>All Terminals</option>
                <option>Terminal 1</option>
                <option>Terminal 5</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-low transition-all font-semibold text-xs">
              <span className="material-symbols-outlined text-[20px]">file_download</span>
              Export Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-label-md text-label-md hover:opacity-90 shadow-lg shadow-primary/20 transition-all font-semibold text-xs">
              <span className="material-symbols-outlined text-[20px]">refresh</span>
              Run Sync
            </button>
          </div>
        </section>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          <div className="tonal-card p-card-padding rounded-xl flex flex-col justify-between overflow-hidden relative group bg-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant">Overall Health Index</p>
                <h3 className="font-data-num-lg text-data-num-lg text-primary mt-1 font-bold">94.2%</h3>
              </div>
              <span className="material-symbols-outlined text-secondary bg-secondary-container/30 p-2 rounded-lg">
                health_and_safety
              </span>
            </div>
            <div className="flex items-center gap-1 text-secondary">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span className="font-label-md text-label-md font-bold">+2.4%</span>
              <span className="font-label-md text-label-md text-on-surface-variant ml-1 font-normal">
                vs last month
              </span>
            </div>
          </div>

          <div className="tonal-card p-card-padding rounded-xl flex flex-col justify-between overflow-hidden relative group bg-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant">Total Incidents</p>
                <h3 className="font-data-num-lg text-data-num-lg text-on-surface mt-1 font-bold">128</h3>
              </div>
              <span className="material-symbols-outlined text-tertiary bg-tertiary-container/10 p-2 rounded-lg">
                warning
              </span>
            </div>
            <div className="flex items-center gap-1 text-tertiary">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span className="font-label-md text-label-md font-bold text-xs">12%</span>
              <span className="font-label-md text-label-md text-on-surface-variant ml-1 font-normal">increase</span>
            </div>
          </div>

          <div className="tonal-card p-card-padding rounded-xl flex flex-col justify-between overflow-hidden relative group bg-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant">Avg Response Time</p>
                <h3 className="font-data-num-lg text-data-num-lg text-on-surface mt-1 font-bold">14m</h3>
              </div>
              <span className="material-symbols-outlined text-primary bg-primary-container/10 p-2 rounded-lg">
                timer
              </span>
            </div>
            <div className="flex items-center gap-1 text-secondary">
              <span className="material-symbols-outlined text-sm">trending_down</span>
              <span className="font-label-md text-label-md font-bold text-xs">3m</span>
              <span className="font-label-md text-label-md text-on-surface-variant ml-1 font-normal">
                improvement
              </span>
            </div>
          </div>

          <div className="tonal-card p-card-padding rounded-xl flex flex-col justify-between overflow-hidden relative group bg-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant">Active Personnel</p>
                <h3 className="font-data-num-lg text-data-num-lg text-on-surface mt-1 font-bold">452</h3>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant bg-surface-container p-2 rounded-lg">
                engineering
              </span>
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              <span className="font-label-md text-label-md font-bold text-xs">89%</span>
              <span className="font-label-md text-label-md text-on-surface-variant ml-1 font-normal">
                on-site now
              </span>
            </div>
          </div>
        </section>

        {/* Main Visualization Bento Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Trends line chart */}
          <div className="tonal-card p-card-padding rounded-xl lg:col-span-8 flex flex-col bg-white">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="font-title-lg text-title-lg text-on-surface font-bold">Washroom Health Trends</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Real-time aggregate facility hygiene scores across terminal nodes
                </p>
              </div>
              <div className="flex gap-2">
                <span className="flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant">
                  <span className="w-3 h-3 rounded-full bg-primary inline-block"></span> Current
                </span>
                <span className="flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant">
                  <span className="w-3 h-3 rounded-full bg-outline-variant inline-block"></span> Target
                </span>
              </div>
            </div>
            <WashroomHealthTrendsChart />
          </div>

          {/* Bar Chart frequencies */}
          <div className="tonal-card p-card-padding rounded-xl lg:col-span-4 flex flex-col bg-white">
            <div className="mb-6">
              <h2 className="font-title-lg text-title-lg text-on-surface font-bold">Incident Frequency</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Top hotspots by terminal</p>
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <IncidentFrequencyBarChart />
            </div>
            <button className="mt-6 w-full py-2 border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-low transition-all text-xs font-semibold">
              View Detailed Log
            </button>
          </div>

          {/* Heatmap Usage times */}
          <div className="tonal-card p-card-padding rounded-xl lg:col-span-12 bg-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h2 className="font-title-lg text-title-lg text-on-surface font-bold">
                  Peak Usage Density Heatmap
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Foot traffic intensity across all monitored facilities by day and hour
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase font-bold text-outline">Intensity:</span>
                <div className="flex h-3 w-32 rounded-full overflow-hidden">
                  <div className="flex-1 bg-surface-container"></div>
                  <div className="flex-1 bg-primary-fixed"></div>
                  <div className="flex-1 bg-primary"></div>
                  <div className="flex-1 bg-on-primary-fixed-variant"></div>
                </div>
              </div>
            </div>
            <Heatmap />
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-auto p-margin-page border-t border-outline-variant/30 flex justify-between items-center bg-surface-container-low/50">
        <div className="flex items-center gap-2">
          <span className="font-label-md text-label-md text-on-surface-variant">
            © 2024 AeroMetric Insight v2.4.1
          </span>
        </div>
        <div className="flex gap-4">
          <a className="font-label-md text-label-md text-primary hover:underline" href="#">
            Privacy Policy
          </a>
          <a className="font-label-md text-label-md text-primary hover:underline" href="#">
            Support Hub
          </a>
        </div>
      </footer>
    </>
  );
}
