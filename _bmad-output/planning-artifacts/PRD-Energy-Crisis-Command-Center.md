---
workflowType: 'prd'
workflow: 'edit'
classification:
  domain: 'energy-economics'
  projectType: 'web_app'
  complexity: 'medium'
inputDocuments:
  - 'PRD-Energy-Crisis-Command-Center.docx (original v1.0)'
  - 'prd-validation-report.md'
stepsCompleted: ['step-e-01-discovery', 'step-e-02-review', 'step-e-03-edit']
lastEdited: '2026-04-12'
editHistory:
  - date: '2026-04-12'
    changes: 'Full BMAD conversion from non-standard PRD v1.0. Added Success Criteria, User Journeys, Product Scope, Functional Requirements, Domain Requirements, Error States, Accessibility. Enhanced NFRs with measurement methodology. Fixed information density. Separated WHAT from HOW.'
---

# Product Requirements Document

## Global Energy Crisis Command Center

**Version:** 1.1 (BMAD Standard) | **Date:** April 12, 2026
**Classification:** Internal | **Status:** Draft

---

## Executive Summary

The Global Energy Crisis Command Center is an interactive web application providing economic analysis and visualization of the 2026 energy crisis triggered by the Iran war and Strait of Hormuz closure.

Per the IEA, this crisis has shut in 9.1 million barrels/day of oil production, blocked 20% of global oil and LNG flows, damaged 40+ major energy infrastructure assets, and pushed Brent crude above $100/barrel. Economic impacts cascade beyond energy: fertilizer trade (33% disrupted), helium supply (40% from the Gulf), petrochemicals, shipping routes, aviation, food prices, and industrial output are all affected. The UN projects global trade growth halving from 4.7% to 1.5-2.5%.

No single existing tool provides an integrated, interactive view of the full economic picture. This application fills that gap.

**Product Name:** Global Energy Crisis Command Center
**Version:** 1.0 (MVP)
**Platform:** Web Application (SPA)
**Target Users:** Policy analysts, journalists, economists, students, investors, general public
**Primary Personas:** Policy Analyst, Journalist
**Data Sources:** IEA, EIA (US), OECD, ECB, UNCTAD, World Bank, FRED

### Key Value Propositions

1. 14 analytical panels covering supply, demand, macro, and scenario dimensions
2. Adjustable-parameter economic simulation (oil price, duration, severity)
3. Supply chain cascade visualization revealing second and third-order effects
4. Probability-weighted scenario modeling with 4 geopolitical outcomes
5. Stagflation risk dashboard tracking 8 macro indicators
6. Zero backend dependencies — works offline, no API keys required

### Problem Statement

Existing tools for tracking this crisis are fragmented across dozens of sources (IEA trackers, EIA outlooks, ECB projections, shipping monitors). Analysts, journalists, and policymakers must manually synthesize data from multiple platforms to understand cascading impacts. This application consolidates that analysis into a single interactive view — from oil price dynamics to country-level vulnerability to supply chain cascades to scenario modeling.

## Success Criteria

| ID | Criterion | Measurement | Target |
|----|-----------|-------------|--------|
| SC-01 | Users can identify their country's GDP exposure within 30 seconds of landing | Timed task completion (moderated) | >80% of test users succeed in <30s |
| SC-02 | Users can produce a scenario comparison showing oil price, GDP impact, and recovery timeline | Task completion with correct output | 100% of users who select 2+ scenarios can read all 3 metrics |
| SC-03 | Users can trace a supply chain cascade from any node to its 3rd-order effects within 4 interactions | Click count tracking | >90% complete in ≤4 node selections |
| SC-04 | Users can simulate a custom economic scenario and read 5 computed outputs | Task completion with slider adjustment | 100% of users who move ≥1 slider see all 5 outputs update |
| SC-05 | Application loads and renders all 14 panels with zero console errors | Automated E2E test | 100% pass rate across Chrome, Firefox, Safari |
| SC-06 | Data displayed matches official sources within 2% deviation | Weekly source validation audit | <2% deviation for all numeric data points |

## Product Scope

### MVP (Phase 1 — In Scope)

- 14 interactive analytical panels
- Static embedded data (as of April 11, 2026)
- Single-page web application, zero backend
- Dark theme command center aesthetic
- Desktop and mobile responsive
- Offline capable

### Out of Scope (Deferred to Phase 2/3)

- Live API data integration (EIA, MarineTraffic, FRED)
- Server-side data caching and refresh
- Push notifications for threshold breaches
- User accounts or saved configurations
- Monte Carlo simulation engine
- ML-based price forecasting
- Natural language briefing generation
- Collaborative annotation system
- PDF/PNG export
- Internationalization (English only for MVP)

### Constraints

- Zero paid dependencies or API keys
- Bundle size target: <35KB uncompressed
- No build step required for artifact rendering
- All data sourced from free, publicly available sources

## User Journeys

### Persona 1: Policy Analyst (Dr. Amara — IMF Energy Division)

**Primary needs:** Rapid synthesis of macro data, scenario comparison, export-ready insights for briefings.

**Journey 1: Crisis Briefing Preparation**
1. Lands on Overview Dashboard at 6:47 AM
2. Scans 6 KPI cards for headline numbers (Brent price, production shut-in, trade impact)
3. Switches to GDP/CPI Heatmap to check country-level revisions
4. Toggles sort between GDP hit and inflation severity
5. Opens Scenario War Room, compares Baseline vs Prolonged Blockade
6. Notes oil price projection and recovery timeline for each scenario
7. Switches to Stagflation Dashboard to verify 8 macro indicator positions
8. **Outcome:** Has complete 5-minute briefing-ready picture of crisis status

**Journey 2: What-If Analysis**
1. Opens Economic Impact Simulator
2. Adjusts oil price slider to $130/barrel
3. Sets duration to 12 months, severity to 80%
4. Reads 5 computed outputs: GDP impact, inflation addition, trade slowdown, food price rise, job impact
5. Switches to Supply Chain Cascade to verify which nodes exceed 70% disruption at this severity
6. **Outcome:** Can communicate second-order risks under worsening conditions

### Persona 2: Journalist (Carlos — Reuters Energy Correspondent)

**Primary needs:** Citable data, visual evidence for articles, rapid answers to specific questions, shareable outputs.

**Journey 3: Article Research**
1. Lands on Overview Dashboard seeking current Brent/WTI spread
2. Hovers over Oil Price Chart to read exact monthly values and associated events
3. Switches to Hormuz Monitor to verify shipping traffic decline numbers
4. Opens Crisis Timeline to confirm sequence of events and dates for accuracy
5. Switches to Policy Tracker, filters by "Sanctions" type to find government responses
6. Opens Country Vulnerability, taps Japan to check import dependency ratio
7. **Outcome:** Has verified 4-5 data points for an article with source attribution

**Journey 4: Comparative Analysis**
1. Opens Historical Comparison panel
2. Compares 1973 embargo, 1990 Gulf War, and 2026 crisis side-by-side
3. Notes price change percentages and GDP impacts for context paragraph
4. Opens Supply Disruption gauges to compare commodity flow disruptions
5. Switches to Energy Transition to check green energy acceleration/regression indicators
6. **Outcome:** Has historical framing for a long-form analysis piece

## Domain Requirements

### Energy Units & Conventions

| Domain | Unit | Display Format | Conversion Reference |
|--------|------|----------------|---------------------|
| Oil production | Million barrels/day (Mb/d) | 1 decimal (e.g., "9.1 Mb/d") | 1 Mb/d = 365 million barrels/year |
| Oil price | USD/barrel | 2 decimals (e.g., "$103.42") | Brent (international), WTI (US) |
| Natural gas | USD/MMBtu or TTF EUR/MWh | Per source convention | 1 MMBtu ≈ 1.055 GJ |
| Inflation | Percentage year-over-year | 1 decimal (e.g., "3.2%") | HICP for EU, CPI for US |
| GDP growth | Percentage year-over-year | 1 decimal with +/- sign (e.g., "-0.8%") | Real terms, inflation-adjusted |
| Trade | USD billions or percentage | Per context | UNCTAD conventions |

### Geographic Granularity

- **Primary:** Country-level (8 focus countries: US, China, India, Japan, Germany, UK, Saudi Arabia, Iran)
- **Secondary:** Regional aggregates (EU, Eurozone, G20, OECD)
- **Not supported:** Sub-national or city-level data

### Time Series Standards

- Oil prices: Monthly data points
- GDP: Quarterly projections (OECD/ECB alignment)
- Inflation: Quarterly forecasts
- Shipping: Daily → aggregated to periods
- Policy responses: Event-driven (date-stamped)
- All dates in ISO 8601 format (YYYY-MM-DD)

### Data Source Hierarchy

When sources conflict, apply this priority:
1. IEA official publications
2. EIA Short-Term Energy Outlook
3. OECD Economic Outlook
4. ECB Staff Projections
5. UNCTAD / World Bank
6. Secondary sources (IEEFA, S&P Global)

All displayed data must show source attribution. Where data is an editorial estimate (e.g., scenario probabilities), display "Estimated" label.

### Data Freshness & Currency

| Data Category | Target Freshness | Stale Threshold | Stale Indicator |
|---------------|-----------------|-----------------|-----------------|
| Oil prices | Monthly | >60 days | Timestamp + amber icon |
| GDP forecasts | Quarterly | >120 days | Timestamp + amber icon |
| Shipping traffic | Event-driven | >30 days | Timestamp + amber icon |
| Scenario probabilities | Weekly | >14 days | "Estimated" label + timestamp |
| Policy responses | Event-driven | >30 days | Timestamp + date of last update |

All panels must display "Data as of [date]" with timestamp. Stale data (>threshold) triggers amber visual indicator.

### Geopolitical Neutrality

- All data presented with source attribution
- Scenario probabilities labeled as editorial estimates
- No value judgments in data labels or descriptions
- Neutral language in all panel narratives
- Risk of bias documented in Risk Analysis

## Functional Requirements

### Panel 1 — Overview Dashboard

**FR-001:** User can view 6 KPI cards displaying current values for key crisis indicators.
AC: Six cards visible simultaneously, each showing a distinct metric label and numeric value.

**FR-002:** User can view an oil price trend chart with at least one data series and axis labels.
AC: Chart renders with labeled axes displaying monthly price data.

**FR-003:** User can read a written briefing summarizing the current crisis state.
AC: Briefing panel displays ≥3 data-backed statements, each with source attribution in parentheses.

**FR-004:** User can see the last-updated timestamp for all dashboard data.
AC: Timestamp displayed in ISO 8601 date format (YYYY-MM-DD) within the Overview panel header area.

### Panel 2 — Hormuz Monitor

**FR-005:** User can view shipping traffic volume through the Strait of Hormuz across 9 time periods.
AC: Visualization displays traffic data for at least 9 distinct periods with labeled values.

**FR-006:** User can view current ceasefire status including tanker count, toll charges, mine clearance, and recovery estimates.
AC: Status panel displays 5 distinct ceasefire-related data fields with timestamps.

**FR-007:** User can compare shipping traffic levels across time periods using labeled bars.
AC: Each of 9 periods displays a bar with numeric label (vessels/day) enabling direct visual comparison.

### Panel 3 — GDP/CPI Heatmap

**FR-008:** User can view GDP revision data for 8 regions in a sortable data grid with dual-bar visualization.
AC: 8 distinct regions shown, each with GDP revision value and color-coded severity.

**FR-009:** User can view 2026 inflation forecast data for 8 regions.
AC: 8 regions shown with inflation forecast value.

**FR-010:** User can sort the display by GDP impact magnitude.
AC: Selecting GDP sort reorders all 8 regions from highest to lowest GDP hit within 200ms.

**FR-011:** User can sort the display by inflation severity.
AC: Selecting inflation sort reorders all 8 regions from highest to lowest inflation within 200ms.

### Panel 4 — Stagflation Dashboard

**FR-012:** User can view 8 macroeconomic indicators related to stagflation risk.
AC: 8 indicators displayed, each with name, current value, and pre-crisis baseline.

**FR-013:** User can see a risk classification (danger/safe) for each of 8 indicators.
AC: Each of 8 indicators displays an icon or badge with "Danger" or "Safe" text label plus a distinct color per state.

**FR-014:** User can identify which indicators have worsened relative to pre-crisis baselines.
AC: Each indicator shows current vs pre-crisis value comparison.

### Panel 5 — Supply Chain Cascade

**FR-015:** User can view a node graph containing 19 supply chain dependency nodes.
AC: 19 distinct nodes rendered, each labeled with a supply chain component name.

**FR-016:** User can select any single node to view its disruption level (0-100%).
AC: Selecting a node displays a disruption level percentage for that node.

**FR-017:** User can view upstream causes for a selected node.
AC: Selecting a node displays a list of upstream causes contributing to its disruption.

**FR-018:** User can view downstream effects for a selected node.
AC: Selecting a node displays a list of downstream effects resulting from its disruption.

**FR-019:** User can see connections between related nodes in the graph.
AC: Edges drawn between nodes with dependency relationships; each edge connects exactly 2 nodes.

### Panel 6 — Scenario War Room

**FR-020:** User can view 4 scenarios with probability weightings summing to 100%.
AC: Four scenario cards displayed with names and probabilities (15% + 45% + 30% + 10%).

**FR-021:** User can select a scenario card to view projected oil price (6-month average), GDP impact, inflation addition, trade impact, and recovery timeline.
AC: Selecting a scenario reveals all 5 projected metrics.

**FR-022:** User can view a probability distribution bar across all 4 scenarios.
AC: Visual bar shows relative weight of each scenario.

**FR-023:** User can compare scenario projections without navigating away from the panel.
AC: 2+ scenario details viewable simultaneously on a single screen.

### Panel 7 — Oil Price Chart

**FR-024:** User can view a 7-month Brent crude price trajectory.
AC: Chart displays Brent price data across 7 months with labeled axes.

**FR-025:** User can view a 7-month WTI price trajectory on the same chart.
AC: WTI data displayed on the same or comparable axis range.

**FR-026:** User can interact with a data point to view its exact date, Brent price, WTI price, and associated event.
AC: Tooltip displays date, both prices, and event name (if applicable).

**FR-027:** User can see event markers on the chart corresponding to crisis milestones.
AC: At least one event marker plotted with a label identifying the event.

### Panel 8 — Supply Disruption

**FR-028:** User can view 7 gauges representing disrupted commodity flows.
AC: 7 gauges displayed, each labeled with a distinct commodity name.

**FR-029:** User can read the disruption percentage for each commodity gauge.
AC: Each of 7 gauges displays a numeric value (0-100%) indicating percentage of flow disruption.

**FR-030:** User can distinguish between severity levels across gauges via color coding.
AC: Gauges use ≥3 distinct colors corresponding to severity ranges (e.g., 0-33%, 34-66%, 67-100%).

### Panel 9 — Country Vulnerability

**FR-031:** User can view a vulnerability index score for each of 8 countries.
AC: 8 countries listed, each displaying a numeric vulnerability score.

**FR-032:** User can view a detailed breakdown of factors (fossil dependency, import dependence, etc.) contributing to a country's score.
AC: Selecting a country displays at least 3 sub-factors composing its overall score.

**FR-033:** User can compare vulnerability dimensions across countries using dual progress bars.
AC: Each country entry displays 2 progress bars representing distinct vulnerability dimensions.

### Panel 10 — Economic Simulator

**FR-034:** User can adjust oil price input between $70 and $160 using a slider.
AC: Slider moves within $70-$160 range and displays current selected value.

**FR-035:** User can adjust crisis duration input between 1 and 18 months using a slider.
AC: Slider moves within 1-18 month range and displays current value.

**FR-036:** User can adjust severity input between 10% and 100% using a slider.
AC: Slider moves within 10%-100% range and displays current value.

**FR-037:** User can view 5 computed outputs (GDP impact, added inflation, trade slowdown, food price rise, estimated job impact) that update when any slider changes.
AC: All 5 outputs recalculate within 100ms of any slider position change.

**FR-038:** User can reset all simulator inputs to default values.
AC: A reset action restores all 3 sliders to default positions ($100, 6 months, 50%) within 100ms.

### Panel 11 — Crisis Timeline

**FR-039:** User can view 12 crisis events in chronological order with dates.
AC: 12 events displayed in sequence with date stamps.

**FR-040:** User can expand a timeline event to view extended description.
AC: Selecting an event reveals descriptive text not visible in collapsed state.

**FR-041:** User can see a severity rating for each timeline event.
AC: Each event displays a severity level indicator (at least 3 severity levels).

### Panel 12 — Policy Tracker

**FR-042:** User can view a feed of 11 government policy responses with source country/institution.
AC: 11 policy entries displayed, each with ≥1 sentence description and source country or institution name.

**FR-043:** User can filter policy entries by response type (e.g., sanctions, strategic reserves, demand reduction).
AC: Applying a type filter reduces visible entries to matching entries only.

**FR-044:** User can identify the type of each policy response via a color-coded type badge.
AC: Each of 11 entries displays a labeled badge with text category name (e.g., "Sanctions", "Strategic Reserves").

### Panel 13 — Historical Comparison

**FR-045:** User can view data for 6 major energy crises since 1973 with year and event name.
AC: 6 historical crisis entries displayed, each with year, event name, and ≥2 comparable metrics.

**FR-046:** User can compare crises across shared metrics (price change %, GDP impact) in a side-by-side layout.
AC: Metrics for 2+ crises aligned horizontally for direct comparison.

### Panel 14 — Energy Transition

**FR-047:** User can view 7 indicators tracking energy transition progress.
AC: 7 indicators displayed, each with name and current value.

**FR-048:** User can determine whether each indicator shows acceleration or regression relative to baseline.
AC: Each indicator displays a directional status (acceleration/regression).

### Cross-Cutting — Navigation

**FR-049:** User can navigate between all 14 panels via a tab bar.
AC: 14 tabs visible in a horizontal strip; scrolling reveals tabs not currently in view.

**FR-050:** User can identify the currently active panel via a highlighted tab indicator.
AC: The active tab is visually distinct from inactive tabs via background color change meeting 3:1 contrast ratio against inactive tabs.

**FR-051:** User can switch between panels with a visual transition.
AC: Panel transitions complete with a visual effect between 150ms and 500ms.

**FR-052:** User can access all panels without authentication.
AC: All 14 panels load and display data without a login step.

### Cross-Cutting — Data

**FR-053:** User can view the data source for any displayed metric.
AC: Each data point or panel shows source attribution.

**FR-054:** User can see when data was last updated on any panel.
AC: Each panel displays a "Data as of [date]" timestamp.

## Error & State Management

> **Traceability:** This section supports SC-05 (zero console errors across all 14 panels).

### Panel States

Each of the 14 panels must handle the following states:

| State | Trigger | Display |
|-------|---------|---------|
| Loading | Initial page load or panel switch | Skeleton placeholder matching panel layout; max 1.5s display before data renders |
| Error | Data structure missing or malformed | "Data unavailable for this panel" message with panel name; all other panels remain functional |
| Empty | Filter produces zero results (e.g., policy filter with no matches) | "No data matches current filters" message within the panel; filter controls remain interactive |
| Stale | Data timestamp older than 7 days from current date | Amber "Data as of [date]" badge replaces standard badge; no functionality blocked |

### State Flow

1. Application boot → all panels enter Loading state → render skeleton placeholders
2. Data structures parse → panels transition to populated state (sequential, not blocking)
3. If any data structure fails to parse → that single panel enters Error state; remaining panels unaffected
4. User applies filter → if zero results → Empty state within that panel; filter remains active
5. Data timestamp check runs once on load → if >7 days old → Stale badge appears on relevant panels

### Cross-Panel State Independence

- Panel states are independent: Error in one panel must not affect any other panel's rendering or interactivity
- Tab navigation must remain functional regardless of any panel's state
- The tab bar itself has no loading/error state — it renders immediately on application boot

## Non-Functional Requirements

### Performance

| ID | Requirement | Target | Measurement Method |
|----|-------------|--------|-------------------|
| NFR-01 | Initial page load to first meaningful paint | < 1.5 seconds | Lighthouse Performance score ≥ 90; measured on simulated 4G connection |
| NFR-02 | Interaction latency (any click/hover/drag) | < 16ms per frame (60fps) | Chrome DevTools Performance tab; no frame drops during slider drag, tab switch, or node tap |
| NFR-03 | Bundle size (uncompressed) | < 35KB | `wc -c` on production artifact file |

### Compatibility

| ID | Requirement | Target | Measurement Method |
|----|-------------|--------|-------------------|
| NFR-04 | Offline capability | 100% functional with no network | Disconnect network after load → verify all 14 panels render and all interactions work |
| NFR-05 | Browser compatibility | 95%+ global browser share | Test against Chrome 90+, Firefox 90+, Safari 15+, Edge 90+; verify zero console errors |
| NFR-06 | Mobile responsiveness | All 14 panels usable on 375px viewport | Manual test on iPhone 12+ viewport; no horizontal scroll; all interactions work via tap |

### Data

| ID | Requirement | Target | Measurement Method |
|----|-------------|--------|-------------------|
| NFR-07 | Data currency | Data as of April 11, 2026 (stamped) | Each panel displays "Data as of 2026-04-11" timestamp; Stale badge triggers if >7 days from system date |
| NFR-08 | Data accuracy | < 2% deviation from cited official sources | Weekly manual audit: compare 10 random data points per panel against source URLs |

### Security

| ID | Requirement | Target | Measurement Method |
|----|-------------|--------|-------------------|
| NFR-09 | Zero external network calls | No outbound requests in production | Browser DevTools Network tab shows zero XHR/fetch requests after initial page load |
| NFR-10 | No user data collection | Zero cookies, zero localStorage writes, zero telemetry | Automated test: verify `navigator.cookieEnabled`, `localStorage.length`, and network log post-load |

### Error Monitoring

| ID | Requirement | Target | Measurement Method |
|----|-------------|--------|-------------------|
| NFR-11 | Zero unhandled JavaScript errors | 0 errors in browser console | Automated E2E test across all 14 panels with all interactions; verify `window.onerror` count = 0 |
| NFR-12 | Graceful degradation on data parse failure | Affected panel shows error state; all other panels functional | Unit test: corrupt 1 data structure → verify 13/14 panels render correctly |

### Deployment

| ID | Requirement | Target | Measurement Method |
|----|-------------|--------|-------------------|
| NFR-13 | Single-file deployment | Entire application in one artifact file with zero build step | Open file directly in browser → application renders and functions |
| NFR-14 | Data update process | Data swap without code logic changes | Replace embedded data constants → application renders new data with zero logic changes |

### Data Validation

| ID | Requirement | Target | Measurement Method |
|----|-------------|--------|-------------------|
| NFR-15 | Numeric range validation | All numeric values within defined bounds per data structure | Unit test: verify each data point against min/max schema; reject values outside bounds |
| NFR-16 | Required field validation | All required fields present in every data record | Unit test: iterate all data structures → flag any record missing required fields |

## Accessibility Requirements

### WCAG 2.1 AA Compliance

| ID | Requirement | Criterion | Measurement |
|----|-------------|-----------|-------------|
| A11y-01 | Color contrast for all text | 4.5:1 minimum (AA) | Automated audit via axe-core; manual check of all text-on-background combinations |
| A11y-02 | Color contrast for large text and UI components | 3:1 minimum (AA) | Automated audit; includes icons, chart elements, tab indicators |
| A11y-03 | Non-text content has text alternatives | WCAG 1.1.1 | Every SVG chart has `<title>` and `<desc>` elements; every icon has `aria-label` |
| A11y-04 | Keyboard navigation for all 14 panels | WCAG 2.1.1 | Tab key cycles through all interactive elements; Enter/Space activates; Arrow keys navigate within chart/tab groups |
| A11y-05 | Focus indicator visible on all interactive elements | WCAG 2.4.7 | 2px solid outline with 3:1 contrast against adjacent colors on focused elements |
| A11y-06 | Panel tab navigation via keyboard | WCAG 2.1.1 | Left/Right arrow keys move between tabs; Tab key exits tab group to panel content |
| A11y-07 | Data conveyed by color also conveyed by pattern or label | WCAG 1.4.1 | Chart bars include numeric labels; severity levels use both color and icon/text; danger indicators use icon + color |

### SVG Chart Accessibility

- Every SVG chart must include `<title>` element summarizing the chart content
- Every SVG chart must include `<desc>` element describing the data trend or key insight
- Data points within SVG must have `aria-label` attributes (e.g., "Brent crude $104.30, March 2026")
- Interactive SVG elements (hover targets, clickable nodes) must be focusable via keyboard
- SVG animations must respect `prefers-reduced-motion` media query

### Color Contrast Correction

The original design system color `#ff3b30` (accent red) on `#0a0a0f` (background) achieves ~3.4:1 contrast — below WCAG AA 4.5:1 requirement for normal text. The Technical Specification section defines the corrected palette.

## Technical Specification

> **Note:** This section consolidates implementation details extracted from the original PRD. These are HOW decisions, not WHAT requirements. They are preserved here to maintain architectural context and developer guidance.

### Architecture

| Attribute | Specification |
|-----------|--------------|
| Framework | React 18+ functional components with hooks |
| State Management | React `useState`/`useEffect` — no external state library |
| Styling | CSS-in-JS with CSS variables for theming |
| Charts | Custom SVG-based — zero charting library dependencies |
| Animations | CSS `@keyframes` + `transition` properties |
| Build | Single-file SPA — no build step required |
| Bundle Size | ~30KB uncompressed |
| Browser Support | Chrome 90+, Firefox 90+, Safari 15+, Edge 90+ |
| Mobile | Responsive, touch-optimized |

### Design System — Color Tokens

| Token | Value | Usage | Contrast Note |
|-------|-------|-------|---------------|
| Background | `#0a0a0f` | Primary app background | — |
| Panel | `#111118` | Card/panel backgrounds | — |
| Border | `#1e1e2a` | All borders and dividers | — |
| Accent (Red) | `#ff453a` | Primary action, alerts, critical data | Corrected from `#ff3b30` → 4.5:1 on `#0a0a0f` |
| Warning (Orange) | `#ff9500` | Secondary emphasis, medium severity | 4.7:1 on `#0a0a0f` |
| Success (Green) | `#30d158` | Positive indicators, baselines | 7.3:1 on `#0a0a0f` |
| Info (Blue) | `#0a84ff` | Informational, neutral data | 4.6:1 on `#0a0a0f` |
| Cyan | `#64d2ff` | Tertiary accent, LNG data | 8.9:1 on `#0a0a0f` |
| Purple | `#bf5af2` | Special categories | 4.7:1 on `#0a0a0f` |
| Text Primary | `#e5e5ea` | Main body text | 14.1:1 on `#0a0a0f` |
| Text Secondary | `#8e8e93` | Labels, descriptions | 5.3:1 on `#0a0a0f` |
| Text Muted | `#48484a` | Timestamps, footnotes | Use only for decorative, non-informational text (2.2:1) |

### Typography

| Token | Value | Usage |
|-------|-------|-------|
| Font: Display | System UI (`-apple-system, Segoe UI`) | Headings, values |
| Font: Data | Monospace (system monospace) | Numbers, labels, timestamps |

### Navigation Architecture

- Horizontal scrollable tab bar with 14 tabs
- Tab order: Overview → specific analyses (Hormuz, GDP, Stagflation) → deep-dive tools (Cascade, Scenarios, Simulator) → reference data (Timeline, Policy, History, Transition)
- Active tab highlighted with accent color background
- Panel transitions: CSS fade-in animation, 150–500ms duration
- No authentication required for any panel

### Interaction Patterns by Panel

| Panel | Primary Interaction | Secondary Interaction | Feedback |
|-------|--------------------|-----------------------|----------|
| Oil Price Chart | Hover/tap data points | View event markers | Tooltip with month, Brent, WTI, event |
| Hormuz Monitor | Scroll bar chart | Read status panel | Color-coded bars + insight box |
| GDP Heatmap | Toggle sort (GDP/Inflation) | Scan dual bars | Immediate re-sort with animation |
| Stagflation Dashboard | Scan indicators | Read insight box | Danger/safe icons per indicator |
| Cascade Explorer | Tap nodes | Navigate up/downstream | Node detail + children list |
| Scenario War Room | Select scenario card | Read probability bar | Card highlight + detail panel |
| Simulator | Drag 3 sliders | Read 5 output metrics | Real-time calculation updates |
| Country Vulnerability | Tap country buttons | Read breakdown | Score + dual progress bars |
| Policy Tracker | Filter by type | Scan feed | Color-coded type badges |
| Timeline | Tap events | Read descriptions | Expand/collapse + severity dots |

## Data Architecture

### Data Sources & Methodology

| Data Point | Source | Update Frequency | Methodology |
|------------|--------|------------------|-------------|
| Oil prices (Brent/WTI) | EIA Short-Term Energy Outlook | Monthly + daily spot | Official EIA STEO data |
| Production shut-ins | EIA STEO April 2026 | Monthly | EIA assessment methodology |
| GDP forecasts | OECD Interim Report Mar 2026 | Quarterly | OECD macro modeling |
| Euro area inflation | ECB Staff Projections Mar 2026 | Quarterly | HICP-based projections |
| G20 inflation/GDP | OECD Economic Outlook | Semi-annual | Harmonized projections |
| Shipping traffic | S&P Global, Kpler, MarineTraffic | Daily | AIS tracking data |
| Country vulnerability | IEA Atlas + EIA Country Briefs | Ad hoc | 7-factor composite index |
| Policy responses | IEA Policy Response Tracker | Continuous | Country reporting |
| Supply chain impacts | UNCTAD + JODI | Weekly | Expert analysis + trade data |
| Scenario probabilities | Composite editorial model | Weekly | Multi-source synthesis, labeled "Estimated" |

### Data Model

All data is embedded as static constants within the application. Zero backend dependencies. 12 primary data structures:

| Data Structure | Records | Key Fields | Used By |
|---------------|---------|------------|---------|
| OIL_HISTORY | 8 | month, brent, wti, event | Oil Price Chart, Overview |
| DISRUPTION_DATA | 7 | shutInPeak, globalOilPct, etc. | Supply Disruption |
| VULNERABLE_COUNTRIES | 8 | name, score, fossil, importDep | Country Vulnerability |
| POLICY_RESPONSES | 11 | country, action, type | Policy Tracker |
| TIMELINE | 12 | date, label, desc, severity | Crisis Timeline |
| HISTORICAL_CRISES | 6 | year, name, priceChange, gdpHit | Historical Comparison |
| HORMUZ_TRAFFIC | 9 | date, daily, label | Hormuz Monitor |
| GDP_FORECASTS | 8 | region, pre, post, delta, inflation26 | GDP Heatmap |
| SUPPLY_CHAIN_CASCADE | 19 | id, label, impact, children, desc | Cascade Explorer |
| SCENARIOS | 4 | id, name, probability, oil6mo, etc. | Scenario War Room |
| STAGFLATION_INDICATORS | 8 | name, current, preCrisis, danger | Stagflation Dashboard |
| CEASEFIRE_STATUS | 5 | transits, tankersWaiting, toll, etc. | Hormuz Monitor |

## Competitive Landscape

| Competitor | Strengths | Gaps This Product Addresses |
|------------|-----------|---------------------------|
| IEA Policy Tracker | Official source, country-level detail | No economic simulation, no cascade analysis, no scenario modeling |
| HormuzTracker.com | Real-time shipping data | Shipping only; no macro, no GDP, no supply chain analysis |
| Bloomberg Terminal | Comprehensive financial data | $25K/yr subscription; not public; no educational focus |
| EIA STEO Reports | Authoritative US energy data | PDF-only; no interactivity; US-centric |
| OECD Economic Outlook | Rigorous macro modeling | No energy-specific drill-down; no real-time visualization |

**Differentiation:** This product is free, requires zero authentication, works offline, and provides a single integrated view across supply, demand, macro, scenario, and cascade dimensions. No existing tool combines all five.

## Product Roadmap

### Phase 1: MVP (Current)

All 14 panels as a single-file application with embedded static data. Zero backend. Zero API keys. Full interactivity.

### Phase 2: Live Data Integration

1. EIA API for real-time oil price data
2. AIS-based shipping data for Hormuz traffic
3. FRED API integration for macro indicators (CPI, GDP, unemployment)
4. Server-side data caching with 15-minute refresh
5. Push notifications for critical threshold breaches

### Phase 3: Advanced Analytics

1. Monte Carlo simulation engine for scenario probability refinement
2. Oil price forecasting models
3. AI-powered daily briefing summaries
4. Collaborative analyst annotation system
5. Exportable PDF/PNG reports

## Risk Analysis

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Data becomes stale | High | High | Phase 2 live data integration; manual update protocol with data version stamps |
| Crisis resolves rapidly | Low | Medium | App retains historical value; pivot to retrospective analysis mode |
| Source data discrepancies | Medium | Medium | Multi-source validation; transparent source attribution per data point |
| Mobile performance issues | Low | Low | Single-file architecture; minimal re-renders; CSS-only animations |
| User overwhelm (14 panels) | Medium | Medium | Progressive disclosure via tabs; Overview as landing page; grouping in tab order |
| Geopolitical sensitivity | Medium | High | Neutral, data-driven framing; transparent sourcing; no editorial opinion in data displays |

## Glossary

| Term | Definition |
|------|-----------|
| b/d | Barrels per day — standard unit for oil production/consumption rates |
| Brent Crude | International benchmark oil price, based on North Sea production |
| WTI | West Texas Intermediate — US benchmark oil price |
| TTF | Title Transfer Facility — European natural gas benchmark (Dutch) |
| LNG | Liquefied Natural Gas — gas cooled to liquid form for shipping |
| HICP | Harmonised Index of Consumer Prices — EU inflation measure |
| Stagflation | Economic condition of simultaneous low growth and high inflation |
| Strait of Hormuz | 21-mile maritime chokepoint between Iran and Oman; carries ~20% of global oil |
| AIS | Automatic Identification System — ship tracking via radio transponders |
| STEO | Short-Term Energy Outlook (EIA publication) |
| OECD | Organisation for Economic Co-operation and Development |
| ECB | European Central Bank |
| IEA | International Energy Agency |
| UNCTAD | United Nations Conference on Trade and Development |
| JODI | Joint Organisations Data Initiative — monthly oil data reporting |

