'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { ArrowDownRight } from 'lucide-react';

const LEVEL_META = [
  { level: 'LEVEL 01', title: 'THE STAGE', xp: 20 },
  { level: 'LEVEL 02', title: 'RF & POWER', xp: 40 },
  { level: 'LEVEL 03', title: 'SOUND MIX', xp: 60 },
  { level: 'LEVEL 04', title: 'DMX LIGHTS', xp: 80 },
  { level: 'LEVEL 05', title: 'LIVE & JOIN', xp: 100 },
];

export function FloatingBoothNav() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  const [levelIdx, setLevelIdx] = useState(0);
  const [xpPercent, setXpPercent] = useState(5);

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      const pct = Math.max(5, Math.min(100, Math.round(v * 100)));
      setXpPercent(pct);
      if (v < 0.2) setLevelIdx(0);
      else if (v < 0.44) setLevelIdx(1);
      else if (v < 0.64) setLevelIdx(2);
      else if (v < 0.82) setLevelIdx(3);
      else setLevelIdx(4);
    });
  }, [scrollYProgress]);

  const currentLevel = LEVEL_META[levelIdx] ?? LEVEL_META[0];

  const handleJumpToJoin = () => {
    const el = document.getElementById('chapter-08');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#121212] border-b-4 border-[#F5F5F0]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-3">
        <a href="#chapter-01" className="shrink-0 flex items-center">
          <Image
            src="/images/johia-church-brand.png"
            alt="JOHIA Cubao"
            width={196}
            height={34}
            priority
            unoptimized
            className="h-7 sm:h-8 md:h-9 w-auto object-contain"
          />
        </a>

        <div className="flex items-center gap-2">
          <div className="hidden md:inline-block bg-[#F5F5F0] text-[#121212] font-mono text-[11px] font-black uppercase px-2 py-1 border-2 border-[#121212]">
            STAGE CLEAR
          </div>
          <div className="relative overflow-hidden bg-[#F7B519] text-[#121212] border-3 border-[#121212] shadow-[4px_4px_0px_#F5F5F0] px-3 sm:px-4 py-1 min-w-[165px] sm:min-w-[210px] text-center">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentLevel.level}
                initial={{ y: 28, opacity: 0, rotateX: -60 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                exit={{ y: -28, opacity: 0, rotateX: 60 }}
                transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                className="font-mono text-xs sm:text-sm font-black uppercase tracking-wider"
              >
                {`${currentLevel.level} // ${currentLevel.title}`}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex flex-col w-36">
            <div className="flex justify-between font-mono text-[10px] font-black text-[#F7B519] uppercase mb-0.5 tabular-nums">
              <span>BOOTH SYNC</span>
              <span>{xpPercent}% XP</span>
            </div>
            <div className="h-3.5 w-full bg-[#1E1E1E] border-2 border-[#F5F5F0] p-0.5">
              <motion.div
                style={{ scaleX: smoothProgress, transformOrigin: '0% 50%' }}
                className="h-full w-full bg-[#F7B519]"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleJumpToJoin}
            className="inline-flex items-center gap-1 bg-[#F7B519] hover:bg-[#FACC15] active:translate-x-0.5 active:translate-y-0.5 text-[#121212] font-mono text-xs font-black px-3.5 py-2 border-3 border-[#121212] shadow-[4px_4px_0px_#F5F5F0] transition-transform cursor-pointer"
          >
            <span>Join Technicals!</span>
            <ArrowDownRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    </header>
  );
}
