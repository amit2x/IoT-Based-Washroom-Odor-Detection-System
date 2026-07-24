'use client';

import React from 'react';
import { 
  Monitor,
  Users,
  Activity,
  ShieldAlert,
  Download,
  PlusSquare
} from 'lucide-react';
import TerminalRegistryTable from '@/components/terminal/TerminalRegistryTable';
import SessionVelocityChart from '@/components/terminal/SessionVelocityChart';
import OperatorDirectory from '@/components/terminal/OperatorDirectory';
import SecurityAnomalyLog from '@/components/terminal/SecurityAnomalyLog';

// ─── KPI Card ─────────────────────────────────────────────────────────────────
interface KpiCardProps {
  label: string;
  value: string | number;
  Icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  footer: React.ReactNode;
  accentBorder?: string;
}

function KpiCard({ label, value, Icon, iconColor, iconBg, footer, accentBorder }: KpiCardProps) {
  return (
    <div
      className={`bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between h-36 ${
        accentBorder ? `border-l-4 ${accentBorder}` : ''
      }`}
    >
      <div className="flex justify-between items-start">
        <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase font-mono">
          {label}
        </span>
        <div className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
      </div>
      <div className="flex items-baseline space-x-2">
        <span className="text-4xl font-mono font-bold text-slate-800">{value}</span>
      </div>
      <div className="flex items-center gap-1.5 text-[11px] font-mono">
        {footer}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TerminalAdminPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-8">

        {/* ── Page Header ── */}
        <div className="flex justify-between items-end flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
              Terminal Admin Console
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              Live oversight of terminal nodes, operators, and active sessions.
            </p>
          </div>

          <div className="flex space-x-3">
            <button className="bg-white border border-slate-300 px-4 py-2 rounded-md text-sm font-semibold text-slate-700 flex items-center space-x-2 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
            <button className="bg-blue-600 px-4 py-2 rounded-md text-sm font-semibold text-white flex items-center space-x-2 hover:bg-blue-700 transition-colors shadow-sm cursor-pointer">
              <PlusSquare className="w-4 h-4" />
              <span>Provision Node</span>
            </button>
          </div>
        </div>

        {/* ── KPI Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <KpiCard
            label="Active Terminals"
            value={47}
            Icon={Monitor}
            iconColor="text-emerald-700"
            iconBg="bg-emerald-100"
            footer={
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-emerald-700">Online</span>
              </>
            }
          />
          <KpiCard
            label="Active Operators"
            value={12}
            Icon={Users}
            iconColor="text-blue-600"
            iconBg="bg-blue-50"
            footer={
              <>
                <span className="text-slate-500">Across 4 zones</span>
              </>
            }
          />
          <KpiCard
            label="Open Sessions"
            value={284}
            Icon={Activity}
            iconColor="text-slate-700"
            iconBg="bg-slate-100"
            footer={
              <>
                <span className="text-emerald-600 font-bold">↑ +12% this hour</span>
              </>
            }
          />
          <KpiCard
            label="Security Alerts"
            value={3}
            Icon={ShieldAlert}
            iconColor="text-red-600"
            iconBg="bg-red-100"
            accentBorder="border-l-rose-500"
            footer={
              <>
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-red-600 font-bold">Requires Attention</span>
              </>
            }
          />
        </div>

        {/* ── Terminal Registry Table ── */}
        <TerminalRegistryTable />

        {/* ── Middle Section: Chart + Directory ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SessionVelocityChart />
          </div>
          <div className="lg:col-span-1">
            <OperatorDirectory />
          </div>
        </div>

        {/* ── Security Anomaly Log ── */}
        <SecurityAnomalyLog />

      </div>
  );
}
