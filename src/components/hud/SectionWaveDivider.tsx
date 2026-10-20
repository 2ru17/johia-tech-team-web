'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SectionWaveDividerProps {
  accentColor?: string;
  flip?: boolean;
  label?: string;
  className?: string;
}

export function SectionWaveDivider({
  accentColor = '#38BDF8',
  flip = false,
  label,
  className,
}: SectionWaveDividerProps) {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden py-6 select-none pointer-events-none',
        flip && 'rotate-180',
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-14 md:h-20 opacity-70"
        preserveAspectRatio="none"
      >
        <path
          d="M0 45C180 15 360 75 540 45C720 15 900 75 1080 45C1260 15 1350 60 1440 45V90H0V45Z"
          fill="#0E1017"
          fillOpacity="0.55"
        />
        <path
          d="M0 45C180 15 360 75 540 45C720 15 900 75 1080 45C1260 15 1350 60 1440 45"
          stroke={accentColor}
          strokeOpacity="0.35"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />
        <path
          d="M0 62C240 82 480 22 720 52C960 82 1200 28 1440 58"
          stroke="#FFFFFF"
          strokeOpacity="0.08"
          strokeWidth="1"
        />
      </svg>
      {label && !flip && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-full border border-white/10 bg-[#06070A]/90 px-3 py-0.5 font-mono text-[10px] tracking-[0.2em] text-slate-400 uppercase">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
