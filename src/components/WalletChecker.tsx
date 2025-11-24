import { useState } from 'react'

interface WalletCheckerProps {
    onStartSimulation?: () => void
}

export function WalletChecker({ onStartSimulation }: WalletCheckerProps) {
    const [walletInput, setWalletInput] = useState('')
    const [isActivated, setIsActivated] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWalletInput(e.target.value)
    }

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (walletInput.toUpperCase() === 'FORTUNE444' && !isActivated) {
                setIsActivated(true)
                try {
                    const res = await fetch('/.netlify/functions/simulation', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ secret: 'FORTUNE444' })
                    })

                    if (res.ok) {
                        // Success! The polling in useTokenStream will pick this up.
                        // We can also call onStartSimulation immediately for instant feedback if desired,
                        // but let's rely on the global sync to be sure.
                        // Actually, calling onStartSimulation locally gives better UX feedback.
                        if (onStartSimulation) {
                            onStartSimulation()
                        }
                    } else {
                        console.error('Failed to start simulation globally')
                        setIsActivated(false) // Allow retry
                    }
                } catch (err) {
                    console.error('Error starting simulation:', err)
                    setIsActivated(false)
                }
            }
        }
    }

    return (
        <div className="mt-8 pt-8 border-t border-white/10">
            <h4 className="text-lg md:text-xl font-bold mb-4 text-center" style={{ color: '#FFE5B4' }}>
                Check Your Odds
            </h4>
            <div className="relative">
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
            </div>
        </div>
    )
}
