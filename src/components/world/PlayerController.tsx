import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../../store/gameStore';
import { IronGolem } from '../models/IronGolem';
import { PlayerMarker } from './PlayerMarker';
import { MAP_SIZE, MOVE_SPEED, ARRIVAL_THRESHOLD, CAMERA_HEIGHT, CAMERA_DISTANCE, CAMERA_OVERVIEW_HEIGHT, CAMERA_OVERVIEW_DISTANCE } from '../../constants/map';

export function PlayerController() {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const phase = useGameStore((s) => s.phase);
  const level = useGameStore((s) => s.level);
  const moveTarget = useGameStore((s) => s.moveTarget);
  const setMoveTarget = useGameStore((s) => s.setMoveTarget);
  const updatePlayerPosition = useGameStore((s) => s.updatePlayerPosition);
  const mapZoom = useGameStore((s) => s.mapZoom);
  const posRef = useRef(new THREE.Vector3());
  const rotRef = useRef(0);

  useEffect(() => {
    const { playerPosition, playerRotation } = useGameStore.getState();
    posRef.current.set(playerPosition[0], playerPosition[1], playerPosition[2]);
    rotRef.current = playerRotation;
  }, []);

  useEffect(() => {
    if ((phase !== 'explore' && phase !== 'vs-intro') || !groupRef.current) return;
    groupRef.current.position.copy(posRef.current);
    groupRef.current.rotation.y = rotRef.current;
  }, [phase]);

  useFrame((_, delta) => {
    if (phase === 'vs-intro') {
      if (!groupRef.current) return;

      groupRef.current.position.copy(posRef.current);

      const activeMonster = useGameStore.getState().activeMonster;
      if (activeMonster) {
        const [mx, , mz] = activeMonster.position;
        const dx = mx - posRef.current.x;
        const dz = mz - posRef.current.z;
        rotRef.current = Math.atan2(dx, dz);
        groupRef.current.rotation.y = rotRef.current;

        const focusX = (posRef.current.x + mx) / 2;
        const focusZ = (posRef.current.z + mz) / 2;
        const targetCamPos = new THREE.Vector3(
          focusX,
          CAMERA_HEIGHT,
          focusZ + CAMERA_DISTANCE * 0.9,
        );
        camera.position.lerp(targetCamPos, 0.08);
        camera.lookAt(focusX, 0, focusZ);
      }
      return;
    }

    if (phase !== 'explore' || !groupRef.current) return;

    if (moveTarget) {
      const [tx, tz] = moveTarget;
      const dx = tx - posRef.current.x;
      const dz = tz - posRef.current.z;
      const dist = Math.hypot(dx, dz);

      if (dist < ARRIVAL_THRESHOLD) {
        setMoveTarget(null);
      } else {
        const step = Math.min(MOVE_SPEED * delta, dist);
        posRef.current.x = THREE.MathUtils.clamp(
          posRef.current.x + (dx / dist) * step,
          -MAP_SIZE,
          MAP_SIZE,
        );
        posRef.current.z = THREE.MathUtils.clamp(
          posRef.current.z + (dz / dist) * step,
          -MAP_SIZE,
          MAP_SIZE,
        );
        rotRef.current = Math.atan2(dx, dz);
      }
    }

    groupRef.current.position.copy(posRef.current);
    groupRef.current.rotation.y = rotRef.current;

    updatePlayerPosition([posRef.current.x, 0, posRef.current.z], rotRef.current);

    const overview = mapZoom === 'overview';
    const focusX = overview ? 0 : posRef.current.x;
    const focusZ = overview ? 0 : posRef.current.z;
    const camHeight = overview ? CAMERA_OVERVIEW_HEIGHT : CAMERA_HEIGHT;
    const camDistance = overview ? CAMERA_OVERVIEW_DISTANCE : CAMERA_DISTANCE;
    const lerpSpeed = overview ? 0.04 : 0.06;

    const targetCamPos = new THREE.Vector3(focusX, camHeight, focusZ + camDistance);
    camera.position.lerp(targetCamPos, lerpSpeed);
    camera.lookAt(focusX, 0, focusZ);
  });

  useEffect(() => {
    const { playerPosition } = useGameStore.getState();
    const [x, , z] = playerPosition;
    camera.position.set(x, CAMERA_HEIGHT, z + CAMERA_DISTANCE);
    camera.far = 200;
    camera.updateProjectionMatrix();
    camera.lookAt(x, 0, z);
  }, [camera]);

  if (phase !== 'explore' && phase !== 'vs-intro') return null;

  return (
    <group ref={groupRef}>
      <PlayerMarker level={level} />
      <IronGolem level={level} animated walking={!!moveTarget} />
    </group>
  );
}
