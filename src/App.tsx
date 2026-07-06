import { ExploreScene } from './components/scenes/GameScenes';
import { HUD } from './components/ui/HUD';
import { MoveHint } from './components/ui/MoveHint';
import { ZoomControl } from './components/ui/ZoomControl';
import { VSIntroOverlay } from './components/ui/VSIntro';
import { CombatOverlay } from './components/ui/CombatUI';
import styles from './App.module.css';
import { vi } from './i18n/vi';

function TitleScreen() {
  return (
    <div className={styles.titleOverlay}>
      <h1 className={styles.title}>{vi.gameTitle}</h1>
      <p className={styles.subtitle}>{vi.gameSubtitle}</p>
      <p className={styles.tagline}>{vi.tagline}</p>
    </div>
  );
}

export default function App() {
  return (
    <div className={styles.app}>
      <ExploreScene />
      <TitleScreen />
      <HUD />
      <MoveHint />
      <ZoomControl />
      <VSIntroOverlay />
      <CombatOverlay />
    </div>
  );
}
