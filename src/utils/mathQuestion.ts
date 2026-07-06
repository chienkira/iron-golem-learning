import type { MathQuestion, MonsterType } from '../types/game';
import { MONSTER_CONFIGS } from '../types/game';

export function generateQuestion(type: MonsterType): MathQuestion {
  const { maxValue } = MONSTER_CONFIGS[type];
  const operator: '+' | '-' = Math.random() < 0.5 ? '+' : '-';

  if (operator === '+') {
    const a = Math.floor(Math.random() * (maxValue - 1)) + 1;
    const b = Math.floor(Math.random() * (maxValue - a)) + 1;
    return { a, b, operator, answer: a + b, display: `${a} + ${b} = ?` };
  }

  const a = Math.floor(Math.random() * (maxValue - 1)) + 2;
  const b = Math.floor(Math.random() * (a - 1)) + 1;
  return { a, b, operator, answer: a - b, display: `${a} − ${b} = ?` };
}
