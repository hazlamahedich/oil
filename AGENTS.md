# oil — Global Energy Crisis Command Center

## Project Status

**Pre-implementation.** No application source code exists yet. All work is planning artifacts in `_bmad-output/`. Implementation will follow the sprint plan in `_bmad-output/implementation-artifacts/sprint-status.yaml`.

## What This Will Be

Single-file, zero-backend React SPA with 14 interactive analytical panels for the 2026 energy crisis. Dark command center aesthetic. Static embedded data, no API calls, no auth. Deployed as a single HTML file via `vite-plugin-singlefile`.

## Tech Stack (Planned)

React 18 · TypeScript (strict) · Vite · **Tailwind CSS 3.4 (NOT v4)** · Zustand · Recharts · Vitest + RTL · Playwright · Vercel

## Planning Artifact Map

| Path | Purpose |
|------|---------|
| `_bmad-output/project-context.md` | **Implementation rules for AI agents** — read this before writing any code |
| `_bmad-output/planning-artifacts/product-brief-oil.md` | Product scope and success criteria |
| `_bmad-output/planning-artifacts/architecture.md` | Architecture decisions (14-section, step-built) |
| `_bmad-output/planning-artifacts/ux-design-specification.md` | UX patterns, panel specs, interaction flows |
| `_bmad-output/planning-artifacts/epics.md` | Full epic/story breakdown |
| `_bmad-output/planning-artifacts/PRD-Energy-Crisis-Command-Center.md` | Product requirements document |
| `_bmad-output/implementation-artifacts/sprint-status.yaml` | Sprint tracking (file-system based) |

## Critical Constraints (from project-context.md)

- **Tailwind CSS 3.4 only** — do NOT upgrade to v4. Lock in `package.json`.
- **Two Zustand stores only**: `appStore` (UI) + `simulationStore` (simulator). No `dataStore`.
- **Named exports only** — no `export default` anywhere.
- **Path aliases** via `@/` prefix, configured in both `tsconfig.json` and `vite.config.ts`.
- **Dark theme only** — colors as CSS custom properties in `index.css`, never hardcoded in components.
- **Static data** — all data in `src/data/*.ts` as TypeScript constants, imported directly by panels. Zero async, zero API.
- **No Framer Motion** — CSS animations only with `prefers-reduced-motion` support.
- **WCAG 2.1 AA** mandatory — see project-context.md sections 11–12 for specifics.
- **Single-file build output** via `vite-plugin-singlefile`.
- **No environment variables** needed.

## BMad Workflow

This repo uses the BMad method (v6.3.0) with OpenCode skills for project management and implementation. Key skills loaded from `.opencode/skills/`:

- **Planning**: `bmad-create-prd`, `bmad-create-architecture`, `bmad-create-ux-design`, `bmad-create-epics-and-stories`
- **Implementation**: `bmad-create-story`, `bmad-dev-story`, `bmad-quick-dev`
- **Tracking**: `bmad-sprint-planning`, `bmad-sprint-status`, `bmad-checkpoint-preview`
- **Quality**: `bmad-code-review`, `bmad-validate-prd`, `bmad-tea`

Story files live in `_bmad-output/implementation-artifacts/`. Sprint status tracked in `sprint-status.yaml`.

## Implementation Order

Epics execute in numeric order (1A → 1B → 1C → 2 → … → 9). Each epic must complete its stories before the next begins. See `sprint-status.yaml` for story keys and current status.
