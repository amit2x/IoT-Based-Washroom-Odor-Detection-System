'use client';

import React from 'react';

export default function ForbiddenPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#070b13] p-4 text-[#e2e8f0]">
      <main className="w-full max-w-[440px] z-10">
        <div className="backdrop-blur-md bg-slate-900/60 border border-slate-800/80 rounded-2xl p-8 shadow-2xl text-center">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-3xl text-amber-500 font-bold">
              warning
            </span>
          </div>

          <h1 className="text-xl font-extrabold text-white">403 - Forbidden</h1>
          <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest font-semibold">Access Denied</p>

          <p className="text-xs text-slate-500 leading-relaxed my-6">
            You do not have the required credentials to access this folder or resource. Please contact the network administrator if you believe this is in error.
          </p>

          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-slate-950/60 hover:bg-slate-800 text-slate-300 py-3 px-4 rounded-xl border border-slate-800/80 font-bold text-xs tracking-wider uppercase transition-all"
          >
            Back to Gateway Home
          </button>
        </div>
      </main>
    </div>
  );
}
