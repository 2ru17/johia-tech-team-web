'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'motion/react';
import { ArrowRight, ArrowRightLeft, Radio, Tv } from 'lucide-react';
import { useTechBoothStore } from '@/store/useTechBoothStore';
import { cn } from '@/lib/utils';

const LIVE_SLIDES = [
  {
    index: 0,
    tag: 'VERSE 14 // PREVIEW',
    ref: 'MARK 5:1-20',
    verse:
      '14 The herdsmen (tending the pigs) ran away and reported it in the city and in the country.',
  },
  {
    index: 1,
    tag: 'VERSE 15 // ON AIR',
    ref: 'MARK 5:1-20',
    verse:
      '15 They came to Jesus and saw the man sitting there, dressed and in his right mind.',
  },
];

export function Chapter7ObsBroadcast() {
  const containerRef = useRef<HTMLDivElement>(null);
  const obsState = useTechBoothStore((s) => s.obsState);
  const triggerObsTransition = useTechBoothStore((s) => s.triggerObsTransition);
  const setActiveChapter = useTechBoothStore((s) => s.setActiveChapter);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [scrollVal, setScrollVal] = useState(0);
  const [pushedLive, setPushedLive] = useState(false);

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      setScrollVal(v);
      if (v > 0.52) {
        setPushedLive(true);
      } else {
        setPushedLive(false);
      }
    });
  }, [scrollYProgress]);

  const handleManualCut = () => {
    triggerObsTransition();
    setPushedLive((p) => !p);
  };

  const activeProgram = pushedLive ? LIVE_SLIDES[1] : LIVE_SLIDES[0];
  const activePreview = pushedLive ? LIVE_SLIDES[0] : LIVE_SLIDES[1];

  return (
    <section
      id="chapter-07"
      ref={containerRef}
      onMouseEnter={() => setActiveChapter('07-OBS')}
      className="relative h-[180vh] brutalist-grid-bg border-b-4 border-[#F5F5F0]"
    >
      <div className="sticky top-16 h-[calc(100vh-4rem)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col justify-between gap-4">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-block bg-[#22C55E] text-[#121212] font-mono text-xs font-black uppercase px-3 py-1 border-3 border-[#121212] shadow-[4px_4px_0px_#F5F5F0]">
              LEVEL 05A // REAPER TO OBS STUDIO MODE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-[#F5F5F0] mt-1.5 leading-none">
              QUEUE SLIDE.{' '}
              <span className="text-[#F7B519]">PUSH TO LIVE.</span>
            </h2>
          </div>

          <AnimatePresence>
            {pushedLive && (
              <motion.div
                initial={{ scale: 0.4, rotate: -8, opacity: 0 }}
                animate={{ scale: 1, rotate: -2, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 420, damping: 18 }}
                className="bg-[#EF4444] text-[#F5F5F0] font-mono text-xs sm:text-sm font-black uppercase px-4 py-2 border-4 border-[#121212] shadow-[6px_6px_0px_#F5F5F0] flex items-center gap-2"
              >
                <Radio className="w-4 h-4 animate-pulse" />
                <span>[UNLOCKED: LIVE ON AIR // 1080p60]</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="bg-[#F7B519] text-[#121212] border-4 border-[#121212] shadow-[6px_6px_0px_#F5F5F0] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-black uppercase">
            <span>REAPER v7.41 (-13.9 LUFS)</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
            <span>REASTREAM UDP PIPE</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
            <span>OBS AUDIO MIXER</span>
          </div>

          <div className="flex items-end gap-1 h-6 bg-[#121212] px-3 py-1 border-2 border-[#121212]">
            {[65, 95, 80, 100, 75, 90, 85, 60, 95, 70, 88, 92].map((h, i) => (
              <motion.div
                key={i}
                animate={{
                  height: [`${Math.max(25, h - 35)}%`, `${h}%`, `${Math.max(30, h - 25)}%`],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.55 + (i % 3) * 0.15,
                }}
                className={cn(
                  'w-2',
                  i > 9 ? 'bg-[#F7B519]' : 'bg-[#22C55E]'
                )}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 items-center my-auto">
          <div className="lg:col-span-5 bg-[#181818] border-4 border-[#F5F5F0] shadow-[8px_8px_0px_#121212] overflow-hidden">
            <div className="bg-[#22C55E] text-[#121212] px-3.5 py-2 font-mono text-xs font-black uppercase flex items-center justify-between border-b-4 border-[#121212]">
              <span>PREVIEW // NEXT UP</span>
              <span>{activePreview.tag}</span>
            </div>

            <div className="p-4 grid grid-cols-12 gap-3 items-center min-h-[210px] bg-[#0E1017]">
              <div className="col-span-5 h-40 bg-[#121212] border-3 border-[#F5F5F0] flex flex-col items-center justify-end p-2">
                <svg viewBox="0 0 100 100" className="w-20 h-24">
                  <circle cx="50" cy="30" r="16" fill="#F7B519" />
                  <path d="M18 95 C18 62, 82 62, 82 95 Z" fill="#F5F5F0" />
                </svg>
                <span className="font-mono text-[9px] font-black text-[#F7B519] uppercase">
                  CAM 01 // PULPIT
                </span>
              </div>

              <div className="col-span-7 h-40 bg-[#F5F5F0] text-[#121212] border-3 border-[#121212] p-3 flex flex-col justify-between">
                <span className="bg-[#121212] text-[#F7B519] font-mono text-[10px] font-black uppercase px-2 py-0.5 self-start">
                  {activePreview.ref}
                </span>
                <p className="font-black text-xs sm:text-sm uppercase leading-snug">
                  &quot;{activePreview.verse}&quot;
                </p>
                <span className="font-mono text-[9px] font-bold uppercase opacity-70">
                  READY IN PREVIEW
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 flex flex-col items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleManualCut}
              className="w-full bg-[#38BDF8] hover:bg-sky-300 text-[#121212] border-4 border-[#121212] shadow-[5px_5px_0px_#F5F5F0] py-4 px-2 font-mono text-xs font-black uppercase flex flex-col items-center gap-1.5 cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
            >
              <ArrowRightLeft className="w-5 h-5 stroke-[3]" />
              <span>Transition</span>
            </button>
            <span className="font-mono text-[10px] font-black text-[#F7B519] uppercase">
              {Math.round(scrollVal * 100)}% SYNC
            </span>
          </div>

          <motion.div
            key={activeProgram.index}
            initial={{ scale: 0.96 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 420, damping: 22 }}
            className="lg:col-span-5 bg-[#181818] border-4 border-[#F7B519] shadow-[8px_8px_0px_#EF4444] overflow-hidden"
          >
            <div className="bg-[#EF4444] text-[#F5F5F0] px-3.5 py-2 font-mono text-xs font-black uppercase flex items-center justify-between border-b-4 border-[#121212]">
              <span className="flex items-center gap-1.5">
                <Tv className="w-4 h-4" />
                <span>PROGRAM [LIVE ON AIR]</span>
              </span>
              <span>{obsState.isStreaming ? 'STREAMING' : 'STANDBY'}</span>
            </div>

            <div className="p-4 grid grid-cols-12 gap-3 items-center min-h-[210px] bg-[#0E1017]">
              <div className="col-span-5 h-40 bg-[#121212] border-3 border-[#F7B519] flex flex-col items-center justify-end p-2">
                <svg viewBox="0 0 100 100" className="w-20 h-24">
                  <circle cx="50" cy="30" r="16" fill="#F7B519" />
                  <path d="M18 95 C18 62, 82 62, 82 95 Z" fill="#F5F5F0" />
                </svg>
                <span className="font-mono text-[9px] font-black text-[#22C55E] uppercase">
                  LIVE FEED
                </span>
              </div>

              <div className="col-span-7 h-40 bg-[#F7B519] text-[#121212] border-3 border-[#121212] p-3 flex flex-col justify-between">
                <span className="bg-[#121212] text-[#F5F5F0] font-mono text-[10px] font-black uppercase px-2 py-0.5 self-start">
                  {activeProgram.ref}
                </span>
                <p className="font-black text-xs sm:text-sm uppercase leading-snug">
                  &quot;{activeProgram.verse}&quot;
                </p>
                <span className="font-mono text-[9px] font-black uppercase">
                  BROADCASTING TO FACEBOOK &amp; YOUTUBE
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
