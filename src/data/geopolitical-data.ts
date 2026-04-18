import type {
  PolicyResponse,
  PolicyResponseType,
  HistoricalCrisis,
  EnergyTransitionIndicator,
  TimelineEvent,
  SeverityLevel,
} from '@/types';

export const DATA_AS_OF = '2026-04-11';

export const POLICY_RESPONSES: PolicyResponse[] = [
  {
    id: 'pol-usa-001',
    country: 'United States',
    description: 'Strategic Petroleum Reserve release of 60 million barrels coordinated through IEA emergency mechanism.',
    type: 'strategic-reserves' as PolicyResponseType,
    date: '2025-12-16',
  },
  {
    id: 'pol-usa-002',
    country: 'United States',
    description: 'Executive order mandating 10% reduction in federal fleet fuel consumption within 90 days.',
    type: 'demand-reduction' as PolicyResponseType,
    date: '2026-01-08',
  },
  {
    id: 'pol-g7-001',
    country: 'G7 (Collective)',
    description: 'Joint sanctions package targeting Iranian oil export infrastructure and shipping facilitation networks.',
    type: 'sanctions' as PolicyResponseType,
    date: '2025-12-05',
  },
  {
    id: 'pol-opec-001',
    country: 'OPEC+',
    description: 'Emergency production increase of 1.5 Mb/d utilizing Saudi and UAE spare capacity.',
    type: 'supply-diversification' as PolicyResponseType,
    date: '2026-01-16',
  },
  {
    id: 'pol-eu-001',
    country: 'European Union',
    description: 'Accelerated LNG import terminal approvals and temporary relaxation of emissions standards for power generation.',
    type: 'supply-diversification' as PolicyResponseType,
    date: '2026-01-20',
  },
  {
    id: 'pol-cn-001',
    country: 'China',
    description: 'Strategic reserve drawdown of 30 million barrels. Domestic price caps on gasoline and diesel.',
    type: 'market-intervention' as PolicyResponseType,
    date: '2025-12-20',
  },
  {
    id: 'pol-in-001',
    country: 'India',
    description: 'Discounted Russian crude imports doubled. Bi-lateral talks with UAE for emergency LNG supply.',
    type: 'supply-diversification' as PolicyResponseType,
    date: '2026-01-05',
  },
  {
    id: 'pol-un-001',
    country: 'United Nations',
    description: 'UN Security Council emergency session on Hormuz freedom of navigation. Resolution 2847 calling for de-escalation.',
    type: 'diplomatic' as PolicyResponseType,
    date: '2025-12-02',
  },
  {
    id: 'pol-jp-001',
    country: 'Japan',
    description: 'National energy conservation campaign targeting 15% industrial electricity reduction. SPR release of 8 million barrels.',
    type: 'demand-reduction' as PolicyResponseType,
    date: '2026-01-12',
  },
  {
    id: 'pol-gcc-001',
    country: 'GCC (Collective)',
    description: 'East-West pipeline expansion (Saudi Arabia) fast-tracked to 5 Mb/d capacity bypassing Hormuz.',
    type: 'supply-diversification' as PolicyResponseType,
    date: '2026-02-10',
  },
  {
    id: 'pol-iea-001',
    country: 'IEA Member States',
    description: 'Coordinated 120 Mb emergency stock release across 31 member nations. Largest IEA collective action since 2011.',
    type: 'strategic-reserves' as PolicyResponseType,
    date: '2025-12-18',
  },
];

export const HISTORICAL_CRISES: HistoricalCrisis[] = [
  {
    year: 1973,
    name: 'Arab Oil Embargo',
    priceChangePercent: 400.0,
    gdpImpact: -3.0,
    description: 'OAPEC embargo targeting US and allies. Oil prices quadrupled from $3 to $12 per barrel, triggering global recession.',
  },
  {
    year: 1979,
    name: 'Iranian Revolution',
    priceChangePercent: 150.0,
    gdpImpact: -2.5,
    description: 'Iranian oil production collapsed from 6 to 1.5 Mb/d. Global panic buying doubled prices.',
  },
  {
    year: 1990,
    name: 'Gulf War',
    priceChangePercent: 93.0,
    gdpImpact: -1.0,
    description: 'Iraq invaded Kuwait, removing 4.3 Mb/d from global supply. Prices doubled before US-led coalition restored flows.',
  },
  {
    year: 2008,
    name: 'Price Spike (Pre-Financial Crisis)',
    priceChangePercent: 110.0,
    gdpImpact: -0.5,
    description: 'Brent hit $147/bbl on demand growth and speculation. Financial crisis then collapsed prices to $30.',
  },
  {
    year: 2014,
    name: 'Shale Oil Price Collapse',
    priceChangePercent: -60.0,
    gdpImpact: 0.5,
    description: 'OPEC maintained production despite US shale boom. Prices crashed from $115 to $45, benefiting consumers.',
  },
  {
    year: 2020,
    name: 'COVID-19 Demand Collapse',
    priceChangePercent: -75.0,
    gdpImpact: -3.5,
    description: 'Global lockdowns destroyed 20 Mb/d of demand. WTI briefly traded negative at -$37/bbl.',
  },
];

export const ENERGY_TRANSITION_INDICATORS: EnergyTransitionIndicator[] = [
  { name: 'Global Renewable Capacity Additions', currentValue: 420.0, unit: 'GW/year', direction: 'acceleration' },
  { name: 'EV Market Share (Global)', currentValue: 22.0, unit: '% of new sales', direction: 'acceleration' },
  { name: 'Green Hydrogen Production', currentValue: 1.8, unit: 'Mt/year', direction: 'acceleration' },
  { name: 'Fossil Fuel Subsidies', currentValue: 1.2, unit: '$ trillion/year', direction: 'regression' },
  { name: 'Energy Efficiency Investment', currentValue: 580.0, unit: '$ billion/year', direction: 'acceleration' },
  { name: 'Carbon Capture Deployment', currentValue: 45.0, unit: 'Mt CO₂/year', direction: 'acceleration' },
  { name: 'Oil Demand Peaking Signal', currentValue: 106.5, unit: 'Mb/d plateau', direction: 'regression' },
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    date: '2025-10-21',
    title: 'OPEC+ Signals Production Discipline',
    description: 'OPEC+ ministers signal tighter compliance with existing production cuts, hinting at supply constraints.',
    severity: 'elevated' as SeverityLevel,
  },
  {
    date: '2025-11-05',
    title: 'Iranian Naval Exercises Near Hormuz',
    description: 'Iran launches large-scale naval exercises in the Strait of Hormuz, disrupting commercial shipping lanes.',
    severity: 'warning' as SeverityLevel,
  },
  {
    date: '2025-11-13',
    title: 'Hormuz Tanker Incident',
    description: 'Oil tanker damaged in suspected mine strike near Hormuz. Insurance rates spike 200%. Multiple carriers reroute.',
    severity: 'critical' as SeverityLevel,
  },
  {
    date: '2025-11-19',
    title: 'US Deploys Carrier Group to Persian Gulf',
    description: 'USS Eisenhower carrier strike group deployed to Gulf region. Escalation fears drive prices above $116/bbl.',
    severity: 'critical' as SeverityLevel,
  },
  {
    date: '2025-11-26',
    title: 'Partial Hormuz Closure Announced',
    description: 'Iranian authorities announce restricted transit through Hormuz for "security reasons." 65% throughput reduction.',
    severity: 'critical' as SeverityLevel,
  },
  {
    date: '2025-12-02',
    title: 'IEA Warns of 6 Mb/d Supply Gap',
    description: 'IEA issues emergency alert: global supply shortfall of 6 Mb/d projected without immediate intervention.',
    severity: 'critical' as SeverityLevel,
  },
  {
    date: '2025-12-10',
    title: 'Brent Reaches All-Time High ($177.90)',
    description: 'Panic buying drives Brent to $177.90/bbl. Largest single-month price increase in history.',
    severity: 'critical' as SeverityLevel,
  },
  {
    date: '2025-12-16',
    title: 'SPR Release Announced',
    description: 'US announces 60 Mb strategic reserve release. IEA coordinates 120 Mb collective drawdown.',
    severity: 'warning' as SeverityLevel,
  },
  {
    date: '2026-01-06',
    title: 'Ceasefire Negotiations Begin',
    description: 'UN-mediated talks between Iran and Gulf states begin in Oman. Prices begin steady decline.',
    severity: 'elevated' as SeverityLevel,
  },
  {
    date: '2026-01-16',
    title: 'OPEC+ Emergency Production Ramp',
    description: 'OPEC+ agrees to emergency 1.5 Mb/d production increase. Saudi Arabia leads with 1.0 Mb/d additional output.',
    severity: 'warning' as SeverityLevel,
  },
  {
    date: '2026-02-04',
    title: 'Hormuz Ceasefire Signed',
    description: 'Ceasefire agreement signed in Muscat. Hormuz transit restrictions lifted. Prices drop below $105/bbl.',
    severity: 'elevated' as SeverityLevel,
  },
  {
    date: '2026-04-09',
    title: 'Ceasefire Broken — Skirmish Near Hormuz',
    description: 'Naval skirmish between Iranian and coalition vessels near Hormuz. Ceasefire collapses. Prices surge 4%.',
    severity: 'critical' as SeverityLevel,
  },
];

if (import.meta.env.DEV) {
  const { runSortValidation } = await import('./__validation');
  runSortValidation({ dates: TIMELINE_EVENTS.map((e) => e.date), label: 'TIMELINE_EVENTS' });
}
