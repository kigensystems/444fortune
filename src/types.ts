export interface TokenMetrics {
    volume1m: number;
    volume20m: number;
    trades1m: number;
    trades20m: number;
    buyVolume: number;
    sellVolume: number;
    buySellRatio: number;
}

export interface TokenEvent {
    id: string;
    type: 'swap';
    txHash: string;
    blockNumber: number;
    timestamp: number;
    side: 'buy' | 'sell';
    amount: number;
    amountUsd: number;
    price: number;
    account: string;
}

export interface TopHolder {
    wallet: string;
    balance: number;
    supplyPercent: number;
    firstBuyTxHash: string | null;
    firstBuyTime: number | null;
}

export interface TokenStreamSnapshot {
    tokenCA: string | null;
    tokenSymbol: string | null;
    tokenName: string | null;
    marketCap: number | null;
    fortunePool: number;
    tokenPrice: number | null;
    lastTradeTimestamp: number | null;
    metrics: TokenMetrics;
    activeTraderCount: number;
    recentEvents: TokenEvent[];
    topHolders: TopHolder[];
}
