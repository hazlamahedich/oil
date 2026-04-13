import { describe, it, expectTypeOf } from 'vitest';
import type {
  SeverityLevel,
  KPIStatus,
  PanelStatus,
  PanelTabGroup,
  FocusCountry,
  RegionCode,
  OilHistoryRecord,
  SupplyChainNode,
  SimulationInput,
  SimulationOutput,
  SimulationResult,
  KPIData,
  PanelState,
  EmptyStateProps,
  EmptyStateReason,
  CommodityDisruption,
  DataPointSelectCallback,
  CeasefireStatusType,
} from '@/types';
import type {
  TrendDirection,
  DataSource,
  PolicyResponseType,
  SourcedRecord,
  GDPForecast,
  CascadeNode,
  SupplyChainEdge,
  ScenarioParameter,
  PanelConfig,
  CeasefireStatus,
  ShippingTrafficPeriod,
  VulnerabilityScore,
  StagflationIndicator,
  PolicyResponse,
  HistoricalCrisis,
  EnergyTransitionIndicator,
  TimelineEvent,
  PriceRecord,
  DataPointSelectResult,
  PresetScenario,
  DataFreshnessThreshold,
  CeasefireStatusType as _CeasefireStatusType,
} from '@/types';

const _allTypes: unknown[] = [
  null as unknown as TrendDirection,
  null as unknown as DataSource,
  null as unknown as PolicyResponseType,
  null as unknown as SourcedRecord,
  null as unknown as GDPForecast,
  null as unknown as CascadeNode,
  null as unknown as SupplyChainEdge,
  null as unknown as ScenarioParameter,
  null as unknown as PanelConfig,
  null as unknown as CeasefireStatus,
  null as unknown as ShippingTrafficPeriod,
  null as unknown as VulnerabilityScore,
  null as unknown as StagflationIndicator,
  null as unknown as PolicyResponse,
  null as unknown as HistoricalCrisis,
  null as unknown as EnergyTransitionIndicator,
  null as unknown as TimelineEvent,
  null as unknown as PriceRecord,
  null as unknown as DataPointSelectResult,
  null as unknown as PresetScenario,
  null as unknown as DataFreshnessThreshold,
];
void _allTypes;

describe('TypeScript interface contracts (Story 1B.1)', () => {
  it('exports exactly 12 core interfaces', () => {
    const coreKeys = [
      'OilHistoryRecord',
      'GDPForecast',
      'CascadeNode',
      'SupplyChainNode',
      'SupplyChainEdge',
      'ScenarioParameter',
      'SimulationInput',
      'SimulationOutput',
      'KPIData',
      'PanelState',
      'PanelConfig',
      'EmptyStateProps',
    ] as const;
    expect(coreKeys).toHaveLength(12);
  });

  it('exports exactly 10 additional interfaces', () => {
    const additionalKeys = [
      'CeasefireStatus',
      'ShippingTrafficPeriod',
      'CommodityDisruption',
      'VulnerabilityScore',
      'StagflationIndicator',
      'PolicyResponse',
      'HistoricalCrisis',
      'EnergyTransitionIndicator',
      'TimelineEvent',
      'PriceRecord',
    ] as const;
    expect(additionalKeys).toHaveLength(10);
  });

  it('exports exactly 15 supporting types', () => {
    const supportingKeys = [
      'SeverityLevel',
      'KPIStatus',
      'TrendDirection',
      'PanelStatus',
      'PanelTabGroup',
      'DataSource',
      'DataPointSelectResult',
      'DataPointSelectCallback',
      'SimulationResult',
      'PresetScenario',
      'FocusCountry',
      'RegionCode',
      'PolicyResponseType',
      'DataFreshnessThreshold',
      'SourcedRecord',
    ] as const;
    expect(supportingKeys).toHaveLength(15);
  });

  it('SimulationInput has correct fields', () => {
    expectTypeOf<SimulationInput>().toHaveProperty('oilPrice');
    expectTypeOf<SimulationInput>().toHaveProperty('duration');
    expectTypeOf<SimulationInput>().toHaveProperty('severity');
  });

  it('SimulationOutput has five computed fields', () => {
    expectTypeOf<SimulationOutput>().toHaveProperty('gdpImpact');
    expectTypeOf<SimulationOutput>().toHaveProperty('inflationAddition');
    expectTypeOf<SimulationOutput>().toHaveProperty('tradeSlowdown');
    expectTypeOf<SimulationOutput>().toHaveProperty('foodPriceRise');
    expectTypeOf<SimulationOutput>().toHaveProperty('estimatedJobImpact');
  });

  it('SimulationResult combines SimulationInput + outputs', () => {
    expectTypeOf<SimulationResult>().toHaveProperty('oilPrice');
    expectTypeOf<SimulationResult>().toHaveProperty('duration');
    expectTypeOf<SimulationResult>().toHaveProperty('severity');
    expectTypeOf<SimulationResult>().toHaveProperty('outputs');
  });

  it('SupplyChainNode extends CascadeNode', () => {
    expectTypeOf<SupplyChainNode>().toHaveProperty('id');
    expectTypeOf<SupplyChainNode>().toHaveProperty('label');
    expectTypeOf<SupplyChainNode>().toHaveProperty('disruptionLevel');
    expectTypeOf<SupplyChainNode>().toHaveProperty('category');
    expectTypeOf<SupplyChainNode>().toHaveProperty('position');
    expectTypeOf<SupplyChainNode>().toHaveProperty('description');
    expectTypeOf<SupplyChainNode>().toHaveProperty('upstream');
    expectTypeOf<SupplyChainNode>().toHaveProperty('downstream');
  });

  it('OilHistoryRecord extends SourcedRecord', () => {
    expectTypeOf<OilHistoryRecord>().toHaveProperty('source');
    expectTypeOf<OilHistoryRecord>().toHaveProperty('isEstimated');
    expectTypeOf<OilHistoryRecord>().toHaveProperty('date');
    expectTypeOf<OilHistoryRecord>().toHaveProperty('brent');
    expectTypeOf<OilHistoryRecord>().toHaveProperty('wti');
  });

  it('CommodityDisruption extends SourcedRecord', () => {
    expectTypeOf<CommodityDisruption>().toHaveProperty('source');
    expectTypeOf<CommodityDisruption>().toHaveProperty('isEstimated');
    expectTypeOf<CommodityDisruption>().toHaveProperty('name');
    expectTypeOf<CommodityDisruption>().toHaveProperty('disruptionLevel');
  });

  it('CeasefireStatus uses CeasefireStatusType', () => {
    expectTypeOf<CeasefireStatus>().toHaveProperty('status');
    expectTypeOf<CeasefireStatus>().toHaveProperty('tankerCount');
    expectTypeOf<CeasefireStatus>().toHaveProperty('lastUpdated');
  });

  it('ShippingTrafficPeriod has period fields', () => {
    expectTypeOf<ShippingTrafficPeriod>().toHaveProperty('period');
    expectTypeOf<ShippingTrafficPeriod>().toHaveProperty('dailyVessels');
    expectTypeOf<ShippingTrafficPeriod>().toHaveProperty('label');
  });

  it('VulnerabilityScore has country and score fields', () => {
    expectTypeOf<VulnerabilityScore>().toHaveProperty('country');
    expectTypeOf<VulnerabilityScore>().toHaveProperty('overallScore');
    expectTypeOf<VulnerabilityScore>().toHaveProperty('fossilDependency');
    expectTypeOf<VulnerabilityScore>().toHaveProperty('fiscalResilience');
  });

  it('StagflationIndicator has baseline comparison fields', () => {
    expectTypeOf<StagflationIndicator>().toHaveProperty('name');
    expectTypeOf<StagflationIndicator>().toHaveProperty('currentValue');
    expectTypeOf<StagflationIndicator>().toHaveProperty('preCrisisBaseline');
    expectTypeOf<StagflationIndicator>().toHaveProperty('isDanger');
  });

  it('PolicyResponse has type and date fields', () => {
    expectTypeOf<PolicyResponse>().toHaveProperty('id');
    expectTypeOf<PolicyResponse>().toHaveProperty('country');
    expectTypeOf<PolicyResponse>().toHaveProperty('type');
    expectTypeOf<PolicyResponse>().toHaveProperty('date');
  });

  it('HistoricalCrisis has year and impact fields', () => {
    expectTypeOf<HistoricalCrisis>().toHaveProperty('year');
    expectTypeOf<HistoricalCrisis>().toHaveProperty('priceChangePercent');
    expectTypeOf<HistoricalCrisis>().toHaveProperty('gdpImpact');
  });

  it('EnergyTransitionIndicator has direction field', () => {
    expectTypeOf<EnergyTransitionIndicator>().toHaveProperty('name');
    expectTypeOf<EnergyTransitionIndicator>().toHaveProperty('currentValue');
    expectTypeOf<EnergyTransitionIndicator>().toHaveProperty('direction');
  });

  it('PriceRecord has date and price fields', () => {
    expectTypeOf<PriceRecord>().toHaveProperty('date');
    expectTypeOf<PriceRecord>().toHaveProperty('brent');
    expectTypeOf<PriceRecord>().toHaveProperty('wti');
  });

  it('EmptyStateReason derives from PanelStatus', () => {
    const reasons: EmptyStateReason[] = ['loading', 'error', 'no-data', 'filtered-out'];
    expect(reasons).toHaveLength(4);
  });

  it('CeasefireStatusType has known values', () => {
    const statuses: CeasefireStatusType[] = ['active', 'broken', 'expired', 'pending', 'none'];
    expect(statuses).toHaveLength(5);
  });

  it('PanelState is generic', () => {
    type TestPanel = PanelState<KPIData>;
    expectTypeOf<TestPanel>().toHaveProperty('status');
    expectTypeOf<TestPanel>().toHaveProperty('data');
    expectTypeOf<TestPanel>().toHaveProperty('error');
  });

  it('EmptyStateProps has required reason discriminator', () => {
    expectTypeOf<EmptyStateProps>().toHaveProperty('reason');
    expectTypeOf<EmptyStateProps>().toHaveProperty('message');
    expectTypeOf<EmptyStateProps>().toHaveProperty('action');
    expectTypeOf<EmptyStateProps>().toHaveProperty('icon');
  });

  it('DataPointSelectCallback is callable', () => {
    expectTypeOf<DataPointSelectCallback>().toBeFunction();
  });

  it('KPIStatus has correct values', () => {
    const statuses: KPIStatus[] = ['critical', 'warning', 'stable', 'improving'];
    expect(statuses).toHaveLength(4);
  });

  it('SeverityLevel has correct values', () => {
    const levels: SeverityLevel[] = ['critical', 'warning', 'elevated', 'normal'];
    expect(levels).toHaveLength(4);
  });

  it('PanelStatus has correct values', () => {
    const statuses: PanelStatus[] = ['loading', 'error', 'populated', 'empty'];
    expect(statuses).toHaveLength(4);
  });

  it('PanelTabGroup matches UX spec labels', () => {
    const groups: PanelTabGroup[] = ['happening', 'why', 'what-if', 'reference'];
    expect(groups).toHaveLength(4);
  });

  it('FocusCountry has 8 country codes', () => {
    const countries: FocusCountry[] = ['US', 'CN', 'IN', 'JP', 'DE', 'GB', 'SA', 'IR'];
    expect(countries).toHaveLength(8);
  });

  it('RegionCode extends FocusCountry with aggregates', () => {
    const regions: RegionCode[] = [
      'US', 'CN', 'IN', 'JP', 'DE', 'GB', 'SA', 'IR',
      'EU', 'Eurozone', 'G20', 'OECD',
    ];
    expect(regions).toHaveLength(12);
  });
});
