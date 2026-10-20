'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'motion/react';
import { AlertTriangle, ArrowDown, Power, Zap } from 'lucide-react';
import { useTechBoothStore } from '@/store/useTechBoothStore';
import { cn } from '@/lib/utils';

const RACK_UNITS = [
  {
    step: '01',
    name: 'YK-110 POWER CONTROLLER',
    role: 'TURN ON FIRST! -> POWERS MIXERS & RECEIVERS',
    tag: 'AC MASTER',
    threshold: 0.12,
    isAmp: false,
  },
  {
    step: '01A',
    name: 'MACKIE DL32R (32-CH MIXER)',
    role: 'AUTO-POWERED BY YK-110 CONTROLLER',
    tag: '32 XLR IN',
    threshold: 0.16,
    isAmp: false,
  },
  {
    step: '01B',
    name: 'SHURE + MIPRO + AD ACT-9090U',
    role: 'WIRELESS RECEIVERS // AUTO-POWERED BY YK-110',
    tag: '809.500 MHz',
    threshold: 0.2,
    isAmp: false,
  },
  {
    step: '02',
    name: 'DOD 15-BAND GRAPHIC EQ (+ dbx 234XL)',
    role: 'TURN ON SECOND! // MONITOR EQ & CROSSOVER',
    tag: '25Hz-16kHz',
    threshold: 0.45,
    isAmp: false,
  },
  {
    step: '03A',
    name: 'CROWN SS-800 ("Subs Amp.")',
    role: 'TURN ON LAST! // LEFT & RIGHT UNDER-STAGE SUBS',
    tag: 'SUBS AMP.',
    threshold: 0.7,
    isAmp: true,
  },
  {
    step: '03B',
    name: 'ACE LX-20 AMP & MAIN SPEAKERS',
    role: 'TURN ON LAST! // POWER AMPS & MAIN SPEAKERS',
    tag: 'AMPS & MAINS',
    threshold: 0.78,
    isAmp: true,
  },
];

export function Chapter3AudioRack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rackPower = useTechBoothStore((s) => s.rackPower);
  const powerAllSafeSequence = useTechBoothStore((s) => s.powerAllSafeSequence);
  const toggleRackUnit = useTechBoothStore((s) => s.toggleRackUnit);
  const clearPopWarning = useTechBoothStore((s) => s.clearPopWarning);
  const setActiveChapter = useTechBoothStore((s) => s.setActiveChapter);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [scrollVal, setScrollVal] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      setScrollVal(v);
      if (v > 0.82) {
        powerAllSafeSequence();
      }
    });
  }, [scrollYProgress, powerAllSafeSequence]);

  const handleTestSubPop = () => {
    // Deliberately trigger the pop warning for live presentation demo
    useTechBoothStore.setState((st) => ({
      rackPower: {
        ...st.rackPower,
        dl32rOn: false,
        crownSubsOn: false,
        popWarning: null,
      },
    }));
    toggleRackUnit('crownSubsOn');
  };

  const handleSafePowerAll = () => {
    clearPopWarning();
    powerAllSafeSequence();
    setScrollVal(0.95);
  };

  const allCascaded = scrollVal > 0.82 || (rackPower.dl32rOn && rackPower.crownSubsOn && !rackPower.popWarning);

  return (
    <section
      id="chapter-03"
      ref={containerRef}
      onMouseEnter={() => setActiveChapter('03-RACK')}
      className="relative h-[195vh] brutalist-grid-bg border-b-4 border-[#F5F5F0]"
    >
      <div className="sticky top-16 h-[calc(100vh-4rem)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col justify-between gap-3">
        {/* Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="inline-block bg-[#F7B519] text-[#121212] font-mono text-xs font-black uppercase px-3 py-1 border-3 border-[#121212] shadow-[4px_4px_0px_#F5F5F0]">
              LEVEL 02B // 19-INCH POWER RACK CASCADE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-[#F5F5F0] mt-1.5 leading-none">
              POWER CONTROLLER FIRST.{' '}
              <span className="bg-[#EF4444] text-[#F5F5F0] px-2 border-3 border-[#121212]">
                AMPS &amp; MAINS LAST!
              </span>
            </h2>
          </div>

          {/* Tactile Toy Buttons for Live Pitch */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleTestSubPop}
              className="bg-[#EF4444] hover:bg-red-500 text-[#F5F5F0] font-mono text-xs font-black uppercase px-4 py-2.5 border-3 border-[#121212] shadow-[4px_4px_0px_#F5F5F0] cursor-pointer flex items-center gap-1.5"
            >
              <AlertTriangle className="w-4 h-4 stroke-[2.5]" />
              <span>TEST SUB POP! (AMPS FIRST)</span>
            </button>
            <button
              type="button"
              onClick={handleSafePowerAll}
              className="bg-[#22C55E] hover:bg-emerald-400 text-[#121212] font-mono text-xs font-black uppercase px-4 py-2.5 border-3 border-[#121212] shadow-[4px_4px_0px_#F5F5F0] cursor-pointer flex items-center gap-1.5"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Safe Power-On All</span>
            </button>
          </div>
        </div>

        {/* Transient Pop Alert Banner (When Triggered) */}
        {rackPower.popWarning && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, x: [-12, 12, -8, 8, -4, 4, 0] }}
            transition={{ duration: 0.4 }}
            role="alert"
            className="bg-[#EF4444] text-[#F5F5F0] border-4 border-[#121212] shadow-[8px_8px_0px_#F7B519] p-3.5 flex items-center justify-between gap-4"
          >
            <div className="font-mono text-xs sm:text-sm font-black uppercase">
              SPEAKER TRANSIENT PROTECTION TRIGGERED // ALWAYS TURN ON YK-110 POWER CONTROLLER (MIXERS &amp; RECEIVERS) -&gt; DOD EQ -&gt; AMPS &amp; MAIN SPEAKERS LAST!
            </div>
            <button
              type="button"
              onClick={clearPopWarning}
              className="bg-[#121212] text-[#F7B519] font-mono text-xs font-black uppercase px-3 py-1.5 border-2 border-[#F5F5F0] shrink-0 cursor-pointer"
            >
              RESET
            </button>
          </motion.div>
        )}

        {/* Main Scroll-Triggered Cascade Stack */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-5 items-center my-auto">
          {/* Left 8 Cols: Rack Units Lighting Up in Exact Sequence on Scroll */}
          <div className="lg:col-span-8 space-y-2">
            {RACK_UNITS.map((u) => {
              const isPowered = scrollVal >= u.threshold || allCascaded;
              return (
                <motion.div
                  key={u.step}
                  animate={{
                    x: isPowered ? 6 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                  className={cn(
                    'border-3 px-4 py-2.5 flex items-center justify-between gap-3 transition-colors',
                    isPowered
                      ? u.isAmp
                        ? 'bg-[#F7B519] text-[#121212] border-[#121212] shadow-[5px_5px_0px_#F5F5F0]'
                        : 'bg-[#22C55E] text-[#121212] border-[#121212] shadow-[5px_5px_0px_#F5F5F0]'
                      : 'bg-[#1A1A1A] text-[#F5F5F0]/60 border-[#F5F5F0]/30'
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="bg-[#121212] text-[#F7B519] font-mono text-xs font-black px-2 py-1">
                      {u.step}
                    </span>
                    <div className="truncate">
                      <div className="font-black text-sm sm:text-base uppercase tracking-tight truncate">
                        {u.name}
                      </div>
                      <div className="font-mono text-[10px] font-bold uppercase opacity-85 truncate">
                        {u.role}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {u.step === '03A' && (
                      <span className="bg-[#F5F5F0] text-[#121212] border-2 border-[#121212] font-mono text-[10px] font-black px-2 py-0.5 -rotate-2">
                        &quot;Subs Amp.&quot;
                      </span>
                    )}
                    <span
                      className={cn(
                        'font-mono text-xs font-black uppercase px-2.5 py-1 border-2 border-[#121212]',
                        isPowered
                          ? 'bg-[#121212] text-[#22C55E]'
                          : 'bg-[#121212] text-slate-500'
                      )}
                    >
                      {isPowered ? 'ON' : 'OFF'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right 4 Cols: Giant Golden Power Rule Graphic & Achievement Stamp */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-[#F5F5F0] text-[#121212] border-4 border-[#121212] shadow-[8px_8px_0px_#F7B519] p-5">
              <div className="font-mono text-xs font-black uppercase border-b-3 border-[#121212] pb-2 flex items-center justify-between">
                <span>TECHNICALS POWER ORDER</span>
                <Power className="w-4 h-4 stroke-[3]" />
              </div>

              <div className="space-y-2.5 mt-4">
                <div className="bg-[#22C55E] border-3 border-[#121212] p-2.5 flex items-center gap-2.5">
                  <ArrowDown className="w-5 h-5 stroke-[3] shrink-0" />
                  <div>
                    <div className="font-mono text-[10px] font-black uppercase">
                      STEP 1 // FIRST
                    </div>
                    <div className="text-sm font-black uppercase leading-tight">
                      POWER CONTROLLER (POWERS MIXERS &amp; RECEIVERS)
                    </div>
                  </div>
                </div>

                <div className="bg-[#38BDF8] border-3 border-[#121212] p-2.5">
                  <div className="font-mono text-[10px] font-black uppercase">
                    STEP 2 // SECOND
                  </div>
                  <div className="text-sm font-black uppercase leading-tight mt-0.5">
                    TURN ON DOD GRAPHIC EQ
                  </div>
                </div>

                <div className="bg-[#F7B519] border-3 border-[#121212] p-2.5">
                  <div className="font-mono text-[10px] font-black uppercase">
                    STEP 3 // LAST
                  </div>
                  <div className="text-sm font-black uppercase leading-tight mt-0.5">
                    AMPS &amp; MAIN SPEAKERS LAST = ZERO POP!
                  </div>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {allCascaded && (
                <motion.div
                  initial={{ scale: 0.4, rotate: -8, opacity: 0 }}
                  animate={{ scale: 1, rotate: -2, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 18 }}
                  className="bg-[#22C55E] text-[#121212] border-4 border-[#121212] shadow-[6px_6px_0px_#F5F5F0] p-4 text-center font-mono text-sm font-black uppercase"
                >
                  [GOLDEN POWER RULE VERIFIED // SUBS ARMED]
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
