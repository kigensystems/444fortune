import {
  TokenStreamSnapshot,
  TokenEvent,
  TopHolder,
  TokenMetrics,
} from "../types";
import { SimulationConfig } from "../config/simulationConfig";

// Typed event names for type safety
export type TokenStreamEventType =
  | "connected"
  | "disconnected"
  | "snapshot"
  | "update"
  | "event";

// Typed callback signatures for each event type
type EventCallbackMap = {
  connected: (data: null) => void;
  disconnected: (data: null) => void;
  snapshot: (data: TokenStreamSnapshot) => void;
  update: (data: TokenStreamSnapshot) => void;
  event: (data: TokenEvent) => void;
};

export class MockTokenStream {
  private listeners: { [K in TokenStreamEventType]?: EventCallbackMap[K][] } =
    {};
  private intervalId: NodeJS.Timeout | null = null;

  // Simulation State
  private startTime: number = 0;
  private marketCap: number = SimulationConfig.INITIAL_MARKET_CAP;
  private fortunePool: number = 55;
  private tokenPrice: number =
    SimulationConfig.INITIAL_MARKET_CAP / SimulationConfig.TOTAL_SUPPLY;
  private supply: number = SimulationConfig.TOTAL_SUPPLY;
  private activeTraders: Set<string> = new Set();

  // RNG State
  private seed: number = 12345;

  // Wallet balance tracking for top holders
  private walletBalances: Map<
    string,
    { balance: number; firstBuyTxHash: string; firstBuyTime: number }
  > = new Map();

  // Event history for rolling volume metrics
  private eventHistory: { timestamp: number; amountUsd: number }[] = [];

  // Mock Data State
  private recentEvents: TokenEvent[] = [];
  private topHolders: TopHolder[] = [];
  private metrics: TokenMetrics = {
    volume1m: 0,
    volume20m: 0,
    trades1m: 0,
    trades20m: 0,
    buyVolume: 0,
    sellVolume: 0,
    buySellRatio: 1.5,
  };

  // Initial holders are static, but new buys get unique wallets
  private initialHolders = [
    "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    "0x1234567890123456789012345678901234567890",
    "0xAbCdEf0123456789AbCdEf0123456789AbCdEf01",
    "0x9876543210987654321098765432109876543210",
    "0xDeAdBeEfDeAdBeEfDeAdBeEfDeAdBeEfDeAdBeEf",
    "0xCaFeBaBeCaFeBaBeCaFeBaBeCaFeBaBeCaFeBaBe",
    "0x000000000000000000000000000000000000dEaD",
    "0x5c952063c7fc8610ffdb798152d69f0b9550762b",
    "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE",
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  ];

  constructor() {
    this.initializeHolders();
  }

  // Linear Congruential Generator for deterministic RNG
  private random(): number {
    this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
    return this.seed / 4294967296;
  }

  private generateUniqueWallet(): string {
    // Generate a random 40-char hex string (lowercase for BNB/BSC standard)
    const chars = "0123456789abcdef";
    let wallet = "0x";
    for (let i = 0; i < 40; i++) {
      wallet += chars[Math.floor(this.random() * 16)];
    }
    return wallet;
  }

  private initializeHolders() {
    this.seed = 12345; // Reset seed for consistent holders
    this.walletBalances.clear(); // Clear existing balances

    // Dev Wallet (First one) gets 3% supply
    // Others get random amounts < 1% to start
    this.topHolders = this.initialHolders.map((wallet, index) => {
      let balance = 0;
      if (index === 0) {
        // Dev Wallet
        balance = this.supply * SimulationConfig.DEV_WALLET_PERCENT;
      } else {
        // Random early buyers: 0.1% to 0.4%
        balance = Math.floor(this.random() * 4_000_000) + 1_000_000;
      }

      const txHash = this.generateTxHash();
      const buyTime = Date.now() - Math.floor(this.random() * 10000000);

      // Also track in walletBalances map
      this.walletBalances.set(wallet, {
        balance,
        firstBuyTxHash: txHash,
        firstBuyTime: buyTime,
      });

      return {
        wallet,
        balance,
        supplyPercent: 0,
        firstBuyTxHash: txHash,
        firstBuyTime: buyTime,
      };
    });
    this.updateHolderPercentages();
    this.sortHolders();
  }

  private generateTxHash(): string {
    return (
      "0x" +
      Array.from({ length: 64 }, () =>
        Math.floor(this.random() * 16).toString(16),
      ).join("")
    );
  }

  private updateHolderPercentages() {
    this.topHolders.forEach((h) => {
      h.supplyPercent = (h.balance / this.supply) * 100;
    });
  }

  private sortHolders() {
    this.topHolders.sort((a, b) => b.balance - a.balance);
    this.topHolders = this.topHolders.slice(0, 10);
  }

  // Rebuild top holders from wallet balances map
  private rebuildTopHolders() {
    const holders: TopHolder[] = [];

    this.walletBalances.forEach((data, wallet) => {
      holders.push({
        wallet,
        balance: data.balance,
        supplyPercent: (data.balance / this.supply) * 100,
        firstBuyTxHash: data.firstBuyTxHash,
        firstBuyTime: data.firstBuyTime,
      });
    });

    // Sort by balance descending and keep top 10
    holders.sort((a, b) => b.balance - a.balance);
    this.topHolders = holders.slice(0, 10);
  }

  // Update rolling volume metrics based on event history
  private updateRollingMetrics(currentTime: number) {
    const oneMinAgo = currentTime - 60_000;
    const twentyMinAgo = currentTime - 20 * 60_000;

    // Filter events for each window and calculate
    let volume1m = 0;
    let volume20m = 0;
    let trades1m = 0;
    let trades20m = 0;

    // Keep only events within 20 min window (cleanup old events)
    this.eventHistory = this.eventHistory.filter(
      (e) => e.timestamp > twentyMinAgo,
    );

    for (const event of this.eventHistory) {
      if (event.timestamp > twentyMinAgo) {
        volume20m += event.amountUsd;
        trades20m++;
      }
      if (event.timestamp > oneMinAgo) {
        volume1m += event.amountUsd;
        trades1m++;
      }
    }

    this.metrics.volume1m = volume1m;
    this.metrics.volume20m = volume20m;
    this.metrics.trades1m = trades1m;
    this.metrics.trades20m = trades20m;
  }

  connect() {
    setTimeout(() => {
      this.emit("connected", null);
    }, 500);
  }

  getStartTime() {
    return this.startTime;
  }

  start(startTime?: number) {
    console.log("[MockTokenStream] Starting simulation...", startTime);

    // Reset State
    this.startTime = startTime || Date.now();
    this.seed = this.startTime; // Seed with start time for consistency across clients
    this.marketCap = SimulationConfig.INITIAL_MARKET_CAP;
    this.fortunePool = 55;
    this.tokenPrice = this.marketCap / this.supply;
    this.recentEvents = [];
    this.eventHistory = []; // Reset event history for rolling metrics
    this.activeTraders.clear();
    this.metrics = {
      volume1m: 0,
      volume20m: 0,
      trades1m: 0,
      trades20m: 0,
      buyVolume: 0,
      sellVolume: 0,
      buySellRatio: 1.5,
    };

    // Re-initialize holders with fresh state
    this.initializeHolders();

    // Fast forward if needed
    const now = Date.now();
    const elapsed = now - this.startTime;

    if (elapsed > 0) {
      // Generate past events to catch up state
      // We'll simulate in chunks to be efficient
      const steps = Math.min(
        Math.floor(elapsed / SimulationConfig.UPDATE_INTERVAL_MS),
        1000,
      ); // Max 1000 steps
      for (let i = 0; i < steps; i++) {
        this.generateRandomEvent(true); // true = silent (don't emit)
      }
    }

    this.emitSnapshot();

    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      this.generateRandomEvent(false);
    }, SimulationConfig.UPDATE_INTERVAL_MS);
  }

  disconnect() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.emit("disconnected", null);
    // Clear all listeners to prevent memory leaks
    this.clearAllListeners();
  }

  on<K extends TokenStreamEventType>(event: K, callback: EventCallbackMap[K]) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    // Prevent duplicate listeners
    const listeners = this.listeners[event] as EventCallbackMap[K][];
    if (!listeners.includes(callback)) {
      listeners.push(callback);
    }
  }

  off<K extends TokenStreamEventType>(event: K, callback: EventCallbackMap[K]) {
    if (!this.listeners[event]) return;
    const listeners = this.listeners[event] as EventCallbackMap[K][];
    const index = listeners.indexOf(callback);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  }

  clearAllListeners() {
    this.listeners = {};
  }

  private emit<K extends TokenStreamEventType>(
    event: K,
    data: Parameters<EventCallbackMap[K]>[0],
  ) {
    if (this.listeners[event]) {
      const listeners = this.listeners[event] as EventCallbackMap[K][];
      listeners.forEach((cb) => cb(data as never));
    }
  }

  private emitSnapshot() {
    const snapshot: TokenStreamSnapshot = {
      tokenCA: "0xMockTokenAddressForDemo",
      tokenSymbol: "FORTUNE",
      tokenName: "444 Fortune",
      tokenPrice: this.tokenPrice,
      lastTradeTimestamp: Date.now(),
      marketCap: this.marketCap,
      fortunePool: this.fortunePool,
      activeTraderCount: this.activeTraders.size + 12,
      metrics: this.metrics,
      recentEvents: this.recentEvents,
      topHolders: this.topHolders,
    };
    this.emit("snapshot", snapshot);
    this.emit("update", snapshot);
  }

  private generateRandomEvent(silent: boolean = false) {
    const now = Date.now();
    const elapsed = now - this.startTime;
    const progress = Math.min(
      elapsed / (SimulationConfig.DURATION_MINUTES * 60 * 1000),
      1,
    ); // 0 to 1

    // Target Market Cap Curve
    // Formula: Target = Initial + (Growth * progress^exponent)
    const growth =
      SimulationConfig.TARGET_MARKET_CAP - SimulationConfig.INITIAL_MARKET_CAP;
    const targetMC =
      SimulationConfig.INITIAL_MARKET_CAP +
      growth * Math.pow(progress, SimulationConfig.CURVE_EXPONENT);

    // Determine if we need to catch up to curve
    // Add some noise so it's not a perfect line
    const noise = (this.random() - 0.5) * 1000;

    // In "Buys Only" mode, we always buy.
    // We just adjust the probability of "Whale" vs "Shrimp" based on whether we are ahead or behind the curve.
    const isAhead = this.marketCap > targetMC + noise;

    // Unique wallet for every buy
    const wallet = this.generateUniqueWallet();

    let usdAmount = 0;
    const rand = this.random();

    // Dynamic Buy Amounts based on % of Market Cap
    const { WHALE, MEDIUM } = SimulationConfig.BUY_PROBABILITY;
    const {
      WHALE: W_SIZE,
      MEDIUM: M_SIZE,
      SHRIMP: S_SIZE,
    } = SimulationConfig.BUY_SIZING;

    // Adaptive probability adjustment based on distance from target curve
    // This creates smoother tracking rather than binary ahead/behind switching
    let whaleChance = WHALE;
    let mediumChance = MEDIUM;

    // Calculate how far we are from target (as percentage)
    const deviation = (this.marketCap - targetMC) / targetMC;

    if (isAhead) {
      // When ahead: slow down growth proportionally
      // At 10%+ ahead: very slow (2% whale, 15% medium)
      // At 0-10% ahead: moderate slow (use base rates * 0.5)
      if (deviation > 0.1) {
        whaleChance = 0.02;
        mediumChance = 0.15;
      } else {
        whaleChance = WHALE * 0.4; // 2% whale
        mediumChance = MEDIUM * 0.6; // 15% medium
      }
    } else {
      // When behind: catch up proportionally
      // At 10%+ behind: aggressive (30% whale, 45% medium)
      // At 0-10% behind: moderate catch-up (20% whale, 40% medium)
      if (deviation < -0.1) {
        whaleChance = 0.3;
        mediumChance = 0.45;
      } else {
        whaleChance = 0.2;
        mediumChance = 0.4;
      }
    }

    if (rand > 1 - whaleChance) {
      // Whale
      const pct = W_SIZE.min + this.random() * (W_SIZE.max - W_SIZE.min);
      usdAmount = this.marketCap * pct;
    } else if (rand > 1 - whaleChance - mediumChance) {
      // Medium
      const pct = M_SIZE.min + this.random() * (M_SIZE.max - M_SIZE.min);
      usdAmount = this.marketCap * pct;
    } else {
      // Shrimp (Default fallback)
      const pct = S_SIZE.min + this.random() * (S_SIZE.max - S_SIZE.min);
      usdAmount = this.marketCap * pct;
    }

    // Clamp min amount
    usdAmount = Math.max(usdAmount, 10);

    let tokenAmount = usdAmount / this.tokenPrice;

    // Fortune Pool gets % of all volume (0.3 = 30%)
    this.fortunePool += usdAmount * SimulationConfig.FORTUNE_POOL_FEE_RATE;

    // Execute Buy
    this.marketCap += usdAmount;
    this.tokenPrice = this.marketCap / this.supply;
    this.metrics.buyVolume += usdAmount;

    // Check Max Wallet Cap
    const maxTokens = this.supply * SimulationConfig.MAX_WALLET_CAP_PERCENT;
    if (tokenAmount > maxTokens) {
      tokenAmount = maxTokens;
      usdAmount = tokenAmount * this.tokenPrice;
    }

    // Generate transaction details
    const txHash = this.generateTxHash();
    const eventTimestamp = now;

    // Track wallet balance for top holders
    const existingBalance = this.walletBalances.get(wallet);
    if (existingBalance) {
      // Existing wallet - add to balance
      existingBalance.balance += tokenAmount;
    } else {
      // New wallet - create entry
      this.walletBalances.set(wallet, {
        balance: tokenAmount,
        firstBuyTxHash: txHash,
        firstBuyTime: eventTimestamp,
      });
    }

    // Rebuild top holders from all wallet balances
    this.rebuildTopHolders();

    // Record event for rolling metrics
    this.eventHistory.push({
      timestamp: eventTimestamp,
      amountUsd: usdAmount,
    });

    // Update rolling volume metrics
    this.updateRollingMetrics(eventTimestamp);

    // Update active traders (cap at 100) - O(1) lookup with Set
    if (this.activeTraders.size >= 100 && !this.activeTraders.has(wallet)) {
      // Remove oldest entry (first one added) when at capacity
      const oldest = this.activeTraders.values().next().value;
      if (oldest) this.activeTraders.delete(oldest);
    }
    // Add wallet (Set handles duplicates automatically)
    this.activeTraders.add(wallet);

    const event: TokenEvent = {
      id: eventTimestamp.toString() + Math.floor(this.random() * 1000),
      type: "swap",
      side: "buy",
      timestamp: eventTimestamp,
      blockNumber: 123456 + Math.floor(elapsed / 1000),
      txHash: txHash,
      amount: tokenAmount,
      amountUsd: usdAmount,
      price: this.tokenPrice,
      account: wallet,
    };

    this.recentEvents.unshift(event);
    if (this.recentEvents.length > 50) this.recentEvents.pop();

    if (!silent) {
      this.emit("event", event);
      this.emitSnapshot();
    }
  }
}
