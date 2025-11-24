# 444 Fortune - Four.meme Casino Game

Casino-themed memecoin landing page with a simulated real-time token tracking experience and a 20-minute draw game mechanic.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-3178c6.svg)
![Netlify](https://img.shields.io/badge/Netlify-Functions-00C7B7.svg)

---

## 🎯 Project Overview

**444 Fortune** is a full-stack application featuring:
- 🎰 **Casino-themed UI** with Asian prosperity aesthetics
- 📊 **Simulated Token Tracking**: Realistic mock data stream mimicking Four.meme token activity
- 🔄 **Global Synchronization**: Serverless simulation state synced across all users via Netlify Functions
- ⏱️ **20-minute countdown game** with entry-based odds system
- 💰 **Live market cap and trading volume display** (Simulated)

**Tech Stack:**
- **Frontend**: React 18 + TypeScript + Vite + Tailwind + Framer Motion
- **Animation**: GSAP + react-spring + Lottie
- **Backend**: Netlify Functions V2 (Serverless)
- **Persistence**: Netlify Blobs (for global simulation state)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Netlify CLI (optional, for local function testing)

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Run frontend only (Mock data works locally)
npm run dev
# Opens at http://localhost:5173

# Run with Netlify Functions (for testing global sync)
npx netlify dev
# Opens at http://localhost:8888
```

### Production Build

```bash
npm run build
npm run preview
```

---

## 🏗️ Architecture

### Mock Data Stream
The application uses a sophisticated client-side simulation (`src/services/MockTokenStream.ts`) to generate realistic market data:
- **Deterministic Generation**: Seeded RNG ensures consistent data generation based on a start time.
- **Quadratic Growth**: Simulates a token pump from $4k to $60k market cap over 20 minutes.
- **Events**: Generates realistic Buy/Sell events, volume updates, and top holder changes.

### Global Synchronization
To ensure all users see the *same* simulation state, we use **Netlify Functions** and **Blobs**:

1.  **State Storage**: A Netlify Blob store named `"simulation"` holds the global `startTime`.
2.  **API Endpoint** (`netlify/functions/simulation.mts`):
    - `GET`: Returns the current `startTime` and running status.
    - `POST`: Starts a new simulation (requires secret key) and updates the `startTime`.
3.  **Client Sync**: The `useTokenStream` hook polls the API on mount. If a simulation is running globally, it syncs the local mock stream to the server's `startTime`.

---

## 🎨 Design System

### Brand Colors
**Palette - Elegant Gold + Cream:**
- `#F4E5C3` - Cream/champagne gold (main titles, borders)
- `#FFE5B4` - Peach/light gold (gradients, highlights)
- `#D4AF37` - Antique gold (gradients, accents)
- `#B8960B` - Dark gold (3D bases, shadows)
- `#8B0000` - Dark red (text on gold backgrounds)

### Typography
- **Poppins** (Google Fonts) - Modern bold sans-serif
- Weights: 400-900
- Clean 3D depth effects (no glow)

### Animation Philosophy
- **Continuous motion**: Slow scrolling marquees (40s cycle)
- **GPU-accelerated**: Transform/opacity only for 60fps
- **GSAP**: Scroll-triggered reveals and timeline animations
- **react-spring**: Physics-based hover effects

---

## 🧩 Component Architecture

### Main Sections
1.  **Hero Section**: 3-column layout (Mascot | Content | Mascot) with glass-morphism frames.
2.  **Game Section**: 2-column layout (Countdown | Stepper).
    - **Countdown Card**: Displays time, Market Cap, and Fortune Pool.
    - **Compact Stepper**: "How It Works" guide.
3.  **Marquees**: Top, Middle, and Bottom scrolling banners.
4.  **Sticky Mini-Bar**: Appears on scroll, showing quick stats and CTA.

### Key Components
- `WalletChecker.tsx`: Input for "Check Your Odds". Contains the **secret trigger** ("FORTUNE444") to start the global simulation.
- `BuyFeed.tsx`: Split view showing recent Transactions and Top Holders.
- `CountdownTimer.tsx`: Visual timer with GSAP digit transitions.

---

## 🎮 Game Mechanics

### Entry System
**Formula:** `Entries = Minutes Held × % of Supply`

**Example:**
- Hold 1% of supply for 15 minutes = 15 entries
- Hold 2% of supply for 20 minutes = 40 entries

### Simulation Flow
1.  **Idle**: Timer at 20:00, Market Cap at initial seed.
2.  **Trigger**: Admin types "FORTUNE444" in Wallet Checker.
3.  **Start**:
    - API updates global `startTime`.
    - All clients sync and start countdown.
    - Market Cap grows quadratically.
    - Buy/Sell events stream in.
4.  **End**: Timer hits 00:00.

---

## 📁 Project Structure

```
/444 Fortune/
├── netlify/
│   └── functions/
│       └── simulation.mts  # Serverless function for global sync
├── public/                 # Static assets (images, backgrounds)
├── src/
│   ├── components/         # UI Components (Countdown, Marquee, etc.)
│   ├── hooks/              # Custom hooks (useTokenStream)
│   ├── services/           # Simulation logic (MockTokenStream)
│   ├── App.tsx             # Main application layout
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles & Tailwind
├── netlify.toml            # Netlify configuration
├── package.json            # Dependencies
├── tailwind.config.js      # Design tokens
└── vite.config.ts          # Build config
```

---

## 🚀 Deployment

### Netlify
1.  **Connect Repo**: Link your GitHub repository to Netlify.
2.  **Build Settings**:
    - **Build Command**: `npm run build`
    - **Publish Directory**: `dist`
3.  **Enable Blobs**: Go to **Site Settings > Blobs** and enable the feature.
4.  **Environment**: No special env vars needed for the simulation (Blobs are auto-configured).

---

## 📄 License

MIT License
