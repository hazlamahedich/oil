---
project_name: 'oil'
user_name: 'team mantis b'
date: '2026-04-13'
sections_completed: ['technology_stack']
existing_patterns_found: 15
epic_1a_complete: true
last_retro_update: '2026-04-13'
---

# Project Context for AI Agents

_Critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Framework | React | **19.2.4** | Functional components + hooks only. Template installed React 19 (architecture says "18+"). |
| Language | TypeScript | Strict mode (`strict: true` in `tsconfig.app.json`) | `tsconfig.app.json` + `tsconfig.node.json` split. TS 6.0: `ignoreDeprecations: "6.0"` added. |
| Build | Vite | 6.x (from template) | `vite-plugin-singlefile` for prod single-file output. Rolldown bundler, HMR. |
| Styling | Tailwind CSS | **3.4.19 (DO NOT upgrade to v4)** | Locked via `overrides` in `package.json`. Utility-first, dark theme only, CSS custom properties for tokens. |
| State | Zustand | Latest | Two stores only: `appStore` (UI) + `simulationStore` (simulator) |
| Charts | Recharts | **3.8.1** | GO decision confirmed in Epic 1A. Standard charts; custom SVG for node graph only. |
| Class Composition | clsx | Latest | Conditional Tailwind classes |
| Unit Tests | Vitest + RTL | Latest | jsdom environment, co-located test files per source file |
| E2E Tests | Playwright | Latest | Network isolation test exists in `e2e/`. Full panel suite (~27 tests) in Epic 9. |
| Deploy | Vercel (free tier) | — | `vercel.json` configured. Static site from Git, single HTML file output. |

---

## Critical Implementation Rules

### 1. TWO STORES ONLY — No dataStore

- `appStore`: UI state (activePanel, viewport breakpoint, persona context)
- `simulationStore`: Simulator parameters + derived outputs (only SimulatorPanel reads/writes this)
- **NO `dataStore`** — panels import static data directly from `data/*.ts` via named imports
- Never create a new Zustand store without documenting its contract in `architecture.md`

### 2. Named Exports Only — No Default Exports

Every component, store, hook, utility, and type uses **named exports**. No `export default` anywhere.

### 3. Path Aliases Required

All imports use Vite path aliases: `@/components/...`, `@/stores/...`, `@/data/...`, `@/computation/...`, `@/hooks/...`, `@/utils/...`

Must be configured in **both** `tsconfig.json` (compilerOptions.paths) **and** `vite.config.ts` (resolve.alias).

### 4. Tailwind CSS 3.4 — DO NOT UPGRADE TO v4

This is a hard constraint from AGENTS.md. Lock `tailwindcss` to `3.4.x` in `package.json`.

### 5. Dark Theme Only — No Toggle

- Background: `#0a0a0f`, Panel: `#111118`, Border: `#1e1e2a`, Accent: `#ff453a`
- All colors defined as CSS custom properties in `index.css`, referenced via `tailwind.config.ts theme.extend`
- **Never hardcode hex values in component code** — always use theme tokens
- **Token naming: flat convention** (e.g., `--bg-canvas`, `--severity-critical`, `--accent-cyan`). NOT `--{semantic}-{scale}` with numeric scales. See `src/index.css` `:root` block as the authoritative source of truth.
- **Design decisions** from Story 1A.1 resolved 6 UX spec internal conflicts — see the Design Decisions table in `_bmad-output/implementation-artifacts/1a-1-project-scaffold-dependencies-design-tokens.md` for the authoritative rulings (flat naming, focus ring `#64d2ff`, `--severity-*` prefix, Core Palette hex values, `--warning` = `#ffb340`, flat token convention).

### 6. Static Data — Zero Async, Zero API

- All data is embedded as TypeScript constants in `src/data/*.ts`
- 4 data files: `energy-data.ts`, `economic-data.ts`, `geopolitical-data.ts`, `cascade-data.ts`
- Each file exports `DATA_AS_OF` timestamp constant for staleness detection (7-day threshold)
- TypeScript interfaces enforce shape at compile time — no runtime schema validation (no Zod)
- Build-time validation via `scripts/validate-data.ts` prebuild step

### 7. Panel Rendering — Lazy Mount/Unmount

- Only the active panel is mounted in the DOM (state-driven conditional rendering, no router)
- Non-visible panels are **unmounted**, not hidden via CSS
- Panel state preserved via Zustand stores when unmounting/remounting
- Loading state: skeleton placeholder on first tab switch (max 1.5s)

### 8. Error Boundaries — One Per Panel

- Every panel wrapped in centrally-defined `PanelErrorBoundary` component
- Error message: "Data unavailable for this panel" + retry button
- **No agent implements custom error boundary UI** — use the shared component

### 9. Computation Functions — Pure, in `src/computation/`

- `computeEconomicOutputs.ts`: `(price, duration, severity) => EconomicOutputs`
- `computeGraphState.ts`: `(selectedNode, cascade) => { highlighted, edges, direction }`
- No side effects, no external dependencies, typed input/output
- Components wrap calls in `useMemo` with appropriate dependency arrays

### 10. No Framer Motion — CSS Animations Only

- CSS `@keyframes` + `transition` only
- `prefers-reduced-motion` disables all animations
- `prefers-contrast` enhances contrast mode
- Animation durations: 150-300ms data transitions, up to 500ms panel switches
- CSS transitions run on compositor thread (smoother)

### 11. Accessibility — WCAG 2.1 AA Mandatory

- Every panel: `<h2>` heading as first focusable element for screen reader announcement
- Tab bar: Left/Right arrow navigation, Tab exits to panel content
- SVG charts: `<title>` + `<desc>`, `aria-label` on data points, keyboard-focusable elements
- Chart data: conveyed by **both** color and numeric text labels (never color alone)
- Tabular data: use `<table>` with `<th>` headers, not div-based grids
- "Data as of [date]" timestamp displayed on every panel
- Null/missing data: display "—" (em dash), never "null" or "undefined"

### 12. Testing Patterns

- **Co-located**: `XyzPanel.test.tsx` next to `XyzPanel.tsx`
- **Store testing**: Test against real stores with `setState` overrides. Do NOT mock Zustand hooks.
- **Chart testing**: Assert via `aria-label` + `data-testid`, never inspect SVG children directly
- **Error boundary testing**: One test per panel — throw error, verify catch, other panels functional
- **Keyboard testing**: `userEvent.tab()` for focus order verification on every interactive panel
- **Accessibility testing**: `jest-axe` per panel for automated WCAG checks

### 13. No `@apply` in Component CSS

Use Tailwind utility classes in JSX. `@apply` only in `index.css` for base styles.

### 14. Import/Export Anti-Patterns

**Forbidden:**
- Default exports
- Relative imports beyond same-directory (use `@/` aliases)
- Inline styles (except dynamic SVG positioning)
- Importing data through a store layer
- Creating shared components before spiking at least one panel
- Mixing data fetching logic with rendering logic

### 15. Number & Date Formatting

- Dates: ISO 8601 (`YYYY-MM-DD`) for display, `Date` objects for computation
- Numbers: `Intl.NumberFormat` — oil prices: 2 decimals with `$`, production: 1 decimal with unit, percentages: 1 decimal with `%`
- Missing data: "—" (em dash), never "null"/"undefined"

### 16. Node Graph — Fixed Layout, No Force Simulation

- 19 nodes with hardcoded SVG coordinates (topology-based, not physics-based)
- Three interaction states: Resting, Trace (animated flow), Focus (dimmed background)
- Animated `stroke-dashoffset` for directional flow indication
- `computeGraphState` pure function handles all traversal logic

### 17. Store Selector Subscriptions

Components subscribe to **minimum state slices**: `useAppStore(state => state.activePanel)`.
Use `zustand/shallow` for comparing selector arrays to prevent unnecessary re-renders.

### 18. Panel File Template

```tsx
import { OIL_HISTORY, DATA_AS_OF } from '@/data/energy-data';
import { DataBadge } from '@/components/shared/DataBadge';
import { useDataFreshness } from '@/hooks/useDataFreshness';

export function XyzPanel() {
  const { isStale, ageDays } = useDataFreshness(DATA_AS_OF);
  const [sortKey, setSortKey] = useState('default');

  return (
    <section aria-labelledby="xyz-heading">
      <h2 id="xyz-heading">Panel Title</h2>
      <DataBadge source="Source Name" date={DATA_AS_OF} isStale={isStale} />
      {/* panel content */}
    </section>
  );
}
```

### 19. Build Output — Single File

`vite-plugin-singlefile` inlines all CSS/JS into one HTML file for production. Dev mode uses standard Vite dev server with HMR.

### 20. No Environment Variables Needed

Zero API keys, zero backend URLs, zero environment configuration. Build mode (dev vs prod) is the only configuration axis.

### 21. Bundle Size Baseline (Epic 1A)

- **With Recharts**: 527.67 KB uncompressed, 157.07 KB gzipped
- **Without Recharts**: 191.75 KB uncompressed
- **Recharts adds**: ~336 KB uncompressed, ~97 KB gzipped
- **CI gate**: 1.5 MB uncompressed hard fail (via `scripts/check-bundle-size.ts` postbuild hook)
- **Headroom remaining**: ~970 KB uncompressed for 14 panels + shared components
- Tracking in `docs/bundle-size-baseline.md`
