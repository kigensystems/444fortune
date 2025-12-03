export const SimulationConfig = {
  // Bonding Curve Parameters
  INITIAL_MARKET_CAP: 5500,
  TARGET_MARKET_CAP: 60000, // Target at 20 minutes
  CURVE_EXPONENT: 1.8, // Slower early growth, accelerates toward end

  // Tokenomics
  TOTAL_SUPPLY: 1_000_000_000, // 1 Billion
  MAX_WALLET_CAP_PERCENT: 0.05, // 5%
  DEV_WALLET_PERCENT: 0.03, // 3%

  // Transaction Logic
  // Fee rate as decimal: 0.3 = 30% (e.g., $100 buy → $30 to pool)
  FORTUNE_POOL_FEE_RATE: 0.3,
  SELL_IMPACT_RATIO: 0.8, // Sells only remove 80% of value (Up-Only Bias)

  // Buy Sizing (as % of Market Cap)
  // Target ~0.4% weighted avg per event to hit $60k in 600 events
  BUY_SIZING: {
    WHALE: { min: 0.015, max: 0.03 }, // 1.5% - 3%
    MEDIUM: { min: 0.004, max: 0.009 }, // 0.4% - 0.9%
    SHRIMP: { min: 0.0008, max: 0.003 }, // 0.08% - 0.3%
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
