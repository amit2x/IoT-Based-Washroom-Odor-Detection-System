'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();

  // Settings State variables
  const [criticalThreshold, setCriticalThreshold] = useState(85);
  const [amberThreshold, setAmberThreshold] = useState(65);

  const [notifyOps, setNotifyOps] = useState(true);
  const [autoDispatch, setAutoDispatch] = useState(true);
  const [emergencyPA, setEmergencyPA] = useState(false);

  const [pollingFrequency, setPollingFrequency] = useState('15 Seconds (Optimized)');
  const [diagnosticMode, setDiagnosticMode] = useState(false);

  const [openingTime, setOpeningTime] = useState('04:00');
  const [closingTime, setClosingTime] = useState('23:30');

  const [peakHours, setPeakHours] = useState(['06:00 - 09:00', '17:00 - 20:00']);
  const [newPeakStart, setNewPeakStart] = useState('');
  const [newPeakEnd, setNewPeakEnd] = useState('');
  const [showAddRangeForm, setShowAddRangeForm] = useState(false);

  const [keyVisible, setKeyVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const prodKeyFull = process.env.NEXT_PUBLIC_PROD_KEY || '';
  const prodKeyMasked = prodKeyFull 
    ? `${prodKeyFull.slice(0, 12)}••••••••••••••••••••${prodKeyFull.slice(-4)}`
    : 'sk_prod_99x_••••••••••••••••••••••••';

  const showToastMessage = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(prodKeyFull);
    setCopied(true);
    showToastMessage('API key copied to clipboard.');
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleAddRange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPeakStart || !newPeakEnd) {
      showToastMessage('Please specify both start and end times.', 'error');
      return;
    }
    const newRange = `${newPeakStart} - ${newPeakEnd}`;
    if (peakHours.includes(newRange)) {
      showToastMessage('This peak range already exists.', 'error');
      return;
    }
    setPeakHours([...peakHours, newRange]);
    setNewPeakStart('');
    setNewPeakEnd('');
    setShowAddRangeForm(false);
    showToastMessage('Peak hour range added.');
  };

  const handleRemoveRange = (range: string) => {
    setPeakHours(peakHours.filter((r) => r !== range));
    showToastMessage('Peak hour range removed.');
  };

  const handleDiscardChanges = () => {
    // Reset to defaults
    setCriticalThreshold(85);
    setAmberThreshold(65);
    setNotifyOps(true);
    setAutoDispatch(true);
    setEmergencyPA(false);
    setPollingFrequency('15 Seconds (Optimized)');
    setDiagnosticMode(false);
    setOpeningTime('04:00');
    setClosingTime('23:30');
    setPeakHours(['06:00 - 09:00', '17:00 - 20:00']);
    setShowAddRangeForm(false);
    showToastMessage('All unsaved modifications discarded.');
  };

  const handleSaveConfiguration = () => {
    // Save simulation
    showToastMessage('Global configuration saved successfully.');
  };

  const handleRefreshWebhook = () => {
    showToastMessage('Webhook endpoint regenerated successfully.');
  };

  return (
    <div className="p-lg max-w-6xl mx-auto space-y-lg animate-fade-in">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-lg right-lg z-50 flex items-center gap-sm px-md py-sm rounded-xl shadow-lg border text-body-md transition-all transform translate-y-0 scale-100 ${
            toast.type === 'success'
              ? 'bg-primary-container text-on-primary-container border-primary/20'
              : 'bg-error-container text-on-error-container border-error/20'
          }`}
        >
          <span className="material-symbols-outlined">
            {toast.type === 'success' ? 'check_circle' : 'error'}
          </span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Main Header Area */}
      <header className="mb-xl flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Global Settings</h1>
          <p className="font-body-md text-body-md text-secondary">
            Configure system-wide operational thresholds and terminal parameters.
          </p>
        </div>
        <div className="flex gap-sm w-full md:w-auto">
          <button
            onClick={handleDiscardChanges}
            className="flex-1 md:flex-none bg-surface-container-high text-on-surface px-lg py-sm rounded font-label-sm text-label-sm hover:bg-surface-variant transition-colors cursor-pointer text-center"
          >
            DISCARD CHANGES
          </button>
          <button
            onClick={handleSaveConfiguration}
            className="flex-1 md:flex-none bg-primary text-on-primary px-xl py-sm rounded font-label-sm text-label-sm hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer text-center"
          >
            SAVE CONFIGURATION
          </button>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-lg">
        {/* Section: System Thresholds (WHI Alerts) */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant p-lg rounded shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-sm mb-lg border-b border-outline-variant pb-md">
              <span className="material-symbols-outlined text-primary">warning</span>
              <h3 className="font-headline-md text-headline-md">System Thresholds (WHI Alerts)</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
              <div className="space-y-md">
                <label className="block">
                  <span className="font-label-sm text-label-sm text-secondary block mb-xs">
                    CRITICAL THRESHOLD (%)
                  </span>
                  <input
                    className="w-full accent-error cursor-pointer"
                    max="100"
                    min="0"
                    type="range"
                    value={criticalThreshold}
                    onChange={(e) => setCriticalThreshold(Number(e.target.value))}
                  />
                  <div className="flex justify-between font-caption text-caption mt-xs text-error font-bold">
                    <span>ALERT TRIGGERED AT {criticalThreshold}%</span>
                    <span>HIGH</span>
                  </div>
                </label>

                <label className="block pt-md">
                  <span className="font-label-sm text-label-sm text-secondary block mb-xs">
                    AMBER ALERT THRESHOLD (%)
                  </span>
                  <input
                    className="w-full accent-tertiary cursor-pointer"
                    max="100"
                    min="0"
                    type="range"
                    value={amberThreshold}
                    onChange={(e) => setAmberThreshold(Number(e.target.value))}
                  />
                  <div className="flex justify-between font-caption text-caption mt-xs text-tertiary font-bold">
                    <span>WARNING AT {amberThreshold}%</span>
                    <span>MEDIUM</span>
                  </div>
                </label>
              </div>

              <div className="bg-surface-container-low p-md rounded border border-outline-variant/50 h-fit">
                <h4 className="font-label-sm text-label-sm mb-sm text-primary">ALERT ESCALATION LOGIC</h4>
                <div className="space-y-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-body-md text-body-md">Notify Operations Manager</span>
                    <input
                      checked={notifyOps}
                      onChange={(e) => setNotifyOps(e.target.checked)}
                      className="rounded border-outline-variant text-primary focus:ring-primary cursor-pointer w-4 h-4"
                      type="checkbox"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-body-md text-body-md">Auto-Dispatch Cleaning Crew</span>
                    <input
                      checked={autoDispatch}
                      onChange={(e) => setAutoDispatch(e.target.checked)}
                      className="rounded border-outline-variant text-primary focus:ring-primary cursor-pointer w-4 h-4"
                      type="checkbox"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-body-md text-body-md">Emergency PA Announcement</span>
                    <input
                      checked={emergencyPA}
                      onChange={(e) => setEmergencyPA(e.target.checked)}
                      className="rounded border-outline-variant text-primary focus:ring-primary cursor-pointer w-4 h-4"
                      type="checkbox"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Device Polling */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest border border-outline-variant p-lg rounded shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-sm mb-lg border-b border-outline-variant pb-md">
              <span className="material-symbols-outlined text-primary">sensors</span>
              <h3 className="font-headline-md text-headline-md">Device Polling</h3>
            </div>
            <div className="space-y-lg">
              <div>
                <span className="font-label-sm text-label-sm text-secondary block mb-xs">
                  IOT POLLING FREQUENCY
                </span>
                <select
                  value={pollingFrequency}
                  onChange={(e) => setPollingFrequency(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded p-sm font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="5 Seconds (Real-time)">5 Seconds (Real-time)</option>
                  <option value="15 Seconds (Optimized)">15 Seconds (Optimized)</option>
                  <option value="60 Seconds (Low Power)">60 Seconds (Low Power)</option>
                  <option value="5 Minutes (Summary Only)">5 Minutes (Summary Only)</option>
                </select>
              </div>

              <div className="p-md bg-secondary-container/10 border border-secondary-container rounded">
                <p className="font-caption text-caption text-secondary flex items-start gap-xs">
                  <span className="material-symbols-outlined text-[16px] mt-0.5">info</span>
                  <span>Optimized polling reduces network congestion by 34% in Terminal 3.</span>
                </p>
              </div>

              <div className="flex items-center justify-between py-xs border-t border-outline-variant pt-md">
                <span className="font-body-md text-body-md text-on-surface">Diagnostic Mode</span>
                <button
                  onClick={() => {
                    const nextVal = !diagnosticMode;
                    setDiagnosticMode(nextVal);
                    showToastMessage(`Diagnostic Mode ${nextVal ? 'activated' : 'deactivated'}.`);
                  }}
                  className={`w-12 h-6 rounded-full relative transition-colors duration-200 cursor-pointer ${
                    diagnosticMode ? 'bg-primary-container' : 'bg-surface-container-high'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${
                      diagnosticMode ? 'left-[26px]' : 'left-1'
                    }`}
                  ></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Terminal Operating Hours */}
        <div className="col-span-12 lg:col-span-5 bg-surface-container-lowest border border-outline-variant p-lg rounded shadow-sm">
          <div className="flex items-center gap-sm mb-lg border-b border-outline-variant pb-md">
            <span className="material-symbols-outlined text-primary">schedule</span>
            <h3 className="font-headline-md text-headline-md">Terminal Operating Hours</h3>
          </div>
          <div className="space-y-md">
            <div className="flex items-center gap-md">
              <div className="flex-1">
                <span className="font-label-sm text-label-sm text-secondary block mb-xs">
                  OPENING TIME
                </span>
                <input
                  className="w-full bg-surface-container-low border border-outline-variant rounded p-sm font-body-md outline-none focus:ring-2 focus:ring-primary/20"
                  type="time"
                  value={openingTime}
                  onChange={(e) => setOpeningTime(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <span className="font-label-sm text-label-sm text-secondary block mb-xs">
                  CLOSING TIME
                </span>
                <input
                  className="w-full bg-surface-container-low border border-outline-variant rounded p-sm font-body-md outline-none focus:ring-2 focus:ring-primary/20"
                  type="time"
                  value={closingTime}
                  onChange={(e) => setClosingTime(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-sm">
              <span className="font-label-sm text-label-sm text-secondary block mb-sm">
                PEAK HOURS OVERRIDE
              </span>
              <div className="flex flex-wrap gap-xs items-center">
                {peakHours.map((range) => (
                  <span
                    key={range}
                    className="inline-flex items-center gap-xs px-sm py-xs bg-primary-container/20 text-primary-container border border-primary-container font-label-sm text-label-sm rounded-full group hover:bg-primary-container/30 transition-colors"
                  >
                    <span>{range}</span>
                    <button
                      onClick={() => handleRemoveRange(range)}
                      className="material-symbols-outlined text-[14px] text-primary cursor-pointer hover:text-error transition-colors"
                      title="Remove range"
                    >
                      close
                    </button>
                  </span>
                ))}

                {showAddRangeForm ? (
                  <form
                    onSubmit={handleAddRange}
                    className="flex items-center gap-xs border border-outline-variant rounded-lg p-xs bg-surface-container-low"
                  >
                    <input
                      required
                      type="time"
                      className="bg-transparent border-none p-0 text-caption font-bold w-16 text-on-surface outline-none"
                      value={newPeakStart}
                      onChange={(e) => setNewPeakStart(e.target.value)}
                    />
                    <span className="text-secondary">-</span>
                    <input
                      required
                      type="time"
                      className="bg-transparent border-none p-0 text-caption font-bold w-16 text-on-surface outline-none"
                      value={newPeakEnd}
                      onChange={(e) => setNewPeakEnd(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="material-symbols-outlined text-primary cursor-pointer hover:scale-110 text-[18px]"
                    >
                      check
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddRangeForm(false)}
                      className="material-symbols-outlined text-secondary cursor-pointer hover:scale-110 text-[18px]"
                    >
                      close
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setShowAddRangeForm(true)}
                    className="px-sm py-xs border border-outline border-dashed text-secondary font-label-sm text-label-sm rounded-full hover:bg-surface-container-high transition-colors cursor-pointer"
                  >
                    + ADD RANGE
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section: Integration Keys */}
        <div className="col-span-12 lg:col-span-7 bg-surface-container-lowest border border-outline-variant p-lg rounded shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-sm mb-lg border-b border-outline-variant pb-md">
              <span className="material-symbols-outlined text-primary">key</span>
              <h3 className="font-headline-md text-headline-md">Integration & API Keys</h3>
            </div>
            <div className="space-y-md">
              <div className="grid grid-cols-12 gap-md items-end">
                <div className="col-span-10">
                  <span className="font-label-sm text-label-sm text-secondary block mb-xs">
                    PRODUCTION ENVIRONMENT KEY
                  </span>
                  <div className="flex items-center bg-surface-container-low border border-outline-variant rounded px-md py-sm">
                    <span className="font-body-md text-body-md text-secondary font-mono flex-1 truncate select-all">
                      {keyVisible ? prodKeyFull : prodKeyMasked}
                    </span>
                    <button
                      onClick={() => setKeyVisible(!keyVisible)}
                      className="material-symbols-outlined text-secondary cursor-pointer hover:text-primary transition-colors ml-xs"
                      title={keyVisible ? 'Hide Key' : 'Show Key'}
                    >
                      {keyVisible ? 'visibility_off' : 'visibility'}
                    </button>
                  </div>
                </div>
                <div className="col-span-2">
                  <button
                    onClick={handleCopyKey}
                    className="w-full bg-surface-container-high p-[10px] rounded hover:bg-surface-variant transition-colors cursor-pointer flex justify-center items-center"
                    title="Copy Key"
                  >
                    <span className="material-symbols-outlined align-middle">
                      {copied ? 'check' : 'content_copy'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-md items-end">
                <div className="col-span-10">
                  <span className="font-label-sm text-label-sm text-secondary block mb-xs">
                    STAGING/DEV WEBHOOK
                  </span>
                  <div className="flex items-center bg-surface-container-low border border-outline-variant rounded px-md py-sm">
                    <span className="font-body-md text-body-md text-secondary font-mono flex-1 truncate select-all">
                      https://api.skyhub.ops/v2/webhooks/T3
                    </span>
                  </div>
                </div>
                <div className="col-span-2">
                  <button
                    onClick={handleRefreshWebhook}
                    className="w-full bg-surface-container-high p-[10px] rounded hover:bg-surface-variant transition-colors cursor-pointer flex justify-center items-center"
                    title="Regenerate Endpoint"
                  >
                    <span className="material-symbols-outlined align-middle">refresh</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Width Activity Card */}
        <div className="col-span-12 bg-surface-container-low border border-outline-variant p-lg rounded relative overflow-hidden group">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
            <div className="flex items-center gap-lg">
              <div className="p-md bg-white rounded-xl shadow-sm">
                <span className="material-symbols-outlined text-primary scale-125">verified_user</span>
              </div>
              <div>
                <h4 className="font-headline-md text-headline-md text-on-surface">
                  Security & Compliance Baseline
                </h4>
                <p className="font-body-md text-body-md text-secondary">
                  Last certified audit completed on Oct 24, 2024. Next scan in 12 days.
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push('/audit-log')}
              className="w-full md:w-auto bg-primary-container text-on-primary-container px-lg py-md rounded-xl font-label-sm text-label-sm font-bold flex items-center justify-center gap-xs hover:shadow-lg transition-all group-active:scale-95 cursor-pointer"
            >
              VIEW AUDIT LOGS
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
