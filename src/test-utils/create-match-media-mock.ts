import { vi } from 'vitest';

export function createMatchMediaMock(initialMatches = false) {
  const originalMatchMedia = window.matchMedia;
  const listeners = new Set<(ev: Event) => void>();
  let matches = initialMatches;

  const mql = {
    get matches() {
      return matches;
    },
    media: '(prefers-reduced-motion: reduce)',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn((_event: unknown, handler: (ev: Event) => void) => {
      listeners.add(handler);
    }),
    removeEventListener: vi.fn((_event: unknown, handler: (ev: Event) => void) => {
      listeners.delete(handler);
    }),
    dispatchEvent: vi.fn(),
  } as unknown as MediaQueryList;

  window.matchMedia = vi.fn(() => mql);

  return {
    setMatches(value: boolean) {
      if (matches === value) return;
      matches = value;
      listeners.forEach((listener) =>
        listener(new Event('change')),
      );
    },
    cleanup() {
      listeners.clear();
      window.matchMedia = originalMatchMedia;
    },
  };
}
