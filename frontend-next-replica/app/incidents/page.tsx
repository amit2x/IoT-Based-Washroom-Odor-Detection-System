'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { mockIncidents } from '@/lib/mockData';

interface IncidentRowProps {
  id: string;
  unit: string;
  zone: string;
  issue: string;
  priority: 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW';
  time: string;
  assigned: string;
  assignedAvatar?: string;
  status: string;
  icon: string;
  iconColor: string;
  bgIcon: string;
  timeline: {
    reported: string;
    assignedTime: string;
    started: string;
    statusText: string;
    currentDetail: string;
  };
}

function IncidentsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'active' | 'archived' | 'drafts'>('active');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState('All Priorities');
  const [issueFilter, setIssueFilter] = useState('All Issues');

  const statusParam = searchParams.get('status');

  useEffect(() => {
    if (statusParam === 'active') {
      setActiveTab('active');
    }
  }, [statusParam]);

  const staticIncidents: IncidentRowProps[] = [
    {
      id: 'INC-2940',
      unit: 'M03 - Level 2',
      zone: 'Zone: Departures North',
      issue: 'Flooding / Water Leak',
      priority: 'URGENT',
      time: '12 mins',
      assigned: 'Rajesh Kumar',
      assignedAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgxjCYfi1ho2XzjmVirlntzcA2CGnz3KUmDRwDCr4SCL7-l0wiI-RofI4WJoaG_wXU85FpHaehAUkuBvEGIsLXklPWfnZcii3TeacFAz-Kmrd9M7MGTYG24v3OngKDdBPVej6bCB8CQR3NifeebsfOP6CkaxUo-pkub7OJch3AivRvFjJQp9mB5Pb3c7N6tZAEi8w2qEI62EEQM-e_xlyb5wnYi4Ud55L2jBEv-sXkTgezntX7c2oCS-kyfOR5n67vybKtUCa-Glc',
      status: 'In Progress',
      icon: 'water_drop',
      iconColor: 'text-error',
      bgIcon: 'bg-error-container/20',
      timeline: {
        reported: '13:45 PM',
        assignedTime: '14:12 PM',
        started: '14:18 PM',
        statusText: 'Active',
        currentDetail: 'In Progress'
      }
    },
    {
      id: 'INC-2941',
      unit: 'F02 - Level 1',
      zone: 'Zone: Arrivals West',
      issue: 'Supply Depleted (Soap)',
      priority: 'MEDIUM',
      time: '5 mins',
      assigned: 'Anita Sen',
      assignedAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmmq7jrcdtxpW_SPM5_YpmHJTp3BT7PpRp_ZRHlrZy7WdSS0tyZCultNZ5MfenRJ8Yf23Cvu8UKRhObYLsCyto0uaXETP39KtwV5y5mT-CvHqrv8AU6oweq_jZGsuhc-ynPfbHIb4h9JGoLtAfvczkHApyl-X5KjEyNwNXcypLprvE-uPGRUTyKYPwTUK-2lZR9ISR9f-EY1xGN80Lq0IYAvavC-UawMHXilM_JHhFw6kSQcbYytvB-Xa6wU_u902GhH54pJZKihU',
      status: 'Dispatching',
      icon: 'soap',
      iconColor: 'text-secondary',
      bgIcon: 'bg-secondary-container/20',
      timeline: {
        reported: '14:15 PM',
        assignedTime: '14:18 PM',
        started: '--:--',
        statusText: 'En Route',
        currentDetail: 'Dispatching'
      }
    },
    {
      id: 'INC-2942',
      unit: 'G22 - Level 2',
      zone: 'Zone: Gate 22 Lobby',
      issue: 'Power Outage (Sensor)',
      priority: 'URGENT',
      time: '48 mins',
      assigned: 'Unassigned',
      status: 'Critical',
      icon: 'bolt',
      iconColor: 'text-error',
      bgIcon: 'bg-error-container/20',
      timeline: {
        reported: '13:32 PM',
        assignedTime: 'Pending over 45m',
        started: '--:--',
        statusText: 'Pending',
        currentDetail: 'Critical'
      }
    },
    {
      id: 'INC-2943',
      unit: 'M05 - Level 1',
      zone: 'Zone: Food Court Area',
      issue: 'Routine Deep Clean',
      priority: 'LOW',
      time: '--',
      assigned: 'Vikram Singh',
      assignedAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA57x8axZ0fCZvXQQIflZP_2V-_HwUi1dOKFoBYaOqodvz5WeCPNGuyv0PE85SPvhBU9BBayV3f0gWrj5dhJddFn_g3cmsuWxJoUYASa535FDImD_9G7K5DTS7NwCdJH6xqzKef6TG46RA2xJqYx_GXKGDY-E2ex9FxuZrby7luiQAe7fulxFy2JZS9VGE_yHHIkrX0awWBH7LVYrL_d6Hc6DxbxcXiHd2BJL9COTnfAXs4I5sKFYCK0_aeTByqsDsPaqvnbHKfyr8',
      status: 'Scheduled',
      icon: 'cleaning_services',
      iconColor: 'text-on-surface-variant',
      bgIcon: 'bg-surface-container-highest',
      timeline: {
        reported: '12:00 PM',
        assignedTime: '12:10 PM',
        started: 'Scheduled 15:00',
        statusText: 'Queued',
        currentDetail: 'Scheduled'
      }
    }
  ];

  const handleRowClick = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const handleDetailsRedirect = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    router.push(`/incidents/active-detail`);
  };

  const filteredIncidents = staticIncidents.filter((inc) => {
    const matchesPriority = priorityFilter === 'All Priorities' || 
      inc.priority.toLowerCase() === priorityFilter.toLowerCase();
    
    const matchesIssue = issueFilter === 'All Issues' || 
      inc.issue.toLowerCase().includes(issueFilter.toLowerCase()) ||
      (issueFilter === 'Leakage' && inc.issue.includes('Leak')) ||
      (issueFilter === 'Janitorial' && inc.issue.includes('Clean'));

    return matchesPriority && matchesIssue;
  });

  const displayedIncidents = filteredIncidents.filter((inc) => {
    if (activeTab === 'active') {
      return inc.status !== 'Resolved' && inc.status !== 'Archived';
    } else if (activeTab === 'archived') {
      return inc.status === 'Resolved' || inc.status === 'Archived';
    } else if (activeTab === 'drafts') {
      return inc.status === 'Draft';
    }
    return true;
  });

  const activeCount = staticIncidents.filter(inc => inc.status !== 'Resolved' && inc.status !== 'Archived').length;

  return (
    <div className="p-xl pt-0 space-y-lg animate-fade-in">
      {/* Quick Metrics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-lg">
        <div className="bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant/20 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-base">
            <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">Unresolved</span>
            <span className="material-symbols-outlined text-on-surface-variant opacity-40">warning</span>
          </div>
          <div className="flex items-baseline gap-sm">
            <span className="font-metric-xl text-metric-xl text-error">08</span>
            <span className="font-caption text-error bg-error-container px-base rounded leading-none">+2 hr</span>
          </div>
          <p className="mt-auto font-caption text-on-surface-variant">Across Terminal 2</p>
        </div>

        <div className="bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant/20 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-base">
            <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">Urgent Action</span>
            <span className="material-symbols-outlined text-on-surface-variant opacity-40">emergency</span>
          </div>
          <div className="flex items-baseline gap-sm">
            <span className="font-metric-xl text-metric-xl text-on-surface">03</span>
          </div>
          <p className="mt-auto font-caption text-error font-bold flex items-center gap-xs">
            <span className="material-symbols-outlined text-[14px]">error</span> High priority tasks
          </p>
        </div>

        <div className="bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant/20 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-base">
            <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">Avg. Response</span>
            <span className="material-symbols-outlined text-on-surface-variant opacity-40">timer</span>
          </div>
          <div className="flex items-baseline gap-sm">
            <span className="font-metric-xl text-metric-xl text-on-surface">12</span>
            <span className="font-body-lg text-on-surface-variant">mins</span>
          </div>
          <p className="mt-auto font-caption text-primary flex items-center gap-xs">
            <span className="material-symbols-outlined text-[14px]">trending_down</span> -2m from yesterday
          </p>
        </div>

        <div className="bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant/20 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-base">
            <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">Staff Online</span>
            <span className="material-symbols-outlined text-on-surface-variant opacity-40">person_check</span>
          </div>
          <div className="flex items-baseline gap-sm">
            <span className="font-metric-xl text-metric-xl text-on-surface">14</span>
          </div>
          <p className="mt-auto font-caption text-on-surface-variant">Maintenance teams active</p>
        </div>
      </section>

      {/* Incident Controls & Filters */}
      <section className="flex flex-wrap items-center justify-between gap-md">
        <div className="flex items-center gap-sm bg-surface-container-low p-base rounded-full border border-outline-variant/30">
          <button 
            onClick={() => setActiveTab('active')}
            className={`px-lg py-sm font-label-sm rounded-full transition-all cursor-pointer ${activeTab === 'active' ? 'bg-primary text-on-primary shadow-md' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
          >
            Active ({activeCount})
          </button>
          <button 
            onClick={() => setActiveTab('archived')}
            className={`px-lg py-sm font-label-sm rounded-full transition-all cursor-pointer ${activeTab === 'archived' ? 'bg-primary text-on-primary shadow-md' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
          >
            Archived (142)
          </button>
          <button 
            onClick={() => setActiveTab('drafts')}
            className={`px-lg py-sm font-label-sm rounded-full transition-all cursor-pointer ${activeTab === 'drafts' ? 'bg-primary text-on-primary shadow-md' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
          >
            Drafts (1)
          </button>
        </div>
        <div className="flex items-center gap-sm flex-wrap">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">filter_list</span>
            <select 
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="pl-xl pr-xl py-sm bg-surface-container-lowest border border-outline-variant rounded-full font-body-md focus:ring-primary focus:border-primary focus:outline-none appearance-none min-w-[160px] cursor-pointer"
            >
              <option>All Priorities</option>
              <option value="Urgent">Urgent</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">category</span>
            <select 
              value={issueFilter}
              onChange={(e) => setIssueFilter(e.target.value)}
              className="pl-xl pr-xl py-sm bg-surface-container-lowest border border-outline-variant rounded-full font-body-md focus:ring-primary focus:border-primary focus:outline-none appearance-none min-w-[160px] cursor-pointer"
            >
              <option>All Issues</option>
              <option value="Leakage">Leakage</option>
              <option value="Electrical">Electrical</option>
              <option value="HVAC">HVAC</option>
              <option value="Janitorial">Janitorial</option>
            </select>
          </div>
          <button 
            onClick={() => router.push('/incidents/summary-details')}
            className="flex items-center gap-sm bg-primary text-on-primary px-lg py-sm rounded-full font-label-sm shadow-lg hover:brightness-110 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            New Report
          </button>
        </div>
      </section>

      {/* Main Data Table Container */}
      <section className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant border-b border-outline-variant/30">
                <th className="px-lg py-md font-label-sm uppercase tracking-wider">Unit ID</th>
                <th className="px-lg py-md font-label-sm uppercase tracking-wider">Issue Type</th>
                <th className="px-lg py-md font-label-sm uppercase tracking-wider">Priority</th>
                <th className="px-lg py-md font-label-sm uppercase tracking-wider text-center">Time Elapsed</th>
                <th className="px-lg py-md font-label-sm uppercase tracking-wider">Assigned Personnel</th>
                <th className="px-lg py-md font-label-sm uppercase tracking-wider">Status</th>
                <th className="px-lg py-md font-label-sm uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {displayedIncidents.map((inc) => {
                const isExpanded = expandedId === inc.id;
                
                const priorityClass = 
                  inc.priority === 'URGENT' ? 'bg-error-container text-on-error-container' : 
                  inc.priority === 'MEDIUM' ? 'bg-secondary-container text-on-secondary-container' : 
                  'bg-surface-container-high text-on-surface-variant';

                const statusColor = 
                  inc.status === 'In Progress' ? 'text-primary' : 
                  inc.status === 'Dispatching' ? 'text-tertiary' : 
                  'text-error';

                const dotColor = 
                  inc.status === 'In Progress' ? 'bg-primary-container' : 
                  inc.status === 'Dispatching' ? 'bg-tertiary' : 
                  'bg-error';

                const barWidth = 
                  inc.priority === 'URGENT' ? 'w-full' : 
                  inc.priority === 'MEDIUM' ? 'w-1/4' : 'w-0';

                const barColor = 
                  inc.priority === 'URGENT' ? 'bg-error' : 'bg-secondary';

                return (
                  <React.Fragment key={inc.id}>
                    <tr 
                      onClick={() => handleRowClick(inc.id)}
                      className="hover:bg-surface-container-low/50 transition-all cursor-pointer group"
                    >
                      <td className="px-lg py-lg">
                        <div className="flex flex-col">
                          <span className="font-body-lg text-on-surface font-bold">{inc.unit}</span>
                          <span className="font-caption text-caption text-on-surface-variant">{inc.zone}</span>
                        </div>
                      </td>
                      <td className="px-lg py-lg">
                        <div className="flex items-center gap-sm">
                          <div className={`w-8 h-8 rounded ${inc.bgIcon} flex items-center justify-center`}>
                            <span className={`material-symbols-outlined ${inc.iconColor} text-[18px]`}>
                              {inc.icon}
                            </span>
                          </div>
                          <span className="font-body-md text-on-surface font-medium">{inc.issue}</span>
                        </div>
                      </td>
                      <td className="px-lg py-lg">
                        <span className={`status-chip ${priorityClass}`}>{inc.priority}</span>
                      </td>
                      <td className="px-lg py-lg text-center">
                        <div className="flex flex-col items-center">
                          <span className={`font-body-md font-bold ${inc.priority === 'URGENT' ? 'text-error' : 'text-on-surface'}`}>
                            {inc.time}
                          </span>
                          {inc.time !== '--' && (
                            <div className="w-16 h-1 bg-surface-container-high rounded-full mt-xs">
                              <div className={`h-full ${barColor} rounded-full ${barWidth}`}></div>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-lg py-lg">
                        <div className="flex items-center gap-sm">
                          <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant overflow-hidden flex items-center justify-center">
                            {inc.assignedAvatar ? (
                              <img alt="Staff Avatar" className="w-full h-full object-cover" src={inc.assignedAvatar} />
                            ) : (
                              <span className="material-symbols-outlined text-on-surface-variant text-[16px]">person</span>
                            )}
                          </div>
                          <span className={`font-body-md ${inc.assigned === 'Unassigned' ? 'text-on-surface-variant italic' : 'text-on-surface'}`}>
                            {inc.assigned}
                          </span>
                        </div>
                      </td>
                      <td className="px-lg py-lg">
                        <div className="flex items-center gap-xs">
                          <span className={`w-1.5 h-1.5 rounded-full ${dotColor} ${inc.status === 'In Progress' ? 'animate-pulse' : ''}`}></span>
                          <span className={`font-label-sm uppercase ${statusColor}`}>{inc.status}</span>
                        </div>
                      </td>
                      <td className="px-lg py-lg text-right">
                        <button 
                          onClick={(e) => handleDetailsRedirect(e, inc.id)}
                          className="p-base hover:bg-surface-container-high rounded text-on-surface-variant transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                      </td>
                    </tr>
                    
                    {/* Expandable Timeline Panel */}
                    {isExpanded && (
                      <tr className="bg-surface-container-low/20 animate-slide-down">
                        <td className="px-lg py-md border-t border-outline-variant/10" colSpan={7}>
                          <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-lg shadow-inner">
                            <div className="flex items-center justify-between mb-lg flex-wrap gap-sm">
                              <h4 className="font-label-sm text-primary uppercase tracking-widest flex items-center gap-xs">
                                <span className="material-symbols-outlined text-[16px]">history</span>
                                Resolution Timeline
                              </h4>
                              <div className="flex gap-md">
                                <button className="font-label-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-xs cursor-pointer">
                                  <span className="material-symbols-outlined text-[16px]">chat</span> Send Message
                                </button>
                                <button className="font-label-sm text-on-surface-variant hover:text-error transition-colors flex items-center gap-xs cursor-pointer">
                                  <span className="material-symbols-outlined text-[16px]">cancel</span> Escalate
                                </button>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-xl">
                              <div className="relative pl-lg timeline-item">
                                <span className="absolute left-0 top-0 w-6 h-6 rounded-full bg-error-container flex items-center justify-center text-error z-10">
                                  <span className="material-symbols-outlined text-[14px]">report</span>
                                </span>
                                <p className="font-label-sm text-on-surface leading-tight">Incident Reported</p>
                                <p className="font-caption text-on-surface-variant">{inc.timeline.reported}</p>
                                <p className="font-caption text-on-surface-variant mt-xs italic">Automatic sensor alert</p>
                              </div>
                              <div className="relative pl-lg timeline-item">
                                <span className="absolute left-0 top-0 w-6 h-6 rounded-full bg-secondary-container flex items-center justify-center text-secondary z-10">
                                  <span className="material-symbols-outlined text-[14px]">person_add</span>
                                </span>
                                <p className="font-label-sm text-on-surface leading-tight">Personnel Assigned</p>
                                <p className="font-caption text-on-surface-variant">{inc.timeline.assignedTime}</p>
                                <p className="font-body-md text-on-surface mt-xs">{inc.assigned}</p>
                              </div>
                              <div className="relative pl-lg timeline-item">
                                <span className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary-container/20 flex items-center justify-center text-primary z-10">
                                  <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                                </span>
                                <p className="font-label-sm text-on-surface leading-tight">Resolution Started</p>
                                <p className="font-caption text-on-surface-variant">{inc.timeline.started}</p>
                                <p className="font-caption text-on-surface-variant mt-xs italic">On-site investigation</p>
                              </div>
                              <div className="relative pl-lg timeline-item">
                                <span className={`absolute left-0 top-0 w-6 h-6 rounded-full flex items-center justify-center text-on-primary z-10 ${inc.status === 'Critical' ? 'bg-error animate-pulse' : 'bg-primary-container'}`}>
                                  <span className="material-symbols-outlined text-[14px]">sync</span>
                                </span>
                                <p className={`font-label-sm leading-tight ${inc.status === 'Critical' ? 'text-error' : 'text-primary'}`}>Current Status</p>
                                <p className="font-caption text-on-surface-variant">{inc.timeline.statusText}</p>
                                <p className={`font-body-md font-bold mt-xs uppercase ${inc.status === 'Critical' ? 'text-error' : 'text-primary'}`}>
                                  {inc.timeline.currentDetail}
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="p-md bg-surface-container-low/30 border-t border-outline-variant/30 flex justify-center">
          <button className="font-label-sm text-primary hover:underline flex items-center gap-xs cursor-pointer">
            View Incident History <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* Spatial Overlay Simulation */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-lg h-auto min-h-[300px]">
        <div 
          onClick={() => router.push('/floor-heatmap')}
          className="md:col-span-2 relative bg-surface-container-highest rounded-xl border border-outline-variant/20 overflow-hidden group cursor-pointer"
        >
          <img 
            alt="Airport Floor Map" 
            className="w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-105 transition-transform duration-700" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUtB8D1PHcTDPk0DZ2j3rlyMlFoXzCPkns3fMJk_ypEQR-XZFrR-reg9sDfyF8xf7GkEG3E-oa5gz30slk-Hudjwe6lxDdRDFN41P78ximDwqfWvbTWDdfSYFYT8BsHzotSTXteGb3Bo4IlPogToGWq25ERBazXakQayaeAW4HEqM-nUNLx9IsXfUx_gudkjwP95ZFfrOVecRgNc0k_eXHbjhwBloJxUBn4XS1JU8jqCsh8dK4DFP0Gvo-xdiqOxskAwlK7nVCw1I" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex flex-col justify-end p-lg">
            <div className="flex items-center gap-md">
              <div className="bg-primary/20 text-primary p-sm rounded-full">
                <span className="material-symbols-outlined">map</span>
              </div>
              <div>
                <h3 className="font-headline-md text-on-surface">Spatial Overlay</h3>
                <p className="font-caption text-on-surface-variant">Interact with the map to see incident locations in 3D</p>
              </div>
            </div>
          </div>
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <span className="absolute inset-0 rounded-full bg-error animate-ping opacity-75"></span>
              <div className="relative w-4 h-4 bg-error rounded-full border-2 border-white shadow-lg"></div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/20 flex flex-col justify-between shadow-sm">
          <div>
            <h3 className="font-label-sm text-on-surface-variant uppercase tracking-widest mb-md">Response Distribution</h3>
            <div className="space-y-lg">
              <div className="space-y-sm">
                <div className="flex justify-between font-body-md text-on-surface">
                  <span>Janitorial</span>
                  <span className="font-bold">65%</span>
                </div>
                <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="w-[65%] h-full bg-primary rounded-full"></div>
                </div>
              </div>
              <div className="space-y-sm">
                <div className="flex justify-between font-body-md text-on-surface">
                  <span>Maintenance</span>
                  <span className="font-bold">28%</span>
                </div>
                <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="w-[28%] h-full bg-tertiary rounded-full"></div>
                </div>
              </div>
              <div className="space-y-sm">
                <div className="flex justify-between font-body-md text-on-surface">
                  <span>Emergency</span>
                  <span className="font-bold">7%</span>
                </div>
                <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="w-[7%] h-full bg-error rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-lg pt-md border-t border-outline-variant/30 text-center">
            <p className="font-caption text-on-surface-variant italic">Resource allocation is currently optimized.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Incidents() {
  return (
    <Suspense fallback={<div className="p-xl text-center font-body-md text-secondary">Loading Incidents...</div>}>
      <IncidentsContent />
    </Suspense>
  );
}
