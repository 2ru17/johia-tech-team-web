'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SignalFlowBadgeProps {
  code: string;
  label: string;
  tone?: 'cyan' | 'amber' | 'emerald' | 'red' | 'purple';
  pulse?: boolean;
  className?: string;
}

export function SignalFlowBadge({
  code,
  label,
  tone = 'cyan',
  pulse = false,
  className,
}: SignalFlowBadgeProps) {
  const toneStyles: Record<string, string> = {
    cyan: 'border-sky-500/30 bg-sky-500/10 text-sky-300',
    amber: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
    emerald: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
    red: 'border-red-500/30 bg-red-500/10 text-red-300',
    purple: 'border-purple-500/30 bg-purple-500/10 text-purple-300',
  };

  const dotStyles: Record<string, string> = {
    cyan: 'bg-sky-400',
    amber: 'bg-amber-400',
    emerald: 'bg-emerald-400',
    red: 'bg-red-400',
    purple: 'bg-purple-400',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-mono tracking-wider uppercase backdrop-blur-md',
        toneStyles[tone],
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        {pulse && (
          <span
            className={cn(
              'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
              dotStyles[tone]
            )}
          />
        )}
        <span
          className={cn(
            'relative inline-flex h-2 w-2 rounded-full',
            dotStyles[tone]
          )}
        />
      </span>
      <span className="font-semibold opacity-80">{code}</span>
      <span className="text-white/30">{'//'}</span>
      <span className="text-white/90">{label}</span>
    </div>
  );
}
