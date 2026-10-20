'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface JohiaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showText?: boolean;
  text?: string;
  className?: string;
}

const SIZES = {
  sm: 'w-9 h-9',
  md: 'w-11 h-11',
  lg: 'w-16 h-16',
  hero: 'w-20 h-20 sm:w-24 sm:h-24',
};

const PIXEL_SIZES = {
  sm: 36,
  md: 44,
  lg: 64,
  hero: 96,
};

export function JohiaLogo({
  size = 'md',
  showText = true,
  text = 'Technicals',
  className,
}: JohiaLogoProps) {
  const dimension = PIXEL_SIZES[size];

  return (
    <div className={cn('inline-flex items-center gap-3 select-none', className)}>
      <div
        className={cn(
          'relative shrink-0 rounded-full overflow-hidden border-3 border-[#121212] shadow-[4px_4px_0px_#F5F5F0]',
          SIZES[size]
        )}
      >
        <Image
          src="/images/johia-logo.png"
          alt="Technicals Logo"
          width={dimension}
          height={dimension}
          priority
          unoptimized
          className="w-full h-full object-cover"
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={cn(
              'font-black tracking-tight text-[#F5F5F0]',
              size === 'hero'
                ? 'text-3xl sm:text-5xl'
                : size === 'lg'
                ? 'text-xl sm:text-2xl'
                : 'text-base sm:text-lg'
            )}
          >
            {text}
          </span>
        </div>
      )}
    </div>
  );
}
