'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

// 1. Incidents Overview Line Chart (Dashboard)
const weeklyIncidentsData = [
  { day: 'Mon', incidents: 4, level: 40 },
  { day: 'Tue', incidents: 6, level: 60 },
  { day: 'Wed', incidents: 8, level: 85 },
  { day: 'Thu', incidents: 5, level: 45 },
  { day: 'Fri', incidents: 6, level: 55 },
  { day: 'Sat', incidents: 9, level: 95 },
  { day: 'Sun', incidents: 3, level: 30 },
];

export function IncidentsOverviewLineChart() {
  return (
    <div className="w-full h-[240px] relative">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={weeklyIncidentsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="dashboardIncidentGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(0, 76, 181, 0.25)" />
              <stop offset="100%" stopColor="rgba(0, 76, 181, 0)" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis dataKey="day" stroke="#727786" fontSize={10} tickLine={false} />
          <YAxis stroke="#727786" fontSize={10} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px' }}
            labelClassName="font-bold text-xs"
            itemStyle={{ fontSize: '12px' }}
          />
          <Area
            type="monotone"
            dataKey="level"
            name="Activity Index"
            stroke="#004cb5"
            strokeWidth={3}
            fill="url(#dashboardIncidentGrad)"
            activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// 2. Washroom Health Donut Chart (Dashboard)
const healthOverviewData = [
  { name: 'Excellent', value: 196, color: '#006e2e' },
  { name: 'Good', value: 72, color: '#6add83' },
  { name: 'Average', value: 28, color: '#ffb2b7' },
  { name: 'Poor', value: 16, color: '#a70031' },
  { name: 'Critical', value: 8, color: '#ba1a1a' },
];

export function WashroomHealthDonutChart() {
  const total = healthOverviewData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="relative w-40 h-40 flex-shrink-0">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={healthOverviewData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={75}
            paddingAngle={2}
            dataKey="value"
          >
            {healthOverviewData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px' }}
            itemStyle={{ fontSize: '11px' }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-2xl font-bold text-on-surface leading-none">{total}</span>
        <span className="text-[10px] text-on-surface-variant uppercase font-bold mt-1">Total</span>
      </div>
    </div>
  );
}

// 3. Washroom Health Trends Chart (Analytics)
const healthTrendsData = [
  { time: '08:00', current: 75, target: 85 },
  { time: '10:00', current: 72, target: 85 },
  { time: '12:00', current: 82, target: 85 },
  { time: '14:00', current: 80, target: 85 },
  { time: '16:00', current: 88, target: 85 },
  { time: '18:00', current: 86, target: 85 },
  { time: '20:00', current: 92, target: 85 },
  { time: '22:00', current: 94, target: 85 },
];

export function WashroomHealthTrendsChart() {
  return (
    <div className="w-full h-[300px] chart-grid rounded-lg border border-surface-container overflow-hidden p-4 relative bg-white">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={healthTrendsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="trendsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(0, 76, 181, 0.2)" />
              <stop offset="100%" stopColor="rgba(0, 76, 181, 0)" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5eeff" vertical={false} />
          <XAxis dataKey="time" stroke="#727786" fontSize={10} tickLine={false} />
          <YAxis stroke="#727786" fontSize={10} tickLine={false} axisLine={false} domain={[0, 100]} />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px' }}
            itemStyle={{ fontSize: '12px' }}
          />
          {/* Target Reference line rendered as an Area or dotted Line */}
          <Line
            type="monotone"
            dataKey="target"
            stroke="#c2c6d7"
            strokeDasharray="4 4"
            strokeWidth={2}
            dot={false}
            name="Target"
            activeDot={false}
          />
          <Area
            type="monotone"
            dataKey="current"
            name="Current Score"
            stroke="#004cb5"
            strokeWidth={4}
            fill="url(#trendsGrad)"
            activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// 4. Incident Frequency Horizontal Bar Chart (Analytics)
const incidentFreqData = [
  { terminal: 'Terminal 5', count: 42, color: '#a70031' },
  { terminal: 'Terminal 2', count: 28, color: '#004cb5' },
  { terminal: 'Terminal 3', count: 19, color: '#004cb5' },
  { terminal: 'Terminal 1', count: 12, color: '#006e2e' },
  { terminal: 'Concourse B', count: 8, color: '#006e2e' },
].reverse(); // reversed for bottom-to-top layout in horizontal bar charts

export function IncidentFrequencyBarChart() {
  return (
    <div className="w-full h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={incidentFreqData}
          layout="horizontal"
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis dataKey="terminal" stroke="#727786" fontSize={10} tickLine={false} />
          <YAxis stroke="#727786" fontSize={10} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px' }}
            itemStyle={{ fontSize: '12px' }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Incidents">
            {incidentFreqData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
