import type { ReaperBusId, ReaperSubFolderId } from '@/store/useTechBoothStore';

export interface VstPluginSpec {
  name: string;
  vendor: string;
  preset?: string;
  params: string[];
  bypassed?: boolean;
}

export interface ReaperChildTrackSpec {
  id: string;
  name: string;
  input: string;
  pan: string;
  volDb: string;
  muted?: boolean;
  fxChain: string[];
}

export interface ReaperSubFolderSpec {
  id: ReaperSubFolderId;
  name: string;
  fxChain: VstPluginSpec[];
  children: ReaperChildTrackSpec[];
}

export interface ReaperBusSpec {
  id: ReaperBusId;
  name: string;
  channels: string;
  colorHex: string;
  volDb: string;
  pan: string;
  summary: string;
  eqCurveSvgPath: string;
  kotelnikovGrDb: number;
  busFx: VstPluginSpec[];
  childTracks: ReaperChildTrackSpec[];
  subFolders?: ReaperSubFolderSpec[];
}

export const REAPER_LIVE_BUSES: Record<ReaperBusId, ReaperBusSpec> = {
  MASTER: {
    id: 'MASTER',
    name: 'MASTER BUS',
    channels: '8ch -> Stereo Broadcast',
    colorHex: '#38BDF8',
    volDb: '0.00 dB',
    pan: 'Center',
    summary:
      'Final mastering, loudness metering (-13.9 LUFS), and ReaStream (* local broadcast) UDP audio bridge feeding OBS Studio.',
    eqCurveSvgPath: 'M 0 55 Q 90 52, 180 50 T 360 46',
    kotelnikovGrDb: -1.8,
    busFx: [
      {
        name: 'VST3: bx_masterdesk Classic',
        vendor: 'Plugin Alliance',
        preset: 'Broadcast Glue',
        params: ['THD: -18 dB', 'Tone: +1.0', 'Foundation: +1.5'],
      },
      {
        name: 'VST3: kHs Limiter',
        vendor: 'Kilohearts',
        params: ['Threshold: -1.0 dB', 'Release: 65 ms'],
      },
      {
        name: 'VST: ReaStream (Cockos) (8ch)',
        vendor: 'Cockos',
        preset: '* local broadcast',
        params: ['Identifier: * local broadcast', 'Send Audio/MIDI: Local Broadcast', 'Sample Rate: 48000 Hz'],
      },
      {
        name: 'JS: analysis/loudness_meter',
        vendor: 'Cockos',
        params: ['Integrated: -13.9 LUFS', 'True Peak: -1.0 dBTP'],
      },
      {
        name: 'VST3: bx_meter',
        vendor: 'Plugin Alliance',
        params: ['Dynamic Range: 9.4 dB', 'Crest Factor: Optimal'],
      },
    ],
    childTracks: [
      {
        id: 'out-all-ref',
        name: 'OUT ALL (Top-Level Submaster)',
        input: 'Folder Stem Sum',
        pan: 'Center',
        volDb: '0.00 dB',
        fxChain: ['VST3: kHs Limiter (Kilohearts)'],
      },
    ],
  },

  OUT_ALL: {
    id: 'OUT_ALL',
    name: 'OUT ALL (TOP-LEVEL SUBMASTER)',
    channels: '2ch Stereo Sum',
    colorHex: '#A855F7',
    volDb: '0.00 dB',
    pan: 'Center',
    summary:
      'Top-level safety ceiling summing Lead Vox, Back Vox, Instruments, and Drums before hitting the MASTER bus chain.',
    eqCurveSvgPath: 'M 0 52 L 360 52',
    kotelnikovGrDb: -1.2,
    busFx: [
      {
        name: 'VST3: kHs Limiter',
        vendor: 'Kilohearts',
        params: ['Ceiling: -0.8 dB', 'Lookahead: 2.0 ms'],
      },
    ],
    childTracks: [
      {
        id: 'sum-lead',
        name: 'Lead Vox Folder',
        input: 'Bus 1',
        pan: 'Center',
        volDb: '0.00 dB',
        fxChain: ['TDR Kotelnikov -> AtomicReverbFree -> kHs Limiter'],
      },
      {
        id: 'sum-back',
        name: 'Back Vox Folder (4ch)',
        input: 'Bus 2',
        pan: 'Stereo Spread',
        volDb: '-1.20 dB',
        fxChain: ['TDR Kotelnikov -> Magic Switch -> AtomicReverbFree -> kHs Stereo -> kHs Limiter'],
      },
      {
        id: 'sum-inst',
        name: 'Instruments Folder',
        input: 'Bus 3',
        pan: 'Stereo Spread',
        volDb: '-1.50 dB',
        fxChain: ['TDR Nova (-1.5dB @ 2.2kHz) -> TDR Kotelnikov -> kHs Stereo -> kHs Limiter'],
      },
      {
        id: 'sum-drums',
        name: 'Drums Folder (6ch)',
        input: 'Bus 4',
        pan: 'Stereo Spread',
        volDb: '-0.80 dB',
        fxChain: ['bx_meter -> TDR Kotelnikov -> kHs Clipper -> kHs Limiter -> AtomicReverbFree'],
      },
    ],
  },

  LEAD_VOX: {
    id: 'LEAD_VOX',
    name: 'Lead Vox Folder Bus',
    channels: '2ch Stereo Bus',
    colorHex: '#F97316',
    volDb: '0.00 dB',
    pan: 'Center',
    summary:
      'Primary preaching lapel and Worship Leader wireless handheld bus. Uses ultra-transparent TDR Kotelnikov peak/RMS compression and Bright Floor reverb.',
    eqCurveSvgPath: 'M 0 85 Q 35 45, 95 40 Q 170 60, 250 48 T 360 32',
    kotelnikovGrDb: -3.4,
    busFx: [
      {
        name: 'VST3: TDR Kotelnikov',
        vendor: 'Tokyo Dawn Labs',
        params: [
          'Threshold: -10.0 dB',
          'Ratio: 1.5:1',
          'Attack: 20 ms',
          'Release Peak: 80 ms',
          'Release RMS: 220 ms',
        ],
      },
      {
        name: 'VST3: AtomicReverbFree',
        vendor: ' Molecular Bytes',
        preset: 'Bright Floor',
        params: ['Preset: Bright Floor', 'Dry/Wet: 22.5%'],
      },
      {
        name: 'VST3: kHs Limiter',
        vendor: 'Kilohearts',
        params: ['Threshold: -1.5 dB'],
      },
    ],
    childTracks: [
      {
        id: 'lapel-wireless',
        name: 'Lapel Wireless',
        input: 'Input 1 (Pastor Lapel)',
        pan: 'Center',
        volDb: '+8.89 dB',
        fxChain: [
          'TDR Nova "4 Band Dyn" (60Hz HPF | 247Hz +4.1dB | 822Hz -1.2dB | 4.4kHz +0.1dB | 11.4kHz +2.2dB)',
          'kHs Compressor',
        ],
      },
      {
        id: 'mic-2-wireless',
        name: 'Mic 2 Wireless',
        input: 'Input 2 (AD ACT-9090U Orange Cap)',
        pan: 'Center',
        volDb: '+4.23 dB',
        fxChain: [
          'TDR Nova "4 Band Dyn" (59Hz HPF | 4.7kHz -2.6dB Dynamic De-Harsh)',
          'kHs Compressor',
        ],
      },
    ],
  },

  BACK_VOX: {
    id: 'BACK_VOX',
    name: 'Back Vox Folder Bus (4ch)',
    channels: '4ch Folder Bus',
    colorHex: '#EF4444',
    volDb: '-1.20 dB',
    pan: '13%L to 27%R Spread',
    summary:
      'Ensemble worship vocals glued with 3.0:1 TDR Kotelnikov compression, BABY Audio Magic Switch chorus, and ducked Warm Studio reverb.',
    eqCurveSvgPath: 'M 0 82 Q 45 50, 110 52 Q 220 62, 360 44',
    kotelnikovGrDb: -4.8,
    busFx: [
      {
        name: 'VST3: TDR Kotelnikov',
        vendor: 'Tokyo Dawn Labs',
        params: ['Threshold: -13.9 dB', 'Ratio: 3.0:1', 'Out Gain: +2.0 dB'],
      },
      {
        name: 'VST3: Magic Switch',
        vendor: 'BABY Audio',
        params: ['Mix: 50% (Lush Ensemble Chorus)'],
      },
      {
        name: 'VST3: AtomicReverbFree',
        vendor: 'Molecular Bytes',
        preset: 'Warm Studio',
        params: ['Preset: Warm Studio', 'Dry/Wet: 69%', 'DuckLevel: 18.5%'],
      },
      {
        name: 'VST3: kHs Stereo',
        vendor: 'Kilohearts',
        params: ['Width: 118%'],
      },
      {
        name: 'VST3: kHs Limiter',
        vendor: 'Kilohearts',
        params: ['Ceiling: -2.0 dB'],
      },
    ],
    childTracks: [
      {
        id: 'mic-1-wl',
        name: 'Mic 1 Wireless',
        input: 'Input 1',
        pan: 'Center',
        volDb: '0.00 dB',
        fxChain: ['TDR Nova "4 Band Dyn"', 'kHs Compressor'],
      },
      {
        id: 'mic-3-wl',
        name: 'Mic 3 Wireless',
        input: 'Input 3',
        pan: '13% L',
        volDb: '-0.50 dB',
        fxChain: ['TDR Nova "4 Band Dyn"', 'kHs Compressor'],
      },
      {
        id: 'mic-4-wl',
        name: 'Mic 4 Wireless',
        input: 'Input 4',
        pan: '15% L',
        volDb: '-0.80 dB',
        fxChain: ['TDR Nova "4 Band Dyn"', 'kHs Compressor'],
      },
      {
        id: 'mic-5-wl',
        name: 'Mic 5 Wireless',
        input: 'Input 5',
        pan: '22% R',
        volDb: '-1.00 dB',
        fxChain: ['TDR Nova "4 Band Dyn"', 'kHs Compressor'],
      },
      {
        id: 'mic-7-wired',
        name: 'Mic 7 Wired',
        input: 'Input 6',
        pan: '27% R',
        volDb: '-3.00 dB',
        muted: true,
        fxChain: ['TDR Nova "4 Band Dyn"', 'kHs Compressor'],
      },
      {
        id: 'mic-8-wired',
        name: 'Mic 8 Wired',
        input: 'Input 7',
        pan: '26% R',
        volDb: '-1.50 dB',
        fxChain: ['TDR Nova "4 Band Dyn"', 'kHs Compressor'],
      },
    ],
  },

  INSTRUMENTS: {
    id: 'INSTRUMENTS',
    name: 'Instruments Folder Bus',
    channels: 'Stereo Sub-Folder Tree',
    colorHex: '#10B981',
    volDb: '-1.50 dB',
    pan: 'Stereo Image',
    summary:
      'Carves a -1.5 dB vocal pocket at 2200 Hz via TDR Nova so worship vocals sit clearly in front of Keys, Electric Guitars, Acoustic Guitar, and Bass.',
    eqCurveSvgPath: 'M 0 75 Q 50 50, 150 50 Q 235 72, 285 50 L 360 52',
    kotelnikovGrDb: -2.6,
    busFx: [
      {
        name: 'VST3: TDR Nova',
        vendor: 'Tokyo Dawn Labs',
        params: ['Band 3: -1.5 dB Bell Dip @ 2200 Hz (Vocal Pocket Carve)'],
      },
      {
        name: 'VST3: TDR Kotelnikov',
        vendor: 'Tokyo Dawn Labs',
        preset: 'Mastering - Smooth',
        params: ['Threshold: -25.0 dB', 'Ratio: 2.0:1', 'Preset: Mastering - Smooth'],
      },
      {
        name: 'VST3: kHs Stereo',
        vendor: 'Kilohearts',
        params: ['Mid/Side Balance: Wide'],
      },
      {
        name: 'VST3: kHs Limiter',
        vendor: 'Kilohearts',
        params: ['Ceiling: -1.8 dB'],
      },
    ],
    childTracks: [],
    subFolders: [
      {
        id: 'KEYS',
        name: 'KEYS Sub-Folder',
        fxChain: [
          {
            name: 'VST3: TDR Nova',
            vendor: 'Tokyo Dawn Labs',
            params: ['80 Hz HPF', '-2.0 dB Cut @ 400 Hz'],
          },
          {
            name: 'VST3: Magic Switch',
            vendor: 'BABY Audio',
            params: ['Mix: 17% (Bypassed)'],
            bypassed: true,
          },
        ],
        children: [
          {
            id: 'keys-di',
            name: 'Keys DI',
            input: 'Input 9',
            pan: 'Center',
            volDb: '0.00 dB',
            fxChain: ['Folder FX: TDR Nova (80Hz HPF, -2dB @ 400Hz)'],
          },
          {
            id: 'e-piano',
            name: 'E Piano',
            input: 'Input 24',
            pan: '28% R',
            volDb: '-4.00 dB',
            muted: true,
            fxChain: ['Folder FX: TDR Nova'],
          },
        ],
      },
      {
        id: 'ELECTRIC_G',
        name: 'Electric G. Sub-Folder',
        fxChain: [
          {
            name: 'VST3: TDR Nova',
            vendor: 'Tokyo Dawn Labs',
            params: ['100 Hz HPF', '10 kHz LPF', '+2.0 dB Presence @ 2500 Hz'],
          },
          {
            name: 'VST3: TDR Kotelnikov',
            vendor: 'Tokyo Dawn Labs',
            params: ['Threshold: -20.0 dB', 'Ratio: 2.0:1'],
          },
        ],
        children: [
          {
            id: 'gtr-leon',
            name: 'Leon (Electric G.)',
            input: 'Input 8',
            pan: '14% L',
            volDb: '-1.00 dB',
            fxChain: ['100Hz HPF | 10kHz LPF | +2.0dB @ 2.5kHz'],
          },
          {
            id: 'gtr-jerus',
            name: 'Jerus (Electric G.)',
            input: 'Input 13',
            pan: '15% R',
            volDb: '-1.20 dB',
            fxChain: ['100Hz HPF | 10kHz LPF | +2.0dB @ 2.5kHz'],
          },
        ],
      },
      {
        id: 'ACOUSTIC_G',
        name: 'Acoustic G. Sub-Folder',
        fxChain: [
          {
            name: 'VST3: bx_cleansweep V2',
            vendor: 'Plugin Alliance',
            params: ['HPF: 95 Hz', 'LPF: 16 kHz'],
          },
          {
            name: 'VST3: TDR Kotelnikov',
            vendor: 'Tokyo Dawn Labs',
            params: ['Ratio: 1.5:1'],
          },
          {
            name: 'VST3: kHs Stereo',
            vendor: 'Kilohearts',
            params: ['Stereo Enhance'],
          },
        ],
        children: [
          {
            id: 'gtr-neil-sr',
            name: 'Neil Sr (Acoustic G.)',
            input: 'Input 10',
            pan: '7% R',
            volDb: '-0.50 dB',
            fxChain: ['bx_cleansweep V2 -> TDR Kotelnikov (1.5:1) -> kHs Stereo'],
          },
        ],
      },
      {
        id: 'BASS',
        name: 'BASS Sub-Folder',
        fxChain: [
          {
            name: 'VST3: bx_subfilter',
            vendor: 'Plugin Alliance',
            preset: '11 DI Bass',
            params: ['Preset: 11 DI Bass', 'Tight Punch: Active'],
          },
          {
            name: 'VST3: TDR Nova',
            vendor: 'Tokyo Dawn Labs',
            params: ['40 Hz HPF', '+0.5 dB @ 253 Hz', '+2.7 dB Growl @ 708 Hz'],
          },
          {
            name: 'VST3: kHs Compressor',
            vendor: 'Kilohearts',
            params: ['Fast DI Leveling'],
          },
        ],
        children: [
          {
            id: 'bass-di',
            name: 'Bass',
            input: 'Input 14',
            pan: 'Center',
            volDb: '+1.00 dB',
            fxChain: ['bx_subfilter (11 DI Bass) -> TDR Nova -> kHs Compressor'],
          },
        ],
      },
    ],
  },

  DRUMS: {
    id: 'DRUMS',
    name: 'Drums Folder Bus (6ch)',
    channels: '6ch Folder Bus',
    colorHex: '#F59E0B',
    volDb: '-0.80 dB',
    pan: 'Stereo Kit Perspective',
    summary:
      'Punchy broadcast drum bus combining gated shells, sub-filtered Kick, transient-shaped Snare, and Small Drum Room ambience.',
    eqCurveSvgPath: 'M 0 80 Q 45 28, 95 65 Q 160 82, 230 52 T 360 30',
    kotelnikovGrDb: -4.1,
    busFx: [
      {
        name: 'VST3: bx_meter',
        vendor: 'Plugin Alliance',
        params: ['Peak & RMS Crest Monitor'],
      },
      {
        name: 'VST3: TDR Kotelnikov',
        vendor: 'Tokyo Dawn Labs',
        params: ['Threshold: -10.2 dB', 'Ratio: 2.0:1', 'Attack: 30 ms'],
      },
      {
        name: 'VST3: kHs Clipper',
        vendor: 'Kilohearts',
        params: ['Soft Knee Transient Catch'],
      },
      {
        name: 'VST3: kHs Limiter',
        vendor: 'Kilohearts',
        params: ['Safety Ceiling: -1.2 dB'],
      },
      {
        name: 'VST3: AtomicReverbFree',
        vendor: 'Molecular Bytes',
        preset: 'Small Drum Room',
        params: ['Preset: Small Drum Room', 'Dry/Wet: 52.5%'],
      },
    ],
    childTracks: [
      {
        id: 'drum-kick',
        name: 'Kick',
        input: 'Input 16',
        pan: 'Center',
        volDb: '+1.50 dB',
        fxChain: [
          'kHs Gate',
          'bx_subfilter (02 Bass Drum Tight)',
          'TDR Nova (30Hz HPF | +2.4dB @ 70Hz | -5.0dB @ 350Hz | +5.0dB @ 7000Hz)',
          'Wavesfactory Flash (Attack: 62.5%, Sustain: 57.4%)',
        ],
      },
      {
        id: 'drum-snare',
        name: 'Snare',
        input: 'Input 17',
        pan: 'Center',
        volDb: '+0.80 dB',
        fxChain: [
          'kHs Gate',
          'TDR Nova (59Hz HPF | 14.7kHz LPF | +2.0dB @ 200Hz | -3.0dB @ 500Hz | +4.0dB @ 7000Hz)',
          'Wavesfactory SnareBuzz (Mix: 10.9%)',
          'kHs Compressor',
        ],
      },
      {
        id: 'drum-tom-1',
        name: 'Tom 1',
        input: 'Input 18',
        pan: '18% L',
        volDb: '-2.00 dB',
        fxChain: ['kHs Gate -> SPL Free Ranger (Preset: 03 Bass Drum)'],
      },
      {
        id: 'drum-tom-2',
        name: 'Tom 2',
        input: 'Input 19',
        pan: '5% R',
        volDb: '-2.00 dB',
        fxChain: ['kHs Gate -> SPL Free Ranger (Preset: 03 Bass Drum)'],
      },
      {
        id: 'drum-floor-tom',
        name: 'Floor Tom',
        input: 'Input 22',
        pan: '25% R',
        volDb: '-1.50 dB',
        fxChain: ['kHs Gate -> SPL Free Ranger (Preset: 03 Bass Drum)'],
      },
      {
        id: 'drum-oh-1',
        name: 'OH 1 (Overhead L)',
        input: 'Input 20',
        pan: '35% L',
        volDb: '-3.50 dB',
        fxChain: ['bx_cleansweep V2 -> TDR Nova (Dynamic High-Shelf @ 4.5-4.7 kHz)'],
      },
      {
        id: 'drum-oh-2',
        name: 'OH 2 (Overhead R)',
        input: 'Input 21',
        pan: '35% R',
        volDb: '-3.50 dB',
        fxChain: ['bx_cleansweep V2 -> TDR Nova (Dynamic High-Shelf @ 4.5-4.7 kHz)'],
      },
    ],
  },
};
