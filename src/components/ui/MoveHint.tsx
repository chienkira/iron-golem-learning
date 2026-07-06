import { useGameStore } from '../../store/gameStore';
import { vi } from '../../i18n/vi';
import styles from './MoveHint.module.css';

export function MoveHint() {
  const phase = useGameStore((s) => s.phase);

  if (phase !== 'explore') return null;

  return (
    <div className={styles.hint}>
      {vi.moveHint}
    </div>
  );
}
