const oilFmt = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const priceFmt = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const gasFmt = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const inflationFmt = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const gdpFmt = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function formatOilProduction(value: number): string {
  if (!Number.isFinite(value)) {
    throw new TypeError(
      `formatOilProduction: expected finite number, got ${value}`,
    );
  }
  if (value < 0) {
    throw new RangeError(
      `formatOilProduction: expected non-negative, got ${value}`,
    );
  }
  return `${oilFmt.format(value === 0 ? 0 : value)} Mb/d`;
}

export function formatPrice(value: number): string {
  if (!Number.isFinite(value)) {
    throw new TypeError(
      `formatPrice: expected finite number, got ${value}`,
    );
  }
  if (value < 0) {
    throw new RangeError(
      `formatPrice: expected non-negative, got ${value}`,
    );
  }
  return `$${priceFmt.format(value)}`;
}

export function formatGas(
  value: number,
  unit: 'USD/MMBtu' | 'EUR/MWh',
): string {
  if (!Number.isFinite(value)) {
    throw new TypeError(
      `formatGas: expected finite number, got ${value}`,
    );
  }
  if (value < 0) {
    throw new RangeError(
      `formatGas: expected non-negative, got ${value}`,
    );
  }
  return `${gasFmt.format(value)} ${unit}`;
}

export function formatInflation(value: number): string {
  if (!Number.isFinite(value)) {
    throw new TypeError(
      `formatInflation: expected finite number, got ${value}`,
    );
  }
  return `${inflationFmt.format(value)}%`;
}

export function formatGDP(value: number): string {
  if (!Number.isFinite(value)) {
    throw new TypeError(
      `formatGDP: expected finite number, got ${value}`,
    );
  }
  const sign = value >= 0 ? '+' : '-';
  return `${sign}${gdpFmt.format(Math.abs(value))}%`;
}

export function formatDate(value: string): string {
  if (!ISO_DATE_RE.test(value)) {
    throw new TypeError(
      `formatDate: expected ISO 8601 date string (YYYY-MM-DD), got "${value}"`,
    );
  }
  return value;
}

export function formatPercent(value: number, decimals: number = 1): string {
  if (!Number.isFinite(value)) {
    throw new TypeError(
      `formatPercent: expected finite number, got ${value}`,
    );
  }
  const fmt = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${fmt.format(value)}%`;
}

export function formatNumber(
  value: number,
  options?: Intl.NumberFormatOptions,
): string {
  if (!Number.isFinite(value)) {
    throw new TypeError(
      `formatNumber: expected finite number, got ${value}`,
    );
  }
  return new Intl.NumberFormat('en-US', options).format(value);
}
