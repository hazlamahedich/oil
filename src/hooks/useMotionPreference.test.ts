import { describe, expect, it, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMotionPreference, MOTION_CONFIGS } from '@/hooks/useMotionPreference';
import { createMatchMediaMock } from '@/test-utils/create-match-media-mock';
import { announceToScreenReader, cleanupAnnouncements } from '@/utils/a11y';

describe('useMotionPreference', () => {
  let mock: ReturnType<typeof createMatchMediaMock>;

  afterEach(() => {
    mock?.cleanup();
  });

  it('returns "full" when no preference is set', () => {
    mock = createMatchMediaMock(false);
    const { result } = renderHook(() => useMotionPreference());
    expect(result.current).toBe('full');
  });

  it('returns "reduced" when prefers-reduced-motion matches', () => {
    mock = createMatchMediaMock(true);
    const { result } = renderHook(() => useMotionPreference());
    expect(result.current).toBe('reduced');
  });

  it('reactively changes when media query fires change event', () => {
    mock = createMatchMediaMock(false);
    const { result } = renderHook(() => useMotionPreference());
    expect(result.current).toBe('full');

    act(() => {
      mock.setMatches(true);
    });

    expect(result.current).toBe('reduced');
  });

  it('calls removeEventListener on cleanup', () => {
    mock = createMatchMediaMock(false);
    const { unmount } = renderHook(() => useMotionPreference());
    unmount();
    const matchMedia = window.matchMedia as ReturnType<typeof vi.fn>;
    const mql = matchMedia.mock.results[0].value;
    expect(mql.removeEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    );
  });

  it('returns correct tier on initial render without flash', () => {
    mock = createMatchMediaMock(true);
    const { result } = renderHook(() => useMotionPreference());
    expect(result.current).toBe('reduced');
  });

  it('transitions from reduced back to full', () => {
    mock = createMatchMediaMock(true);
    const { result } = renderHook(() => useMotionPreference());
    expect(result.current).toBe('reduced');

    act(() => {
      mock.setMatches(false);
    });

    expect(result.current).toBe('full');
  });
});

describe('MOTION_CONFIGS', () => {
  it('full.transitionDuration is 600', () => {
    expect(MOTION_CONFIGS.full.transitionDuration).toBe(600);
  });

  it('full.chartAnimation is true', () => {
    expect(MOTION_CONFIGS.full.chartAnimation).toBe(true);
  });

  it('full.pulseEnabled is true', () => {
    expect(MOTION_CONFIGS.full.pulseEnabled).toBe(true);
  });

  it('full.hoverDuration is 200', () => {
    expect(MOTION_CONFIGS.full.hoverDuration).toBe(200);
  });

  it('full.skeletonAnimated is true', () => {
    expect(MOTION_CONFIGS.full.skeletonAnimated).toBe(true);
  });

  it('reduced.transitionDuration is 200', () => {
    expect(MOTION_CONFIGS.reduced.transitionDuration).toBe(200);
  });

  it('reduced.chartAnimation is false', () => {
    expect(MOTION_CONFIGS.reduced.chartAnimation).toBe(false);
  });

  it('reduced.pulseEnabled is false', () => {
    expect(MOTION_CONFIGS.reduced.pulseEnabled).toBe(false);
  });

  it('reduced.hoverDuration is 0', () => {
    expect(MOTION_CONFIGS.reduced.hoverDuration).toBe(0);
  });

  it('reduced.skeletonAnimated is false', () => {
    expect(MOTION_CONFIGS.reduced.skeletonAnimated).toBe(false);
  });

  it('is frozen', () => {
    expect(Object.isFrozen(MOTION_CONFIGS)).toBe(true);
  });
});

describe('integration: useMotionPreference + announceToScreenReader', () => {
  let mock: ReturnType<typeof createMatchMediaMock>;

  afterEach(() => {
    mock?.cleanup();
    cleanupAnnouncements();
  });

  it('hook returns tier and DOM has announcement element', () => {
    mock = createMatchMediaMock(false);
    const { result } = renderHook(() => useMotionPreference());
    expect(result.current).toBe('full');

    announceToScreenReader('motion check');
    const el = document.querySelector('[aria-live]');
    expect(el).not.toBeNull();
    expect(el?.textContent).toBe('motion check');
  });

  it('unmounting cleans up both media query listener and announcement element', () => {
    mock = createMatchMediaMock(false);
    const { unmount, result } = renderHook(() => useMotionPreference());
    expect(result.current).toBe('full');

    announceToScreenReader('cleanup test');
    unmount();

    const matchMedia = window.matchMedia as ReturnType<typeof vi.fn>;
    const mql = matchMedia.mock.results[0].value;
    expect(mql.removeEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    );

    cleanupAnnouncements();
    expect(document.querySelector('[aria-live]')).toBeNull();
  });
});
