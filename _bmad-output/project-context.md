---
project_name: 'oil'
user_name: 'team mantis b'
date: '2026-04-12'
sections_completed: ['technology_stack']
existing_patterns_found: 15
---

# Project Context for AI Agents

_Critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Framework | React | 18+ | Functional components + hooks only. No concurrent features. |
| Language | TypeScript | Strict mode | `tsconfig.app.json` + `tsconfig.node.json` split |
| Build | Vite | Latest | Rolldown bundler, HMR, `vite-plugin-singlefile` for prod |
| Styling | Tailwind CSS | **3.4 (DO NOT upgrade to v4)** | Utility-first, dark theme only, CSS custom properties for tokens |
| State | Zustand | Latest | Two stores only: `appStore` (UI) + `simulationStore` (simulator) |
| Charts | Recharts | Latest | Standard charts; custom SVG for node graph only |
| Class Composition | clsx | Latest | Conditional Tailwind classes |
| Unit Tests | Vitest + RTL | Latest | Co-located test files per source file |
| E2E Tests | Playwright | Latest | Cross-browser microscope suite (~27 tests) |
| Deploy | Vercel (free tier) | — | Static site from Git, single HTML file output |

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
- CSS custom property naming: `--{semantic}-{scale}` (e.g., `--danger-500`, `--success-200`)

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
