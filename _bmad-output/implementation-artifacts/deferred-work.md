# Deferred Work

## Deferred from: party mode review of 1A.2 (2026-04-13)

- **validate-data.ts deferred to Epic 1B** — No data exists at Epic 1A. Script would validate nothing. Belongs in Story 1B.6 when actual data shapes arrive. [Source: Winston, Amelia, John, Murat consensus]
- **Gzipped bundle gate deferred to Epic 2** — No baseline exists yet. Gzipped size logged in 1A.2a but not gated until Epic 2 establishes real panel data. [Source: Winston/Murat compromise]
- **Dependency audit (npm audit) deferred to Epic 9** — Recommended as non-blocking CI warning, promoted to blocking before production. [Source: Murat recommendation]
- **Single-file fallback escalation** — If bundle exceeds threshold with <6 panels, escalate to architecture for code-splitting evaluation. Risk acceptance, not a story AC. [Source: Murat recommendation]

## Deferred from: code review of 1a-2a-vite-config-build-spike-recharts-proof (2026-04-13)

- **App.tsx lacks semantic grouping for accessibility** [src/App.tsx:5-8] — `<h1>` and `<p>` are siblings with no semantic wrapper. Should use `<header>` or `<section>` with ARIA landmarks for WCAG 2.1 AA. Pre-existing from 1A.1, not introduced by this change.
- **check-bundle-size.ts uses Unix-only `gzip`/`wc`** [scripts/check-bundle-size.ts:9] — Script will fail on Windows. Acceptable because project targets macOS/Linux CI (Vercel + GitHub Actions).

## Deferred from: code review of 1a-1-project-scaffold-dependencies-design-tokens (2026-04-13)

- **No test script despite vitest installed** [package.json] — Test infrastructure setup belongs to Story 1B.7. Not this story's scope.
- **Missing typecheck script** [package.json] — Nice-to-have for DX, not required by any AC. Can be added in a later story.
- **ignoreDeprecations/erasableSyntaxOnly suppress TS 6.0 diagnostics** [tsconfig.app.json] — Required for TypeScript 6.0 compatibility. Intentional and correct.

## Deferred from: code review of 1a-2b-ci-pipeline-deployment-validation (2026-04-13)

- **`import.meta.dirname` in check-bundle-size.ts requires Node ≥ 20.11** [scripts/check-bundle-size.ts:6] — Works on latest Node 20.x (20.19+). Pre-existing from 1A.2a, not introduced by this change.
- **tsconfig.node.json doesn't include scripts/ or playwright.config.ts** [tsconfig.node.json:23] — Type errors in these files won't be caught by `tsc --noEmit`. Pre-existing from 1A.1.
- **waitForTimeout(2000) anti-pattern in e2e test** [e2e/network-isolation.spec.ts:30,49] — Acceptable for spike. Improve with `waitForLoadState('networkidle')` or specific condition in Epic 9.
- **ESLint browser globals applied to e2e/ Node files** [eslint.config.js:20] — `globals.browser` is set for all files, but e2e/ tests run in Node. Pre-existing config.
- **main.tsx non-null assertion on getElementById('root')** [src/main.tsx:6] — Pre-existing from 1A.1.
- **No Playwright install step for CI** [ci.yml] — E2E stage is commented out for Epic 9. Install step (`npx playwright install --with-deps`) needed when activated.

## Deferred from: code review of 1b-1-typescript-interfaces-frozen-contracts (2026-04-13)

- **Numeric range constraints on SimulationInput, probability, disruptionLevel, VulnerabilityScore** — TypeScript cannot enforce numeric ranges without branded types. Design decision deferred to post-Epic 1B stability review.
- **Date format template literal types** — ISO 8601 convention documented in project-context.md; template literal enforcement is over-engineering for provisional contracts.
- **OilHistoryRecord/PriceRecord structural overlap** — Semantic distinction documented in JSDoc; structural subtyping acceptable.
- **PanelState<T> unconstrained generic** — Consumers constrain T at usage sites; `extends object` would prevent valid primitive panel states.
- **SourcedRecord.source is string despite DataSource union** — Data files (1B.4) will enforce DataSource; SourcedRecord stays flexible.
- **PolicyResponse.country bare string** — Policy panel may reference non-FocusCountry nations; premature to constrain.
- **CascadeNode.category bare string** — Categories enumerated in data files (1B.4); type contract stays flexible.
- **HistoricalCrisis.year as number** — Year-only integer is pragmatic; not a full date requiring ISO 8601.
- **SimulationResult intersection field collision risk** — Hypothetical; no current collision.
- **SupplyChainEdge.direction potential redundancy** — Direction semantics valid for weighted/typed edges.
- **PanelConfig.sourceBadge.confidence scale ambiguous** — Scale determined during panel implementation (1C+).
- **Test count assertions verify local arrays, not exports** — Imports catch missing exports at compile time; counts are sanity checks.
- **Union exhaustiveness tests missing** — Nice-to-have; not an AC requirement.

## Deferred from: code review of 1b-2-constants-format-utilities (2026-04-13)

- **`formatDate` accepts semantically invalid dates like "2026-02-30"** — Spec explicitly states "structural regex only — does NOT validate real calendar dates." Intentional design choice. [src/utils/format.ts:92-98]
- **`SIMULATION_RANGES` `as const` may be redundant with type annotation** — Pre-existing design choice with no runtime impact. Both annotation and assertion are present; no behavior difference. [src/utils/constants.ts:38-44]
- **No invariant test for `SIMULATION_DEFAULTS` within `SIMULATION_RANGES` bounds** — Cross-constant invariant testing adds coupling between independent constants. Defaults and ranges are independently specified by FR requirements.
