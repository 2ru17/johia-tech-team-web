'use client';

import { create } from 'zustand';

export type ChapterId =
  | '01-STAGE'
  | '02-RF'
  | '03-RACK'
  | '04-FOH'
  | '05-DMX'
  | '06-REAPER'
  | '07-OBS'
  | '08-JOIN';

export type ReaperBusId =
  | 'MASTER'
  | 'OUT_ALL'
  | 'LEAD_VOX'
  | 'BACK_VOX'
  | 'INSTRUMENTS'
  | 'DRUMS';

export type ReaperSubFolderId =
  | 'KEYS'
  | 'ELECTRIC_G'
  | 'ACOUSTIC_G'
  | 'BASS';

export interface RackPowerState {
  yk110: boolean[];
  receiversOn: boolean;
  dl32rOn: boolean;
  dodEqOn: boolean;
  dbx234xlOn: boolean;
  crownSubsOn: boolean;
  aceLx20On: boolean;
  popWarning: string | null;
}

export interface ChannelFaderState {
  db: number;
  muted: boolean;
  solo: boolean;
}

export interface FohState {
  viewMode: 'GRID' | 'STRIP';
  activeBus: string;
  masterFaderDb: number;
  mutedGroups: boolean[];
  channelFaders: Record<string, ChannelFaderState>;
}

export interface DmxState {
  activeScene: number;
  activeChase: number | null;
  scannerPage: '1-12' | '13-24';
  activeScanners: number[];
  blackout: boolean;
  faders: number[];
  speed: number;
  fadeTime: number;
  colors: [string, string, string];
}

export interface ReaperState {
  selectedBus: ReaperBusId;
  activeSubFolder: ReaperSubFolderId;
  reaStreamEnabled: boolean;
  lufs: number;
}

export interface ObsState {
  studioMode: boolean;
  previewScene: string;
  programScene: string;
  previewSlideIndex: number;
  programSlideIndex: number;
  transitionMs: number;
  isStreaming: boolean;
  isRecording: boolean;
}

export interface OnboardingSelection {
  primaryRole: string;
  secondaryRole: string;
  experience: string;
}

export interface TechBoothStore {
  activeChapter: ChapterId;
  selectedStageHotspot: string | null;
  batteriesLoaded: {
    shurePg58: boolean;
    adAct9090u: boolean;
  };
  colorMatched: boolean;
  rfSynced: boolean;
  rackPower: RackPowerState;
  fohState: FohState;
  dmxState: DmxState;
  reaperState: ReaperState;
  obsState: ObsState;
  onboardingSelection: OnboardingSelection;

  // Actions
  setActiveChapter: (chapter: ChapterId) => void;
  setSelectedStageHotspot: (hotspot: string | null) => void;
  loadBattery: (mic: 'shurePg58' | 'adAct9090u', loaded?: boolean) => void;
  setColorMatched: (matched: boolean) => void;
  setRfSynced: (synced: boolean) => void;

  // Rack actions
  toggleRackUnit: (
    unit:
      | 'receiversOn'
      | 'dl32rOn'
      | 'dodEqOn'
      | 'dbx234xlOn'
      | 'crownSubsOn'
      | 'aceLx20On'
  ) => void;
  toggleYk110Switch: (index: number) => void;
  powerAllSafeSequence: () => void;
  powerDownSafeSequence: () => void;
  clearPopWarning: () => void;

  // FOH actions
  setFohViewMode: (mode: 'GRID' | 'STRIP') => void;
  setFohActiveBus: (bus: string) => void;
  setMasterFaderDb: (db: number) => void;
  toggleMuteGroup: (groupIndex: number) => void;
  updateChannelFader: (
    channelId: string,
    patch: Partial<ChannelFaderState>
  ) => void;

  // DMX actions
  setDmxScene: (scene: number, colors: [string, string, string], faders?: number[]) => void;
  setDmxChase: (chase: number | null) => void;
  toggleDmxScannerPage: () => void;
  toggleDmxScanner: (scanNum: number) => void;
  toggleDmxBlackout: () => void;
  setDmxFader: (index: number, value: number) => void;
  setDmxSpeed: (speed: number) => void;
  setDmxFadeTime: (fadeTime: number) => void;

  // REAPER actions
  setReaperSelectedBus: (bus: ReaperBusId) => void;
  setReaperSubFolder: (folder: ReaperSubFolderId) => void;
  toggleReaStream: () => void;
  setReaperLufs: (lufs: number) => void;

  // OBS actions
  setObsStudioMode: (enabled: boolean) => void;
  setObsPreviewScene: (scene: string) => void;
  setObsPreviewSlideIndex: (index: number) => void;
  triggerObsTransition: () => void;
  setObsTransitionMs: (ms: number) => void;
  toggleObsStreaming: () => void;
  toggleObsRecording: () => void;

  // Onboarding actions
  setOnboardingSelection: (patch: Partial<OnboardingSelection>) => void;
}

const DEFAULT_CHANNELS: Record<string, ChannelFaderState> = {
  main: { db: -3.5, muted: false, solo: false },
  'aux-1-2': { db: -5.0, muted: false, solo: false },
  'aux-3-4': { db: -6.0, muted: false, solo: false },
  'aux-5-6': { db: -2.0, muted: false, solo: false },
  'aux-7-8': { db: -4.5, muted: false, solo: false },
  'aux-9': { db: -3.0, muted: false, solo: false },
  'aux-10': { db: -4.0, muted: false, solo: false },
  'aux-11': { db: -8.0, muted: false, solo: false },
  'vca-1': { db: -1.5, muted: false, solo: false },
  'vca-2': { db: 0.0, muted: false, solo: false },
  'vca-3': { db: -2.5, muted: false, solo: false },
  'vca-4': { db: -3.5, muted: false, solo: false },
  lapel: { db: 2.0, muted: false, solo: false },
  'mic-wl-1': { db: -1.0, muted: false, solo: false },
  'mic-wl-2': { db: 0.5, muted: false, solo: false },
  'mic-wl-3': { db: -2.0, muted: false, solo: false },
  'mic-wl-4': { db: -2.5, muted: false, solo: false },
  'mic-wl-5': { db: -3.0, muted: false, solo: false },
  'e-guitar-1': { db: -4.5, muted: false, solo: false },
  keys: { db: -3.0, muted: false, solo: false },
  'a-guitar': { db: -5.0, muted: false, solo: false },
  bass: { db: -2.0, muted: false, solo: false },
  kick: { db: -1.0, muted: false, solo: false },
  snare: { db: -2.5, muted: false, solo: false },
  'tom-1': { db: -6.0, muted: false, solo: false },
  'tom-2': { db: -6.0, muted: false, solo: false },
  cymbals: { db: -8.5, muted: false, solo: false },
  'floor-tom': { db: -4.5, muted: false, solo: false },
  talkback: { db: -15.0, muted: true, solo: false },
};

export const useTechBoothStore = create<TechBoothStore>((set) => ({
  activeChapter: '01-STAGE',
  selectedStageHotspot: 'hotspot-drums',
  batteriesLoaded: {
    shurePg58: false,
    adAct9090u: false,
  },
  colorMatched: false,
  rfSynced: false,

  rackPower: {
    yk110: [true, true, true, true, true, false, false, false, false, false],
    receiversOn: true,
    dl32rOn: false,
    dodEqOn: false,
    dbx234xlOn: false,
    crownSubsOn: false,
    aceLx20On: false,
    popWarning: null,
  },

  fohState: {
    viewMode: 'GRID',
    activeBus: 'Main',
    masterFaderDb: -3.5,
    mutedGroups: [false, false, false, false, false, false],
    channelFaders: DEFAULT_CHANNELS,
  },

  dmxState: {
    activeScene: 1,
    activeChase: null,
    scannerPage: '1-12',
    activeScanners: [1, 2, 4, 5, 6, 7, 8, 9],
    blackout: false,
    faders: [85, 75, 60, 90, 80, 65, 70, 85, 50, 45, 75, 80, 60, 55, 70, 95],
    speed: 45,
    fadeTime: 25,
    colors: ['#F59E0B', '#10B981', '#1E1B4B'],
  },

  reaperState: {
    selectedBus: 'LEAD_VOX',
    activeSubFolder: 'KEYS',
    reaStreamEnabled: true,
    lufs: -13.9,
  },

  obsState: {
    studioMode: true,
    previewScene: 'Speaker + Slides',
    programScene: 'Speaker + Slides',
    previewSlideIndex: 1,
    programSlideIndex: 0,
    transitionMs: 300,
    isStreaming: true,
    isRecording: true,
  },

  onboardingSelection: {
    primaryRole: 'FOH Audio Engineer (Mackie DL32R / Master Fader)',
    secondaryRole: 'Stage & RF Specialist (Shure / AD ACT-9090U / Eneloop Ops)',
    experience: 'Complete Beginner - Teach Me Everything!',
  },

  setActiveChapter: (activeChapter) => set({ activeChapter }),
  setSelectedStageHotspot: (selectedStageHotspot) =>
    set({ selectedStageHotspot }),

  loadBattery: (mic, loaded = true) =>
    set((state) => ({
      batteriesLoaded: {
        ...state.batteriesLoaded,
        [mic]: loaded,
      },
    })),

  setColorMatched: (colorMatched) => set({ colorMatched }),
  setRfSynced: (rfSynced) => set({ rfSynced }),

  toggleRackUnit: (unit) =>
    set((state) => {
      const nextVal = !state.rackPower[unit];
      let popWarning = state.rackPower.popWarning;

      // Golden Power Rule check: Turning ON amps before DL32R mixer or Crossover is ON
      if (
        nextVal &&
        (unit === 'crownSubsOn' || unit === 'aceLx20On') &&
        (!state.rackPower.dl32rOn || !state.rackPower.dbx234xlOn)
      ) {
        popWarning =
          'TRANSIENT POP ALERT! Never power on the Crown SS-800 ("Subs Amp.") or ACE LX-20 before the Mackie DL32R Mixer & dbx 234XL Crossover are powered ON. Turning amps on first sends a dangerous DC thump to the B3 subwoofers!';
      } else if (
        // Turning OFF mixer while amps are still ON
        !nextVal &&
        (unit === 'dl32rOn' || unit === 'dbx234xlOn') &&
        (state.rackPower.crownSubsOn || state.rackPower.aceLx20On)
      ) {
        popWarning =
          'SHUTDOWN ORDER WARNING! Always turn OFF the Crown SS-800 & ACE LX-20 power amplifiers FIRST before shutting down the Mackie DL32R mixer or dbx 234XL crossover!';
      } else {
        popWarning = null;
      }

      return {
        rackPower: {
          ...state.rackPower,
          [unit]: nextVal,
          popWarning,
        },
      };
    }),

  toggleYk110Switch: (index) =>
    set((state) => {
      const nextYk = [...state.rackPower.yk110];
      nextYk[index] = !nextYk[index];
      return {
        rackPower: {
          ...state.rackPower,
          yk110: nextYk,
        },
      };
    }),

  powerAllSafeSequence: () =>
    set({
      rackPower: {
        yk110: [true, true, true, true, true, true, true, true, true, true],
        receiversOn: true,
        dl32rOn: true,
        dodEqOn: true,
        dbx234xlOn: true,
        crownSubsOn: true,
        aceLx20On: true,
        popWarning: null,
      },
    }),

  powerDownSafeSequence: () =>
    set({
      rackPower: {
        yk110: [false, false, false, false, false, false, false, false, false, false],
        receiversOn: false,
        dl32rOn: false,
        dodEqOn: false,
        dbx234xlOn: false,
        crownSubsOn: false,
        aceLx20On: false,
        popWarning: null,
      },
    }),

  clearPopWarning: () =>
    set((state) => ({
      rackPower: {
        ...state.rackPower,
        popWarning: null,
      },
    })),

  setFohViewMode: (viewMode) =>
    set((state) => ({
      fohState: { ...state.fohState, viewMode },
    })),

  setFohActiveBus: (activeBus) =>
    set((state) => ({
      fohState: { ...state.fohState, activeBus },
    })),

  setMasterFaderDb: (masterFaderDb) =>
    set((state) => ({
      fohState: { ...state.fohState, masterFaderDb },
    })),

  toggleMuteGroup: (groupIndex) =>
    set((state) => {
      const next = [...state.fohState.mutedGroups];
      next[groupIndex] = !next[groupIndex];
      return {
        fohState: {
          ...state.fohState,
          mutedGroups: next,
        },
      };
    }),

  updateChannelFader: (channelId, patch) =>
    set((state) => {
      const existing = state.fohState.channelFaders[channelId] ?? {
        db: -5.0,
        muted: false,
        solo: false,
      };
      return {
        fohState: {
          ...state.fohState,
          channelFaders: {
            ...state.fohState.channelFaders,
            [channelId]: { ...existing, ...patch },
          },
        },
      };
    }),

  setDmxScene: (activeScene, colors, faders) =>
    set((state) => ({
      dmxState: {
        ...state.dmxState,
        activeScene,
        blackout: false,
        colors,
        faders: faders ?? state.dmxState.faders,
      },
    })),

  setDmxChase: (activeChase) =>
    set((state) => ({
      dmxState: { ...state.dmxState, activeChase, blackout: false },
    })),

  toggleDmxScannerPage: () =>
    set((state) => ({
      dmxState: {
        ...state.dmxState,
        scannerPage: state.dmxState.scannerPage === '1-12' ? '13-24' : '1-12',
      },
    })),

  toggleDmxScanner: (scanNum) =>
    set((state) => {
      const exists = state.dmxState.activeScanners.includes(scanNum);
      const activeScanners = exists
        ? state.dmxState.activeScanners.filter((s) => s !== scanNum)
        : [...state.dmxState.activeScanners, scanNum];
      return {
        dmxState: {
          ...state.dmxState,
          activeScanners,
        },
      };
    }),

  toggleDmxBlackout: () =>
    set((state) => ({
      dmxState: {
        ...state.dmxState,
        blackout: !state.dmxState.blackout,
      },
    })),

  setDmxFader: (index, value) =>
    set((state) => {
      const nextFaders = [...state.dmxState.faders];
      nextFaders[index] = value;
      return {
        dmxState: {
          ...state.dmxState,
          faders: nextFaders,
        },
      };
    }),

  setDmxSpeed: (speed) =>
    set((state) => ({
      dmxState: { ...state.dmxState, speed },
    })),

  setDmxFadeTime: (fadeTime) =>
    set((state) => ({
      dmxState: { ...state.dmxState, fadeTime },
    })),

  setReaperSelectedBus: (selectedBus) =>
    set((state) => ({
      reaperState: { ...state.reaperState, selectedBus },
    })),

  setReaperSubFolder: (activeSubFolder) =>
    set((state) => ({
      reaperState: { ...state.reaperState, activeSubFolder },
    })),

  toggleReaStream: () =>
    set((state) => ({
      reaperState: {
        ...state.reaperState,
        reaStreamEnabled: !state.reaperState.reaStreamEnabled,
      },
    })),

  setReaperLufs: (lufs) =>
    set((state) => ({
      reaperState: { ...state.reaperState, lufs },
    })),

  setObsStudioMode: (studioMode) =>
    set((state) => ({
      obsState: { ...state.obsState, studioMode },
    })),

  setObsPreviewScene: (previewScene) =>
    set((state) => ({
      obsState: { ...state.obsState, previewScene },
    })),

  setObsPreviewSlideIndex: (previewSlideIndex) =>
    set((state) => ({
      obsState: { ...state.obsState, previewSlideIndex },
    })),

  triggerObsTransition: () =>
    set((state) => ({
      obsState: {
        ...state.obsState,
        programScene: state.obsState.previewScene,
        programSlideIndex: state.obsState.previewSlideIndex,
      },
    })),

  setObsTransitionMs: (transitionMs) =>
    set((state) => ({
      obsState: { ...state.obsState, transitionMs },
    })),

  toggleObsStreaming: () =>
    set((state) => ({
      obsState: { ...state.obsState, isStreaming: !state.obsState.isStreaming },
    })),

  toggleObsRecording: () =>
    set((state) => ({
      obsState: { ...state.obsState, isRecording: !state.obsState.isRecording },
    })),

  setOnboardingSelection: (patch) =>
    set((state) => ({
      onboardingSelection: {
        ...state.onboardingSelection,
        ...patch,
      },
    })),
}));
