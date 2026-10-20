'use client';

import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTechBoothStore } from '@/store/useTechBoothStore';

const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform float uBlackout;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float wave1 = sin(uv.x * 3.5 + uTime * 0.45) * 0.5 + 0.5;
    float wave2 = cos(uv.y * 2.8 - uTime * 0.35 + uv.x * 1.5) * 0.5 + 0.5;
    float haze = smoothstep(0.1, 0.95, wave1 * 0.6 + wave2 * 0.4);

    vec3 baseObsidian = vec3(0.024, 0.027, 0.039);
    vec3 mixAB = mix(uColorA, uColorB, haze);
    vec3 stageGlow = mix(mixAB, uColorC, uv.y);

    // Subtle radial vignette from top stage center
    float dist = distance(uv, vec2(0.5, 0.78));
    float beamMask = smoothstep(0.95, 0.05, dist) * 0.28 * (1.0 - uBlackout * 0.92);

    vec3 finalColor = mix(baseObsidian, stageGlow, beamMask);
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function WorshipHazeShaderPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const colors = useTechBoothStore((s) => s.dmxState.colors);
  const blackout = useTechBoothStore((s) => s.dmxState.blackout);
  const speed = useTechBoothStore((s) => s.dmxState.speed);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color('#F59E0B') },
      uColorB: { value: new THREE.Color('#10B981') },
      uColorC: { value: new THREE.Color('#1E1B4B') },
      uBlackout: { value: 0 },
    }),
    []
  );

  useFrame((_, delta) => {
    const mat = materialRef.current;
    if (!mat) return;
    mat.uniforms.uTime.value += delta * (0.4 + (speed / 100) * 1.2);
    mat.uniforms.uColorA.value.lerp(new THREE.Color(colors[0]), 0.06);
    mat.uniforms.uColorB.value.lerp(new THREE.Color(colors[1]), 0.06);
    mat.uniforms.uColorC.value.lerp(new THREE.Color(colors[2]), 0.06);
    mat.uniforms.uBlackout.value = THREE.MathUtils.lerp(
      mat.uniforms.uBlackout.value,
      blackout ? 1.0 : 0.0,
      0.1
    );
  });

  return (
    <mesh position={[0, 0, -2]}>
      <planeGeometry args={[18, 12, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

export function PersistentBoothCanvas() {
  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#06070A]"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <WorshipHazeShaderPlane />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,transparent_20%,#06070A_90%)] opacity-80" />
    </div>
  );
}
