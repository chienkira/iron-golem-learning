import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PlayerMarkerProps {
  level: number;
}

export function PlayerMarker({ level }: PlayerMarkerProps) {
  const ringRef = useRef<THREE.Mesh>(null);
  const arrowRef = useRef<THREE.Mesh>(null);
  const levelScale = 1 + (level - 1) * 0.1;
  const markerHeight = 3.6 * levelScale;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = 0.94 + Math.sin(t * 3.2) * 0.06;

    if (ringRef.current) {
      ringRef.current.scale.set(pulse * levelScale, 1, pulse * levelScale);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.5 + Math.sin(t * 3.2) * 0.18;
    }

    if (arrowRef.current) {
      arrowRef.current.position.y = markerHeight - 0.15 + Math.sin(t * 4) * 0.08;
    }
  });

  return (
    <group>
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.07, 0]}>
        <ringGeometry args={[0.9 * levelScale, 1.25 * levelScale, 40]} />
        <meshBasicMaterial
          color="#29b6f6"
          transparent
          opacity={0.65}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <circleGeometry args={[0.55 * levelScale, 32]} />
        <meshBasicMaterial color="#4fc3f7" transparent opacity={0.22} depthWrite={false} />
      </mesh>

      <mesh ref={arrowRef} position={[0, markerHeight - 0.15, 0]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.18 * levelScale, 0.38 * levelScale, 4]} />
        <meshBasicMaterial color="#29b6f6" transparent opacity={0.85} depthWrite={false} />
      </mesh>
    </group>
  );
}
