export const SimulationConfig = {
  // Bonding Curve Parameters
  INITIAL_MARKET_CAP: 5500,
  TARGET_MARKET_CAP: 65000, // Target at 20 minutes
  CURVE_EXPONENT: 1.1, // Adjusted for ~7-8 min first $20k growth

  // Tokenomics
  TOTAL_SUPPLY: 1_000_000_000, // 1 Billion
  MAX_WALLET_CAP_PERCENT: 0.05, // 5%
  DEV_WALLET_PERCENT: 0.03, // 3%

  // Transaction Logic
  // Fee rate as decimal: 0.3 = 30% (e.g., $100 buy → $30 to pool)
  FORTUNE_POOL_FEE_RATE: 0.3,
  SELL_IMPACT_RATIO: 0.8, // Sells only remove 80% of value (Up-Only Bias)

  // Buy Sizing (as % of Market Cap) - Scaled ~4x to hit target MC
  // Required avg: 0.413% per event | New weighted avg: ~0.54%
  BUY_SIZING: {
    WHALE: { min: 0.02, max: 0.04 }, // 2% - 4% (was 0.5-1%)
    MEDIUM: { min: 0.005, max: 0.012 }, // 0.5% - 1.2% (was 0.1-0.3%)
    SHRIMP: { min: 0.001, max: 0.004 }, // 0.1% - 0.4% (was 0.01-0.05%)
  },

  // Probabilities
  BUY_PROBABILITY: {
    WHALE: 0.05, // 5% chance
    MEDIUM: 0.25, // 25% chance
    SHRIMP: 0.7, // 70% chance
  },

  // Simulation Timing
  DURATION_MINUTES: 20,
  UPDATE_INTERVAL_MS: 2000,
};
