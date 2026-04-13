# Story 1B.2: Constants & Format Utilities

Status: done

## Story

As a **developer**,
I want shared constants and format utilities that enforce data formatting rules,
So that all panels display data consistently per FR-064 through FR-069.

## Acceptance Criteria

1. **AC1 — Constants file populated:** `src/utils/constants.ts` exports the following named constants (all use `as const satisfies T` pattern unless noted):
   - `DATA_AS_OF` — ISO 8601 string (`'YYYY-MM-DD'`). **Already exists from 1A.1 — do NOT overwrite, verify only**
   - `FOCUS_COUNTRIES` — `readonly` tuple of all 8 `FocusCountry` values in order: `['US', 'CN', 'IN', 'JP', 'DE', 'GB', 'SA', 'IR']` (ISO alpha-2 codes per FR-070)
   - `SOURCE_HIERARCHY` — `readonly` tuple of ordered `DataSource` values: `['IEA', 'EIA', 'OECD', 'ECB', 'UNCTAD', 'Secondary']` per FR-072
   - `FRESHNESS_THRESHOLDS` — `DataFreshnessThreshold[]` with 5 entries per NFR-16 (see FRESHNESS_THRESHOLDS table below for exact values including `dataTypes` arrays)
   - `SEVERITY_LEVELS` — `readonly` tuple `['critical', 'warning', 'elevated', 'normal']` as `SeverityLevel[]` (traces to FR-041, FR-012)
   - `SIMULATION_DEFAULTS` — satisfies `SimulationInput`: `{ oilPrice: 100, duration: 6, severity: 50 }` per FR-034–FR-036
   - `SIMULATION_RANGES` — inline-typed as `{ readonly [K in keyof SimulationInput]: { readonly min: number; readonly max: number } }`: `{ oilPrice: { min: 70, max: 160 }, duration: { min: 1, max: 18 }, severity: { min: 10, max: 100 } }` per FR-034–FR-036
   - `STALE_THRESHOLD_DAYS` — `7` as `const`. General fallback staleness threshold for `useDataFreshness` hook. Used when no per-type threshold in `FRESHNESS_THRESHOLDS` matches (see AC1 relationship note)

   **AC1 relationship note:** `STALE_THRESHOLD_DAYS` (7 days) is the **general fallback**. `FRESHNESS_THRESHOLDS` provides **per-type overrides** with higher specificity. The `useDataFreshness` hook (1B.3) should look up per-type threshold first, fall back to `STALE_THRESHOLD_DAYS` if no match. This two-tier system prevents a single global threshold from being either too aggressive for policy data or too lenient for shipping data.

2. **AC2 — Format utilities created:** `src/utils/format.ts` exports pure functions using pre-constructed `Intl.NumberFormat` instances (see Implementation Pattern). All number-accepting functions hardcode `'en-US'` locale. Rounding follows `Intl.NumberFormat` default behavior (`roundingMode: 'halfExpand'` — standard mathematical rounding). Functions and expected outputs:

   - `formatOilProduction(value: number): string` → e.g., `"85.5 Mb/d"`. 1 decimal. Throws `RangeError` if value < 0
   - `formatPrice(value: number): string` → e.g., `"$84.50"`. 2 decimals, `$` prefix. Throws `RangeError` if value < 0
   - `formatGas(value: number, unit: 'USD/MMBtu' | 'EUR/MWh'): string` → e.g., `"3.45 USD/MMBtu"`. 2 decimals, appends ` ${unit}`. TypeScript enforces unit union; no runtime unit validation. Throws `RangeError` if value < 0
   - `formatInflation(value: number): string` → e.g., `"3.5%"`, `"-0.5%"` (deflation). 1 decimal, append `%`. Negative allowed (deflation is valid)
   - `formatGDP(value: number): string` → e.g., `"+2.5%"`, `"-3.2%"`, `"+0.0%"`. 1 decimal, **always show sign** (positive gets `+`, negative gets `-`, zero gets `+`). Negative allowed
   - `formatDate(value: string): string` → e.g., `"2026-04-13"`. Validates against regex `^\d{4}-\d{2}-\d{2}$` (structural format only — does NOT validate real calendar dates like Feb 30). Passes through if valid, throws `TypeError` if invalid format. **Note:** This is a validation guard, not a transformation. It exists to catch malformed date strings at the formatting boundary. NaN/Infinity guards do NOT apply to this function (input is `string`, not `number`)
   - `formatPercent(value: number, decimals: number = 1): string` → e.g., `"50.5%"`. Configurable decimals, append `%`. Negative values allowed (e.g., `"-5.2%"` for declines). Does NOT throw on negative
   - `formatNumber(value: number, options?: Intl.NumberFormatOptions): string` → generic `Intl.NumberFormat` wrapper. Negative values allowed. Does NOT throw on negative. Options override defaults

3. **AC3 — Input validation (number functions only):** All functions accepting `number` validate input and throw descriptive errors:
   - `NaN` or `Infinity` → `TypeError` with message `"{functionName}: expected finite number, got {value}"`
   - Negative where nonsensical (formatOilProduction, formatPrice, formatGas) → `RangeError` with message `"{functionName}: expected non-negative, got {value}"`
   - Functions that allow negative (formatInflation, formatGDP, formatPercent, formatNumber) → only throw on `NaN`/`Infinity`, NOT on negative
   - `null`/`undefined` caught by TypeScript at compile time; runtime `Number.isFinite()` guard catches these for JS consumers since `Number.isFinite(null)` returns `false`
   - **`formatDate` is exempt from NaN/Infinity guards** — its input is `string`, validated by ISO 8601 regex only

4. **AC4 — Pure functions:** All format functions are pure with zero side effects. No state, no DOM access, no global mutations. All output is deterministic for the same input. Pre-constructed `Intl.NumberFormat` instances at module scope are acceptable (they're immutable after construction).

5. **AC5 — Unit tests:** `src/utils/format.test.ts` and `src/utils/constants.test.ts` must meet these requirements:
    - **Error type assertions:** Every throw test must assert the **specific error class** (`expect(() => fn()).toThrow(TypeError)` or `toThrow(RangeError)`) AND the error message contains the function name
    - **Exact output assertions:** Every happy-path test asserts the **exact output string**, not just type or partial match
    - **Locale lock:** At least one test per format function verifies exact string output, implicitly locking locale behavior to `'en-US'`
    - **Purity check:** At least one test calls a format function twice with the same input and asserts `===` equality
    - **Constants immutability:** `FOCUS_COUNTRIES`, `SOURCE_HIERARCHY`, `SEVERITY_LEVELS` are frozen — test attempts `push` and verifies no mutation, or asserts `Object.isFrozen()`
    - **Constants semantic validation:** Assert exact array element values with `toEqual()`, not just length
    - **`formatGDP(0)` explicitly tested:** Output must be `"+0.0%"` (positive sign on zero)
    - **Negative zero (`-0`):** At least one test verifies `formatOilProduction(-0)` returns `"0.0 Mb/d"`
    - **Detailed test cases for each function are specified in Tasks 3 and 4** — AC5 defines the quality gates, Tasks 3/4 define the specific test cases

6. **AC6 — Named exports only:** No `export default` in either file

7. **AC7 — Uses provisional types:** Functions import and reference types from `@/types`. Constants are typed against these interfaces. `SIMULATION_RANGES` uses an inline type derived from `SimulationInput` keys (does NOT modify `@/types`). `SIMULATION_DEFAULTS` uses `satisfies SimulationInput` (NOT `as const` which would narrow literal types and break assignability to `SimulationInput`)

8. **AC8 — All existing tests still pass:** `npm run test`, `npm run typecheck`, `npm run lint` all green

9. **AC9 — Throw propagation:** Do NOT wrap format function calls in try/catch at the call site. Unhandled throws from format functions intentionally propagate to the panel-level `PanelErrorBoundary`, which displays the standard error fallback. This is the intended degradation path. Components guard against null/undefined BEFORE calling format functions; if they fail to guard, the error boundary catches it

## Tasks / Subtasks

- [x] Task 1: Expand `src/utils/constants.ts` (AC: #1, #6, #7)
  - [x] Keep existing `APP_VERSION` and `DATA_AS_OF` exports — **do NOT overwrite**
  - [x] Add `FOCUS_COUNTRIES` — `['US', 'CN', 'IN', 'JP', 'DE', 'GB', 'SA', 'IR'] as const` (readonly tuple of `FocusCountry` values, ISO alpha-2 codes)
  - [x] Add `SOURCE_HIERARCHY` — `['IEA', 'EIA', 'OECD', 'ECB', 'UNCTAD', 'Secondary'] as const` (ordered per FR-072)
  - [x] Add `FRESHNESS_THRESHOLDS: DataFreshnessThreshold[]` — 5 entries per NFR-16 (see table below for exact values)
  - [x] Add `SEVERITY_LEVELS` — `['critical', 'warning', 'elevated', 'normal'] as const` (traces to FR-041, FR-012)
  - [x] Add `SIMULATION_DEFAULTS` — `{ oilPrice: 100, duration: 6, severity: 50 } satisfies SimulationInput` (use `satisfies`, NOT `as const` — `as const` narrows literals and breaks `SimulationInput` assignability)
  - [x] Add `SIMULATION_RANGES` — `{ oilPrice: { min: 70, max: 160 }, duration: { min: 1, max: 18 }, severity: { min: 10, max: 100 } } as const` with inline type `{ readonly [K in keyof SimulationInput]: { readonly min: number; readonly max: number } }`
  - [x] Add `STALE_THRESHOLD_DAYS = 7 as const` — general fallback staleness threshold for `useDataFreshness` hook
  - [x] **`as const` guidance:** Use `as const` on arrays/tuples (FOCUS_COUNTRIES, SOURCE_HIERARCHY, SEVERITY_LEVELS) and simple primitives (STALE_THRESHOLD_DAYS). Use `satisfies T` on objects typed against interfaces (SIMULATION_DEFAULTS). Use `as const` on SIMULATION_RANGES with inline type derivation. Do NOT apply `as const` alone to objects that must widen to interface types
  - [x] Freeze all array/tuple exports at runtime: `Object.freeze([...]) as const` to prevent mutation by consumers

- [x] Task 2: Create `src/utils/format.ts` (AC: #2, #3, #4, #6, #7)
  - [x] Define pre-constructed `Intl.NumberFormat` instances at module scope (see Implementation Pattern section):
    - `const oilFmt = new Intl.NumberFormat('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })`
    - `const priceFmt = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })`
    - `const gasFmt = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })`
    - `const inflationFmt = new Intl.NumberFormat('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })`
    - `const gdpFmt = new Intl.NumberFormat('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })`
    - `const percentFmt` (created per-call with dynamic decimals — `Intl.NumberFormat` cannot share instance when fractionDigits vary)
  - [x] `formatOilProduction(value)` — guard with `Number.isFinite()`, guard `value < 0`, format with `oilFmt.format()`, append `" Mb/d"`
  - [x] `formatPrice(value)` — guard with `Number.isFinite()`, guard `value < 0`, return `"$" + priceFmt.format(value)`
  - [x] `formatGas(value, unit)` — guard with `Number.isFinite()`, guard `value < 0`, format with `gasFmt.format()`, append `" " + unit`
  - [x] `formatInflation(value)` — guard with `Number.isFinite()` only (negative = deflation, allowed), format with `inflationFmt.format()`, append `"%"`
  - [x] `formatGDP(value)` — guard with `Number.isFinite()` only (negative allowed), compute sign: `value >= 0 ? '+' : ''`, format with `gdpFmt.format(Math.abs(value))`, return `` `${sign}${formatted}%` ``
  - [x] `formatDate(value)` — validate against regex `/^\d{4}-\d{2}-\d{2}$/`, pass through if valid, throw `TypeError` with message if invalid. **No NaN/Infinity guard** (input is `string`)
  - [x] `formatPercent(value, decimals = 1)` — guard with `Number.isFinite()` only (negative allowed), create `Intl.NumberFormat('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })`, append `"%"`
  - [x] `formatNumber(value, options)` — guard with `Number.isFinite()` only (negative allowed), create `new Intl.NumberFormat('en-US', options)`, return result
  - [x] All error messages follow pattern: `"{functionName}: expected finite number, got {value}"` or `"{functionName}: expected non-negative, got {value}"`

- [x] Task 3: Create `src/utils/constants.test.ts` (AC: #5)
  - [x] **Semantic validation** — assert exact values, not just counts:
    - `expect(FOCUS_COUNTRIES).toEqual(['US','CN','IN','JP','DE','GB','SA','IR'])`
    - `expect(SOURCE_HIERARCHY).toEqual(['IEA','EIA','OECD','ECB','UNCTAD','Secondary'])`
    - `expect(SEVERITY_LEVELS).toEqual(['critical','warning','elevated','normal'])`
  - [x] `FRESHNESS_THRESHOLDS` — assert exact entries with labels, maxAgeDays, and dataTypes arrays (see table below)
  - [x] `SIMULATION_DEFAULTS` — assert each property: `{ oilPrice: 100, duration: 6, severity: 50 }`
  - [x] `SIMULATION_RANGES` — assert each slider: `oilPrice: { min: 70, max: 160 }`, etc.
  - [x] `STALE_THRESHOLD_DAYS` — assert `=== 7`
  - [x] **Immutability** — assert `Object.isFrozen(FOCUS_COUNTRIES)`, `Object.isFrozen(SOURCE_HIERARCHY)`, `Object.isFrozen(SEVERITY_LEVELS)`
  - [x] `DATA_AS_OF` — verify it exists and matches ISO 8601 pattern (already present, just verify)

- [x] Task 4: Create `src/utils/format.test.ts` (AC: #5)
  - [x] Organize with `describe` blocks per function
  - [x] `formatOilProduction` — 0→`"0.0 Mb/d"`, 85.5→`"85.5 Mb/d"`, 999.9→`"999.9 Mb/d"`, -1→`RangeError`, NaN→`TypeError`, Infinity→`TypeError`, -0→`"0.0 Mb/d"` (not throw)
  - [x] `formatPrice` — 0.01→`"$0.01"`, 84.50→`"$84.50"`, 999.99→`"$999.99"`, -1→`RangeError`, NaN→`TypeError`, Infinity→`TypeError`
  - [x] `formatGas` — (3.45, 'USD/MMBtu')→`"3.45 USD/MMBtu"`, (52.30, 'EUR/MWh')→`"52.30 EUR/MWh"`, (-1, 'USD/MMBtu')→`RangeError`, (NaN, 'USD/MMBtu')→`TypeError`
  - [x] `formatInflation` — 3.5→`"3.5%"`, 0→`"0.0%"`, -0.5→`"-0.5%"`, 25.0→`"25.0%"`, NaN→`TypeError`
  - [x] `formatGDP` — 2.5→`"+2.5%"`, -3.2→`"-3.2%"`, 0→`"+0.0%"`, 8.1→`"+8.1%"`, NaN→`TypeError`
  - [x] `formatDate` — `'2026-04-13'`→`"2026-04-13"`, `'not-a-date'`→`TypeError`, `'2026/04/13'`→`TypeError`, `'9999-99-99'`→passes (structural regex only), `''`→`TypeError`
  - [x] `formatPercent` — 50.5→`"50.5%"`, 0→`"0.0%"`, 100→`"100.0%"`, (50.555, 2)→`"50.56%"`, -5.2→`"-5.2%"` (negative allowed)
  - [x] `formatNumber` — (1000)→`"1,000"`, (1000, { style: 'currency', currency: 'USD' })→specific output, (-5)→valid output (negative allowed)
  - [x] **Purity** — call `formatPrice(84.50)` twice, assert `===` strict equality
  - [x] **Error messages** — at least one test per error type asserts message contains function name

- [x] Task 5: Verify full suite passes (AC: #8)
  - [x] `npm run typecheck` — zero errors
  - [x] `npm run test` — all tests green (existing + new)
  - [x] `npm run lint` — zero warnings

## Dev Notes

### What This Story Delivers

Two utility files that every panel in the application will import:
- `src/utils/constants.ts` — Expanded from the 2-line stub created in 1A.1 with domain constants
- `src/utils/format.ts` — NEW file with pure formatting functions enforcing FR-064 through FR-069

### Architecture Compliance

- **Named exports only** — no `export default` [Source: project-context.md #2]
- **Path aliases** — import types via `@/types` [Source: project-context.md #3]
- **Pure functions** — zero side effects, zero DOM, zero state. All deterministic [Source: architecture.md — computation patterns]
- **Intl.NumberFormat** — all number formatting uses pre-constructed `Intl.NumberFormat` instances, NOT `Number.toLocaleString()` or `Number.toFixed()`. This is a project constraint from project-context.md #15 and architecture.md Format Patterns
- **Missing data is "—"** — format functions throw on invalid input. Components call format functions only on valid data, display "—" for null/undefined before calling format [Source: project-context.md #15]
- **No `@apply`** — these are utility files, no CSS involved [Source: project-context.md #13]
- **File < 200 LOC** per architecture rules — both files should be well under this limit
- **Locale hardcoded to `'en-US'`** — single-language dark command center. No i18n, no locale negotiation
- **Naming: `format.ts` not `formatEnergyValue.ts`** — architecture.md line 398 shows example utility `formatEnergyValue.ts`, but this story consolidates all formatters into a single `format.ts`. This is intentional: one file for all domain formatting functions is simpler and more discoverable than splitting by domain. Do NOT create separate files per architecture example

### Formatting Rules by FR Reference

| FR | Format | Function | Example | Rounding |
|-----|--------|----------|---------|----------|
| FR-064 | Oil production: Mb/d, 1 decimal | `formatOilProduction` | `85.5 Mb/d` | halfExpand (Intl default) |
| FR-065 | Oil price: USD/barrel, 2 decimals | `formatPrice` | `$84.50` | halfExpand |
| FR-066 | Gas: USD/MMBtu or TTF EUR/MWh | `formatGas` | `3.45 USD/MMBtu` | halfExpand |
| FR-067 | Inflation: % YoY, 1 decimal | `formatInflation` | `3.5%` | halfExpand |
| FR-068 | GDP: % YoY, 1 decimal, +/- sign | `formatGDP` | `+2.5%` / `-3.2%` / `+0.0%` | halfExpand |
| FR-069 | Dates: ISO 8601 YYYY-MM-DD | `formatDate` | `2026-04-13` | N/A (passthrough) |

### FRESHNESS_THRESHOLDS Exact Values (NFR-16)

```typescript
const FRESHNESS_THRESHOLDS: DataFreshnessThreshold[] = [
  { label: 'Oil Prices',      maxAgeDays: 60,  dataTypes: ['oil-price', 'brent', 'wti'] },
  { label: 'GDP',             maxAgeDays: 120, dataTypes: ['gdp', 'gdp-forecast'] },
  { label: 'Shipping',        maxAgeDays: 30,  dataTypes: ['shipping', 'tanker'] },
  { label: 'Scenarios',       maxAgeDays: 14,  dataTypes: ['scenario', 'simulation'] },
  { label: 'Policy',          maxAgeDays: 30,  dataTypes: ['policy', 'sanctions'] },
]
```

The `dataTypes` arrays define string keys that the `useDataFreshness` hook (1B.3) will match against data file metadata. These are convention strings, not typed enums — they establish the contract between constants and hook.

### Simulation Input Ranges (FR-034–FR-036)

```
oilPrice:  $70 – $160
duration:  1 – 18 months
severity:  10% – 100%
```

Defaults: `{ oilPrice: 100, duration: 6, severity: 50 }`

### Staleness Threshold Relationship

```
STALE_THRESHOLD_DAYS (7d)          ← general fallback
    └── FRESHNESS_THRESHOLDS       ← per-type overrides
          ├── Oil Prices: 60d      ← overrides for oil-price data
          ├── GDP: 120d            ← overrides for gdp data
          ├── Shipping: 30d        ← overrides for shipping data
          ├── Scenarios: 14d       ← overrides for scenario data
          └── Policy: 30d          ← overrides for policy data

useDataFreshness hook (1B.3):
  1. Look up data type in FRESHNESS_THRESHOLDS by dataType key
  2. If found → use per-type maxAgeDays
  3. If not found → fall back to STALE_THRESHOLD_DAYS (7d)
```

### Implementation Pattern — Pre-constructed Intl.NumberFormat

```typescript
// Module-scope formatters (immutable, reusable)
const priceFmt = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatPrice(value: number): string {
  if (!Number.isFinite(value)) {
    throw new TypeError(`formatPrice: expected finite number, got ${value}`);
  }
  if (value < 0) {
    throw new RangeError(`formatPrice: expected non-negative, got ${value}`);
  }
  return `$${priceFmt.format(value)}`;
}

const gdpFmt = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function formatGDP(value: number): string {
  if (!Number.isFinite(value)) {
    throw new TypeError(`formatGDP: expected finite number, got ${value}`);
  }
  const sign = value >= 0 ? '+' : '';
  return `${sign}${gdpFmt.format(Math.abs(value))}%`;
  // formatGDP(0) → "+0.0%"
  // formatGDP(2.5) → "+2.5%"
  // formatGDP(-3.2) → "-3.2%"
}
```

**Why pre-constructed instances:** `Intl.NumberFormat` construction is expensive (~0.1ms per instance). In a command center with 14 panels calling format functions on every render, per-call construction creates unnecessary GC pressure. Module-scope instances are created once, are immutable, and are safe to share.

**Why NOT `Number.toFixed()`:** `toFixed()` produces locale-agnostic strings with `. ` decimal separator, ignoring the `'en-US'` locale contract. `Intl.NumberFormat` respects locale consistently.

**Why NOT `Number.toLocaleString()`:** While functionally equivalent to `Intl.NumberFormat`, it creates a new formatter on every call. The constructor pattern is explicit, performant, and directly matches the architecture mandate for `Intl.NumberFormat`.

**Grouping behavior:** `Intl.NumberFormat('en-US')` adds thousand-separator commas by default. `formatOilProduction(1234.5)` → `"1,234.5 Mb/d"`, `formatPrice(1234.56)` → `"$1,234.56"`. This is acceptable and expected for this domain — production figures in the thousands should display grouping. Do NOT disable with `useGrouping: false`.

**`formatPercent` performance note:** `formatPercent` creates a new `Intl.NumberFormat` per call because `decimals` varies. For hot paths rendering many percentages (e.g., 19 disruption nodes), consumers should cache the result or use `formatPercent` inside `useMemo`. Do NOT pre-build a cache inside `formatPercent` itself — that adds state to a pure function.

### Function Relationship Notes

- **`formatInflation` vs `formatPercent`:** `formatInflation` is a domain-specific function with fixed `decimals=1` and explicit deflation support (negative values are semantically meaningful). `formatPercent` is the generic configurable counterpart. Both produce identical output for `decimals=1` with non-negative input. `formatInflation` exists for **domain clarity** — a developer reading `formatInflation(deflationRate)` understands intent better than `formatPercent(deflationRate)`. Do NOT consolidate them.

- **`formatDate` — validation guard, not transformation:** This function validates and passes through. It exists to catch malformed date strings at the formatting boundary. If a date string enters the system (from static data), it must pass this validation before display. It does NOT transform `Date` objects to strings — that conversion happens at the data layer (1B.4).

### Downstream Consumers

- **1B.3** — Motion/accessibility utilities don't directly consume these, but may reference `SEVERITY_LEVELS`
- **1B.4** — Data files reference `FOCUS_COUNTRIES` (ISO alpha-2 codes for country data joins), `SOURCE_HIERARCHY` (for source attribution ordering), format functions for any computed display strings
- **1B.5** — Zustand stores reference `SIMULATION_DEFAULTS` (initial slider state), `SIMULATION_RANGES` (slider min/max and validation bounds)
- **1B.6** — Build-time validation script references `FRESHNESS_THRESHOLDS` (staleness checks), `SIMULATION_RANGES` (bounds checking)
- **Epic 2+** — Every panel imports format functions and `STALE_THRESHOLD_DAYS`

### Previous Story Intelligence (1B.1)

- `src/types/index.ts` created with 39 exported types — import via `@/types`
- Types are **provisional** during Epic 1B — this story consumes types, does NOT modify them
- `SimulationInput`, `SimulationOutput`, `SimulationResult`, `FocusCountry`, `DataSource`, `DataFreshnessThreshold`, `SeverityLevel` are all defined and ready for import
- `DataFreshnessThreshold` shape: `{ label: string; maxAgeDays: number; dataTypes: string[] }`
- `SourcedRecord` base type provides `source?: string; isEstimated?: boolean` pattern
- `src/types/index.test.ts` has 28 tests — do not break these

### Previous Story Intelligence (1A)

- `src/utils/constants.ts` already exists with `APP_VERSION = '0.0.0'` and `DATA_AS_OF = '2026-04-13'` (both `as const`) — **do NOT overwrite**, append to it
- React 19.2.4 installed, TypeScript strict mode, path aliases `@/` configured
- Build pipeline: `npm run build`, `npm run test`, `npm run typecheck`, `npm run lint` all work
- `src/smoke.test.ts` exists — do not modify

### What NOT To Do

- **Do NOT overwrite `src/utils/constants.ts`** — it has `APP_VERSION` and `DATA_AS_OF` that are consumed elsewhere. Read it first, append new exports
- **Do NOT create data files** — that's Story 1B.4
- **Do NOT create store files** — that's Story 1B.5
- **Do NOT create hooks** — that's Story 1B.3
- **Do NOT add runtime validation (Zod)** — TypeScript interfaces + build-time script only [Source: architecture.md]
- **Do NOT handle null/undefined gracefully in format functions** — they throw. Components guard before calling [Source: project-context.md — "—" for missing data]
- **Do NOT wrap format calls in try/catch** — let throws propagate to `PanelErrorBoundary` [Source: architecture.md — error boundaries, AC9]
- **Do NOT hardcode hex colors** — format functions are color-agnostic [Source: project-context.md #5]
- **Do NOT create barrel files** — direct imports from `@/utils/format` and `@/utils/constants`
- **Do NOT modify `src/types/index.ts`** — types are provisional but this story should consume, not modify them
- **Do NOT use `Number.toFixed()` or `Number.toLocaleString()`** — use pre-constructed `Intl.NumberFormat` instances exclusively
- **Do NOT add `PANEL_ORDER` constant** — deferred to Epic 1C (Shell & Navigation) where TabBar is built and panel IDs are defined

### Project Structure Notes

```
src/
  types/
    index.ts              # DONE (1B.1) — import types from here
    index.test.ts         # DONE (1B.1) — 28 tests, do not break
  utils/
    constants.ts          # EXISTS (2 lines from 1A.1) — EXPAND this file
    format.ts             # NEW — create this file
    format.test.ts        # NEW — create this file
    constants.test.ts     # NEW — create this file
```

### Party Mode Adversarial Review (2026-04-13)

Reviewed by Winston (Architect), Murat (Test Architect), Amelia (Developer), Mary (Analyst). All 21 findings resolved and incorporated into this story revision. Key resolution categories:

- **Type safety:** `SIMULATION_DEFAULTS` uses `satisfies SimulationInput` (not `as const`); `SIMULATION_RANGES` uses `as const` with inline mapped type
- **Formatting:** All examples use pre-constructed `Intl.NumberFormat` instances (not `toFixed`/`toLocaleString`); `'en-US'` hardcoded; `halfExpand` rounding
- **Edge cases:** `formatGDP(0)` → `"+0.0%"`; `formatOilProduction(-0)` → `"0.0 Mb/d"`; `formatDate` exempt from NaN guard (string input); negative values allowed where semantically valid
- **Error handling:** Throw propagation to `PanelErrorBoundary` (AC9); specific error class assertions in tests
- **Immutability:** `Object.freeze()` on all array/tuple constants; immutability tests required
- **Constants:** `STALE_THRESHOLD_DAYS` added as general fallback; `FRESHNESS_THRESHOLDS` has exact `dataTypes` arrays; `PANEL_ORDER` deferred to Epic 1C

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1B.2 — Constants & Format Utilities]
- [Source: _bmad-output/planning-artifacts/architecture.md#Format Patterns — Intl.NumberFormat]
- [Source: _bmad-output/planning-artifacts/architecture.md#Naming Patterns — utilities: camelCase]
- [Source: _bmad-output/planning-artifacts/architecture.md#Data Architecture — staleness thresholds]
- [Source: _bmad-output/planning-artifacts/architecture.md#Simulation Architecture — ranges]
- [Source: _bmad-output/project-context.md #6 — Static Data, zero async]
- [Source: _bmad-output/project-context.md #15 — Number & Date Formatting]
- [Source: _bmad-output/project-context.md #2 — Named exports only]
- [Source: _bmad-output/project-context.md #3 — Path aliases]
- [Source: _bmad-output/implementation-artifacts/1b-1-typescript-interfaces-frozen-contracts.md — provisional types to consume]
- [Source: NFR-16 — freshness thresholds per data type]
- [Source: FR-064–FR-069 — data formatting rules]
- [Source: FR-034–FR-036 — simulation input ranges]
- [Source: FR-041 — severity levels for timeline events]
- [Source: FR-012 — stagflation risk indicators]

## Dev Agent Record

### Agent Model Used

GLM-5.1 (zai-coding-plan/glm-5.1)

### Debug Log References

- Fixed `formatOilProduction(-0)` returning `"-0.0 Mb/d"` — added `value === 0 ? 0 : value` to normalize negative zero
- Fixed `formatGDP` sign logic — changed from `sign = value >= 0 ? '+' : ''` to `sign = value >= 0 ? '+' : '-'` since `Math.abs()` strips the sign
- Fixed pre-existing lint error in `src/types/index.test.ts` — removed unused `_CeasefireStatusType` duplicate import

### Completion Notes List

- Expanded `src/utils/constants.ts` with 7 new exports (FOCUS_COUNTRIES, SOURCE_HIERARCHY, FRESHNESS_THRESHOLDS, SEVERITY_LEVELS, SIMULATION_DEFAULTS, SIMULATION_RANGES, STALE_THRESHOLD_DAYS)
- Created `src/utils/format.ts` with 8 pure formatting functions using pre-constructed `Intl.NumberFormat` instances
- Created comprehensive test suites: 51 format tests + 10 constants tests = 61 new tests
- All 91 tests pass (28 pre-existing + 63 new), typecheck clean, lint clean
- All acceptance criteria (AC1–AC9) satisfied

### File List

- `src/utils/constants.ts` — modified (added 7 new constant exports)
- `src/utils/format.ts` — created (8 formatting functions)
- `src/utils/constants.test.ts` — created (10 tests)
- `src/utils/format.test.ts` — created (51 tests)
- `src/types/index.test.ts` — modified (removed unused duplicate import, fixing pre-existing lint error)

### Review Findings (2026-04-13)

- [x] [Review][Patch] `FRESHNESS_THRESHOLDS`, `SIMULATION_DEFAULTS`, `SIMULATION_RANGES` not frozen — wrapped all three in `Object.freeze()`. Shallow freeze per agent consensus (Winston/Amelia/Murat). [`src/utils/constants.ts:20,33,40`]
- [x] [Review][Patch] Missing `Object.isFrozen()` tests for FRESHNESS_THRESHOLDS, SIMULATION_DEFAULTS, SIMULATION_RANGES — added. Also added defaults-within-ranges invariant test. [`src/utils/constants.test.ts`]
- [x] [Review][Patch] Missing `formatPrice(0)` and `formatPrice(-0)` test — added. Also fixed `formatPrice(-0)` returning `"$-0.00"` by normalizing negative zero. [`src/utils/format.ts:53`, `src/utils/format.test.ts`]
- [x] [Review][Patch] Missing `formatGas` Infinity test — added. [`src/utils/format.test.ts`]
- [x] [Review][Patch] Missing `formatInflation` / `formatGDP` / `formatPercent` Infinity tests — added. [`src/utils/format.test.ts`]
- [x] [Review][Patch] `formatPrice` and `formatGas` negative zero produces `"-0.00"` — added same `value === 0 ? 0 : value` normalization as `formatOilProduction`. [`src/utils/format.ts:53,70`]
- [x] [Review][Defer] `formatDate` accepts semantically invalid dates like `"2026-02-30"` — deferred, spec explicitly states "structural regex only — does NOT validate real calendar dates" [`src/utils/format.ts:92-98`]
- [x] [Review][Defer] `SIMULATION_RANGES` `as const` may be redundant with type annotation — deferred, pre-existing design choice with no runtime impact [`src/utils/constants.ts:38-44`]
- [x] [Review][Defer] No invariant test for `SIMULATION_DEFAULTS` within `SIMULATION_RANGES` bounds — **resolved**: invariant test added during review patches
