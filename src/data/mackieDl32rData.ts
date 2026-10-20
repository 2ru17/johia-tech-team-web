export interface MackieCellItem {
  id: string;
  label: string;
  subLabel?: string;
  color:
    | 'white'
    | 'red'
    | 'orange'
    | 'amber'
    | 'yellow'
    | 'green'
    | 'cyan'
    | 'blue'
    | 'purple'
    | 'grey';
  defaultDb: number;
  vcaGroup?: 'VCA1_DRUMS' | 'VCA2_VOCALS' | 'VCA3_INST';
  has48v?: boolean;
}

export const MACKIE_ROW_1_OUTPUTS_FX: MackieCellItem[] = [
  { id: 'main', label: 'Main', subLabel: 'In-House PA', color: 'white', defaultDb: -3.5 },
  { id: 'aux-1-2', label: 'Stage Mic', subLabel: 'A1-2 Voice Mon', color: 'red', defaultDb: -5.0 },
  { id: 'aux-3-4', label: 'Instruments', subLabel: 'A3-4 Inst Mon', color: 'orange', defaultDb: -6.0 },
  { id: 'aux-5-6', label: 'Subwoofer', subLabel: 'A5-6 Sub Speaker', color: 'amber', defaultDb: -2.0 },
  { id: 'aux-7-8', label: 'Aux 7-8', subLabel: 'A7-8 Unused', color: 'grey', defaultDb: -20.0 },
  { id: 'aux-9', label: 'Aux 9', subLabel: 'A9 Unused', color: 'grey', defaultDb: -20.0 },
  { id: 'aux-10', label: 'Guitar Mon', subLabel: 'A10 Guitar Mon', color: 'green', defaultDb: -4.0 },
  { id: 'aux-11', label: 'Hallway', subLabel: 'A11 REAPER Ret 1-2', color: 'cyan', defaultDb: -8.0 },
  { id: 'aux-12', label: 'Aux 12', subLabel: 'A12 Unused', color: 'grey', defaultDb: -20.0 },
  { id: 'aux-13', label: 'Aux 13', subLabel: 'A13 Unused', color: 'grey', defaultDb: -20.0 },
  { id: 'aux-14', label: 'Aux 14', subLabel: 'A14 Unused', color: 'grey', defaultDb: -20.0 },
  { id: 'fx-1', label: 'FX1', subLabel: 'Plate Rev', color: 'purple', defaultDb: -6.0 },
  { id: 'fx-2', label: 'FX2', subLabel: 'Hall Rev', color: 'purple', defaultDb: -8.0 },
  { id: 'fx-3', label: 'FX3', subLabel: 'Tap Delay', color: 'purple', defaultDb: -10.0 },
  { id: 'fx-4', label: 'FX4', subLabel: 'Chorus', color: 'purple', defaultDb: -12.0 },
];

export const MACKIE_ROW_2_MATRIX_SUBS_VCA: MackieCellItem[] = [
  { id: 'mtx-1', label: 'Matrix 1', subLabel: 'Unused', color: 'grey', defaultDb: -20.0 },
  { id: 'mtx-2', label: 'Matrix 2', subLabel: 'Unused', color: 'grey', defaultDb: -20.0 },
  { id: 'mtx-3', label: 'Matrix 3', subLabel: 'Unused', color: 'grey', defaultDb: -20.0 },
  { id: 'mtx-4', label: 'Matrix 4', subLabel: 'Unused', color: 'grey', defaultDb: -20.0 },
  { id: 'mtx-5', label: 'Matrix 5', subLabel: 'Unused', color: 'grey', defaultDb: -20.0 },
  { id: 'mtx-6', label: 'Matrix 6', subLabel: 'Unused', color: 'grey', defaultDb: -20.0 },
  { id: 'sub-1', label: 'Sub 1', subLabel: 'Blue Unused', color: 'blue', defaultDb: -20.0 },
  { id: 'sub-2', label: 'Sub 2', subLabel: 'Blue Unused', color: 'blue', defaultDb: -20.0 },
  { id: 'sub-3', label: 'Sub 3', subLabel: 'Blue Unused', color: 'blue', defaultDb: -20.0 },
  { id: 'sub-4', label: 'Sub 4', subLabel: 'Blue Unused', color: 'blue', defaultDb: -20.0 },
  { id: 'sub-5', label: 'Sub 5', subLabel: 'Blue Unused', color: 'blue', defaultDb: -20.0 },
  { id: 'sub-6', label: 'Sub 6', subLabel: 'Blue Unused', color: 'blue', defaultDb: -20.0 },
  { id: 'vca-1', label: 'Drums', subLabel: 'VCA 1 View Grp', color: 'green', defaultDb: -1.5 },
  { id: 'vca-2', label: 'Vocals', subLabel: 'VCA 2 View Grp', color: 'green', defaultDb: 0.0 },
  { id: 'vca-3', label: 'Instruments', subLabel: 'VCA 3 View Grp', color: 'green', defaultDb: -2.5 },
  { id: 'vca-4', label: 'House', subLabel: 'VCA 4 View Grp', color: 'green', defaultDb: -3.5 },
  { id: 'vca-5', label: 'VCA 5', subLabel: 'VCA 5', color: 'green', defaultDb: -6.0 },
  { id: 'vca-6', label: 'VCA 6', subLabel: 'VCA 6', color: 'green', defaultDb: -6.0 },
];

export const MACKIE_ROW_3_VOCAL_BAND_INPUTS: MackieCellItem[] = [
  { id: 'lapel', label: 'Lapel', subLabel: 'Ch 1 | Pastor', color: 'purple', defaultDb: 2.0, vcaGroup: 'VCA2_VOCALS' },
  { id: 'mic-wl-1', label: 'Mic WL 1', subLabel: 'Ch 2 | BV', color: 'grey', defaultDb: -1.0, vcaGroup: 'VCA2_VOCALS' },
  { id: 'mic-wl-2', label: 'Mic WL 2', subLabel: 'Ch 3 | Orange', color: 'orange', defaultDb: 0.5, vcaGroup: 'VCA2_VOCALS' },
  { id: 'mic-wl-3', label: 'Mic WL 3', subLabel: 'Ch 4 | WL', color: 'red', defaultDb: -2.0, vcaGroup: 'VCA2_VOCALS' },
  { id: 'mic-wl-4', label: 'Mic WL 4', subLabel: 'Ch 5 | WL', color: 'blue', defaultDb: -2.5, vcaGroup: 'VCA2_VOCALS' },
  { id: 'mic-wl-5', label: 'Mic WL 5', subLabel: 'Ch 6 | WL', color: 'red', defaultDb: -3.0, vcaGroup: 'VCA2_VOCALS' },
  { id: 'mic-w-6', label: 'Mic W 6', subLabel: 'Ch 7 | Wired', color: 'grey', defaultDb: -4.0, vcaGroup: 'VCA2_VOCALS' },
  { id: 'mic-wl-7', label: 'Mic WL 7', subLabel: 'Ch 8 | Wired', color: 'grey', defaultDb: -4.5, vcaGroup: 'VCA2_VOCALS' },
  { id: 'e-guitar-1', label: 'E. Guitar', subLabel: 'Ch 9 | Leon', color: 'cyan', defaultDb: -4.5, vcaGroup: 'VCA3_INST' },
  { id: 'keys', label: 'Keys', subLabel: 'Ch 10 | DI', color: 'grey', defaultDb: -3.0, vcaGroup: 'VCA3_INST' },
  { id: 'a-guitar', label: 'A. Guitar', subLabel: 'Ch 11 | Neil Sr', color: 'grey', defaultDb: -5.0, vcaGroup: 'VCA3_INST', has48v: true },
  { id: 'guitar-12', label: 'Guitar', subLabel: 'Ch 12 | Spare', color: 'green', defaultDb: -8.0, vcaGroup: 'VCA3_INST' },
  { id: 'ch-13', label: 'Ch 13', subLabel: 'Ch 13 | Aux', color: 'grey', defaultDb: -10.0 },
  { id: 'e-guitar-2', label: 'E. Guitar', subLabel: 'Ch 14 | Jerus', color: 'cyan', defaultDb: -4.0, vcaGroup: 'VCA3_INST' },
  { id: 'bass', label: 'Bass', subLabel: 'Ch 15 | DI', color: 'grey', defaultDb: -2.0, vcaGroup: 'VCA3_INST' },
  { id: 'di-box', label: 'DI BOX', subLabel: 'Ch 16 | Stage', color: 'grey', defaultDb: -6.0, vcaGroup: 'VCA3_INST' },
  { id: 'ret-1-2', label: 'Return 1-2', subLabel: 'ST Ret A', color: 'grey', defaultDb: -5.0 },
  { id: 'ret-3-4', label: 'Return 3-4', subLabel: 'ST Ret B', color: 'grey', defaultDb: -5.0 },
];

export const MACKIE_ROW_4_DRUM_UTILITY_INPUTS: MackieCellItem[] = [
  { id: 'kick', label: 'Kick', subLabel: 'Ch 17 | Sub', color: 'grey', defaultDb: -1.0, vcaGroup: 'VCA1_DRUMS' },
  { id: 'snare', label: 'Snare', subLabel: 'Ch 18 | Top', color: 'grey', defaultDb: -2.5, vcaGroup: 'VCA1_DRUMS' },
  { id: 'tom-1', label: 'Tom 1', subLabel: 'Ch 19 | Hi', color: 'grey', defaultDb: -6.0, vcaGroup: 'VCA1_DRUMS' },
  { id: 'tom-2', label: 'Tom 2', subLabel: 'Ch 20 | Mid', color: 'grey', defaultDb: -6.0, vcaGroup: 'VCA1_DRUMS' },
  { id: 'cymbals-1', label: 'Cymbals', subLabel: 'Ch 21 | OH L', color: 'grey', defaultDb: -8.5, vcaGroup: 'VCA1_DRUMS', has48v: true },
  { id: 'cymbals-2', label: 'Cymbals', subLabel: 'Ch 22 | OH R', color: 'grey', defaultDb: -8.5, vcaGroup: 'VCA1_DRUMS', has48v: true },
  { id: 'floor-tom', label: 'Floor Tom', subLabel: 'Ch 23 | Low', color: 'grey', defaultDb: -4.5, vcaGroup: 'VCA1_DRUMS' },
  { id: 'audience', label: 'Audience', subLabel: 'Ch 24 | Amb', color: 'grey', defaultDb: -9.0, has48v: true },
  { id: 'free-1', label: 'Free', subLabel: 'Ch 25', color: 'grey', defaultDb: -20.0 },
  { id: 'free-2', label: 'Free', subLabel: 'Ch 26', color: 'grey', defaultDb: -20.0 },
  { id: 'free-3', label: 'Free2', subLabel: 'Ch 27', color: 'grey', defaultDb: -20.0 },
  { id: 'aux-in', label: 'Aux', subLabel: 'Ch 28 | PC', color: 'blue', defaultDb: -4.0 },
  { id: 'ch-31', label: 'Ch 31', subLabel: 'Ch 31 | Click', color: 'green', defaultDb: -6.0 },
  { id: 'talkback', label: 'Talkback', subLabel: 'Ch 32 | FOH', color: 'red', defaultDb: -15.0 },
];

export interface RoutingBusSpec {
  id: string;
  name: string;
  badge: string;
  color: string;
  description: string;
}

export const MACKIE_ROUTING_BUSES: RoutingBusSpec[] = [
  {
    id: 'Main',
    name: 'Main L/R House Mix',
    badge: 'LR (-3.5 dB)',
    color: 'border-white/40 bg-white/10 text-white',
    description:
      'Primary sanctuary PA mix feeding the dbx 234XL crossover -> Crown SS-800 ("Subs Amp.") and ACE LX-20 Mains.',
  },
  {
    id: 'A1/A2 Stage Mic',
    name: 'A1/A2 Stage Mic (Linked)',
    badge: 'AUX 1/2 RED',
    color: 'border-red-500/40 bg-red-500/15 text-red-300',
    description:
      'Front wedge monitor mix tailored for lead and backup vocalists on the front red carpet lip.',
  },
  {
    id: 'A7/A8 Drum Mon.',
    name: 'A7/A8 Drum Mon. (Linked)',
    badge: 'AUX 7/8 YELLOW',
    color: 'border-amber-400/40 bg-amber-400/15 text-amber-300',
    description:
      'Dedicated stereo drum riser mix. Sending Kick, Bass, Keys, and Click here locks in the band pocket.',
  },
  {
    id: 'Sub1 Drums',
    name: 'Sub 1 Drums Subgroup',
    badge: 'SUB 1 BLUE',
    color: 'border-sky-500/40 bg-sky-500/15 text-sky-300',
    description:
      'Bus compression group combining Kick, Snare, Toms, and Cymbals before hitting the Main L/R output.',
  },
  {
    id: 'VCA2 Vocals',
    name: 'VCA 2 Vocals Master',
    badge: 'VCA 2 GREEN',
    color: 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300',
    description:
      'Single-fader voltage control scaling Lapel and Mic WL 1-7 proportionally while preserving relative balance.',
  },
  {
    id: 'Matrix 1',
    name: 'Matrix 1 Broadcast / Lobby',
    badge: 'MTX 1 GREY',
    color: 'border-slate-400/40 bg-slate-500/15 text-slate-300',
    description:
      'Post-fade group distribution feeding auxiliary overflow zones and backup recording feeds.',
  },
];
