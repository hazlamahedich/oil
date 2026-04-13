# Story 1B.1: TypeScript Interfaces (Provisional Type Contracts)

Status: done

## Story

As a **developer**,
I want all shared TypeScript interfaces defined as provisional contracts in `src/types/index.ts`,
So that consumer epics (1B.2–1B.7, then 1C–9) can code against stable-derived contracts without circular dependencies.

**Provisional status:** Any interface may be revised by any consuming story during Epic 1B with a note in the PR documenting the FR reference and rationale. After Epic 1B closes, types enter a stability review — changes require updating all consumers.

## Acceptance Criteria

1. **AC1 — Core interfaces defined (exactly 12):** `src/types/index.ts` exports: `OilHistoryRecord`, `GDPForecast`, `CascadeNode`, `SupplyChainNode`, `SupplyChainEdge`, `ScenarioParameter`, `SimulationInput`, `SimulationOutput`, `KPIData`, `PanelState<T>`, `PanelConfig`, `EmptyStateProps`. **Note:** `SimulationResult` (AC3) is the combined store shape `SimulationInput & { outputs: SimulationOutput }` — it is tracked under supporting types but is critical for `simulationStore`.
2. **AC2 — Additional interfaces defined (exactly 10):** `CeasefireStatus`, `ShippingTrafficPeriod`, `CommodityDisruption`, `VulnerabilityScore`, `StagflationIndicator`, `PolicyResponse`, `HistoricalCrisis`, `EnergyTransitionIndicator`, `TimelineEvent`, `PriceRecord`
3. **AC3 — Supporting types defined (exactly 15):** `DataPointSelectResult`, `DataPointSelectCallback`, `SeverityLevel`, `KPIStatus`, `TrendDirection`, `PanelStatus`, `PanelTabGroup`, `DataSource`, `SimulationOutput`, `SimulationResult`, `PresetScenario`, `FocusCountry`, `RegionCode`, `PolicyResponseType`, `DataFreshnessThreshold`, `SourcedRecord`
4. **AC4 — JSDoc with FR traceability on every exported type:** Each interface/type has a JSDoc comment with: purpose description, consumer epics (`@consumers`), and at least one FR reference (`@fr`) linking to the requirement that defines its fields
5. **AC5 — TypeScript compiles:** `tsc --noEmit` passes with zero errors after file creation
6. **AC6 — Named exports only:** No `export default`; all types use named exports
7. **AC7 — No runtime code:** File contains only type declarations (`interface`, `type`, `enum`). Zero functions, zero values, zero imports from non-type modules (exception: `import type { ReactNode } from 'react'` for `EmptyStateProps.icon`)
8. **AC8 — No overlapping status enumerations:** `PanelStatus` is the canonical panel lifecycle discriminator. `EmptyStateProps.reason` extends `PanelStatus` values without creating a second overlapping status set
9. **AC9 — No redundant type pairs:** `SimulationOutput` (5 computed fields) and `SimulationResult` (combined input+output) have clearly distinct shapes. `CascadeNode` and `SupplyChainNode` have an explicit inheritance or subset relationship

## Tasks / Subtasks

- [x] Task 1: Create `src/types/index.ts` with all core interfaces (AC: #1)
  - [x] **Create `src/types/` directory** — it does not exist yet. Only `index.ts` goes inside it.
  - [x] Define `SourcedRecord` base type — `{ source?: string; isEstimated?: boolean }` for FR-053, FR-062, FR-074 compliance
  - [x] Define `OilHistoryRecord extends SourcedRecord` — `{ date: string; brent: number; wti: number; volume?: number; event?: string }` [FR-024, FR-025, FR-026, FR-027]
  - [x] Define `GDPForecast` — `{ region: RegionCode; preCrisisGdp: number; postCrisisGdp: number; delta: number; inflation2026: number; source?: string }` [FR-008, FR-009]
  - [x] Define `CascadeNode` — `{ id: string; label: string; disruptionLevel: number; category: string }` [FR-015, FR-016]
  - [x] Define `SupplyChainNode extends CascadeNode` — `{ position: { x: number; y: number }; description: string; upstream: string[]; downstream: string[] }` [FR-017, FR-018, FR-019]
  - [x] Define `SupplyChainEdge` — `{ source: string; target: string; direction: 'upstream' | 'downstream' }` [FR-019]
  - [x] Define `ScenarioParameter` — `{ id: string; name: string; probability: number; oilPrice6mo: number; gdpImpact: number; inflationAddition: number; tradeImpact: number; recoveryTimeline: string }` [FR-020, FR-021, FR-022, FR-023]
  - [x] Define `SimulationInput` — `{ oilPrice: number; duration: number; severity: number }` with JSDoc ranges [FR-034, FR-035, FR-036]
  - [x] Define `SimulationOutput` — `{ gdpImpact: number; inflationAddition: number; tradeSlowdown: number; foodPriceRise: number; estimatedJobImpact: number }` [FR-037]
  - [x] Define `KPIData` — `{ value: number; previousValue?: number; unit?: string; trend?: TrendDirection; status?: KPIStatus }` [FR-001]
    - `KPIStatus` = `'critical' | 'warning' | 'stable' | 'improving'` — matches UX spec data contract (NOT `SeverityLevel` which uses `'elevated' | 'normal'` for different semantics)
  - [x] Define `PanelState<T>` — `{ status: PanelStatus; data: T | null; error: Error | null }` [UX-DR119]
  - [x] Define `PanelConfig` — `{ id: string; title: string; tab: PanelTabGroup; sourceBadge: { origin: string; date: string; confidence: number }; extractionTargets?: string[]; fogLevel?: 'clear' | 'light' | 'moderate' | 'heavy' }` [UX-DR120]
  - [x] Define `EmptyStateProps` — `{ reason: 'no-data' | 'loading' | 'error' | 'filtered-out'; message: string; action?: { label: string; url: string }; icon?: ReactNode }` [UX-DR123]

- [x] Task 2: Define all additional data interfaces (AC: #2)
  - [x] `CeasefireStatus` — `{ status: string; tankerCount: number; tollCharges: string; mineClearance: string; recoveryEstimate: string; lastUpdated: string }` [FR-006]
  - [x] `ShippingTrafficPeriod` — `{ period: string; dailyVessels: number; label: string }` [FR-005, FR-007]
  - [x] `CommodityDisruption extends SourcedRecord` — `{ name: string; disruptionLevel: number; unit: string }` [FR-028, FR-029, FR-030]
  - [x] `VulnerabilityScore` — `{ country: FocusCountry; overallScore: number; fossilDependency: number; importDependence: number; fiscalResilience: number }` [FR-031, FR-032, FR-033]
  - [x] `StagflationIndicator` — `{ name: string; currentValue: number; preCrisisBaseline: number; unit: string; isDanger: boolean }` [FR-012, FR-013, FR-014]
  - [x] `PolicyResponse` — `{ id: string; country: string; description: string; type: PolicyResponseType; date: string }` [FR-042, FR-043, FR-044]
  - [x] `HistoricalCrisis` — `{ year: number; name: string; priceChangePercent: number; gdpImpact: number; description: string }` [FR-045, FR-046]
  - [x] `EnergyTransitionIndicator` — `{ name: string; currentValue: number; unit: string; direction: 'acceleration' | 'regression' }` [FR-047, FR-048]
  - [x] `TimelineEvent` — `{ date: string; title: string; description: string; severity: SeverityLevel }` [FR-039, FR-040, FR-041]
  - [x] `PriceRecord` — `{ date: string; brent: number; wti: number; event?: string }` [FR-024, FR-025, FR-026, FR-027]

- [x] Task 3: Define supporting types and enums (AC: #3)
  - [x] `SeverityLevel` — `'critical' | 'warning' | 'elevated' | 'normal'` [NFR-16, FR-041]
  - [x] `KPIStatus` — `'critical' | 'warning' | 'stable' | 'improving'` [FR-001, UX-DR118] — distinct from SeverityLevel; KPIs track improvement/stability, not elevated/normal severity
  - [x] `TrendDirection` — `'up' | 'down' | 'stable'` [FR-001, KPIData]
  - [x] `PanelStatus` — `'loading' | 'error' | 'populated' | 'empty'` [FR-055, FR-056, FR-057]
  - [x] `PanelTabGroup` — `'happening' | 'why' | 'what-if' | 'reference'` matching UX spec tab group labels [UX-DR15, FR-049]
  - [x] `DataSource` — `'IEA' | 'EIA' | 'OECD' | 'ECB' | 'UNCTAD' | 'Secondary'` [FR-072]
  - [x] `DataPointSelectResult` — `{ value: number; label: string; source: string; timestamp: string }` [UX-DR121]
  - [x] `DataPointSelectCallback` — `(dataKey: string, index: number) => DataPointSelectResult` [UX-DR121]
  - [x] `SimulationOutput` — `{ gdpImpact: number; inflationAddition: number; tradeSlowdown: number; foodPriceRise: number; estimatedJobImpact: number }` [FR-037]
  - [x] `SimulationResult` — `SimulationInput & { outputs: SimulationOutput }` — combined shape for `simulationStore` [FR-034–FR-037]
  - [x] `PresetScenario` — `{ id: string; label: string; sliderValues: { oilPrice: number; duration: number; severity: number } }` [UX-DR122]
  - [x] `FocusCountry` — `'US' | 'CN' | 'IN' | 'JP' | 'DE' | 'GB' | 'SA' | 'IR'` [FR-070]
  - [x] `RegionCode` — `FocusCountry | 'EU' | 'Eurozone' | 'G20' | 'OECD'` [FR-071]
  - [x] `PolicyResponseType` — `'sanctions' | 'strategic-reserves' | 'demand-reduction' | 'supply-diversification' | 'diplomatic' | 'market-intervention'` [FR-043, FR-044]
  - [x] `DataFreshnessThreshold` — `{ label: string; maxAgeDays: number; dataTypes: string[] }` [FR-016, NFR-16]
  - [x] `SourcedRecord` — `{ source?: string; isEstimated?: boolean }` [FR-053, FR-062, FR-074]

- [x] Task 4: Add JSDoc to all exported types (AC: #4, #8, #9)
  - [x] Each interface documents purpose, consumer epics (`@consumers`), and FR references (`@fr`)
  - [x] Add `@see` cross-references pointing to related types (e.g., `KPIData` → `@see KPIStatus, TrendDirection`; `SimulationResult` → `@see SimulationInput, SimulationOutput`)
  - [x] Each enum/type documents valid values and usage context
  - [x] `EmptyStateProps.reason` JSDoc clarifies its relationship to `PanelStatus`
  - [x] `SimulationOutput` vs `SimulationResult` JSDoc clarifies the distinction
  - [x] `CascadeNode` vs `SupplyChainNode` JSDoc clarifies inheritance

- [x] Task 5: Verify TypeScript compilation (AC: #5, #6, #7)
  - [x] Run `tsc --noEmit` — zero errors
  - [x] Verify no `export default` in file
  - [x] Verify file contains only type-level code (no runtime values, only `import type` allowed)

## Dev Notes

### Party Mode Review Resolutions (2026-04-13)

This story was reviewed by 4 BMAD agents (Winston/Architect, Murat/Test Architect, Amelia/Developer, John/PM). Key changes applied:

1. **"Frozen" → "Provisional"**: Types may be revised during Epic 1B. Stability review after Epic 1B closes.
2. **Field definitions filled**: All 13 previously unspecified interfaces now derive fields from FR references in the architecture doc and PRD.
3. **`SimulationResult` vs `SimulationOutput` resolved**: `SimulationOutput` = 5 computed fields. `SimulationResult` = `SimulationInput & { outputs: SimulationOutput }` (combined store shape).
4. **`CascadeNode` vs `SupplyChainNode` resolved**: `SupplyChainNode extends CascadeNode`. CascadeNode = minimal graph node. SupplyChainNode = full data with position, connections.
5. **`PanelTabGroup` aligned with UX spec**: Values changed from `'overview' | 'analysis' | 'tools' | 'reference'` to `'happening' | 'why' | 'what-if' | 'reference'` matching UX spec tab group labels.
6. **`DataPointSelectCallback` added to AC**: Function type alias tracked in AC3.
7. **`RegionCode` added**: `FocusCountry | 'EU' | 'Eurozone' | 'G20' | 'OECD'` for GDP/heatmap regions [FR-071].
8. **`PolicyResponseType` added**: Union type for policy filter categories [FR-043].
9. **`SourcedRecord` base type added**: `source?: string; isEstimated?: boolean` — data interfaces extend this instead of duplicating fields.
10. **AC counts tightened**: Replaced "12+" with exact counts: 12 core, 10 additional, 15 supporting types (including `KPIStatus` and `SimulationResult`).
11. **`PanelStatus` / `EmptyStateProps.reason` overlap addressed**: JSDoc must clarify relationship; EmptyStateProps.reason is a reason discriminator, not a status duplicate.
12. **ReactNode import explicitly permitted**: `import type { ReactNode } from 'react'` is the one allowed type-only import. Acknowledged as deliberate coupling.

### Downstream Conformance

**Deferred to Epic 1C:** `PanelRegistry` type (from UX spec — `Map<string, { component, dataKeys, tabIndex, group }>`) is NOT defined in this story. It depends on lazy component imports and `PanelProps` which don't exist yet. Epic 1C will define it when building the panel registration system.

Stories 1B.2–1B.7 MUST include an acceptance criterion verifying their types satisfy the provisional contracts:
- `satisfies` keyword on data constants (1B.4)
- Store state shapes reference interfaces (1B.5)
- Function signatures use imported types (1B.2)

If any story modifies a type in `src/types/index.ts`, the PR must document the FR reference and rationale.

### Architecture Compliance

- **Naming note:** Sprint status key uses `frozen-contracts` but the story title uses "Provisional Type Contracts" per party mode review resolution #1. The file content is authoritative — types are provisional during Epic 1B.
- **Named exports only** — every interface, type, and enum uses `export interface` / `export type` / `export enum`. No `export default`. [Source: project-context.md #2]
- **Path aliases** — other files will import from `@/types` (alias already configured in Epic 1A) [Source: project-context.md #3]
- **No runtime code** — this file is pure type declarations. Zero functions, zero constants, zero imports of non-type modules. Build-time only. Exception: `import type { ReactNode } from 'react'` for `EmptyStateProps.icon`. [Source: architecture.md — type generation]
- **Provisional contracts** — these interfaces are provisional during Epic 1B. After Epic 1B closes, they enter stability review. Changes after stability review require updating all consumers. [Source: party mode consensus 2026-04-13]
- **File location:** `src/types/index.ts` — single file per architecture. Do NOT split into multiple files or create barrel files. [Source: architecture.md — project structure]

### Interface Design Guidance

#### KPIStatus [FR-001, UX-DR118]
```typescript
type KPIStatus = 'critical' | 'warning' | 'stable' | 'improving';
```
**IMPORTANT:** `KPIStatus` uses `'stable' | 'improving'` per the UX spec data contract. This is DIFFERENT from `SeverityLevel` (`'elevated' | 'normal'`) which serves timeline events and general severity. Do NOT use `SeverityLevel` for KPI status — the semantics differ.

#### KPIData (from UX spec) [FR-001]
```typescript
interface KPIData {
  value: number;
  previousValue?: number;
  unit?: string;
  trend?: TrendDirection;
  status?: KPIStatus;
}
```

#### PanelState (from UX spec) [FR-055–FR-057]
```typescript
interface PanelState<T> {
  status: PanelStatus;
  data: T | null;
  error: Error | null;
}
```

#### PanelConfig (from UX spec)
```typescript
interface PanelConfig {
  id: string;
  title: string;
  tab: PanelTabGroup;
  sourceBadge: { origin: string; date: string; confidence: number };
  extractionTargets?: string[];
  fogLevel?: 'clear' | 'light' | 'moderate' | 'heavy';
}
```
**Note on excluded fields:** The UX spec also defines `heroContent: ReactNode` and `contextContent: ReactNode` on PanelConfig. These are EXCLUDED from this type contract because ReactNode-typed layout content belongs in component props at render time, not in static configuration. Epic 1C will define the runtime component API that accepts these as children/props.

#### EmptyStateProps (from UX spec) [FR-057]
```typescript
import type { ReactNode } from 'react';

interface EmptyStateProps {
  reason: 'no-data' | 'loading' | 'error' | 'filtered-out';
  message: string;
  action?: { label: string; url: string };
  icon?: ReactNode;
}
```
**Note:** `ReactNode` import is the ONLY React dependency. It uses `import type` and is erased at compile time. This coupling is documented and accepted.

#### onDataPointSelect Callback (from UX spec) [FR-026]
```typescript
type DataPointSelectResult = {
  value: number;
  label: string;
  source: string;
  timestamp: string;
};
type DataPointSelectCallback = (dataKey: string, index: number) => DataPointSelectResult;
```

#### SimulationInput [FR-034–FR-036]
- `oilPrice`: number (range $70-$160)
- `duration`: number (range 1-18 months)
- `severity`: number (range 10-100%)

#### SimulationOutput [FR-037]
```typescript
interface SimulationOutput {
  gdpImpact: number;
  inflationAddition: number;
  tradeSlowdown: number;
  foodPriceRise: number;
  estimatedJobImpact: number;
}
```

#### SimulationResult (combined store shape)
```typescript
type SimulationResult = SimulationInput & { outputs: SimulationOutput };
```
This is the shape stored in `simulationStore`. The computation function returns `SimulationOutput`. The store combines input + output.

#### PresetScenario (from UX spec)
```typescript
interface PresetScenario {
  id: string;
  label: string;
  sliderValues: { oilPrice: number; duration: number; severity: number };
}
```

#### FocusCountry [FR-070]
```typescript
type FocusCountry = 'US' | 'CN' | 'IN' | 'JP' | 'DE' | 'GB' | 'SA' | 'IR';
```

#### RegionCode [FR-071]
```typescript
type RegionCode = FocusCountry | 'EU' | 'Eurozone' | 'G20' | 'OECD';
```
Extends FocusCountry to include aggregate regions used by GDP forecasts.

#### SupplyChainNode extends CascadeNode [FR-015–FR-019]
```typescript
interface CascadeNode {
  id: string;
  label: string;
  disruptionLevel: number;
  category: string;
}

interface SupplyChainNode extends CascadeNode {
  position: { x: number; y: number };
  description: string;
  upstream: string[];
  downstream: string[];
}
```
`CascadeNode` = minimal graph-traversal view. `SupplyChainNode` = full data with SVG position and connection arrays.

#### SupplyChainEdge [FR-019]
```typescript
interface SupplyChainEdge {
  source: string;
  target: string;
  direction: 'upstream' | 'downstream';
}
```

#### SourcedRecord (base type for FR-053, FR-062, FR-074)
```typescript
interface SourcedRecord {
  source?: string;
  isEstimated?: boolean;
}
```
Data interfaces that carry source attribution extend this base type.

#### DataFreshnessThreshold [NFR-16, FR-016]
```typescript
interface DataFreshnessThreshold {
  label: string;
  maxAgeDays: number;
  dataTypes: string[];
}
```
Thresholds: Oil prices >60 days, GDP >120 days, shipping >30 days, scenarios >14 days, policy >30 days.

#### PanelTabGroup [FR-049, UX spec tab groups]
```typescript
type PanelTabGroup = 'happening' | 'why' | 'what-if' | 'reference';
```
Values match UX spec tab group labels: "What's happening", "Why", "What if", "Reference".

#### PolicyResponseType [FR-043]
```typescript
type PolicyResponseType = 'sanctions' | 'strategic-reserves' | 'demand-reduction' | 'supply-diversification' | 'diplomatic' | 'market-intervention';
```

### Previous Story Intelligence (Epic 1A)

- **React 19.2.4 installed** — architecture says "18+" but the Vite template installed React 19. `import type { ReactNode } from 'react'` works identically on 18 and 19. No version-specific APIs used. [Source: project-context.md #Technology Stack]
- **Build pipeline validated:** `npm run build`, `npm run lint`, `npm run test`, `npm run typecheck` all work [Source: 1a-2b story]
- **Path aliases configured:** `@/` → `./src/` in both `tsconfig.app.json` and `vite.config.ts` [Source: 1a-1 story]
- **TypeScript strict mode active** with `tsconfig.app.json` + `tsconfig.node.json` split [Source: 1a-1 story]
- **No `export default` anywhere** in `src/` — this must continue [Source: 1a-1 story]
- **`src/utils/constants.ts` exists** with `DATA_AS_OF = '2026-04-13'` — types should reference date strings as `string` (ISO 8601), not create a competing constants file
- **`index.css` has CSS custom properties** for all design tokens — interface definitions should NOT duplicate these as TypeScript constants

### What NOT To Do

- **Do NOT create any data files** — that's Story 1B.4
- **Do NOT create any store files** — that's Story 1B.5
- **Do NOT create utility functions** — that's Story 1B.2
- **Do NOT create hooks** — that's Story 1B.3
- **Do NOT add runtime validation** (no Zod, no runtime checks) — TypeScript interfaces enforce shape at compile time only [Source: architecture.md — data validation strategy]
- **Do NOT create barrel files** — `src/types/index.ts` is a single flat file, not a re-export hub
- **Do NOT import from data files, stores, or components** — types file is a leaf dependency (nothing else imports from it; it imports only `type` from `react`)
- **Do NOT use `PanelStatus` values as both status and reason** — `EmptyStateProps.reason` and `PanelStatus` must have a clear, documented relationship

### Date & Nullable Conventions

- **Dates:** All date fields are `string` in ISO 8601 format (`YYYY-MM-DD`). No `Date` objects in interfaces. [FR-069]
- **Missing data:** Use optional fields (`?`) for data that may be absent. Use `null` for explicit absence in generic wrappers like `PanelState<T>.data`. Never use `undefined` as a sentinel value.
- **Numbers:** All numeric fields are `number`. Display formatting handled by `format.ts` (1B.2), not in type definitions.

### Project Structure Notes

```
src/
  types/
    index.ts              # THIS STORY — all shared interfaces
  utils/
    constants.ts          # EXISTS — DATA_AS_OF, APP_VERSION (from 1A.1)
  App.tsx                 # EXISTS
  main.tsx                # EXISTS
  index.css               # EXISTS — design tokens
```

The types file is imported BY downstream stories:
- `src/data/*.ts` (1B.4) — data files use these interfaces for type annotation
- `src/stores/*.ts` (1B.5) — stores reference SimulationInput, SimulationOutput, SimulationResult
- `src/utils/format.ts` (1B.2) — format functions accept typed parameters
- `src/components/**/*.tsx` (1C onward) — panels import interfaces for props

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1B.1 — TypeScript Interfaces]
- [Source: _bmad-output/planning-artifacts/architecture.md#Data Architecture — type generation]
- [Source: _bmad-output/planning-artifacts/architecture.md#Project Structure — src/types/]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#KPIData interface]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#PanelConfig interface]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#EmptyStateProps interface]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#onDataPointSelect contract]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#PresetScenario interface]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Tab Group Definitions]
- [Source: _bmad-output/planning-artifacts/PRD-Energy-Crisis-Command-Center.md#Data Model — all 12 data structures]
- [Source: _bmad-output/planning-artifacts/PRD-Energy-Crisis-Command-Center.md#FR-001 through FR-075]
- [Source: _bmad-output/project-context.md — all 21 sections]
- [Source: _bmad-output/implementation-artifacts/1a-1-* — scaffold and tokens]
- [Source: _bmad-output/implementation-artifacts/1a-2b-* — CI pipeline and previous learnings]
- [Source: Party mode adversarial review 2026-04-13 — consensus of Winston, Murat, Amelia, John]

## Dev Agent Record

### Agent Model Used

GLM-5.1 (zai-coding-plan/glm-5.1)

### Debug Log References

No issues encountered. All type definitions compiled cleanly on first attempt.

### Completion Notes List

- Created `src/types/index.ts` with 39 exported types: 12 core interfaces, 10 additional interfaces, 17 supporting types (includes `EmptyStateReason` and `CeasefireStatusType` added during code review)
- All types have JSDoc with `@consumers`, `@fr`, and `@see` cross-references
- `SupplyChainNode extends CascadeNode` — explicit inheritance for node graph types
- `OilHistoryRecord extends SourcedRecord` and `CommodityDisruption extends SourcedRecord` — source attribution pattern
- `SimulationResult = SimulationInput & { outputs: SimulationOutput }` — combined store shape via intersection type
- `EmptyStateReason = Extract<PanelStatus, 'loading' | 'error'> | 'no-data' | 'filtered-out'` — derived from PanelStatus to prevent drift (code review consensus)
- `EmptyStateProps.reason` uses `EmptyStateReason` — structural relationship to PanelStatus enforced at compile time
- `CeasefireStatusType = 'active' | 'broken' | 'expired' | 'pending' | 'none'` — discriminated union replacing bare `string` (code review consensus)
- `PresetScenario.sliderValues` uses `SimulationInput` — DRY, single source of truth
- `GDPForecast.delta` JSDoc clarifies sign convention: `postCrisisGdp - preCrisisGdp`
- Single `import type { ReactNode } from 'react'` — only non-type import, erased at compile time
- Zero `export default` — all named exports
- Zero runtime code — pure type declarations only
- `tsc --noEmit` passes, lint passes, 28/28 tests pass
- Co-located test file `src/types/index.test.ts` validates field presence via `expectTypeOf`

### File List

- `src/types/index.ts` — NEW: all shared TypeScript interfaces and type aliases (39 exports)
- `src/types/index.test.ts` — NEW: type contract tests (28 tests)

## Review Findings

### Decision Needed

- [x] [Review][Decision] **AC8: EmptyStateProps.reason creates a second overlapping status set** — RESOLVED via Option B: added `EmptyStateReason = Extract<PanelStatus, 'loading' | 'error'> | 'no-data' | 'filtered-out'`. EmptyStateProps.reason now uses this derived type. AC8 reworded to match. Party-mode consensus (3-1: Amelia, Murat, Sally vs Winston). [sources: auditor, blind+edge]

- [x] [Review][Decision] **CeasefireStatus.status is bare `string` while all other status fields use discriminated unions** — RESOLVED via Option A: added `CeasefireStatusType = 'active' | 'broken' | 'expired' | 'pending' | 'none'`. Unanimous consensus (Winston, Amelia, Murat, Sally). [sources: blind, edge]

### Patch

- [x] [Review][Patch] **PresetScenario.sliderValues duplicates SimulationInput structure** `src/types/index.ts:460` — Fixed: changed to `sliderValues: SimulationInput`. [sources: blind]

- [x] [Review][Patch] **8 of 10 AC2 interfaces lack structural property-level tests** `src/types/index.test.ts` — Fixed: added `toHaveProperty` assertions for CeasefireStatus, ShippingTrafficPeriod, VulnerabilityScore, StagflationIndicator, PolicyResponse, HistoricalCrisis, EnergyTransitionIndicator, and PriceRecord. Plus tests for EmptyStateReason and CeasefireStatusType values. 18 → 28 tests. [sources: auditor, edge]

- [x] [Review][Patch] **GDPForecast.delta sign convention missing from JSDoc** `src/types/index.ts:127` — Fixed: added JSDoc `postCrisisGdp - preCrisisGdp. Negative = contraction, positive = growth.` [sources: edge]

### Deferred

- [x] [Review][Defer] **Numeric range constraints on SimulationInput, probability, disruptionLevel, VulnerabilityScore** — TypeScript cannot enforce numeric ranges without branded types, which is a design decision beyond provisional contracts. Deferred to post-Epic 1B stability review. [sources: blind, edge]
- [x] [Review][Defer] **Date format template literal types** — ISO 8601 convention is documented in project-context.md; template literal enforcement is over-engineering for provisional contracts. [sources: edge]
- [x] [Review][Defer] **OilHistoryRecord/PriceRecord structural overlap** — Semantic distinction is documented in JSDoc; structural subtyping is acceptable. [sources: blind, edge]
- [x] [Review][Defer] **PanelState<T> unconstrained generic** — Consumers will constrain T at usage sites; adding `extends object` would prevent valid primitive panel states. [sources: edge]
- [x] [Review][Defer] **SourcedRecord.source is string despite DataSource union** — Data files (1B.4) will enforce DataSource at the data constant level; SourcedRecord stays flexible for edge cases. [sources: edge]
- [x] [Review][Defer] **PolicyResponse.country bare string** — Policy panel may reference non-FocusCountry nations; constraining now would be premature. [sources: edge]
- [x] [Review][Defer] **CascadeNode.category bare string** — Categories will be enumerated in data files (1B.4); type contract stays flexible. [sources: edge]
- [x] [Review][Defer] **HistoricalCrisis.year as number** — Year-only integer is pragmatic; not a full date requiring ISO 8601 string format. [sources: auditor, edge]
- [x] [Review][Defer] **SimulationResult intersection field collision risk** — Hypothetical; no current collision. Guard with a comment if desired. [sources: edge]
- [x] [Review][Defer] **SupplyChainEdge.direction potential redundancy with source/target ordering** — Direction semantics are valid for weighted/typed edges in crisis graphs. [sources: blind]
- [x] [Review][Defer] **PanelConfig.sourceBadge.confidence scale ambiguous** — Scale will be determined during panel implementation (1C+). [sources: edge]
- [x] [Review][Defer] **Test count assertions verify local arrays, not actual exports** — Import statements already catch missing exports at compile time; count tests are sanity checks. [sources: blind, edge, auditor]
- [x] [Review][Defer] **Union exhaustiveness tests missing for DataSource, PolicyResponseType, TrendDirection** — Nice-to-have; not an AC requirement. [sources: edge]

## Change Log

- 2026-04-13: Story 1B.1 complete — created `src/types/index.ts` with 37 provisional type contracts (12 core + 10 additional + 15 supporting). All JSDoc with FR traceability. Zero compilation errors. 19/19 tests pass. Status → review.
- 2026-04-13: Code review — 3 review layers (Blind Hunter, Edge Case Hunter, Acceptance Auditor). 2 decision-needed, 3 patch, 13 deferred, 1 dismissed (false positive).
- 2026-04-13: Review patches applied — added EmptyStateReason (derived from PanelStatus), CeasefireStatusType union, PresetScenario.sliderValues uses SimulationInput, GDPForecast.delta JSDoc, 10 new structural tests (18→28). All decisions resolved via party-mode consensus (Winston, Amelia, Murat, Sally). Status → done. 39 exported types total.
