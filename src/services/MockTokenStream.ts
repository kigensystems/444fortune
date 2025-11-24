import { TokenStreamSnapshot, TokenEvent, TopHolder, TokenMetrics } from '../types'

export class MockTokenStream {
    private listeners: { [key: string]: Function[] } = {}
    private intervalId: NodeJS.Timeout | null = null

    // Simulation State
    private startTime: number = 0
    private marketCap: number = 4444
    private fortunePool: number = 44
    private tokenPrice: number = 0.000004444
    private supply: number = 1_000_000_000
    private activeTraders: Set<string> = new Set()

    // RNG State
    private seed: number = 12345

    // Mock Data State
    private recentEvents: TokenEvent[] = []
    private topHolders: TopHolder[] = []
    private metrics: TokenMetrics = {
        volume1m: 0,
        volume20m: 0,
        trades1m: 0,
        trades20m: 0,
        buyVolume: 0,
        sellVolume: 0,
        buySellRatio: 1.5
    }

    private walletAddresses = [
        '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        '0x1234567890123456789012345678901234567890',
        '0xAbCdEf0123456789AbCdEf0123456789AbCdEf01',
        '0x9876543210987654321098765432109876543210',
        '0xDeAdBeEfDeAdBeEfDeAdBeEfDeAdBeEfDeAdBeEf',
        '0xCaFeBaBeCaFeBaBeCaFeBaBeCaFeBaBeCaFeBaBe',
        '0x000000000000000000000000000000000000dEaD',
        '0x5c952063c7fc8610ffdb798152d69f0b9550762b',
        '0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
    ]

    constructor() {
        this.initializeHolders()
    }

    // Linear Congruential Generator for deterministic RNG
    private random(): number {
        this.seed = (this.seed * 1664525 + 1013904223) % 4294967296
        return this.seed / 4294967296
    }

    private initializeHolders() {
        this.seed = 12345 // Reset seed for consistent holders
        this.topHolders = this.walletAddresses.map(wallet => ({
            wallet,
            balance: Math.floor(this.random() * 10_000_000) + 500_000,
            supplyPercent: 0,
            firstBuyTxHash: this.generateTxHash(),
            firstBuyTime: Date.now() - Math.floor(this.random() * 10000000)
        }))
        this.updateHolderPercentages()
        this.sortHolders()
    }

    private generateTxHash(): string {
        return '0x' + Array.from({ length: 64 }, () => Math.floor(this.random() * 16).toString(16)).join('')
    }

    private updateHolderPercentages() {
        this.topHolders.forEach(h => {
            h.supplyPercent = (h.balance / this.supply) * 100
        })
    }

    private sortHolders() {
        this.topHolders.sort((a, b) => b.balance - a.balance)
        this.topHolders = this.topHolders.slice(0, 10)
    }

    connect() {
        setTimeout(() => {
            this.emit('connected', null)
        }, 500)
    }

    start(startTime?: number) {
        console.log('[MockTokenStream] Starting simulation...', startTime)

        // Reset State
        this.startTime = startTime || Date.now()
        this.seed = this.startTime // Seed with start time for consistency across clients
        this.marketCap = 4444
        this.fortunePool = 44
        this.tokenPrice = 0.000004444
        this.recentEvents = []

        // Fast forward if needed
        const now = Date.now()
        const elapsed = now - this.startTime

        if (elapsed > 0) {
            // Generate past events to catch up state
            // We'll simulate in chunks to be efficient
            const steps = Math.min(Math.floor(elapsed / 2000), 1000) // Max 1000 steps to avoid freeze
            for (let i = 0; i < steps; i++) {
                this.generateRandomEvent(true) // true = silent (don't emit)
            }
        }

        this.emitSnapshot()

        if (this.intervalId) clearInterval(this.intervalId)
        this.intervalId = setInterval(() => {
            this.generateRandomEvent(false)
        }, 2000)
    }

    disconnect() {
        if (this.intervalId) clearInterval(this.intervalId)
        this.emit('disconnected', null)
    }

    on(event: string, callback: Function) {
        if (!this.listeners[event]) this.listeners[event] = []
        this.listeners[event].push(callback)
    }

    private emit(event: string, data: any) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(cb => cb(data))
        }
    }

    private emitSnapshot() {
        const snapshot: TokenStreamSnapshot = {
            tokenCA: '0xMockTokenAddressForDemo',
            tokenSymbol: 'FORTUNE',
            tokenName: '444 Fortune',
            tokenPrice: this.tokenPrice,
            lastTradeTimestamp: Date.now(),
            marketCap: this.marketCap,
            fortunePool: this.fortunePool,
            activeTraderCount: this.activeTraders.size + 12,
            metrics: this.metrics,
            recentEvents: this.recentEvents,
            topHolders: this.topHolders
        }
        this.emit('snapshot', snapshot)
        this.emit('update', snapshot)
    }

    private generateRandomEvent(silent: boolean = false) {
        const now = Date.now()
        const elapsed = now - this.startTime
        const progress = Math.min(elapsed / (20 * 60 * 1000), 1) // 0 to 1 over 20 mins

        // Target Market Cap Curve: 4444 -> 60000 (Quadratic)
        const targetMC = 4444 + (55556 * Math.pow(progress, 2))

        // Determine if we need to buy to catch up to curve
        // Add some noise so it's not a perfect line
        const noise = (this.random() - 0.5) * 1000
        const isBuy = this.marketCap < (targetMC + noise)

        const wallet = this.walletAddresses[Math.floor(this.random() * this.walletAddresses.length)]

        let usdAmount = 0
        const rand = this.random()

        // Dynamic Buy Amounts based on % of Market Cap
        if (isBuy) {
            if (rand > 0.95) {
                // Whale: 3-5% of MC
                usdAmount = this.marketCap * (0.03 + (this.random() * 0.02))
            } else if (rand > 0.7) {
                // Medium: 0.5-1.5% of MC
                usdAmount = this.marketCap * (0.005 + (this.random() * 0.01))
            } else {
                // Shrimp: 0.1-0.5% of MC
                usdAmount = this.marketCap * (0.001 + (this.random() * 0.004))
            }
        } else {
            // Sells are smaller to maintain growth
            usdAmount = this.marketCap * (0.001 + (this.random() * 0.01))
        }

        // Clamp min amount
        usdAmount = Math.max(usdAmount, 10)

        const tokenAmount = usdAmount / this.tokenPrice

        if (isBuy) {
            this.marketCap += usdAmount
            this.fortunePool += usdAmount * 0.01
            this.tokenPrice = this.marketCap / this.supply
            this.metrics.buyVolume += usdAmount

            const holder = this.topHolders.find(h => h.wallet === wallet)
            if (holder) holder.balance += tokenAmount
        } else {
            this.marketCap -= usdAmount * 0.8 // Dampened impact
            this.tokenPrice = this.marketCap / this.supply
            this.metrics.sellVolume += usdAmount

            const holder = this.topHolders.find(h => h.wallet === wallet)
            if (holder) holder.balance = Math.max(0, holder.balance - tokenAmount)
        }

        this.updateHolderPercentages()
        this.sortHolders()
        this.activeTraders.add(wallet)

        const event: TokenEvent = {
            id: Date.now().toString() + Math.floor(this.random() * 1000),
            type: 'swap',
            side: isBuy ? 'buy' : 'sell',
            timestamp: Date.now(),
            blockNumber: 123456 + Math.floor(elapsed / 1000),
            txHash: this.generateTxHash(),
            amount: tokenAmount,
            amountUsd: usdAmount,
            price: this.tokenPrice,
            account: wallet
        }

        this.recentEvents.unshift(event)
        if (this.recentEvents.length > 50) this.recentEvents.pop()

        if (!silent) {
            this.emit('event', event)
            this.emitSnapshot()
        }
    }
}
