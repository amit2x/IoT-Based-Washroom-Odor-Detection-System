'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface DeviceItem {
  id: string;
  name: string;
  type: string;
  status: 'ONLINE' | 'OFFLINE';
  battery: number;
  lastPing: string;
  dbSignal: string;
  firmware: string;
  location: string;
  avatarIcon: string;
}

function DeviceStatusContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [uptime, setUptime] = useState('97.1%');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  useEffect(() => {
    const status = searchParams.get('status');
    if (status) {
      setStatusFilter(status.toUpperCase());
    } else {
      setStatusFilter(null);
    }
  }, [searchParams]);

  useEffect(() => {
    const interval = setInterval(() => {
      const rates = ['97.1%', '97.2%', '97.0%', '97.3%'];
      setUptime(rates[Math.floor(Math.random() * rates.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (message: string) => {
    setToastMsg(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  const restartDevice = (id: string) => {
    showToast(`Restart command sent to ${id}. Initializing reboot...`);
  };

  const devicesList: DeviceItem[] = [
    {
      id: 'SN-024',
      name: 'SN-024 (Odor)',
      type: 'Odor Sensor',
      status: 'ONLINE',
      battery: 92,
      lastPing: '4m ago',
      dbSignal: '-45dB',
      firmware: 'v2.4.1 (Stable)',
      location: 'Gate 12 Restroom',
      avatarIcon: 'router'
    },
    {
      id: 'GW-009',
      name: 'GW-009 (Gateway)',
      type: 'Network Gateway',
      status: 'OFFLINE',
      battery: 64,
      lastPing: '12m ago',
      dbSignal: 'Disconnected',
      firmware: 'v2.3.8 (Update Avail.)',
      location: 'Main Lobby Hub',
      avatarIcon: 'hub'
    },
    {
      id: 'SN-088',
      name: 'SN-088 (People Counter)',
      type: 'People Counter',
      status: 'ONLINE',
      battery: 12,
      lastPing: 'Just now',
      dbSignal: '-58dB',
      firmware: 'v2.4.1 (Stable)',
      location: 'Departure Hall North',
      avatarIcon: 'sensors'
    },
    {
      id: 'SN-042',
      name: 'SN-042 (Towel Sensor)',
      type: 'Paper Towel Sensor',
      status: 'ONLINE',
      battery: 48,
      lastPing: '1h ago',
      dbSignal: '-62dB',
      firmware: 'v2.4.1 (Stable)',
      location: 'Terminal 2 West Wing',
      avatarIcon: 'soap'
    }
  ];

  const filteredDevices = statusFilter
    ? devicesList.filter((dev) => dev.status === statusFilter)
    : devicesList;

  return (
    <div className="p-xl space-y-xl max-w-[1600px] mx-auto w-full animate-fade-in">
      {/* KPI Summary Bento Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-lg">
        <div className="glass-card p-lg rounded-xl flex flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between mb-md">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Total Fleet</span>
            <span className="material-symbols-outlined text-primary-container">sensors</span>
          </div>
          <div>
            <span className="font-metric-xl text-metric-xl text-on-surface">34</span>
            <div className="flex items-center gap-xs mt-xs text-primary font-body-md">
              <span className="material-symbols-outlined text-xs">check_circle</span>
              <span>{uptime} Uptime</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-lg rounded-xl flex flex-col justify-between shadow-sm border-l-4 border-l-primary-container">
          <div className="flex items-start justify-between mb-md">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Online Now</span>
            <span className="material-symbols-outlined text-primary-container">wifi</span>
          </div>
          <div>
            <span className="font-metric-xl text-metric-xl text-primary">33</span>
            <div className="flex items-center gap-xs mt-xs text-primary font-body-md">
              <span className="material-symbols-outlined text-xs">trending_up</span>
              <span>{uptime} Uptime</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-lg rounded-xl flex flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between mb-md">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Battery Health</span>
            <span className="material-symbols-outlined text-tertiary">battery_charging_full</span>
          </div>
          <div>
            <span className="font-metric-xl text-metric-xl text-on-surface">88%</span>
            <div className="flex items-center gap-xs mt-xs text-on-surface-variant font-body-md">
              <span className="material-symbols-outlined text-xs">info</span>
              <span>2 sensors low</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-lg rounded-xl flex flex-col justify-between shadow-sm border-l-4 border-l-error">
          <div className="flex items-start justify-between mb-md">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Firmware Alert</span>
            <span className="material-symbols-outlined text-error">system_update_alt</span>
          </div>
          <div>
            <span className="font-metric-xl text-metric-xl text-error">02</span>
            <div className="flex items-center gap-xs mt-xs text-error font-body-md">
              <span className="material-symbols-outlined text-xs">priority_high</span>
              <span>Update required</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map and Monitoring Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg lg:h-[550px]">
        {/* Floor Map View (8 Columns) */}
        <div className="lg:col-span-8 glass-card rounded-xl shadow-sm flex flex-col relative overflow-hidden group min-h-[300px] h-full">
          <div className="absolute top-md left-md z-10 flex gap-sm flex-wrap">
            <div className="bg-white/90 backdrop-blur-md px-md py-xs rounded-full shadow-sm border border-outline-variant flex items-center gap-sm">
              <span className="font-label-sm text-label-sm text-on-surface">Level 2 - Departures North</span>
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </div>
            <div className="bg-white/90 backdrop-blur-md px-md py-xs rounded-full shadow-sm border border-outline-variant flex items-center gap-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-on-surface">3 Live Events</span>
            </div>
          </div>

          <div className="absolute right-md top-md z-10 flex flex-col gap-sm">
            <button className="w-10 h-10 bg-white shadow-md rounded-lg flex items-center justify-center hover:bg-surface-container transition-all cursor-pointer">
              <span className="material-symbols-outlined">add</span>
            </button>
            <button className="w-10 h-10 bg-white shadow-md rounded-lg flex items-center justify-center hover:bg-surface-container transition-all cursor-pointer">
              <span className="material-symbols-outlined">remove</span>
            </button>
            <button className="w-10 h-10 bg-white shadow-md rounded-lg flex items-center justify-center hover:bg-surface-container transition-all cursor-pointer"
                    onClick={() => router.push('/floor-heatmap')}>
              <span className="material-symbols-outlined">layers</span>
            </button>
          </div>

          {/* Map Image Placeholder */}
          <div className="w-full h-full bg-surface-container-low flex items-center justify-center relative overflow-hidden">
            <img 
              alt="Airport Terminal Blueprint Map" 
              className="w-full h-full object-cover opacity-30 mix-blend-multiply" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBY6nN-Oamv42OjOAAYMFtD425Ub2lScFCzoIzARv05KLVWXLSIwHvlZ4-v6r6JeDWw2AdCGM9MqoWQYml6zw5SvVh5uyba6dYf300gcPv2LZ6wH8dm-urWNy55uYusqTnDScAtR-DEFGM0zy5XCIosGCpYp46K-RwlvKJviPzoOX2R-9oqwwbdKdvwZ_uup8BWIgfvuPZcDVOpwpaKq7bITf6vi7CfBmsQ1HhY4xTfg0CYPR16MlACpWEt23uXWp7uCXX-Vx9_mU"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent"></div>

            {/* Map Markers */}
            <div className="absolute top-[30%] left-[45%] group/marker">
              <div className="w-4 h-4 bg-primary rounded-full animate-ping absolute inset-0 opacity-75"></div>
              <div className="w-4 h-4 bg-primary rounded-full relative shadow-lg cursor-pointer"></div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white p-md rounded-lg shadow-xl border border-outline-variant opacity-0 group-hover/marker:opacity-100 transition-opacity z-20 pointer-events-none text-on-surface">
                <p className="font-label-sm text-label-sm font-bold text-primary mb-1">SN-024: Odor Sensor</p>
                <p className="font-caption text-caption text-on-surface-variant">Gate 12 Restroom Block</p>
                <div className="mt-xs pt-xs border-t border-outline-variant flex justify-between">
                  <span className="text-primary font-bold">92%</span>
                  <span className="text-on-surface-variant">Connected</span>
                </div>
              </div>
            </div>

            <div className="absolute top-[60%] left-[25%] group/marker">
              <div className="w-4 h-4 bg-error rounded-full relative shadow-lg cursor-pointer"></div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white p-md rounded-lg shadow-xl border border-outline-variant opacity-0 group-hover/marker:opacity-100 transition-opacity z-20 pointer-events-none text-on-surface">
                <p className="font-label-sm text-label-sm font-bold text-error mb-1">GW-009: Central Gateway</p>
                <p className="font-caption text-caption text-on-surface-variant">Main Lobby Hub</p>
                <div className="mt-xs pt-xs border-t border-outline-variant flex justify-between text-error font-bold">
                  <span>OFFLINE</span>
                  <span>Signal Lost</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Device Status List (4 Columns) */}
        <div className="lg:col-span-4 glass-card rounded-xl shadow-sm flex flex-col overflow-hidden h-full">
          <div className="p-lg border-b border-outline-variant/30 flex justify-between items-center bg-white/50">
            <h3 className="font-headline-md text-headline-md text-on-surface">Device Registry</h3>
            <button className="text-primary hover:bg-primary/5 p-xs rounded-lg transition-colors cursor-pointer">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-md space-y-md custom-scrollbar">
            {filteredDevices.map((dev) => {
              const isOffline = dev.status === 'OFFLINE';
              const borderTheme = isOffline 
                ? 'bg-error-container/5 border-error/20 hover:border-error' 
                : 'bg-surface-container-lowest border-outline-variant/30 hover:border-primary/50';

              const avatarBg = isOffline ? 'bg-error-container/20 text-error' : 'bg-primary-container/10 text-primary-container';
              const statusColorClass = isOffline ? 'text-error' : 'text-primary';

              return (
                <div 
                  key={dev.id}
                  className={`p-md rounded-xl border transition-all group ${borderTheme}`}
                >
                  <div className="flex items-start justify-between mb-sm">
                    <div className="flex items-center gap-md">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${avatarBg}`}>
                        <span className="material-symbols-outlined">{dev.avatarIcon}</span>
                      </div>
                      <div>
                        <p className="font-body-lg text-body-lg font-bold text-on-surface">{dev.name}</p>
                        <p className="font-caption text-caption text-on-surface-variant">Firmware: {dev.firmware.split(' ')[0]}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-label-sm text-label-sm font-bold ${statusColorClass}`}>{dev.status}</p>
                      <p className="font-caption text-caption text-on-surface-variant">{dev.lastPing}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-md mb-md">
                    <div className="flex items-center gap-xs">
                      <span className="material-symbols-outlined text-sm text-on-surface-variant">wifi</span>
                      <span className="font-caption text-caption text-on-surface-variant">{dev.dbSignal}</span>
                    </div>
                    <div className="flex items-center gap-xs">
                      <span className={`material-symbols-outlined text-sm ${dev.battery <= 20 ? 'text-error animate-pulse' : 'text-on-surface-variant'}`}>
                        {dev.battery <= 20 ? 'battery_alert' : 'battery_full'}
                      </span>
                      <span className={`font-caption text-caption ${dev.battery <= 20 ? 'text-error font-bold' : 'text-on-surface-variant'}`}>
                        {dev.battery}%
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    {!isOffline && (
                      <button className="flex-grow bg-surface-container-high hover:bg-surface-container-highest py-xs rounded-lg font-label-sm text-label-sm transition-colors flex items-center justify-center gap-xs cursor-pointer text-on-surface">
                        <span className="material-symbols-outlined text-sm">settings</span> Diagnostics
                      </button>
                    )}
                    <button 
                      onClick={() => restartDevice(dev.id)}
                      className={`flex-grow py-xs rounded-lg font-label-sm text-label-sm transition-all flex items-center justify-center gap-xs cursor-pointer text-white ${
                        isOffline ? 'bg-error hover:bg-error/90' : 'bg-primary hover:bg-primary/90'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">restart_alt</span> 
                      {isOffline ? 'Force Restart' : 'Restart'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="p-md bg-white/50 border-t border-outline-variant/30 text-center">
            <button className="font-label-sm text-label-sm text-primary hover:underline uppercase tracking-widest cursor-pointer">
              Load More Devices
            </button>
          </div>
        </div>
      </div>

      {/* Connectivity Matrix Table */}
      <section className="glass-card rounded-xl shadow-sm overflow-hidden mb-xl">
        <div className="px-xl py-lg border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low/50">
          <h3 className="font-headline-md text-headline-md text-on-surface">Device Connectivity Matrix</h3>
          <div className="flex gap-md">
            <button className="bg-surface-container px-md py-xs rounded-lg font-label-sm text-label-sm flex items-center gap-xs cursor-pointer text-on-surface hover:bg-surface-container-high">
              <span className="material-symbols-outlined text-sm">download</span> Export Report
            </button>
            <button className="bg-primary text-white px-md py-xs rounded-lg font-label-sm text-label-sm flex items-center gap-xs hover:bg-primary/95 transition-colors cursor-pointer shadow-sm">
              <span className="material-symbols-outlined text-sm">add</span> Provision New
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container/30 border-b border-outline-variant/30">
                <th className="px-xl py-md font-label-sm text-label-sm text-on-surface-variant uppercase">Device ID</th>
                <th className="px-xl py-md font-label-sm text-label-sm text-on-surface-variant uppercase">Type</th>
                <th className="px-xl py-md font-label-sm text-label-sm text-on-surface-variant uppercase">Placement</th>
                <th className="px-xl py-md font-label-sm text-label-sm text-on-surface-variant uppercase">Connectivity</th>
                <th className="px-xl py-md font-label-sm text-label-sm text-on-surface-variant uppercase">Battery</th>
                <th className="px-xl py-md font-label-sm text-label-sm text-on-surface-variant uppercase">Firmware</th>
                <th className="px-xl py-md font-label-sm text-label-sm text-on-surface-variant uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredDevices.map((dev) => {
                const isOffline = dev.status === 'OFFLINE';
                const batteryColor = dev.battery <= 20 ? 'bg-error' : dev.battery <= 50 ? 'bg-tertiary' : 'bg-primary';

                return (
                  <tr key={dev.id} className={`hover:bg-surface-container-low transition-colors ${isOffline ? 'bg-error-container/5' : ''}`}>
                    <td className="px-xl py-md font-body-md font-bold text-on-surface">{dev.id}</td>
                    <td className="px-xl py-md font-body-md text-on-surface-variant">{dev.type}</td>
                    <td className="px-xl py-md font-body-md text-on-surface-variant">{dev.location}</td>
                    <td className="px-xl py-md">
                      {isOffline ? (
                        <span className="bg-error-container/20 text-error px-sm py-xs rounded-full font-label-sm text-label-sm font-bold border border-error/10">
                          Offline (Last {dev.lastPing})
                        </span>
                      ) : (
                        <span className="bg-primary-container/10 text-primary px-sm py-xs rounded-full font-label-sm text-label-sm font-bold">
                          Active ({dev.dbSignal})
                        </span>
                      )}
                    </td>
                    <td className="px-xl py-md">
                      <div className="w-full bg-surface-container rounded-full h-1.5 max-w-[80px] mb-1">
                        <div className={`h-1.5 rounded-full ${batteryColor}`} style={{ width: `${dev.battery}%` }}></div>
                      </div>
                      <span className="font-caption text-caption text-on-surface-variant">{dev.battery}%</span>
                    </td>
                    {isOffline ? (
                      <td 
                        onClick={() => showToast(`Starting ${dev.name} firmware upgrade...`)}
                        className="px-xl py-md font-body-md text-error font-bold underline cursor-pointer"
                      >
                        {dev.firmware}
                      </td>
                    ) : (
                      <td className="px-xl py-md font-body-md text-on-surface-variant">{dev.firmware}</td>
                    )}
                    <td className="px-xl py-md text-right">
                      {isOffline ? (
                        <button className="p-xs text-error hover:scale-110 transition-transform cursor-pointer">
                          <span className="material-symbols-outlined">warning</span>
                        </button>
                      ) : (
                        <button className="p-xs hover:text-primary transition-colors cursor-pointer text-on-surface-variant">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Notification Toast */}
      <div 
        className={`fixed bottom-lg right-lg transition-all duration-300 z-[100] glass-card p-md rounded-xl shadow-2xl flex items-center gap-md border-l-4 border-l-primary pointer-events-none ${
          toastVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        <div className="bg-primary/10 p-xs rounded-full text-primary">
          <span className="material-symbols-outlined">check_circle</span>
        </div>
        <div>
          <p className="font-label-sm text-label-sm font-bold text-on-surface">Command Executed</p>
          <p className="font-caption text-caption text-on-surface-variant">{toastMsg}</p>
        </div>
      </div>
    </div>
  );
}

export default function DeviceStatus() {
  return (
    <Suspense fallback={<div className="p-xl text-center font-body-md text-secondary">Loading Device Status...</div>}>
      <DeviceStatusContent />
    </Suspense>
  );
}
