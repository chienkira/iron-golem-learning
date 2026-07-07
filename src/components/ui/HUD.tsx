import { useGameStore } from '../../store/gameStore';
import { COINS_PER_LEVEL } from '../../types/game';
import { vi } from '../../i18n/vi';
import styles from './HUD.module.css';

export function HUD() {
  const phase = useGameStore((s) => s.phase);
  const coinsInLevel = useGameStore((s) => s.coinsInLevel);
  const level = useGameStore((s) => s.level);

  if (phase !== 'explore') return null;

  const progress = (coinsInLevel / COINS_PER_LEVEL) * 100;

  return (
    <div className={styles.hud}>
      <div className={styles.hudLeft}>
        <div className={styles.statBox}>
          <span className={styles.label}>{vi.hud.level(level)}</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          <span className={styles.progressText}>
            {vi.hud.coinsProgress(coinsInLevel, COINS_PER_LEVEL)}
          </span>
        </div>
      </div>
    </div>
  );
}
