import Link from 'next/link';
import { initialTerminals } from '@/lib/mockData';
import Header from '@/components/Header';

export default async function TerminalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const terminalId = resolvedParams.id;

  const terminal =
    initialTerminals.find((t) => t.id === terminalId) || initialTerminals[0];

  return (
    <>
      <Header title={`Terminal Diagnostics - ${terminal.id}`} placeholder="Search sensor metrics or logs..." />

      {/* Main Canvas Scroll Area */}
      <section className="flex-grow p-margin-page bg-surface-container-low/30 overflow-y-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-stack-lg">
          <div>
            <Link
              href="/admin/terminals"
              className="text-primary hover:underline flex items-center gap-1 text-sm mb-1 font-bold"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Terminals
            </Link>
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
              {terminal.location}
            </h2>
            <p className="text-body-sm text-on-surface-variant font-medium">
              System Uptime: 99.98% • Latency: 14ms • Checked: {terminal.lastCheck}
            </p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-surface-container-highest text-primary rounded-full font-bold text-xs">
              HEALTH: {terminal.healthScore}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Main Column - Left */}
          <div className="lg:col-span-8 space-y-gutter">
            {/* Live Sensors Grid */}
            <section className="bg-white rounded-xl border border-outline-variant p-card-padding shadow-sm">
              <h3 className="font-title-lg text-title-lg text-on-surface mb-6 font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">sensors</span> Live Sensors Status
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant">
                  <p className="text-label-md text-outline mb-1">Temperature</p>
                  <p className="text-xl font-bold text-on-surface">{terminal.sensors.temperature}</p>
                </div>
                <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant">
                  <p className="text-label-md text-outline mb-1">Humidity</p>
                  <p className="text-xl font-bold text-on-surface">{terminal.sensors.humidity}</p>
                </div>
                <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant">
                  <p className="text-label-md text-outline mb-1">Ammonia Level</p>
                  <p className="text-xl font-bold text-on-surface">{terminal.sensors.ammonia}</p>
                </div>
                <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant">
                  <p className="text-label-md text-outline mb-1">Odour Index</p>
                  <p className="text-xl font-bold text-secondary">{terminal.sensors.odours}</p>
                </div>
              </div>
            </section>

            {/* Cubicles Layout Grid */}
            <section className="bg-white rounded-xl border border-outline-variant p-card-padding shadow-sm">
              <h3 className="font-title-lg text-title-lg text-on-surface mb-6 font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">grid_view</span> Cubicle Status Grid
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {terminal.cubicles.map((cubicle) => {
                  let statusClass = 'bg-secondary-container/20 border-secondary/30 text-on-secondary-container';
                  let icon = 'check_circle';
                  if (cubicle.status === 'Occupied') {
                    statusClass = 'bg-primary-container/10 border-primary/20 text-primary';
                    icon = 'do_not_disturb_on';
                  } else if (cubicle.status === 'Maintenance') {
                    statusClass = 'bg-surface-container-highest border-outline-variant text-on-surface-variant';
                    icon = 'build';
                  } else if (cubicle.status === 'Alert') {
                    statusClass = 'bg-error-container/20 border-error/30 text-error';
                    icon = 'error';
                  }

                  let typeIcon = 'wc';
                  if (cubicle.type === 'Male') typeIcon = 'man';
                  else if (cubicle.type === 'Female') typeIcon = 'woman';
                  else if (cubicle.type === 'Disabled') typeIcon = 'accessible';

                  return (
                    <div
                      key={cubicle.id}
                      className={`p-4 rounded-xl border flex flex-col justify-between h-32 transition-shadow hover:shadow-sm ${statusClass}`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="material-symbols-outlined text-2xl">{typeIcon}</span>
                        <span className="text-[10px] uppercase font-bold tracking-wider">{cubicle.status}</span>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="font-bold text-sm leading-none">{cubicle.name}</p>
                          <p className="text-[9px] opacity-75 mt-1">ID: {cubicle.id}</p>
                        </div>
                        <span className="material-symbols-outlined text-sm">{icon}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar Widgets */}
          <div className="lg:col-span-4 space-y-gutter">
            {/* Tech Assigned Widget */}
            <section className="bg-white rounded-xl border border-outline-variant p-card-padding shadow-sm">
              <h3 className="font-title-lg text-title-lg text-on-surface mb-4 font-semibold">Assigned Crew</h3>
              {terminal.assignedTechs.length > 0 ? (
                <div className="space-y-4">
                  {terminal.assignedTechs.map((tech, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <img alt={tech.name} className="w-10 h-10 rounded-full object-cover" src={tech.avatar} />
                      <div>
                        <p className="text-body-sm font-bold text-on-surface">{tech.name}</p>
                        <p className="text-[11px] text-outline">Lead Technician</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-body-sm text-outline">No maintenance crew currently assigned to this terminal.</p>
              )}
            </section>

            {/* Terminal Actions */}
            <section className="bg-white rounded-xl border border-outline-variant p-card-padding shadow-sm space-y-3">
              <h3 className="font-title-lg text-title-lg text-on-surface mb-4 font-semibold">Quick Actions</h3>
              <button className="w-full bg-primary text-white py-3.5 rounded-lg text-body-sm font-bold hover:bg-primary-container transition-all">
                Run Remote Recalibration
              </button>
              <button className="w-full border border-outline text-on-surface-variant py-3.5 rounded-lg text-body-sm hover:bg-surface-container-low transition-all">
                Request Manual Inspection
              </button>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
