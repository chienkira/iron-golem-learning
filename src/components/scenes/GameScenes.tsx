import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { Environment } from '../world/Environment';
import { PlayerController } from '../world/PlayerController';
import { MonsterField } from '../world/MonsterField';
import { ClickToMove } from '../world/ClickToMove';
import { GROUND_SIZE, CAMERA_HEIGHT, CAMERA_DISTANCE } from '../../constants/map';

function Lighting() {
  const half = GROUND_SIZE / 2;
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[20, 40, 20]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={120}
        shadow-camera-left={-half}
        shadow-camera-right={half}
        shadow-camera-top={half}
        shadow-camera-bottom={-half}
      />
      <hemisphereLight args={['#87ceeb', '#5d8a3c', 0.4]} />
    </>
  );
}

export function ExploreScene() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, CAMERA_HEIGHT, CAMERA_DISTANCE], fov: 45, near: 0.1, far: 200 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true }}
    >
      <Sky sunPosition={[100, 20, 100]} turbidity={8} rayleigh={2} />
      <Lighting />
      <Environment />
      <ClickToMove />
      <PlayerController />
      <MonsterField />
    </Canvas>
  );
}

export function CombatScene() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 5, 12], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={['#2c2c3e']} />
      <fog attach="fog" args={['#2c2c3e', 15, 35]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />
      <hemisphereLight args={['#4a4a6a', '#1a1a2e', 0.5]} />
    </Canvas>
  );
}
