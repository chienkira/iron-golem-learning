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

const MC = {
  creeper: { light: '#6fa050', dark: '#3f6b30', face: '#1a1a1a' },
  bee: { yellow: '#f8c627', black: '#1a1a1a', wing: '#eef2f8' },
  zombie: { skin: '#6b9a6e', shirt: '#2e86c4', pants: '#5c3a9a', eye: '#1a1a1a' },
  enderman: { body: '#161616', eye: '#e040fb' },
  ghast: { body: '#dedede', mark: '#757575' },
} as const;

function CreeperModel({ animated, scale = 1 }: { animated?: boolean; scale?: number }) {
  const ref = useRef<THREE.Group>(null);
  const { light, dark, face } = MC.creeper;

  useFrame(() => {
    if (!ref.current || !animated) return;
    ref.current.position.y = Math.sin(Date.now() * 0.003) * 0.05;
  });

  return (
    <group ref={ref} scale={scale}>
      <VoxelBox position={[0, 0.55, 0]} size={[0.6, 1.0, 0.35]} color={light} />
      <VoxelBox position={[0, 0.55, 0.01]} size={[0.35, 0.55, 0.02]} color={dark} />
      <VoxelBox position={[0, 1.35, 0]} size={[0.6, 0.6, 0.6]} color={light} />
      <VoxelBox position={[0, 1.35, 0.01]} size={[0.35, 0.35, 0.02]} color={dark} />
      {/* Classic creeper face */}
      <VoxelBox position={[-0.12, 1.45, 0.31]} size={[0.12, 0.14, 0.02]} color={face} />
      <VoxelBox position={[0.12, 1.45, 0.31]} size={[0.12, 0.14, 0.02]} color={face} />
      <VoxelBox position={[0, 1.28, 0.31]} size={[0.1, 0.12, 0.02]} color={face} />
      <VoxelBox position={[0, 1.38, 0.31]} size={[0.08, 0.08, 0.02]} color={face} />
      {/* Four legs */}
      <VoxelBox position={[-0.22, 0.15, 0.12]} size={[0.24, 0.3, 0.24]} color={dark} />
      <VoxelBox position={[0.22, 0.15, 0.12]} size={[0.24, 0.3, 0.24]} color={dark} />
      <VoxelBox position={[-0.22, 0.15, -0.12]} size={[0.24, 0.3, 0.24]} color={dark} />
      <VoxelBox position={[0.22, 0.15, -0.12]} size={[0.24, 0.3, 0.24]} color={dark} />
    </group>
  );
}

function BeeModel({ animated, scale = 1 }: { animated?: boolean; scale?: number }) {
  const ref = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Group>(null);
  const rightWingRef = useRef<THREE.Group>(null);
  const { yellow, black, wing } = MC.bee;

  useFrame(() => {
    const t = Date.now() * 0.004;
    if (ref.current && animated) {
      ref.current.position.y = 0.32 + Math.sin(t * 2) * 0.07;
      ref.current.rotation.y = Math.sin(t * 0.5) * 0.1;
    }
    const wingAngle = Math.sin(t * 28) * 0.55;
    if (leftWingRef.current) leftWingRef.current.rotation.z = 0.2 + wingAngle;
    if (rightWingRef.current) rightWingRef.current.rotation.z = -0.2 - wingAngle;
  });

  const wingMat = (
    <meshStandardMaterial
      color={wing}
      transparent
      opacity={0.62}
      roughness={0.25}
      metalness={0}
      side={THREE.DoubleSide}
      depthWrite={false}
    />
  );

  return (
    <group ref={ref} scale={scale}>
      <VoxelBox position={[0, 0.36, 0.16]} size={[0.34, 0.34, 0.34]} color={yellow} />
      <VoxelBox position={[-0.09, 0.38, 0.34]} size={[0.07, 0.07, 0.02]} color={black} />
      <VoxelBox position={[0.09, 0.38, 0.34]} size={[0.07, 0.07, 0.02]} color={black} />
      <VoxelBox position={[0, 0.34, -0.1]} size={[0.32, 0.28, 0.36]} color={yellow} />
      <VoxelBox position={[0, 0.34, 0]} size={[0.34, 0.1, 0.38]} color={black} />
      <VoxelBox position={[0, 0.34, -0.2]} size={[0.34, 0.1, 0.34]} color={black} />
      <group ref={leftWingRef} position={[0, 0.36, -0.04]}>
        <mesh position={[-0.3, 0, 0.02]} rotation={[0.15, 0.1, 0.35]}>
          <boxGeometry args={[0.52, 0.025, 0.4]} />
          {wingMat}
        </mesh>
      </group>
      <group ref={rightWingRef} position={[0, 0.36, -0.04]}>
        <mesh position={[0.3, 0, 0.02]} rotation={[0.15, -0.1, -0.35]}>
          <boxGeometry args={[0.52, 0.025, 0.4]} />
          {wingMat}
        </mesh>
      </group>
    </group>
  );
}

function ZombieModel({ animated, scale = 1 }: { animated?: boolean; scale?: number }) {
  const ref = useRef<THREE.Group>(null);
  const { skin, shirt, pants, eye } = MC.zombie;

  useFrame(() => {
    if (!ref.current || !animated) return;
    ref.current.rotation.z = Math.sin(Date.now() * 0.002) * 0.05;
    ref.current.position.y = Math.abs(Math.sin(Date.now() * 0.004)) * 0.08;
  });

  return (
    <group ref={ref} scale={scale}>
      <VoxelBox position={[0, 1.35, 0]} size={[0.55, 0.55, 0.55]} color={skin} />
      <VoxelBox position={[-0.12, 1.38, 0.28]} size={[0.1, 0.08, 0.02]} color={eye} />
      <VoxelBox position={[0.12, 1.38, 0.28]} size={[0.1, 0.08, 0.02]} color={eye} />
      <VoxelBox position={[0, 1.22, 0.28]} size={[0.08, 0.06, 0.02]} color={skin} />
      <VoxelBox position={[0, 0.65, 0]} size={[0.55, 0.7, 0.3]} color={shirt} />
      <VoxelBox position={[-0.42, 0.65, 0]} size={[0.22, 0.65, 0.22]} color={skin} />
      <VoxelBox position={[0.42, 0.65, 0]} size={[0.22, 0.65, 0.22]} color={skin} />
      <VoxelBox position={[-0.14, 0.22, 0]} size={[0.22, 0.44, 0.22]} color={pants} />
      <VoxelBox position={[0.14, 0.22, 0]} size={[0.22, 0.44, 0.22]} color={pants} />
    </group>
  );
}

function EndermanModel({ animated, scale = 1 }: { animated?: boolean; scale?: number }) {
  const ref = useRef<THREE.Group>(null);
  const { body, eye } = MC.enderman;

  useFrame(() => {
    if (!ref.current || !animated) return;
    ref.current.position.y = Math.sin(Date.now() * 0.002) * 0.12;
  });

  return (
    <group ref={ref} scale={scale}>
      {/* Short torso */}
      <VoxelBox position={[0, 1.55, 0]} size={[0.4, 1.0, 0.28]} color={body} />
      {/* Long thin legs */}
      <VoxelBox position={[-0.1, 0.52, 0]} size={[0.12, 1.05, 0.12]} color={body} />
      <VoxelBox position={[0.1, 0.52, 0]} size={[0.12, 1.05, 0.12]} color={body} />
      {/* Long arms, closer to body */}
      <VoxelBox position={[-0.3, 1.1, 0]} size={[0.14, 2.15, 0.14]} color={body} />
      <VoxelBox position={[0.3, 1.1, 0]} size={[0.14, 2.15, 0.14]} color={body} />
      <VoxelBox position={[0, 2.45, 0]} size={[0.5, 0.5, 0.5]} color={body} />
      <VoxelBox
        position={[-0.12, 2.48, 0.26]}
        size={[0.14, 0.06, 0.02]}
        color={eye}
        emissive={eye}
        emissiveIntensity={1.2}
      />
      <VoxelBox
        position={[0.12, 2.48, 0.26]}
        size={[0.14, 0.06, 0.02]}
        color={eye}
        emissive={eye}
        emissiveIntensity={1.2}
      />
    </group>
  );
}

function GhastModel({ animated, scale = 1 }: { animated?: boolean; scale?: number }) {
  const ref = useRef<THREE.Group>(null);
  const { body, mark } = MC.ghast;

  useFrame(() => {
    if (!ref.current || !animated) return;
    const t = Date.now() * 0.002;
    ref.current.position.y = 1.05 + Math.sin(t) * 0.1;
    ref.current.rotation.y = Math.sin(t * 0.35) * 0.06;
  });

  const tentacleGrid: [number, number][] = [
    [-0.22, -0.22],
    [0, -0.22],
    [0.22, -0.22],
    [-0.22, 0],
    [0, 0],
    [0.22, 0],
    [-0.22, 0.22],
    [0, 0.22],
    [0.22, 0.22],
  ];

  const sideSpots: [number, number, number, number, number, number][] = [
    [0.51, 1.08, -0.18, 0.02, 0.04, 0.1],
    [0.51, 0.92, 0.14, 0.02, 0.04, 0.12],
    [0.51, 1.18, 0.05, 0.02, 0.04, 0.08],
    [-0.51, 1.02, -0.1, 0.02, 0.04, 0.11],
    [-0.51, 0.88, 0.16, 0.02, 0.04, 0.09],
    [0.08, 1.12, -0.51, 0.1, 0.04, 0.02],
    [-0.12, 0.95, -0.51, 0.12, 0.04, 0.02],
    [0.16, 1.05, -0.51, 0.08, 0.04, 0.02],
  ];

  return (
    <group ref={ref} scale={scale}>
      <VoxelBox position={[0, 1.05, 0]} size={[1.0, 1.0, 1.0]} color={body} />

      {/* Crying face */}
      <VoxelBox position={[-0.2, 1.1, 0.51]} size={[0.16, 0.05, 0.02]} color={mark} />
      <VoxelBox position={[0.2, 1.1, 0.51]} size={[0.16, 0.05, 0.02]} color={mark} />
      <VoxelBox position={[-0.2, 0.96, 0.51]} size={[0.05, 0.16, 0.02]} color={mark} />
      <VoxelBox position={[0.2, 0.96, 0.51]} size={[0.05, 0.16, 0.02]} color={mark} />
      <VoxelBox position={[0, 0.86, 0.51]} size={[0.12, 0.05, 0.02]} color={mark} />

      {/* Top trident patterns */}
      {([-0.22, 0.22] as const).map((x) => (
        <group key={x}>
          <VoxelBox position={[x, 1.56, 0.06]} size={[0.05, 0.03, 0.14]} color={mark} />
          <VoxelBox position={[x - 0.07, 1.56, 0.02]} size={[0.05, 0.03, 0.1]} color={mark} />
          <VoxelBox position={[x + 0.07, 1.56, 0.02]} size={[0.05, 0.03, 0.1]} color={mark} />
        </group>
      ))}

      {/* Side pixel dashes */}
      {sideSpots.map(([x, y, z, w, h, d], i) => (
        <VoxelBox key={i} position={[x, y, z]} size={[w, h, d]} color={mark} />
      ))}

      {/* Nine hanging tentacles */}
      {tentacleGrid.map(([x, z], i) => (
        <VoxelBox key={i} position={[x, 0.38, z]} size={[0.08, 0.26, 0.08]} color={body} />
      ))}
    </group>
  );
}

export function MonsterModel({ type, animated = true, position = [0, 0, 0], scale }: MonsterModelProps) {
  const config = MONSTER_CONFIGS[type];
  const s = scale ?? config.scale;

  const models: Record<MonsterType, ReactNode> = {
    creeper: <CreeperModel animated={animated} scale={s} />,
    bee: <BeeModel animated={animated} scale={s} />,
    zombie: <ZombieModel animated={animated} scale={s} />,
    enderman: <EndermanModel animated={animated} scale={s} />,
    ghast: <GhastModel animated={animated} scale={s} />,
  };

  return <group position={position}>{models[type]}</group>;
}
