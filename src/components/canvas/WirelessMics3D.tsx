'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useTechBoothStore } from '@/store/useTechBoothStore';

function ShureMicModel({
  position,
  bandColor,
  bandLabel,
  batteryLoaded,
}: {
  position: [number, number, number];
  bandColor: string;
  bandLabel: string;
  batteryLoaded: boolean;
}) {
  return (
    <group position={position} rotation={[0, 0, 0.08]} scale={0.78}>
      {/* Tapered Matte Black Body */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.23, 0.16, 1.85, 24]} />
        <meshStandardMaterial color="#14171F" roughness={0.65} metalness={0.35} />
      </mesh>

      {/* Identification Band (White or Yellow) */}
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.238, 0.225, 0.26, 24]} />
        <meshStandardMaterial
          color={bandColor}
          roughness={0.25}
          metalness={0.15}
          emissive={bandColor}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Silver Collar Ring */}
      <mesh position={[0, 0.72, 0]}>
        <cylinderGeometry args={[0.245, 0.235, 0.09, 24]} />
        <meshStandardMaterial color="#CBD5E1" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Silver Spherical Wire Mesh Grille */}
      <mesh position={[0, 1.02, 0]}>
        <sphereGeometry args={[0.32, 20, 20]} />
        <meshStandardMaterial color="#94A3B8" metalness={0.75} roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.02, 0]}>
        <sphereGeometry args={[0.325, 14, 14]} />
        <meshBasicMaterial color="#E2E8F0" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Power LED Indicator */}
      <mesh position={[0, 0.05, 0.21]}>
        <sphereGeometry args={[0.032, 10, 10]} />
        <meshBasicMaterial color={batteryLoaded ? '#10B981' : '#EF4444'} />
      </mesh>

      {/* Bottom RF Antenna Cap */}
      <mesh position={[0, -1.25, 0]}>
        <cylinderGeometry args={[0.16, 0.14, 0.22, 20]} />
        <meshStandardMaterial color="#0F172A" roughness={0.7} />
      </mesh>

      <Html position={[0, -1.68, 0]} center distanceFactor={7}>
        <div className="bg-[#121212] border-2 border-[#F5F5F0] px-2 py-0.5 text-center whitespace-nowrap">
          <div className="font-mono text-[9px] font-black text-[#F5F5F0] uppercase">
            {bandLabel}
          </div>
        </div>
      </Html>
    </group>
  );
}

function AdActMicModel({
  position,
  capColor,
  capLabel,
  rfSynced,
}: {
  position: [number, number, number];
  capColor: string;
  capLabel: string;
  rfSynced: boolean;
}) {
  return (
    <group position={position} rotation={[0, 0, -0.08]} scale={0.78}>
      {/* Textured Dark Grey Body */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.23, 0.175, 1.78, 24]} />
        <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.45} />
      </mesh>

      {/* Color-Coded Upper Accent Ring */}
      <mesh position={[0, 0.66, 0]}>
        <cylinderGeometry args={[0.242, 0.235, 0.08, 24]} />
        <meshStandardMaterial
          color={capColor}
          metalness={0.5}
          roughness={0.25}
          emissive={capColor}
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Mid-Body Backlit LCD Screen (809.500 MHz) */}
      <mesh position={[0, 0.15, 0.205]}>
        <boxGeometry args={[0.18, 0.4, 0.03]} />
        <meshBasicMaterial color={rfSynced ? '#38BDF8' : '#0284C7'} />
      </mesh>

      {/* Steel Capsule Grille */}
      <mesh position={[0, 1.0, 0]}>
        <cylinderGeometry args={[0.29, 0.25, 0.52, 20]} />
        <meshStandardMaterial color="#94A3B8" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0, 1.26, 0]}>
        <sphereGeometry args={[0.29, 18, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#CBD5E1" metalness={0.8} roughness={0.25} />
      </mesh>

      {/* Color-Coded Bottom Identification Cap (Orange, Blue, or Pink) */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.18, 0.16, 0.34, 24]} />
        <meshStandardMaterial
          color={capColor}
          roughness={0.25}
          metalness={0.15}
          emissive={capColor}
          emissiveIntensity={0.25}
        />
      </mesh>

      <Html position={[0, -1.68, 0]} center distanceFactor={7}>
        <div className="bg-[#121212] border-2 border-[#F5F5F0] px-2 py-0.5 text-center whitespace-nowrap">
          <div className="font-mono text-[9px] font-black text-[#F5F5F0] uppercase">
            {capLabel}
          </div>
        </div>
      </Html>
    </group>
  );
}

function HandheldMicsMesh() {
  const shureGroupRef = useRef<THREE.Group>(null);
  const adGroupRef = useRef<THREE.Group>(null);
  const batteriesLoaded = useTechBoothStore((s) => s.batteriesLoaded);
  const rfSynced = useTechBoothStore((s) => s.rfSynced);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (shureGroupRef.current) {
      shureGroupRef.current.position.y = Math.sin(t * 1.2) * 0.04;
    }
    if (adGroupRef.current) {
      adGroupRef.current.position.y = Math.cos(t * 1.2) * 0.04;
    }
  });

  return (
    <group>
      {/* Left Family: 2x Shure PG58 Wireless Mics (White & Yellow) */}
      <group ref={shureGroupRef} position={[-1.45, 0.08, 0]}>
        <ShureMicModel
          position={[-0.52, 0, 0]}
          bandColor="#F8FAFC"
          bandLabel="WHITE SHURE"
          batteryLoaded={batteriesLoaded.shurePg58}
        />
        <ShureMicModel
          position={[0.52, 0, 0]}
          bandColor="#FACC15"
          bandLabel="YELLOW SHURE"
          batteryLoaded={batteriesLoaded.shurePg58}
        />
      </group>

      {/* Right Family: 3x AD ACT-9090U Wireless Mics (Orange, Blue & Pink) */}
      <group ref={adGroupRef} position={[1.15, 0.08, 0]}>
        <AdActMicModel
          position={[-0.88, 0, 0]}
          capColor="#F97316"
          capLabel="ORANGE AD"
          rfSynced={rfSynced}
        />
        <AdActMicModel
          position={[0, 0, 0]}
          capColor="#38BDF8"
          capLabel="BLUE AD"
          rfSynced={rfSynced}
        />
        <AdActMicModel
          position={[0.88, 0, 0]}
          capColor="#EC4899"
          capLabel="PINK AD"
          rfSynced={rfSynced}
        />
      </group>
    </group>
  );
}

export function WirelessMics3D() {
  return (
    <div className="relative w-full h-[360px] bg-[#080A10] overflow-hidden">
      <Canvas
        camera={{ position: [0, 0.15, 5.4], fov: 42 }}
        gl={{ antialias: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.85} />
        <directionalLight position={[3, 4, 5]} intensity={1.45} />
        <pointLight position={[-3, -2, 3]} intensity={0.8} color="#38BDF8" />
        <HandheldMicsMesh />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
      <div className="pointer-events-none absolute top-3 left-3">
        <span className="bg-[#121212] border-2 border-[#F5F5F0] px-2.5 py-1 font-mono text-[10px] font-black text-[#F7B519] uppercase tracking-widest">
          5 WIRELESS MICS // 2x SHURE (WHITE/YELLOW) + 3x AD (ORANGE/BLUE/PINK)
        </span>
      </div>
    </div>
  );
}
