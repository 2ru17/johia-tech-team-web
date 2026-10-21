'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { FloatingBoothNav } from '@/components/hud/FloatingBoothNav';
import { BrutalistMarquee } from '@/components/hud/BrutalistMarquee';
import { JohiaLogo } from '@/components/hud/JohiaLogo';
import { ExternalLink, Globe } from 'lucide-react';
import { Chapter1HeroStage } from '@/components/chapters/Chapter1HeroStage';
import { Chapter2WirelessOps } from '@/components/chapters/Chapter2WirelessOps';
import { Chapter3AudioRack } from '@/components/chapters/Chapter3AudioRack';
import { Chapter4MasterFader } from '@/components/chapters/Chapter4MasterFader';
import { Chapter5DmxConsole } from '@/components/chapters/Chapter5DmxConsole';
import { Chapter6ReaperDaw } from '@/components/chapters/Chapter6ReaperDaw';
import { Chapter7ObsBroadcast } from '@/components/chapters/Chapter7ObsBroadcast';
import { Chapter8Onboarding } from '@/components/chapters/Chapter8Onboarding';

const PersistentBoothCanvasDynamic = dynamic(
  () =>
    import('@/components/canvas/PersistentBoothCanvas').then(
      (m) => m.PersistentBoothCanvas
    ),
  { ssr: false }
);

export default function TechBoothOnboardingPage() {
  return (
    <main className="relative min-h-screen text-[#F5F5F0] bg-[#121212]">
      <PersistentBoothCanvasDynamic />
      <FloatingBoothNav />

      <Chapter1HeroStage />

      <BrutalistMarquee
        hazard
        variant="gold"
        items={[
          'LEVEL 02 // WIRELESS & POWER',
          'WHITE & YELLOW = SHURE PG58',
          'ORANGE, BLUE & PINK = AD ACT-9090U',
          'LOCK 809.500 MHz',
          'POWER CONTROLLER FIRST -> AMPS LAST',
        ]}
      />

      <Chapter2WirelessOps />
      <Chapter3AudioRack />

      <BrutalistMarquee
        variant="white"
        items={[
          'LEVEL 03 // MACKIE MASTER FADER',
          'VCA 1 DRUMS',
          'VCA 2 VOCALS',
          '4 STAGE WEDGE MIXES',
          'B3 SUBWOOFERS ARMED',
        ]}
      />

      <Chapter4MasterFader />

      <BrutalistMarquee
        hazard
        variant="dark"
        items={[
          'LEVEL 04 // SHOWART DMX-384B',
          'SCENE 101 WORSHIP GOLD',
          'SCENE 102 PRAISE CYAN',
          'SCENE 105 SERMON WHITE',
          'SCAN 1-9 PAR CANS',
        ]}
      />

      <Chapter5DmxConsole />

      <BrutalistMarquee
        variant="gold"
        items={[
          'LEVEL 05 // ON AIR BROADCAST',
          'REAPER v7.41 (-13.9 LUFS)',
          'REASTREAM UDP PIPE',
          'OBS STUDIO MODE',
          'JOIN THE TECH BOOTH',
        ]}
      />

      <Chapter6ReaperDaw />
      <Chapter7ObsBroadcast />

      <Chapter8Onboarding />

      <footer className="border-t-4 border-[#F5F5F0] bg-[#121212] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <JohiaLogo size="md" />
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://johiacubao.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#F5F5F0] hover:bg-[#F7B519] text-[#121212] border-3 border-[#121212] shadow-[4px_4px_0px_#F7B519] px-4 py-2 font-mono text-xs font-black transition-transform active:translate-x-0.5 active:translate-y-0.5"
            >
              <Globe className="w-4 h-4" />
              <span>Check out our official website!</span>
              <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
            <a
              href="https://github.com/2ru17"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#F7B519] hover:bg-[#FACC15] text-[#121212] border-3 border-[#121212] shadow-[4px_4px_0px_#F5F5F0] px-4 py-2 font-mono text-xs font-black transition-transform active:translate-x-0.5 active:translate-y-0.5"
            >
              Made by JOHIA Technicals Head: github.com/2ru17
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
