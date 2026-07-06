import type { Monster, MonsterType } from '../types/game';
import { MONSTER_TYPES } from '../types/game';
import { MAP_SIZE } from '../constants/map';

const MIN_DISTANCE = 8;
const MONSTER_COUNT = 20;

function randomPosition(existing: [number, number, number][]): [number, number, number] {
  for (let attempt = 0; attempt < 50; attempt++) {
    const x = (Math.random() - 0.5) * MAP_SIZE;
    const z = (Math.random() - 0.5) * MAP_SIZE;
    const tooClose = existing.some(
      ([ex, , ez]) => Math.hypot(ex - x, ez - z) < MIN_DISTANCE,
    );
    if (!tooClose && Math.hypot(x, z) > 6) {
      return [x, 0, z];
    }
  }
  return [(Math.random() - 0.5) * MAP_SIZE, 0, (Math.random() - 0.5) * MAP_SIZE];
}

export function spawnInitialMonsters(): Monster[] {
  const positions: [number, number, number][] = [];
  const monsters: Monster[] = [];

  for (let i = 0; i < MONSTER_COUNT; i++) {
    const pos = randomPosition(positions);
    positions.push(pos);
    const type = MONSTER_TYPES[Math.floor(Math.random() * MONSTER_TYPES.length)] as MonsterType;
    monsters.push({ id: `monster-${i}-${Date.now()}`, type, position: pos });
  }

  return monsters;
}

export function spawnMonster(existing: Monster[]): Monster {
  const positions = existing.map((m) => m.position);
  const pos = randomPosition(positions);
  const type = MONSTER_TYPES[Math.floor(Math.random() * MONSTER_TYPES.length)] as MonsterType;
  return { id: `monster-${Date.now()}`, type, position: pos };
}
