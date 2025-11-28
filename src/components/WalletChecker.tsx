import { useState } from 'react'

interface WalletCheckerProps {
    onStartSimulation?: () => void
}

export function WalletChecker({ onStartSimulation }: WalletCheckerProps) {
    const [walletInput, setWalletInput] = useState('')
    const [isActivated, setIsActivated] = useState(false)
    const [oddsResult, setOddsResult] = useState<string | null>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWalletInput(e.target.value)
        setOddsResult(null) // Clear odds when typing
    }

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const input = walletInput.trim()

            // Ignore empty input
            if (!input) return

            // Secret Command
            if (input.toUpperCase() === 'FORTUNE444' && !isActivated) {
                setIsActivated(true)
                setOddsResult(null)
                setWalletInput('') // Clear input
                try {
                    const res = await fetch('/.netlify/functions/simulation', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ secret: 'FORTUNE444' })
                    })

                    if (res.ok) {
                        if (onStartSimulation) {
                            onStartSimulation()
                        }
                    } else {
                        console.error('Failed to start simulation globally')
                        setIsActivated(false)
                    }
                } catch (err) {
                    console.error('Error starting simulation:', err)
                    setIsActivated(false)
                }
                return
            }

            // BNB Address Validation (Starts with 0x, 42 chars total, hex only)
            const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(input)

            if (isValidAddress) {
                // Generate random odds (0.00% - 10.00%)
                const chance = (Math.random() * 10).toFixed(2)
                setOddsResult(`You currently have a ${chance}% chance of winning the fortune`)
                setWalletInput('') // Clear input after successful check
            } else {
                // Invalid address - don't clear, let user fix it
                setOddsResult('Please enter a valid wallet address')
            }
        }
    }

    return (
        <div className="mt-8 pt-8 border-t border-white/10">
            <h4 className="text-lg md:text-xl font-bold mb-4 text-center" style={{ color: '#FFE5B4' }}>
                Check Your Odds
            </h4>
            <div className="relative flex flex-col items-center gap-4">
                <input
                    type="text"
                    value={walletInput}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter wallet address..."
                    className="w-full px-6 py-4 rounded-xl text-lg outline-none transition-all duration-300"
                    style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        color: '#F4E5C3',
                        boxShadow: 'none'
                    }}
                />

                {oddsResult && (
                    <div
                        className="text-lg md:text-xl font-bold mt-2 text-cream-gold font-casino text-center"
                        style={{
                            textShadow: '1px 1px 0 #8B4513, 2px 2px 4px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        {oddsResult}
                    </div>
                )}
            </div>
        </div>
    )
}
