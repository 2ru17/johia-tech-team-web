'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll } from 'motion/react';
import { Lightbulb, PowerOff, Zap } from 'lucide-react';
import { useTechBoothStore } from '@/store/useTechBoothStore';
import { DMX_384B_SCENES, DMX_SCANNER_MAPPINGS } from '@/data/dmx384bScenes';
import { cn } from '@/lib/utils';

interface DiagramFixture {
  id: string;
  scanNumber: number;
  label: string;
  bulbNum?: number;
  isWhiteAmberOnly: boolean;
}

const FARTHER_FRONT_ROW: DiagramFixture[] = [
  { id: 'ff-1', scanNumber: 1, label: 'SCAN-1', isWhiteAmberOnly: true },
  { id: 'ff-2', scanNumber: 5, label: 'SCAN-5', isWhiteAmberOnly: true },
  { id: 'ff-3', scanNumber: 5, label: 'SCAN-5', isWhiteAmberOnly: true },
  { id: 'ff-4', scanNumber: 1, label: 'SCAN-1', isWhiteAmberOnly: true },
];

const FRONT_ROW: DiagramFixture[] = [
  { id: 'fr-1', scanNumber: 4, label: 'SCAN-4', bulbNum: 1, isWhiteAmberOnly: false },
  { id: 'fr-2', scanNumber: 4, label: 'SCAN-4', bulbNum: 2, isWhiteAmberOnly: false },
  { id: 'fr-3', scanNumber: 5, label: 'SCAN-5', bulbNum: 3, isWhiteAmberOnly: true },
  { id: 'fr-4', scanNumber: 6, label: 'SCAN-6', bulbNum: 4, isWhiteAmberOnly: false },
  { id: 'fr-5', scanNumber: 7, label: 'SCAN-7', bulbNum: 5, isWhiteAmberOnly: false },
  { id: 'fr-6', scanNumber: 7, label: 'SCAN-7', bulbNum: 6, isWhiteAmberOnly: false },
  { id: 'fr-7', scanNumber: 6, label: 'SCAN-6', bulbNum: 7, isWhiteAmberOnly: false },
  { id: 'fr-8', scanNumber: 5, label: 'SCAN-5', bulbNum: 8, isWhiteAmberOnly: true },
  { id: 'fr-9', scanNumber: 4, label: 'SCAN-4', bulbNum: 9, isWhiteAmberOnly: false },
  { id: 'fr-10', scanNumber: 4, label: 'SCAN-4', bulbNum: 10, isWhiteAmberOnly: false },
];

const SIDE_COLUMN: DiagramFixture[] = [
  { id: 'side-2', scanNumber: 2, label: 'SCAN-2', isWhiteAmberOnly: true },
  { id: 'side-8', scanNumber: 8, label: 'SCAN-8', isWhiteAmberOnly: false },
  { id: 'side-9', scanNumber: 9, label: 'SCAN-9', isWhiteAmberOnly: false },
];

const SCENE_LIST = [
  {
    sceneNumber: 1,
    code: '101',
    shortLabel: 'SCENE 1',
    title: 'Yellow/Green-ish Preset',
    colors: ['#F59E0B', '#10B981', '#1E1B4B'] as [string, string, string],
  },
  {
    sceneNumber: 2,
    code: '102',
    shortLabel: 'SCENE 2',
    title: 'P&W Static Color',
    colors: ['#06B6D4', '#3B82F6', '#EC4899'] as [string, string, string],
  },
  {
    sceneNumber: 3,
    code: '103',
    shortLabel: 'SCENE 3',
    title: 'Magenta/Dark Preset',
    colors: ['#EC4899', '#6D28D9', '#090D16'] as [string, string, string],
  },
  {
    sceneNumber: 4,
    code: '104',
    shortLabel: 'SCENE 4',
    title: 'Lighter Static Preset',
    colors: ['#38BDF8', '#FBBF24', '#1E293B'] as [string, string, string],
  },
  {
    sceneNumber: 5,
    code: '105',
    shortLabel: 'SCENE 5',
    title: 'SPEAKER Lights',
    colors: ['#F8FAFC', '#FDE68A', '#1E293B'] as [string, string, string],
  },
  {
    sceneNumber: 6,
    code: '106',
    shortLabel: 'SCENE 6',
    title: 'Praise Blinking Preset',
    colors: ['#F97316', '#3B82F6', '#EC4899'] as [string, string, string],
  },
  {
    sceneNumber: 7,
    code: '107',
    shortLabel: 'SCENE 7',
    title: 'Worship Strobe Preset (Slow)',
    colors: ['#F8FAFC', '#38BDF8', '#6366F1'] as [string, string, string],
  },
  {
    sceneNumber: 8,
    code: '108',
    shortLabel: 'SCENE 8',
    title: 'ALL ON',
    colors: ['#FFFBEB', '#38BDF8', '#F59E0B'] as [string, string, string],
  },
];

export function Chapter5DmxConsole() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dmxState = useTechBoothStore((s) => s.dmxState);
  const setDmxScene = useTechBoothStore((s) => s.setDmxScene);
  const toggleDmxBlackout = useTechBoothStore((s) => s.toggleDmxBlackout);
  const setActiveChapter = useTechBoothStore((s) => s.setActiveChapter);

  const [selectedScan, setSelectedScan] = useState<number>(4);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      const idx = Math.min(
        SCENE_LIST.length - 1,
        Math.max(0, Math.floor(v * SCENE_LIST.length))
      );
      const preset = SCENE_LIST[idx];
      if (preset) {
        const fullScene = DMX_384B_SCENES.find(
          (s) => s.sceneNumber === preset.sceneNumber
        );
        setDmxScene(preset.sceneNumber, preset.colors, fullScene?.faders);
      }
    });
  }, [scrollYProgress, setDmxScene]);

  const activeSceneMeta =
    SCENE_LIST.find((s) => s.sceneNumber === dmxState.activeScene) ??
    SCENE_LIST[0];

  const activeScanSpec =
    DMX_SCANNER_MAPPINGS.find((m) => m.scanNumber === selectedScan) ??
    DMX_SCANNER_MAPPINGS[3];

  const ledCode = dmxState.blackout ? 'BLK' : `10${dmxState.activeScene}`;

  const getFixtureBeamColor = (fix: DiagramFixture, idx: number) => {
    if (dmxState.blackout) return 'transparent';
    if (fix.isWhiteAmberOnly) {
      return '#FDE68A';
    }
    if (dmxState.activeScene === 5) {
      // SPEAKER Lights: Colored cans dimmed low, warm white priority
      return '#475569';
    }
    return idx % 2 === 0 ? activeSceneMeta.colors[0] : activeSceneMeta.colors[1];
  };

  const isBlinkingScene = !dmxState.blackout && dmxState.activeScene === 6;
  const isStrobeScene = !dmxState.blackout && dmxState.activeScene === 7;

  return (
    <section
      id="chapter-05"
      ref={containerRef}
      onMouseEnter={() => setActiveChapter('05-DMX')}
      className="relative h-[235vh] brutalist-grid-bg border-b-4 border-[#F5F5F0]"
    >
      <div className="sticky top-16 min-h-[calc(100vh-4rem)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col justify-between gap-4">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="inline-block bg-[#EC4899] text-[#F5F5F0] font-mono text-xs font-black uppercase px-3 py-1 border-3 border-[#121212] shadow-[4px_4px_0px_#F5F5F0]">
              LEVEL 04 // SHOWART DMX-384B LIGHTING PLOT &amp; SCENES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-[#F5F5F0] mt-1.5 leading-none">
              8 SCENES.{' '}
              <span className="text-[#F7B519]">SCAN 1-9 RIG.</span>
            </h2>
          </div>

          <button
            type="button"
            onClick={toggleDmxBlackout}
            className={cn(
              'font-mono text-xs sm:text-sm font-black uppercase px-5 py-2.5 border-4 border-[#121212] shadow-[6px_6px_0px_#F5F5F0] cursor-pointer flex items-center gap-2',
              dmxState.blackout
                ? 'bg-[#F5F5F0] text-[#EF4444]'
                : 'bg-[#EF4444] text-[#F5F5F0]'
            )}
          >
            <PowerOff className="w-4 h-4 stroke-[3]" />
            <span>BLACKOUT</span>
          </button>
        </div>

        {/* Center Main Grid: Left ShowArt Console + Fader Sheet | Right Full Overhead Light Show Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch my-auto">
          {/* Left 5 Cols: 8 Scene Presets + SCAN 1-9 Fader Table */}
          <div className="lg:col-span-5 bg-[#181818] border-4 border-[#F5F5F0] shadow-[8px_8px_0px_#F7B519] p-4 flex flex-col justify-between gap-3">
            {/* Console Header + Red 7-Segment LED */}
            <div className="flex items-center justify-between gap-3 border-b-3 border-[#F5F5F0]/20 pb-2.5">
              <div>
                <div className="font-mono text-[10px] font-black text-[#F7B519] uppercase">
                  SHOWART DMX-384B
                </div>
                <div className="text-lg font-black text-[#F5F5F0] uppercase leading-tight">
                  SCENES 1-8 &amp; SCAN PATCH
                </div>
              </div>

              <div className="bg-[#1A0505] border-3 border-[#EF4444] px-3.5 py-1 text-center shadow-[4px_4px_0px_#121212]">
                <div className="font-mono text-[8px] font-black text-[#EF4444] uppercase">
                  ACTIVE CUE
                </div>
                <div className="font-mono text-2xl font-black tracking-widest text-[#EF4444] tabular-nums">
                  {ledCode}
                </div>
              </div>
            </div>

            {/* All 8 Scenes List (Exact Names from Reference Diagram) */}
            <div className="grid grid-cols-2 gap-1.5">
              {SCENE_LIST.map((sc) => {
                const isActive =
                  !dmxState.blackout && dmxState.activeScene === sc.sceneNumber;
                return (
                  <button
                    key={sc.sceneNumber}
                    type="button"
                    onClick={() => setDmxScene(sc.sceneNumber, sc.colors)}
                    className={cn(
                      'border-2 px-2.5 py-1.5 text-left font-mono transition-all cursor-pointer',
                      isActive
                        ? 'bg-[#F7B519] text-[#121212] border-[#121212] shadow-[3px_3px_0px_#F5F5F0]'
                        : 'bg-[#121212] text-[#F5F5F0] border-[#F5F5F0]/30 hover:border-[#F7B519]'
                    )}
                  >
                    <div className="text-[10px] font-black uppercase">
                      {sc.shortLabel}
                    </div>
                    <div className="text-[11px] font-bold truncate">
                      {sc.title}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* SCAN 1 to SCAN 9 Selector + Fader Mapping Inspector */}
            <div className="bg-[#121212] border-3 border-[#F5F5F0] p-3 space-y-2">
              <div className="font-mono text-[10px] font-black text-[#F7B519] uppercase">
                TAP SCAN BUTTON TO INSPECT FADER MAPPING:
              </div>
              <div className="grid grid-cols-9 gap-1">
                {DMX_SCANNER_MAPPINGS.map((m) => {
                  const isOffline = m.fixtureType === 'OFFLINE';
                  const isSel = selectedScan === m.scanNumber;
                  return (
                    <button
                      key={m.scanNumber}
                      type="button"
                      onClick={() => setSelectedScan(m.scanNumber)}
                      className={cn(
                        'py-1.5 font-mono text-[10px] font-black border-2 cursor-pointer',
                        isSel
                          ? 'bg-[#F7B519] text-[#121212] border-[#F5F5F0]'
                          : isOffline
                          ? 'bg-[#2A0A0A] text-[#EF4444] border-[#EF4444]/60'
                          : 'bg-[#1E1E1E] text-[#F5F5F0] border-[#F5F5F0]/30'
                      )}
                    >
                      {`S${m.scanNumber}`}
                    </button>
                  );
                })}
              </div>

              {/* Active SCAN Fader Assignment Box */}
              <div className="bg-[#1A1A1A] border-2 border-[#F7B519] p-2.5 font-mono">
                <div className="flex items-center justify-between text-xs font-black uppercase">
                  <span className="text-[#F7B519]">{activeScanSpec.label}</span>
                  <span
                    className={cn(
                      'px-1.5 py-0.5 text-[9px] border border-[#121212]',
                      activeScanSpec.fixtureType === 'WHITE_AMBER_ONLY'
                        ? 'bg-[#FDE68A] text-[#121212]'
                        : activeScanSpec.fixtureType === 'OFFLINE'
                        ? 'bg-[#EF4444] text-[#F5F5F0]'
                        : 'bg-[#38BDF8] text-[#121212]'
                    )}
                  >
                    {activeScanSpec.fixtureType === 'WHITE_AMBER_ONLY'
                      ? 'WHITE / AMBER ONLY'
                      : activeScanSpec.fixtureType === 'OFFLINE'
                      ? 'NOT WORKING'
                      : 'COLORED LIGHTS'}
                  </span>
                </div>
                <div className="mt-1 space-y-0.5 text-[10px] font-bold text-[#F5F5F0]">
                  {activeScanSpec.faderAssignments.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right 7 Cols: Big Overhead Stage Lighting Rig with DRAMATIC LIGHT SHINING */}
          <div className="lg:col-span-7 bg-[#07090E] border-4 border-[#F5F5F0] shadow-[8px_8px_0px_#38BDF8] p-4 sm:p-5 flex flex-col justify-between gap-3 min-h-[540px] relative overflow-hidden">
            {/* Top Row: Legend + Farther Front Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2 z-20">
              <div className="flex items-center gap-2 font-mono text-[10px] font-black uppercase">
                <span className="bg-[#1E3A8A] text-[#F5F5F0] px-2 py-0.5 border-2 border-[#F5F5F0]">
                  LEGEND
                </span>
                <span className="bg-[#FDE68A] text-[#121212] px-2 py-0.5 border-2 border-[#121212]">
                  White/Amber ONLY
                </span>
                <span className="bg-gradient-to-r from-[#EC4899] via-[#38BDF8] to-[#22C55E] text-[#121212] px-2 py-0.5 border-2 border-[#121212]">
                  Colored Lights
                </span>
              </div>

              <span className="bg-[#1E3A8A] text-[#F5F5F0] font-mono text-xs font-black px-3 py-0.5 border-2 border-[#F5F5F0]">
                Farther Front
              </span>
            </div>

            {/* FARTHER FRONT ROW (4 Fixtures) WITH DOWNWARD VOLUMETRIC LIGHT SHINING */}
            <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto w-full z-20">
              {FARTHER_FRONT_ROW.map((fix, idx) => {
                const isHighlighted = selectedScan === fix.scanNumber;
                const beam = getFixtureBeamColor(fix, idx);
                return (
                  <div key={fix.id} className="relative flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => setSelectedScan(fix.scanNumber)}
                      className={cn(
                        'relative z-30 w-full flex flex-col items-center py-1.5 px-1 border-2 cursor-pointer transition-transform',
                        isHighlighted
                          ? 'bg-[#F7B519] text-[#121212] border-[#F5F5F0] -translate-y-0.5 shadow-[0_0_15px_#F7B519]'
                          : 'bg-[#141720] text-[#F5F5F0] border-[#FDE68A]/70'
                      )}
                    >
                      <div
                        className="w-5 h-5 rounded-full border-2 border-[#121212] transition-colors"
                        style={{
                          backgroundColor: beam,
                          boxShadow: dmxState.blackout ? 'none' : `0 0 14px ${beam}`,
                        }}
                      />
                      <span className="font-mono text-[9px] font-black mt-1">
                        {fix.label}
                      </span>
                    </button>

                    <motion.div
                      animate={{
                        opacity: dmxState.blackout
                          ? 0
                          : isStrobeScene
                          ? [0.25, 0.85, 0.25]
                          : isBlinkingScene
                          ? [0.2, 0.75, 0.2]
                          : 0.6,
                      }}
                      transition={{
                        repeat: isStrobeScene || isBlinkingScene ? Infinity : 0,
                        duration: isStrobeScene ? 3.2 : 0.8,
                        ease: 'easeInOut',
                      }}
                      style={{
                        background: `linear-gradient(180deg, ${beam}B3 0%, ${beam}33 55%, transparent 100%)`,
                        clipPath: 'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)',
                      }}
                      className="absolute top-10 w-20 sm:w-24 h-28 pointer-events-none z-10"
                    />
                  </div>
                );
              })}
            </div>

            <div className="text-center z-20 mt-1">
              <span className="inline-block bg-[#1E3A8A] text-[#F5F5F0] font-mono text-xs font-black px-4 py-0.5 border-2 border-[#F5F5F0]">
                Front
              </span>
            </div>

            <div className="relative grid grid-cols-10 gap-1 sm:gap-1.5 z-20">
              {FRONT_ROW.map((fix, idx) => {
                const isHighlighted = selectedScan === fix.scanNumber;
                const beam = getFixtureBeamColor(fix, idx);
                return (
                  <div key={fix.id} className="relative flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => setSelectedScan(fix.scanNumber)}
                      className={cn(
                        'relative z-30 w-full flex flex-col items-center py-1 px-0.5 border-2 cursor-pointer transition-transform',
                        isHighlighted
                          ? 'bg-[#F7B519] text-[#121212] border-[#F5F5F0] -translate-y-0.5 shadow-[0_0_14px_#F7B519]'
                          : fix.isWhiteAmberOnly
                          ? 'bg-[#141720] text-[#FDE68A] border-[#FDE68A]/70'
                          : 'bg-[#141720] text-[#38BDF8] border-[#38BDF8]/70'
                      )}
                    >
                      <div
                        className="w-4 h-4 rounded-full border border-[#121212] transition-colors"
                        style={{
                          backgroundColor: beam,
                          boxShadow: dmxState.blackout ? 'none' : `0 0 12px ${beam}`,
                        }}
                      />
                      <span className="font-mono text-[8px] font-black mt-0.5 tracking-tighter">
                        {fix.label}
                      </span>
                    </button>

                    <motion.div
                      animate={{
                        opacity: dmxState.blackout
                          ? 0
                          : isStrobeScene
                          ? [0.2, 0.9, 0.2]
                          : isBlinkingScene
                          ? [0.15, 0.85, 0.15]
                          : 0.65,
                      }}
                      transition={{
                        repeat: isStrobeScene || isBlinkingScene ? Infinity : 0,
                        duration: isStrobeScene ? 3.2 : 0.8,
                        ease: 'easeInOut',
                        delay: isBlinkingScene ? (idx % 2) * 0.4 : 0,
                      }}
                      style={{
                        background: `linear-gradient(180deg, ${beam}CC 0%, ${beam}4D 45%, transparent 100%)`,
                        clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
                      }}
                      className="absolute top-8 w-14 sm:w-16 h-36 sm:h-40 pointer-events-none z-10"
                    />
                  </div>
                );
              })}
            </div>

            {/* BOTTOM ROW: TECH BOOTH + LEFT SIDE FIXTURES + ILLUMINATED STAGE + RIGHT SIDE FIXTURES */}
            <div className="relative grid grid-cols-12 gap-2 items-stretch z-20 mt-4">
              {/* Tech Booth Box (Far Left) */}
              <div className="col-span-2 bg-[#1C1F26] border-3 border-[#F5F5F0]/50 p-2 flex items-center justify-center text-center font-mono text-[10px] font-black text-[#F5F5F0]/80 uppercase">
                Tech Booth
              </div>

              {/* Left Side Column: SCAN-2, SCAN-8, SCAN-9 with Horizontal Cross-Beams */}
              <div className="col-span-2 flex flex-col justify-between gap-1.5 relative">
                {SIDE_COLUMN.map((fix, idx) => {
                  const isHighlighted = selectedScan === fix.scanNumber;
                  const beam = getFixtureBeamColor(fix, idx);
                  return (
                    <div key={`left-${fix.id}`} className="relative flex items-center">
                      <button
                        type="button"
                        onClick={() => setSelectedScan(fix.scanNumber)}
                        className={cn(
                          'relative z-30 w-full flex items-center justify-between px-2 py-1.5 border-2 font-mono text-[9px] font-black cursor-pointer',
                          isHighlighted
                            ? 'bg-[#F7B519] text-[#121212] border-[#F5F5F0] shadow-[0_0_12px_#F7B519]'
                            : 'bg-[#141720] text-[#F5F5F0] border-[#F5F5F0]/40'
                        )}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-[#121212] shrink-0"
                          style={{
                            backgroundColor: beam,
                            boxShadow: dmxState.blackout ? 'none' : `0 0 10px ${beam}`,
                          }}
                        />
                        <span>{fix.label}</span>
                      </button>

                      <motion.div
                        animate={{
                          opacity: dmxState.blackout ? 0 : 0.45,
                        }}
                        style={{
                          background: `linear-gradient(90deg, ${beam}80 0%, transparent 100%)`,
                          clipPath: 'polygon(0% 25%, 100% 0%, 100% 100%, 0% 75%)',
                        }}
                        className="absolute left-full top-0 w-24 h-full pointer-events-none z-10"
                      />
                    </div>
                  );
                })}
              </div>

              <motion.div
                animate={{
                  boxShadow: dmxState.blackout
                    ? '0 0 0px transparent'
                    : `0 0 35px ${activeSceneMeta.colors[0]}55`,
                  borderColor: dmxState.blackout
                    ? '#F5F5F0'
                    : activeSceneMeta.colors[0],
                }}
                transition={{ duration: 0.3 }}
                className="col-span-6 border-4 p-3.5 flex flex-col items-center justify-center text-center relative overflow-hidden transition-colors"
                style={{
                  backgroundColor: dmxState.blackout ? '#181818' : '#6B1414',
                }}
              >
                {!dmxState.blackout && (
                  <motion.div
                    animate={{
                      opacity: isStrobeScene
                        ? [0.3, 0.85, 0.3]
                        : isBlinkingScene
                        ? [0.35, 0.75, 0.35]
                        : 0.55,
                    }}
                    transition={{
                      repeat: isStrobeScene || isBlinkingScene ? Infinity : 0,
                      duration: isStrobeScene ? 3.2 : 0.8,
                      ease: 'easeInOut',
                    }}
                    style={{
                      background: `radial-gradient(circle at 50% 25%, ${activeSceneMeta.colors[0]}99 0%, ${activeSceneMeta.colors[1]}55 50%, transparent 85%)`,
                    }}
                    className="absolute inset-0 pointer-events-none"
                  />
                )}

                <div className="relative z-10 font-mono text-[10px] font-black text-[#FDE68A] uppercase">
                  {dmxState.blackout
                    ? 'BLACKOUT ACTIVE // 0% OUTPUT'
                    : `${activeSceneMeta.shortLabel} // ${activeSceneMeta.title}`}
                </div>
                <div className="relative z-10 text-3xl sm:text-4xl font-black text-[#F5F5F0] uppercase tracking-widest mt-1">
                  STAGE
                </div>
                <div className="relative z-10 font-mono text-[9px] font-bold text-[#F5F5F0]/80 uppercase mt-1">
                  SCAN 3 = NOT WORKING
                </div>
              </motion.div>

              <div className="col-span-2 flex flex-col justify-between gap-1.5 relative">
                {SIDE_COLUMN.map((fix, idx) => {
                  const isHighlighted = selectedScan === fix.scanNumber;
                  const beam = getFixtureBeamColor(fix, idx);
                  return (
                    <div key={`right-${fix.id}`} className="relative flex items-center">
                      <motion.div
                        animate={{
                          opacity: dmxState.blackout ? 0 : 0.45,
                        }}
                        style={{
                          background: `linear-gradient(270deg, ${beam}80 0%, transparent 100%)`,
                          clipPath: 'polygon(100% 25%, 0% 0%, 0% 100%, 100% 75%)',
                        }}
                        className="absolute right-full top-0 w-24 h-full pointer-events-none z-10"
                      />

                      <button
                        type="button"
                        onClick={() => setSelectedScan(fix.scanNumber)}
                        className={cn(
                          'relative z-30 w-full flex items-center justify-between px-2 py-1.5 border-2 font-mono text-[9px] font-black cursor-pointer',
                          isHighlighted
                            ? 'bg-[#F7B519] text-[#121212] border-[#F5F5F0] shadow-[0_0_12px_#F7B519]'
                            : 'bg-[#141720] text-[#F5F5F0] border-[#F5F5F0]/40'
                        )}
                      >
                        <span>{fix.label}</span>
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-[#121212] shrink-0"
                          style={{
                            backgroundColor: beam,
                            boxShadow: dmxState.blackout ? 'none' : `0 0 10px ${beam}`,
                          }}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="bg-[#121212] border-3 border-[#F5F5F0] px-4 py-2 flex flex-wrap items-center justify-between gap-2 font-mono text-xs font-black uppercase">
          <span className="text-[#F7B519] flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 stroke-[2.5]" />
            <span>
              VOLUMETRIC LIGHT SHINING: FARTHER FRONT (4) + FRONT TRUSS (10) + SIDE BARS (6)
            </span>
          </span>
          <span className="text-[#22C55E] flex items-center gap-1">
            <Zap className="w-4 h-4 fill-current" />
            <span>[VOLUMETRIC BEAMS ARMED]</span>
          </span>
        </div>
      </div>
    </section>
  );
}
