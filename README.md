# 444 Fortune

Casino-themed memecoin landing page with a simulated real-time token stream and 20-minute draw game.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Animation**: Framer Motion + GSAP
- **Backend**: Netlify Functions + Blobs (global state sync)

## Quick Start

```bash
npm install
npm run dev          # Frontend only (localhost:5173)
npx netlify dev      # With serverless functions (localhost:8888)
```

## How It Works

### Simulation Engine

The `MockTokenStream` generates realistic market data using a **deterministic RNG** seeded with the global start time. All users see identical events at the same timestamps.

**Growth Curve:**
- Start: $5,500 market cap
- Target: $65,000 after 20 minutes
- Formula: `MC = 5500 + (59500 × progress^1.1)`
- First $20k growth in ~7-8 minutes, remaining $45k over ~12-13 minutes

**Buy Sizing (% of market cap):**
| Type | Size Range | Probability |
|------|------------|-------------|
| Whale | 2-4% | 5% |
| Medium | 0.5-1.2% | 25% |
| Shrimp | 0.1-0.4% | 70% |

**Adaptive Catch-up:** Probabilities adjust dynamically based on deviation from target curve to ensure smooth tracking.

**Fortune Pool:** 30% of all transaction volume accumulates in the prize pool (~$18k at end).

### Tokenomics

- **Total Supply**: 1 billion tokens
- **Dev Wallet**: 3% (held by first wallet)
- **Max Wallet**: 5% cap per address

### Global Sync

1. Admin triggers simulation by entering `FORTUNE444` in the wallet checker
2. Netlify Function stores `startTime` in Blob storage
3. All clients poll the API and sync to the same start time
4. Deterministic RNG ensures identical state across all users

### Game Mechanics

**Entry Formula:** `Entries = Minutes Held × % of Supply`

Example: Hold 2% for 20 minutes = 40 entries

**Prize Distribution:** 50% of fortune pool split among 5 winners, weighted by entries.

## Project Structure

```
src/
├── components/
│   ├── CountdownTimer.tsx   # Timer + market cap + fortune pool
│   ├── BuyFeed.tsx          # Recent buys + top holders (click to copy)
│   ├── WalletChecker.tsx    # Wallet input + secret trigger
│   ├── CompactStepper.tsx   # How it works guide
│   ├── StickyMiniBar.tsx    # Scroll-triggered stats bar (throttled)
│   ├── SocialButton.tsx     # Social media link buttons
│   └── Marquee.tsx          # Scrolling banner
├── hooks/
│   └── useTokenStream.ts    # State management + API polling
├── services/
│   └── MockTokenStream.ts   # Simulation engine
├── config/
│   └── simulationConfig.ts  # Tunable parameters
└── types.ts                 # TypeScript interfaces

netlify/functions/
└── simulation.mts           # GET: status, POST: start simulation
```

## Configuration

All simulation parameters are in `src/config/simulationConfig.ts`:

```typescript
{
  INITIAL_MARKET_CAP: 5500,
  TARGET_MARKET_CAP: 65000,
  CURVE_EXPONENT: 1.1,
  FORTUNE_POOL_FEE_RATE: 0.30,  // 30% of volume to pool
  DURATION_MINUTES: 20,
  UPDATE_INTERVAL_MS: 2000
}
```

## Recent Changes (Nov 2024)

### Bug Fixes
- **Event listener memory leak**: Added `off()` method and `clearAllListeners()` to `MockTokenStream` to prevent listener accumulation on remounts
- **Wallet address format**: Changed generated addresses to lowercase hex for BNB/BSC standard compliance

### Performance Improvements
- **Scroll throttling**: `StickyMiniBar` now throttles scroll events (100ms) with `requestAnimationFrame` for smoother performance
- **Data structure optimization**: `activeTraders` converted from Array to Set for O(1) lookups
- **Image optimization**: Switched mascot images from PNG to WebP format (~65% smaller file sizes)

### Code Quality
- **TypeScript improvements**: Added typed event system (`TokenStreamEventType`) to `MockTokenStream`, fixed `icon: any` in `SocialButton`
- **Config clarity**: Renamed `FORTUNE_POOL_FEE_PERCENT` to `FORTUNE_POOL_FEE_RATE` with clearer documentation

### Cleanup
- Removed unused `LiveStats.tsx` component
- Removed duplicate `favicon_io/` directory
- Removed unused PNG files (now using WebP)

## Deployment

1. Connect repo to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Enable Blobs in Site Settings

## License

MIT
