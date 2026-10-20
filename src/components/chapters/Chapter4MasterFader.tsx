'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll } from 'motion/react';
import { useTechBoothStore } from '@/store/useTechBoothStore';
import { cn } from '@/lib/utils';

interface GiantFaderSpec {
  id: string;
  code: string;
  title: string;
  sub: string;
  targetPct: number;
  targetDb: string;
  accentBg: string;
}

const GIANT_FADERS: GiantFaderSpec[] = [
  {
    id: 'vca-2',
    code: 'VCA 2 // MAIN VIEW GROUP',
    title: 'VOCALS',
    sub: 'MAIN MIX VIEW GROUP // 5 WL + 2 WIRED',
    targetPct: 84,
    targetDb: '+0.5 dB',
    accentBg: 'bg-[#22C55E]',
  },
  {
    id: 'vca-1',
    code: 'VCA 1 // MAIN VIEW GROUP',
    title: 'DRUMS',
    sub: 'MAIN MIX VIEW GROUP // 7-MIC PEARL KIT',
    targetPct: 76,
    targetDb: '-1.0 dB',
    accentBg: 'bg-[#F7B519]',
  },
  {
    id: 'vca-3',
    code: 'VCA 3 // MAIN VIEW GROUP',
    title: 'INSTRUMENTS',
    sub: 'MAIN MIX VIEW GROUP // KEYS + GTRS + BASS',
    targetPct: 68,
    targetDb: '-2.5 dB',
    accentBg: 'bg-[#38BDF8]',
  },
  {
    id: 'aux-5-6',
    code: 'A5-6 // SUBWOOFER MIX',
    title: 'SUBWOOFER',
    sub: 'A5-6 SUBWOOFER SPEAKER (L/R UNDER STAGE)',
    targetPct: 80,
    targetDb: '0.0 dB',
    accentBg: 'bg-[#F97316]',
  },
];

const ACTIVE_OUTPUT_ROUTING = [
  {
    code: 'MAIN MIX',
    shortTitle: 'HOUSE PA',
    tag: 'VCA VIEW GROUPS',
    name: 'IN-HOUSE SANCTUARY SPEAKERS',
    detail: 'All VCAs (Drums, Vocals, Instruments, House) routed from Main Mix View groups',
    badgeColor: 'bg-[#F7B519] text-[#121212]',
  },
  {
    code: 'A1-2',
    shortTitle: 'VOICE MON',
    tag: '2x WEDGES',
    name: 'STAGE VOCAL MONITORS',
    detail: 'Front stage vocal monitors (2x wedge mixes for singers)',
    badgeColor: 'bg-[#EF4444] text-[#F5F5F0]',
  },
  {
    code: 'A3-4',
    shortTitle: 'INST MON',
    tag: '2x WEDGES',
    name: 'INSTRUMENT MONITORS',
    detail: 'Outer stage band monitors (2x wedge mixes for musicians)',
    badgeColor: 'bg-[#F97316] text-[#121212]',
  },
  {
    code: 'A5-6',
    shortTitle: 'SUBWOOFERS',
    tag: 'UNDER STAGE',
    name: 'SUBWOOFER SPEAKERS',
    detail: 'Left & Right under-stage subwoofers for low-end thump',
    badgeColor: 'bg-[#EAB308] text-[#121212]',
  },
  {
    code: 'A10',
    shortTitle: 'GUITAR MON',
    tag: 'ACOUSTIC GTR',
    name: 'GUITAR MONITOR',
    detail: 'Dedicated stage monitor for acoustic guitar',
    badgeColor: 'bg-[#22C55E] text-[#121212]',
  },
  {
    code: 'A11',
    shortTitle: 'HALLWAY',
    tag: 'REAPER RET 1-2',
    name: 'OUTSIDE SANCTUARY FEED',
    detail: 'Routed from REAPER live mix (Return 1-2) to the hallway outside',
    badgeColor: 'bg-[#38BDF8] text-[#121212]',
  },
];

export function Chapter4MasterFader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const setActiveChapter = useTechBoothStore((s) => s.setActiveChapter);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [scrollVal, setScrollVal] = useState(0);
  const [boostedId, setBoostedId] = useState<string | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<string>('MAIN MIX');

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      setScrollVal(v);
    });
  }, [scrollYProgress]);

  const mixLocked = scrollVal > 0.6;
  const currentRoute =
    ACTIVE_OUTPUT_ROUTING.find((r) => r.code === selectedRoute) ??
    ACTIVE_OUTPUT_ROUTING[0];

  return (
    <section
      id="chapter-04"
      ref={containerRef}
      onMouseEnter={() => setActiveChapter('04-FOH')}
      className="relative h-[210vh] brutalist-grid-bg border-b-4 border-[#F5F5F0]"
    >
      <div className="sticky top-16 min-h-[calc(100vh-4rem)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col justify-between gap-4">
        {/* Top Row: Header + Status Stamp */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b-4 border-[#F5F5F0] pb-3">
          <div>
            <span className="inline-block bg-[#22C55E] text-[#121212] font-mono text-xs font-black uppercase px-3 py-1 border-3 border-[#121212] shadow-[4px_4px_0px_#F5F5F0]">
              LEVEL 03 // MACKIE MASTER FADER ROUTING &amp; VCAs
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-[#F5F5F0] mt-1.5 leading-none">
              MAIN MIX VIEW GROUPS.{' '}
              <span className="text-[#F7B519]">AUX A1-A11.</span>
            </h2>
          </div>

          <div
            className={cn(
              'font-mono text-xs font-black uppercase px-4 py-2 border-3 border-[#121212] shadow-[4px_4px_0px_#F5F5F0] self-start sm:self-end transition-colors',
              mixLocked
                ? 'bg-[#22C55E] text-[#121212]'
                : 'bg-[#F7B519] text-[#121212]'
            )}
          >
            {mixLocked ? '[STAGE CLEAR // FOH MIX ARMED]' : 'SCROLL TO RAISE FADERS'}
          </div>
        </div>

        {/* 6 Chunky Tactile Arcade Output Mix Selector Buttons */}
        <div className="bg-[#141414] border-4 border-[#F5F5F0] shadow-[8px_8px_0px_#F7B519] p-3.5 sm:p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#F5F5F0]/20 pb-2">
            <span className="font-mono text-[11px] font-black text-[#F7B519] uppercase">
              SELECT ACTIVE OUTPUT MIX TO INSPECT ROUTING:
            </span>
            <span className="bg-[#EF4444] text-[#F5F5F0] border-2 border-[#121212] font-mono text-[10px] font-black uppercase px-2 py-0.5">
              UNUSED: BLUE &quot;SUB&quot; 1-6 | MATRIX 1-6 | A7-8 | A9
            </span>
          </div>

          {/* 6 Big Emphasized Arcade Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {ACTIVE_OUTPUT_ROUTING.map((route) => {
              const isActive = selectedRoute === route.code;
              return (
                <button
                  key={route.code}
                  type="button"
                  onClick={() => setSelectedRoute(route.code)}
                  className={cn(
                    'border-3 p-3 flex flex-col justify-between text-left font-mono transition-all cursor-pointer',
                    isActive
                      ? `${route.badgeColor} border-[#121212] shadow-[5px_5px_0px_#F5F5F0] -translate-y-1`
                      : 'bg-[#1C1C1C] text-[#F5F5F0] border-[#F5F5F0]/40 hover:border-[#F7B519] hover:-translate-y-0.5'
                  )}
                >
                  <div className="flex items-center justify-between border-b-2 border-current pb-1 w-full">
                    <span className="text-[10px] font-black uppercase tracking-wider">
                      {route.code}
                    </span>
                    <span
                      className={cn(
                        'w-2 h-2 rounded-full',
                        isActive ? 'bg-[#121212]' : 'bg-[#F7B519]'
                      )}
                    />
                  </div>
                  <div className="text-base sm:text-lg font-black uppercase tracking-tight mt-1.5 leading-none">
                    {route.shortTitle}
                  </div>
                  <div className="text-[10px] font-bold opacity-85 uppercase mt-1 truncate">
                    {route.tag}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Route Deep-Dive Callout Box */}
          <div className="bg-[#121212] border-3 border-[#F7B519] p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
            <div className="flex items-center gap-2">
              <span className="bg-[#F7B519] text-[#121212] font-black px-2 py-0.5 text-xs uppercase">
                {currentRoute.code}
              </span>
              <span className="text-sm sm:text-base font-black text-[#F5F5F0] uppercase">
                {currentRoute.name}
              </span>
            </div>
            <div className="text-xs font-bold text-[#F5F5F0]/90">
              {currentRoute.detail}
            </div>
          </div>
        </div>

        {/* 4 Giant Scroll-Driven Fader Columns (VCA View Groups + A5-6 Subwoofer) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 my-auto">
          {GIANT_FADERS.map((fader, idx) => {
            const isBoosted = boostedId === fader.id;
            const factor = Math.min(
              1,
              Math.max(0.18, (scrollVal + 0.15) * 1.15)
            );
            const currentPct = isBoosted
              ? 94
              : Math.round(fader.targetPct * factor);
            const litSegments = Math.round((currentPct / 100) * 10);

            return (
              <button
                key={fader.id}
                type="button"
                onClick={() => setBoostedId(isBoosted ? null : fader.id)}
                className={cn(
                  'bg-[#181818] border-4 p-4 flex flex-col justify-between text-left transition-transform cursor-pointer',
                  isBoosted
                    ? 'border-[#F7B519] shadow-[8px_8px_0px_#F7B519] -translate-y-1'
                    : 'border-[#F5F5F0] shadow-[8px_8px_0px_#121212]'
                )}
              >
                {/* Top Strip Header */}
                <div className="w-full border-b-3 border-[#F5F5F0]/20 pb-2">
                  <div
                    className={cn(
                      'inline-block font-mono text-[10px] font-black uppercase px-2 py-0.5 border-2 border-[#121212]',
                      fader.accentBg,
                      'text-[#121212]'
                    )}
                  >
                    {fader.code}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black uppercase text-[#F5F5F0] tracking-tight mt-1.5 leading-none">
                    {fader.title}
                  </div>
                  <div className="font-mono text-[10px] font-bold text-[#F5F5F0]/75 uppercase mt-1 truncate">
                    {fader.sub}
                  </div>
                </div>

                {/* Center Physical Fader Track + Segmented LED Meter */}
                <div className="w-full flex items-center justify-center gap-6 py-3">
                  {/* Fader Slot & Sliding Brutalist Cap */}
                  <div className="relative h-40 sm:h-44 w-12 bg-[#0D0D0D] border-3 border-[#F5F5F0]/40 flex justify-center">
                    <div className="h-full w-1 bg-[#F5F5F0]/30" />
                    <motion.div
                      animate={{
                        bottom: `${Math.min(82, Math.max(6, currentPct))}%`,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 24,
                      }}
                      className={cn(
                        'absolute inset-x-1 h-8 border-3 border-[#121212] shadow-[3px_3px_0px_#121212] flex items-center justify-center',
                        fader.accentBg
                      )}
                    >
                      <div className="w-6 h-1 bg-[#121212]" />
                    </motion.div>
                  </div>

                  {/* 10-Segment Bouncing LED Meter */}
                  <div className="h-40 sm:h-44 flex flex-col-reverse justify-between gap-1">
                    {Array.from({ length: 10 }, (_, segIdx) => {
                      const isLit = segIdx < litSegments;
                      const segColor =
                        segIdx >= 8
                          ? 'bg-[#EF4444]'
                          : segIdx >= 6
                          ? 'bg-[#F7B519]'
                          : 'bg-[#22C55E]';
                      return (
                        <div
                          key={segIdx}
                          className={cn(
                            'w-5 h-3 border border-[#121212] transition-colors duration-150',
                            isLit ? segColor : 'bg-[#262626]'
                          )}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Bottom dB Readout Box */}
                <div className="w-full bg-[#121212] border-3 border-[#F5F5F0] px-3 py-2 flex items-center justify-between font-mono">
                  <span className="text-[10px] font-black text-[#F5F5F0]/60 uppercase">
                    {isBoosted ? 'SOLO BOOST' : `STRIP 0${idx + 1}`}
                  </span>
                  <span className="text-sm sm:text-base font-black text-[#F7B519] tabular-nums">
                    {isBoosted ? '+3.0 dB' : fader.targetDb}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Summary Strip */}
        <div className="bg-[#F5F5F0] text-[#121212] border-4 border-[#121212] shadow-[6px_6px_0px_#F7B519] px-4 py-2 flex flex-wrap items-center justify-between gap-3 font-mono text-xs font-black uppercase">
          <span>
            MAIN MIX = IN-HOUSE SPEAKERS (VCAs VIA VIEW GROUPS) // A11 HALLWAY = REAPER MIX (RETURN 1-2)
          </span>
          <span className="bg-[#121212] text-[#22C55E] px-2.5 py-1">
            A1-2 VOICE | A3-4 INST | A5-6 SUBS | A10 GTR
          </span>
        </div>
      </div>
    </section>
  );
}
