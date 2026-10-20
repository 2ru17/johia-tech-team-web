'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion, useScroll } from 'motion/react';
import { BatteryCharging, Radio, Zap } from 'lucide-react';
import { useTechBoothStore } from '@/store/useTechBoothStore';
import { cn } from '@/lib/utils';

const WirelessMics3DDynamic = dynamic(
  () =>
    import('@/components/canvas/WirelessMics3D').then((m) => m.WirelessMics3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[320px] bg-[#0B0D13] border-4 border-[#F5F5F0] flex items-center justify-center font-mono text-xs font-black text-[#F7B519] uppercase">
        LOADING 3D WIRELESS MICS...
      </div>
    ),
  }
);

export function Chapter2WirelessOps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadBattery = useTechBoothStore((s) => s.loadBattery);
  const setColorMatched = useTechBoothStore((s) => s.setColorMatched);
  const setRfSynced = useTechBoothStore((s) => s.setRfSynced);
  const batteriesLoaded = useTechBoothStore((s) => s.batteriesLoaded);
  const rfSynced = useTechBoothStore((s) => s.rfSynced);
  const setActiveChapter = useTechBoothStore((s) => s.setActiveChapter);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [scrollVal, setScrollVal] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      setScrollVal(v);
      if (v > 0.22) {
        loadBattery('shurePg58', true);
        loadBattery('adAct9090u', true);
      } else {
        loadBattery('shurePg58', false);
        loadBattery('adAct9090u', false);
      }
      if (v > 0.45) {
        setColorMatched(true);
      } else {
        setColorMatched(false);
      }
      if (v > 0.68) {
        setRfSynced(true);
      } else {
        setRfSynced(false);
      }
    });
  }, [scrollYProgress, loadBattery, setColorMatched, setRfSynced]);

  const handleInstantLock = () => {
    loadBattery('shurePg58', true);
    loadBattery('adAct9090u', true);
    setColorMatched(true);
    setRfSynced(true);
    setScrollVal(0.95);
  };

  const bothLoaded = batteriesLoaded.shurePg58 && batteriesLoaded.adAct9090u;

  return (
    <section
      id="chapter-02"
      ref={containerRef}
      onMouseEnter={() => setActiveChapter('02-RF')}
      className="relative h-[175vh] brutalist-grid-bg border-b-4 border-[#F5F5F0]"
    >
      <div className="sticky top-16 h-[calc(100vh-4rem)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col justify-between gap-4">
        {/* Top Bar: Level Tag + Giant Headline + Achievement Stamp */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-block bg-[#38BDF8] text-[#121212] font-mono text-xs font-black uppercase px-3 py-1 border-3 border-[#121212] shadow-[4px_4px_0px_#F5F5F0]">
              LEVEL 02A // WIRELESS &amp; ENELOOP OPS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-[#F5F5F0] mt-2 leading-none">
              LOAD ENELOOP PROS.{' '}
              <span className="text-[#F7B519]">LOCK 809.5 MHz.</span>
            </h2>
          </div>

          <AnimatePresence>
            {rfSynced && (
              <motion.div
                initial={{ scale: 0.3, rotate: 10, opacity: 0 }}
                animate={{ scale: 1, rotate: 2, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 420, damping: 18 }}
                className="bg-[#22C55E] text-[#121212] font-mono text-xs sm:text-sm font-black uppercase px-4 py-2 border-4 border-[#121212] shadow-[6px_6px_0px_#F5F5F0]"
              >
                [UNLOCKED: RF 809.5 MHz LOCKED]
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Center Main Grid: Left 3D Mics | Right Scroll-Animated Battery Slide & Receiver Lock */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto">
          {/* Left 6 Cols: 3D Rotating Handheld Mics + Color Sticker Tags */}
          <div className="lg:col-span-6 space-y-3">
            <div className="border-4 border-[#F5F5F0] shadow-[8px_8px_0px_#F7B519] bg-[#090B10] overflow-hidden">
              <WirelessMics3DDynamic />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
              <div className="bg-[#FACC15] text-[#121212] border-4 border-[#121212] shadow-[5px_5px_0px_#F5F5F0] p-3">
                <div className="text-[10px] font-black uppercase">
                  FAMILY 01 // 2 WIRELESS MICS
                </div>
                <div className="text-base sm:text-lg font-black uppercase leading-tight mt-0.5">
                  SHURE PG58: WHITE &amp; YELLOW
                </div>
                <div className="flex items-center gap-1.5 mt-2 text-[10px] font-black">
                  <span className="bg-[#F8FAFC] text-[#121212] border-2 border-[#121212] px-2 py-0.5">
                    WHITE
                  </span>
                  <span className="bg-[#FEF08A] text-[#121212] border-2 border-[#121212] px-2 py-0.5">
                    YELLOW
                  </span>
                </div>
              </div>
              <div className="bg-[#F97316] text-[#121212] border-4 border-[#121212] shadow-[5px_5px_0px_#F5F5F0] p-3">
                <div className="text-[10px] font-black uppercase">
                  FAMILY 02 // 3 WIRELESS MICS
                </div>
                <div className="text-base sm:text-lg font-black uppercase leading-tight mt-0.5">
                  AD ACT-9090U: ORANGE, BLUE, PINK
                </div>
                <div className="flex items-center gap-1.5 mt-2 text-[10px] font-black">
                  <span className="bg-[#FB923C] text-[#121212] border-2 border-[#121212] px-2 py-0.5">
                    ORANGE
                  </span>
                  <span className="bg-[#38BDF8] text-[#121212] border-2 border-[#121212] px-2 py-0.5">
                    BLUE
                  </span>
                  <span className="bg-[#EC4899] text-[#F5F5F0] border-2 border-[#121212] px-2 py-0.5">
                    PINK
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right 6 Cols: Scroll-Animated Battery Insertion + AD ACT-9090U 809.500 MHz Lock */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Step 1: Panasonic BQ-CC51C Charger & Sliding Black Eneloop Pro Cells */}
            <div
              className={cn(
                'border-4 p-5 transition-all',
                bothLoaded
                  ? 'bg-[#22C55E] text-[#121212] border-[#121212] shadow-[8px_8px_0px_#F5F5F0]'
                  : 'bg-[#1A1A1A] text-[#F5F5F0] border-[#F5F5F0] shadow-[8px_8px_0px_#F7B519]'
              )}
            >
              <div className="flex items-center justify-between font-mono text-xs font-black uppercase border-b-3 border-current pb-2">
                <span>PANASONIC BQ-CC51C // AA DOCK</span>
                <BatteryCharging className="w-5 h-5 stroke-[2.5]" />
              </div>

              <div className="grid grid-cols-4 gap-3 mt-4">
                {[
                  { label: 'ENELOOP', cap: 'WHITE', pro: false },
                  { label: 'ENELOOP', cap: 'WHITE', pro: false },
                  { label: 'PRO AA #1', cap: 'SHURE PG58', pro: true },
                  { label: 'PRO AA #2', cap: 'AD ACT-9090U', pro: true },
                ].map((cell, idx) => (
                  <motion.div
                    key={cell.label + idx}
                    animate={{
                      y: cell.pro && bothLoaded ? -12 : 0,
                      scale: cell.pro && bothLoaded ? 1.05 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 360, damping: 20 }}
                    className={cn(
                      'border-3 border-[#121212] p-2.5 text-center font-mono',
                      cell.pro
                        ? 'bg-[#121212] text-[#F7B519]'
                        : 'bg-[#F5F5F0] text-[#121212]'
                    )}
                  >
                    <div className="text-[10px] font-black uppercase">
                      {cell.label}
                    </div>
                    <div className="text-[9px] font-bold mt-1 uppercase">
                      {cell.pro && bothLoaded ? 'LOADED!' : cell.cap}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Step 2: AD ACT-9090U UHF Receiver Frequency Lock */}
            <div
              className={cn(
                'border-4 p-5 transition-all',
                rfSynced
                  ? 'bg-[#F7B519] text-[#121212] border-[#121212] shadow-[8px_8px_0px_#F5F5F0]'
                  : 'bg-[#1A1A1A] text-[#F5F5F0] border-[#F5F5F0] shadow-[8px_8px_0px_#38BDF8]'
              )}
            >
              <div className="flex items-center justify-between font-mono text-xs font-black uppercase border-b-3 border-current pb-2">
                <span>AD ACT-9090U UHF RECEIVER</span>
                <Radio className="w-5 h-5 stroke-[2.5]" />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                <div>
                  <div className="font-mono text-xs font-black uppercase opacity-80">
                    CARRIER FREQUENCY
                  </div>
                  <div className="font-mono text-4xl sm:text-5xl font-black tracking-tighter tabular-nums">
                    809.500 MHz
                  </div>
                </div>

                {/* 1 Giant Tactile Toy Button */}
                <button
                  type="button"
                  onClick={handleInstantLock}
                  className="bg-[#121212] hover:bg-[#27272A] text-[#F7B519] font-mono text-xs sm:text-sm font-black uppercase px-5 py-3.5 border-3 border-[#F5F5F0] shadow-[5px_5px_0px_#38BDF8] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer flex items-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>{rfSynced ? 'RF LOCKED!' : 'ACT SCAN 809.5 MHz'}</span>
                </button>
              </div>
            </div>

            {/* Scroll Progress Indicator Strip */}
            <div className="bg-[#121212] border-3 border-[#F5F5F0] p-2.5 flex items-center justify-between font-mono text-xs font-black uppercase">
              <span className="text-[#F7B519]">
                AUTO-SCROLL PROGRESS: {Math.round(scrollVal * 100)}%
              </span>
              <span className="text-[#22C55E]">
                {rfSynced ? 'STAGE CLEAR -> SCROLL DOWN' : 'KEEP SCROLLING...'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
