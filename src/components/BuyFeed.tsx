import { useState } from 'react'
import { motion } from 'framer-motion'
import { TokenEvent, TopHolder } from '../types'

interface BuyFeedProps {
    buyEvents: TokenEvent[]
    topHolders: TopHolder[]
}

export function BuyFeed({ buyEvents, topHolders }: BuyFeedProps) {
    const TOTAL_SUPPLY = 1_000_000_000 // 1 billion
    const [copiedAddress, setCopiedAddress] = useState<string | null>(null)

    const copyToClipboard = async (address: string) => {
        try {
            await navigator.clipboard.writeText(address)
            setCopiedAddress(address)
            setTimeout(() => setCopiedAddress(null), 1500)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp)
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffSecs = Math.floor(diffMs / 1000)
        const diffMins = Math.floor(diffSecs / 60)
        const diffHours = Math.floor(diffMins / 60)

        if (diffSecs < 60) return `${diffSecs}s ago`
        if (diffMins < 60) return `${diffMins}m ago`
        if (diffHours < 24) return `${diffHours}h ago`
        return date.toLocaleDateString()
    }

    const formatWallet = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`
    }

    const formatUSD = (amountUsd: number) => {
        if (amountUsd >= 1_000_000) return `$${(amountUsd / 1_000_000).toFixed(2)}M`
        if (amountUsd >= 1_000) return `$${(amountUsd / 1_000).toFixed(2)}K`
        return `$${amountUsd.toFixed(2)}`
    }

    const formatTokens = (amount: number) => {
        if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(2)}M`
        if (amount >= 1_000) return `${(amount / 1_000).toFixed(2)}K`
        return amount.toFixed(2)
    }

    const calculateSupplyPercent = (amount: number) => {
        return ((amount / TOTAL_SUPPLY) * 100).toFixed(4)
    }

    return (
        <motion.div
            className="mascot-frame rounded-3xl p-6 md:p-8 xl:p-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            {/* Two-column split layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                {/* Left Column - Recent Fortune Buys */}
                <div>
                    <h2 className="text-2xl md:text-3xl xl:text-4xl font-black mb-6" style={{
                        color: '#FFE5B4',
                        letterSpacing: '2px'
                    }}>
                        RECENT FORTUNE BUYS
                    </h2>

                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2" style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#D4AF37 rgba(139, 69, 19, 0.3)'
                    }}>
                        {buyEvents.length === 0 ? (
                            <div className="text-center py-12" style={{ color: '#FFE5B4', opacity: 0.6 }}>
                                Loading...
                            </div>
                        ) : (
                            buyEvents.map((event) => (
                                <motion.div
                                    layout
                                    key={event.id}
                                    className="block rounded-xl p-4 transition-all duration-200"
                                    style={{
                                        background: 'rgba(212, 175, 55, 0.1)',
                                        border: '1px solid rgba(212, 175, 55, 0.3)'
                                    }}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {/* Timestamp */}
                                        <div>
                                            <div className="text-xs text-cream-gold/60 mb-1">TIME</div>
                                            <div className="text-sm font-semibold text-cream-gold">
                                                {formatTime(event.timestamp)}
                                            </div>
                                        </div>

                                        {/* Wallet */}
                                        <div>
                                            <div className="text-xs text-cream-gold/60 mb-1">WALLET</div>
                                            <button
                                                onClick={() => copyToClipboard(event.account)}
                                                className="text-sm font-mono font-semibold text-cream-gold hover:text-peach-gold transition-colors cursor-pointer"
                                                title="Click to copy"
                                            >
                                                {copiedAddress === event.account ? '✓ Copied!' : formatWallet(event.account)}
                                            </button>
                                        </div>

                                        {/* Amount USD */}
                                        <div>
                                            <div className="text-xs text-cream-gold/60 mb-1">AMOUNT</div>
                                            <div className="text-sm font-bold text-green-400">
                                                {formatUSD(event.amountUsd)}
                                            </div>
                                        </div>

                                        {/* % of Supply */}
                                        <div>
                                            <div className="text-xs text-cream-gold/60 mb-1">% SUPPLY</div>
                                            <div className="text-sm font-bold" style={{ color: '#FFE5B4' }}>
                                                {calculateSupplyPercent(event.amount)}%
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>

                {/* Right Column - Top Fortune Holders */}
                <div>
                    <h2 className="text-2xl md:text-3xl xl:text-4xl font-black mb-6" style={{
                        color: '#FFE5B4',
                        letterSpacing: '2px'
                    }}>
                        TOP FORTUNE HOLDERS
                    </h2>

                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2" style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#D4AF37 rgba(139, 69, 19, 0.3)'
                    }}>
                        {topHolders.length === 0 ? (
                            <div className="text-center py-12" style={{ color: '#FFE5B4', opacity: 0.6 }}>
                                Loading...
                            </div>
                        ) : (
                            topHolders.map((holder, index) => (
                                <motion.div
                                    layout
                                    key={holder.wallet}
                                    className="block rounded-xl p-4 transition-all duration-200"
                                    style={{
                                        background: 'rgba(212, 175, 55, 0.1)',
                                        border: '1px solid rgba(212, 175, 55, 0.3)'
                                    }}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                        {/* Wallet */}
                                        <div>
                                            <div className="text-xs text-cream-gold/60 mb-1">WALLET</div>
                                            <button
                                                onClick={() => copyToClipboard(holder.wallet)}
                                                className="text-sm font-mono font-semibold text-cream-gold hover:text-peach-gold transition-colors cursor-pointer"
                                                title="Click to copy"
                                            >
                                                {copiedAddress === holder.wallet ? '✓ Copied!' : formatWallet(holder.wallet)}
                                            </button>
                                        </div>

                                        {/* Balance */}
                                        <div>
                                            <div className="text-xs text-cream-gold/60 mb-1">BALANCE</div>
                                            <div className="text-sm font-bold text-green-400">
                                                {formatTokens(holder.balance)}
                                            </div>
                                        </div>

                                        {/* % of Supply */}
                                        <div>
                                            <div className="text-xs text-cream-gold/60 mb-1">% SUPPLY</div>
                                            <div className="text-sm font-bold" style={{ color: '#FFE5B4' }}>
                                                {holder.supplyPercent.toFixed(4)}%
                                            </div>
                                        </div>

                                        {/* First Buy */}
                                        <div>
                                            <div className="text-xs text-cream-gold/60 mb-1">FIRST BUY</div>
                                            {holder.firstBuyTime ? (
                                                <div className="text-sm font-semibold text-cream-gold">
                                                    {formatTime(holder.firstBuyTime)}
                                                </div>
                                            ) : (
                                                <div className="text-sm text-cream-gold/40">—</div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
