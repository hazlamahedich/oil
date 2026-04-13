import { describe, expect, it } from 'vitest';
import {
  DATA_AS_OF,
  FOCUS_COUNTRIES,
  FRESHNESS_THRESHOLDS,
  SEVERITY_LEVELS,
  SIMULATION_DEFAULTS,
  SIMULATION_RANGES,
  SOURCE_HIERARCHY,
  STALE_THRESHOLD_DAYS,
} from '@/utils/constants';

describe('FOCUS_COUNTRIES', () => {
  it('has exact values in order', () => {
    expect(FOCUS_COUNTRIES).toEqual([
      'US',
      'CN',
      'IN',
      'JP',
      'DE',
      'GB',
      'SA',
      'IR',
    ]);
  });

  it('is frozen', () => {
    expect(Object.isFrozen(FOCUS_COUNTRIES)).toBe(true);
  });
});

describe('SOURCE_HIERARCHY', () => {
  it('has exact values in order', () => {
    expect(SOURCE_HIERARCHY).toEqual([
      'IEA',
      'EIA',
      'OECD',
      'ECB',
      'UNCTAD',
      'Secondary',
    ]);
  });

  it('is frozen', () => {
    expect(Object.isFrozen(SOURCE_HIERARCHY)).toBe(true);
  });
});

describe('SEVERITY_LEVELS', () => {
  it('has exact values in order', () => {
    expect(SEVERITY_LEVELS).toEqual([
      'critical',
      'warning',
      'elevated',
      'normal',
    ]);
  });

  it('is frozen', () => {
    expect(Object.isFrozen(SEVERITY_LEVELS)).toBe(true);
  });
});

describe('FRESHNESS_THRESHOLDS', () => {
  it('has 5 entries with exact values', () => {
    expect(FRESHNESS_THRESHOLDS).toEqual([
      {
        label: 'Oil Prices',
        maxAgeDays: 60,
        dataTypes: ['oil-price', 'brent', 'wti'],
      },
      {
        label: 'GDP',
        maxAgeDays: 120,
        dataTypes: ['gdp', 'gdp-forecast'],
      },
      {
        label: 'Shipping',
        maxAgeDays: 30,
        dataTypes: ['shipping', 'tanker'],
      },
      {
        label: 'Scenarios',
        maxAgeDays: 14,
        dataTypes: ['scenario', 'simulation'],
      },
      {
        label: 'Policy',
        maxAgeDays: 30,
        dataTypes: ['policy', 'sanctions'],
      },
    ]);
  });

  it('is frozen', () => {
    expect(Object.isFrozen(FRESHNESS_THRESHOLDS)).toBe(true);
  });
});

describe('SIMULATION_DEFAULTS', () => {
  it('has exact values', () => {
    expect(SIMULATION_DEFAULTS).toEqual({
      oilPrice: 100,
      duration: 6,
      severity: 50,
    });
  });

  it('is frozen', () => {
    expect(Object.isFrozen(SIMULATION_DEFAULTS)).toBe(true);
  });
});

describe('SIMULATION_RANGES', () => {
  it('has exact ranges for each slider', () => {
    expect(SIMULATION_RANGES.oilPrice).toEqual({ min: 70, max: 160 });
    expect(SIMULATION_RANGES.duration).toEqual({ min: 1, max: 18 });
    expect(SIMULATION_RANGES.severity).toEqual({ min: 10, max: 100 });
  });

  it('is frozen', () => {
    expect(Object.isFrozen(SIMULATION_RANGES)).toBe(true);
  });
});

describe('SIMULATION_DEFAULTS within SIMULATION_RANGES', () => {
  it('defaults fall within ranges', () => {
    expect(SIMULATION_DEFAULTS.oilPrice).toBeGreaterThanOrEqual(SIMULATION_RANGES.oilPrice.min);
    expect(SIMULATION_DEFAULTS.oilPrice).toBeLessThanOrEqual(SIMULATION_RANGES.oilPrice.max);
    expect(SIMULATION_DEFAULTS.duration).toBeGreaterThanOrEqual(SIMULATION_RANGES.duration.min);
    expect(SIMULATION_DEFAULTS.duration).toBeLessThanOrEqual(SIMULATION_RANGES.duration.max);
    expect(SIMULATION_DEFAULTS.severity).toBeGreaterThanOrEqual(SIMULATION_RANGES.severity.min);
    expect(SIMULATION_DEFAULTS.severity).toBeLessThanOrEqual(SIMULATION_RANGES.severity.max);
  });
});

describe('STALE_THRESHOLD_DAYS', () => {
  it('equals 7', () => {
    expect(STALE_THRESHOLD_DAYS).toBe(7);
  });
});

describe('DATA_AS_OF', () => {
  it('exists and matches ISO 8601 pattern', () => {
    expect(DATA_AS_OF).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
