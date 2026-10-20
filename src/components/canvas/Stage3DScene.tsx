'use client';

import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { useTechBoothStore } from '@/store/useTechBoothStore';

export interface Stage3DSceneProps {
  scrollProgress?: number;
  activeZoneIdx?: number;
}

function StageBadge({
  text,
  position = [0, 0, 0],
  variant = 'gold',
}: {
  text: string;
  position?: [number, number, number];
  variant?: 'gold' | 'green' | 'cyan' | 'white' | 'red';
}) {
  const styles = {
    gold: 'bg-[#F7B519] text-[#121212] border-[#121212]',
    green: 'bg-[#22C55E] text-[#121212] border-[#121212]',
    cyan: 'bg-[#38BDF8] text-[#121212] border-[#121212]',
    white: 'bg-[#F5F5F0] text-[#121212] border-[#121212]',
    red: 'bg-[#EF4444] text-[#F5F5F0] border-[#121212]',
  };

  return (
    <Html position={position} center distanceFactor={10}>
      <div
        className={`pointer-events-none whitespace-nowrap px-2 py-0.5 font-mono text-[9px] font-black uppercase border-2 shadow-[2px_2px_0px_#121212] ${styles[variant]}`}
      >
        {text}
      </div>
    </Html>
  );
}

function GuitarModel({
  position,
  rotY = 0,
  rotZ = -0.1,
  bodyColor,
  pickguardColor = '#F8FAFC',
  isAcoustic = false,
  isBass = false,
  scale = 1,
  label,
}: {
  position: [number, number, number];
  rotY?: number;
  rotZ?: number;
  bodyColor: string;
  pickguardColor?: string;
  isAcoustic?: boolean;
  isBass?: boolean;
  scale?: number;
  label?: string;
}) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    if (isAcoustic) {
      shape.moveTo(0, -0.26);
      shape.bezierCurveTo(0.22, -0.26, 0.26, -0.14, 0.23, -0.02);
      shape.bezierCurveTo(0.19, 0.05, 0.15, 0.07, 0.18, 0.14);
      shape.bezierCurveTo(0.2, 0.22, 0.14, 0.27, 0.04, 0.27);
      shape.lineTo(-0.04, 0.27);
      shape.bezierCurveTo(-0.14, 0.27, -0.2, 0.22, -0.18, 0.14);
      shape.bezierCurveTo(-0.15, 0.07, -0.19, 0.05, -0.23, -0.02);
      shape.bezierCurveTo(-0.26, -0.14, -0.22, -0.26, 0, -0.26);
    } else {
      shape.moveTo(0, -0.25);
      shape.bezierCurveTo(0.2, -0.25, 0.24, -0.13, 0.2, -0.02);
      shape.bezierCurveTo(0.16, 0.04, 0.12, 0.06, 0.16, 0.13);
      shape.bezierCurveTo(0.19, 0.21, 0.16, 0.28, 0.1, 0.27);
      shape.bezierCurveTo(0.07, 0.24, 0.06, 0.18, 0.035, 0.18);
      shape.lineTo(-0.035, 0.18);
      shape.bezierCurveTo(-0.06, 0.18, -0.08, 0.26, -0.12, 0.31);
      shape.bezierCurveTo(-0.18, 0.31, -0.2, 0.22, -0.16, 0.13);
      shape.bezierCurveTo(-0.12, 0.06, -0.16, 0.04, -0.2, -0.02);
      shape.bezierCurveTo(-0.24, -0.13, -0.2, -0.25, 0, -0.25);
    }
    return new THREE.ExtrudeGeometry(shape, {
      depth: isAcoustic ? 0.085 : 0.048,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.012,
      bevelThickness: 0.012,
    });
  }, [isAcoustic]);

  const neckLength = isBass ? 0.56 : 0.46;
  const neckY = 0.22 + neckLength / 2;
  const zFront = isAcoustic ? 0.098 : 0.062;

  return (
    <group position={position} rotation={[0, rotY, 0]} scale={scale}>
      <group position={[0, 0, -0.04]}>
        <mesh position={[-0.12, 0.2, -0.06]} rotation={[0.22, 0, -0.18]}>
          <cylinderGeometry args={[0.012, 0.012, 0.46, 8]} />
          <meshStandardMaterial color="#0F172A" metalness={0.6} />
        </mesh>
        <mesh position={[0.12, 0.2, -0.06]} rotation={[0.22, 0, 0.18]}>
          <cylinderGeometry args={[0.012, 0.012, 0.46, 8]} />
          <meshStandardMaterial color="#0F172A" metalness={0.6} />
        </mesh>
        <mesh position={[-0.1, 0.08, 0.06]}>
          <boxGeometry args={[0.025, 0.025, 0.18]} />
          <meshStandardMaterial color="#1E293B" />
        </mesh>
        <mesh position={[0.1, 0.08, 0.06]}>
          <boxGeometry args={[0.025, 0.025, 0.18]} />
          <meshStandardMaterial color="#1E293B" />
        </mesh>
      </group>

      <group position={[0, 0.3, 0]} rotation={[-0.18, 0, rotZ]}>
        <mesh geometry={geometry} position={[0, 0, -0.02]}>
          <meshStandardMaterial
            color={bodyColor}
            roughness={isAcoustic ? 0.45 : 0.25}
            metalness={isAcoustic ? 0.05 : 0.2}
          />
        </mesh>

        {isAcoustic ? (
          <group position={[0, 0.06, zFront]}>
            <mesh>
              <ringGeometry args={[0.065, 0.082, 24]} />
              <meshBasicMaterial color="#FDE68A" />
            </mesh>
            <mesh position={[0, 0, 0.001]}>
              <circleGeometry args={[0.065, 24]} />
              <meshBasicMaterial color="#090D16" />
            </mesh>
            <mesh position={[0, -0.16, 0.004]}>
              <boxGeometry args={[0.15, 0.035, 0.012]} />
              <meshStandardMaterial color="#271206" />
            </mesh>
          </group>
        ) : (
          <group position={[0, 0, zFront]}>
            <mesh position={[0.02, 0.01, 0]}>
              <circleGeometry args={[0.13, 18]} />
              <meshBasicMaterial color={pickguardColor} />
            </mesh>
            <mesh position={[0, 0.08, 0.005]}>
              <boxGeometry args={[0.095, 0.026, 0.01]} />
              <meshStandardMaterial color="#0F172A" />
            </mesh>
            <mesh position={[0, -0.01, 0.005]}>
              <boxGeometry args={[0.095, 0.026, 0.01]} />
              <meshStandardMaterial color="#0F172A" />
            </mesh>
            <mesh position={[0, -0.11, 0.006]}>
              <boxGeometry args={[0.11, 0.04, 0.014]} />
              <meshStandardMaterial color="#CBD5E1" metalness={0.85} roughness={0.2} />
            </mesh>
          </group>
        )}

        <mesh position={[0, neckY, 0.015]}>
          <boxGeometry args={[0.052, neckLength, 0.026]} />
          <meshStandardMaterial color="#FDE68A" roughness={0.5} />
        </mesh>
        <mesh position={[0, neckY, 0.03]}>
          <boxGeometry args={[0.048, neckLength, 0.008]} />
          <meshStandardMaterial color="#29170B" roughness={0.6} />
        </mesh>
        <mesh position={[0.01, 0.22 + neckLength + 0.075, 0.015]} rotation={[0, 0, -0.08]}>
          <boxGeometry args={[0.075, 0.15, 0.024]} />
          <meshStandardMaterial color={isAcoustic ? '#451A03' : bodyColor} />
        </mesh>
      </group>

      {label && <StageBadge text={label} position={[0, 1.1, 0]} variant="gold" />}
    </group>
  );
}

function MicStandModel({
  position,
  isWireless,
  capsuleColor,
}: {
  position: [number, number, number];
  isWireless: boolean;
  capsuleColor: string;
}) {
  return (
    <group position={position}>
      <mesh position={[0, 0.015, 0]}>
        <cylinderGeometry args={[0.12, 0.14, 0.03, 16]} />
        <meshStandardMaterial color="#090D16" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.48, 0]}>
        <cylinderGeometry args={[0.012, 0.014, 0.94, 10]} />
        <meshStandardMaterial color="#1E293B" metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.94, 0]}>
        <boxGeometry args={[0.04, 0.04, 0.04]} />
        <meshStandardMaterial color="#0F172A" />
      </mesh>
      <mesh position={[0, 0.99, 0.1]} rotation={[1.15, 0, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.44, 8]} />
        <meshStandardMaterial color="#334155" metalness={0.8} />
      </mesh>
      <group position={[0, 1.08, 0.28]} rotation={[0.65, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.018, 0.014, 0.14, 12]} />
          <meshStandardMaterial color="#0F172A" metalness={0.6} />
        </mesh>
        <mesh position={[0, -0.055, 0]}>
          <cylinderGeometry args={[0.016, 0.015, 0.03, 12]} />
          <meshBasicMaterial color={capsuleColor} />
        </mesh>
        <mesh position={[0, 0.085, 0]}>
          <sphereGeometry args={[0.026, 12, 12]} />
          <meshStandardMaterial
            color={isWireless ? '#E2E8F0' : '#94A3B8'}
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>
      </group>
    </group>
  );
}

function SanctuaryScene({
  scrollProgress = 0,
  activeZoneIdx,
  controlsRef,
  isAnimatingRef,
}: {
  scrollProgress: number;
  activeZoneIdx?: number;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  isAnimatingRef: React.MutableRefObject<boolean>;
}) {
  const dmxColors = useTechBoothStore((s) => s.dmxState.colors);
  const blackout = useTechBoothStore((s) => s.dmxState.blackout);

  const prevZoneRef = useRef<number | null>(null);
  const targetCamPos = useMemo(() => new THREE.Vector3(), []);
  const targetCamLook = useMemo(() => new THREE.Vector3(), []);

  const currentZone =
    activeZoneIdx !== undefined
      ? activeZoneIdx
      : scrollProgress < 0.20
      ? 0
      : scrollProgress < 0.40
      ? 1
      : scrollProgress < 0.60
      ? 2
      : scrollProgress < 0.80
      ? 3
      : 4;

  useFrame((state) => {
    if (prevZoneRef.current !== currentZone) {
      prevZoneRef.current = currentZone;
      isAnimatingRef.current = true;

      if (currentZone === 0) {
        targetCamPos.set(0, 2.75, 8.2);
        targetCamLook.set(0, 0.75, -0.4);
      } else if (currentZone === 1) {
        targetCamPos.set(-2.6, 1.75, 4.1);
        targetCamLook.set(-2.5, 0.75, -0.6);
      } else if (currentZone === 2) {
        targetCamPos.set(0, 1.55, 5.2);
        targetCamLook.set(0, 0.45, 0.5);
      } else if (currentZone === 3) {
        targetCamPos.set(2.4, 1.6, 3.8);
        targetCamLook.set(2.4, 0.6, -0.4);
      } else {
        targetCamPos.set(8.2, 1.25, 1.35);
        targetCamLook.set(6.4, 0.35, -0.45);
      }
    }

    if (!isAnimatingRef.current) return;

    state.camera.position.lerp(targetCamPos, 0.07);
    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetCamLook, 0.07);
      controlsRef.current.update();
    }

    if (
      state.camera.position.distanceTo(targetCamPos) < 0.02 &&
      controlsRef.current &&
      controlsRef.current.target.distanceTo(targetCamLook) < 0.02
    ) {
      isAnimatingRef.current = false;
    }
  });

  const lightA = blackout ? '#18181B' : dmxColors[0];
  const lightB = blackout ? '#18181B' : dmxColors[1];

  return (
    <group position={[0, -0.55, 0]}>
      <spotLight
        position={[-3.8, 4.6, 3.2]}
        angle={0.6}
        penumbra={0.6}
        intensity={blackout ? 0.15 : 4.5}
        color={lightA}
      />
      <spotLight
        position={[3.8, 4.6, 3.2]}
        angle={0.6}
        penumbra={0.6}
        intensity={blackout ? 0.15 : 4.5}
        color={lightB}
      />
      <pointLight
        position={[0, 3.2, 1.0]}
        intensity={blackout ? 0.1 : 2.8}
        color="#FFFBEB"
      />

      {/* Sanctuary Floor */}
      <mesh position={[0, -0.38, 1.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 11]} />
        <meshStandardMaterial color="#27241D" roughness={0.6} />
      </mesh>

      {/* Back Wall */}
      <group position={[0, 1.65, -2.35]}>
        <mesh position={[0, 0, -0.12]}>
          <boxGeometry args={[12.8, 3.8, 0.1]} />
          <meshStandardMaterial color="#182232" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[7.2, 3.5, 0.12]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.5} />
        </mesh>

        {[0, 1, 2].map((layer) => (
          <group
            key={`left-wing-${layer}`}
            position={[-3.25 + layer * 0.44, 0, 0.08 + layer * 0.06]}
          >
            <mesh position={[0.1, 0.82, 0]} rotation={[0, 0, -0.52]}>
              <boxGeometry args={[0.46, 1.9, 0.08]} />
              <meshStandardMaterial color="#F1F5F9" roughness={0.4} />
            </mesh>
            <mesh position={[0.05, -0.78, 0]} rotation={[0, 0, 0.42]}>
              <boxGeometry args={[0.46, 1.9, 0.08]} />
              <meshStandardMaterial color="#E2E8F0" roughness={0.45} />
            </mesh>
          </group>
        ))}
        {[0, 1, 2].map((layer) => (
          <group
            key={`right-wing-${layer}`}
            position={[3.25 - layer * 0.44, 0, 0.08 + layer * 0.06]}
          >
            <mesh position={[-0.1, 0.82, 0]} rotation={[0, 0, 0.52]}>
              <boxGeometry args={[0.46, 1.9, 0.08]} />
              <meshStandardMaterial color="#F1F5F9" roughness={0.4} />
            </mesh>
            <mesh position={[-0.05, -0.78, 0]} rotation={[0, 0, -0.42]}>
              <boxGeometry args={[0.46, 1.9, 0.08]} />
              <meshStandardMaterial color="#E2E8F0" roughness={0.45} />
            </mesh>
          </group>
        ))}

        {/* Presentation Screen */}
        <group position={[0, 0.18, 0.07]}>
          <mesh position={[0, 0, -0.01]}>
            <boxGeometry args={[3.58, 2.26, 0.02]} />
            <meshStandardMaterial color="#0F172A" metalness={0.8} roughness={0.2} />
          </mesh>

          <Html
            transform
            position={[0, 0, 0.015]}
            distanceFactor={4.1}
            pointerEvents="none"
            zIndexRange={[100, 0]}
          >
            <div
              style={{
                width: '560px',
                height: '350px',
                backgroundColor: '#0A0D14',
                border: '4px solid #38BDF8',
                boxShadow: '0 0 40px rgba(56, 189, 248, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                userSelect: 'none',
              }}
            >
              <div
                style={{
                  backgroundColor: '#0F172A',
                  padding: '6px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '2px solid #38BDF8',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: '#22C55E',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '12px',
                      fontWeight: 900,
                      color: '#F8FAFC',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    OPTOMA PROJECTOR FEED // PRESENTATION LIVE
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '10px',
                    fontWeight: 900,
                    color: '#F7B519',
                    backgroundColor: '#1E293B',
                    padding: '2px 6px',
                    border: '1px solid #38BDF8',
                  }}
                >
                  1080P ACTIVE
                </span>
              </div>

              <div
                style={{
                  flex: 1,
                  backgroundColor: '#030712',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/yippee-cat.gif"
                  alt="Yippee Cat"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: '240px',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </div>

              <div
                style={{
                  backgroundColor: '#0F172A',
                  padding: '4px 12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontFamily: 'monospace',
                  fontSize: '10px',
                  color: '#94A3B8',
                  borderTop: '1px solid #334155',
                }}
              >
                <span style={{ fontWeight: 700, color: '#F8FAFC' }}>
                  SUNDAY CELEBRATION // PRESENTATION
                </span>
                <span style={{ color: '#38BDF8', fontWeight: 700 }}>
                  PROPRESENTER / PPT ACTIVE
                </span>
              </div>
            </div>
          </Html>

          <StageBadge text="PROJECTION SCREEN" position={[0, 1.28, 0.02]} variant="white" />
        </group>

        {/* Optoma Projector */}
        <group position={[0, 1.68, 0.75]}>
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
            <meshStandardMaterial color="#CBD5E1" />
          </mesh>
          <mesh>
            <boxGeometry args={[0.38, 0.14, 0.3]} />
            <meshStandardMaterial color="#F8FAFC" />
          </mesh>
          <mesh position={[0, -0.02, -0.16]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.04, 16]} />
            <meshStandardMaterial color="#090D16" metalness={0.8} />
          </mesh>
          <mesh position={[0, -0.02, -0.185]}>
            <circleGeometry args={[0.04, 16]} />
            <meshBasicMaterial color="#38BDF8" />
          </mesh>
          <StageBadge text="OPTOMA PROJECTOR" position={[0, 0.35, 0]} variant="cyan" />
        </group>
      </group>

      {/* Columns */}
      {[-5.85, 5.85].map((colX) => (
        <group key={colX} position={[colX, 1.5, 0.4]}>
          <mesh>
            <boxGeometry args={[0.6, 3.8, 0.6]} />
            <meshStandardMaterial color="#9A5B25" roughness={0.55} />
          </mesh>
        </group>
      ))}

      {/* Red Carpeted Stage Platform */}
      <mesh position={[0, 0.02, -0.5]} receiveShadow>
        <boxGeometry args={[10.8, 0.5, 3.8]} />
        <meshStandardMaterial color="#7F1D1D" roughness={0.85} />
      </mesh>

      {/* Steps */}
      <mesh position={[0, -0.07, 1.56]}>
        <boxGeometry args={[3.6, 0.3, 0.36]} />
        <meshStandardMaterial color="#6D1818" />
      </mesh>
      <mesh position={[0, -0.16, 1.86]}>
        <boxGeometry args={[3.6, 0.18, 0.32]} />
        <meshStandardMaterial color="#5B1313" />
      </mesh>
      <mesh position={[0, -0.24, 2.12]}>
        <boxGeometry args={[3.6, 0.08, 0.28]} />
        <meshStandardMaterial color="#4A0F0F" />
      </mesh>

      {/* Subwoofers under stage */}
      {[-4.1, 4.1].map((subX) => (
        <group key={`sub-${subX}`} position={[subX, -0.1, 1.48]}>
          <mesh>
            <boxGeometry args={[0.88, 0.64, 0.62]} />
            <meshStandardMaterial color="#090D16" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.14, 0.315]}>
            <ringGeometry args={[0.08, 0.14, 24]} />
            <meshBasicMaterial color="#F7B519" />
          </mesh>
          <mesh position={[0, -0.14, 0.315]}>
            <ringGeometry args={[0.09, 0.16, 24]} />
            <meshBasicMaterial color="#EF4444" />
          </mesh>
          <StageBadge
            text={subX < 0 ? 'SUBWOOFER LEFT (A5-6)' : 'SUBWOOFER RIGHT (A5-6)'}
            position={[0, -0.45, 0.2]}
            variant="gold"
          />
        </group>
      ))}

      {/* Voice Monitors */}
      {[-1.35, 1.35].map((vx, i) => (
        <group
          key={`voice-mon-${vx}`}
          position={[vx, 0.3, 1.18]}
          rotation={[-0.42, 0, 0]}
        >
          <mesh>
            <boxGeometry args={[0.64, 0.28, 0.4]} />
            <meshStandardMaterial color="#111827" roughness={0.35} />
          </mesh>
          <mesh position={[0, 0.145, 0]}>
            <boxGeometry args={[0.56, 0.025, 0.32]} />
            <meshBasicMaterial color="#38BDF8" />
          </mesh>
          <StageBadge
            text={i === 0 ? 'VOICE MON L (A1-2)' : 'VOICE MON R (A1-2)'}
            position={[0, 0.4, 0]}
            variant="cyan"
          />
        </group>
      ))}

      {/* Instrument Monitors */}
      {[-3.15, 3.15].map((ix, i) => (
        <group
          key={`inst-mon-${ix}`}
          position={[ix, 0.3, 1.08]}
          rotation={[-0.4, ix < 0 ? 0.2 : -0.2, 0]}
        >
          <mesh>
            <boxGeometry args={[0.62, 0.26, 0.38]} />
            <meshStandardMaterial color="#111827" roughness={0.35} />
          </mesh>
          <mesh position={[0, 0.135, 0]}>
            <boxGeometry args={[0.54, 0.025, 0.3]} />
            <meshBasicMaterial color="#F7B519" />
          </mesh>
          <StageBadge
            text={i === 0 ? 'INST MON L (A3-4)' : 'INST MON R (A3-4)'}
            position={[0, 0.38, 0]}
            variant="white"
          />
        </group>
      ))}

      {/* PA Mains */}
      {[-5.05, 5.05].map((paX, i) => (
        <group key={paX} position={[paX, 0.22, 1.1]}>
          <mesh position={[0, 0.55, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 1.5, 10]} />
            <meshStandardMaterial color="#1E293B" metalness={0.7} />
          </mesh>
          <mesh position={[0, 1.65, 0]} rotation={[0, paX < 0 ? 0.2 : -0.2, 0]}>
            <boxGeometry args={[0.44, 1.5, 0.42]} />
            <meshStandardMaterial color="#090D16" roughness={0.35} />
          </mesh>
          <StageBadge
            text={i === 0 ? 'MAIN PA LEFT' : 'MAIN PA RIGHT'}
            position={[0, 2.5, 0]}
            variant="gold"
          />
        </group>
      ))}

      {/* Stage Left: Drums + Bass */}
      <group position={[-3.45, 0.3, -0.75]}>
        <mesh position={[0, -0.02, 0]}>
          <boxGeometry args={[2.5, 0.16, 1.85]} />
          <meshStandardMaterial color="#681414" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.32, 0.14]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.33, 0.33, 0.44, 24]} />
          <meshStandardMaterial color="#111827" />
        </mesh>
        <mesh position={[0, 0.32, 0.37]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.31, 0.31, 0.02, 24]} />
          <meshStandardMaterial color="#F8FAFC" />
        </mesh>
        <mesh position={[0.42, 0.38, 0.24]}>
          <cylinderGeometry args={[0.18, 0.18, 0.14, 18]} />
          <meshStandardMaterial color="#CBD5E1" metalness={0.6} />
        </mesh>
        <mesh position={[-0.16, 0.66, 0.08]} rotation={[0.3, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.16, 16]} />
          <meshStandardMaterial color="#1E293B" />
        </mesh>
        <mesh position={[0.16, 0.66, 0.08]} rotation={[0.3, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.17, 16]} />
          <meshStandardMaterial color="#1E293B" />
        </mesh>
        <mesh position={[-0.48, 0.3, 0.16]}>
          <cylinderGeometry args={[0.22, 0.22, 0.36, 18]} />
          <meshStandardMaterial color="#111827" />
        </mesh>
        {[-0.65, 0.62].map((cx) => (
          <group key={cx} position={[cx, 0.88, -0.05]}>
            <mesh rotation={[0.2, 0, cx < 0 ? -0.2 : 0.2]}>
              <cylinderGeometry args={[0.3, 0.3, 0.015, 20]} />
              <meshStandardMaterial color="#F7B519" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, -0.42, 0]}>
              <cylinderGeometry args={[0.014, 0.014, 0.84, 8]} />
              <meshStandardMaterial color="#94A3B8" />
            </mesh>
          </group>
        ))}

        <StageBadge text="PEARL DRUMS (7-MIC)" position={[0, 1.45, 0]} variant="cyan" />

        <group position={[1.65, 0.32, -0.35]}>
          <mesh>
            <boxGeometry args={[0.62, 0.68, 0.44]} />
            <meshStandardMaterial color="#0F172A" roughness={0.5} />
          </mesh>
          <mesh position={[0, -0.04, 0.225]}>
            <planeGeometry args={[0.52, 0.48]} />
            <meshStandardMaterial color="#334155" roughness={0.7} />
          </mesh>
          <StageBadge text="BASS AMP" position={[0, 0.65, 0]} variant="white" />
        </group>

        <GuitarModel
          position={[1.65, 0.02, 0.28]}
          rotY={0.12}
          rotZ={-0.12}
          bodyColor="#991B1B"
          pickguardColor="#111827"
          isBass
          scale={1.05}
          label="BASS GUITAR"
        />
      </group>

      {/* Center Stage Vocals */}
      <group position={[0, 0.26, 0.05]}>
        {[
          { x: -1.25, color: '#F8FAFC' },
          { x: -0.62, color: '#FACC15' },
          { x: 0, color: '#F97316' },
          { x: 0.62, color: '#38BDF8' },
          { x: 1.25, color: '#EC4899' },
        ].map((item, idx) => (
          <MicStandModel
            key={`wl-mic-${idx}`}
            position={[item.x, 0, 0.22]}
            isWireless
            capsuleColor={item.color}
          />
        ))}

        <StageBadge
          text="5 WIRELESS MICS (SHURE & AD)"
          position={[0, 1.55, 0.22]}
          variant="green"
        />

        {[-0.85, 0.85].map((mx, idx) => (
          <MicStandModel
            key={`wired-mic-${idx}`}
            position={[mx, 0, -0.58]}
            isWireless={false}
            capsuleColor="#94A3B8"
          />
        ))}

        <StageBadge
          text="2 WIRED BACKUP MICS"
          position={[0, 1.45, -0.58]}
          variant="white"
        />
      </group>

      {/* Stage Right: Keys + Guitars */}
      <group position={[2.45, 0.26, -0.55]}>
        <group position={[0, 0, -0.2]}>
          <mesh position={[0, 0.64, 0]}>
            <boxGeometry args={[1.32, 0.09, 0.38]} />
            <meshStandardMaterial color="#0F172A" metalness={0.5} />
          </mesh>
          <mesh position={[0, 0.69, 0.1]}>
            <boxGeometry args={[1.18, 0.02, 0.12]} />
            <meshBasicMaterial color="#F8FAFC" />
          </mesh>
          <mesh position={[0, 0.32, 0]} rotation={[0, 0, 0.45]}>
            <cylinderGeometry args={[0.02, 0.02, 0.78, 8]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
          <mesh position={[0, 0.32, 0]} rotation={[0, 0, -0.45]}>
            <cylinderGeometry args={[0.02, 0.02, 0.78, 8]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
          <StageBadge text="KEYS X-STAND (DI)" position={[0, 1.05, 0]} variant="cyan" />
        </group>

        <GuitarModel
          position={[-0.65, 0.02, 0.55]}
          rotY={-0.1}
          rotZ={-0.14}
          bodyColor="#DC2626"
          pickguardColor="#F8FAFC"
          scale={1.0}
          label="E. GUITAR 1 (RED STRAT)"
        />

        <GuitarModel
          position={[0.78, 0.02, 0.25]}
          rotY={-0.15}
          rotZ={-0.1}
          bodyColor="#111827"
          pickguardColor="#F8FAFC"
          scale={1.0}
          label="E. GUITAR 2 (BLACK TELE)"
        />

        <GuitarModel
          position={[1.68, 0.02, 0.62]}
          rotY={-0.24}
          rotZ={-0.08}
          bodyColor="#D97706"
          isAcoustic
          scale={1.06}
          label="ACOUSTIC GUITAR"
        />

        <mesh position={[2.05, 0.8, -0.95]}>
          <boxGeometry args={[0.52, 1.65, 0.42]} />
          <meshStandardMaterial color="#F1F5F9" roughness={0.3} />
        </mesh>
        <StageBadge text="FLOOR AC UNIT" position={[2.05, 1.85, -0.95]} variant="white" />
      </group>

      {/* Tech Booth Station (Behind pillar on sanctuary floor level) */}
      <group position={[6.05, -0.38, -0.65]} rotation={[0, 0.52, 0]}>
        {/* Booth Desk */}
        <mesh position={[0, 0.36, 0]}>
          <boxGeometry args={[1.55, 0.72, 0.82]} />
          <meshStandardMaterial color="#141720" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.74, 0]}>
          <boxGeometry args={[1.65, 0.04, 0.9]} />
          <meshStandardMaterial color="#090D16" roughness={0.3} metalness={0.4} />
        </mesh>

        {/* PC 1 Tower (Floor Left) */}
        <mesh position={[-0.65, 0.24, 0.05]}>
          <boxGeometry args={[0.22, 0.44, 0.46]} />
          <meshStandardMaterial color="#0B0F19" metalness={0.8} />
        </mesh>
        <mesh position={[-0.65, 0.4, 0.285]}>
          <circleGeometry args={[0.012, 12]} />
          <meshBasicMaterial color="#38BDF8" />
        </mesh>

        {/* PC 2 Tower (Floor Right) */}
        <mesh position={[0.65, 0.24, 0.05]}>
          <boxGeometry args={[0.22, 0.44, 0.46]} />
          <meshStandardMaterial color="#0B0F19" metalness={0.8} />
        </mesh>
        <mesh position={[0.65, 0.4, 0.285]}>
          <circleGeometry args={[0.012, 12]} />
          <meshBasicMaterial color="#22C55E" />
        </mesh>

        {/* Computer 1: Sound Mix / DAW Monitor */}
        <group position={[-0.38, 1.02, -0.12]} rotation={[0, 0.14, 0]}>
          <mesh>
            <boxGeometry args={[0.48, 0.32, 0.02]} />
            <meshStandardMaterial color="#090D16" />
          </mesh>
          <mesh position={[0, 0, 0.012]}>
            <planeGeometry args={[0.45, 0.29]} />
            <meshBasicMaterial color="#0284C7" />
          </mesh>
          <mesh position={[0, -0.19, -0.02]}>
            <cylinderGeometry args={[0.015, 0.015, 0.14, 8]} />
            <meshStandardMaterial color="#334155" metalness={0.8} />
          </mesh>
          <mesh position={[0, -0.26, 0]}>
            <boxGeometry args={[0.18, 0.015, 0.14]} />
            <meshStandardMaterial color="#1E293B" />
          </mesh>
        </group>

        {/* Computer 2: OBS Broadcast & Presentation Monitor */}
        <group position={[0.38, 1.02, -0.1]} rotation={[0, -0.14, 0]}>
          <mesh>
            <boxGeometry args={[0.48, 0.32, 0.02]} />
            <meshStandardMaterial color="#090D16" />
          </mesh>
          <mesh position={[0, 0, 0.012]}>
            <planeGeometry args={[0.45, 0.29]} />
            <meshBasicMaterial color="#16A34A" />
          </mesh>
          <mesh position={[0, -0.19, -0.02]}>
            <cylinderGeometry args={[0.015, 0.015, 0.14, 8]} />
            <meshStandardMaterial color="#334155" metalness={0.8} />
          </mesh>
          <mesh position={[0, -0.26, 0]}>
            <boxGeometry args={[0.18, 0.015, 0.14]} />
            <meshStandardMaterial color="#1E293B" />
          </mesh>
        </group>

        {/* Keyboards & Mice */}
        <mesh position={[-0.38, 0.77, 0.18]}>
          <boxGeometry args={[0.34, 0.015, 0.13]} />
          <meshStandardMaterial color="#1E293B" />
        </mesh>
        <mesh position={[0.38, 0.77, 0.18]}>
          <boxGeometry args={[0.34, 0.015, 0.13]} />
          <meshStandardMaterial color="#1E293B" />
        </mesh>

        {/* Center Audio Interface Pad */}
        <mesh position={[0, 0.78, 0.06]} rotation={[-0.15, 0, 0]}>
          <boxGeometry args={[0.36, 0.03, 0.28]} />
          <meshStandardMaterial color="#334155" metalness={0.7} />
        </mesh>

        {/* Operator Chair */}
        <group position={[0, 0.28, 0.78]}>
          <mesh position={[0, 0.22, 0]}>
            <boxGeometry args={[0.44, 0.08, 0.44]} />
            <meshStandardMaterial color="#0F172A" />
          </mesh>
          <mesh position={[0, 0.52, 0.19]}>
            <boxGeometry args={[0.44, 0.52, 0.06]} />
            <meshStandardMaterial color="#0F172A" />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.45, 8]} />
            <meshStandardMaterial color="#334155" metalness={0.8} />
          </mesh>
        </group>

        <StageBadge text="TECH BOOTH (2 PCS)" position={[0, 1.48, 0]} variant="gold" />

        {/* 19-Inch Outboard Audio Equipment Rack (Side of the PCs) */}
        <group position={[1.22, 0.62, 0.02]} rotation={[0, -0.18, 0]}>
          {/* Outer Road Rack Case */}
          <mesh>
            <boxGeometry args={[0.58, 1.24, 0.56]} />
            <meshStandardMaterial color="#0D1117" roughness={0.4} metalness={0.3} />
          </mesh>

          {/* Silver Corner Rack Rails */}
          {[-0.27, 0.27].map((rx) => (
            <mesh key={`rack-rail-${rx}`} position={[rx, 0, 0.27]}>
              <boxGeometry args={[0.025, 1.22, 0.025]} />
              <meshStandardMaterial color="#64748B" metalness={0.9} roughness={0.2} />
            </mesh>
          ))}

          {/* 1. TOP: Mackie DL32R 32-Channel Digital Mixer */}
          <group position={[0, 0.44, 0.26]}>
            <mesh>
              <boxGeometry args={[0.52, 0.24, 0.04]} />
              <meshStandardMaterial color="#0A0E17" metalness={0.7} roughness={0.3} />
            </mesh>
            {/* Running man logo badge */}
            <mesh position={[-0.18, 0.07, 0.022]}>
              <boxGeometry args={[0.06, 0.04, 0.005]} />
              <meshBasicMaterial color="#22C55E" />
            </mesh>
            {/* 32 XLR Input Ports Grid */}
            <mesh position={[0.04, -0.01, 0.022]}>
              <planeGeometry args={[0.36, 0.14]} />
              <meshStandardMaterial color="#1E293B" metalness={0.6} />
            </mesh>
            <StageBadge text="MACKIE DL32R (TOP)" position={[0, 0.16, 0.04]} variant="green" />
          </group>

          {/* 2. Wireless Mic Receivers (Shure + MIPRO + AD ACT-9090U) */}
          <group position={[0, 0.24, 0.26]}>
            <mesh>
              <boxGeometry args={[0.52, 0.12, 0.04]} />
              <meshStandardMaterial color="#111827" metalness={0.6} />
            </mesh>
            {/* Dual Antennas */}
            <mesh position={[-0.2, 0.09, 0]} rotation={[0, 0, -0.2]}>
              <cylinderGeometry args={[0.008, 0.006, 0.14, 6]} />
              <meshStandardMaterial color="#1E293B" />
            </mesh>
            <mesh position={[0.2, 0.09, 0]} rotation={[0, 0, 0.2]}>
              <cylinderGeometry args={[0.008, 0.006, 0.14, 6]} />
              <meshStandardMaterial color="#1E293B" />
            </mesh>
            {/* Backlit Blue LCD Screen */}
            <mesh position={[0, 0, 0.022]}>
              <planeGeometry args={[0.24, 0.05]} />
              <meshBasicMaterial color="#38BDF8" />
            </mesh>
            <StageBadge text="WIRELESS RECEIVERS" position={[0, 0.09, 0.04]} variant="cyan" />
          </group>

          {/* 3. Graphic EQ & Crossover (DOD 15-Band EQ + dbx) */}
          <group position={[0, 0.08, 0.26]}>
            <mesh>
              <boxGeometry args={[0.52, 0.14, 0.04]} />
              <meshStandardMaterial color="#0F172A" metalness={0.7} />
            </mesh>
            {/* Slider Rows */}
            <mesh position={[0, 0.02, 0.022]}>
              <planeGeometry args={[0.44, 0.03]} />
              <meshStandardMaterial color="#EF4444" />
            </mesh>
            <mesh position={[0, -0.03, 0.022]}>
              <planeGeometry args={[0.44, 0.03]} />
              <meshStandardMaterial color="#F7B519" />
            </mesh>
            <StageBadge text="DOD 15-BAND EQ" position={[0, 0.1, 0.04]} variant="white" />
          </group>

          {/* 4. Power Amplifiers (Crown SS-800 Subs Amp + ACE LX-20 Main Amp) */}
          <group position={[0, -0.12, 0.26]}>
            <mesh>
              <boxGeometry args={[0.52, 0.22, 0.04]} />
              <meshStandardMaterial color="#0A0E17" metalness={0.8} />
            </mesh>
            {/* Vented Heat Sink Slits */}
            <mesh position={[0, 0.04, 0.022]}>
              <boxGeometry args={[0.42, 0.06, 0.005]} />
              <meshStandardMaterial color="#1E293B" metalness={0.9} />
            </mesh>
            {/* Dual Volume Knobs */}
            <mesh position={[-0.14, -0.04, 0.025]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.015, 12]} />
              <meshStandardMaterial color="#F7B519" metalness={0.8} />
            </mesh>
            <mesh position={[0.14, -0.04, 0.025]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.015, 12]} />
              <meshStandardMaterial color="#F7B519" metalness={0.8} />
            </mesh>
            <StageBadge text="CROWN & ACE AMPS" position={[0, -0.06, 0.04]} variant="gold" />
          </group>

          {/* 5. BOTTOM: YK-110 Power Strip / Sequencer Controller */}
          <group position={[0, -0.34, 0.26]}>
            <mesh>
              <boxGeometry args={[0.52, 0.14, 0.04]} />
              <meshStandardMaterial color="#111827" metalness={0.6} />
            </mesh>
            {/* Red Master Rocker Switch */}
            <mesh position={[-0.18, 0, 0.024]}>
              <boxGeometry args={[0.04, 0.05, 0.012]} />
              <meshBasicMaterial color="#EF4444" />
            </mesh>
            {/* 8 Channel Sequence Indicator LEDs */}
            {[-0.08, -0.03, 0.02, 0.07, 0.12, 0.17].map((lx) => (
              <mesh key={`seq-led-${lx}`} position={[lx, 0, 0.022]}>
                <circleGeometry args={[0.008, 10]} />
                <meshBasicMaterial color="#22C55E" />
              </mesh>
            ))}
            <StageBadge text="POWER STRIP (BOTTOM)" position={[0, -0.1, 0.04]} variant="red" />
          </group>

          <StageBadge text="19-INCH AUDIO RACK" position={[0, 0.74, 0]} variant="cyan" />
        </group>
      </group>
    </group>
  );
}

export function Stage3DScene({ scrollProgress = 0, activeZoneIdx }: Stage3DSceneProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const isAnimatingRef = useRef(true);
  const [isFreeOrbit, setIsFreeOrbit] = useState(false);

  const handleOrbitStart = () => {
    isAnimatingRef.current = false;
    setIsFreeOrbit(true);
  };

  const handleResetTrack = () => {
    isAnimatingRef.current = true;
    setIsFreeOrbit(false);
  };

  return (
    <div className="relative w-full h-full min-h-[420px] bg-[#0B0D13] border-4 border-[#F5F5F0] shadow-[8px_8px_0px_#F7B519] overflow-hidden">
      <Canvas
        camera={{ position: [0, 2.75, 8.2], fov: 42 }}
        gl={{ antialias: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.78} />
        <directionalLight position={[4, 7, 6]} intensity={1.4} />

        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableDamping
          dampingFactor={0.08}
          minDistance={2.0}
          maxDistance={16}
          maxPolarAngle={Math.PI / 2.02}
          onStart={handleOrbitStart}
        />

        <SanctuaryScene
          scrollProgress={scrollProgress}
          activeZoneIdx={activeZoneIdx}
          controlsRef={controlsRef}
          isAnimatingRef={isAnimatingRef}
        />
      </Canvas>

      <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
        {isFreeOrbit ? (
          <button
            type="button"
            onClick={handleResetTrack}
            className="cursor-pointer bg-[#EF4444] text-[#F5F5F0] border-2 border-[#121212] px-2.5 py-1 font-mono text-[10px] font-black uppercase shadow-[3px_3px_0px_#121212] hover:bg-[#DC2626] transition-colors"
          >
            FREE ORBIT [RESET CAMERA]
          </button>
        ) : (
          <span className="pointer-events-none bg-[#121212] text-[#F7B519] border-2 border-[#F7B519] px-2.5 py-1 font-mono text-[10px] font-black uppercase shadow-[3px_3px_0px_#F5F5F0]">
            TRACK LOCKED // SCROLL OR CLICK BUTTON
          </span>
        )}
      </div>
    </div>
  );
}
