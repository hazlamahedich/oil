import type { ReactNode } from 'react';

/**
 * Severity level for timeline events and general crisis severity.
 *
 * @consumers Epic 2 (OverviewPanel, TimelinePanel), Epic 6 (TimelinePanel), Epic 4 (VulnerabilityPanel)
 * @fr FR-041, NFR-16
 */
export type SeverityLevel = 'critical' | 'warning' | 'elevated' | 'normal';

/**
 * KPI status discriminator — tracks improvement/stability, NOT severity.
 * Distinct from SeverityLevel: KPIs use 'stable' | 'improving' while
 * SeverityLevel uses 'elevated' | 'normal' for different semantics.
 *
 * @consumers Epic 2 (OverviewPanel), Epic 4 (GDPPanel, StagflationPanel)
 * @fr FR-001, UX-DR118
 * @see KPIData, TrendDirection
 */
export type KPIStatus = 'critical' | 'warning' | 'stable' | 'improving';

/**
 * Trend direction for KPI and metric display.
 *
 * @consumers Epic 2 (OverviewPanel), Epic 4 (GDPPanel)
 * @fr FR-001
 * @see KPIData
 */
export type TrendDirection = 'up' | 'down' | 'stable';

/**
 * Panel lifecycle status. Canonical discriminator for panel state.
 *
 * @consumers Epic 1C (Shell, TabBar), all panel epics (2–8)
 * @fr FR-055, FR-056, FR-057
 * @see PanelState, EmptyStateProps
 */
export type PanelStatus = 'loading' | 'error' | 'populated' | 'empty';

/**
 * User-facing reason for an empty panel state. Derives shared values from
 * PanelStatus to maintain a structural relationship — if PanelStatus changes,
 * the overlapping values propagate at compile time.
 *
 * @consumers All panel epics (2–8), Epic 1C (skeleton placeholders)
 * @fr FR-057, UX-DR123
 * @see PanelStatus, EmptyStateProps
 */
export type EmptyStateReason =
  | Extract<PanelStatus, 'loading' | 'error'>
  | 'no-data'
  | 'filtered-out';

/**
 * Tab group labels matching UX spec navigation structure.
 *
 * @consumers Epic 1C (TabBar, Shell), Epic 8 (SynthesisMoment)
 * @fr FR-049, UX-DR15
 */
export type PanelTabGroup = 'happening' | 'why' | 'what-if' | 'reference';

/**
 * Authoritative data sources referenced across panels.
 *
 * @consumers Epic 1B (data files), all panel epics (2–8)
 * @fr FR-072
 */
export type DataSource = 'IEA' | 'EIA' | 'OECD' | 'ECB' | 'UNCTAD' | 'Secondary';

/**
 * Focus countries for vulnerability scoring and GDP analysis.
 *
 * @consumers Epic 4 (VulnerabilityPanel, GDPPanel), Epic 7 (PolicyPanel)
 * @fr FR-070
 * @see RegionCode
 */
export type FocusCountry = 'US' | 'CN' | 'IN' | 'JP' | 'DE' | 'GB' | 'SA' | 'IR';

/**
 * Region codes extending FocusCountry with aggregate regions for GDP forecasts.
 *
 * @consumers Epic 4 (GDPPanel), Epic 2 (OverviewPanel)
 * @fr FR-071
 * @see FocusCountry, GDPForecast
 */
export type RegionCode = FocusCountry | 'EU' | 'Eurozone' | 'G20' | 'OECD';

/**
 * Policy response filter categories.
 *
 * @consumers Epic 7 (PolicyPanel)
 * @fr FR-043, FR-044
 */
export type PolicyResponseType =
  | 'sanctions'
  | 'strategic-reserves'
  | 'demand-reduction'
  | 'supply-diversification'
  | 'diplomatic'
  | 'market-intervention';

/**
 * Base type for data records that carry source attribution.
 * Extended by interfaces requiring source/estimate metadata.
 *
 * @consumers Epic 1B.4 (data files), all data-consuming panels
 * @fr FR-053, FR-062, FR-074
 * @see OilHistoryRecord, CommodityDisruption
 */
export interface SourcedRecord {
  source?: string;
  isEstimated?: boolean;
}

/**
 * Historical oil price record with optional event annotation.
 *
 * @consumers Epic 2 (OverviewPanel), Epic 6 (PriceChartPanel)
 * @fr FR-024, FR-025, FR-026, FR-027
 * @see SourcedRecord, PriceRecord
 */
export interface OilHistoryRecord extends SourcedRecord {
  date: string;
  brent: number;
  wti: number;
  volume?: number;
  event?: string;
}

/**
 * GDP forecast with pre/post crisis comparison per region.
 *
 * @consumers Epic 4 (GDPPanel), Epic 5 (SimulatorPanel)
 * @fr FR-008, FR-009
 * @see RegionCode
 */
export interface GDPForecast {
  region: RegionCode;
  preCrisisGdp: number;
  postCrisisGdp: number;
  /** postCrisisGdp - preCrisisGdp. Negative = contraction, positive = growth. */
  delta: number;
  inflation2026: number;
  source?: string;
}

/**
 * Minimal graph node for cascade disruption visualization.
 * SupplyChainNode extends this with full data.
 *
 * @consumers Epic 3 (NodeGraph), Epic 2 (DisruptionPanel)
 * @fr FR-015, FR-016
 * @see SupplyChainNode
 */
export interface CascadeNode {
  id: string;
  label: string;
  disruptionLevel: number;
  category: string;
}

/**
 * Full supply chain node with SVG position and connection arrays.
 * Extends CascadeNode with spatial and relational data.
 *
 * @consumers Epic 3 (NodeGraph, node selection), Epic 2 (DisruptionPanel)
 * @fr FR-017, FR-018, FR-019
 * @see CascadeNode, SupplyChainEdge
 */
export interface SupplyChainNode extends CascadeNode {
  position: { x: number; y: number };
  description: string;
  upstream: string[];
  downstream: string[];
}

/**
 * Directed edge in the supply chain graph.
 *
 * @consumers Epic 3 (NodeGraph)
 * @fr FR-019
 * @see SupplyChainNode
 */
export interface SupplyChainEdge {
  source: string;
  target: string;
  direction: 'upstream' | 'downstream';
}

/**
 * Pre-defined scenario with economic impact projections.
 *
 * @consumers Epic 5 (ScenarioPanel)
 * @fr FR-020, FR-021, FR-022, FR-023
 */
export interface ScenarioParameter {
  id: string;
  name: string;
  probability: number;
  oilPrice6mo: number;
  gdpImpact: number;
  inflationAddition: number;
  tradeImpact: number;
  recoveryTimeline: string;
}

/**
 * Simulator input parameters with documented ranges.
 * oilPrice: $70–$160, duration: 1–18 months, severity: 10–100%.
 *
 * @consumers Epic 5 (SimulatorPanel, SimulatorSlider)
 * @fr FR-034, FR-035, FR-036
 * @see SimulationOutput, SimulationResult
 */
export interface SimulationInput {
  oilPrice: number;
  duration: number;
  severity: number;
}

/**
 * Computed economic outputs from simulation. Five derived fields.
 * Distinct from SimulationResult (which combines input + output for store shape).
 *
 * @consumers Epic 5 (SimulatorPanel), Epic 4 (StagflationPanel)
 * @fr FR-037
 * @see SimulationInput, SimulationResult
 */
export interface SimulationOutput {
  gdpImpact: number;
  inflationAddition: number;
  tradeSlowdown: number;
  foodPriceRise: number;
  estimatedJobImpact: number;
}

/**
 * Combined store shape: SimulationInput merged with computed outputs.
 * This is the shape stored in simulationStore.
 *
 * @consumers Epic 5 (simulationStore), Epic 1B.5 (stores)
 * @fr FR-034–FR-037
 * @see SimulationInput, SimulationOutput
 */
export type SimulationResult = SimulationInput & { outputs: SimulationOutput };

/**
 * KPI display data with trend and status metadata.
 *
 * @consumers Epic 2 (OverviewPanel), Epic 4 (GDPPanel, StagflationPanel)
 * @fr FR-001
 * @see KPIStatus, TrendDirection
 */
export interface KPIData {
  value: number;
  previousValue?: number;
  unit?: string;
  trend?: TrendDirection;
  status?: KPIStatus;
}

/**
 * Generic panel state wrapper. Tracks loading/error/populated lifecycle.
 *
 * @consumers All panel epics (2–8), Epic 1C (Shell, error boundaries)
 * @fr FR-055, FR-056, FR-057, UX-DR119
 * @see PanelStatus
 */
export interface PanelState<T> {
  status: PanelStatus;
  data: T | null;
  error: Error | null;
}

/**
 * Panel configuration with source attribution and optional extraction/fog settings.
 * Excludes heroContent/contextContent (ReactNode props belong in component API, not static config).
 *
 * @consumers Epic 1C (Shell, TabBar), Epic 8 (extraction targets, fog of war)
 * @fr FR-049, FR-055, UX-DR120
 * @see PanelTabGroup
 */
export interface PanelConfig {
  id: string;
  title: string;
  tab: PanelTabGroup;
  sourceBadge: { origin: string; date: string; confidence: number };
  extractionTargets?: string[];
  fogLevel?: 'clear' | 'light' | 'moderate' | 'heavy';
}

/**
 * Empty/error state display props.
 *
 * `reason` uses `EmptyStateReason` which derives 'loading' and 'error' from
 * `PanelStatus` to prevent drift, while adding user-facing-only reasons
 * ('no-data', 'filtered-out') that have no system-status equivalent.
 *
 * @consumers All panel epics (2–8), Epic 1C (skeleton placeholders)
 * @fr FR-057, UX-DR123
 * @see PanelStatus, EmptyStateReason
 */
export interface EmptyStateProps {
  reason: EmptyStateReason;
  message: string;
  action?: { label: string; url: string };
  icon?: ReactNode;
}

/**
 * Ceasefire agreement status. Known ceasefire states for the Strait of Hormuz.
 *
 * @consumers Epic 2 (HormuzPanel)
 * @fr FR-006
 */
export type CeasefireStatusType =
  | 'active'
  | 'broken'
  | 'expired'
  | 'pending'
  | 'none';

/**
 * Ceasefire monitoring status for Strait of Hormuz.
 *
 * @consumers Epic 2 (HormuzPanel)
 * @fr FR-006
 * @see CeasefireStatusType
 */
export interface CeasefireStatus {
  status: CeasefireStatusType;
  tankerCount: number;
  tollCharges: string;
  mineClearance: string;
  recoveryEstimate: string;
  lastUpdated: string;
}

/**
 * Shipping traffic data for a specific time period.
 *
 * @consumers Epic 2 (HormuzPanel)
 * @fr FR-005, FR-007
 */
export interface ShippingTrafficPeriod {
  period: string;
  dailyVessels: number;
  label: string;
}

/**
 * Commodity disruption record with source attribution.
 *
 * @consumers Epic 2 (DisruptionPanel), Epic 3 (NodeGraph)
 * @fr FR-028, FR-029, FR-030
 * @see SourcedRecord
 */
export interface CommodityDisruption extends SourcedRecord {
  name: string;
  disruptionLevel: number;
  unit: string;
}

/**
 * Country vulnerability score with component breakdown.
 *
 * @consumers Epic 4 (VulnerabilityPanel)
 * @fr FR-031, FR-032, FR-033
 * @see FocusCountry
 */
export interface VulnerabilityScore {
  country: FocusCountry;
  overallScore: number;
  fossilDependency: number;
  importDependence: number;
  fiscalResilience: number;
}

/**
 * Stagflation risk indicator with pre-crisis baseline comparison.
 *
 * @consumers Epic 4 (StagflationPanel)
 * @fr FR-012, FR-013, FR-014
 */
export interface StagflationIndicator {
  name: string;
  currentValue: number;
  preCrisisBaseline: number;
  unit: string;
  isDanger: boolean;
}

/**
 * Policy response record with type categorization.
 *
 * @consumers Epic 7 (PolicyPanel)
 * @fr FR-042, FR-043, FR-044
 * @see PolicyResponseType
 */
export interface PolicyResponse {
  id: string;
  country: string;
  description: string;
  type: PolicyResponseType;
  date: string;
}

/**
 * Historical crisis comparison record.
 *
 * @consumers Epic 7 (HistoryPanel)
 * @fr FR-045, FR-046
 */
export interface HistoricalCrisis {
  year: number;
  name: string;
  priceChangePercent: number;
  gdpImpact: number;
  description: string;
}

/**
 * Energy transition indicator with directional assessment.
 *
 * @consumers Epic 7 (TransitionPanel)
 * @fr FR-047, FR-048
 */
export interface EnergyTransitionIndicator {
  name: string;
  currentValue: number;
  unit: string;
  direction: 'acceleration' | 'regression';
}

/**
 * Crisis timeline event with severity classification.
 *
 * @consumers Epic 6 (TimelinePanel), Epic 2 (OverviewPanel)
 * @fr FR-039, FR-040, FR-041
 * @see SeverityLevel
 */
export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  severity: SeverityLevel;
}

/**
 * Price data point for chart rendering.
 *
 * @consumers Epic 6 (PriceChartPanel), Epic 2 (OverviewPanel)
 * @fr FR-024, FR-025, FR-026, FR-027
 * @see OilHistoryRecord
 */
export interface PriceRecord {
  date: string;
  brent: number;
  wti: number;
  event?: string;
}

/**
 * Result of selecting a data point on a chart.
 *
 * @consumers Epic 2 (OverviewPanel), Epic 6 (PriceChartPanel)
 * @fr FR-026, UX-DR121
 * @see DataPointSelectCallback
 */
export interface DataPointSelectResult {
  value: number;
  label: string;
  source: string;
  timestamp: string;
}

/**
 * Callback type for data point selection on charts.
 *
 * @consumers Epic 2 (OverviewPanel), Epic 6 (PriceChartPanel)
 * @fr FR-026, UX-DR121
 * @see DataPointSelectResult
 */
export type DataPointSelectCallback = (
  dataKey: string,
  index: number,
) => DataPointSelectResult;

/**
 * Preset scenario with slider values for the simulator.
 *
 * @consumers Epic 5 (SimulatorPanel, ScenarioPanel)
 * @fr FR-020, UX-DR122
 * @see SimulationInput
 */
export interface PresetScenario {
  id: string;
  label: string;
  sliderValues: SimulationInput;
}

/**
 * Data freshness threshold configuration.
 * Thresholds: Oil prices >60 days, GDP >120 days, shipping >30 days,
 * scenarios >14 days, policy >30 days.
 *
 * @consumers Epic 1B.3 (useDataFreshness hook), all panel epics (2–8)
 * @fr FR-016, NFR-16
 */
export interface DataFreshnessThreshold {
  label: string;
  maxAgeDays: number;
  dataTypes: string[];
}

/**
 * Two-tier motion preference for animation control.
 * A third tier 'minimal' will be added by Story 8-6b when
 * data-motion attribute infrastructure exists.
 *
 * @consumers Epics 2–7 (all panels with animations)
 * @fr NFR-15, UX-DR70-71
 * @see MOTION_CONFIGS in src/hooks/useMotionPreference.ts
 */
export type MotionTier = 'full' | 'reduced';
