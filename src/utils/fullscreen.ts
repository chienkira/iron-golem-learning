function shouldRequestFullscreen(): boolean {
  if (typeof window === 'undefined') return false;

  const ua = navigator.userAgent;
  const isIPad =
    /iPad/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (isIPad) return true;

  const hasTouch = navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
  if (!hasTouch) return false;

  const minScreen = Math.min(window.screen.width, window.screen.height);
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

  // Android tablets often still include "Mobile" in the UA string.
  if (/Android/i.test(ua) && (minScreen >= 600 || isCoarsePointer)) return true;

  return minScreen >= 768 && isCoarsePointer;
}

function applyImmersiveFallback(): void {
  document.documentElement.classList.add('game-immersive');
  document.body.classList.add('game-immersive');

  // Nudge mobile browsers to collapse the URL bar when Fullscreen API is unavailable.
  requestAnimationFrame(() => {
    window.scrollTo(0, 1);
    requestAnimationFrame(() => window.scrollTo(0, 0));
  });
}

type FullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: (options?: FullscreenOptions) => void;
};

function tryEnterFullscreen(target: FullscreenElement): boolean {
  const options: FullscreenOptions = { navigationUI: 'hide' };

  try {
    if (target.requestFullscreen) {
      void target.requestFullscreen(options);
      return true;
    }
    if (target.webkitRequestFullscreen) {
      target.webkitRequestFullscreen(options);
      return true;
    }
  } catch {
    return false;
  }

  return false;
}

/** Call synchronously from a user click/tap handler. */
export function requestGameFullscreen(): void {
  if (!shouldRequestFullscreen()) return;

  applyImmersiveFallback();

  if (!window.isSecureContext || document.fullscreenElement) return;

  const root = document.getElementById('root');
  const targets = [document.documentElement, document.body, root].filter(
    (el): el is HTMLElement => el instanceof HTMLElement,
  );

  for (const target of targets) {
    if (tryEnterFullscreen(target)) return;
  }
}

export function exitGameFullscreen(): void {
  document.documentElement.classList.remove('game-immersive');
  document.body.classList.remove('game-immersive');

  if (!document.fullscreenElement) return;

  const doc = document as Document & { webkitExitFullscreen?: () => void };
  try {
    if (doc.exitFullscreen) {
      void doc.exitFullscreen();
    } else if (doc.webkitExitFullscreen) {
      doc.webkitExitFullscreen();
    }
  } catch {
    // ignore
  }
}
