import { useEffect, useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { MONSTER_CONFIGS } from '../../types/game';
import { CinematicFrame } from './CinematicFrame';
import { vi } from '../../i18n/vi';
import styles from './VSIntro.module.css';

export function VSIntroOverlay() {
  const phase = useGameStore((s) => s.phase);
  const activeMonster = useGameStore((s) => s.activeMonster);
  const finishVsIntro = useGameStore((s) => s.finishVsIntro);
  const [stage, setStage] = useState(0);
  const [flash, setFlash] = useState(false);
  const [shake, setShake] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (phase !== 'vs-intro') return;

    setStage(0);
    setFlash(false);
    setShake(false);
    setExiting(false);

    const t0 = setTimeout(() => setStage(1), 200);
    const t1 = setTimeout(() => {
      setStage(2);
      setFlash(true);
      setShake(true);
    }, 1200);
    const t2 = setTimeout(() => setFlash(false), 1600);
    const t3 = setTimeout(() => setShake(false), 1700);
    const t4 = setTimeout(() => setExiting(true), 2700);
    const t5 = setTimeout(() => finishVsIntro(), 3200);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [phase, finishVsIntro]);

  if (phase !== 'vs-intro' || !activeMonster) return null;

  const config = MONSTER_CONFIGS[activeMonster.type];

  return (
    <CinematicFrame flash={flash} shake={shake}>
      <div className={`${styles.overlay} ${exiting ? styles.overlayExiting : ''}`}>
        <div className={styles.backdrop} />

        {stage >= 1 && (
          <div className={`${styles.vsRow} ${stage >= 2 ? styles.vsSlam : styles.vsEnter}`}>
            <span className={`${styles.vsHeading} ${styles.labelLeft}`}>{vi.vs.playerName}</span>
            <div className={styles.vsWrap}>
              <span className={styles.vsGlow}>{vi.vs.vs}</span>
              <span className={styles.vsText}>{vi.vs.vs}</span>
            </div>
            <span className={`${styles.vsHeading} ${styles.labelRight}`}>{config.name}</span>
          </div>
        )}
      </div>
    </CinematicFrame>
  );
}
