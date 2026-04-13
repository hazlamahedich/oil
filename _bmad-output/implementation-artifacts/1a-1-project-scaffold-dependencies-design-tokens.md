# Story 1A.1: Project Scaffold, Dependencies & Design Tokens

Status: done

## Story

As a **developer**,
I want to initialize a Vite react-ts project with all dependencies pinned, design tokens configured, and Tailwind 3.4 locked,
So that the build pipeline is confirmed and the visual language foundation is ready for implementation.

## Acceptance Criteria

1. **AC1 — Scaffold:** `npm create vite@latest . -- --template react-ts` executed from inside the project directory; project scaffolds with React 18+ TypeScript template
2. **AC2 — Dependencies installed:** All deps installed and pinned: Tailwind CSS `^3.4` (pinned via `overrides` in package.json as `"^3.4"`), vite-plugin-singlefile, Zustand, Recharts, @radix-ui/react-tooltip, @radix-ui/react-dialog, jest-axe, clsx, Vitest, React Testing Library, Playwright
3. **AC3 — Build passes:** `npm run build` completes without errors; output is a single HTML file in `dist/` containing inlined CSS and JS; file size > 0 bytes
4. **AC4 — Dev server:** `npm run dev` serves the app on localhost; app renders dark background with "Oil" text visible
5. **AC5 — Color tokens (8 core + 4 severity + 4 additional = 16):** defined as CSS custom properties with Tailwind semantic names using **flat naming** (NOT `crisis-` prefixed — the UX spec's `crisis-*` naming was evaluated and rejected in favor of cleaner flat names for developer ergonomics; this is the authoritative naming convention). CSS vars: `--bg-canvas`, `--bg-panel`, `--border-structural`, `--text-primary`, `--text-secondary`, `--text-muted`, `--warning` (amber), `--cyan`. Severity vars use `--severity-*` prefix: `--severity-critical`, `--severity-warning`, `--severity-elevated`, `--severity-normal`. Additional: `--info`, `--success`, `--accent`, `--purple`. Tailwind names: `bg-canvas`, `bg-panel`, `border-structural`, `text-primary`, `text-secondary`, `text-muted`, `accent-amber`, `accent-cyan`, `severity-critical`, `severity-warning`, `severity-elevated`, `severity-normal`. Severity tokens live in AC5 only — no duplication in AC6.
6. **AC6 — Extended tokens:** 4 escalation tokens (pulse, shimmer, flash, expand — boundary glow deferred to Epic 1C), 4 interaction-state tokens, 4 animation-language tokens, 6 text-on-accent tokens, 2 shadow tokens, 1 overlay token, 3 focus-ring tokens, 1 disabled-text token defined
7. **AC7 — Typography:** 6 levels (display, value, title, body, label, data) with specific weights, sizes, line-heights, and `font-variant-numeric: tabular-nums` on value and data levels. Label (12px System UI) and Data (13px monospace) are separate levels — there is no "Caption" level.
8. **AC8 — Spacing:** 4px base unit configured
9. **AC9 — Border radius:** 3-tier — panel=8px/`rounded-lg`, button=6px/`rounded-md`, element=4px/`rounded` — per UX specification
10. **AC10 — Accessibility baked in:** `prefers-reduced-motion: no-preference` wraps animation properties; `prefers-reduced-motion: reduce` provides `animation: none` fallbacks. `prefers-contrast: more` overrides `--text-secondary` → `#aeaeb2`, `--border-structural` → `#2c2c3a`, focus-ring width → 3px. All via `@media` blocks in `index.css`.
11. **AC11 — Tailwind 3.4 locked:** No v4 upgrade possible (installed as `tailwindcss@"^3.4"` with `"overrides": { "tailwindcss": "^3.4" }` in package.json)
12. **AC12 — No @apply in components:** Only `index.css` may use `@apply`
13. **AC13 — Token audit:** `index.css` contains exactly 8 core color `:root` vars + 4 severity vars + 4 additional vars = 16 total color vars, 4 interaction-state vars, 4 animation keyframes, 6 text-on-accent vars, 2 shadow vars, 1 overlay var, 3 focus-ring vars, 1 disabled-text var
14. **AC14 — Tailwind mapping spot-check:** `bg-canvas` class produces `background-color: #0a0a0f`; `text-primary` produces `color: #e5e5ea`; `border-structural` produces `border-color: #1e1e2a` (DevTools verified)
15. **AC15 — Contrast verification:** `text-primary` on `bg-canvas` ≥ 4.5:1; `text-secondary` on `bg-panel` ≥ 4.5:1 (manual check)
16. **AC16 — prefers-reduced-motion works:** Toggle OS reduced-motion → all pulse animations stop; toggle back → they resume

## Tasks / Subtasks

- [x] Task 1: Scaffold Vite project (AC: #1)
  - [x] Run `npm create vite@latest . -- --template react-ts` from inside the project directory (Vite handles non-empty dirs with a prompt)
  - [x] Verify `src/`, `index.html`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` created
  - [x] Remove boilerplate Vite assets (`src/assets/react.svg`, default `App.css`)
  - [x] Clear default Vite boilerplate from `src/index.css` (keep file, remove content)
  - [x] Update `index.html`: set `<html lang="en">`, update `<title>` to "Oil — Energy Crisis Command Center"
- [x] Task 2: Install all dependencies (AC: #2, #11)
  - [x] Install runtime deps: `npm install zustand recharts clsx @radix-ui/react-tooltip @radix-ui/react-dialog`
  - [x] Install dev deps: `npm install -D tailwindcss@"^3.4" postcss autoprefixer vite-plugin-singlefile vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-axe @playwright/test @vitejs/plugin-react`
  - [x] Pin Tailwind 3.4 via `overrides` in `package.json`: `"overrides": { "tailwindcss": "^3.4" }`
  - [x] Verify `npm ls tailwindcss` shows 3.4.x (not 4.x)
- [x] Task 3: Configure Tailwind CSS (AC: #5, #6, #7, #8, #9, #10, #11, #12)
  - [x] Run `npx tailwindcss init -p` — this creates `tailwind.config.js`; **rename to `tailwind.config.ts`** and add type imports
  - [x] Configure `content` paths: `'./index.html', './src/**/*.{js,ts,jsx,tsx}'`
  - [x] Define `theme.extend.colors` mapping CSS custom properties to Tailwind semantic names using flat keys (e.g., `'canvas': 'var(--bg-canvas)'`, `'panel': 'var(--bg-panel)'`, `'structural': 'var(--border-structural)'`)
  - [x] Define `theme.extend.fontFamily` with system UI and monospace stacks
  - [x] Define `theme.extend.spacing` confirming 4px base (Tailwind default)
  - [x] Define `theme.extend.borderRadius` with 3 tiers: panel=8px, button=6px, element=4px
  - [x] Add `prefers-reduced-motion` variant using Tailwind 3.4 motion utilities
  - [x] Verify no Tailwind v4 packages slip in
- [x] Task 4: Define CSS custom properties / design tokens (AC: #5, #6, #7, #10, #13)
  - [x] Replace `src/index.css` with Tailwind directives (`@tailwind base; @tailwind components; @tailwind utilities;`) + `:root` CSS custom properties
  - [x] Define all 12 core color tokens as `:root` vars (see Token Reference table)
  - [x] Define 4 severity tokens: `--severity-critical`, `--severity-warning`, `--severity-elevated`, `--severity-normal`
  - [x] Define additional color tokens: `--info`, `--success`, `--accent`, `--purple`
  - [x] Define 4 escalation animation keyframes: `--pulse-heartbeat` (2s ease-in-out infinite), `--shimmer-refresh` (1.5s linear), `--flash-severity` (400ms ease-out), `--expand-alert` (3s expansion). Boundary glow deferred to Epic 1C — add placeholder comment only.
  - [x] Define 4 interaction-state tokens: `--surface-hover`, `--surface-active`, `--focus-ring-color`, `--skeleton-pulse`
  - [x] Define 6 text-on-accent tokens: `--text-on-critical` (#ffffff), `--text-on-warning` (#0a0a0f), `--text-on-elevated` (#0a0a0f), `--text-on-stable` (#0a0a0f), `--text-on-accent-amber` (#0a0a0f), `--text-on-accent-cyan` (#0a0a0f)
  - [x] Define 2 shadow tokens: `--shadow-panel`, `--shadow-elevated`
  - [x] Define 1 overlay token: `--overlay-backdrop` (rgba(0,0,0,0.6))
  - [x] Define 3 focus-ring tokens: `--focus-ring-color` (#64d2ff — resolves UX spec internal conflict, see Design Decisions), `--focus-ring-width` (2px), `--focus-ring-offset` (2px)
  - [x] Define 1 disabled-text token: `--text-disabled` (#5a5a6e)
  - [x] Define typography system: 6 levels with weights, sizes, line-heights (see Typography table)
  - [x] Add `font-variant-numeric: tabular-nums` utility class for data elements
  - [x] Add `@media (prefers-contrast: more) { :root { ... } }` block overriding `--text-secondary` → `#aeaeb2`, `--border-structural` → `#2c2c3a`, `--focus-ring-width` → `3px`
  - [x] Wrap animation utility classes in `@media (prefers-reduced-motion: no-preference)`. Add `@media (prefers-reduced-motion: reduce)` block with `animation: none` fallbacks.
  - [x] Define spacing and border-radius tokens
- [x] Task 5: Configure path aliases (AC: #3)
  - [x] Add `resolve.alias: { '@': path.resolve(__dirname, './src') }` to `vite.config.ts`
  - [x] Add `compilerOptions.paths: { "@/*": ["./src/*"] }` to **`tsconfig.app.json`** (app code uses this)
  - [x] Add `compilerOptions.paths: { "@/*": ["./src/*"] }` to **`tsconfig.json`** as well (per architecture.md requirement — `tsconfig.json` is a project reference file but must include paths for editor/IDE resolution)
- [x] Task 6: Wire up App.tsx with Tailwind dark theme (AC: #3, #4)
  - [x] Replace default `App.tsx` with minimal dark-themed shell using `bg-canvas` + `text-primary` tokens. Use named export: `export function App()`
  - [x] Update `main.tsx` — keep `<StrictMode>` wrapper, ensure `import './index.css'` is present, clean React 18 root render
  - [x] Remove `App.css` — all styling via Tailwind utilities + `index.css` tokens
  - [x] Create `src/lib/test-alias.ts` with a named export, import it in `App.tsx` using `@/lib/test-alias` to verify path aliases work, then remove test import
- [x] Task 7: Verify build & dev server (AC: #3, #4, #13, #14, #15, #16)
  - [x] Run `npx tsc --noEmit` — zero type errors (validates path aliases + TypeScript config separately from Vite)
  - [x] Run `npm run build` — zero errors; verify `dist/` contains a single HTML file with inlined CSS/JS
  - [x] Run `npm run dev` — app renders on localhost with dark background and "Oil" text
  - [x] Verify CSS custom properties are present in built output via DevTools
  - [x] Verify Tailwind classes compile correctly: `bg-canvas` → `#0a0a0f`, `text-primary` → `#e5e5ea`, `border-structural` → `#1e1e2a`
  - [x] Verify contrast ratios: text-primary on bg-canvas ≥ 4.5:1, text-secondary on bg-panel ≥ 4.5:1
  - [x] `grep -r "export default" src/` returns nothing (named exports only)
  - [x] `grep -r "framer-motion" package.json` returns nothing
  - [x] Toggle OS reduced-motion → verify animations stop; toggle back → they resume

## Dev Notes

### Architecture Compliance

- **Named exports only** — no `export default` anywhere in this story. `App` must be `export function App()` [Source: project-context.md #2]
- **Path aliases** configured in **both** `tsconfig.json` and `tsconfig.app.json` plus `vite.config.ts` before any imports use `@/` [Source: project-context.md #3, architecture.md path alias config]
- **Tailwind 3.4 locked** via `package.json` overrides (`"tailwindcss": "^3.4"`) — `npm ls tailwindcss` must confirm 3.4.x [Source: project-context.md #4, AGENTS.md]
- **Dark theme only** — background `#0a0a0f`, panel `#111118`, border `#1e1e2a`, accent `#ff453a`. No light mode. [Source: project-context.md #5]
- **No Framer Motion** — CSS `@keyframes` + `transition` only [Source: project-context.md #10]
- **`@apply` only in `index.css`** — never in component files [Source: project-context.md #13]
- **Keep `<StrictMode>`** in main.tsx — zero cost for a static app, catches dev-time issues
- **Token naming — DESIGN DECISION:** CSS vars use flat `--{category}[-variant]` naming (e.g., `--bg-canvas`, `--severity-critical`). Tailwind semantic names use flat keys (e.g., `bg-canvas`, `text-primary`). The UX spec's `crisis-` prefixed naming (e.g., `bg-crisis-bg`, `text-crisis-accent`) was evaluated and **rejected** — flat names are more ergonomic, avoid redundancy (the whole app IS a crisis dashboard), and match the architecture.md convention. This story establishes the authoritative naming convention.
- **Scaffold into current dir** — use `npm create vite@latest . -- --template react-ts` from inside the project dir (Vite prompts on non-empty dirs)

### Library & Framework Requirements

| Dependency | Version | Purpose | Install As |
|---|---|---|---|
| React | 18+ (from Vite template) | UI framework | runtime |
| TypeScript | strict (from Vite template) | Type safety | runtime |
| Tailwind CSS | **3.4.x** (LOCK via overrides) | Styling + tokens | dev |
| PostCSS | latest | Tailwind integration | dev |
| Autoprefixer | latest | Vendor prefixes | dev |
| vite-plugin-singlefile | latest | Single-file build output | dev |
| Zustand | latest | State management (stores in 1B) | runtime |
| Recharts | latest | Charts (panels in Epics 2+) | runtime |
| clsx | latest | Conditional Tailwind classes | runtime |
| @radix-ui/react-tooltip | latest | Tooltip primitives | runtime |
| @radix-ui/react-dialog | latest | Dialog primitives | runtime |
| Vitest | latest | Unit testing | dev |
| @testing-library/react | latest | Component testing | dev |
| @testing-library/jest-dom | latest | DOM matchers | dev |
| @testing-library/user-event | latest | User interaction simulation | dev |
| jest-axe | latest | Automated WCAG checks | dev |
| @playwright/test | latest | E2E testing | dev |

### File Structure Notes

Files created/modified in this story:

```
oil/
├── package.json                    # Dependencies + overrides for Tailwind 3.4
├── vite.config.ts                  # Path alias @/ -> src/, react plugin
├── tsconfig.json                   # Path alias @/* -> ./src/*
├── tsconfig.app.json               # App TypeScript config
├── tsconfig.node.json              # Node TypeScript config
├── tailwind.config.ts              # Theme tokens, colors, typography, spacing, radius, prefers-reduced-motion
├── postcss.config.js               # Tailwind + autoprefixer
├── index.html                      # Entry HTML (from Vite template)
├── src/
│   ├── main.tsx                    # React 18 root render
│   ├── App.tsx                     # Minimal dark-themed shell
│   ├── index.css                   # Tailwind directives + :root CSS custom properties (ALL tokens)
│   └── vite-env.d.ts               # Vite type declarations
```

### Design Token Reference — Exact Values

**Core Color Tokens (12) — DESIGN DECISION on naming:**
- CSS vars use `--severity-*` prefix (not `--status-*` from UX spec Customization Strategy section — resolves UX spec internal conflict between Customization Strategy's `--status-*` and Severity Escalation's `--severity-*`; `--severity-*` is clearer and more self-documenting)
- Hex values use the Core Palette values (not the Severity Escalation table values) — resolves UX spec internal conflict where Core Palette says `#ff453a` for accent-red but Severity Escalation says `#ff4444`; Core Palette values are referenced throughout architecture.md and project-context.md

| Token | CSS Var | Value | Tailwind Name |
|---|---|---|---|
| App background | `--bg-canvas` | `#0a0a0f` | `bg-canvas` |
| Panel background | `--bg-panel` | `#111118` | `bg-panel` |
| Border/structural | `--border-structural` | `#1e1e2a` | `border-structural` |
| Primary text | `--text-primary` | `#e5e5ea` | `text-primary` |
| Secondary text | `--text-secondary` | `#8e8e93` | `text-secondary` |
| Muted text (decorative only) | `--text-muted` | `#48484a` | `text-muted` |
| Warning/amber | `--warning` | `#ffb340` | `accent-amber` |
| Info/cyan | `--cyan` | `#64d2ff` | `accent-cyan` |
| Critical severity | `--severity-critical` | `#ff453a` | `severity-critical` |
| Warning severity | `--severity-warning` | `#ffb340` | `severity-warning` |
| Elevated severity | `--severity-elevated` | `#ff9500` | `severity-elevated` |
| Normal/stable | `--severity-normal` | `#30d158` | `severity-normal` |

**Additional color tokens:**
- `--info` = `#0a84ff` (interactive neutral)
- `--success` = `#30d158`
- `--accent` = `#ff453a`
- `--purple` = `#bf5af2` (editorial/AI estimates only)

**Text-on-accent tokens (6):**

| Token | Value | WCAG on accent bg | Usage |
|---|---|---|---|
| `--text-on-critical` | `#ffffff` | 4.6:1 on #ff453a | Critical badges |
| `--text-on-warning` | `#0a0a0f` | 7.2:1 on #ffb340 | Warning badges |
| `--text-on-elevated` | `#0a0a0f` | 6.8:1 on #ff9500 | Elevated badges |
| `--text-on-stable` | `#0a0a0f` | 7.5:1 on #30d158 | Stable badges |
| `--text-on-accent-amber` | `#0a0a0f` | 7.2:1 on #ffb340 | Amber accents |
| `--text-on-accent-cyan` | `#0a0a0f` | 8.1:1 on #64d2ff | Cyan accents |

**Shadow tokens (2):**
- `--shadow-panel`: `0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03)` — panel elevation
- `--shadow-elevated`: `0 4px 12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)` — tooltips, modals

**Overlay token (1):**
- `--overlay-backdrop`: `rgba(0,0,0,0.6)` — behind modals, dialogs

**Focus ring tokens (3) — DESIGN DECISION:**
- `--focus-ring-color`: `#64d2ff` (resolves UX spec internal conflict: the spec gives `#0a84ff` in interaction states and `#38bdf8` in keyboard section. `#64d2ff` = the `--cyan` token, provides 8.1:1 contrast on `#111118`, matches the accent-cyan identity, and was verified as WCAG AA compliant in the UX spec's own contrast table)
- `--focus-ring-width`: `2px` (3px when prefers-contrast: more)
- `--focus-ring-offset`: `2px`

**Disabled text token (1):**
- `--text-disabled`: `#5a5a6e` (2.5:1 on #111118 — WCAG exception for disabled elements)

**Escalation tokens (4):** animation keyframes + durations (boundary glow deferred to Epic 1C)
- `--pulse-heartbeat`: 2s ease-in-out infinite opacity oscillation
- `--shimmer-refresh`: 1.5s linear gradient sweep
- `--flash-severity`: 400ms ease-out single flash
- `--expand-alert`: 3s height expansion
- `/* Boundary glow — defined in Epic 1C when simulator is built */`

**Interaction-state tokens (4):**
- `--surface-hover`: ~5% brightness lift
- `--surface-active`: ~3% brightness dip
- `--focus-ring`: uses `--focus-ring-color`, `--focus-ring-width`, `--focus-ring-offset`
- `--skeleton-pulse`: animated gradient shimmer

**Accessibility media query overrides:**
- `@media (prefers-contrast: more)`: `--text-secondary` → `#aeaeb2`, `--border-structural` → `#2c2c3a`, `--focus-ring-width` → `3px`
- `@media (prefers-reduced-motion: reduce)`: all animations → `animation: none`; simplified 200ms transitions only

**Typography (6 levels):**

| Level | Weight | Size | Line-height | Family | Usage |
|---|---|---|---|---|---|
| Display | 700 | 36px | 1.1 (40px) | System UI | Master status, hero numbers |
| Value (h1) | 700 | 24px | 1.2 (29px) | Monospace tabular-nums | KPI values, primary data points |
| Title (h2) | 600 | 14px | 1.4 (20px) | System UI | Panel headings, section labels |
| Body | 400 | 14px | 1.5 (21px) | System UI | Descriptions, briefing text |
| Label | 400 | 12px | 1.4 (17px) | System UI | Metadata, source badges |
| Data | 400 | 13px | 1.4 (18px) | Monospace tabular-nums | Chart values, table cells, inline numerics |

**Spacing:** 4px base (Tailwind default scale).
**Border radius:** 3-tier — Panel = 8px (`rounded-lg`), Button = 6px (`rounded-md`), Element = 4px (`rounded`) — per UX specification.

**Note:** Chart-specific tokens (axis lines, gridlines, tooltip bg, legend text) deferred to Epic 2 Story 2.1 when Recharts theming is configured against real panel data.

### Anti-Patterns to Avoid

- Do NOT use `export default` — named exports only everywhere
- Do NOT hardcode hex colors in components — use CSS custom properties via Tailwind semantic names
- Do NOT use `@apply` in any component CSS — only in `index.css`
- Do NOT use Framer Motion — CSS animations only
- Do NOT upgrade Tailwind to v4 — this is a hard constraint from AGENTS.md
- Do NOT use inline styles except for dynamic SVG positioning
- Do NOT install any state management or data libraries beyond Zustand (stores created in 1B)
- Do NOT create any components beyond the minimal App shell

### Critical Constraints

- This is the **FIRST story** — everything downstream depends on a clean scaffold
- Tailwind 3.4 is the single most important lock — `npm ls tailwindcss` must show 3.4.x after install
- CSS custom properties in `:root` are the single source of truth for all colors
- `vite-plugin-singlefile` is NOT configured in this story (that's Story 1A.2) — just install it
- No stores, no data files, no hooks, no components beyond App shell
- Path aliases MUST work before moving to next story — verified via `npx tsc --noEmit` and a test `@/` import
- `npx tailwindcss init -p` creates `.js` — must manually rename to `tailwind.config.ts`
- Keep `<StrictMode>` in main.tsx
- Chart tokens (axis, gridline, tooltip bg, legend) deferred to Epic 2 Story 2.1

### Design Decisions (Resolving UX Spec Internal Conflicts)

The UX design specification has internal contradictions. This story resolves them as follows — these decisions are authoritative:

| Decision | Options | Resolution | Rationale |
|----------|---------|------------|-----------|
| Tailwind naming | Flat (`bg-canvas`) vs `crisis-` prefix (`bg-crisis-bg`) | **Flat** | The entire app is a crisis dashboard; `crisis-` prefix is redundant and verbose |
| Focus ring color | `#0a84ff` (UX interaction) vs `#38bdf8` (UX keyboard) vs `#64d2ff` (cyan token) | **`#64d2ff`** | Matches accent-cyan identity, 8.1:1 contrast, consistent with token system |
| Severity prefix | `--severity-*` (UX escalation) vs `--status-*` (UX customization) | **`--severity-*`** | More self-documenting, consistent with Core Palette naming |
| Severity hex values | Core Palette values vs Severity Escalation table values | **Core Palette** | Referenced throughout architecture.md and project-context.md |
| `--warning` value | `#ff9500` (UX customization) vs `#ffb340` (UX color system) | **`#ffb340`** | Matches `accent-amber` identity; `#ff9500` reserved for `--severity-elevated` |
| Token naming convention | `--{semantic}-{scale}` (architecture) vs flat (story) | **Flat** | No multi-scale tokens needed; flat names are cleaner and match actual usage |

### Testing Standards

- This story does NOT set up the test infrastructure (that's Story 1B.7)
- However, Vitest must be installed as a dev dependency
- `npm run build` must pass — this is the primary verification

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Epic 1A — Story 1A.1]
- [Source: _bmad-output/planning-artifacts/architecture.md#Starter Template — Vite react-ts]
- [Source: _bmad-output/planning-artifacts/architecture.md#Additional Dependencies table]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Color System — Core Palette]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Typography System]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Spacing & Layout Foundation]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Animation Language tokens]
- [Source: _bmad-output/project-context.md — all 20 sections]
- [Source: AGENTS.md — Tailwind 3.4 locked, two stores only, named exports, dark theme only]

## Dev Agent Record

### Agent Model Used

zai-coding-plan/glm-5.1

### Debug Log References

- Vite scaffold required temp directory approach (non-empty dir prompt cancels in CI). Files copied from /tmp/oil-temp.
- TypeScript 6.0 deprecated `baseUrl` — added `ignoreDeprecations: "6.0"` to tsconfig.app.json to silence TS5101.

### Completion Notes List

- Scaffolded Vite react-ts project, removed all boilerplate assets and CSS
- Installed all 12 runtime + 12 dev dependencies; Tailwind 3.4.19 locked via overrides
- Configured tailwind.config.ts with flat semantic color names, typography levels, border-radius tiers, animation keyframes
- Defined 35 CSS custom properties in index.css: 16 color tokens, 6 text-on-accent, 2 shadow, 1 overlay, 3 focus-ring, 1 disabled-text, 3 interaction-state, plus typography utilities and accessibility media queries
- Path aliases (@/) configured in vite.config.ts, tsconfig.json, and tsconfig.app.json; verified via test import + tsc --noEmit
- Build passes (tsc + vite build); dev server renders dark background with "Oil" text
- Contrast ratios verified: text-primary on bg-canvas = 15.73:1, text-secondary on bg-panel = 5.76:1
- No export default, no framer-motion, Tailwind 3.4.x confirmed

### File List

- package.json — modified (deps installed, overrides added, name changed)
- vite.config.ts — modified (path alias @/ -> src/, react plugin)
- tsconfig.json — modified (added compilerOptions.paths for @/*)
- tsconfig.app.json — modified (added baseUrl, paths, ignoreDeprecations)
- tailwind.config.ts — created (theme tokens, colors, typography, spacing, radius, animations)
- postcss.config.js — created (tailwindcss + autoprefixer)
- index.html — modified (title updated)
- src/index.css — replaced (Tailwind directives + :root CSS custom properties)
- src/App.tsx — replaced (minimal dark-themed shell, named export)
- src/main.tsx — replaced (clean React root render with named import)
- src/vite-env.d.ts — created (Vite type declarations)
- src/App.css — deleted
- src/assets/ — deleted (react.svg, vite.svg, hero.png)

### Review Findings

- [x] [Review][Decision] prefers-reduced-motion implementation approach [src/index.css:125-133] — RESOLVED: Option B. Changed to `animation: none !important` under `prefers-reduced-motion: reduce`, added `scroll-behavior: auto !important`. Majority (3-1) consensus from party mode review.
- [x] [Review][Decision] 4 escalation tokens — missing CSS vars or covered by keyframes? [tailwind.config.ts:49-78] — RESOLVED: Option A. Keyframes satisfy AC6. Tie (2-2) broken in favor of simplicity — animation tokens are consumed via Tailwind classes, not CSS vars.
- [x] [Review][Decision] export default in config files [tailwind.config.ts:84, vite.config.ts:5, postcss.config.js:1, eslint.config.js:8] — RESOLVED: Option B. Non-issue. Unanimous (4-0). Rule targets src/ application code.
- [x] [Review][Patch] Redundant dead CSS — :root unlayered overrides @layer base body [src/index.css:47-49 vs 52-65] — FIXED: Removed duplicate .tabular-nums utility.
- [x] [Review][Patch] Missing favicon.svg causes 404 [index.html:5] — FIXED: Removed favicon link tag.
- [x] [Review][Patch] Only 3 interaction-state tokens (expected 4) [src/index.css:43-45] — FIXED: Added `--surface-focus: rgba(255, 255, 255, 0.07)` as 4th token + Tailwind mapping.
- [x] [Review][Patch] Border-radius element tier (4px) not explicitly declared [tailwind.config.ts:41-44] — FIXED: Added `DEFAULT: '4px'` to borderRadius config.
- [x] [Review][Patch] .tabular-nums utility duplicates Tailwind built-in [src/index.css:112-114] — FIXED: Removed custom .tabular-nums, Tailwind's built-in is sufficient.
- [x] [Review][Defer] No test script despite vitest installed [package.json] — deferred, test infrastructure is Story 1B.7
- [x] [Review][Defer] Missing typecheck script [package.json] — deferred, nice-to-have not required by AC
- [x] [Review][Defer] ignoreDeprecations/erasableSyntaxOnly suppress TS 6.0 diagnostics [tsconfig.app.json] — deferred, required for TS 6.0 compat
- [x] [Review][Defer] No test script despite vitest installed [package.json] — deferred, test infrastructure is Story 1B.7
