import type {
  GDPForecast,
  RegionCode,
  StagflationIndicator,
  VulnerabilityScore,
  FocusCountry,
} from '@/types';

export const DATA_AS_OF = '2026-04-11';

export const GDP_FORECASTS: GDPForecast[] = [
  { region: 'US' as RegionCode, preCrisisGdp: 2.4, postCrisisGdp: 1.1, delta: -1.3, inflation2026: 5.2, source: 'OECD' },
  { region: 'CN' as RegionCode, preCrisisGdp: 4.8, postCrisisGdp: 3.5, delta: -1.3, inflation2026: 3.1, source: 'OECD' },
  { region: 'IN' as RegionCode, preCrisisGdp: 6.5, postCrisisGdp: 5.0, delta: -1.5, inflation2026: 6.8, source: 'OECD' },
  { region: 'JP' as RegionCode, preCrisisGdp: 1.2, postCrisisGdp: -0.3, delta: -1.5, inflation2026: 4.1, source: 'OECD' },
  { region: 'DE' as RegionCode, preCrisisGdp: 1.5, postCrisisGdp: -0.5, delta: -2.0, inflation2026: 5.8, source: 'ECB' },
  { region: 'GB' as RegionCode, preCrisisGdp: 1.8, postCrisisGdp: 0.4, delta: -1.4, inflation2026: 5.5, source: 'OECD' },
  { region: 'SA' as RegionCode, preCrisisGdp: 3.2, postCrisisGdp: -1.8, delta: -5.0, inflation2026: 7.2, source: 'UNCTAD' },
  { region: 'IR' as RegionCode, preCrisisGdp: 2.1, postCrisisGdp: -3.9, delta: -6.0, inflation2026: 8.0, source: 'UNCTAD' },
];

export const STAGFLATION_INDICATORS: StagflationIndicator[] = [
  { name: 'Global CPI', currentValue: 5.8, preCrisisBaseline: 3.2, unit: '%', isDanger: true },
  { name: 'Industrial Production', currentValue: -1.2, preCrisisBaseline: 2.1, unit: '% YoY', isDanger: true },
  { name: 'Unemployment Rate (OECD)', currentValue: 6.4, preCrisisBaseline: 5.1, unit: '%', isDanger: true },
  { name: 'Energy Price Index', currentValue: 178.3, preCrisisBaseline: 85.6, unit: 'index', isDanger: true },
  { name: 'Food Price Index', currentValue: 142.7, preCrisisBaseline: 118.4, unit: 'index', isDanger: true },
  { name: 'Trade Volume Growth', currentValue: -2.8, preCrisisBaseline: 3.5, unit: '% YoY', isDanger: true },
  { name: 'Consumer Confidence (OECD)', currentValue: 92.1, preCrisisBaseline: 101.5, unit: 'index', isDanger: true },
  { name: 'Bond Yield Spread (10Y-2Y)', currentValue: -0.35, preCrisisBaseline: 0.42, unit: '%', isDanger: true },
];

export const VULNERABILITY_SCORES: VulnerabilityScore[] = [
  { country: 'US' as FocusCountry, overallScore: 42, fossilDependency: 55, importDependence: 20, fiscalResilience: 78 },
  { country: 'CN' as FocusCountry, overallScore: 58, fossilDependency: 72, importDependence: 65, fiscalResilience: 62 },
  { country: 'IN' as FocusCountry, overallScore: 72, fossilDependency: 80, importDependence: 85, fiscalResilience: 38 },
  { country: 'JP' as FocusCountry, overallScore: 78, fossilDependency: 85, importDependence: 95, fiscalResilience: 55 },
  { country: 'DE' as FocusCountry, overallScore: 65, fossilDependency: 68, importDependence: 72, fiscalResilience: 60 },
  { country: 'GB' as FocusCountry, overallScore: 48, fossilDependency: 50, importDependence: 45, fiscalResilience: 72 },
  { country: 'SA' as FocusCountry, overallScore: 85, fossilDependency: 92, importDependence: 15, fiscalResilience: 35 },
  { country: 'IR' as FocusCountry, overallScore: 88, fossilDependency: 95, importDependence: 10, fiscalResilience: 22 },
];
