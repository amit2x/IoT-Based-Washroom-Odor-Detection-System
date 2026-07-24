'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

interface DisplayDevice {
  id: string;
  name: string;
  deviceId: string;
  type: 'Sensor' | 'Gateway';
  status: 'ONLINE' | 'OFFLINE';
  rssi: string;
  rssiBars: number; // 0 to 4
  lastHeartbeat: string;
  firmware: string;
  icon: string;
}

const initialDisplayDevices: DisplayDevice[] = [
  {
    id: '1',
    name: 'GW-Alpha-99',
    deviceId: '4423-A9-FF3',
    type: 'Gateway',
    status: 'ONLINE',
    rssi: '-62 dBm',
    rssiBars: 3,
    lastHeartbeat: '2 minutes ago',
    firmware: 'v2.4.1-stable',
    icon: 'router',
  },
  {
    id: '2',
    name: 'SN-Temp-Gate-4',
    deviceId: '8841-B2-C10',
    type: 'Sensor',
    status: 'ONLINE',
    rssi: '-45 dBm',
    rssiBars: 4,
    lastHeartbeat: 'Just now',
    firmware: 'v2.3.8-legacy',
    icon: 'sensors',
  },
  {
    id: '3',
    name: 'GW-Echo-404',
    deviceId: '9912-Z0-ERR',
    type: 'Gateway',
    status: 'OFFLINE',
    rssi: 'N/A',
    rssiBars: 0,
    lastHeartbeat: '14 hours ago',
    firmware: 'v2.4.0-update-pending',
    icon: 'wifi_off',
  },
  {
    id: '4',
    name: 'SN-Humid-H12',
    deviceId: '1104-X8-Y22',
    type: 'Sensor',
    status: 'ONLINE',
    rssi: '-88 dBm',
    rssiBars: 2,
    lastHeartbeat: '12 minutes ago',
    firmware: 'v2.4.1-stable',
    icon: 'sensors',
  },
];

const uptimePieData = [
  { name: 'Online', value: 98.4, color: '#006e2e' },
  { name: 'Offline', value: 1.6, color: '#e5eeff' },
];

export default function OnlineDevicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Sensors' | 'Gateways'>('All');
  const [devices, setDevices] = useState<DisplayDevice[]>(initialDisplayDevices);

  // Filters logic
  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.firmware.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTab =
      activeTab === 'All' ||
      (activeTab === 'Sensors' && device.type === 'Sensor') ||
      (activeTab === 'Gateways' && device.type === 'Gateway');

    return matchesSearch && matchesTab;
  });

  const handleFixNow = (id: string) => {
    alert(`Attempting remote diagnostic connection to device ID ${id}...`);
    // Simulate fixing the device
    setDevices((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              status: 'ONLINE',
              rssi: '-72 dBm',
              rssiBars: 3,
              lastHeartbeat: 'Just now',
              firmware: 'v2.4.1-stable',
              icon: d.type === 'Gateway' ? 'router' : 'sensors',
            }
          : d
      )
    );
  };

  return (
    <>
      <Header
        title="Device Monitoring"
        placeholder="Search devices, sensors, or gateways..."
        onSearchChange={setSearchTerm}
      />

      {/* Main Content Body */}
      <div className="p-margin-page space-y-gutter pb-20 max-w-container-max mx-auto w-full flex-grow">
        {/* Header Section info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-1">
              Device Monitoring
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Network operational status and hardware inventory overview.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-outline text-on-surface rounded-lg font-label-md hover:bg-surface-container-low transition-all cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">filter_list</span> Filters
            </button>
            <button
              onClick={() => alert('Register New Device modal triggered.')}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-label-md hover:opacity-90 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add</span> Register New Device
            </button>
          </div>
        </div>

        {/* Bento Grid Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
          {/* KPI Card 1: Total Devices */}
          <div className="glass-card p-card-padding rounded-xl flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
            <div>
              <span className="text-on-surface-variant font-label-md mb-2 block uppercase tracking-wider">
                Total Managed Devices
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-data-num-lg text-data-num-lg text-primary">315</span>
                <span className="text-secondary font-bold font-label-md flex items-center">
                  <span className="material-symbols-outlined text-sm">arrow_upward</span> 12%
                </span>
              </div>
            </div>
            <div className="h-1 w-full bg-surface-container mt-4 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-full"></div>
            </div>
          </div>

          {/* KPI Card 2: Uptime Donut/Gauge */}
          <div className="glass-card p-card-padding rounded-xl col-span-1 md:col-span-2 flex flex-col sm:flex-row items-center gap-gutter">
            <div className="relative w-24 h-24 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={uptimePieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={32}
                    outerRadius={45}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                  >
                    {uptimePieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                    }}
                    itemStyle={{ fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-bold text-lg text-secondary">98.4%</span>
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h4 className="font-title-lg text-title-lg text-on-surface mb-1">
                Network Uptime
              </h4>
              <p className="text-on-surface-variant text-body-sm mb-3 leading-relaxed">
                System performance is exceeding the baseline SLA by{' '}
                <span className="text-secondary font-bold">0.4%</span>. No critical failures in last
                24h.
              </p>
              <div className="flex gap-4 justify-center sm:justify-start">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-secondary"></div>
                  <span className="text-[10px] font-bold text-on-surface-variant">302 ONLINE</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-error"></div>
                  <span className="text-[10px] font-bold text-on-surface-variant">13 OFFLINE</span>
                </div>
              </div>
            </div>
          </div>

          {/* KPI Card 3: Alert Status */}
          <div className="glass-card p-card-padding rounded-xl bg-error-container/20 border border-error/20 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-start">
              <span className="text-on-surface-variant font-label-md block uppercase tracking-wider">
                Active Alerts
              </span>
              <span
                className="material-symbols-outlined text-error"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                warning
              </span>
            </div>
            <div>
              <span className="font-data-num-lg text-data-num-lg text-error">04</span>
              <p className="text-on-surface-variant font-body-sm mt-1">Requires attention</p>
            </div>
            <Link
              className="text-error font-bold font-label-md mt-2 flex items-center gap-1 hover:underline text-xs"
              href="/admin/incidents/active"
            >
              View Incidents <span className="material-symbols-outlined text-sm">chevron_right</span>
            </Link>
          </div>
        </div>

        {/* Device Inventory Table */}
        <div className="glass-card rounded-xl overflow-hidden shadow-sm bg-white">
          <div className="px-card-padding py-4 border-b border-outline-variant flex justify-between items-center bg-white/50">
            <h3 className="font-title-lg text-title-lg text-on-surface">Hardware Inventory</h3>
            <div className="flex items-center gap-3">
              <div className="flex rounded-md overflow-hidden border border-outline-variant bg-surface-container-lowest">
                <button
                  onClick={() => setActiveTab('All')}
                  className={`px-3 py-1 font-bold text-xs cursor-pointer transition-colors ${
                    activeTab === 'All'
                      ? 'bg-surface-container text-primary'
                      : 'hover:bg-surface-container-low text-on-surface-variant'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab('Sensors')}
                  className={`px-3 py-1 font-bold text-xs cursor-pointer transition-colors ${
                    activeTab === 'Sensors'
                      ? 'bg-surface-container text-primary'
                      : 'hover:bg-surface-container-low text-on-surface-variant'
                  }`}
                >
                  Sensors
                </button>
                <button
                  onClick={() => setActiveTab('Gateways')}
                  className={`px-3 py-1 font-bold text-xs cursor-pointer transition-colors ${
                    activeTab === 'Gateways'
                      ? 'bg-surface-container text-primary'
                      : 'hover:bg-surface-container-low text-on-surface-variant'
                  }`}
                >
                  Gateways
                </button>
              </div>
              <button
                onClick={() => alert('Options menu triggered.')}
                className="p-2 hover:bg-surface-container rounded-md transition-colors cursor-pointer text-on-surface-variant"
              >
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/50 border-b border-outline-variant">
                  <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
                    Device Name / ID
                  </th>
                  <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider text-center font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
                    RSSI (Strength)
                  </th>
                  <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
                    Last Heartbeat
                  </th>
                  <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
                    Firmware
                  </th>
                  <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {filteredDevices.map((device) => {
                  const isOnline = device.status === 'ONLINE';

                  return (
                    <tr
                      key={device.id}
                      className={`transition-colors group ${
                        isOnline
                          ? 'hover:bg-primary-container/5'
                          : 'hover:bg-error-container/5'
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              isOnline ? 'bg-surface-container' : 'bg-error-container/20'
                            }`}
                          >
                            <span
                              className={`material-symbols-outlined ${
                                isOnline ? 'text-primary' : 'text-error'
                              }`}
                            >
                              {device.icon}
                            </span>
                          </div>
                          <div>
                            <div className="font-bold text-on-surface">{device.name}</div>
                            <div className="text-[10px] text-on-surface-variant font-mono">
                              ID: {device.deviceId}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-bold text-[10px] ${
                            isOnline
                              ? 'bg-secondary-container/30 text-on-secondary-container'
                              : 'bg-error-container/30 text-on-error-container'
                          }`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${
                              isOnline
                                ? 'bg-secondary status-pulse after:bg-secondary'
                                : 'bg-error'
                            }`}
                          ></div>
                          {device.status}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`flex gap-0.5 ${!isOnline ? 'opacity-20' : ''}`}>
                            {[1, 2, 3, 4].map((bar) => {
                              const isActive = isOnline && device.rssiBars >= bar;
                              return (
                                <div
                                  key={bar}
                                  className={`w-1 rounded-full ${
                                    bar === 1
                                      ? 'h-3'
                                      : bar === 2
                                      ? 'h-4'
                                      : bar === 3
                                      ? 'h-5'
                                      : 'h-6'
                                  } ${
                                    isActive
                                      ? 'bg-secondary'
                                      : isOnline
                                      ? 'bg-secondary opacity-30'
                                      : 'bg-on-surface-variant'
                                  }`}
                                ></div>
                              );
                            })}
                          </div>
                          <span
                            className={`text-sm font-bold ${
                              !isOnline ? 'text-on-surface-variant' : ''
                            }`}
                          >
                            {device.rssi}
                          </span>
                        </div>
                      </td>

                      <td
                        className={`px-6 py-4 text-sm ${
                          isOnline ? 'text-on-surface-variant' : 'text-error font-medium'
                        }`}
                      >
                        {device.lastHeartbeat}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                            isOnline
                              ? 'bg-surface-container text-on-surface-variant border-outline-variant/30'
                              : 'bg-error-container/10 border-error/20 text-error'
                          }`}
                        >
                          {device.firmware}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        {isOnline ? (
                          <button
                            onClick={() => alert(`Showing details for ${device.name}...`)}
                            className="text-primary hover:text-primary-container font-bold text-xs uppercase tracking-tighter cursor-pointer"
                          >
                            Details
                          </button>
                        ) : (
                          <button
                            onClick={() => handleFixNow(device.id)}
                            className="text-error hover:opacity-80 font-bold text-xs uppercase tracking-tighter cursor-pointer"
                          >
                            Fix Now
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {filteredDevices.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-outline text-body-sm bg-white">
                      No devices match your search or filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="px-card-padding py-4 border-t border-outline-variant flex justify-between items-center bg-white/50 text-on-surface-variant font-label-md">
            <span>Showing {filteredDevices.length} of 315 devices</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded border border-outline-variant hover:bg-surface-container disabled:opacity-50 text-xs">
                Previous
              </button>
              <button className="px-3 py-1 rounded border border-outline-variant hover:bg-surface-container text-xs">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Connectivity Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* Signal Distribution progress list */}
          <div className="glass-card rounded-xl p-card-padding bg-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">
                Signal Distribution
              </h3>
              <span className="material-symbols-outlined text-primary">podcasts</span>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-sm font-medium">
                  <span>Excellent (&gt; -50dBm)</span>
                  <span className="text-secondary font-bold">64%</span>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-secondary" style={{ width: '64%' }}></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm font-medium">
                  <span>Good (-50 to -70dBm)</span>
                  <span className="text-primary font-bold">28%</span>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '28%' }}></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm font-medium">
                  <span>Weak (&lt; -80dBm)</span>
                  <span className="text-on-surface-variant font-bold">8%</span>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-outline-variant" style={{ width: '8%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Network Topology with bounce animation nodes */}
          <div className="glass-card rounded-xl p-card-padding overflow-hidden relative group bg-white">
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="font-title-lg text-title-lg text-on-surface mb-2 font-semibold">
                  Network Topology
                </h3>
                <p className="text-body-sm text-on-surface-variant">
                  Real-time visualization of sensor-to-gateway mesh connections. Latency currently
                  within nominal 25ms threshold.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-center h-24">
                <div className="flex gap-2">
                  <div
                    className="w-3 h-12 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  ></div>
                  <div
                    className="w-3 h-16 bg-primary-container rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                  <div
                    className="w-3 h-8 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: '0.3s' }}
                  ></div>
                  <div
                    className="w-3 h-14 bg-primary-container rounded-full animate-bounce"
                    style={{ animationDelay: '0.4s' }}
                  ></div>
                  <div
                    className="w-3 h-10 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: '0.5s' }}
                  ></div>
                </div>
              </div>
              <button
                onClick={() => alert('Launching mesh network topology interactive viewer...')}
                className="mt-4 w-full py-2 bg-on-background text-background rounded-lg font-label-md hover:bg-on-background/90 transition-all cursor-pointer font-bold text-xs"
              >
                Launch Map Viewer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => alert('Displaying diagnostic dashboard summary...')}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 z-50 cursor-pointer"
      >
        <span className="material-symbols-outlined text-[28px]">speed</span>
      </button>
    </>
  );
}
