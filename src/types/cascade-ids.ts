export const CASCADE_NODE_IDS = {
  HORMUZ: 'hormuz-strait',
  CRUDE_OIL_SUPPLY: 'crude-oil-supply',
  OPEC_PRODUCTION: 'opec-production',
  NATURAL_GAS: 'natural-gas',
  TANKER_FLEET: 'tanker-fleet',
  LNG_SHIPPING: 'lng-shipping',
  ALTERNATIVE_ROUTES: 'alternative-supply-routes',
  REFINERY_CAPACITY: 'refinery-capacity',
  PETROCHEMICALS: 'petrochemicals',
  SHIPPING_INSURANCE: 'shipping-insurance',
  FERTILIZER: 'fertilizer',
  FREIGHT_RATES: 'freight-rates',
  STRATEGIC_RESERVES: 'strategic-reserves',
  FOOD_PRICES: 'food-prices',
  ENERGY_IMPORTS: 'energy-imports',
  DOWNSTREAM_MANUFACTURING: 'downstream-manufacturing',
  CONSUMER_FUEL_PRICES: 'consumer-fuel-prices',
  DEMAND: 'demand',
  DESULFURIZATION: 'desulfurization',
} as const;

export type CascadeNodeId = (typeof CASCADE_NODE_IDS)[keyof typeof CASCADE_NODE_IDS];
