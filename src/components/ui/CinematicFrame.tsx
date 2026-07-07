import type { ReactNode } from 'react';
import styles from './CinematicFrame.module.css';

interface CinematicFrameProps {
  children: ReactNode;
  flash?: boolean;
  shake?: boolean;
}

export function CinematicFrame({ children, flash = false, shake = false }: CinematicFrameProps) {
  return (
    <div className={`${styles.frame} ${shake ? styles.shake : ''}`}>
      {children}
      {flash && <div className={styles.flash} />}
    </div>
  );
}
