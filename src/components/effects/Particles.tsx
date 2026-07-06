import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ExplosionProps {
  position: [number, number, number];
  onComplete: () => void;
}

export function Explosion({ position, onComplete }: ExplosionProps) {
  const count = 40;
  const ref = useRef<THREE.Points>(null);
  const lifeRef = useRef(0);

  const { positions, velocities, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel: THREE.Vector3[] = [];
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#ff5722'),
      new THREE.Color('#ff9800'),
      new THREE.Color('#ffeb3b'),
      new THREE.Color('#4caf50'),
      new THREE.Color('#e91e63'),
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = position[0];
      pos[i * 3 + 1] = position[1] + 1;
      pos[i * 3 + 2] = position[2];
      vel.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 6,
          Math.random() * 5 + 2,
          (Math.random() - 0.5) * 6,
        ),
      );
      const c = palette[Math.floor(Math.random() * palette.length)]!;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, velocities: vel, colors: col };
  }, [position, count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    lifeRef.current += delta;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      velocities[i]!.y -= 9.8 * delta;
      pos[i * 3] += velocities[i]!.x * delta;
      pos[i * 3 + 1] += velocities[i]!.y * delta;
      pos[i * 3 + 2] += velocities[i]!.z * delta;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;

    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = Math.max(0, 1 - lifeRef.current / 1.5);

    if (lifeRef.current > 1.5) onComplete();
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.25} vertexColors transparent opacity={1} />
    </points>
  );
}

interface LevelUpAuraProps {
  onComplete: () => void;
}

export function LevelUpAura({ onComplete }: LevelUpAuraProps) {
  const ringRef = useRef<THREE.Mesh>(null);
  const lifeRef = useRef(0);

  useFrame((_, delta) => {
    lifeRef.current += delta;
    if (ringRef.current) {
      const s = 1 + lifeRef.current * 2;
      ringRef.current.scale.set(s, s, s);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity =
        Math.max(0, 1 - lifeRef.current / 2);
    }
    if (lifeRef.current > 2) onComplete();
  });

  return (
    <group position={[0, 1, 0]}>
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1, 1.5, 32]} />
        <meshBasicMaterial color="#ffd700" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>
      <pointLight color="#ffd700" intensity={3} distance={10} />
    </group>
  );
}
