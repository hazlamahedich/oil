import { describe, expect, it } from 'vitest';
import {
  formatDate,
  formatGDP,
  formatGas,
  formatInflation,
  formatNumber,
  formatOilProduction,
  formatPercent,
  formatPrice,
} from '@/utils/format';

describe('formatOilProduction', () => {
  it('formats 0 as "0.0 Mb/d"', () => {
    expect(formatOilProduction(0)).toBe('0.0 Mb/d');
  });

  it('formats 85.5 as "85.5 Mb/d"', () => {
    expect(formatOilProduction(85.5)).toBe('85.5 Mb/d');
  });

  it('formats 999.9 as "999.9 Mb/d"', () => {
    expect(formatOilProduction(999.9)).toBe('999.9 Mb/d');
  });

  it('throws RangeError on negative', () => {
    expect(() => formatOilProduction(-1)).toThrow(RangeError);
  });

  it('throws TypeError on NaN', () => {
    expect(() => formatOilProduction(NaN)).toThrow(TypeError);
  });

  it('throws TypeError on Infinity', () => {
    expect(() => formatOilProduction(Infinity)).toThrow(TypeError);
  });

  it('handles negative zero as "0.0 Mb/d"', () => {
    expect(formatOilProduction(-0)).toBe('0.0 Mb/d');
  });

  it('error message contains function name', () => {
    expect(() => formatOilProduction(NaN)).toThrow('formatOilProduction');
  });
});

describe('formatPrice', () => {
  it('formats 0.01 as "$0.01"', () => {
    expect(formatPrice(0.01)).toBe('$0.01');
  });

  it('formats 84.50 as "$84.50"', () => {
    expect(formatPrice(84.5)).toBe('$84.50');
  });

  it('formats 999.99 as "$999.99"', () => {
    expect(formatPrice(999.99)).toBe('$999.99');
  });

  it('throws RangeError on negative', () => {
    expect(() => formatPrice(-1)).toThrow(RangeError);
  });

  it('throws TypeError on NaN', () => {
    expect(() => formatPrice(NaN)).toThrow(TypeError);
  });

  it('throws TypeError on Infinity', () => {
    expect(() => formatPrice(Infinity)).toThrow(TypeError);
  });

  it('error message contains function name', () => {
    expect(() => formatPrice(-1)).toThrow('formatPrice');
  });

  it('is pure — same input yields same output', () => {
    expect(formatPrice(84.5)).toBe(formatPrice(84.5));
    expect(formatPrice(84.5) === formatPrice(84.5)).toBe(true);
  });
});

describe('formatGas', () => {
  it('formats (3.45, "USD/MMBtu") as "3.45 USD/MMBtu"', () => {
    expect(formatGas(3.45, 'USD/MMBtu')).toBe('3.45 USD/MMBtu');
  });

  it('formats (52.30, "EUR/MWh") as "52.30 EUR/MWh"', () => {
    expect(formatGas(52.3, 'EUR/MWh')).toBe('52.30 EUR/MWh');
  });

  it('throws RangeError on negative', () => {
    expect(() => formatGas(-1, 'USD/MMBtu')).toThrow(RangeError);
  });

  it('throws TypeError on NaN', () => {
    expect(() => formatGas(NaN, 'USD/MMBtu')).toThrow(TypeError);
  });

  it('error message contains function name', () => {
    expect(() => formatGas(-1, 'USD/MMBtu')).toThrow('formatGas');
  });
});

describe('formatInflation', () => {
  it('formats 3.5 as "3.5%"', () => {
    expect(formatInflation(3.5)).toBe('3.5%');
  });

  it('formats 0 as "0.0%"', () => {
    expect(formatInflation(0)).toBe('0.0%');
  });

  it('formats -0.5 as "-0.5%" (deflation)', () => {
    expect(formatInflation(-0.5)).toBe('-0.5%');
  });

  it('formats 25.0 as "25.0%"', () => {
    expect(formatInflation(25)).toBe('25.0%');
  });

  it('throws TypeError on NaN', () => {
    expect(() => formatInflation(NaN)).toThrow(TypeError);
  });

  it('error message contains function name', () => {
    expect(() => formatInflation(NaN)).toThrow('formatInflation');
  });
});

describe('formatGDP', () => {
  it('formats 2.5 as "+2.5%"', () => {
    expect(formatGDP(2.5)).toBe('+2.5%');
  });

  it('formats -3.2 as "-3.2%"', () => {
    expect(formatGDP(-3.2)).toBe('-3.2%');
  });

  it('formats 0 as "+0.0%" (positive sign on zero)', () => {
    expect(formatGDP(0)).toBe('+0.0%');
  });

  it('formats 8.1 as "+8.1%"', () => {
    expect(formatGDP(8.1)).toBe('+8.1%');
  });

  it('throws TypeError on NaN', () => {
    expect(() => formatGDP(NaN)).toThrow(TypeError);
  });

  it('error message contains function name', () => {
    expect(() => formatGDP(NaN)).toThrow('formatGDP');
  });
});

describe('formatDate', () => {
  it('passes through valid ISO 8601 date "2026-04-13"', () => {
    expect(formatDate('2026-04-13')).toBe('2026-04-13');
  });

  it('throws TypeError on "not-a-date"', () => {
    expect(() => formatDate('not-a-date')).toThrow(TypeError);
  });

  it('throws TypeError on "2026/04/13"', () => {
    expect(() => formatDate('2026/04/13')).toThrow(TypeError);
  });

  it('passes "9999-99-99" (structural regex only)', () => {
    expect(formatDate('9999-99-99')).toBe('9999-99-99');
  });

  it('throws TypeError on empty string', () => {
    expect(() => formatDate('')).toThrow(TypeError);
  });

  it('error message contains function name', () => {
    expect(() => formatDate('bad')).toThrow('formatDate');
  });
});

describe('formatPercent', () => {
  it('formats 50.5 as "50.5%"', () => {
    expect(formatPercent(50.5)).toBe('50.5%');
  });

  it('formats 0 as "0.0%"', () => {
    expect(formatPercent(0)).toBe('0.0%');
  });

  it('formats 100 as "100.0%"', () => {
    expect(formatPercent(100)).toBe('100.0%');
  });

  it('formats (50.555, 2) as "50.56%"', () => {
    expect(formatPercent(50.555, 2)).toBe('50.56%');
  });

  it('formats -5.2 as "-5.2%" (negative allowed)', () => {
    expect(formatPercent(-5.2)).toBe('-5.2%');
  });

  it('throws TypeError on NaN', () => {
    expect(() => formatPercent(NaN)).toThrow(TypeError);
  });

  it('error message contains function name', () => {
    expect(() => formatPercent(NaN)).toThrow('formatPercent');
  });
});

describe('formatNumber', () => {
  it('formats 1000 as "1,000"', () => {
    expect(formatNumber(1000)).toBe('1,000');
  });

  it('formats with currency style option', () => {
    const result = formatNumber(1000, { style: 'currency', currency: 'USD' });
    expect(result).toBe('$1,000.00');
  });

  it('formats -5 as a valid string (negative allowed)', () => {
    expect(formatNumber(-5)).toBe('-5');
  });

  it('throws TypeError on NaN', () => {
    expect(() => formatNumber(NaN)).toThrow(TypeError);
  });

  it('error message contains function name', () => {
    expect(() => formatNumber(NaN)).toThrow('formatNumber');
  });
});
