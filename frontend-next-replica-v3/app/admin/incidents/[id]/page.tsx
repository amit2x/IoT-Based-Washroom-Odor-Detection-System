'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { initialIncidents } from '@/lib/mockData';

export default function IncidentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = React.use(params);
  const incidentId = unwrappedParams.id;

  const initialIncident =
    initialIncidents.find((inc) => inc.id === incidentId) || initialIncidents[0];

  const [incident, setIncident] = useState(initialIncident);
  const [isResolved, setIsResolved] = useState(incident.status === 'Resolved');
  const [timeline, setTimeline] = useState(incident.timeline);
  const [newNote, setNewNote] = useState('');
  const [showNoteModal, setShowNoteModal] = useState(false);

  const handleResolve = () => {
    setIsResolved(true);
    setIncident({ ...incident, status: 'Resolved' });
    setTimeline([
      {
        title: 'Incident Resolved',
        desc: 'Flooding issue cleared. Area sanitized and sensor recalibrated.',
        time: 'JUST NOW',
        status: 'resolved',
      },
      ...timeline,
    ]);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setTimeline([
      {
        title: 'Note Added',
        desc: newNote,
        time: 'JUST NOW',
        status: 'note',
      },
      ...timeline,
    ]);
    setNewNote('');
    setShowNoteModal(false);
  };

  return (
    <>
      {/* Top App Bar */}
      <header className="sticky top-0 z-40 bg-surface-container-lowest border-b border-outline-variant px-margin-page py-4 flex justify-between items-center shrink-0 shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/incidents/active"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant transition-colors text-primary"
          >
            <span className="material-symbols-outlined font-bold">arrow_back</span>
          </Link>
          <div>
            <h1 className="text-headline-md font-headline-md text-on-surface leading-tight font-bold">
              Incident {incident.id}
            </h1>
            <p className="text-label-md font-label-md text-outline">{incident.location}</p>
          </div>
          <span className="ml-4 px-3 py-1 bg-tertiary-container text-on-tertiary-container text-label-md font-bold rounded-full flex items-center gap-1 opacity-90 text-xs">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              priority_high
            </span>
            {incident.priority.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2 rounded-full border border-outline text-on-surface-variant font-label-md hover:bg-surface-variant transition-colors text-xs font-bold">
            Reassign
          </button>
          <button className="px-5 py-2 rounded-full border border-outline text-on-surface-variant font-label-md hover:bg-surface-variant transition-colors text-xs font-bold">
            Contact Team
          </button>
          {isResolved ? (
            <div className="flex items-center gap-2 px-6 py-2 bg-secondary text-white rounded-full font-label-md font-bold shadow-md text-xs">
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              RESOLVED
            </div>
          ) : (
            <button
              onClick={handleResolve}
              className="px-6 py-2 bg-primary text-white rounded-full font-label-md font-bold hover:opacity-90 transition-all shadow-md text-xs"
            >
              Mark as Resolved
            </button>
          )}
        </div>
      </header>

      {/* Main Grid Content */}
      <div className="p-margin-page max-w-container-max mx-auto w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left Column */}
          <div className="lg:col-span-8 flex flex-col gap-gutter">
            {/* Washroom Quality Section */}
            <section className="bg-white rounded-xl p-card-padding border border-outline-variant shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
                <div>
                  <h2 className="text-title-lg font-headline-md text-on-surface mb-1 font-semibold">
                    Washroom Health Index (WHI)
                  </h2>
                  <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                    <span className="material-symbols-outlined text-[20px]">analytics</span>
                    <span>Facility performance score at time of incident</span>
                  </div>
                </div>
                <div className="p-3 bg-error-container text-on-error-container rounded-lg flex items-center gap-4 border border-error max-w-xs">
                  <div className="flex flex-col items-center">
                    <p className="text-3xl font-bold leading-none">24</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider mt-1">WHI Score</p>
                  </div>
                  <div className="w-[2px] h-10 bg-error/20"></div>
                  <div>
                    <p className="text-label-md font-bold uppercase tracking-widest text-error text-[10px]">
                      CRITICAL FAILURE
                    </p>
                    <p className="text-[10px] text-on-error-container/70">Score dropped 85% in 4 mins</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant">
                  <p className="text-label-md text-outline mb-1">Odour Quality</p>
                  <div className="flex items-center justify-between">
                    <span className="text-body-md font-bold text-secondary">Normal</span>
                    <span className="material-symbols-outlined text-secondary">sentiment_satisfied</span>
                  </div>
                </div>
                <div className="bg-error-container/30 p-4 rounded-lg border border-error/20">
                  <p className="text-label-md text-outline mb-1">Dryness Level</p>
                  <div className="flex items-center justify-between">
                    <span className="text-body-md font-bold text-error">Critical Leak</span>
                    <span className="material-symbols-outlined text-error">water_drop</span>
                  </div>
                </div>
                <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant">
                  <p className="text-label-md text-outline mb-1">Consumables</p>
                  <div className="flex items-center justify-between">
                    <span className="text-body-md font-bold text-on-surface font-semibold">Adequate</span>
                    <span className="material-symbols-outlined text-on-surface-variant">inventory_2</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Incident Timeline */}
            <section className="bg-white rounded-xl p-card-padding border border-outline-variant shadow-sm flex-1">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-title-lg font-headline-md text-on-surface font-semibold">Activity Timeline</h2>
                <button
                  onClick={() => setShowNoteModal(true)}
                  className="text-primary font-label-md flex items-center gap-1 hover:underline text-xs font-bold"
                >
                  <span className="material-symbols-outlined text-[18px]">add_comment</span>
                  Add Note
                </button>
              </div>
              <div className="relative space-y-12 before:content-[''] before:absolute before:left-[19px] before:top-2 before:bottom-0 before:w-0.5 before:bg-outline-variant">
                {timeline.map((event, index) => {
                  let icon = 'notifications_active';
                  let iconBg = 'bg-outline-variant text-outline';
                  if (event.status === 'resolved') {
                    icon = 'task_alt';
                    iconBg = 'bg-secondary text-white';
                  } else if (event.status === 'in-progress') {
                    icon = 'engineering';
                    iconBg = 'bg-primary-container text-primary';
                  } else if (event.status === 'note') {
                    icon = 'chat_bubble';
                    iconBg = 'bg-primary text-white';
                  }

                  return (
                    <div key={index} className="relative pl-12">
                      <div className={`absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center z-10 border-4 border-surface shadow-sm ${iconBg}`}>
                        <span className="material-symbols-outlined text-[20px]">{icon}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-body-md font-bold text-on-surface">{event.title}</h3>
                          <p className="text-body-md text-on-surface-variant mt-1">{event.desc}</p>
                          {event.status === 'resolved' && (
                            <div className="mt-2 flex items-center gap-2 px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full w-fit text-xs font-bold">
                              <span className="material-symbols-outlined text-[16px]">verified</span>
                              <span>Verified by: Rahul S.</span>
                            </div>
                          )}
                          {event.status === 'in-progress' && (
                            <div className="mt-2 flex items-center gap-2 px-3 py-1 bg-surface-variant text-on-surface-variant rounded-full w-fit text-xs font-bold">
                              <span className="material-symbols-outlined text-[16px]">person</span>
                              <span>Assigned: Rahul S.</span>
                            </div>
                          )}
                        </div>
                        <p className="text-[10px] font-bold text-outline uppercase">{event.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 flex flex-col gap-gutter">
            {/* Facility Details */}
            <section className="bg-white rounded-xl p-card-padding border border-outline-variant shadow-sm">
              <h2 className="text-title-lg font-headline-md text-on-surface mb-4 font-semibold">Facility Status</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-outline-variant/50">
                  <span className="text-body-sm text-outline">Washroom ID</span>
                  <span className="text-body-sm font-bold">{incident.facilityId}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-outline-variant/50">
                  <span className="text-body-sm text-outline">Category</span>
                  <span className="text-body-sm font-bold">{incident.category}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-body-sm text-outline">Current Status</span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                    isResolved ? 'bg-secondary-container text-secondary' : 'bg-error-container text-error'
                  }`}>
                    {isResolved ? 'OPERATIONAL' : 'TEMPORARY CLOSED'}
                  </span>
                </div>
              </div>
            </section>

            {/* Washroom History */}
            <section className="bg-white rounded-xl p-card-padding border border-outline-variant shadow-sm">
              <h2 className="text-title-lg font-headline-md text-on-surface mb-4 font-semibold">Facility History</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 bg-secondary-container/20 border border-secondary/20 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-secondary-container text-secondary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                  </div>
                  <div>
                    <p className="text-body-md font-bold text-on-secondary-container">Last Resolved</p>
                    <p className="text-body-sm font-body-sm text-on-surface">Routine Cleaning</p>
                    <p className="text-[10px] text-outline mt-1 font-semibold">4 days ago • Staff #882</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-3 bg-surface-container-low border border-outline-variant rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-surface-variant text-outline flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">plumbing</span>
                  </div>
                  <div>
                    <p className="text-body-md font-bold text-on-surface-variant">Maintenance Task</p>
                    <p className="text-body-sm font-body-sm text-on-surface">Pipe Inspection</p>
                    <p className="text-[10px] text-outline mt-1 font-semibold">12 days ago • Passed</p>
                  </div>
                </div>
              </div>
              <button className="mt-6 w-full text-center text-primary font-label-md font-bold py-2 border-t border-outline-variant pt-4 hover:underline text-xs">
                View All Logs
              </button>
            </section>

            {/* User Complaints */}
            <section className="bg-white rounded-xl p-card-padding border border-outline-variant bg-surface-container-high shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary">thumb_down</span>
                <h3 className="text-body-md font-bold text-on-surface">Recent User Complaints</h3>
              </div>
              <div className="space-y-3">
                <div className="p-2 bg-white rounded border border-outline-variant">
                  <p className="text-[11px] text-outline mb-1 font-semibold">10:18 AM • Passenger Feedback</p>
                  <p className="text-body-sm">"Water everywhere near the stalls. Dangerous."</p>
                </div>
                <div className="p-2 bg-white rounded border border-outline-variant">
                  <p className="text-[11px] text-outline mb-1 font-semibold">10:20 AM • Passenger Feedback</p>
                  <p className="text-body-sm">"Washroom is closed but water is leaking out."</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Note Creation Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form onSubmit={handleAddNote} className="bg-white rounded-xl max-w-sm w-full p-6 border border-outline-variant shadow-xl">
            <h3 className="text-title-lg font-bold text-on-surface mb-4">Add Note</h3>
            <textarea
              required
              className="w-full border border-outline-variant rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-body-sm mb-4 h-24"
              placeholder="Type your timeline update note here..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowNoteModal(false)}
                className="px-4 py-2 text-on-surface-variant font-bold hover:bg-surface-container rounded-lg text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white font-bold rounded-lg text-xs"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
