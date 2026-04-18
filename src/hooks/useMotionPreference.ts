import { useSyncExternalStore } from 'react';
import type { MotionTier } from '@/types';

const QUERY = '(prefers-reduced-motion: reduce)';

export interface MotionTierConfig {
  transitionDuration: number;
  chartAnimation: boolean;
  pulseEnabled: boolean;
  hoverDuration: number;
  skeletonAnimated: boolean;
}

export const MOTION_CONFIGS: Record<MotionTier, MotionTierConfig> = Object.freeze({
  full: {
    transitionDuration: 600,
    chartAnimation: true,
    pulseEnabled: true,
    hoverDuration: 200,
    skeletonAnimated: true,
  },
  reduced: {
    transitionDuration: 200,
    chartAnimation: false,
    pulseEnabled: false,
    hoverDuration: 0,
    skeletonAnimated: false,
  },
});

function subscribe(callback: () => void): () => void {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function getSnapshot(): MotionTier {
  if (typeof window === 'undefined') return 'full';
  return window.matchMedia(QUERY).matches ? 'reduced' : 'full';
}

function getServerSnapshot(): MotionTier {
  return 'full';
}

export function useMotionPreference(): MotionTier {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
