import { useGameStore } from '../../store/gameStore';
import { vi } from '../../i18n/vi';
import styles from './ZoomControl.module.css';

export function ZoomControl() {
  const phase = useGameStore((s) => s.phase);
  const mapZoom = useGameStore((s) => s.mapZoom);
  const toggleMapZoom = useGameStore((s) => s.toggleMapZoom);

  if (phase !== 'explore') return null;

  const isOverview = mapZoom === 'overview';

  return (
    <button className={styles.btn} onClick={toggleMapZoom} type="button">
      {isOverview ? vi.zoom.normal : vi.zoom.overview}
    </button>
  );
}
