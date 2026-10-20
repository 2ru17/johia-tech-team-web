export interface DmxScenePreset {
  sceneNumber: number;
  code: string;
  name: string;
  worshipContext: string;
  colors: [string, string, string];
  faders: number[];
  description: string;
}

export interface DmxScannerMapping {
  scanNumber: number;
  label: string;
  zone: string;
  fixtureType: 'WHITE_AMBER_ONLY' | 'COLORED_RGBW' | 'OFFLINE';
  faderAssignments: string[];
}

export const DMX_384B_SCENES: DmxScenePreset[] = [
  {
    sceneNumber: 1,
    code: 'SCENE 1',
    name: 'Yellow/Green-ish Preset (Soaking Worship)',
    worshipContext: 'Intimate Prayer & Soaking Worship',
    colors: ['#F59E0B', '#10B981', '#1E1B4B'],
    faders: [85, 80, 65, 90, 75, 60, 70, 85, 45, 40, 70, 75, 55, 50, 65, 90],
    description:
      'Warm gold/amber front key wash from SCAN 1 & 5 blended with emerald/gold RGBW accents across SCAN 4, 6, 7, 8 & 9.',
  },
  {
    sceneNumber: 2,
    code: 'SCENE 2',
    name: 'P&W Static Color (Praise & Celebration)',
    worshipContext: 'Upbeat Praise & Congregation Singing',
    colors: ['#06B6D4', '#3B82F6', '#EC4899'],
    faders: [95, 90, 85, 100, 85, 80, 90, 95, 70, 75, 85, 90, 80, 75, 85, 100],
    description:
      'Full static Praise & Worship palette combining royal blue and cyan stage washes with balanced warm-white facial key light.',
  },
  {
    sceneNumber: 3,
    code: 'SCENE 3',
    name: 'Magenta/Dark Preset (Communion & Altar Call)',
    worshipContext: 'Reflective Response & Communion',
    colors: ['#DB2777', '#4C1D95', '#090D16'],
    faders: [45, 35, 30, 80, 25, 75, 70, 65, 85, 30, 40, 55, 35, 40, 50, 60],
    description:
      'Deep magenta and violet atmospheric wash with lowered front white fill for reverent altar ministry moments.',
  },
  {
    sceneNumber: 4,
    code: 'SCENE 4',
    name: 'Lighter Static Preset (Acoustic & Transition)',
    worshipContext: 'Welcome, Testimonies & Mid-Tempo Songs',
    colors: ['#38BDF8', '#FBBF24', '#1E293B'],
    faders: [80, 85, 75, 70, 85, 65, 65, 75, 60, 55, 70, 70, 60, 60, 70, 85],
    description:
      'Bright, balanced pastel sky-blue and warm amber static wash keeping both the band and congregation clearly lit.',
  },
  {
    sceneNumber: 5,
    code: 'SCENE 5',
    name: 'SPEAKER Lights (Sermon / Word)',
    worshipContext: 'Preaching of the Word & OBS Camera Lock',
    colors: ['#F8FAFC', '#FDE68A', '#1E293B'],
    faders: [100, 100, 90, 45, 100, 40, 40, 50, 50, 30, 30, 40, 30, 30, 40, 95],
    description:
      'Prioritizes SCAN 1, SCAN 2, and SCAN 5 Warm White / LED White bulbs for clean 5600K broadcast skin tones in OBS.',
  },
  {
    sceneNumber: 6,
    code: 'SCENE 6',
    name: 'Praise Blinking Preset',
    worshipContext: 'High-Energy Praise Chorus Dynamic Pulse',
    colors: ['#F97316', '#3B82F6', '#9333EA'],
    faders: [95, 85, 90, 100, 80, 95, 95, 100, 100, 85, 90, 95, 80, 85, 90, 100],
    description:
      'Activates rhythmic color alternation across Front Colored Cans (SCAN 4, 6, 7) and Stage Side Bars (SCAN 8, 9).',
  },
  {
    sceneNumber: 7,
    code: 'SCENE 7',
    name: 'Worship Strobe Preset',
    worshipContext: 'Climactic Instrumental Bridge Accent',
    colors: ['#E2E8F0', '#38BDF8', '#4F46E5'],
    faders: [100, 95, 100, 100, 95, 100, 100, 100, 100, 95, 95, 100, 90, 90, 95, 100],
    description:
      'High-intensity synchronized strobe burst across RGBW par fixtures. Use sparingly for musical peak accents.',
  },
  {
    sceneNumber: 8,
    code: 'SCENE 8',
    name: 'ALL ON (Full Sanctuary Stage Wash)',
    worshipContext: 'Post-Service Fellowship & Stage Reset',
    colors: ['#FFFBEB', '#38BDF8', '#F59E0B'],
    faders: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
    description:
      'Drives all working fixtures (SCAN 1, 2, 4, 5, 6, 7, 8, 9) to full output for announcements and stage teardown.',
  },
];

export const DMX_SCANNER_MAPPINGS: DmxScannerMapping[] = [
  {
    scanNumber: 1,
    label: 'SCAN 1',
    zone: 'Farther Front (Outer Left & Right)',
    fixtureType: 'WHITE_AMBER_ONLY',
    faderAssignments: ['Faders 1, 2, 3: Individual Color Modes (White / Amber Only)'],
  },
  {
    scanNumber: 2,
    label: 'SCAN 2',
    zone: 'Stage Left (Tech Booth) & Stage Right Top',
    fixtureType: 'WHITE_AMBER_ONLY',
    faderAssignments: [
      'Fader 1: Brightness Control',
      'Faders 5, 6, 7, 8: Individual Light Bulbs',
      'Faders 5, 8: Warm White / Amber',
      'Faders 6, 7: LED White',
    ],
  },
  {
    scanNumber: 3,
    label: 'SCAN 3',
    zone: 'Unassigned / Offline Address',
    fixtureType: 'OFFLINE',
    faderAssignments: ['NOT WORKING (Bypassed on Technicals DMX Patch)'],
  },
  {
    scanNumber: 4,
    label: 'SCAN 4',
    zone: 'Front Truss Outer (Bulbs 1, 2, 9 & 10)',
    fixtureType: 'COLORED_RGBW',
    faderAssignments: [
      'Faders 1, 2, 3, 4: Colors',
      'BULB 1 & 10 -> 1: Brightness | 2: Red | 3: Green | 4: Blue',
      'BULB 2 & 9 -> 1: Red | 2: Green | 3: Blue | 4: White',
    ],
  },
  {
    scanNumber: 5,
    label: 'SCAN 5',
    zone: 'Farther Front Center (2x) + Front Truss (Bulbs 3 & 8)',
    fixtureType: 'WHITE_AMBER_ONLY',
    faderAssignments: [
      'Back Bulb (2 & 3) -> 1: Brightness | 2, 3, 4, 5: LED White & Amber White Control',
      'Front Bulb (3 & 8) -> 1: Amber | 2: LED White',
    ],
  },
  {
    scanNumber: 6,
    label: 'SCAN 6',
    zone: 'Front Truss Mid-Center (Bulbs 4 & 7)',
    fixtureType: 'COLORED_RGBW',
    faderAssignments: ['Fader 1: Red | Fader 2: Green | Fader 3: Blue | Fader 4: White'],
  },
  {
    scanNumber: 7,
    label: 'SCAN 7',
    zone: 'Front Truss Center Pair (Bulbs 5 & 6)',
    fixtureType: 'COLORED_RGBW',
    faderAssignments: ['Fader 1: Red | Fader 2: Green | Fader 3: Blue | Fader 4: White'],
  },
  {
    scanNumber: 8,
    label: 'SCAN 8',
    zone: 'Stage Left & Stage Right Mid Par',
    fixtureType: 'COLORED_RGBW',
    faderAssignments: [
      'Fader 1: Brightness Control',
      'Fader 2: Red | Fader 3: Green | Fader 4: Blue | Fader 5: White',
    ],
  },
  {
    scanNumber: 9,
    label: 'SCAN 9',
    zone: 'Stage Left & Stage Right Lower Par',
    fixtureType: 'COLORED_RGBW',
    faderAssignments: [
      'Fader 1: Brightness Control',
      'Fader 2: Red | Fader 3: Green | Fader 4: Blue | Fader 5: White',
    ],
  },
];
