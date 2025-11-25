import { useEffect, useState, useRef } from 'react'
import { TokenStreamSnapshot, TokenEvent, TopHolder, TokenMetrics } from '../types'
import { MockTokenStream } from '../services/MockTokenStream'

interface UseTokenStreamResult {
    connected: boolean
    polling: boolean
    marketCap: number | null
    fortunePool: number | null
    buyEvents: TokenEvent[]
    topHolders: TopHolder[]
    metrics: TokenMetrics | null
    snapshot: TokenStreamSnapshot | null
    recentEvents: TokenEvent[]
    startTime: number | null
    startSimulation: (startTime?: number) => void
}

export function useTokenStream(): UseTokenStreamResult {
    const [connected, setConnected] = useState(false)
    const [polling, setPolling] = useState(false)
    const [snapshot, setSnapshot] = useState<TokenStreamSnapshot | null>(null)
    const [marketCap, setMarketCap] = useState<number | null>(null)
    const [fortunePool, setFortunePool] = useState<number | null>(null)
    const [buyEvents, setBuyEvents] = useState<TokenEvent[]>([])
    const [topHolders, setTopHolders] = useState<TopHolder[]>([])
    const [metrics, setMetrics] = useState<TokenMetrics | null>(null)
    const [recentEvents, setRecentEvents] = useState<TokenEvent[]>([])
    const [startTime, setStartTime] = useState<number | null>(null)

    const streamRef = useRef<MockTokenStream | null>(null)

    const startSimulation = (startTime?: number) => {
        if (streamRef.current) {
            streamRef.current.start(startTime)
        }
    }

    useEffect(() => {
        // Always use MockTokenStream for demo purposes
        const stream = new MockTokenStream()
        streamRef.current = stream

        stream.on('connected', () => {
            setConnected(true)
        })

        stream.on('disconnected', () => {
            setConnected(false)
        })

        stream.on('polling_mode', ({ active }: { active: boolean }) => {
            setPolling(active)
        })

        const handleSnapshot = (data: TokenStreamSnapshot) => {
            setSnapshot(data)
            setMarketCap(data.marketCap)
            setFortunePool(data.fortunePool)
            setMetrics(data.metrics || null)
            setRecentEvents(data.recentEvents)

            // Filter and set buy events only
            const buys = data.recentEvents.filter((event: TokenEvent) => event.side === 'buy')
            setBuyEvents(buys)

            // Set top holders
            setTopHolders(data.topHolders || [])
        }

        stream.on('snapshot', handleSnapshot)
        stream.on('update', handleSnapshot)

        stream.on('event', () => {
            // For individual events, we might want to append to state locally for smoother UI
            // But for now, we rely on the snapshot/update events which MockStream sends frequently
        })

        stream.connect()

        // Poll for global simulation state
        const checkGlobalState = async () => {
            try {
                // In development, we might need the full URL if running on different ports
                // But usually /api/simulation works if proxied or same origin
                // For local dev without netlify dev, this might fail, so we catch it.
                const res = await fetch('/.netlify/functions/simulation')
                if (res.ok) {
                    const data = await res.json()
                    if (data.isRunning && data.startTime) {
                        // Only start if not already started or if start time differs significantly (> 2s)
                        const currentStartTime = stream.getStartTime()
                        const diff = Math.abs(data.startTime - (currentStartTime || 0))

                        if (!currentStartTime || diff > 2000) {
                            console.log('[useTokenStream] Syncing simulation to', data.startTime)
                            stream.start(data.startTime)
                            setStartTime(data.startTime)
                        }
                    }
                }
            } catch (e) {
                console.warn('Failed to check global simulation state:', e)
            }
        }

        // Check immediately and then every 5 seconds
        checkGlobalState()
        const pollInterval = setInterval(checkGlobalState, 5000)

        return () => {
            clearInterval(pollInterval)
            stream.disconnect()
        }
    }, [])

    return {
        connected,
        polling,
        marketCap,
        fortunePool,
        buyEvents,
        topHolders,
        metrics,
        snapshot,
        recentEvents,
        startTime,
        startSimulation
    }
}
