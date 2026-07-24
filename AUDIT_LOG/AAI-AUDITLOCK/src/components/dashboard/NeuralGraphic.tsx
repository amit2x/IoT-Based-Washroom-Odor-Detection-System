'use client';

import React from 'react';

export default function NeuralGraphic() {
  return (
    <div className="flex-grow neural-graphic flex flex-col items-center justify-center p-12 text-center min-h-[380px] w-full relative select-none">
      {/* Graphic Shapes */}
      <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
        {/* Concentric rotating diamonds */}
        <div className="absolute inset-0 border-2 border-blue-100/70 rotate-45 transform scale-110 animate-[spin_20s_linear_infinite]"></div>
        <div className="absolute inset-0 border-2 border-blue-300 rotate-45 transform animate-[spin_15s_linear_infinite_reverse]"></div>
        <div className="absolute inset-4 border-2 border-blue-400 rotate-45 transform scale-90 animate-[spin_10s_linear_infinite]"></div>
        <div className="absolute inset-8 border-2 border-blue-600 rotate-45 transform scale-75 shadow-[0_0_20px_rgba(37,99,235,0.2)] flex items-center justify-center">
          {/* Inner core dot */}
          <div className="w-3.5 h-3.5 bg-blue-600 rounded-full animate-ping"></div>
          <div className="absolute w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
        </div>
      </div>

      {/* Overlay Status info */}
      <div className="z-10 relative">
        <h4 className="text-blue-800 font-mono font-bold tracking-widest text-sm mb-2 uppercase">
          Processing Vector Clusters
        </h4>
        <p className="text-slate-500 text-xs max-w-xs leading-relaxed font-sans mx-auto">
          Analyzing multi-dimensional attention maps for divergent output detection.
        </p>
      </div>

      {/* Support Code Tag */}
      <div className="absolute bottom-4 left-4 text-[10px] text-slate-400 font-mono">
        Support: 0x932...AF1
      </div>
    </div>
  );
}
