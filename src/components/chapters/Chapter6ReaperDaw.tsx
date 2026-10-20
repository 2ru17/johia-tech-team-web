'use client';

import React from 'react';
import { AudioWaveform, Radio } from 'lucide-react';
import { useTechBoothStore, type ReaperBusId } from '@/store/useTechBoothStore';
import { cn } from '@/lib/utils';

const REAPER_STEM_PILLS: {
  id: ReaperBusId;
  label: string;
  tag: string;
  color: string;
}[] = [
  { id: 'LEAD_VOX', label: 'LEAD VOX BUS', tag: 'KOTELNIKOV 1.5:1', color: 'bg-[#F97316]' },
  { id: 'BACK_VOX', label: 'BACK VOX BUS', tag: 'MAGIC SWITCH 50%', color: 'bg-[#EC4899]' },
  { id: 'INSTRUMENTS', label: 'INSTRUMENTS BUS', tag: 'NOVA -1.5dB POCKET', color: 'bg-[#38BDF8]' },
  { id: 'DRUMS', label: 'Drums Folder Bus', tag: 'Wavesfactory Flash', color: 'bg-[#F7B519]' },
  { id: 'MASTER', label: 'MASTER -13.9 LUFS', tag: 'REASTREAM 8CH UDP', color: 'bg-[#22C55E]' },
];

export function Chapter6ReaperDaw() {
  const selectedBus = useTechBoothStore((s) => s.reaperState.selectedBus);
  const setReaperSelectedBus = useTechBoothStore((s) => s.setReaperSelectedBus);
  const setActiveChapter = useTechBoothStore((s) => s.setActiveChapter);

  return (
    <section
      id="chapter-06"
      onMouseEnter={() => setActiveChapter('06-REAPER')}
      className="relative pt-10 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto brutalist-grid-bg"
    >
      <div className="bg-[#181818] border-4 border-[#F5F5F0] shadow-[8px_8px_0px_#F7B519] p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-[#F5F5F0]/20 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="bg-[#38BDF8] text-[#121212] font-mono text-xs font-black uppercase px-2.5 py-1 border-2 border-[#121212]">
              REAPER v7.41 // 48kHz
            </span>
            <span className="font-black text-lg sm:text-2xl text-[#F5F5F0] uppercase tracking-tight">
              BROADCAST AUDIO ENGINE -&gt; REASTREAM TO OBS
            </span>
          </div>
          <div className="inline-flex items-center gap-2 bg-[#22C55E] text-[#121212] font-mono text-xs font-black uppercase px-3 py-1 border-2 border-[#121212]">
            <Radio className="w-4 h-4 stroke-[2.5]" />
            <span>* LOCAL BROADCAST // -13.9 LUFS</span>
          </div>
        </div>

        {/* 5 Stem Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mt-4">
          {REAPER_STEM_PILLS.map((stem) => {
            const isSelected = selectedBus === stem.id;
            return (
              <button
                key={stem.id}
                type="button"
                onClick={() => setReaperSelectedBus(stem.id)}
                className={cn(
                  'border-3 border-[#121212] p-3 text-left font-mono transition-transform cursor-pointer',
                  isSelected
                    ? `${stem.color} text-[#121212] shadow-[4px_4px_0px_#F5F5F0] -translate-y-0.5`
                    : 'bg-[#121212] text-[#F5F5F0] border-[#F5F5F0]/40 hover:border-[#F7B519]'
                )}
              >
                <div className="flex items-center justify-between text-[10px] font-black uppercase">
                  <span>{stem.label}</span>
                  <AudioWaveform className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs font-black uppercase mt-1 opacity-90">
                  {stem.tag}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
