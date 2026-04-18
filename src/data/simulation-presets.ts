import type { ScenarioParameter } from '@/types';

export const SCENARIOS: ScenarioParameter[] = [
  {
    id: 'baseline-recovery',
    name: 'Baseline Recovery',
    probability: 15,
    oilPrice6mo: 82.00,
    gdpImpact: -0.5,
    inflationAddition: 0.8,
    tradeImpact: -2.0,
    recoveryTimeline: '3-6 months',
  },
  {
    id: 'prolonged-disruption',
    name: 'Prolonged Disruption',
    probability: 45,
    oilPrice6mo: 105.00,
    gdpImpact: -1.8,
    inflationAddition: 2.4,
    tradeImpact: -8.0,
    recoveryTimeline: '12-18 months',
  },
  {
    id: 'severe-escalation',
    name: 'Severe Escalation',
    probability: 30,
    oilPrice6mo: 135.00,
    gdpImpact: -3.2,
    inflationAddition: 4.1,
    tradeImpact: -15.0,
    recoveryTimeline: '24-36 months',
  },
  {
    id: 'black-swan',
    name: 'Black Swan',
    probability: 10,
    oilPrice6mo: 175.00,
    gdpImpact: -5.5,
    inflationAddition: 6.8,
    tradeImpact: -25.0,
    recoveryTimeline: '36-60 months',
  },
];

if (import.meta.env.DEV) {
  const sum = SCENARIOS.reduce((acc, s) => acc + s.probability, 0);
  if (Math.abs(sum - 100) > 0.01) {
    throw new Error(`Scenario probabilities sum to ${sum}, expected 100 (±0.01)`);
  }
}
