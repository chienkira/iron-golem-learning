import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function StormCloud({
  position,
  scale = 1,
  speed = 0.25,
  range = 10,
  direction = 1,
}: {
  position: [number, number, number];
  scale?: number;
  speed?: number;
  range?: number;
  direction?: 1 | -1;
}) {
  const ref = useRef<THREE.Group>(null);
  const startX = useRef(position[0]);
  const startZ = useRef(position[2]);
  const phase = useRef(Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * speed + phase.current;
    ref.current.position.x = startX.current + Math.sin(t) * range * direction;
    ref.current.position.z = startZ.current + Math.sin(t * 0.7) * (range * 0.35);
  });

  const cloudColor = '#3d4a5c';

  return (
    <group ref={ref} position={position} scale={scale}>
      {[[0, 0, 0], [1.5, 0.2, 0], [-1.2, 0.1, 0.5], [0.6, 0.3, -0.8], [-0.5, 0.15, -0.4]].map(
        ([x, y, z], i) => (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[1 + i * 0.12, 8, 8]} />
            <meshStandardMaterial color={cloudColor} roughness={1} />
          </mesh>
        ),
      )}
    </group>
  );
}

const COMBAT_CLOUDS: {
  position: [number, number, number];
  scale: number;
  speed: number;
  range: number;
  direction: 1 | -1;
}[] = [
  { position: [-8, 7, -4], scale: 1.4, speed: 0.22, range: 11, direction: 1 },
  { position: [4, 7.5, 2], scale: 1.8, speed: 0.18, range: 13, direction: -1 },
  { position: [-2, 8.5, -8], scale: 1.2, speed: 0.28, range: 9, direction: 1 },
  { position: [10, 6.5, -2], scale: 1.5, speed: 0.2, range: 12, direction: -1 },
  { position: [-12, 8, 1], scale: 1.6, speed: 0.24, range: 10, direction: -1 },
  { position: [6, 7.2, -6], scale: 1.3, speed: 0.26, range: 11, direction: 1 },
  { position: [0, 9, -3], scale: 2.0, speed: 0.16, range: 14, direction: -1 },
  { position: [-6, 6.8, 4], scale: 1.1, speed: 0.3, range: 8, direction: 1 },
  { position: [12, 8.5, -5], scale: 1.7, speed: 0.21, range: 12, direction: 1 },
  { position: [-10, 7, 3], scale: 1.4, speed: 0.19, range: 13, direction: -1 },
];

export function StormSky() {
  return (
    <group>
      {COMBAT_CLOUDS.map((cloud, i) => (
        <StormCloud key={i} {...cloud} />
      ))}
    </group>
  );
}

export function LightningFlash() {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const nextFlash = useRef(2 + Math.random() * 3);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (t > nextFlash.current) {
      nextFlash.current = t + 2.5 + Math.random() * 4;
      if (lightRef.current) {
        lightRef.current.intensity = 3.5;
        setTimeout(() => {
          if (lightRef.current) lightRef.current.intensity = 0;
        }, 80);
        setTimeout(() => {
          if (lightRef.current) lightRef.current.intensity = 1.8;
        }, 140);
        setTimeout(() => {
          if (lightRef.current) lightRef.current.intensity = 0;
        }, 200);
      }
    }
  });

  return (
    <directionalLight
      ref={lightRef}
      position={[0, 20, 5]}
      intensity={0}
      color="#e3f2fd"
    />
  );
}
