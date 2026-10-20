'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BrutalistMarqueeProps {
  items: string[];
  variant?: 'gold' | 'dark' | 'white';
  hazard?: boolean;
}

export function BrutalistMarquee({
  items,
  variant = 'gold',
  hazard = false,
}: BrutalistMarqueeProps) {
  const styles = {
    gold: 'bg-[#F7B519] text-[#121212] border-y-4 border-[#121212]',
    dark: 'bg-[#121212] text-[#F7B519] border-y-4 border-[#F7B519]',
    white: 'bg-[#F5F5F0] text-[#121212] border-y-4 border-[#121212]',
  };

  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden select-none z-20">
      {hazard && (
        <div
          className="h-3 w-full border-t-2 border-[#121212]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-45deg, #F7B519 0px, #F7B519 14px, #121212 14px, #121212 28px)',
          }}
        />
      )}
      <div className={cn('py-3 overflow-hidden flex whitespace-nowrap', styles[variant])}>
        <div className="flex animate-[marquee_22s_linear_infinite] items-center gap-8 font-mono text-sm sm:text-base font-black uppercase tracking-widest">
          {repeated.map((txt, idx) => (
            <span key={`${txt}-${idx}`} className="inline-flex items-center gap-8">
              <span>{txt}</span>
              <span className="inline-block h-3 w-3 bg-current rotate-45" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
