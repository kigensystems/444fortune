import { useTokenStream } from '../hooks/useTokenStream';

export function LiveStats() {
  const { connected, polling, snapshot, marketCap } = useTokenStream();

  // Note: The hook returns buyEvents (filtered) but LiveStats wants all events.
  // However, the hook also returns 'snapshot' which contains 'recentEvents' (all events) and 'metrics'.
  // Let's use the snapshot data if available.

  if (!snapshot) {
    return (
      <div className="p-6 text-center text-cream-gold">
        <div className="animate-pulse">Connecting to live tracker...</div>
      </div>
    );
  }

  const { activeTraderCount, metrics, recentEvents } = snapshot;

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Connection Status */}
      <div className="flex items-center gap-4 text-sm">
        <div className={`flex items-center gap-2 ${connected ? 'text-green-400' : 'text-red-400'}`}>
          <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-400' : 'bg-red-400'} ${connected ? 'animate-pulse' : ''}`} />
          {connected ? 'Live' : 'Disconnected'}
        </div>

        {polling && (
          <div className="text-yellow-400 text-xs">
            (Polling Mode)
          </div>
        )}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Traders */}
        <div className="mascot-frame p-6">
          <div className="text-sm text-cream-gold/70 mb-2">Active Traders (Live)</div>
          <div className="text-4xl font-bold text-cream-gold">
            {activeTraderCount.toLocaleString()}
          </div>
        </div>

        {/* Buy/Sell Ratio */}
        <div className="mascot-frame p-6">
          <div className="text-sm text-cream-gold/70 mb-2">Buy/Sell Ratio</div>
          <div className="text-4xl font-bold text-cream-gold">
            {metrics.buySellRatio.toFixed(2)}
          </div>
        </div>

        {/* Market Cap */}
        <div className="mascot-frame p-6">
          <div className="text-sm text-cream-gold/70 mb-2">Market Cap</div>
          <div className="text-4xl font-bold text-cream-gold">
            {marketCap ? `$${marketCap.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : 'N/A'}
          </div>
        </div>
      </div>

      {/* Volume & Trades */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1 Minute Stats */}
        <div className="mascot-frame p-6">
          <div className="text-lg font-bold text-cream-gold mb-4">1 Minute</div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-cream-gold/70">Volume USD:</span>
              <span className="text-cream-gold font-mono">
                ${metrics.volume1m.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-cream-gold/70">Trades:</span>
              <span className="text-cream-gold font-mono">
                {metrics.trades1m}
              </span>
            </div>
          </div>
        </div>

        {/* 20 Minute Stats */}
        <div className="mascot-frame p-6">
          <div className="text-lg font-bold text-cream-gold mb-4">20 Minutes</div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-cream-gold/70">Volume USD:</span>
              <span className="text-cream-gold font-mono">
                ${metrics.volume20m.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-cream-gold/70">Trades:</span>
              <span className="text-cream-gold font-mono">
                {metrics.trades20m}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Events */}
      <div className="mascot-frame p-6">
        <div className="text-lg font-bold text-cream-gold mb-4">Recent Activity</div>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {recentEvents.length === 0 ? (
            <div className="text-cream-gold/50 text-center py-4">
              No recent activity
            </div>
          ) : (
            recentEvents.slice().reverse().map((event: any) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-3 bg-dark-brown/30 rounded-lg hover:bg-dark-brown/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`text-xs font-bold px-2 py-1 rounded ${event.side === 'buy'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                      }`}
                  >
                    {event.side.toUpperCase()}
                  </div>
                  <div className="text-cream-gold">
                    ${event.amountUsd.toFixed(2)}
                  </div>
                </div>

                <a
                  href={`https://bscscan.com/tx/${event.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cream-gold/50 hover:text-cream-gold font-mono"
                >
                  {event.txHash.slice(0, 8)}...{event.txHash.slice(-6)}
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
