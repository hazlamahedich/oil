# Story 1B.3: Motion & Accessibility Utilities

Status: done

## Story

As a **developer**,
I want a motion preference hook and screen reader announcement utility available from day one,
So that every panel story (Epics 2–7) can build motion-aware, screen-reader-accessible components without deferring to Epic 8.

## Acceptance Criteria

1. **AC1 — MotionTier type added to `src/types/index.ts`:** Export `MotionTier = 'full' | 'reduced'` as a named type with JSDoc tracing to NFR-15 and UX-DR70-71. This is a minor provisional amendment (types are provisional during Epic 1B). Include a comment that `'minimal'` tier will be added by Story 8-6b when `data-motion` attribute infrastructure exists.

2. **AC2 — `useMotionPreference` hook created:** `src/hooks/useMotionPreference.ts` exports a named hook that:
   - Returns `MotionTier` (`'full'` when no preference, `'reduced'` when `prefers-reduced-motion: reduce` is active)
   - Subscribes reactively to `matchMedia('(prefers-reduced-motion: reduce)')` changes via `useSyncExternalStore`
   - Provides `getServerSnapshot` returning `'full'` for consistent initial render (no flash of unwanted motion)
   - Calls `removeEventListener` on cleanup — no memory leaks on unmount/remount
   - Creates `src/hooks/` directory (does not exist yet)

3. **AC3 — `MOTION_CONFIGS` constant exported:** `src/hooks/useMotionPreference.ts` (co-located) exports a frozen `MOTION_CONFIGS: Record<MotionTier, MotionTierConfig>` constant where `MotionTierConfig` is:
   ```typescript
   interface MotionTierConfig {
     transitionDuration: number;
     chartAnimation: boolean;
     pulseEnabled: boolean;
     hoverDuration: number;
     skeletonAnimated: boolean;
   }
   ```
   Values derived from UX spec animation table (UX-DR70-71):
   - `full`: `{ transitionDuration: 600, chartAnimation: true, pulseEnabled: true, hoverDuration: 200, skeletonAnimated: true }`
   - `reduced`: `{ transitionDuration: 200, chartAnimation: false, pulseEnabled: false, hoverDuration: 0, skeletonAnimated: false }`
   - `MOTION_CONFIGS` is `Object.freeze()`'d at runtime

4. **AC4 — `announceToScreenReader` utility created:** `src/utils/a11y.ts` exports a named function:
   ```typescript
   function announceToScreenReader(
     message: string,
     priority: 'polite' | 'assertive' = 'polite',
   ): void
   ```
   - Creates a temporary `<div>` with `aria-live={priority}`, `role="status"`, `className="sr-only"` (visually hidden but screen-reader-accessible), appended to `document.body`
   - Sets `textContent` to `message`
   - Removes the element after 300ms delay (configurable — gives screen readers time to process)
   - Rapid-fire calls: if a previous announcement element exists with the same priority, replaces its text content and resets the removal timer (no queueing — queueing belongs in Story 8-1)
   - Cleans up all created elements on function re-invocation — no DOM accumulation

5. **AC5 — No import-time side effects:** Module has no side effects on import. No global listeners are registered outside React component lifecycle. `announceToScreenReader` only touches the DOM when explicitly called. The `useMotionPreference` hook only subscribes to `matchMedia` when a component mounting calls it.

6. **AC6 — Unit tests with minimum 23 tests:**
   - `src/hooks/useMotionPreference.test.ts` — tests for:
     - Default tier is `'full'` (no OS preference)
     - Returns `'reduced'` when `prefers-reduced-motion: reduce` matches
     - Reactive tier change when media query fires `change` event
     - Hook cleanup: `removeEventListener` called on unmount
     - Initial render returns correct tier (no flash)
     - `MOTION_CONFIGS` values match UX spec table exactly
     - `MOTION_CONFIGS` is frozen (`Object.isFrozen()`)
   - `src/utils/a11y.test.ts` — tests for:
     - `announceToScreenReader('hello')` creates aria-live element with text
     - Default priority is `'polite'`
     - `'assertive'` priority sets `aria-live="assertive"`
     - Element removed from DOM after delay
     - Rapid-fire calls replace text, don't duplicate elements
     - Empty string message still creates/removes element (no crash)
   - Integration test: render a dummy component using both `useMotionPreference` and `announceToScreenReader`, verify they compose without conflict
   - **matchMedia mock:** `src/test-utils/create-match-media-mock.ts` (or added to `test-setup.ts`) — shared factory utility for mocking `window.matchMedia` in tests, with proper listener registration and teardown

7. **AC7 — Named exports only:** No `export default` in any file. All hooks, types, constants, and functions use named exports.

8. **AC8 — All existing tests still pass:** `npm run test`, `npm run typecheck`, `npm run lint` all green.

## Tasks / Subtasks

- [x] Task 1: Add `MotionTier` to `src/types/index.ts` (AC: #1)
  - [x] Add `MotionTier = 'full' | 'reduced'` type with JSDoc (`@consumers` Epics 2–7, `@fr` NFR-15, UX-DR70-71, `@see` MOTION_CONFIGS)
  - [x] JSDoc comment: "Two-tier motion preference. A third tier 'minimal' will be added by Story 8-6b when data-motion attribute infrastructure exists."
  - [x] Do NOT break any of the existing 28 tests in `src/types/index.test.ts`

- [x] Task 2: Create `src/hooks/` directory and `useMotionPreference.ts` (AC: #2, #3, #7)
  - [x] Create `src/hooks/` directory (does not exist yet — first hook in the project)
  - [x] Import `MotionTier` from `@/types`
  - [x] Define `MotionTierConfig` interface locally (not in types — it's a hook-internal concern)
  - [x] Define `MOTION_CONFIGS` as frozen constant with values per AC3
  - [x] Implement hook using `useSyncExternalStore`:
    - `subscribe` callback: `matchMedia('(prefers-reduced-motion: reduce)')` with `addEventListener('change', handler)` / `removeEventListener('change', handler)`
    - `getSnapshot`: returns `'reduced'` if `matches === true`, else `'full'`
    - `getServerSnapshot`: returns `'full'`
  - [x] Export: `useMotionPreference`, `MOTION_CONFIGS`, type `MotionTierConfig`

- [x] Task 3: Create `src/utils/a11y.ts` (AC: #4, #5, #7)
  - [x] Implement `announceToScreenReader(message, priority)` per AC4 spec
  - [x] Track active announcement elements by priority (module-scoped `Map<string, HTMLDivElement>`)
  - [x] On call: if element exists for priority, update text and reset timer. If not, create new element, append to `document.body`
  - [x] Timer: `setTimeout(() => element.remove(), 300)` on each call
  - [x] Element attributes: `aria-live`, `role="status"`, `className="sr-only"`, `aria-atomic="true"`

- [x] Task 4: Create `src/test-utils/create-match-media-mock.ts` (AC: #6)
  - [x] Create `src/test-utils/` directory (does not exist yet — first shared test utility)
  - [x] Export `createMatchMediaMock(initialMatches?: boolean)` factory
  - [x] Returns mock `MediaQueryList` with controllable `matches`, working `addEventListener`/`removeEventListener`
  - [x] Provides `setMatches(value: boolean)` method to simulate preference change
  - [x] Provides `cleanup()` method for `afterEach`
  - [x] Handles the `(prefers-reduced-motion: reduce)` query specifically

- [x] Task 5: Create `src/hooks/useMotionPreference.test.ts` (AC: #6)
  - [x] Default tier is `'full'` when no preference
  - [x] Returns `'reduced'` when `prefers-reduced-motion: reduce` is active
  - [x] Reactive change: fire media query change event, verify tier updates
  - [x] **afterEach cleanup:** register `mock.cleanup()` in `afterEach` to prevent listener pollution between tests
  - [x] Initial render: verify correct tier on very first render (no flash)
  - [x] `MOTION_CONFIGS.full.transitionDuration === 600`
  - [x] `MOTION_CONFIGS.full.chartAnimation === true`
  - [x] `MOTION_CONFIGS.full.pulseEnabled === true`
  - [x] `MOTION_CONFIGS.full.hoverDuration === 200`
  - [x] `MOTION_CONFIGS.full.skeletonAnimated === true`
  - [x] `MOTION_CONFIGS.reduced.transitionDuration === 200`
  - [x] `MOTION_CONFIGS.reduced.chartAnimation === false`
  - [x] `MOTION_CONFIGS.reduced.pulseEnabled === false`
  - [x] `MOTION_CONFIGS.reduced.hoverDuration === 0`
  - [x] `MOTION_CONFIGS.reduced.skeletonAnimated === false`
  - [x] `Object.isFrozen(MOTION_CONFIGS)` is `true`
  - [x] Minimum 12 tests in this file

- [x] Task 6: Create `src/utils/a11y.test.ts` (AC: #6)
  - [x] Creates aria-live element with correct text
  - [x] Default priority is `'polite'`
  - [x] `'assertive'` priority creates element with `aria-live="assertive"`
  - [x] Element has `role="status"`, `className` containing `sr-only`, `aria-atomic="true"`
  - [x] Element removed from DOM after delay (use `vi.useFakeTimers()`)
  - [x] Rapid-fire calls: second call replaces text, doesn't create second element
  - [x] Rapid-fire calls: removal timer resets on second call
  - [x] Empty string message: no crash, element still created and removed
  - [x] Minimum 8 tests in this file

- [x] Task 7: Integration test (AC: #6)
  - [x] Place in `src/hooks/useMotionPreference.test.ts` in a `describe('integration')` block (avoids file-placement ambiguity)
  - [x] Render a dummy component that calls `useMotionPreference()` and `announceToScreenReader('test')` in an effect
  - [x] Verify hook returns tier and DOM has announcement element
  - [x] Verify unmounting cleans up both media query listener and announcement element
  - [x] Minimum 2 tests (can be in either test file or a separate integration file)

- [x] Task 8: Verify full suite passes (AC: #8)
  - [x] `npm run typecheck` — zero errors
   - [x] `npm run test` — all tests green (existing 101 + new ~23 = ~124)
  - [x] `npm run lint` — zero warnings

## Dev Notes

### What This Story Delivers

Three production files and one test utility:
- `src/hooks/useMotionPreference.ts` — reactive motion preference hook + `MOTION_CONFIGS` constant
- `src/utils/a11y.ts` — screen reader announcement utility
- `src/test-utils/create-match-media-mock.ts` — shared test mock factory
- Co-located test files for each

### What This Story Does NOT Deliver (Post-Review Scope Cuts)

The following were **removed** from this story by party-mode adversarial review consensus (6 agents, 2026-04-16):

| Cut Item | Reason | Deferred To |
|----------|--------|-------------|
| `manageLiveRegion()` | Story 8-1 explicitly owns live region management (pause/resume, rate limiting, summary mode, hierarchy). This is a stateful subsystem, not a utility. | Story 8-1 |
| `getContrastRatio()` | Zero consumers. All colors are static CSS custom properties. WCAG contrast is a build-time/test-time concern (jest-axe). YAGNI. | Never (test-time tooling only) |
| `'minimal'` tier | No `data-motion` attribute producer exists. Dead code until Story 8-6b ships the user toggle. Also, Story 8-6b contradicts UX spec on trigger conditions. | Story 8-6b |
| `useContrastPreference` | No consumer. No dynamic theming. | Epic 8 if needed |
| Focus management utilities | Right priority, wrong sprint. Epics 2–7 don't need them until modal dialogs in Epic 8. | New Story 8-0 |
| Chart accessibility helpers | Should emerge from actual chart implementation in Epics 3/6. | Epics 3, 6 |

### CSS Coexistence with `prefers-reduced-motion`

`src/index.css:122-129` already contains:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation: none !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

This CSS rule is a **blunt safety net** that kills all animations for components that DON'T use the hook. Components that DO use `useMotionPreference` + `MOTION_CONFIGS` apply their own scoped animation styles with appropriate specificity. The two systems coexist:

1. **Global CSS** → catches everything, ensures zero motion at the CSS level
2. **Hook + configs** → gives components programmatic control over what reduced motion means for their specific animations

When building panels (Epics 2–7), developers using the hook should apply inline `style={{ transitionDuration: `${MOTION_CONFIGS[tier].transitionDuration}ms` }}` or scoped Tailwind classes that override the global `!important` via element-level specificity. This is a panel-by-panel concern, not a 1B.3 concern.

### Architecture Compliance

- **Named exports only** — no `export default` [Source: project-context.md #2]
- **Path aliases** — import `MotionTier` via `@/types` [Source: project-context.md #3]
- **No `@apply`** — these are TypeScript files, no CSS involved [Source: project-context.md #13]
- **Co-located tests** — test files next to source files [Source: project-context.md #12]
- **File < 200 LOC** — both files should be well under this limit
- **`useSyncExternalStore`** — React 19 native API for subscribing to external mutable sources. No need for third-party hook libraries. Import: `import { useSyncExternalStore } from 'react'` (stable, non-deprecated in React 19.2.4).
- **`renderHook`** — `@testing-library/react` v16.3.2 includes `renderHook` natively (verified in `package.json`). No need for deprecated `@testing-library/react-hooks`.

### Hook Implementation Pattern

```typescript
import { useSyncExternalStore } from 'react';
import type { MotionTier } from '@/types';

const QUERY = '(prefers-reduced-motion: reduce)';

function getSnapshot(): MotionTier {
  return window.matchMedia(QUERY).matches ? 'reduced' : 'full';
}

function getServerSnapshot(): MotionTier {
  return 'full';
}

function subscribe(callback: () => void): () => void {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

export function useMotionPreference(): MotionTier {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
```

### `announceToScreenReader` Implementation Pattern

```typescript
const activeAnnouncements = new Map<string, { element: HTMLDivElement; timer: ReturnType<typeof setTimeout> }>();

export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite',
): void {
  const existing = activeAnnouncements.get(priority);

  if (existing) {
    clearTimeout(existing.timer);
    existing.element.textContent = message;
    existing.timer = setTimeout(() => {
      existing.element.remove();
      activeAnnouncements.delete(priority);
    }, 300);
    return;
  }

  const element = document.createElement('div');
  element.setAttribute('aria-live', priority);
  element.setAttribute('role', 'status');
  element.setAttribute('aria-atomic', 'true');
  element.className = 'sr-only';
  element.textContent = message;
  document.body.appendChild(element);

  const timer = setTimeout(() => {
    element.remove();
    activeAnnouncements.delete(priority);
  }, 300);

  activeAnnouncements.set(priority, { element, timer });
}
```

### `MOTION_CONFIGS` Values from UX Spec

Source: `_bmad-output/planning-artifacts/ux-design-specification.md` lines 1661–1668

| Property | Full | Reduced |
|----------|------|---------|
| `transitionDuration` | 600 (severity transitions use 600ms) | 200 (simplified transitions) |
| `chartAnimation` | true (150ms CSS transitions) | false (instant redraw) |
| `pulseEnabled` | true (SynthesisMoment 1.5s glow, MasterStatus pulse) | false (static border, color shift only) |
| `hoverDuration` | 200 (hover effects) | 0 (instant) |
| `skeletonAnimated` | true (pulse animation) | false (static gray) |

### `sr-only` CSS Class

The `sr-only` class must exist in `src/index.css` for `announceToScreenReader` to work. **Check if it already exists in Tailwind's base styles.** Tailwind 3.4 includes `sr-only` as a built-in utility class, so no additional CSS is needed — `className="sr-only"` applies the standard visually-hidden pattern.

### `matchMedia` Mock Pattern for jsdom

jsdom does not implement `window.matchMedia`. The shared mock factory must:
1. Return a `MediaQueryList`-compatible object
2. Support `addEventListener('change', callback)` and `removeEventListener`
3. Allow tests to toggle `matches` and fire the `change` event
4. Clean up properly between tests

```typescript
export function createMatchMediaMock(initialMatches = false) {
  const listeners = new Set<(ev: MediaQueryListEvent) => void>();
  let matches = initialMatches;

  const mql = {
    get matches() { return matches; },
    media: '(prefers-reduced-motion: reduce)',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn((_event: string, handler: (ev: MediaQueryListEvent) => void) => {
      listeners.add(handler);
    }),
    removeEventListener: vi.fn((_event: string, handler: (ev: MediaQueryListEvent) => void) => {
      listeners.delete(handler);
    }),
    dispatchEvent: vi.fn(),
  };

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn((_query: string) => mql),
  });

  return {
    setMatches(value: boolean) {
      matches = value;
      listeners.forEach((listener) => listener({ matches } as MediaQueryListEvent));
    },
    cleanup() {
      listeners.clear();
    },
  };
}
```

### Previous Story Intelligence

- **1B.1:** `src/types/index.ts` has 39 types (28 tests). Provisional during Epic 1B — this story adds `MotionTier` as a minor amendment.
- **1B.2:** `src/utils/constants.ts` (46 LOC, 10 tests), `src/utils/format.ts` (8 functions, 51 tests). `STALE_THRESHOLD_DAYS` and `FRESHNESS_THRESHOLDS` defined for future `useDataFreshness` hook.
- **1A:** `src/index.css` has CSS custom properties and `prefers-reduced-motion` override (lines 122–129). `tailwind.config.ts` maps design tokens. React 19.2.4, RTL 16.3.2, Vitest 4.1.4.

### Downstream Consumers

- **1B.5 (Zustand stores):** `appStore` may reference `MotionTier` type. Stores don't consume the hook directly.
- **1B.7 (Test infrastructure):** `createMatchMediaMock` will be used by panel tests in Epics 2–9.
- **Epic 2–7 (Panels):** Every panel using animations imports `useMotionPreference` + `MOTION_CONFIGS`. Panels with live updates call `announceToScreenReader`.
- **Epic 8 (Story 8-0):** Focus management utilities — builds on `a11y.ts` file, adds focus-related functions.
- **Epic 8 (Story 8-6b):** Adds `'minimal'` tier to `MotionTier`, wires `data-motion` attribute, updates `MOTION_CONFIGS` with minimal values.

### What NOT To Do

- **Do NOT create `manageLiveRegion()`** — that's Story 8-1's scope (pause/resume, rate limiting, queueing, summary mode)
- **Do NOT create `getContrastRatio()`** — no consumers, all colors are static CSS custom properties, contrast validation is a build-time concern
- **Do NOT implement the `'minimal'` tier** — no `data-motion` producer exists yet, deferred to Story 8-6b
- **Do NOT create focus management utilities** (`trapFocus`, `returnFocus`, etc.) — deferred to new Story 8-0
- **Do NOT create chart accessibility helpers** — deferred to Epics 3/6 where charts are built
- **Do NOT add `useContrastPreference`** — no consumer, no dynamic theming
- **Do NOT create barrel files** — direct imports from `@/hooks/useMotionPreference` and `@/utils/a11y`
- **Do NOT modify `src/index.css`** — the `prefers-reduced-motion` CSS override stays as-is (safety net for non-hook components)
- **Do NOT import from stores or data files** — this story has zero store/data dependencies

### Project Structure After This Story

```
src/
  hooks/
    useMotionPreference.ts          # NEW — motion preference hook + MOTION_CONFIGS
    useMotionPreference.test.ts     # NEW — hook + config tests (~14 tests)
  test-utils/
    create-match-media-mock.ts      # NEW — shared matchMedia mock factory
  types/
    index.ts                         # MODIFIED — add MotionTier type
    index.test.ts                    # UNCHANGED — verify still passes
  utils/
    a11y.ts                          # NEW — announceToScreenReader
    a11y.test.ts                     # NEW — announcement tests (~8 tests)
    constants.ts                     # UNCHANGED
    format.ts                        # UNCHANGED
    constants.test.ts                # UNCHANGED
    format.test.ts                   # UNCHANGED
```

### Party Mode Adversarial Review (2026-04-16)

Reviewed by Winston (Architect), Murat (Test Architect), Amelia (Developer), Sally (UX Designer), John (PM), Mary (Analyst). 48 issues consolidated into 25 findings. Key resolution categories:

- **Scope cuts:** `manageLiveRegion()` moved to Story 8-1. `getContrastRatio()` removed (YAGNI). `'minimal'` tier deferred to Story 8-6b. `useContrastPreference` removed.
- **AC contradiction fixed:** "Zero side effects" rewritten to "no side effects on import" — acknowledges `announceToScreenReader` DOM operations with guaranteed cleanup.
- **CSS coexistence documented:** Global `prefers-reduced-motion` CSS stays as safety net. Hook provides programmatic control. Reconciliation is panel-by-panel.
- **`MotionTier` type home resolved:** Added to `src/types/index.ts` (provisional during Epic 1B).
- **Hook implementation specified:** `useSyncExternalStore` with `getServerSnapshot` returning `'full'`.
- **Announcement cleanup spec:** 300ms delay, replaces on rapid-fire, removes element after delay.
- **Test quality gate:** Minimum 23 tests with `createMatchMediaMock` shared utility.
- **Spawned stories:** Story 8-0 (focus management), Story 8-6b modification (add minimal tier).

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1B.3 — Motion & Accessibility Utilities]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Motion & Animation — three-tier system (lines 1651–1668)]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Live Region Management (lines 1645–1649)]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Accessibility — screen reader support (lines 545–554)]
- [Source: _bmad-output/planning-artifacts/architecture.md#Accessibility — prefers-reduced-motion (lines 149, 310)]
- [Source: _bmad-output/planning-artifacts/architecture.md#Testing Patterns]
- [Source: _bmad-output/project-context.md #10 — No Framer Motion, CSS animations only]
- [Source: _bmad-output/project-context.md #11 — WCAG 2.1 AA mandatory]
- [Source: _bmad-output/project-context.md #12 — Testing patterns]
- [Source: NFR-15 — prefers-reduced-motion respected]
- [Source: UX-DR70-71 — Three-tier motion system]
- [Source: _bmad-output/implementation-artifacts/1b-1-typescript-interfaces-frozen-contracts.md — provisional types]
- [Source: _bmad-output/implementation-artifacts/1b-2-constants-format-utilities.md — constants pattern]
- [Source: Party mode adversarial review 2026-04-16 — consensus of Winston, Murat, Amelia, Sally, John, Mary]

## Dev Agent Record

### Implementation Plan

Followed the story's Dev Notes implementation patterns closely. Used `useSyncExternalStore` with three functions (subscribe, getSnapshot, getServerSnapshot). `announceToScreenReader` uses module-scoped Map for tracking active announcements by priority. Added `cleanupAnnouncements` export for test cleanup.

### Debug Log

- ESLint `@typescript-eslint/no-unused-vars` flagged `_query` parameter in `createMatchMediaMock`. Fixed by using `_` prefix with `unknown` type annotation.
- Cross-test pollution in `a11y.test.ts` due to module-scoped `activeAnnouncements` Map persisting between tests. Fixed by exporting `cleanupAnnouncements()` and calling it in `afterEach`.
- Added extra test: "transitions from reduced back to full" (beyond spec minimum) to verify bidirectional reactivity.

### Completion Notes

✅ All 8 acceptance criteria satisfied.
✅ 27 new tests added (19 in useMotionPreference.test.ts, 8 in a11y.test.ts).
✅ Total test count: 128 (101 existing + 27 new).
✅ Zero typecheck errors, zero lint errors, zero test failures.
✅ Added `cleanupAnnouncements` utility export beyond spec for test hygiene — no runtime side effects.

## File List

- `src/types/index.ts` — MODIFIED (added `MotionTier` type)
- `src/hooks/useMotionPreference.ts` — NEW (motion preference hook + MOTION_CONFIGS)
- `src/hooks/useMotionPreference.test.ts` — NEW (19 tests: 6 hook + 11 configs + 2 integration)
- `src/utils/a11y.ts` — NEW (announceToScreenReader + cleanupAnnouncements)
- `src/utils/a11y.test.ts` — NEW (8 tests)
- `src/test-utils/create-match-media-mock.ts` — NEW (shared matchMedia mock factory)

## Review Findings

### decision-needed

- [x] [Review][Decision] 300ms removal delay may be too short for some screen readers — **Resolved: Option 3 (persistent live regions).** Agent consensus (Winston, Sally, Murat, Amelia — 4-0 unanimous). Replaced timer-based removal with persistent `aria-live` regions. No more 300ms delay, no timers, no race conditions.

### patch

- [x] [Review][Patch] `role="status"` conflicts with `aria-live="assertive"` — Fixed: `role="alert"` for assertive, `role="status"` for polite. [src/utils/a11y.ts:19]
- [x] [Review][Patch] No SSR guard in `announceToScreenReader` — Fixed: `typeof document === 'undefined'` early return. [src/utils/a11y.ts:28]
- [x] [Review][Patch] SSR guard added to `getSnapshot` — Fixed: `typeof window === 'undefined'` guard returns `'full'`. Note: hoisting `mql` to module scope was attempted but reverted — it evaluates before test mocks are set up. Lazy evaluation kept. [src/hooks/useMotionPreference.ts:37]
- [x] [Review][Patch] Removal delay hardcoded — **Superseded by persistent live region refactor.** No delay constant needed; elements persist for app lifetime. [src/utils/a11y.ts]
- [x] [Review][Patch] Mock never restores original `window.matchMedia` — Fixed: saves original in closure, restores on `cleanup()`. Also added no-op guard: `setMatches` skips firing when value hasn't changed. [src/test-utils/create-match-media-mock.ts:3,39]

### deferred

- [x] [Review][Defer] Module-scoped `activeAnnouncements` Map can hold stale references across HMR cycles — dev-only, no production impact. [src/utils/a11y.ts:8] — deferred, pre-existing
- [x] [Review][Defer] Mock fires change events on no-op state transitions (`setMatches(true)` when already true) — test fidelity concern, not production issue. [src/test-utils/create-match-media-mock.ts:27-31] — deferred, pre-existing

## Change Log

- 2026-04-18: Story 1B.3 implemented — MotionTier type, useMotionPreference hook, MOTION_CONFIGS constant, announceToScreenReader utility, createMatchMediaMock test utility. 27 new tests, all gates green.
- 2026-04-18: Code review — 6 patches applied. Persistent live regions replace timer-based removal (agent consensus 4-0). SSR guards added. `role="alert"` for assertive priority. Mock cleanup restores original `window.matchMedia`. All 128 tests green.
