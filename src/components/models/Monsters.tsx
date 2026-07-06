import { useRef } from 'react';
import type { ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { MonsterType } from '../../types/game';
import { MONSTER_CONFIGS } from '../../types/game';
import { VoxelBox } from './IronGolem';

interface MonsterModelProps {
  type: MonsterType;
  animated?: boolean;
  position?: [number, number, number];
  scale?: number;
}

function CreeperModel({ animated, scale = 1 }: { animated?: boolean; scale?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!ref.current || !animated) return;
    ref.current.position.y = Math.sin(Date.now() * 0.003) * 0.05;
  });

  return (
    <group ref={ref} scale={scale}>
      <VoxelBox position={[0, 0.5, 0]} size={[0.8, 1.0, 0.5]} color="#5d8a3c" />
      <VoxelBox position={[0, 1.3, 0]} size={[0.7, 0.7, 0.7]} color="#5d8a3c" />
      <VoxelBox position={[-0.15, 1.45, 0.36]} size={[0.12, 0.15, 0.05]} color="#1a1a1a" />
      <VoxelBox position={[0.15, 1.45, 0.36]} size={[0.12, 0.15, 0.05]} color="#1a1a1a" />
      <VoxelBox position={[0, 1.25, 0.36]} size={[0.08, 0.12, 0.05]} color="#1a1a1a" />
      <VoxelBox position={[-0.3, 0.5, 0.15]} size={[0.3, 0.8, 0.3]} color="#4a7030" />
      <VoxelBox position={[0.3, 0.5, -0.15]} size={[0.3, 0.8, 0.3]} color="#4a7030" />
      <VoxelBox position={[-0.15, 0.5, -0.3]} size={[0.3, 0.8, 0.3]} color="#4a7030" />
      <VoxelBox position={[0.15, 0.5, 0.3]} size={[0.3, 0.8, 0.3]} color="#4a7030" />
    </group>
  );
}

function BeeModel({ animated, scale = 1 }: { animated?: boolean; scale?: number }) {
  const ref = useRef<THREE.Group>(null);
  const wingRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!ref.current || !animated) return;
    const t = Date.now() * 0.004;
    ref.current.position.y = 0.8 + Math.sin(t * 2) * 0.12;
    ref.current.rotation.y = Math.sin(t * 0.5) * 0.15;
    if (wingRef.current) {
      wingRef.current.rotation.z = Math.sin(t * 20) * 0.4;
    }
  });

  const yellow = '#ffd700';
  const yellowDark = '#f9a825';
  const black = '#1a1a1a';

  return (
    <group ref={ref} scale={scale}>
      <group ref={wingRef} position={[0, 0.9, 0]}>
        <mesh position={[-0.55, 0.1, 0]} rotation={[0, 0, 0.3]}>
          <boxGeometry args={[0.5, 0.04, 0.35]} />
          <meshStandardMaterial color="#e3f2fd" transparent opacity={0.7} />
        </mesh>
        <mesh position={[0.55, 0.1, 0]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.5, 0.04, 0.35]} />
          <meshStandardMaterial color="#e3f2fd" transparent opacity={0.7} />
        </mesh>
      </group>
      <VoxelBox position={[0, 0.55, 0]} size={[0.55, 0.45, 0.75]} color={yellow} />
      <VoxelBox position={[0, 0.55, 0.1]} size={[0.58, 0.15, 0.78]} color={black} />
      <VoxelBox position={[0, 0.7, 0.1]} size={[0.58, 0.12, 0.78]} color={yellowDark} />
      <VoxelBox position={[0, 0.85, 0]} size={[0.5, 0.4, 0.5]} color={yellow} />
      <VoxelBox position={[0, 0.85, 0.08]} size={[0.52, 0.12, 0.52]} color={black} />
      <VoxelBox position={[-0.1, 1.05, 0.26]} size={[0.1, 0.1, 0.05]} color="#1a1a1a" />
      <VoxelBox position={[0.1, 1.05, 0.26]} size={[0.1, 0.1, 0.05]} color="#1a1a1a" />
      <VoxelBox position={[0, 0.95, 0.28]} size={[0.08, 0.06, 0.06]} color={black} />
      <VoxelBox position={[-0.08, 1.15, 0]} size={[0.08, 0.12, 0.08]} color={black} />
      <VoxelBox position={[0.08, 1.15, 0]} size={[0.08, 0.12, 0.08]} color={black} />
      <VoxelBox position={[0, 0.35, -0.45]} size={[0.12, 0.12, 0.2]} color={yellowDark} emissive="#ff9800" emissiveIntensity={0.4} />
    </group>
  );
}

function ZombieModel({ animated, scale = 1 }: { animated?: boolean; scale?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!ref.current || !animated) return;
    ref.current.rotation.z = Math.sin(Date.now() * 0.002) * 0.05;
    ref.current.position.y = Math.abs(Math.sin(Date.now() * 0.004)) * 0.08;
  });

  return (
    <group ref={ref} scale={scale}>
      <VoxelBox position={[0, 0.55, 0]} size={[0.7, 1.1, 0.5]} color="#4a7c59" />
      <VoxelBox position={[-0.4, 0.55, 0]} size={[0.25, 1.0, 0.25]} color="#3d6b4a" />
      <VoxelBox position={[0.4, 0.55, 0]} size={[0.25, 1.0, 0.25]} color="#3d6b4a" />
      <VoxelBox position={[0, 1.35, 0]} size={[0.75, 0.75, 0.75]} color="#4a7c59" />
      <VoxelBox position={[-0.15, 1.42, 0.38]} size={[0.12, 0.1, 0.05]} color="#1b5e20" emissive="#4caf50" emissiveIntensity={0.3} />
      <VoxelBox position={[0.15, 1.42, 0.38]} size={[0.12, 0.1, 0.05]} color="#1b5e20" emissive="#4caf50" emissiveIntensity={0.3} />
      <VoxelBox position={[0, 1.2, 0.38]} size={[0.1, 0.08, 0.05]} color="#2d4a35" />
    </group>
  );
}

function EndermanModel({ animated, scale = 1 }: { animated?: boolean; scale?: number }) {
  const ref = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (!ref.current || !animated) return;
    ref.current.position.y = Math.sin(Date.now() * 0.002) * 0.15;
    if (glowRef.current) {
      glowRef.current.intensity = 1.5 + Math.sin(Date.now() * 0.005) * 0.5;
    }
  });

  return (
    <group ref={ref} scale={scale}>
      <pointLight ref={glowRef} position={[0, 2, 0]} color="#9c27b0" intensity={1.5} distance={5} />
      <VoxelBox position={[0, 1.2, 0]} size={[0.5, 2.4, 0.35]} color="#1a1a2e" />
      <VoxelBox position={[-0.5, 1.2, 0]} size={[0.2, 2.2, 0.2]} color="#1a1a2e" />
      <VoxelBox position={[0.5, 1.2, 0]} size={[0.2, 2.2, 0.2]} color="#1a1a2e" />
      <VoxelBox position={[0, 2.6, 0]} size={[0.55, 0.55, 0.55]} color="#1a1a2e" />
      <VoxelBox position={[-0.12, 2.65, 0.28]} size={[0.15, 0.08, 0.05]} color="#e040fb" emissive="#e040fb" emissiveIntensity={1} />
      <VoxelBox position={[0.12, 2.65, 0.28]} size={[0.15, 0.08, 0.05]} color="#e040fb" emissive="#e040fb" emissiveIntensity={1} />
    </group>
  );
}

export function MonsterModel({ type, animated = true, position = [0, 0, 0], scale }: MonsterModelProps) {
  const resolvedType = ((type as string) === 'skeleton' ? 'bee' : type) as MonsterType;
  const config = MONSTER_CONFIGS[resolvedType];
  const s = scale ?? config.scale;

  const models: Record<MonsterType, ReactNode> = {
    creeper: <CreeperModel animated={animated} scale={s} />,
    bee: <BeeModel animated={animated} scale={s} />,
    zombie: <ZombieModel animated={animated} scale={s} />,
    enderman: <EndermanModel animated={animated} scale={s} />,
  };

  return <group position={position}>{models[resolvedType]}</group>;
}
