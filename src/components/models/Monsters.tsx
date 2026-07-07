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

  useFrame(() => {
    if (!ref.current || !animated) return;
    const t = Date.now() * 0.004;
    ref.current.position.y = 0.32 + Math.sin(t * 2) * 0.07;
    ref.current.rotation.y = Math.sin(t * 0.5) * 0.1;
  });

  const yellow = '#f8c627';
  const black = '#1a1a1a';
  const wingMat = (
    <meshStandardMaterial
      color="#eef2f8"
      transparent
      opacity={0.62}
      roughness={0.25}
      metalness={0}
      side={THREE.DoubleSide}
      depthWrite={false}
    />
  );

  const legPositions: [number, number, number][] = [
    [-0.16, 0.16, 0.08],
    [-0.16, 0.16, -0.06],
    [-0.16, 0.16, -0.2],
    [0.16, 0.16, 0.08],
    [0.16, 0.16, -0.06],
    [0.16, 0.16, -0.2],
  ];

  return (
    <group ref={ref} scale={scale}>
      {/* Head */}
      <VoxelBox position={[0, 0.38, 0.2]} size={[0.36, 0.36, 0.36]} color={yellow} />
      <VoxelBox position={[-0.1, 0.4, 0.39]} size={[0.08, 0.08, 0.02]} color={black} />
      <VoxelBox position={[0.1, 0.4, 0.39]} size={[0.08, 0.08, 0.02]} color={black} />
      {/* Antennae */}
      <VoxelBox position={[-0.09, 0.6, 0.16]} size={[0.05, 0.16, 0.05]} color={black} />
      <VoxelBox position={[0.09, 0.6, 0.16]} size={[0.05, 0.16, 0.05]} color={black} />

      {/* Thorax */}
      <VoxelBox position={[0, 0.34, -0.02]} size={[0.34, 0.3, 0.34]} color={yellow} />
      <VoxelBox position={[0, 0.34, -0.02]} size={[0.36, 0.1, 0.36]} color={black} />

      {/* Abdomen with Minecraft-style stripes */}
      <VoxelBox position={[0, 0.32, -0.24]} size={[0.32, 0.28, 0.2]} color={yellow} />
      <VoxelBox position={[0, 0.32, -0.34]} size={[0.32, 0.1, 0.22]} color={black} />
      <VoxelBox position={[0, 0.32, -0.44]} size={[0.3, 0.24, 0.18]} color={yellow} />
      <VoxelBox position={[0, 0.32, -0.52]} size={[0.3, 0.1, 0.18]} color={black} />
      <VoxelBox position={[0, 0.3, -0.6]} size={[0.26, 0.2, 0.14]} color={yellow} />
      <VoxelBox position={[0, 0.28, -0.66]} size={[0.22, 0.1, 0.12]} color={black} />

      {/* Stinger */}
      <VoxelBox position={[0, 0.26, -0.74]} size={[0.06, 0.06, 0.1]} color={black} />

      {/* Six legs */}
      {legPositions.map((pos, i) => (
        <VoxelBox key={i} position={pos} size={[0.05, 0.1, 0.05]} color={black} />
      ))}

      {/* Wings — large translucent panels like Minecraft */}
      <group position={[0, 0.38, -0.02]}>
        <mesh position={[-0.34, 0, 0.02]} rotation={[0.15, 0.1, 0.35]}>
          <boxGeometry args={[0.58, 0.025, 0.46]} />
          {wingMat}
        </mesh>
        <mesh position={[0.34, 0, 0.02]} rotation={[0.15, -0.1, -0.35]}>
          <boxGeometry args={[0.58, 0.025, 0.46]} />
          {wingMat}
        </mesh>
      </group>
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
