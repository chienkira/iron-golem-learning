import type { ReactNode } from 'react';
import styles from './CinematicFrame.module.css';

interface CinematicFrameProps {
  children: ReactNode;
  letterbox?: boolean;
  vignette?: boolean;
  grain?: boolean;
  flash?: boolean;
  shake?: boolean;
}

export function CinematicFrame({
  children,
  letterbox = false,
  vignette = false,
  grain = false,
  flash = false,
  shake = false,
}: CinematicFrameProps) {
  return (
    <div className={`${styles.frame} ${shake ? styles.shake : ''}`}>
      {children}
      {letterbox && (
        <>
          <div className={styles.letterboxTop} />
          <div className={styles.letterboxBottom} />
        </>
      )}
      {vignette && <div className={styles.vignette} />}
      {grain && <div className={styles.grain} />}
      {flash && <div className={styles.flash} />}
    </div>
  );
}
