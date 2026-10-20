# johia-tech-web

JOHIA Cubao Technicals Ministry Interactive 3D Scrollytelling and Volunteer Onboarding Web Application.

## Architecture & Chapters

- **Chapter 01 - Sanctuary Stage & Acoustic Architecture:** Procedural 3D JOHIA Cubao multi-tier sanctuary stage (`@react-three/fiber` + `@react-three/drei`), 5-piece Pearl acoustic drum kit (Inputs 16-22), 4 floor wedge monitors, dual B3 subwoofers, and 5 interactive routing hotspots.
- **Chapter 02 - Pre-Service RF Wireless & Eneloop Battery Ops:** Procedural 3D Shure PG58 (Yellow Band) and AD ACT-9090U (Orange Cap) handheld microphones, vector Panasonic BQ-CC51C charger with Eneloop Pro AA cells, and 809.500 MHz UHF receiver sync simulator.
- **Chapter 03 - 19-Inch Outboard Audio Rack & Power Sequencer:** Interactive 7-unit equipment rack (RF Receivers, Mackie DL32R, DOD 15-Band Graphic EQ, dbx 234XL Crossover, Crown SS-800 "Subs Amp.", ACE LX-20 Mains Amp, and YK-110 10-Channel Power Controller) enforcing the Golden Power Rule.
- **Chapter 04 - Mackie Master Fader 32-Ch & Routing Matrix Simulator:** Overview 4-Row Grid Mode and Detailed Channel Strip Mode with VCA 1 (Drums), VCA 2 (Vocals), Mute Groups 1-6, and Right-Hand Routing Selector Drawer.
- **Chapter 05 - ShowArt DMX-384B Intelligent Lighting Controller:** 16 channel faders, Speed/Fade Time master sliders, Scenes 1-8, Chases 1-6, Blackout, and interactive JOHIA Cubao SCAN 1-9 overhead fixture plot driving global WebGL stage lighting.
- **Chapter 06 - REAPER v7.41 Livestream DAW & VST3 Chain Inspector:** Interactive `Live.rpp` (48000 Hz, 120 BPM) Mixer Control Panel, TDR Nova dynamic EQ curves, TDR Kotelnikov gain reduction metering, and ReaStream (`* local broadcast`) UDP bridge.
- **Chapter 07 - OBS Studio Mode Broadcast Switcher:** Dual-screen Preview/Program switcher with `Mark 5:1-20` scripture split-screen, quick transitions, and live ReaStream audio metering.
- **Chapter 08 - Sunday Survival Guide, Roles Bento & Volunteer Onboarding:** Interactive 3-scenario troubleshooting flowchart, 5-station ministry Bento grid, 4-week apprenticeship roadmap, and volunteer sign-up form.

## Development & Production Build

```bash
npm install --legacy-peer-deps
npm run dev
npm run build
```
