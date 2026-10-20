'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion, useScroll } from 'motion/react';
import { ArrowDown, Disc3, Mic2, Monitor, Speaker, Volume2 } from 'lucide-react';
import { JohiaLogo } from '@/components/hud/JohiaLogo';
import { useTechBoothStore } from '@/store/useTechBoothStore';
import { cn } from '@/lib/utils';

const Stage3DSceneDynamic = dynamic(
  () => import('@/components/canvas/Stage3DScene').then((m) => m.Stage3DScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[380px] bg-[#0B0D13] border-4 border-[#F5F5F0] shadow-[8px_8px_0px_#F7B519] flex items-center justify-center font-mono text-sm font-black text-[#F7B519] uppercase">
        LOADING TECHNICALS 3D STAGE...
      </div>
    ),
  }
);

const STAGE_ZONES = [
  {
    id: 'zone-wide',
    badge: 'CAMERA 01 // WIDE SANCTUARY',
    title: 'SANCTUARY STAGE',
    sticker: '5 WIRELESS MICS | 2 WIRED MICS | UNDER-STAGE SUBS',
    color: 'bg-[#F7B519] text-[#121212]',
    icon: Disc3,
  },
  {
    id: 'zone-drums',
    badge: 'CAMERA 02 // STAGE LEFT RISER',
    title: 'PEARL DRUMS & BASS RIG',
    sticker: '7-MIC DRUM KIT | BASS AMP | 4-STRING BASS',
    color: 'bg-[#38BDF8] text-[#121212]',
    icon: Mic2,
  },
  {
    id: 'zone-subs',
    badge: 'CAMERA 03 // STAGE FRONT & UNDER-STAGE',
    title: '4 WEDGES & L/R SUBS',
    sticker: '2 VOICE MONITORS | 2 INSTRUMENT MONITORS | L/R SUBS',
    color: 'bg-[#22C55E] text-[#121212]',
    icon: Speaker,
  },
  {
    id: 'zone-inst',
    badge: 'CAMERA 04 // STAGE RIGHT',
    title: 'KEYS & 3 GUITARS (DI)',
    sticker: 'KEYS X-STAND | 2 ELECTRIC GUITARS | 1 ACOUSTIC GUITAR',
    color: 'bg-[#F5F5F0] text-[#121212]',
    icon: Volume2,
  },
  {
    id: 'zone-booth',
    badge: 'CAMERA 05 // FOH TECH BOOTH',
    title: 'TECH BOOTH (2 PCS)',
    sticker: 'AUDIO MIX PC | OBS BROADCAST PC | OPERATOR STATION',
    color: 'bg-[#F7B519] text-[#121212]',
    icon: Monitor,
  },
];

export function Chapter1HeroStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const setActiveChapter = useTechBoothStore((s) => s.setActiveChapter);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      setProgress(v);
    });
  }, [scrollYProgress]);

  const handleZoneClick = (idx: number) => {
    setProgress(idx * 0.2 + 0.02);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const totalScrollable = Math.max(0, containerRef.current.offsetHeight - window.innerHeight);
      const targetScroll = scrollTop + rect.top + (idx * 0.2 + 0.02) * totalScrollable;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  const activeZoneIdx =
    progress < 0.2 ? 0 : progress < 0.4 ? 1 : progress < 0.6 ? 2 : progress < 0.8 ? 3 : 4;
  const activeZone = STAGE_ZONES[activeZoneIdx] ?? STAGE_ZONES[0];
  const ZoneIcon = activeZone.icon;
  const stageUnlocked = progress > 0.82;

  return (
    <section
      id="chapter-01"
      onMouseEnter={() => setActiveChapter('01-STAGE')}
      className="relative pt-16 brutalist-grid-bg"
    >
      {/* TOP BRUTALIST HERO PITCH SCREEN */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 border-b-4 border-[#F5F5F0]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-5">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <JohiaLogo size="hero" />
            </motion.div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-[#F5F5F0] leading-[0.92]">
              RUN THE{' '}
              <span className="inline-block bg-[#F7B519] text-[#121212] px-3 py-0.5 border-4 border-[#121212] shadow-[6px_6px_0px_#F5F5F0] -rotate-1">
                SUNDAY
              </span>{' '}
              SHOW.
            </h1>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="bg-[#F5F5F0] text-[#121212] font-mono text-xs sm:text-sm font-black uppercase px-3 py-1.5 border-3 border-[#121212] shadow-[4px_4px_0px_#F7B519]">
                SOUND // LIGHTS // BROADCAST
              </span>
              <span className="bg-[#1E1E1E] text-[#F7B519] font-mono text-xs sm:text-sm font-black uppercase px-3 py-1.5 border-3 border-[#F7B519]">
                NO EXPERIENCE NEEDED
              </span>
            </div>
          </div>

          {/* Right Arcade Scroll Prompt Box */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="bg-[#F7B519] text-[#121212] border-4 border-[#121212] shadow-[8px_8px_0px_#F5F5F0] p-5 sm:p-6 max-w-sm shrink-0"
          >
            <div className="font-mono text-xs font-black uppercase tracking-widest border-b-3 border-[#121212] pb-2">
              PLAYER 01 // PRESS START
            </div>
            <div className="text-2xl sm:text-3xl font-black uppercase tracking-tight mt-3 leading-none">
              SCROLL TO POWER UP THE BOOTH
            </div>
            <div className="mt-4 inline-flex items-center gap-2 bg-[#121212] text-[#F7B519] font-mono text-xs font-black uppercase px-3 py-1.5">
              <ArrowDown className="w-4 h-4 animate-bounce" />
              <span>5 LEVELS TO CLEAR</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* PINNED 220VH SCROLL-DRIVEN 3D STAGE FLY-THROUGH */}
      <div ref={containerRef} className="relative h-[220vh]">
        <div className="sticky top-16 h-[calc(100vh-4rem)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col justify-between gap-4">
          {/* Top Level Bar + Pop-in Achievement Stamp */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="bg-[#F7B519] text-[#121212] font-mono text-xs sm:text-sm font-black uppercase px-3 py-1 border-3 border-[#121212] shadow-[4px_4px_0px_#F5F5F0]">
                LEVEL 01 // THE SANCTUARY STAGE
              </span>
              <span className="hidden sm:inline-block font-mono text-xs font-bold text-[#F5F5F0]/80 uppercase">
                SCROLL TO FLY CAMERA ACROSS 5 ZONES
              </span>
            </div>

            <AnimatePresence>
              {stageUnlocked && (
                <motion.div
                  initial={{ scale: 0.4, rotate: -12, opacity: 0 }}
                  animate={{ scale: 1, rotate: -2, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 18 }}
                  className="bg-[#22C55E] text-[#121212] font-mono text-xs sm:text-sm font-black uppercase px-4 py-1.5 border-3 border-[#121212] shadow-[5px_5px_0px_#F5F5F0]"
                >
                  [UNLOCKED: STAGE MICS PATCHED]
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Center 3D Stage Canvas + Floating Comic Callout Sticker */}
          <div className="relative flex-1 min-h-[340px]">
            <Stage3DSceneDynamic
              scrollProgress={progress}
              activeZoneIdx={activeZoneIdx}
            />

            {/* Animated Neo-Brutalist Comic Callout Overlay */}
            <div className="pointer-events-none absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeZone.id}
                  initial={{ x: -30, y: 20, opacity: 0, scale: 0.92 }}
                  animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  exit={{ x: 30, opacity: 0, scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                  className={cn(
                    'border-4 border-[#121212] shadow-[8px_8px_0px_#121212] p-4',
                    activeZone.color
                  )}
                >
                  <div className="flex items-center justify-between gap-2 font-mono text-[11px] font-black uppercase border-b-2 border-[#121212] pb-1.5">
                    <span>{activeZone.badge}</span>
                    <ZoneIcon className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black uppercase tracking-tight mt-2 leading-none">
                    {activeZone.title}
                  </div>
                  <div className="mt-2 inline-block bg-[#121212] text-[#F5F5F0] font-mono text-[11px] font-bold uppercase px-2.5 py-1">
                    {activeZone.sticker}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
            {STAGE_ZONES.map((z, idx) => {
              const isCurrent = idx === activeZoneIdx;
              const isDone = idx < activeZoneIdx;
              return (
                <button
                  key={z.id}
                  type="button"
                  onClick={() => handleZoneClick(idx)}
                  className={cn(
                    'border-3 p-2.5 text-left font-mono transition-all cursor-pointer',
                    isCurrent
                      ? 'bg-[#F7B519] text-[#121212] border-[#121212] shadow-[4px_4px_0px_#F5F5F0] -translate-y-1'
                      : isDone
                      ? 'bg-[#1E1E1E] text-[#22C55E] border-[#22C55E]'
                      : 'bg-[#181818] text-[#F5F5F0]/60 border-[#F5F5F0]/30'
                  )}
                >
                  <div className="text-[10px] font-black uppercase">
                    {`0${idx + 1} // ${isDone ? 'CLEARED' : isCurrent ? 'ACTIVE' : 'LOCKED'}`}
                  </div>
                  <div className="text-xs sm:text-sm font-black uppercase truncate mt-0.5">
                    {z.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
