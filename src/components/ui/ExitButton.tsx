import { useGameStore } from '../../store/gameStore';
import { vi } from '../../i18n/vi';
import styles from './ExitButton.module.css';

export function ExitButton() {
  const phase = useGameStore((s) => s.phase);
  const exitToMenu = useGameStore((s) => s.exitToMenu);
  const exitCombat = useGameStore((s) => s.exitCombat);

  if (phase === 'explore') {
    return (
      <button className={styles.btn} onClick={exitToMenu} type="button">
        ✕ {vi.common.exit}
      </button>
    );
  }

  if (phase === 'combat') {
    return (
      <button className={styles.btn} onClick={exitCombat} type="button">
        ✕ {vi.common.exit}
      </button>
    );
  }

  return null;
}
