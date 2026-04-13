import type {
  DataFreshnessThreshold,
  DataSource,
  FocusCountry,
  SeverityLevel,
  SimulationInput,
} from '@/types';

export const APP_VERSION = '0.0.0' as const;
export const DATA_AS_OF = '2026-04-13' as const;

export const FOCUS_COUNTRIES = Object.freeze(
  ['US', 'CN', 'IN', 'JP', 'DE', 'GB', 'SA', 'IR'] as const,
) as readonly FocusCountry[];

export const SOURCE_HIERARCHY = Object.freeze(
  ['IEA', 'EIA', 'OECD', 'ECB', 'UNCTAD', 'Secondary'] as const,
) as readonly DataSource[];

export const FRESHNESS_THRESHOLDS: DataFreshnessThreshold[] = Object.freeze([
  { label: 'Oil Prices', maxAgeDays: 60, dataTypes: ['oil-price', 'brent', 'wti'] },
  { label: 'GDP', maxAgeDays: 120, dataTypes: ['gdp', 'gdp-forecast'] },
  { label: 'Shipping', maxAgeDays: 30, dataTypes: ['shipping', 'tanker'] },
  { label: 'Scenarios', maxAgeDays: 14, dataTypes: ['scenario', 'simulation'] },
  { label: 'Policy', maxAgeDays: 30, dataTypes: ['policy', 'sanctions'] },
]);

export const SEVERITY_LEVELS = Object.freeze(
  ['critical', 'warning', 'elevated', 'normal'] as const,
) as readonly SeverityLevel[];

export const SIMULATION_DEFAULTS = Object.freeze({
  oilPrice: 100,
  duration: 6,
  severity: 50,
} satisfies SimulationInput);

export const SIMULATION_RANGES: {
  readonly [K in keyof SimulationInput]: { readonly min: number; readonly max: number };
} = Object.freeze({
  oilPrice: { min: 70, max: 160 },
  duration: { min: 1, max: 18 },
  severity: { min: 10, max: 100 },
} as const);

export const STALE_THRESHOLD_DAYS = 7 as const;
