'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Lightbulb,
  Monitor,
  Sliders,
} from 'lucide-react';
import { useTechBoothStore } from '@/store/useTechBoothStore';
import { JohiaLogo } from '@/components/hud/JohiaLogo';
import { cn } from '@/lib/utils';

export const GOOGLE_FORM_URL = 'https://forms.gle/AXmj7uZFNKisdVfK6';

// Exact 29x29 Version 3-L QR Code SVG Path encoding https://forms.gle/AXmj7uZFNKisdVfK6
const QR_CODE_SVG_PATH =
  'M0,0h1v1h-1zM1,0h1v1h-1zM2,0h1v1h-1zM3,0h1v1h-1zM4,0h1v1h-1zM5,0h1v1h-1zM6,0h1v1h-1zM10,0h1v1h-1zM14,0h1v1h-1zM19,0h1v1h-1zM20,0h1v1h-1zM22,0h1v1h-1zM23,0h1v1h-1zM24,0h1v1h-1zM25,0h1v1h-1zM26,0h1v1h-1zM27,0h1v1h-1zM28,0h1v1h-1zM0,1h1v1h-1zM6,1h1v1h-1zM9,1h1v1h-1zM13,1h1v1h-1zM18,1h1v1h-1zM19,1h1v1h-1zM22,1h1v1h-1zM28,1h1v1h-1zM0,2h1v1h-1zM2,2h1v1h-1zM3,2h1v1h-1zM4,2h1v1h-1zM6,2h1v1h-1zM8,2h1v1h-1zM11,2h1v1h-1zM15,2h1v1h-1zM19,2h1v1h-1zM20,2h1v1h-1zM22,2h1v1h-1zM24,2h1v1h-1zM25,2h1v1h-1zM26,2h1v1h-1zM28,2h1v1h-1zM0,3h1v1h-1zM2,3h1v1h-1zM3,3h1v1h-1zM4,3h1v1h-1zM6,3h1v1h-1zM9,3h1v1h-1zM12,3h1v1h-1zM13,3h1v1h-1zM18,3h1v1h-1zM22,3h1v1h-1zM24,3h1v1h-1zM25,3h1v1h-1zM26,3h1v1h-1zM28,3h1v1h-1zM0,4h1v1h-1zM2,4h1v1h-1zM3,4h1v1h-1zM4,4h1v1h-1zM6,4h1v1h-1zM9,4h1v1h-1zM12,4h1v1h-1zM13,4h1v1h-1zM16,4h1v1h-1zM19,4h1v1h-1zM22,4h1v1h-1zM24,4h1v1h-1zM25,4h1v1h-1zM26,4h1v1h-1zM28,4h1v1h-1zM0,5h1v1h-1zM6,5h1v1h-1zM10,5h1v1h-1zM11,5h1v1h-1zM12,5h1v1h-1zM14,5h1v1h-1zM15,5h1v1h-1zM17,5h1v1h-1zM18,5h1v1h-1zM19,5h1v1h-1zM20,5h1v1h-1zM22,5h1v1h-1zM28,5h1v1h-1zM0,6h1v1h-1zM1,6h1v1h-1zM2,6h1v1h-1zM3,6h1v1h-1zM4,6h1v1h-1zM5,6h1v1h-1zM6,6h1v1h-1zM8,6h1v1h-1zM10,6h1v1h-1zM12,6h1v1h-1zM14,6h1v1h-1zM16,6h1v1h-1zM18,6h1v1h-1zM20,6h1v1h-1zM22,6h1v1h-1zM23,6h1v1h-1zM24,6h1v1h-1zM25,6h1v1h-1zM26,6h1v1h-1zM27,6h1v1h-1zM28,6h1v1h-1zM8,7h1v1h-1zM11,7h1v1h-1zM16,7h1v1h-1zM17,7h1v1h-1zM18,7h1v1h-1zM19,7h1v1h-1zM20,7h1v1h-1zM0,8h1v1h-1zM1,8h1v1h-1zM2,8h1v1h-1zM4,8h1v1h-1zM5,8h1v1h-1zM6,8h1v1h-1zM7,8h1v1h-1zM8,8h1v1h-1zM12,8h1v1h-1zM19,8h1v1h-1zM20,8h1v1h-1zM21,8h1v1h-1zM22,8h1v1h-1zM26,8h1v1h-1zM3,9h1v1h-1zM4,9h1v1h-1zM9,9h1v1h-1zM11,9h1v1h-1zM12,9h1v1h-1zM13,9h1v1h-1zM18,9h1v1h-1zM20,9h1v1h-1zM22,9h1v1h-1zM25,9h1v1h-1zM28,9h1v1h-1zM0,10h1v1h-1zM2,10h1v1h-1zM3,10h1v1h-1zM4,10h1v1h-1zM5,10h1v1h-1zM6,10h1v1h-1zM8,10h1v1h-1zM10,10h1v1h-1zM11,10h1v1h-1zM12,10h1v1h-1zM14,10h1v1h-1zM17,10h1v1h-1zM18,10h1v1h-1zM20,10h1v1h-1zM22,10h1v1h-1zM23,10h1v1h-1zM24,10h1v1h-1zM26,10h1v1h-1zM27,10h1v1h-1zM28,10h1v1h-1zM3,11h1v1h-1zM8,11h1v1h-1zM9,11h1v1h-1zM10,11h1v1h-1zM12,11h1v1h-1zM13,11h1v1h-1zM14,11h1v1h-1zM17,11h1v1h-1zM19,11h1v1h-1zM22,11h1v1h-1zM24,11h1v1h-1zM27,11h1v1h-1zM1,12h1v1h-1zM3,12h1v1h-1zM4,12h1v1h-1zM6,12h1v1h-1zM8,12h1v1h-1zM10,12h1v1h-1zM11,12h1v1h-1zM14,12h1v1h-1zM15,12h1v1h-1zM16,12h1v1h-1zM19,12h1v1h-1zM22,12h1v1h-1zM25,12h1v1h-1zM27,12h1v1h-1zM28,12h1v1h-1zM5,13h1v1h-1zM10,13h1v1h-1zM11,13h1v1h-1zM14,13h1v1h-1zM15,13h1v1h-1zM16,13h1v1h-1zM17,13h1v1h-1zM19,13h1v1h-1zM20,13h1v1h-1zM21,13h1v1h-1zM22,13h1v1h-1zM25,13h1v1h-1zM28,13h1v1h-1zM0,14h1v1h-1zM1,14h1v1h-1zM2,14h1v1h-1zM3,14h1v1h-1zM4,14h1v1h-1zM6,14h1v1h-1zM7,14h1v1h-1zM10,14h1v1h-1zM13,14h1v1h-1zM16,14h1v1h-1zM17,14h1v1h-1zM21,14h1v1h-1zM25,14h1v1h-1zM27,14h1v1h-1zM28,14h1v1h-1zM2,15h1v1h-1zM3,15h1v1h-1zM4,15h1v1h-1zM5,15h1v1h-1zM7,15h1v1h-1zM9,15h1v1h-1zM10,15h1v1h-1zM11,15h1v1h-1zM16,15h1v1h-1zM17,15h1v1h-1zM19,15h1v1h-1zM21,15h1v1h-1zM22,15h1v1h-1zM23,15h1v1h-1zM25,15h1v1h-1zM27,15h1v1h-1zM1,16h1v1h-1zM2,16h1v1h-1zM3,16h1v1h-1zM6,16h1v1h-1zM9,16h1v1h-1zM12,16h1v1h-1zM16,16h1v1h-1zM20,16h1v1h-1zM21,16h1v1h-1zM22,16h1v1h-1zM23,16h1v1h-1zM25,16h1v1h-1zM27,16h1v1h-1zM28,16h1v1h-1zM3,17h1v1h-1zM7,17h1v1h-1zM9,17h1v1h-1zM11,17h1v1h-1zM12,17h1v1h-1zM13,17h1v1h-1zM16,17h1v1h-1zM19,17h1v1h-1zM20,17h1v1h-1zM21,17h1v1h-1zM22,17h1v1h-1zM25,17h1v1h-1zM26,17h1v1h-1zM28,17h1v1h-1zM0,18h1v1h-1zM2,18h1v1h-1zM5,18h1v1h-1zM6,18h1v1h-1zM7,18h1v1h-1zM8,18h1v1h-1zM9,18h1v1h-1zM10,18h1v1h-1zM11,18h1v1h-1zM12,18h1v1h-1zM14,18h1v1h-1zM16,18h1v1h-1zM17,18h1v1h-1zM21,18h1v1h-1zM22,18h1v1h-1zM23,18h1v1h-1zM27,18h1v1h-1zM28,18h1v1h-1zM1,19h1v1h-1zM2,19h1v1h-1zM4,19h1v1h-1zM5,19h1v1h-1zM7,19h1v1h-1zM8,19h1v1h-1zM12,19h1v1h-1zM13,19h1v1h-1zM14,19h1v1h-1zM16,19h1v1h-1zM17,19h1v1h-1zM20,19h1v1h-1zM22,19h1v1h-1zM24,19h1v1h-1zM25,19h1v1h-1zM27,19h1v1h-1zM0,20h1v1h-1zM2,20h1v1h-1zM3,20h1v1h-1zM5,20h1v1h-1zM6,20h1v1h-1zM8,20h1v1h-1zM9,20h1v1h-1zM10,20h1v1h-1zM11,20h1v1h-1zM14,20h1v1h-1zM19,20h1v1h-1zM20,20h1v1h-1zM21,20h1v1h-1zM22,20h1v1h-1zM23,20h1v1h-1zM24,20h1v1h-1zM8,21h1v1h-1zM9,21h1v1h-1zM10,21h1v1h-1zM11,21h1v1h-1zM14,21h1v1h-1zM15,21h1v1h-1zM16,21h1v1h-1zM19,21h1v1h-1zM20,21h1v1h-1zM24,21h1v1h-1zM26,21h1v1h-1zM27,21h1v1h-1zM28,21h1v1h-1zM0,22h1v1h-1zM1,22h1v1h-1zM2,22h1v1h-1zM3,22h1v1h-1zM4,22h1v1h-1zM5,22h1v1h-1zM6,22h1v1h-1zM8,22h1v1h-1zM10,22h1v1h-1zM13,22h1v1h-1zM16,22h1v1h-1zM17,22h1v1h-1zM18,22h1v1h-1zM19,22h1v1h-1zM20,22h1v1h-1zM22,22h1v1h-1zM24,22h1v1h-1zM25,22h1v1h-1zM27,22h1v1h-1zM28,22h1v1h-1zM0,23h1v1h-1zM6,23h1v1h-1zM8,23h1v1h-1zM9,23h1v1h-1zM11,23h1v1h-1zM15,23h1v1h-1zM16,23h1v1h-1zM17,23h1v1h-1zM18,23h1v1h-1zM19,23h1v1h-1zM20,23h1v1h-1zM24,23h1v1h-1zM25,23h1v1h-1zM28,23h1v1h-1zM0,24h1v1h-1zM2,24h1v1h-1zM3,24h1v1h-1zM4,24h1v1h-1zM6,24h1v1h-1zM8,24h1v1h-1zM10,24h1v1h-1zM12,24h1v1h-1zM16,24h1v1h-1zM17,24h1v1h-1zM20,24h1v1h-1zM21,24h1v1h-1zM22,24h1v1h-1zM23,24h1v1h-1zM24,24h1v1h-1zM28,24h1v1h-1zM0,25h1v1h-1zM2,25h1v1h-1zM3,25h1v1h-1zM4,25h1v1h-1zM6,25h1v1h-1zM10,25h1v1h-1zM11,25h1v1h-1zM12,25h1v1h-1zM13,25h1v1h-1zM16,25h1v1h-1zM23,25h1v1h-1zM24,25h1v1h-1zM26,25h1v1h-1zM27,25h1v1h-1zM28,25h1v1h-1zM0,26h1v1h-1zM2,26h1v1h-1zM3,26h1v1h-1zM4,26h1v1h-1zM6,26h1v1h-1zM8,26h1v1h-1zM9,26h1v1h-1zM11,26h1v1h-1zM12,26h1v1h-1zM14,26h1v1h-1zM18,26h1v1h-1zM19,26h1v1h-1zM20,26h1v1h-1zM23,26h1v1h-1zM24,26h1v1h-1zM25,26h1v1h-1zM28,26h1v1h-1zM0,27h1v1h-1zM6,27h1v1h-1zM8,27h1v1h-1zM9,27h1v1h-1zM12,27h1v1h-1zM13,27h1v1h-1zM14,27h1v1h-1zM17,27h1v1h-1zM18,27h1v1h-1zM19,27h1v1h-1zM20,27h1v1h-1zM22,27h1v1h-1zM23,27h1v1h-1zM24,27h1v1h-1zM27,27h1v1h-1zM0,28h1v1h-1zM1,28h1v1h-1zM2,28h1v1h-1zM3,28h1v1h-1zM4,28h1v1h-1zM5,28h1v1h-1zM6,28h1v1h-1zM8,28h1v1h-1zM10,28h1v1h-1zM11,28h1v1h-1zM14,28h1v1h-1zM17,28h1v1h-1zM19,28h1v1h-1zM20,28h1v1h-1zM22,28h1v1h-1zM23,28h1v1h-1zM24,28h1v1h-1zM27,28h1v1h-1zM28,28h1v1h-1z';

const ARCADE_ROLES = [
  {
    id: 'FOH Audio Engineer (Mackie DL32R / Master Fader)',
    code: 'CLASS 01',
    name: 'SOUND ENGINEER',
    gear: 'MACKIE DL32R + REAPER + RF MICS',
    formCheckbox: 'Digital / Analog Audio Mixers',
    vibe: 'EAR OF THE HOUSE',
    color: 'bg-[#22C55E] text-[#121212]',
    stats: [95, 85, 100],
    icon: Sliders,
  },
  {
    id: 'Lighting Designer (ShowArt DMX-384B)',
    code: 'CLASS 02',
    name: 'LIGHTING DESIGNER',
    gear: 'SHOWART DMX-384B (SCENES 1-8)',
    formCheckbox: 'Lights Control',
    vibe: 'ATMOSPHERE ARCHITECT',
    color: 'bg-[#F7B519] text-[#121212]',
    stats: [90, 80, 95],
    icon: Lightbulb,
  },
  {
    id: 'Broadcast & Lyrics Director (OBS Studio Mode)',
    code: 'CLASS 03',
    name: 'BROADCAST DIRECTOR',
    gear: 'OBS STUDIO + LIVESTREAM',
    formCheckbox: 'Livestream Software',
    vibe: 'LIVE SWITCH MASTER',
    color: 'bg-[#38BDF8] text-[#121212]',
    stats: [88, 90, 95],
    icon: Monitor,
  },
  {
    id: 'Presentation & Lyrics Director (Worship & Sermon Slides)',
    code: 'CLASS 04',
    name: 'PRESENTATION DIRECTOR',
    gear: 'WORSHIP LYRICS & SERMON SLIDES',
    formCheckbox: 'Presentation Software',
    vibe: 'VISUAL CUE MASTER',
    color: 'bg-[#EC4899] text-[#F5F5F0]',
    stats: [92, 85, 95],
    icon: Cpu,
  },
];

export function Chapter8Onboarding() {
  const onboardingSelection = useTechBoothStore((s) => s.onboardingSelection);
  const setOnboardingSelection = useTechBoothStore(
    (s) => s.setOnboardingSelection
  );
  const setActiveChapter = useTechBoothStore((s) => s.setActiveChapter);

  const selectedRoleCard =
    ARCADE_ROLES.find((r) => r.id === onboardingSelection.primaryRole) ??
    ARCADE_ROLES[0];

  return (
    <section
      id="chapter-08"
      onMouseEnter={() => setActiveChapter('08-JOIN')}
      className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto brutalist-grid-bg"
    >
      {/* 1. Bold 3-Step Visual Progression Banner */}
      <div className="mb-12">
        <span className="inline-block bg-[#F7B519] text-[#121212] font-mono text-xs font-black uppercase px-3 py-1 border-3 border-[#121212] shadow-[4px_4px_0px_#F5F5F0]">
          FINAL STAGE // ZERO EXPERIENCE NEEDED
        </span>
        <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-[#F5F5F0] mt-2 leading-none">
          WE TRAIN YOU{' '}
          <span className="bg-[#22C55E] text-[#121212] px-3 border-3 border-[#121212]">
            HANDS-ON.
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {[
            {
              step: 'STEP 01',
              title: 'SHADOW',
              tag: 'SIT IN THE BOOTH & WATCH LIVE',
              bg: 'bg-[#F5F5F0] text-[#121212]',
            },
            {
              step: 'STEP 02',
              title: 'CO-PILOT',
              tag: 'CUE SLIDES & SCENES WITH A MENTOR',
              bg: 'bg-[#F7B519] text-[#121212]',
            },
            {
              step: 'STEP 03',
              title: 'LEAD THE SHOW',
              tag: 'OWN YOUR STATION ON SUNDAY',
              bg: 'bg-[#22C55E] text-[#121212]',
            },
          ].map((item) => (
            <div
              key={item.step}
              className={cn(
                'border-4 border-[#121212] shadow-[8px_8px_0px_#F5F5F0] p-5 flex flex-col justify-between',
                item.bg
              )}
            >
              <div className="font-mono text-xs font-black uppercase border-b-3 border-[#121212] pb-1.5 flex items-center justify-between">
                <span>{item.step}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </div>
              <div className="text-3xl sm:text-4xl font-black uppercase tracking-tight mt-3 leading-none">
                {item.title}
              </div>
              <div className="mt-3 bg-[#121212] text-[#F5F5F0] font-mono text-[11px] font-bold uppercase px-2.5 py-1 self-start">
                {item.tag}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. 4 Arcade Character-Select Role Cards */}
      <div className="mb-12">
        <div className="font-mono text-xs font-black text-[#F7B519] uppercase tracking-widest mb-3">
          SELECT YOUR PLAYER CLASS // TAP ANY CARD
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ARCADE_ROLES.map((role) => {
            const Icon = role.icon;
            const isSelected = onboardingSelection.primaryRole === role.id;
            return (
              <motion.button
                key={role.id}
                type="button"
                whileHover={{ y: -6 }}
                onClick={() => setOnboardingSelection({ primaryRole: role.id })}
                className={cn(
                  'border-4 border-[#121212] p-4 text-left flex flex-col justify-between gap-4 cursor-pointer transition-all',
                  isSelected
                    ? `${role.color} shadow-[8px_8px_0px_#F5F5F0] -translate-y-1.5`
                    : 'bg-[#1A1A1A] text-[#F5F5F0] border-[#F5F5F0] shadow-[6px_6px_0px_#121212]'
                )}
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] font-black uppercase border-b-2 border-current pb-1.5">
                    <span>{role.code}</span>
                    <Icon className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div className="text-xl font-black uppercase tracking-tight mt-2 leading-none">
                    {role.name}
                  </div>
                  <div className="font-mono text-[10px] font-bold uppercase mt-1 opacity-85">
                    {role.gear}
                  </div>
                  <div className="mt-2 inline-block bg-[#121212] text-[#F5F5F0] font-mono text-[9px] font-bold px-2 py-0.5 border border-[#F5F5F0]/40">
                    {`FORM: ${role.formCheckbox}`}
                  </div>
                </div>

                {/* Arcade Stat Bars */}
                <div className="space-y-1.5 font-mono text-[9px] font-black uppercase">
                  <div className="bg-[#121212] text-[#F7B519] px-2 py-1">
                    {role.vibe}
                  </div>
                  {['IMPACT', 'GEAR', 'ACTION'].map((statName, idx) => (
                    <div key={statName} className="flex items-center gap-1.5">
                      <span className="w-12">{statName}</span>
                      <div className="flex-1 h-2 bg-[#121212] border border-current">
                        <div
                          className="h-full bg-[#F7B519]"
                          style={{ width: `${role.stats[idx]}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="font-mono text-[10px] font-black uppercase bg-[#121212] text-[#22C55E] px-2 py-1 text-center">
                  {isSelected ? '[CLASS SELECTED]' : 'SELECT CLASS'}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 bg-[#F7B519] text-[#121212] border-4 border-[#121212] shadow-[10px_10px_0px_#F5F5F0] p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center justify-between border-b-4 border-[#121212] pb-3">
              <span className="font-mono text-xs sm:text-sm font-black uppercase">
                READY PLAYER // CLAIM YOUR SEAT IN THE BOOTH
              </span>
              <span className="bg-[#121212] text-[#22C55E] font-mono text-xs font-black px-2.5 py-0.5">
                Technicals
              </span>
            </div>

            <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mt-4 leading-[0.95]">
              JOIN TECHNICALS.
            </h3>

            <div className="mt-4 inline-block bg-[#F5F5F0] text-[#121212] border-3 border-[#121212] px-3 py-1.5 font-mono text-xs font-black">
              {`SELECTED: ${selectedRoleCard.name} // CHECK "${selectedRoleCard.formCheckbox}" ON FORM`}
            </div>
          </div>

          <div className="space-y-3">
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#121212] hover:bg-[#222222] text-[#F7B519] border-4 border-[#121212] shadow-[6px_6px_0px_#F5F5F0] py-5 px-6 font-mono text-base sm:text-lg font-black uppercase flex items-center justify-between gap-3 transition-transform active:translate-x-0.5 active:translate-y-0.5"
            >
              <span>REGISTER NOW ON GOOGLE FORMS</span>
              <ArrowUpRight className="w-6 h-6 stroke-[3] shrink-0" />
            </a>

            <div className="flex items-center justify-between font-mono text-xs font-black uppercase px-1">
              <span>OFFICIAL SIGN-UP LINK:</span>
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                forms.gle/AXmj7uZFNKisdVfK6
              </a>
            </div>
          </div>
        </div>

        <a
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="lg:col-span-5 bg-[#181818] hover:bg-[#202020] border-4 border-[#F5F5F0] shadow-[10px_10px_0px_#F7B519] p-6 flex flex-col items-center justify-between text-center gap-4 transition-transform hover:-translate-y-1"
        >
          <JohiaLogo size="sm" />

          <div className="bg-[#F5F5F0] p-4 border-4 border-[#121212] shadow-[6px_6px_0px_#F7B519]">
            <svg
              viewBox="-2 -2 33 33"
              className="w-40 h-40 sm:w-44 sm:h-44"
              shapeRendering="crispEdges"
              aria-label="Scan QR Code to open JOHIA Technicals Ministry Google Form"
            >
              <rect x="-2" y="-2" width="33" height="33" fill="#F5F5F0" />
              <path d={QR_CODE_SVG_PATH} fill="#121212" />
            </svg>
          </div>

          <div className="space-y-1">
            <div className="bg-[#22C55E] text-[#121212] font-mono text-xs font-black uppercase px-3 py-1 border-2 border-[#121212] inline-block">
              SCAN WITH PHONE CAMERA TO JOIN
            </div>
            <div className="text-lg font-black text-[#F5F5F0] uppercase mt-1">
              forms.gle/AXmj7uZFNKisdVfK6
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
