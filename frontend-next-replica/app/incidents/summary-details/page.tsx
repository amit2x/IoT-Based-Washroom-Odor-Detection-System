'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function IncidentSummaryDetails() {
  const router = useRouter();
  const [resolved, setResolved] = useState(false);

  return (
    <div className="p-lg max-w-7xl mx-auto space-y-container-gap animate-fade-in">
      {/* Top Details & Header Action Row */}
      <div className="grid grid-cols-12 gap-container-gap">
        {/* Status & Identification */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-lg">
          <div className="space-y-sm">
            <div className="flex items-center gap-sm">
              <span className={`px-md py-1 rounded-full font-label-sm text-label-sm flex items-center gap-xs ${
                resolved ? 'bg-primary-container/10 text-primary' : 'bg-amber-100 text-amber-800'
              }`}>
                <span className={`w-2 h-2 rounded-full ${resolved ? 'bg-primary' : 'bg-amber-600 animate-pulse'}`}></span>
                {resolved ? 'Resolved' : 'In Progress'}
              </span>
              <span className="text-secondary font-label-sm text-label-sm uppercase tracking-wider">Priority: High</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-on-surface">HVAC Sensor Malfunction: Critical Warning</h3>
            <p className="text-on-surface-variant font-body-md max-w-xl leading-relaxed">
              Terminal 2, Unit M03 reported anomalous temperature spike (28°C) in sterile zone area. Automated suppression systems on standby.
            </p>
          </div>
          <div className="flex flex-col gap-xs min-w-[200px] w-full md:w-auto">
            <button 
              onClick={() => setResolved(prev => !prev)}
              className={`w-full py-md px-lg rounded-xl font-body-md font-bold shadow-md transition-all cursor-pointer ${
                resolved ? 'bg-secondary text-on-secondary hover:brightness-105' : 'bg-primary text-on-primary hover:brightness-110'
              }`}
            >
              {resolved ? 'Reopen Incident' : 'Mark Resolved'}
            </button>
            <button className="w-full py-md px-lg bg-surface-container-high text-on-surface rounded-xl font-body-md font-bold hover:bg-surface-variant transition-all border border-outline-variant cursor-pointer">
              Reassign Personnel
            </button>
          </div>
        </div>

        {/* Personnel Assigned */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm space-y-md">
          <h4 className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Personnel Assigned</h4>
          <div className="flex items-center gap-md bg-surface-container-low p-sm rounded-lg">
            <div className="w-12 h-12 bg-primary-container/20 rounded-full flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">engineering</span>
            </div>
            <div>
              <p className="font-body-lg text-on-surface font-bold">Tech Group Delta</p>
              <p className="font-caption text-caption text-secondary">3 Personnel • ETA: 4m</p>
            </div>
          </div>
          <div className="flex -space-x-2 items-center">
            <img 
              alt="Team 1" 
              className="w-8 h-8 rounded-full border-2 border-surface-container-lowest object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_D8gBCuRZmpnOHxR0QReGgrSC4pobQ_O1FYAsX2zQSLNRh0Gi8UTCyVvHD-haMPUzDNuret7onKOyDCRUgn9EugGuoXI48en-_HBpJVmxNVFbWSItdltLvJP16oXIYe4VYGGD4GnWnWC4f8InyiTVvWWyJUIxrnMguEfFEt9rcxjbFflplha9917K23TQfQqVWeCmbOoLangysECX9emS0aDdPW0DKEf1izC-N6mFZ-xcWwShvAowc23zcuM7nmvAqsT008qMd6U"
            />
            <img 
              alt="Team 2" 
              className="w-8 h-8 rounded-full border-2 border-surface-container-lowest object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6hOs6uKn6MU1xUFm_cJQHcnCYnineYKcxhgvW69LjE6G6KK3U2v4q8tYFtkNMg2EfqeTzoFX3s-_JmT3F7O1yCwgG9oG2-9mMiPGOHNKY3SyvGfY_9UV8LlF8IFKzdJrf7WlPNnh8j2t39bupyy9IXmqSQ3nuCUBn3BFcU07tDp6C0u9QUNtljEed2N06aP63TUFT2KcMAYsy1yRI7S0456kYCAIwGYxcNTV1hT9CqY4D3jQjEoiAfk00rHbXEkaAe443mWMW4dg"
            />
            <img 
              alt="Team 3" 
              className="w-8 h-8 rounded-full border-2 border-surface-container-lowest object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlO_CFbEAWtkYtUd8QThP5kK-82bqveEKaEjynGgXVc_6RDxhd6dvgvmF0EwojFrUwZhviAKHH5O6-K-xng23cSiKfdCqENRCTyIK_nWRuq6ODhkYmUXg6N9abNAYqE12bklBqNkXFKQPEFR1RwWUskEAU0CrGfPlomeaDKZ1HygtOarRK44la7sc2bqbZdiVN4ZeOuo7GQCI3DhFQKhzMImKRQAxmu7R_qmbW2E8lqRMzOXxNDn8wtagV19cLkYlHVX5EFtwrcH4"
            />
            <div className="w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-surface-container-highest flex items-center justify-center text-[10px] font-bold text-on-surface">+2</div>
          </div>
        </div>
      </div>

      {/* Content Grid: Timeline and Map */}
      <div className="grid grid-cols-12 gap-container-gap">
        {/* Timeline & Logs */}
        <div className="col-span-12 lg:col-span-8 space-y-container-gap">
          {/* Summary Details */}
          <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm">
            <h4 className="font-headline-md text-headline-md text-on-surface mb-lg">Technical Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-lg">
              <div className="space-y-1">
                <p className="font-caption text-caption text-secondary uppercase tracking-wider">Time Happened</p>
                <p className="font-body-lg text-body-lg text-on-surface font-bold">10:24:15 AM</p>
              </div>
              <div className="space-y-1">
                <p className="font-caption text-caption text-secondary uppercase tracking-wider">Detection Source</p>
                <div className="flex items-center gap-xs">
                  <span className="material-symbols-outlined text-[16px] text-primary">sensors</span>
                  <p className="font-body-lg text-body-lg text-on-surface font-bold">Auto-Sensor #882</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="font-caption text-caption text-secondary uppercase tracking-wider">Duration</p>
                <p className="font-body-lg text-body-lg text-on-surface font-bold">00:32:11</p>
              </div>
              <div className="space-y-1">
                <p className="font-caption text-caption text-secondary uppercase tracking-wider">Risk Level</p>
                <p className="font-body-lg text-body-lg text-error font-bold">Elevated (Level 2)</p>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm">
            <div className="flex justify-between items-center mb-lg">
              <h4 className="font-headline-md text-headline-md text-on-surface">Incident Activity Log</h4>
              <button className="text-primary font-label-sm text-label-sm flex items-center gap-xs cursor-pointer hover:underline">
                <span className="material-symbols-outlined text-[16px]">add_notes</span>
                Add Update
              </button>
            </div>
            <div className="space-y-0 relative">
              {/* Vertical timeline line */}
              <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-outline-variant/30"></div>

              {/* Entry 1 */}
              <div className="relative pl-10 pb-lg">
                <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-surface-container-highest border-4 border-surface-container-lowest flex items-center justify-center z-10 text-on-surface">
                  <span className="material-symbols-outlined text-[14px]">update</span>
                </div>
                <div className="space-y-xs">
                  <div className="flex items-center justify-between">
                    <p className="font-body-lg font-bold text-on-surface">Status Update: Dispatching Team</p>
                    <span className="font-caption text-caption text-secondary">10:48 AM</span>
                  </div>
                  <p className="font-body-md text-on-surface-variant leading-snug bg-surface-container-low p-md rounded-lg">
                    Tech Group Delta has been dispatched to Level 2 sterile zone. ETA was confirmed by team lead Henderson.
                  </p>
                </div>
              </div>

              {/* Entry 2 */}
              <div className="relative pl-10 pb-lg">
                <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-primary-container/30 border-4 border-surface-container-lowest flex items-center justify-center z-10 text-primary">
                  <span className="material-symbols-outlined text-[14px]">person_check</span>
                </div>
                <div className="space-y-xs">
                  <div className="flex items-center justify-between">
                    <p className="font-body-lg font-bold text-on-surface">Incident Assigned</p>
                    <span className="font-caption text-caption text-secondary">10:35 AM</span>
                  </div>
                  <p className="font-body-md text-on-surface-variant leading-snug">
                    Incident reviewed by Operations Desk. Assigned to HVAC specialist group.
                  </p>
                </div>
              </div>

              {/* Entry 3 */}
              <div className="relative pl-10">
                <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-error-container border-4 border-surface-container-lowest flex items-center justify-center z-10 text-error">
                  <span className="material-symbols-outlined text-[14px]">warning</span>
                </div>
                <div className="space-y-xs">
                  <div className="flex items-center justify-between">
                    <p className="font-body-lg font-bold text-on-surface">Initial Detection</p>
                    <span className="font-caption text-caption text-secondary">10:24 AM</span>
                  </div>
                  <p className="font-body-md text-on-surface-variant leading-snug">
                    Autonomous sensor #882 detected temperature spike at 28.4°C. Localized humidity drop triggered secondary alert.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location & Diagnostics Side */}
        <div className="col-span-12 lg:col-span-4 space-y-container-gap">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">
            <div className="p-md border-b border-outline-variant flex items-center justify-between bg-surface-bright">
              <h4 className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Location Matrix</h4>
              <span 
                className="text-primary font-label-sm text-label-sm cursor-pointer hover:underline"
                onClick={() => router.push('/floor-heatmap')}
              >
                Full Map View
              </span>
            </div>
            <div className="relative h-80 bg-surface-container-highest group">
              <div className="absolute inset-0 bg-slate-200/50 overflow-hidden">
                <img 
                  alt="Floor Plan" 
                  className="w-full h-full object-cover mix-blend-multiply opacity-60" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH5YDXkAJhIpcjGA9GiIe85KTzwjN2v8IPldU7rB_KTf-qJKWk1JQrij-FgfAww2ovYuOvuiiAvTkQy6u7juYSEDU_Ctg6CTCG-mK9jJFmvfyB_eVucOp8_iSBLVi8BonNx60Kyzqe4bxort9fvRtGfCM3bBZEqWqrpfqVPwOdoyz-f-P6UT09Pee2DZNWw9AsyCoFOvSleKTytzmn0H41vyjQv321LTRy2G_A_8am4RJ_UkqCOVF_IJxSEHZlGeEimiS1bamfbew"
                />
                
                {/* Spatial Overlay Pulse */}
                <div className="absolute top-[40%] left-[60%] -translate-x-1/2 -translate-y-1/2">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-12 h-12 bg-error/30 rounded-full animate-ping"></div>
                    <div className="absolute w-8 h-8 bg-error/50 rounded-full"></div>
                    <div className="relative w-4 h-4 bg-error rounded-full border-2 border-white shadow-xl"></div>
                    <div className="absolute top-6 left-6 bg-surface-container-lowest border border-outline-variant px-sm py-xs rounded-lg shadow-lg whitespace-nowrap">
                      <p className="font-label-sm text-label-sm font-bold text-on-surface">Unit M03-1024</p>
                      <p className="font-caption text-caption text-secondary">Area Heat: 28.4°C</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <button className="w-10 h-10 bg-surface-container-lowest rounded-full shadow-md flex items-center justify-center hover:bg-surface-container-high text-on-surface cursor-pointer">
                  <span className="material-symbols-outlined">add</span>
                </button>
                <button className="w-10 h-10 bg-surface-container-lowest rounded-full shadow-md flex items-center justify-center hover:bg-surface-container-high text-on-surface cursor-pointer">
                  <span className="material-symbols-outlined">remove</span>
                </button>
              </div>
            </div>
            <div className="p-md space-y-sm bg-surface-container-lowest">
              <div className="flex items-center gap-md">
                <span className="material-symbols-outlined text-secondary">pin_drop</span>
                <div>
                  <p className="font-body-md font-bold text-on-surface">Terminal 2, Level 2</p>
                  <p className="font-caption text-caption text-secondary">Sector 12B - Sterile Zone</p>
                </div>
              </div>
              <div className="flex items-center gap-md">
                <span className="material-symbols-outlined text-secondary">stairs</span>
                <div>
                  <p className="font-body-md font-bold text-on-surface">Nearest Egress</p>
                  <p className="font-caption text-caption text-secondary">Gate B22 Service Elevator (12m)</p>
                </div>
              </div>
            </div>
          </div>

          {/* System Diagnostics */}
          <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm space-y-md">
            <h4 className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">System Diagnostics</h4>
            <div className="space-y-sm">
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">HVAC Controller M03</span>
                <span className="text-error font-bold">Unresponsive</span>
              </div>
              <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
                <div className="bg-error h-full w-full"></div>
              </div>
              
              <div className="flex justify-between items-center text-sm pt-xs">
                <span className="text-on-surface-variant">Air Flow Rate</span>
                <span className="text-primary font-bold">Normal</span>
              </div>
              <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full" style={{ width: '85%' }}></div>
              </div>

              <div className="flex justify-between items-center text-sm pt-xs">
                <span className="text-on-surface-variant">Secondary Sensor #883</span>
                <span className="text-on-surface font-bold font-bold text-primary">Online</span>
              </div>
              <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-full"></div>
              </div>
            </div>
            <button className="w-full py-sm text-primary font-body-md border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer font-bold">
              Run Full Diagnostic
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
