import { useRef, type ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type WanderState = 'walk' | 'turn' | 'idle';

function lerpAngle(from: number, to: number, t: number): number {
  let diff = to - from;
  while (diff > Math.PI) diff -= Math.PI * 2;
  while (diff < -Math.PI) diff += Math.PI * 2;
  return from + diff * Math.min(t, 1);
}

interface WanderGroupProps {
  spawn: [number, number, number];
  speed?: number;
  radius?: number;
  hop?: boolean;
  paused?: boolean;
  faceTarget?: () => [number, number] | null;
  children: ReactNode;
}

export function WanderGroup({
  spawn,
  speed = 1.2,
  radius = 6,
  hop = false,
  paused = false,
  faceTarget,
  children,
}: WanderGroupProps) {
  const ref = useRef<THREE.Group>(null);
  const pos = useRef({ x: spawn[0], z: spawn[2] });
  const heading = useRef(((spawn[0] * 7 + spawn[2] * 13) % (Math.PI * 2)) + Math.PI);
  const walkPhase = useRef(0);
  const behavior = useRef<{ state: WanderState; timer: number; turnDir: number }>({
    state: 'walk',
    timer: 1 + Math.random() * 2,
    turnDir: 1,
  });

  useFrame((_, delta) => {
    if (!ref.current) return;
    const b = behavior.current;

    if (!paused) {
      b.timer -= delta;
      if (b.timer <= 0) {
        const roll = Math.random();
        if (roll < 0.28) {
          b.state = 'turn';
          b.turnDir = Math.random() < 0.5 ? -1 : 1;
          b.timer = 0.5 + Math.random() * 0.7;
        } else if (roll < 0.42) {
          b.state = 'idle';
          b.timer = 0.8 + Math.random() * 1.5;
        } else {
          b.state = 'walk';
          b.timer = 1.5 + Math.random() * 2.5;
        }
      }

      const dx = spawn[0] - pos.current.x;
      const dz = spawn[2] - pos.current.z;
      const distFromHome = Math.hypot(dx, dz);

      if (distFromHome > radius) {
        const targetHeading = Math.atan2(dx, dz);
        heading.current = lerpAngle(heading.current, targetHeading, 4 * delta);
        pos.current.x += Math.sin(heading.current) * speed * delta;
        pos.current.z += Math.cos(heading.current) * speed * delta;
        if (hop) walkPhase.current += delta * 10;
      } else if (b.state === 'turn') {
        heading.current += b.turnDir * 2 * delta;
      } else if (b.state === 'walk') {
        pos.current.x += Math.sin(heading.current) * speed * delta;
        pos.current.z += Math.cos(heading.current) * speed * delta;
        if (hop) walkPhase.current += delta * 10;
      }
    }

    let y = spawn[1];
    if (!paused && hop && b.state === 'walk') {
      y += Math.abs(Math.sin(walkPhase.current)) * 0.05;
    }

    ref.current.position.set(pos.current.x, y, pos.current.z);

    const target = faceTarget?.();
    if (target) {
      ref.current.rotation.y = Math.atan2(target[0] - pos.current.x, target[1] - pos.current.z);
    } else {
      ref.current.rotation.y = heading.current;
    }
  });

  return <group ref={ref}>{children}</group>;
}
