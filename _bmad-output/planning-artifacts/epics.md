---
stepsCompleted: [1, 2, 3, 4]
status: complete
inputDocuments:
  - 'PRD-Energy-Crisis-Command-Center.md'
  - 'architecture.md'
  - 'ux-design-specification.md'
  - 'product-brief-oil.md'
---

# oil - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for oil, decomposing the requirements from the PRD, UX Design, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR-001: User can view 6 KPI cards displaying current values for key crisis indicators.
FR-002: User can view an oil price trend chart with at least one data series and axis labels.
FR-003: User can read a written briefing summarizing the current crisis state with at least 3 data-backed statements, each with source attribution.
FR-004: User can see the last-updated timestamp for all dashboard data in ISO 8601 date format.
FR-005: User can view shipping traffic volume through the Strait of Hormuz across 9 time periods.
FR-006: User can view current ceasefire status including tanker count, toll charges, mine clearance, and recovery estimates (5 distinct data fields with timestamps).
FR-007: User can compare shipping traffic levels across time periods using labeled bars with numeric vessel/day labels.
FR-008: User can view GDP revision data for 8 regions in a sortable data grid with dual-bar visualization and color-coded severity.
FR-009: User can view 2026 inflation forecast data for 8 regions.
FR-010: User can sort the GDP/CPI display by GDP impact magnitude, reordering all 8 regions from highest to lowest within 200ms.
FR-011: User can sort the GDP/CPI display by inflation severity, reordering all 8 regions from highest to lowest within 200ms.
FR-012: User can view 8 macroeconomic indicators related to stagflation risk, each with name, current value, and pre-crisis baseline.
FR-013: User can see a risk classification (danger/safe) for each of 8 stagflation indicators with icon or badge and distinct color per state.
FR-014: User can identify which stagflation indicators have worsened relative to pre-crisis baselines via current vs pre-crisis value comparison.
FR-015: User can view a node graph containing 19 supply chain dependency nodes, each labeled with a supply chain component name.
FR-016: User can select any single node to view its disruption level (0-100%).
FR-017: User can view upstream causes for a selected supply chain node.
FR-018: User can view downstream effects for a selected supply chain node.
FR-019: User can see connections (edges) between related nodes in the supply chain graph.
FR-020: User can view 4 scenarios with probability weightings summing to 100% (15% + 45% + 30% + 10%).
FR-021: User can select a scenario card to view projected oil price, GDP impact, inflation addition, trade impact, and recovery timeline.
FR-022: User can view a probability distribution bar across all 4 scenarios showing relative weight of each.
FR-023: User can compare scenario projections without navigating away from the panel (2+ scenario details viewable simultaneously on a single screen).
FR-024: User can view a 7-month Brent crude price trajectory with labeled axes.
FR-025: User can view a 7-month WTI price trajectory on the same chart or comparable axis range.
FR-026: User can interact with a data point to view its exact date, Brent price, WTI price, and associated event via tooltip.
FR-027: User can see event markers on the chart corresponding to crisis milestones with identifying labels.
FR-028: User can view 7 gauges representing disrupted commodity flows, each labeled with a distinct commodity name.
FR-029: User can read the disruption percentage (0-100%) for each of 7 commodity gauges.
FR-030: User can distinguish between severity levels across gauges via color coding using at least 3 distinct colors for severity ranges.
FR-031: User can view a vulnerability index score for each of 8 countries.
FR-032: User can view a detailed breakdown of factors (fossil dependency, import dependence, etc.) contributing to a country's score (at least 3 sub-factors).
FR-033: User can compare vulnerability dimensions across countries using dual progress bars per country entry.
FR-034: User can adjust oil price input between $70 and $160 using a slider displaying current selected value.
FR-035: User can adjust crisis duration input between 1 and 18 months using a slider displaying current value.
FR-036: User can adjust severity input between 10% and 100% using a slider displaying current value.
FR-037: User can view 5 computed outputs (GDP impact, added inflation, trade slowdown, food price rise, estimated job impact) that update within 100ms of any slider change.
FR-038: User can reset all simulator inputs to default values ($100, 6 months, 50%) within 100ms.
FR-039: User can view 12 crisis events in chronological order with date stamps.
FR-040: User can expand a timeline event to view extended description not visible in collapsed state.
FR-041: User can see a severity rating for each timeline event (at least 3 severity levels).
FR-042: User can view a feed of 11 government policy responses with source country/institution, each with at least 1 sentence description.
FR-043: User can filter policy entries by response type (e.g., sanctions, strategic reserves, demand reduction), reducing visible entries to matching entries only.
FR-044: User can identify the type of each policy response via a color-coded type badge with text category name.
FR-045: User can view data for 6 major energy crises since 1973 with year, event name, and at least 2 comparable metrics.
FR-046: User can compare crises across shared metrics (price change %, GDP impact) in a side-by-side layout with metrics aligned horizontally.
FR-047: User can view 7 indicators tracking energy transition progress, each with name and current value.
FR-048: User can determine whether each energy transition indicator shows acceleration or regression relative to baseline via directional status.
FR-049: User can navigate between all 14 panels via a horizontal scrollable tab bar.
FR-050: User can identify the currently active panel via a highlighted tab indicator with 3:1 contrast ratio against inactive tabs.
FR-051: User can switch between panels with a visual transition between 150ms and 500ms.
FR-052: User can access all 14 panels without authentication or login.
FR-053: User can view the data source for any displayed metric (source attribution on each data point or panel).
FR-054: User can see when data was last updated on any panel via a "Data as of [date]" timestamp.
FR-055: Each panel must display a skeleton placeholder matching panel layout during loading state, for a maximum of 1.5 seconds before data renders.
FR-056: Each panel must display a "Data unavailable for this panel" message when data structure is missing or malformed, while all other panels remain functional.
FR-057: Each panel must display a "No data matches current filters" message when a filter produces zero results, with filter controls remaining interactive.
FR-058: Each panel must display an amber "Data as of [date]" badge when data timestamp is older than 7 days from current date.
FR-059: Panel states must be independent — error in one panel must not affect any other panel.
FR-060: Tab navigation must remain functional regardless of any panel's state.
FR-061: Tab bar itself must render immediately on application boot with no loading or error state.
FR-062: All displayed data must show source attribution; editorial estimates must display "Estimated" label.
FR-063: Stale data indicators must trigger amber visual indicators when data exceeds defined freshness thresholds.
FR-064: Oil production data in million barrels/day (Mb/d) with 1 decimal place.
FR-065: Oil price data in USD/barrel with 2 decimal places.
FR-066: Natural gas data in USD/MMBtu or TTF EUR/MWh per source convention.
FR-067: Inflation data as percentage year-over-year with 1 decimal place.
FR-068: GDP growth data as percentage year-over-year with 1 decimal place and +/- sign.
FR-069: All dates in ISO 8601 format (YYYY-MM-DD).
FR-070: Geographic data covers 8 focus countries (US, China, India, Japan, Germany, UK, Saudi Arabia, Iran) at primary granularity.
FR-071: Regional aggregates (EU, Eurozone, G20, OECD) at secondary granularity.
FR-072: Data source priority hierarchy: IEA > EIA > OECD > ECB > UNCTAD/World Bank > Secondary.
FR-073: All displayed data must show source attribution.
FR-074: Editorial estimates must display "Estimated" label.
FR-075: All panels display "Data as of [date]" with timestamp; stale data beyond threshold triggers amber indicator.

### Non-Functional Requirements

NFR1: Initial page load to first meaningful paint < 1.5 seconds (Lighthouse Performance ≥ 90 on 4G).
NFR2: Interaction latency < 16ms per frame (60fps), no frame drops during slider drag, tab switch, or node tap.
NFR3: Bundle size (uncompressed) < 35KB.
NFR4: GDP/Inflation sort reorders all 8 regions within 200ms.
NFR5: Simulator outputs recalculate within 100ms of any slider change.
NFR6: Simulator reset restores all 3 sliders within 100ms.
NFR7: Panel transitions 150ms-500ms visual effect.
NFR8: Skeleton placeholder max 1.5s display before data renders.
NFR9: All 14 panels usable on 375px viewport with no horizontal scroll.
NFR10: Mobile performance optimized via single-file architecture, minimal re-renders, CSS-only animations.
NFR11: 100% offline capability — fully functional with no network after initial load.
NFR12: Browser compatibility 95%+ global share: Chrome 90+, Firefox 90+, Safari 15+, Edge 90+.
NFR13: Mobile responsive — all 14 panels usable on 375px, no horizontal scroll, all interactions via tap.
NFR14: Data currency — all data stamped as of April 11, 2026; stale badge if >7 days.
NFR15: Data accuracy — < 2% deviation from cited official sources (weekly manual audit).
NFR16: Data freshness thresholds — Oil prices >60 days, GDP >120 days, shipping >30 days, scenarios >14 days, policy >30 days.
NFR17: Data source hierarchy enforced — IEA > EIA > OECD > ECB > UNCTAD/World Bank > Secondary.
NFR18: All displayed data must show source attribution.
NFR19: Editorial estimates labeled with "Estimated" label.
NFR20: All dates in ISO 8601 format (YYYY-MM-DD).
NFR21: Numeric range validation — all values within defined bounds per schema.
NFR22: Required field validation — all required fields present in every data record.
NFR23: Zero external network calls in production — no outbound requests after initial load.
NFR24: No user data collection — zero cookies, zero localStorage writes, zero telemetry.
NFR25: No authentication required — all 14 panels load without login.
NFR26: Zero unhandled JavaScript errors — 0 errors in console across all 14 panels.
NFR27: Graceful degradation — affected panel shows error state; other 13 panels remain functional.
NFR28: Cross-panel state independence — error in one panel must not affect others.
NFR29: Tab navigation functional regardless of any panel's state.
NFR30: Tab bar renders immediately on application boot with no loading/error state.
NFR31: Empty filter state shows "No data matches current filters" within panel.
NFR32: Single-file deployment — entire app in one artifact file, open directly in browser.
NFR33: Data update process — data swap without code logic changes.
NFR34: Zero paid dependencies or API keys.
NFR35: No build step required for artifact rendering.
NFR36: All data from free, publicly available sources.
NFR37: Zero backend dependencies — works offline, no API keys.
NFR38: React 18+ functional components with hooks; no external state library.
NFR39: Custom SVG-based charts — zero charting library dependencies.
NFR40: Animations via CSS @keyframes + transition only.
NFR41: Color contrast all text — 4.5:1 minimum (WCAG AA), verified via axe-core.
NFR42: Color contrast large text/UI — 3:1 minimum, including icons, chart elements, tab indicators.
NFR43: Non-text content has text alternatives (WCAG 1.1.1) — SVG charts have title+desc, icons have aria-label.
NFR44: Keyboard navigation for all 14 panels (WCAG 2.1.1).
NFR45: Focus indicator visible on all interactive elements (WCAG 2.4.7) — 2px solid outline 3:1 contrast.
NFR46: Panel tab navigation via keyboard — Left/Right arrow keys; Tab key exits to panel content.
NFR47: Data conveyed by color also conveyed by pattern or label (WCAG 1.4.1).
NFR48: SVG data points must have aria-label attributes.
NFR49: Interactive SVG elements must be focusable via keyboard.
NFR50: SVG animations must respect prefers-reduced-motion.
NFR51: Accent red corrected to #ff453a (4.5:1 on #0a0a0f) to meet WCAG AA.
NFR52: Text Muted #48484a (2.2:1) restricted to decorative, non-informational text only.
NFR53: >80% of test users can identify country's GDP exposure within 30 seconds.
NFR54: 100% of users selecting 2+ scenarios can read oil price, GDP impact, recovery timeline.
NFR55: >90% complete supply chain cascade trace to 3rd-order effects within ≤4 node selections.
NFR56: 100% of users moving ≥1 simulator slider see all 5 outputs update.
NFR57: Application loads and renders all 14 panels with zero console errors across Chrome, Firefox, Safari.
NFR58: Geopolitical neutrality — source attribution, editorial estimates labeled, no value judgments.

### Additional Requirements (from Architecture)

- **Starter Template:** Vite react-ts (`npm create vite@latest oil -- --template react-ts`) — MUST be first implementation story
- **Single-file deployment:** vite-plugin-singlefile inlines all CSS/JS into one index.html
- **Hosting:** Vercel free tier, auto-deploy on merge to main
- **CI/CD:** GitHub Actions on every PR — lint + typecheck + Vitest + Playwright (~27 tests, ~3 min)
- **Lighthouse CI gate:** <1.5s FMP, <200KB gzipped; failing blocks merge
- **Playwright cross-browser matrix:** Chrome + Firefox + Safari
- **Vite path aliases:** @/ maps to /src/ (configured in both tsconfig.json and vite.config.ts)
- **All data as static TypeScript constants** in 4 domain files under src/data/
- **12 data structures, 8-19 records each** must be created
- **Data staleness detection:** useDataFreshness hook compares DATA_AS_OF against Date.now(), 7-day threshold
- **Build-time validation:** scripts/validate-data.ts runs as prebuild step
- **TypeScript interfaces first:** defined in src/types/index.ts before any implementation
- **Zustand only 2 stores:** appStore (UI) + simulationStore (simulator)
- **Immutable state:** set() with spread operator
- **Selector subscriptions:** minimum state slices, zustand/shallow for arrays
- **14 panel components:** self-contained, no cross-panel imports/props
- **Lazy-render on tab switch:** only active panel mounted in DOM
- **One React Error Boundary per panel:** centrally-defined PanelErrorBoundary
- **7 shared components:** KPICard, GaugeChart, DataBadge, ProbabilityBar, DualProgressBar, InfoTooltip, EmptyState
- **Recharts wrappers:** ThemedLineChart, ThemedBarChart, ThemedAreaChart
- **Custom SVG only for:** NodeGraph (19-node fixed-layout, NO force-directed simulation)
- **Named exports only** — no default exports
- **Tailwind CSS 3.4 locked** — MUST NOT upgrade to v4
- **Dark theme only** — #0a0a0f bg, #111118 panel, #1e1e2a border, #ff453a accent
- **CSS custom properties** via Tailwind semantic names, never hardcode hex in components
- **No @apply in component CSS** (only index.css)
- **No inline styles** except dynamic SVG positioning
- **No Framer Motion** — CSS transition and @keyframes only
- **prefers-reduced-motion and prefers-contrast** baked into Tailwind config
- **Vitest + RTL** for unit/component tests (~150 tests), co-located
- **Playwright "microscope"** for E2E (~27 surgical tests)
- **jest-axe** per panel for automated WCAG checks
- **Test infrastructure created day one**
- **Anti-patterns:** No data through store layer, no inline styles, no default exports, no shared components before spiking, no custom error boundary UI, no hardcoded hex, no mocking Zustand, no force-directed layout, no Tailwind v4, no barrel files

### UX Design Requirements

**Design Tokens (UX-DR1 through UX-DR14):** 14 requirements covering color tokens (12 core + 4 severity + 5 escalation + 4 interaction state + 4 animation language), typography system (6 levels), tabular-nums enforcement, crisis mode typographic escalation, spacing system (4px base), border radius (2-tier), Tailwind config semantic names, boundary glow token, structural color token, light mode token mapping.

**Layout Components (UX-DR15 through UX-DR18):** 4 requirements — AppShell (fixed MasterStatus + TabBar + panel content), TabBar (14-tab horizontal scrollable with 4 logical group separators), PanelWrapper (hero/context split with per-panel config), PanelErrorBoundary.

**Primitive Components (UX-DR19 through UX-DR22):** 4 requirements — InfoTooltip (Radix + Tailwind), EmptyState (4 variant reasons), Dialog (Radix backing, ALL overlays), FocusTrap (Radix).

**Shared Components (UX-DR23 through UX-DR37):** 15 requirements — MasterStatus (DEFCON-style 5 states, consequence statement, severity-scaled pulse, 48→72px expand), StatusChip (unified status+source, variant prop, 4 states), KPICard (6 states, primary card hierarchy), DataBadge (always visible at rest), ProbabilityBar, DualProgressBar, StatusIndicator, HeroSection, ContextSection, PanelHeader, IncidentBanner (role=alert, maximum one), SuggestionBar (first-to-cut), SynthesisMoment (max once per session), ExtractionTarget (3 copy options, mobile bottom sheet), VerdictCard.

**Chart Components (UX-DR38 through UX-DR42):** 5 requirements — ChartContainer (dark theme config, onDataPointSelect callback), ThemedLineChart, ThemedBarChart, NodeGraph (dumb SVG renderer ~100 LOC), NetworkPanel (interactive wrapper + useGraphTrace hook).

**Simulator Components (UX-DR43 through UX-DR44):** 2 requirements — SimulatorSlider (boundary glow, accessible range), SimulatorOutput (instant numeric + delayed chart).

**Hooks (UX-DR45 through UX-DR49):** 5 requirements — usePanelState/usePanelData, useSimulation, useGraphTrace, useSyncUrlState (URL sole source of truth), decomposed per-domain data loaders.

**Panel Registry (UX-DR50 through UX-DR51):** 2 requirements — PanelRegistry Map, React.lazy + Suspense at tab boundary.

**Visual Standardization (UX-DR52 through UX-DR57):** 6 requirements — color usage rules, max 72-char body text, labels vs values split, severity transition choreography, pattern interrupt mechanism, above-the-fold rule.

**Accessibility — Contrast (UX-DR58 through UX-DR60):** 3 requirements — AA contrast verification, AAA on critical indicators, chart-specific contrast.

**Accessibility — ARIA (UX-DR61 through UX-DR65):** 5 requirements — ARIA patterns for all components, live region management (pause/resume, rate limiting, summary mode), aria-expanded/aria-hidden, SVG accessibility, semantic HTML structure.

**Accessibility — Keyboard (UX-DR66 through UX-DR69):** 4 requirements — full keyboard navigation (platform-aware Cmd/Ctrl shortcuts), focus management, visible focus ring (2px cyan, audited), 48x48px touch targets.

**Accessibility — Motion (UX-DR70 through UX-DR71):** 2 requirements — 3-tier motion system (Full/Reduced/Minimal), no animation loop faster than 1Hz.

**Accessibility — Cognitive (UX-DR72):** 1 requirement — clear reading level, max 7 items per panel, relative timestamps, progressive disclosure, error prevention.

**Responsive (UX-DR73 through UX-DR79):** 7 requirements — desktop layout, tablet layout, mobile layout (dropdown panel nav, content priority), mobile progressive loading, Tailwind default breakpoints, zoom/reflow support.

**Interaction Patterns (UX-DR80 through UX-DR93):** 14 requirements — 4-click cascade trace, source-at-rest, Fog of War, Still Quiet, Thread Pattern (data lineage), Decision Capture, Memory Echo, The Silence, Tension Map, extraction gravitas, resolution whisper, panel transition states, curiosity affordances, severity never color alone.

**State Management (UX-DR94 through UX-DR100):** 7 requirements — URL sole source of truth, conflict resolution precedence, panel focus state machine, crisis mode state machine, exclusivity rules, panel-agnostic Zustand stores, event handler contracts.

**Testing (UX-DR101 through UX-DR112):** 12 requirements — axe-core in CI, Lighthouse in CI, jsx-a11y plugin, pa11y-ci, Playwright screenshot diffs, screen reader testing (3 engines, 8 scenarios), focus ring audit, keyboard-only testing (5 journeys), color blindness testing, zoom/reflow testing, responsive device testing, manual a11y audit on 5 high-priority components.

**Print (UX-DR113):** 1 requirement — print stylesheet.

**Performance (UX-DR114 through UX-DR117):** 4 requirements — bundle budget <500KB gzipped, LCP targets per breakpoint, simulator 100ms/60fps, contain: layout paint + content-visibility: auto.

**Data Contracts (UX-DR118 through UX-DR123):** 6 requirements — KPIData interface, PanelState interface, PanelConfig interface, onDataPointSelect callback, PresetScenario interface, EmptyStateProps interface.

**Build Principles (UX-DR124):** 1 requirement — design tokens only, typed contracts, Radix+Tailwind, <200 LOC per file, domain-scoped stores, prefers-reduced-motion, URL sole source of truth, per-domain hooks.

**Narrative Devices (UX-DR125 through UX-DR128):** 4 requirements — Inciting Incident (IncidentBanner), Memory Echo, The Silence, Tension Map.

### FR Coverage Map

FR-001: Epic 2 — 6 KPI cards
FR-002: Epic 2 — Oil price trend chart
FR-003: Epic 2 — Written briefing with sources
FR-004: Epic 2 — Last-updated timestamp
FR-005: Epic 2 — Hormuz shipping traffic
FR-006: Epic 2 — Ceasefire status
FR-007: Epic 2 — Shipping traffic comparison
FR-008: Epic 4 — GDP revision data
FR-009: Epic 4 — Inflation forecast
FR-010: Epic 4 — Sort by GDP impact
FR-011: Epic 4 — Sort by inflation
FR-012: Epic 4 — Stagflation indicators
FR-013: Epic 4 — Risk classification
FR-014: Epic 4 — Baseline comparison
FR-015: Epic 3 — 19-node graph
FR-016: Epic 3 — Node disruption level
FR-017: Epic 3 — Upstream causes
FR-018: Epic 3 — Downstream effects
FR-019: Epic 3 — Node connections
FR-020: Epic 5 — 4 scenarios with probabilities
FR-021: Epic 5 — Scenario card details
FR-022: Epic 5 — Probability distribution bar
FR-023: Epic 5 — Side-by-side comparison
FR-024: Epic 6 — Brent price trajectory
FR-025: Epic 6 — WTI price trajectory
FR-026: Epic 6 — Data point tooltip
FR-027: Epic 6 — Event markers
FR-028: Epic 2 — Commodity disruption gauges
FR-029: Epic 2 — Disruption percentages
FR-030: Epic 2 — Severity color coding
FR-031: Epic 4 — Vulnerability index
FR-032: Epic 4 — Vulnerability breakdown
FR-033: Epic 4 — Dual progress bars
FR-034: Epic 5 — Oil price slider
FR-035: Epic 5 — Duration slider
FR-036: Epic 5 — Severity slider
FR-037: Epic 5 — 5 computed outputs <100ms
FR-038: Epic 5 — Reset sliders <100ms
FR-039: Epic 6 — 12 crisis events
FR-040: Epic 6 — Expandable events
FR-041: Epic 6 — Event severity ratings
FR-042: Epic 7 — 11 policy responses
FR-043: Epic 7 — Filter by response type
FR-044: Epic 7 — Type badges
FR-045: Epic 7 — 6 historical crises
FR-046: Epic 7 — Side-by-side crisis comparison
FR-047: Epic 7 — 7 transition indicators
FR-048: Epic 7 — Directional status
FR-049: Epic 1C — Tab navigation
FR-050: Epic 1C — Active tab indicator
FR-051: Epic 1C — Panel transitions
FR-052: Epic 1A — No auth required
FR-053: Epic 8 — Source attribution enforcement
FR-054: Epic 8 — Timestamp enforcement
FR-055: Epic 1C — Skeleton placeholders
FR-056: Epic 1C — Error state per panel
FR-057: Epic 7 — Empty filter state
FR-058: Epic 8 — Stale data indicators
FR-059: Epic 1C — Panel independence
FR-060: Epic 1C — Tab nav survives errors
FR-061: Epic 1C — Tab bar immediate render
FR-062: Epic 8 — Source attribution + Estimated label
FR-063: Epic 8 — Stale indicators enforcement
FR-064: Epic 1B — Oil data formatting
FR-065: Epic 1B — Price formatting
FR-066: Epic 1B — Gas formatting
FR-067: Epic 1B — Inflation formatting
FR-068: Epic 1B — GDP formatting
FR-069: Epic 1B — Date formatting
FR-070: Epic 1B — 8 focus countries
FR-071: Epic 1B — Regional aggregates
FR-072: Epic 1B — Source hierarchy
FR-073: Epic 8 — Source attribution
FR-074: Epic 8 — Estimated label
FR-075: Epic 8 — Timestamp + stale indicator

## Definition of Done (applies to all panel epics 2-7)

- Source attribution visible on every panel (FR-53)
- "Data as of [date]" timestamp on every panel (FR-54)
- Stale data amber indicator when >threshold (FR-58)
- Editorial estimates labeled "Estimated" (FR-62)
- All data formatting rules enforced (FR-64-75)
- jest-axe zero new violations on touched panels
- Keyboard navigation functional for new interactive elements
- Each file <200 LOC
- Named exports only (no default exports)

## Epic List

### Epic 1A: Scaffold & Tooling Spike
**User outcome:** Project boots, build constraint validated, charting library confirmed, one static render works in browser.
**FRs covered:** FR-52
**In-scope:** Vite react-ts scaffold, all deps installed (Tailwind 3.4 pinned via `overrides`), vite.config.ts (aliases + singlefile), tailwind.config.ts (tokens + breakpoints + prefers-reduced-motion), tsconfig.json, design tokens CSS, single-file build spike (validate vite-plugin-singlefile + Recharts bundle — go/no-go), charting library spike, one static render POC.
**Out-of-scope:** Any components, stores, data files, routing.
**Dependencies:** None (this is first).
**Provides to downstream:** Confirmed build pipeline, confirmed charting library, confirmed bundle size, responsive breakpoints defined.

### Epic 1B: Data Layer & Stores
**User outcome:** All TypeScript interfaces defined and frozen, all 4 data files populated with real data, both Zustand stores functional, format utilities ready, test infrastructure operational.
**FRs covered:** FR-64, 65, 66, 67, 68, 69, 70, 71, 72
**In-scope:** `src/types/index.ts` (ALL shared interfaces — OilHistoryRecord, GDPForecast, CascadeNode, SupplyChainNode, SupplyChainEdge, ScenarioParameter, SimulationInput, SimulationResult, KPIData, PanelState, PanelConfig, etc. — frozen with consumer contracts for Epics 3-7), 4 data files with DATA_AS_OF timestamps, `src/stores/` (appStore + simulationStore), `src/utils/format.ts`, `src/utils/constants.ts`, `scripts/validate-data.ts` (prebuild step), test infrastructure (`vitest.config.ts`, `test-utils/factories.ts`, `test-utils/render.tsx`, `test-utils/store-helpers.ts`, `test-utils/fixtures/`), jest-axe integration.
**Out-of-scope:** Any UI components, routing, panels.
**Dependencies:** Epic 1A (build pipeline confirmed).
**Provides to downstream:** All interfaces, all data, both stores, format utils, test infra. Interfaces are frozen — consumer epics code against stable contracts.
**Critical note:** Data is static TypeScript constants, zero API calls, zero mock services, zero fetch logic. Panels import directly from `data/*.ts`.

### Epic 1C: Shell & Navigation
**User outcome:** User can navigate 14 panels via tabbed interface with keyboard shortcuts, see MasterStatus crisis indicator with consequence statement, every tab shows skeleton panel with error boundary. URL state drives navigation.
**FRs covered:** FR-49, 50, 51, 55, 56, 59, 60, 61, 73, 74, 75
**In-scope:** AppShell, TabBar (14 tabs, 4 groups, Cmd/Ctrl+1-4), MasterStatus (DEFCON-style, consequence statement, severity pulse), PanelErrorBoundary, EmptyState, Dialog (Radix), FocusTrap (Radix), useSyncUrlState hook (URL sole source of truth), 14 skeleton panel placeholders, skip link, semantic HTML, error/loading state patterns (1C owns the pattern — all panels implement).
**Out-of-scope:** Any real panel content, data display, charts.
**Dependencies:** Epic 1A (build), Epic 1B (stores + interfaces).
**Provides to downstream:** Shell ready for any panel to drop in. Error/loading/skeleton pattern established. URL routing functional.
**Can parallel with:** 1B (after 1A validates build).

### Epic 2: Crisis Overview & Supply
**User outcome:** User sees current crisis at a glance — 6 KPIs, oil price chart, written briefing with sources, Hormuz traffic, ceasefire status, commodity gauges. Lightweight Memory Echo surfaces historical parallels. Dr. Amara identifies top-3 crisis countries within 45 seconds.
**FRs covered:** FR-1, 2, 3, 4, 5, 6, 7, 28, 29, 30
**In-scope:** OverviewPanel, OilSupplyPanel, HormuzPanel, DisruptionPanel, KPICard, DataBadge, StatusChip, ChartContainer, ThemedLineChart, ThemedBarChart, HeroSection, ContextSection, PanelHeader, DualProgressBar (shared — also consumed by Epic 4), Memory Echo (lightweight version).
**Out-of-scope:** GDP/stagflation analysis, supply chain graph, simulation, policy filtering.
**Dependencies:** Epic 1C (shell + patterns).
**Provides to downstream:** Shared component APIs validated (KPICard, ChartContainer, etc. available for Epics 3-7).
**Usability smoke test:** Stopwatch someone identifying top-3 crisis countries. Target <45 seconds. If this fails, rework information architecture before proceeding.
**DoD applies.**

### Epic 3: Supply Chain Deep Dive
**User outcome:** User explores 19-node supply chain graph, selects nodes to see disruption, traces upstream causes and downstream effects.
**FRs covered:** FR-15, 16, 17, 18, 19
**In-scope:** NodeGraph (~250 LOC — honest budget; overflow fallback: simplify to canvas rendering or lightweight library per 1A spike findings), NetworkPanel (~120 LOC), useGraphTrace hook (~60 LOC).
**Out-of-scope:** GDP analysis, simulation, price charts.
**Dependencies:** Epic 1C (shell), Epic 1B (cascade-data.ts, interfaces).
**Provides to downstream:** useGraphTrace hook consumed by Epic 4. Epic 4 blocked until useGraphTrace merged + tested.
**Test depth:** 8-10 Playwright tests. Edge cases: empty graph, disconnected clusters, single node, mobile touch targets, pan/zoom state.
**Persona AC:** >90% complete cascade trace to 3rd-order effects in ≤4 node selections.
**DoD applies.**

### Epic 4: Economic Impact Analysis
**User outcome:** User views sortable GDP data for 8 regions, stagflation risk indicators with baseline comparison, country vulnerability scores. Owns the 4-click cascade trace (See→Click→Trace→Act).
**FRs covered:** FR-8, 9, 10, 11, 12, 13, 14, 31, 32, 33
**In-scope:** GDPPanel, StagflationPanel, VulnerabilityPanel, StatusIndicator component, sorting logic (<200ms), cascade trace interaction.
**Out-of-scope:** Simulation, supply chain graph, policy, timeline.
**Dependencies:** Epic 1C (shell), Epic 1B (economic-data.ts, interfaces), Epic 2 (DualProgressBar, shared components), Epic 3 (useGraphTrace hook — explicit dependency).
**Persona AC:** Dr. Amara traces GDP exposure in <2 interactions. Sort reorder <200ms.
**DoD applies.**

### Epic 5: Scenario Simulation
**User outcome:** User views 4 weighted scenarios, compares side-by-side, adjusts sliders for real-time economic impact projections. The emotional climax.
**FRs covered:** FR-20, 21, 22, 23, 34, 35, 36, 37, 38
**In-scope:** ScenarioPanel, SimulatorPanel, SimulatorSlider (boundary glow, 48px mobile thumb), SimulatorOutput (instant numeric + 150ms chart), ProbabilityBar, computeEconomicOutputs() pure function.
**Out-of-scope:** Narrative devices, historical context, a11y audit.
**Dependencies:** Epic 1C (shell), Epic 1B (simulationStore, ScenarioParameter/SimulationResult interfaces — frozen), Epic 2 (ChartContainer, shared components).
**Persona AC:** Each slider pull reflects real data from 3+ upstream panels. All 5 outputs recalculate <100ms. Reset <100ms. 60fps during drag.
**DoD applies.**

### Epic 6: Crisis Timeline & Price History
**User outcome:** User explores Brent/WTI price trajectories with event markers, chronological crisis timeline with expandable events and severity ratings.
**FRs covered:** FR-24, 25, 26, 27, 39, 40, 41
**In-scope:** PriceChartPanel, TimelinePanel.
**Out-of-scope:** Policy filtering, historical comparisons, energy transition.
**Dependencies:** Epic 1C (shell), Epic 1B (geopolitical-data.ts partial — price + timeline data), Epic 2 (ChartContainer, ThemedLineChart).
**Ordering rationale:** Price history and timeline serve both personas' orientation needs — Carlos needs price verification (Journey 3), Amara needs timeline context. Both are reference material that doesn't depend on Epics 4-5's analytical models. Ships before Policy (Epic 7) because price/timeline data is consumed by fewer downstream panels.
**DoD applies.**

### Epic 7: Policy & Energy Context
**User outcome:** User views 11 filterable policy responses (Carlos's primary verification tool), 6 historical crisis comparisons (provides context for Memory Echo), 7 energy transition indicators with directional status.
**FRs covered:** FR-42, 43, 44, 45, 46, 47, 48, 57
**In-scope:** PolicyPanel (filterable by type), HistoryPanel, TransitionPanel.
**Out-of-scope:** Price charts, timeline, GDP analysis, simulation.
**Dependencies:** Epic 1C (shell), Epic 1B (geopolitical-data.ts remaining — policy + history + transition data), Epic 2 (shared components).
**Note:** Policy tracker is NOT encyclopedic — it's Carlos's primary source verification tool for Journey 3 (Article Research). Historical comparisons provide data for Memory Echo. Energy transition indicators show forward-looking context.
**DoD applies.**

### Epic 8: Advanced UX, Narrative & Accessibility
**User outcome:** Full narrative design — IncidentBanner, SynthesisMoment, extraction/citation with source traveling, Fog of War, Thread Pattern, Decision Capture, The Silence, Tension Map, SuggestionBar, VerdictCard. Full WCAG AA validated. Mobile responsive across all panels. Print stylesheet.
**FRs covered:** FR-53, 54, 58, 62, 63 (cross-cutting enforcement)
**In-scope — 10 components with individual ACs:**
1. IncidentBanner (role=alert, max one visible, 600ms entrance, dismissible)
2. SynthesisMoment (max once per session, cyan border, aria-live=polite)
3. ExtractionTarget (3 copy options, source travels, mobile bottom sheet)
4. Fog of War (4 confidence levels, visual fog, never hide data)
5. Thread Pattern (inline drawer, Source→Methodology→Panels using data)
6. Decision Capture (localStorage belief annotation, insight diff on return)
7. SuggestionBar (first-to-cut if timeline slips, 3-dismiss learning)
8. VerdictCard (comparative summary, exportable)
9. The Silence (48px spacer, max once per session)
10. Tension Map (competing interpretations via data.interpretation field)
**Plus:** Live region management (pause/resume + rate limiting + summary mode), 3-tier motion system (Full/Reduced/Minimal), focus ring audit (2px cyan against all backgrounds), print stylesheet, visual regression via Playwright screenshot diffs.
**Out-of-scope:** New panels, new data, CI/CD pipeline.
**Dependencies:** All panel epics 2-7 (narrative devices layer onto existing panels).
**A11y audit:** 5 high-priority components (MasterStatus, IncidentBanner, Simulator, ExtractionTarget, TabBar) — full 10-item manual checklist. 9 remaining panels — axe-core + keyboard spot check.
**Screen reader testing:** VoiceOver macOS, VoiceOver iOS, NVDA Windows. 8 scenarios including pause/resume announcements and 200% zoom Journey 1.
**Persona coverage:** IncidentBanner/SynthesisMoment serve Dr. Amara (Journey 1), ExtractionTarget/Thread Pattern serve Carlos (Journey 3), Decision Capture serves both, Fog of War serves both.
**LOC note:** ~1500 LOC across 10 components. If PR review chokes, split into 8A (5 core narrative: IncidentBanner, SynthesisMoment, ExtractionTarget, Fog of War, Thread Pattern) and 8B (5 enhanced: Decision Capture, SuggestionBar, VerdictCard, The Silence, Tension Map).

### Epic 9: Production Deployment & Quality Gates
**User outcome:** App deployed worldwide on Vercel, loads <1.5s, 60fps, all browsers, zero console errors.
**NFR-based Acceptance Criteria:**
- Deploy completes in <5 min on merge to main
- Lighthouse Performance ≥90 on simulated 4G
- Lighthouse Accessibility ≥90
- FMP <1.5s, bundle <500KB gzipped
- Zero console errors across Chrome, Firefox, Safari
- All 14 panels functional on 375px viewport
- 100% offline functional after initial load
**In-scope:** GitHub Actions CI (lint + typecheck + Vitest + Playwright per PR), Lighthouse CI gate (FMP <1.5s, performance budget per breakpoint), Playwright E2E suite (~27 tests allocated by risk: Epic 3=8-10, Epic 5=5-6, Epic 2=4-5, Epic 4=3-4, Epics 6-7=2-3 each, cross-cutting=2-3), cross-browser matrix (Chrome + Firefox + Safari), Vercel auto-deploy, visual regression baseline.
**Out-of-scope:** New features, new panels, new data.
**Dependencies:** All epics complete.
**Quality gates enforced at every level (not just this epic):**
- Unit gate (every PR): Vitest green, zero skipped tests
- A11y gate (every PR): jest-axe per touched panel
- Integration gate (PR to main): Playwright smoke 5-7 tests <3 min
- Full gate (merge to deploy): Full Playwright + Lighthouse threshold
- Visual regression (pre-deploy): Screenshot diff baseline

## Build Order

```
1A (spike) → 1B (data) → 1C (shell) → 2 (overview + smoke test) → 3 (graph) → 4 (GDP) → 5 (simulator) → 6 (timeline) → 7 (policy) → 8 (narrative + a11y) → 9 (deploy)
```

1B and 1C can parallel after 1A. Epics 3-5 are independently deployable after Epic 2. Epics 6-7 are independently deployable after Epic 2. Epic 8 layers onto all panels. Epic 9 validates everything.

## Epic 1A: Scaffold & Tooling Spike

**Goal:** Project boots, build constraint validated, charting library confirmed, one static render works in browser, CI running from day one.
**FRs covered:** FR-52
**Dependencies:** None (this is first).
**Provides to downstream:** Confirmed build pipeline, confirmed charting library, CI pipeline, responsive breakpoints defined.

### Story 1A.1: Project Scaffold, Dependencies & Design Tokens

As a **developer**,
I want to initialize a Vite react-ts project with all dependencies pinned, design tokens configured, and Tailwind 3.4 locked,
So that the build pipeline is confirmed and the visual language foundation is ready for implementation.

**Acceptance Criteria:**

**Given** a clean workspace
**When** `npm create vite@latest oil -- --template react-ts` is executed
**Then** the project scaffolds with React 18+ TypeScript template
**And** all dependencies are installed: Tailwind CSS 3.4 (pinned via `overrides` in package.json), vite-plugin-singlefile, Zustand, Recharts, @radix-ui/react-tooltip, @radix-ui/react-dialog, jest-axe
**And** `npm run build` completes without errors
**And** `npm run dev` serves the app on localhost
**And** all 12 core color tokens are defined as CSS custom properties with Tailwind semantic names (bg-canvas, bg-panel, border-structural, text-primary, text-secondary, text-muted, accent-amber, accent-cyan, severity-critical, severity-warning, severity-elevated, severity-normal)
**And** 4 severity tokens, 5 escalation tokens, 4 interaction-state tokens, and 4 animation-language tokens are defined
**And** typography system has 6 levels (display, h1, h2, h3, body, caption) with font-variant-numeric: tabular-nums on data elements
**And** spacing system uses 4px base unit
**And** 2-tier border-radius (panel=12px, element=8px) is configured
**And** prefers-reduced-motion and prefers-contrast are baked into Tailwind config
**And** Tailwind 3.4 is locked — no v4 upgrade possible (UX-DR124)
**And** no @apply usage in component files (only index.css allowed)

### Story 1A.2: Vite Config, Build Spike & CI Setup

As a **developer**,
I want vite.config.ts configured with aliases, single-file plugin, CI pipeline running, and a confirmed build output,
So that single-file deployment is validated and quality gates run from day one.

**Acceptance Criteria:**

**Given** the scaffolded project with tokens from Story 1A.1
**When** vite.config.ts is configured with path alias `@/` -> `src/`, vite-plugin-singlefile, and the app is built
**Then** `npm run build` produces a single index.html with all CSS/JS inlined
**And** the single HTML file opens directly in browser with no server
**And** bundle size (uncompressed) is measured and recorded as baseline
**And** Recharts is confirmed compatible with single-file build (go/no-go recorded)
**And** tsconfig.json has matching `@/` path alias
**And** no external network calls are made from the built artifact
**And** GitHub Actions CI workflow is configured: ESLint lint, TypeScript typecheck, Vitest unit tests on every PR
**And** CI pipeline fails on any lint error, type error, or test failure
**And** build-time data validation (scripts/validate-data.ts) runs as prebuild step
**And** Vercel deployment spike validates single-file artifact serves correctly on CDN

## Epic 1B: Data Layer & Stores

**Goal:** All TypeScript interfaces defined and frozen, all 4 data files populated with real data, both Zustand stores functional, format utilities ready, motion utilities ready, test infrastructure operational.
**FRs covered:** FR-64, 65, 66, 67, 68, 69, 70, 71, 72
**Dependencies:** Epic 1A (build pipeline confirmed).
**Provides to downstream:** All interfaces, all data, both stores, format utils, motion utils, test infra. Interfaces are frozen.

### Story 1B.1: TypeScript Interfaces (Frozen Contracts)

As a **developer**,
I want all shared TypeScript interfaces defined and frozen in `src/types/index.ts`,
So that consumer epics (2-8) can code against stable contracts without circular dependencies.

**Acceptance Criteria:**

**Given** the scaffolded project from Epic 1A
**When** `src/types/index.ts` is created
**Then** all 12+ core interfaces are defined: `OilHistoryRecord`, `GDPForecast`, `CascadeNode`, `SupplyChainNode`, `SupplyChainEdge`, `ScenarioParameter`, `SimulationInput`, `SimulationResult`, `KPIData`, `PanelState`, `PanelConfig`, `EmptyStateProps`
**And** additional interfaces for data structures: `CeasefireStatus`, `ShippingTrafficPeriod`, `CommodityDisruption`, `VulnerabilityScore`, `StagflationIndicator`, `PolicyResponse`, `HistoricalCrisis`, `EnergyTransitionIndicator`, `TimelineEvent`, `PriceRecord`
**And** each interface has JSDoc comments describing purpose and consumer epics
**And** `tsc --noEmit` passes with zero errors
**And** all interfaces use named exports only

### Story 1B.2: Constants & Format Utilities

As a **developer**,
I want shared constants and format utilities that enforce data formatting rules,
So that all panels display data consistently per FR-64 through FR-69.

**Acceptance Criteria:**

**Given** the interfaces from Story 1B.1
**When** `src/utils/constants.ts` and `src/utils/format.ts` are created
**Then** constants include: DATA_AS_OF (ISO 8601), 8 focus countries array, source hierarchy, freshness thresholds per data type, severity level enums
**And** format utilities include: `formatOilProduction()` -> Mb/d 1 decimal, `formatPrice()` -> USD/barrel 2 decimals, `formatGas()` -> USD/MMBtu or TTF EUR/MWh, `formatInflation()` -> % YoY 1 decimal, `formatGDP()` -> % YoY 1 decimal with +/- sign, `formatDate()` -> ISO 8601 YYYY-MM-DD
**And** each format function validates input ranges and throws descriptive errors for out-of-bounds values
**And** all functions are pure with zero side effects
**And** unit tests cover edge cases (negative values, zero, extreme values, null/undefined)

### Story 1B.3: Motion & Accessibility Utilities

As a **developer**,
I want prefers-reduced-motion hooks and accessibility utility functions available from day one,
So that every panel story can build motion-aware components without deferring to Epic 8.

**Acceptance Criteria:**

**Given** the project with Tailwind config from Epic 1A
**When** `src/hooks/useMotionPreference.ts` and `src/utils/a11y.ts` are created
**Then** useMotionPreference hook returns one of 3 tiers: 'full' | 'reduced' | 'minimal' matching prefers-reduced-motion and data-motion attribute (UX-DR70-71)
**And** the hook subscribes to media query changes reactively
**And** a11y.ts provides: `getContrastRatio()`, `announceToScreenReader()`, `manageLiveRegion()` utilities
**And** all utilities are pure or hook-based with zero side effects
**And** unit tests verify all 3 motion tiers and live region management

### Story 1B.4: Data Files with Real Data

As a **developer**,
I want all 4 domain data files populated with real crisis data,
So that panels have concrete data to render without any API calls or mock services.

**Acceptance Criteria:**

**Given** interfaces from 1B.1 and utilities from 1B.2
**When** 4 data files are created under `src/data/`
**Then** `crisis-data.ts` contains KPI data, oil price history, briefing text with source attribution, commodity disruption records
**And** `economic-data.ts` contains GDP forecasts for 8 regions, inflation data for 8 regions, stagflation indicators (8 records), vulnerability scores (8 countries with 3+ sub-factors each)
**And** `cascade-data.ts` contains 19 SupplyChainNode records, SupplyChainEdge connections, ceasefire status, shipping traffic (9 time periods)
**And** `geopolitical-data.ts` contains policy responses (11 records), historical crises (6 records), energy transition indicators (7 records), timeline events (12 records), price records (Brent + WTI 7 months)
**And** each file exports DATA_AS_OF timestamp in ISO 8601
**And** all records match interface contracts from 1B.1 exactly
**And** zero import statements reference external APIs or fetch logic
**And** each data file is <200 LOC per architecture rules

### Story 1B.5: Zustand Stores

As a **developer**,
I want both Zustand stores (appStore + simulationStore) operational with immutable state patterns and sliced architecture,
So that UI state and simulation state are managed cleanly with selector subscriptions across 14 panels.

**Acceptance Criteria:**

**Given** interfaces from 1B.1 and data from 1B.4
**When** `src/stores/appStore.ts` and `src/stores/simulationStore.ts` are created
**Then** appStore manages: active panel index, panel focus states, crisis mode state machine, expanded/collapsed UI flags
**And** simulationStore manages: 3 slider inputs (oilPrice, duration, severity), computed outputs (GDP impact, inflation, trade slowdown, food price rise, job impact), reset action
**And** both stores use `set()` with spread operator for immutable state
**And** both stores use `zustand/shallow` for array subscriptions
**And** stores use panel-scoped selectors to minimize re-renders across 14 panels
**And** simulationStore's `computeEconomicOutputs()` is a pure function that recalculates all 5 outputs within 100ms of any input change
**And** stores have zero cross-imports between each other
**And** unit tests verify state transitions and selector behavior

### Story 1B.6: Build-time Data Validation

As a **developer**,
I want a prebuild validation script that catches data integrity issues before deployment,
So that malformed data never reaches production.

**Acceptance Criteria:**

**Given** the data files from Story 1B.4
**When** `scripts/validate-data.ts` is created and configured as a prebuild step in package.json
**Then** the script validates: all required fields present per interface, all values within defined bounds, all dates in ISO 8601 format, all source attributions present, scenario probabilities sum to 100%
**And** the script exits with code 1 and descriptive error messages on any failure
**And** the script runs as `npm run validate` and as prebuild hook
**And** validation passes on current data (no false positives)

### Story 1B.7: Test Infrastructure

As a **developer**,
I want test infrastructure operational from day one with factories, render helpers, and jest-axe integration,
So that every subsequent epic can write tests immediately without setup overhead.

**Acceptance Criteria:**

**Given** the project with stores from Story 1B.5
**When** test infrastructure files are created
**Then** `vitest.config.ts` is configured with jsdom environment, @/ alias, and coverage settings
**And** `test-utils/factories.ts` provides factory functions for all core interfaces with sensible defaults
**And** `test-utils/render.tsx` wraps components with necessary providers (Zustand store overrides)
**And** `test-utils/store-helpers.ts` provides helpers to create/reset store state for tests
**And** jest-axe integration is configured for automated WCAG checks
**And** CI coverage gate is configured: minimum threshold enforced per PR
**And** `npm run test` executes successfully with zero test failures
**And** sample smoke test validates infrastructure (render a div, assert it exists)

## Epic 1C: Shell & Navigation

**Goal:** User navigates 14 panels via tabbed interface with keyboard shortcuts, sees MasterStatus crisis indicator, every tab shows skeleton with error boundary. URL state drives navigation.
**FRs covered:** FR-49, 50, 51, 55, 56, 59, 60, 61, 73, 74, 75
**Dependencies:** Epic 1A (build), Epic 1B (stores + interfaces).

### Story 1C.1: AppShell & Semantic Structure

As a **user**,
I want a semantic HTML application shell with skip link and accessible landmark regions,
So that the app structure is navigable by assistive technology from first load.

**Acceptance Criteria:**

**Given** the data layer from Epic 1B
**When** AppShell component is rendered
**Then** the structure uses `<header>` for MasterStatus region, `<nav>` for TabBar, `<main>` for panel content area
**And** a skip link (`Skip to main content`) is the first focusable element, hidden visually until focused
**And** TabBar renders immediately on boot with zero loading/error state (FR-61)
**And** the panel content area lazy-renders only the active panel via React.lazy + Suspense at tab boundary (UX-DR50-51)
**And** the layout uses fixed MasterStatus + TabBar + scrollable panel content (UX-DR15)

### Story 1C.2: TabBar with 14 Tabs & Keyboard Navigation

As a **user**,
I want to navigate between 14 panels via a horizontal scrollable tab bar with 4 logical group separators and keyboard shortcuts,
So that I can access any panel quickly on desktop or mobile.

**Acceptance Criteria:**

**Given** the AppShell from Story 1C.1
**When** TabBar component renders with 14 tabs
**Then** tabs are organized in 4 groups: What's Happening, Why, What If, Reference — with visual group separators
**And** the active tab has a highlighted indicator with 3:1 contrast ratio against inactive tabs (FR-50)
**And** Left/Right arrow keys navigate between tabs; Tab key exits to panel content (FR-46, UX-DR66)
**And** Cmd/Ctrl+1-4 shortcuts jump to group start (platform-aware) (UX-DR66)
**And** tab bar is horizontally scrollable on mobile with scroll-into-view for active tab
**And** panel transition visual effect is 150ms-500ms (FR-51)
**And** tab navigation remains functional regardless of any panel's error state (FR-60)

### Story 1C.3: URL State Synchronization

As a **user**,
I want the URL to reflect my current panel selection and for the URL to drive navigation,
So that I can bookmark, share, and resume any panel directly.

**Acceptance Criteria:**

**Given** the TabBar from Story 1C.2
**When** useSyncUrlState hook is implemented
**Then** the URL is the sole source of truth for active panel (UX-DR97)
**And** clicking a tab updates the URL hash/query param
**And** navigating via URL loads the correct panel
**And** browser back/forward navigates panel history correctly
**And** invalid URL params gracefully redirect to default panel (no error state)
**And** conflict resolution follows: URL > store > default (UX-DR98)
**And** initial page load reads URL and activates correct panel
**And** URL state works with keyboard shortcuts from Story 1C.2
**And** panel focus state is URL-encoded for deep linking

### Story 1C.4: MasterStatus Crisis Indicator

As a **user**,
I want a DEFCON-style crisis severity indicator at the top of the app with a consequence statement,
So that I immediately understand the current crisis severity level and its implications.

**Acceptance Criteria:**

**Given** the AppShell from Story 1C.1
**When** MasterStatus component renders
**Then** it displays 5 severity states with explicit definitions: Level 1 (nominal/stable), Level 2 (elevated/watch), Level 3 (warning/escalating), Level 4 (critical/active crisis), Level 5 (severe/systemic failure)
**And** each state has a distinct visual treatment: color, pulse speed, icon
**And** state is determined by: incident severity from data, number of active disruptions, commodity flow reduction percentage
**And** a consequence statement is visible (e.g., "Strait of Hormuz: 40% traffic reduction — global supply at risk")
**And** the indicator has severity-scaled pulse animation (48px default, expandable to 72px on interaction)
**And** it uses aria-live region for status announcements
**And** focus ring is 2px cyan with 3:1 contrast against all backgrounds (UX-DR68)
**And** the component is <200 LOC
**And** pulse animation respects prefers-reduced-motion (UX-DR70-71)

### Story 1C.5: Panel Error Boundary & Skeleton Placeholders

As a **user**,
I want each panel to show a skeleton placeholder while loading and a graceful error message on failure,
So that one broken panel never affects the other 13.

**Acceptance Criteria:**

**Given** the AppShell with tabs from Stories 1C.1-1C.3
**When** PanelErrorBoundary and skeleton patterns are implemented
**Then** each of the 14 panel slots shows a skeleton placeholder matching panel layout during load, max 1.5s (FR-55)
**And** a panel with missing/malformed data shows "Data unavailable for this panel" while all other panels remain functional (FR-56, FR-59)
**And** a panel with zero-filter results shows "No data matches current filters" with filter controls still interactive (FR-57)
**And** PanelErrorBoundary catches errors in one panel without affecting any other (FR-59)
**And** tab navigation survives any panel error (FR-60)
**And** skeleton placeholder maintains Briefing Room atmosphere (consistent dark theme, muted geometry, not a broken experience)

### Story 1C.6: Dialog & FocusTrap Primitives

As a **developer**,
I want Radix-backed Dialog and FocusTrap primitives available for all overlays,
So that future panels (Epics 2-8) can build accessible overlays consistently.

**Acceptance Criteria:**

**Given** the project from Epic 1A
**When** Dialog and FocusTrap components are created
**Then** Dialog is backed by Radix UI primitives with dark-theme styling
**And** FocusTrap integrates with Radix for accessible focus containment
**And** both components use Tailwind semantic color tokens (no hardcoded hex)
**And** both have visible focus indicators (2px cyan outline)
**And** Dialog supports dismissible and non-dismissible modes
**And** keyboard: Escape closes dismissible dialogs, Tab cycles within focus trap
**And** aria-expanded, aria-hidden managed per UX-DR63
**And** nested dialog handling: focus returns to triggering element on close
**And** unit tests verify focus trap behavior, Escape handling, and nested dialog state

## Epic 2: Crisis Overview & Supply

**Goal:** User sees current crisis at a glance — 6 KPIs, oil price chart, written briefing with sources, Hormuz traffic, ceasefire status, commodity gauges. Dr. Amara identifies top-3 crisis countries within 45 seconds.
**FRs covered:** FR-1, 2, 3, 4, 5, 6, 7, 28, 29, 30
**Dependencies:** Epic 1C (shell + patterns).

### Story 2.1: Shared Panel Components & PanelShell

As a **user**,
I want consistent panel headers, hero/context sections, KPI cards, and data badges across all panels,
So that the visual language is unified and I can quickly scan information.

**Acceptance Criteria:**

**Given** the shell from Epic 1C and data from Epic 1B
**When** shared panel components are created
**Then** PanelShell provides consistent padding, title treatment, loading/error states, and prefers-reduced-motion gating for all 14 panels
**And** PanelHeader renders panel title with source attribution and "Data as of [date]" timestamp (FR-54)
**And** HeroSection provides top 60% layout with configurable content area
**And** ContextSection provides bottom 40% layout with contextual detail
**And** KPICard has 6 states (loading, nominal, warning, critical, stale, empty) with primary card hierarchy (UX-DR23)
**And** DataBadge is always visible at rest with source attribution (UX-DR23)
**And** StatusChip shows unified status + source with variant prop supporting 4 states (nominal, warning, critical, stale)
**And** all components are compatible with narrative overlay states from Epic 8 (no layout shift when overlaid)
**And** all components use Tailwind semantic tokens — zero hardcoded hex values
**And** each component <200 LOC with named exports

### Story 2.2: Chart Infrastructure & DualProgressBar

As a **user**,
I want dark-themed chart wrappers and gauge charts that work with Recharts and a dual progress bar for country vulnerability,
So that all panels have consistent, accessible chart rendering.

**Acceptance Criteria:**

**Given** the project with Recharts confirmed from Epic 1A spike
**When** chart components are created
**Then** ChartContainer wraps Recharts with dark theme config, proper padding, and `onDataPointSelect` callback (UX-DR38)
**And** ThemedLineChart renders line data with styled axes, gridlines, tooltips using dark palette
**And** ThemedBarChart renders bar data with labeled bars and numeric values
**And** GaugeChart renders a semi-circular gauge for 0-100% values with 3+ severity color ranges (FR-30)
**And** DualProgressBar renders two horizontal bars per row (used for country vulnerability in Epic 4)
**And** all charts have aria-label attributes on SVG elements (UX-DR48)
**And** chart data points have focusable elements for keyboard navigation (UX-DR49)
**And** chart animations respect prefers-reduced-motion
**And** charts are compatible with narrative overlay states from Epic 8

### Story 2.3: OverviewPanel — KPIs, Briefing & Price Trend

As a **user** (Dr. Amara),
I want to see 6 KPI cards, a written crisis briefing with source attribution, and an oil price trend chart on the first panel,
So that I can understand the crisis state in under 30 seconds.

**Acceptance Criteria:**

**Given** shared components from Stories 2.1-2.2 and crisis-data.ts from Epic 1B
**When** OverviewPanel renders
**Then** 6 KPI cards display current values for key crisis indicators (FR-1)
**And** each KPI card shows last-updated timestamp in ISO 8601 (FR-4)
**And** an oil price trend chart renders with at least one data series and labeled axes (FR-2)
**And** a written briefing summarizes current crisis with at least 3 data-backed statements, each with source attribution (FR-3)
**And** editorial estimates display "Estimated" label (FR-62)
**And** stale data (>7 days) triggers amber indicator on affected metrics (FR-58)
**And** the panel uses HeroSection (KPIs + chart) and ContextSection (briefing) layout
**And** panel loads within skeleton placeholder timeout (1.5s max)
**And** Briefing Room atmosphere maintained: muted authority, confident darkness, no visual noise

### Story 2.4: HormuzPanel — Shipping Traffic & Ceasefire Status

As a **user** (Carlos),
I want to see shipping traffic through the Strait of Hormuz across 9 time periods with ceasefire status details,
So that I can verify shipping disruption claims for my article.

**Acceptance Criteria:**

**Given** shared components from Stories 2.1-2.2 and cascade-data.ts from Epic 1B
**When** HormuzPanel renders
**Then** a bar chart shows shipping traffic volume across 9 time periods (FR-5)
**And** bars have labeled values (numeric vessel/day labels) enabling period-to-period comparison (FR-7)
**And** ceasefire status displays 5 distinct data fields: tanker count, toll charges, mine clearance status, recovery estimates, and timestamps (FR-6)
**And** each data field shows source attribution badge
**And** panel has PanelHeader with "Data as of [date]" timestamp
**And** panel is independently functional — errors here don't affect other panels (FR-59)
**And** keyboard shortcut Cmd/Ctrl+1 works from this panel to jump to other groups (UX-DR66)

### Story 2.5: DisruptionPanel & Memory Echo

As a **user**,
I want to see 7 commodity disruption gauges with severity colors and a lightweight historical parallel surfaced by Memory Echo,
So that I understand which commodity flows are most disrupted and how this compares to past crises.

**Acceptance Criteria:**

**Given** chart components from Story 2.2 and crisis-data.ts from Epic 1B
**When** DisruptionPanel renders
**Then** 7 gauges display disrupted commodity flows, each labeled with a distinct commodity name (FR-28)
**And** each gauge shows disruption percentage 0-100% (FR-29)
**And** gauges use at least 3 distinct colors for severity ranges (FR-30)
**And** Memory Echo surfaces a lightweight historical parallel — max once per session
**And** Memory Echo uses aria-live=polite announcement (UX-DR125)
**And** severity is never conveyed by color alone — includes pattern or label (UX-DR93)
**And** DoD checklist passes for this panel
**And** 6-7 Playwright tests verify: KPI rendering, chart interaction, gauge display, source attribution, skeleton loading, error state, keyboard navigation

## Epic 3: Supply Chain Deep Dive

**Goal:** User explores 19-node supply chain graph, selects nodes to see disruption, traces upstream causes and downstream effects. >90% complete cascade trace to 3rd-order effects in <=4 node selections.
**FRs covered:** FR-15, 16, 17, 18, 19
**Dependencies:** Epic 1B (cascade-data, interfaces), Epic 1C (shell). Can parallel with Epic 2 after Epic 1B ships.

### Story 3.1: NodeGraph SVG Renderer

As a **user**,
I want to see a 19-node supply chain dependency graph with labeled nodes and visible connections,
So that I can understand the structure of global oil supply chain dependencies.

**Acceptance Criteria:**

**Given** cascade-data.ts from Epic 1B (SupplyChainNode + SupplyChainEdge records)
**When** NodeGraph component renders
**Then** all 19 supply chain nodes are displayed with component name labels (FR-15)
**And** edges/connections between related nodes are visible (FR-19)
**And** nodes use fixed SVG layout — no force-directed simulation (architecture constraint)
**And** each node has aria-label with node name (UX-DR48)
**And** SVG has `<title>` and `<desc>` elements for screen readers
**And** the graph supports viewport zoom and pan for exploring dense areas (pinch zoom on mobile)
**And** node count upper bound of 25 nodes is tested for rendering performance (<100ms render)
**And** nodes render at 48x48px minimum for touch targets (UX-DR69)
**And** SVG animations respect prefers-reduced-motion
**And** static coordinate data is stored as a separate constant (not embedded in render logic)

### Story 3.2: Node Selection & Disruption Display

As a **user**,
I want to select any node and see its disruption level, upstream causes, and downstream effects,
So that I can trace the cascade of supply chain disruptions.

**Acceptance Criteria:**

**Given** the NodeGraph from Story 3.1
**When** a user selects a node (click or keyboard Enter)
**Then** the selected node displays disruption level 0-100% (FR-16)
**And** upstream causes for the selected node are displayed in a detail panel (FR-17)
**And** downstream effects for the selected node are displayed (FR-18)
**And** selected node is visually highlighted with focus ring (2px cyan)
**And** deselection restores the default view
**And** node selection is keyboard-accessible via Tab + Enter (UX-DR49)
**And** NetworkPanel wraps NodeGraph with selection state (~120 LOC)
**And** DataBadge shows source attribution for disruption data

### Story 3.3: useGraphTrace Hook & Cascade Interaction

As a **user** (Dr. Amara),
I want to trace supply chain cascade effects by selecting up to 4 nodes and see 3rd-order effects,
So that I can understand the full disruption chain from cause to consequence.

**Acceptance Criteria:**

**Given** the NetworkPanel from Story 3.2
**When** useGraphTrace hook is implemented and connected
**Then** selecting a node reveals its upstream and downstream connections
**And** selecting subsequent nodes traces the cascade chain using BFS algorithm with max depth 4
**And** hook returns: `{ tracePath: string[], currentDepth: number, upstreamNodes: SupplyChainNode[], downstreamNodes: SupplyChainNode[], resetTrace: () => void }`
**And** >90% of users can complete a cascade trace to 3rd-order effects within <=4 node selections (persona AC)
**And** the trace path is visually highlighted on the graph
**And** previous selections remain visible while tracing
**And** useGraphTrace is ~60 LOC, exported for consumption by Epic 4 (explicit downstream dependency)
**And** 8-10 Playwright tests cover: empty graph, disconnected clusters, single node, mobile touch targets, pan/zoom state, cascade depth, keyboard trace, max depth boundary

## Epic 4: Economic Impact Analysis

**Goal:** User views sortable GDP data for 8 regions, stagflation risk indicators with baseline comparison, country vulnerability scores. Dr. Amara traces GDP exposure in <2 interactions.
**FRs covered:** FR-8, 9, 10, 11, 12, 13, 14, 31, 32, 33
**Dependencies:** Epic 1C (shell), Epic 1B (economic-data), Epic 2 (DualProgressBar, shared components), Epic 3 (useGraphTrace hook).

### Story 4.1: StatusIndicator & Sort Infrastructure

As a **developer**,
I want a StatusIndicator component and a reusable sort utility that reorders data within 200ms,
So that GDP and stagflation panels can display sorted data responsively.

**Acceptance Criteria:**

**Given** shared components from Epic 2 and data from Epic 1B
**When** StatusIndicator and sort utilities are created
**Then** StatusIndicator renders icon or badge with distinct color per risk state (danger/safe) (FR-13)
**And** a pure sort function reorders 8-region arrays by numeric magnitude within 200ms (FR-10, FR-11)
**And** sort supports two modes: GDP impact magnitude and inflation severity
**And** StatusIndicator uses severity tokens — no hardcoded hex
**And** sort is stable — equal values maintain original order
**And** unit tests verify sort performance and correctness with benchmarks

### Story 4.2: GDPPanel — Sortable Regional Data

As a **user** (Dr. Amara),
I want to view GDP revision data and inflation forecasts for 8 regions in a sortable grid,
So that I can quickly identify the most affected economies.

**Acceptance Criteria:**

**Given** the sort infrastructure from Story 4.1 and economic-data.ts from Epic 1B
**When** GDPPanel renders
**Then** a data grid displays GDP revision data for 8 regions with dual-bar visualization and color-coded severity (FR-8)
**And** inflation forecast data for 8 regions is visible (FR-9)
**And** clicking "Sort by GDP impact" reorders all 8 regions highest-to-lowest within 200ms (FR-10)
**And** clicking "Sort by inflation" reorders all 8 regions highest-to-lowest within 200ms (FR-11)
**And** sort state is reflected in panel URL params via useSyncUrlState
**And** each row shows source attribution badge and DataBadge with "Data as of" timestamp
**And** keyboard shortcuts Cmd/Ctrl+1-4 work from this panel (UX-DR66)

### Story 4.3: StagflationPanel — Risk Indicators & Baseline Comparison

As a **user**,
I want to see 8 stagflation risk indicators with current vs pre-crisis baseline comparisons,
So that I can identify which macroeconomic signals have worsened.

**Acceptance Criteria:**

**Given** StatusIndicator from Story 4.1 and economic-data.ts from Epic 1B
**When** StagflationPanel renders
**Then** 8 macroeconomic indicators display with name, current value, and pre-crisis baseline (FR-12)
**And** each indicator has a risk classification (danger/safe) with icon/badge and distinct color per state (FR-13)
**And** current vs pre-crisis values are visually comparable to identify worsened indicators (FR-14)
**And** worsened indicators are visually prominent (severity-critical token)
**And** panel keyboard navigation works (Tab between indicators, Enter for detail)

### Story 4.4: VulnerabilityPanel — Country Scores & Cascade Trace

As a **user** (Dr. Amara),
I want to view vulnerability index scores for 8 countries with factor breakdowns and cascade trace capability,
So that I can trace GDP exposure in under 2 interactions.

**Acceptance Criteria:**

**Given** DualProgressBar from Epic 2, useGraphTrace from Epic 3, and economic-data.ts from Epic 1B
**When** VulnerabilityPanel renders
**Then** 8 countries display vulnerability index scores (FR-31)
**And** each country shows at least 3 sub-factors (fossil dependency, import dependence, etc.) (FR-32)
**And** dual progress bars compare vulnerability dimensions across countries (FR-33, UX-DR33)
**And** selecting a country triggers useGraphTrace to show how its vulnerability connects to supply chain disruptions
**And** Dr. Amara can trace GDP exposure in <2 interactions (persona AC)
**And** the 4-click cascade trace pattern is validated: See->Click->Trace->Act (UX-DR80)
**And** 3-4 Playwright tests verify cascade interaction, sort performance, and keyboard flow

## Epic 5: Scenario Simulation

**Goal:** User views 4 weighted scenarios, compares side-by-side, adjusts sliders for real-time economic impact projections. The emotional climax. All 5 outputs recalculate <100ms, 60fps during drag.
**FRs covered:** FR-20, 21, 22, 23, 34, 35, 36, 37, 38
**Dependencies:** Epic 1C (shell), Epic 1B (simulationStore, interfaces), Epic 2 (ChartContainer).

### Story 5.1: ProbabilityBar & computeEconomicOutputs

As a **developer**,
I want a probability distribution bar component and a pure economic computation function,
So that scenarios display weighted probabilities and the simulator calculates outputs instantly.

**Acceptance Criteria:**

**Given** simulationStore from Epic 1B and ScenarioParameter/SimulationResult interfaces (frozen)
**When** ProbabilityBar and computeEconomicOutputs are created
**Then** ProbabilityBar renders 4 scenario segments showing relative weight of each (FR-22)
**And** probabilities sum to 100% (15% + 45% + 30% + 10%) (FR-20)
**And** ProbabilityBar handles edge cases: 0% segment renders minimal sliver, 100% segment fills full width, labels don't overflow at narrow widths
**And** ProbabilityBar animation respects prefers-reduced-motion (no animation in reduced/minimal tiers)
**And** computeEconomicOutputs takes SimulationInput (oilPrice, duration, severity) and returns SimulationResult (GDP impact, added inflation, trade slowdown, food price rise, estimated job impact)
**And** computation formula documented: linear interpolation between scenario presets weighted by input parameters
**And** computation completes within 100ms for any input combination (FR-37)
**And** the function is pure — zero side effects, deterministic output
**And** unit tests verify output ranges for edge cases (min/max slider values, default values)

### Story 5.2: ScenarioPanel — Weighted Scenarios & Comparison

As a **user** (Carlos),
I want to view 4 crisis scenarios with probability weightings and compare them side-by-side,
So that I can understand the range of possible outcomes for my analysis.

**Acceptance Criteria:**

**Given** ProbabilityBar from Story 5.1 and data from Epic 1B
**When** ScenarioPanel renders
**Then** 4 scenario cards display with probability weightings (FR-20)
**And** selecting a card shows: projected oil price, GDP impact, inflation addition, trade impact, and recovery timeline (FR-21)
**And** the probability distribution bar shows relative weight of each scenario (FR-22)
**And** 2+ scenario details are viewable simultaneously on a single screen without navigating away (FR-23)
**And** scenario cards show source attribution and editorial estimate labels where applicable

### Story 5.3: SimulatorSlider — Three Interactive Inputs

As a **user**,
I want to adjust oil price, crisis duration, and severity via sliders with visible current values,
So that I can explore "what if" scenarios interactively.

**Acceptance Criteria:**

**Given** the SimulatorSlider component
**When** the three sliders render in the simulator panel
**Then** oil price slider adjusts between $70 and $160 displaying current value (FR-34)
**And** duration slider adjusts between 1 and 18 months displaying current value (FR-35)
**And** severity slider adjusts between 10% and 100% displaying current value (FR-36)
**And** each slider has boundary glow effect at range limits (UX-DR43)
**And** slider thumbs are 48x48px minimum for mobile touch targets (UX-DR69)
**And** sliders are keyboard-navigable with visible focus ring
**And** slider changes update simulationStore within 16ms (60fps)
**And** aria-valuenow, aria-valuemin, aria-valuemax attributes are set on each slider

### Story 5.4: SimulatorPanel — Output Computation Logic

As a **developer**,
I want the simulator's output computation connected to the simulationStore with verified formulas and performance,
So that the computation layer is independently testable before UI integration.

**Acceptance Criteria:**

**Given** SimulatorSliders from Story 5.3 and computeEconomicOutputs from Story 5.1
**When** the computation logic is wired to simulationStore
**Then** all 5 outputs (GDP impact, added inflation, trade slowdown, food price rise, estimated job impact) recalculate within 100ms of any slider change (FR-37)
**And** reset action restores all 3 sliders to defaults ($100, 6 months, 50%) within 100ms (FR-38)
**And** computation is debounced for chart rendering (150ms) but instant for numeric display
**And** no frame drops during slider drag — 60fps maintained (NFR2)
**And** unit tests verify output accuracy for known input/output pairs

### Story 5.5: SimulatorPanel — UI Rendering & Interaction

As a **user** (Dr. Amara),
I want to see 5 computed outputs update instantly as I adjust sliders and reset everything with one click,
So that I can rapidly explore economic impact scenarios.

**Acceptance Criteria:**

**Given** the computation logic from Story 5.4
**When** SimulatorPanel UI renders and connects all pieces
**Then** each output shows source attribution and "Estimated" label
**And** SimulatorOutput shows instant numeric values + delayed chart update (150ms debounce for chart)
**And** reset button is clearly visible and keyboard-accessible
**And** the panel maintains Briefing Room atmosphere — outputs feel analytical, not gamified
**And** 5-6 Playwright tests verify: slider interaction, output accuracy, reset, 60fps during drag, keyboard control, mobile touch

## Epic 6: Crisis Timeline & Price History

**Goal:** User explores Brent/WTI price trajectories with event markers, chronological crisis timeline with expandable events and severity ratings.
**FRs covered:** FR-24, 25, 26, 27, 39, 40, 41
**Dependencies:** Epic 1C (shell), Epic 1B (price + timeline data), Epic 2 (ChartContainer, ThemedLineChart).

### Story 6.1: PriceChartPanel — Dual Trajectory & Event Markers

As a **user** (Carlos),
I want to view 7-month Brent and WTI price trajectories with event markers and interactive tooltips,
So that I can verify price movements against crisis milestones for my article.

**Acceptance Criteria:**

**Given** ChartContainer + ThemedLineChart from Epic 2 and geopolitical-data.ts from Epic 1B
**When** PriceChartPanel renders
**Then** a 7-month Brent crude price trajectory displays with labeled axes (FR-24)
**And** a 7-month WTI price trajectory displays on the same chart or comparable axis range (FR-25)
**And** hovering/focusing a data point shows tooltip with exact date, Brent price, WTI price, and associated event (FR-26)
**And** event markers display on the chart corresponding to crisis milestones with identifying labels (FR-27)
**And** chart data points have aria-label attributes for screen readers
**And** panel has source attribution and "Data as of" timestamp

### Story 6.2: TimelinePanel — Chronological Events with Severity

As a **user** (Dr. Amara),
I want to view 12 crisis events chronologically with severity ratings and expandable descriptions,
So that I can orient myself on the crisis progression.

**Acceptance Criteria:**

**Given** geopolitical-data.ts from Epic 1B
**When** TimelinePanel renders
**Then** 12 crisis events display in chronological order with date stamps (FR-39)
**And** clicking/pressing Enter on a timeline event expands it to reveal extended description not visible in collapsed state (FR-40)
**And** each event shows a severity rating with at least 3 severity levels (FR-41)
**And** severity is shown via both color and icon/label (not color alone) (UX-DR93)
**And** keyboard navigation works: Tab between events, Enter/Space to expand, Escape to collapse
**And** panel uses HeroSection (timeline) + ContextSection (crisis progression context)
**And** 2-3 Playwright tests verify: expand/collapse, severity display, chronological order, keyboard flow

## Epic 7: Policy & Energy Context

**Goal:** User views 11 filterable policy responses, 6 historical crisis comparisons, 7 energy transition indicators. Reference panels providing context.
**FRs covered:** FR-42, 43, 44, 45, 46, 47, 48, 57
**Dependencies:** Epic 1C (shell), Epic 1B (policy + history + transition data), Epic 2 (shared components).

### Story 7.1: PolicyPanel — Filterable Policy Responses

As a **user** (Carlos),
I want to view and filter 11 government policy responses by type with color-coded badges,
So that I can quickly find relevant policy actions for my article sourcing.

**Acceptance Criteria:**

**Given** shared components from Epic 2 and geopolitical-data.ts from Epic 1B
**When** PolicyPanel renders
**Then** 11 policy responses display with source country/institution and at least 1-sentence description (FR-42)
**And** filter controls allow filtering by response type (sanctions, strategic reserves, demand reduction, etc.) reducing visible entries to matching entries only (FR-43)
**And** each policy entry has a color-coded type badge with text category name (FR-44)
**And** when a filter produces zero results, "No data matches current filters" displays with filter controls remaining interactive (FR-57)
**And** filter state persists via useSyncUrlState (URL reflects active filter)
**And** filter controls are keyboard-accessible with visible focus ring

### Story 7.2: HistoryPanel — Crisis Comparison

As a **user** (Dr. Amara),
I want to view 6 major energy crises since 1973 and compare them side-by-side on shared metrics,
So that I can contextualize the current crisis against historical precedents.

**Acceptance Criteria:**

**Given** shared components from Epic 2 and geopolitical-data.ts from Epic 1B
**When** HistoryPanel renders
**Then** 6 major energy crises display with year, event name, and at least 2 comparable metrics (FR-45)
**And** crises are comparable across shared metrics (price change %, GDP impact) in a side-by-side layout with metrics aligned horizontally (FR-46)
**And** the current crisis is visually highlighted among historical crises
**And** historical data provides reference material for Memory Echo (Epic 8 dependency)
**And** each historical entry shows source attribution

### Story 7.3: TransitionPanel — Energy Indicators & Direction

As a **user**,
I want to view 7 energy transition indicators with directional status showing acceleration or regression,
So that I can assess whether the crisis is accelerating or delaying the energy transition.

**Acceptance Criteria:**

**Given** shared components from Epic 2 and geopolitical-data.ts from Epic 1B
**When** TransitionPanel renders
**Then** 7 energy transition indicators display with name and current value (FR-47)
**And** each indicator shows directional status — acceleration or regression relative to baseline (FR-48)
**And** direction is conveyed by both color and icon/arrow (not color alone)
**And** StatusIndicator from Epic 4 renders on each row
**And** 2-3 Playwright tests verify: filter interaction, comparison layout, directional display, keyboard navigation

## Epic 8: Advanced UX, Narrative & Accessibility

**Goal:** Full narrative design (10 components), full WCAG AA validation, mobile responsive, print stylesheet. Cross-cutting enforcement of data integrity across all panels.
**FRs covered:** FR-53, 54, 58, 62, 63 (cross-cutting enforcement)
**Hard prerequisite:** All Epics 2-7 complete before any Epic 8 story begins.
**Dependencies:** All panel epics 2-7.

### Story 8.1: Cross-cutting Data Enforcement & Live Region Management

As a **user**,
I want every panel to consistently show source attribution, timestamps, stale indicators, and estimated labels,
So that I can trust the data provenance across the entire application.

**Acceptance Criteria:**

**Given** all panels from Epics 2-7
**When** cross-cutting enforcement is applied
**Then** source attribution is visible on every panel (FR-53)
**And** "Data as of [date]" timestamp displays on every panel (FR-54)
**And** stale data amber indicator triggers when data exceeds freshness thresholds (FR-58)
**And** editorial estimates display "Estimated" label on every panel where applicable (FR-62)
**And** all data formatting rules are enforced (FR-64-75)
**And** live region management system is implemented: pause/resume for screen readers, rate limiting, summary mode (UX-DR62)
**And** jest-axe reports zero new violations on all touched panels
**And** every panel passes DoD checklist

### Story 8.2: IncidentBanner & The Silence

As a **user** (Dr. Amara),
I want a dismissible crisis alert banner and occasional breathing-room silence moments,
So that I'm alerted to critical developments without being overwhelmed.

**Acceptance Criteria:**

**Given** the AppShell from Epic 1C
**When** IncidentBanner and The Silence are implemented
**Then** IncidentBanner displays with role=alert for immediate screen reader announcement (UX-DR125)
**And** maximum one IncidentBanner is visible at any time
**And** banner has 600ms entrance animation, is dismissible via button or Escape key
**And** The Silence inserts a 48px spacer with subtle visual treatment, maximum once per session (UX-DR128)
**And** both components respect prefers-reduced-motion — reduced or no animation
**And** IncidentBanner uses aria-live=assertive for immediate announcement
**And** The Silence uses aria-live=polite for non-intrusive awareness
**And** both are <200 LOC combined
**And** user-facing AC: Given Amara opens the app during an active crisis, When the IncidentBanner renders, Then within 2 seconds she can identify severity, geography, and timeline without scrolling

### Story 8.3a: SynthesisMoment

As a **user**,
I want occasional insight moments that surface connections between panels,
So that I discover meaningful patterns I might have missed.

**Acceptance Criteria:**

**Given** panels from Epics 2-7
**When** SynthesisMoment is implemented
**Then** it triggers max once per session with cyan border visual (UX-DR126)
**And** it uses aria-live=polite for announcement
**And** trigger condition: user has visited 3+ panels within a session AND meaningful correlation detected in data
**And** the moment feels like a colleague's observation, not a system alert
**And** dismissible with single action without losing current context
**And** respects prefers-reduced-motion

### Story 8.3b: Fog of War

As a **user** (Dr. Amara),
I want to see confidence indicators on uncertain data that communicate honest uncertainty rather than broken UI,
So that I trust the system's transparency about what it doesn't know.

**Acceptance Criteria:**

**Given** panels from Epics 2-7
**When** Fog of War is implemented
**Then** 4 confidence levels display with visual fog overlay (UX-DR84)
**And** fog never hides data — always shows the number with a confidence indicator
**And** fog uses data.confidence field or DATA_AS_OF age to determine level
**And** visual treatment communicates "we're not sure about this" not "this is broken"
**And** keyboard-accessible — fog state is announced via screen reader
**And** respects prefers-reduced-motion

### Story 8.4a: ExtractionTarget

As a **user** (Carlos),
I want to extract data citations with source attribution traveling into my clipboard,
So that I can cite verified data in my article with full provenance.

**Acceptance Criteria:**

**Given** panels with source attribution from Story 8.1
**When** ExtractionTarget is implemented
**Then** 3 copy options are available: plain text, formatted citation, JSON with source data traveling into clipboard (UX-DR85)
**And** mobile bottom sheet on viewports <640px (UX-DR85)
**And** clipboard operations provide confirmation feedback
**And** source attribution (institution, date, methodology) travels with every extraction
**And** keyboard-accessible via Enter on source badge

### Story 8.4b: Thread Pattern

As a **user** (Carlos),
I want to trace data lineage through panels showing Source -> Methodology -> Panels using this data,
So that I can verify the provenance chain for my article sourcing.

**Acceptance Criteria:**

**Given** panels with source attribution from Story 8.1
**When** Thread Pattern is implemented
**Then** inline drawer shows Source -> Methodology -> Panels using this data (UX-DR86)
**And** drawer opens via keyboard (Enter on source badge) and closes via Escape
**And** editorial estimates labeled "Estimated" in the thread
**And** drawer does not cause layout shift on any panel

### Story 8.5a: Decision Capture

As a **user** (both personas),
I want to annotate my insights and capture decision moments with full context,
So that I can reconstruct my reasoning weeks later.

**Acceptance Criteria:**

**Given** the simulation and scenario panels from Epic 5
**When** Decision Capture is implemented
**Then** belief annotation is stored via localStorage (zero cookies, zero telemetry — NFR24)
**And** insight diff on return visit shows what changed since last session
**And** capture feels instantaneous — flow isn't interrupted
**And** captured moment includes enough context (timestamp, panel, data state) to reconstruct reasoning
**And** localStorage usage is minimal — single key, JSON stringified, <1KB

### Story 8.5b: SuggestionBar

As a **user**,
I want contextual suggestions that learn from my dismissals,
So that I get helpful guidance without annoying interruptions.

**Acceptance Criteria:**

**Given** all panels from Epics 2-7
**When** SuggestionBar is implemented
**Then** it is marked "first-to-cut if timeline slips" — 3-dismiss learning pattern (UX-DR88)
**And** after 3 dismissals of same suggestion type, it stops appearing
**And** suggestions are contextual to the current panel and user behavior
**And** dismissible via keyboard and click
**And** <200 LOC

### Story 8.5c: VerdictCard

As a **user**,
I want a comparative summary across scenarios that is exportable,
So that I can capture my analytical conclusions.

**Acceptance Criteria:**

**Given** scenario data from Epic 5
**When** VerdictCard is implemented
**Then** it renders a comparative summary across scenarios (UX-DR89)
**And** the summary is exportable (copy to clipboard with source attribution)
**And** it shows key differences between scenarios in a concise format
**And** keyboard-accessible and screen reader friendly
**And** <200 LOC

### Story 8.6a: Tension Map

As a **user** (Dr. Amara),
I want to see competing interpretations of the crisis data,
So that I can understand the range of analytical perspectives.

**Acceptance Criteria:**

**Given** all panels from Epics 2-7
**When** Tension Map is implemented
**Then** competing interpretations render via data.interpretation field where available (UX-DR128)
**And** within 3 seconds Amara can identify top 2 regions requiring attention
**And** the visual language of "tension" is intuitive without needing a legend
**And** interpretations show source attribution for each perspective

### Story 8.6b: Motion System, Focus Audit, Print & Visual Regression

As a **user** with accessibility needs,
I want consistent motion control, clear focus indicators, and print output,
So that the application is fully accessible and usable in all contexts.

**Acceptance Criteria:**

**Given** all narrative components from Stories 8.2-8.6a and all panels from Epics 2-7
**When** the remaining accessibility work is completed
**Then** 3-tier motion system is enforced across all components: Full (default), Reduced (prefers-reduced-motion), Minimal (prefers-reduced-motion + data-motion="minimal") (UX-DR70-71)
**And** no animation loop runs faster than 1Hz (UX-DR71)
**And** focus ring audit confirms 2px cyan outline at 3:1 contrast against all backgrounds on all interactive elements (UX-DR68)
**And** print stylesheet hides navigation, prints all panels sequentially with visible data (UX-DR113)
**And** Playwright screenshot diff baseline is established for visual regression (UX-DR105)
**And** A11y audit passes on 5 high-priority components: MasterStatus, IncidentBanner, Simulator, ExtractionTarget, TabBar
**And** remaining 9 panels pass axe-core + keyboard spot check

## Epic 9: Production Deployment & Quality Gates

**Goal:** App deployed worldwide on Vercel, loads <1.5s, 60fps, all browsers, zero console errors. Quality gates enforced at every PR level.
**Dependencies:** All epics complete.

### Story 9.1: Lighthouse CI Gate & Performance Budget

As a **developer**,
I want Lighthouse CI to block merges that regress performance below thresholds,
So that production performance is continuously enforced.

**Acceptance Criteria:**

**Given** the CI pipeline from Epic 1A
**When** Lighthouse CI is configured as a quality gate
**Then** Lighthouse Performance score >= 90 on simulated 4G (NFR1)
**And** Lighthouse Accessibility score >= 90
**And** First Meaningful Paint <1.5 seconds (NFR1)
**And** bundle size <500KB gzipped (UX-DR114)
**And** LCP targets per breakpoint: desktop <1.2s, tablet <1.5s, mobile <2.0s
**And** failing Lighthouse budget blocks merge to main
**And** budget assertions are in the CI config (not manual)

### Story 9.2: Playwright Smoke Tests — Navigation & Rendering

As a **developer**,
I want Playwright smoke tests covering navigation, rendering, and basic interactions across all 14 panels,
So that core user flows are validated on every PR.

**Acceptance Criteria:**

**Given** all panels from Epics 2-7
**When** the Playwright smoke test suite is executed
**Then** tests cover: tab navigation across all 14 panels, URL state sync (back/forward/deep links), skeleton loading states, error boundary behavior, responsive viewport rendering (375px, 768px, 1440px)
**And** each panel renders without console errors
**And** smoke tests run in <2 minutes
**And** tests pass on Chrome, Firefox, and Safari (cross-browser matrix)
**And** unhappy-path tests cover: malformed data panel, missing data panel, zero-filter result panel

### Story 9.3: Playwright Interaction Tests — Simulator, Node Selection & Cross-cutting

As a **developer**,
I want Playwright interaction tests covering the highest-risk features: simulator, supply chain graph, and cross-panel behaviors,
So that complex interactions don't regress silently.

**Acceptance Criteria:**

**Given** all panels and narrative components from Epics 2-8
**When** the Playwright interaction test suite is executed
**Then** test allocation by risk: Epic 3 (supply chain) = 8-10 tests, Epic 5 (simulator) = 5-6 tests, Epic 2 (overview) = 6-7 tests, Epic 4 (GDP) = 3-4 tests, Epics 6-7 = 2-3 each, cross-cutting (URL, keyboard, a11y, inter-panel) = 5-6 tests
**And** each test is surgical — asserts one specific behavior
**And** total Playwright budget: ~35 tests (27 core + 8-10 regression)
**And** full suite runtime is <3 minutes
**And** tests cover: keyboard navigation, panel transitions, data rendering, error states, mobile viewports, simulator slider drag, node cascade trace, URL deep linking

### Story 9.4: Vercel Deploy & Cross-browser & Offline Validation

As a **user**,
I want the app deployed on Vercel and fully functional across all browsers and offline,
So that I can access it anywhere, anytime.

**Acceptance Criteria:**

**Given** all quality gates passing from Stories 9.1-9.3
**When** the app is deployed to Vercel
**Then** auto-deploy triggers on merge to main, completes in <5 minutes
**And** zero console errors across Chrome 90+, Firefox 90+, Safari 15+, Edge 90+ (NFR12, NFR57)
**And** 100% offline capability — fully functional with no network after initial load (NFR11)
**And** all 14 panels functional on 375px viewport with no horizontal scroll (NFR9)
**And** single-file deployment — entire app is one index.html artifact (NFR32)
**And** visual regression baseline screenshots are captured for future PR comparison
**And** the deployed URL is accessible and loads <1.5s on 4G

## Revised Build Order

```
1A (scaffold+CI) → 1B (data+motion+test) → 1C (shell) → 2 (overview + smoke test) → 3 (graph, can parallel with 2 after 1B) → 4 (GDP) → 5 (simulator) → 6 (timeline) → 7 (policy) → 8 (narrative + a11y, requires all 2-7 complete) → 9 (deploy)
```
