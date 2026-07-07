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
