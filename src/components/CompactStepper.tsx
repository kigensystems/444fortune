import { motion } from 'framer-motion'

export function CompactStepper() {
    return (
        <motion.div
            className="mascot-frame rounded-3xl p-6 md:p-8 xl:p-10"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <h3 className="text-3xl md:text-4xl xl:text-5xl font-black mb-8 text-center" style={{
                color: '#FFE5B4',
                letterSpacing: '1px'
            }}>
                How It Works
            </h3>

            <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-black text-lg md:text-xl" style={{
                        background: 'linear-gradient(135deg, #FFE5B4 0%, #D4AF37 100%)',
                        color: '#8B0000',
                        boxShadow: '0 4px 0 #B8960B'
                    }}>
                        1
                    </div>
                    <div>
                        <h4 className="text-xl md:text-2xl font-black mb-2" style={{ color: '#FFE5B4' }}>
                            PURCHASE $FORTUNE
                        </h4>
                        <p className="text-base md:text-lg" style={{ color: '#F4E5C3', opacity: 0.9, lineHeight: '1.7' }}>
                            Wallet address, amount, and timestamp recorded
                        </p>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-black text-lg md:text-xl" style={{
                        background: 'linear-gradient(135deg, #FFE5B4 0%, #D4AF37 100%)',
                        color: '#8B0000',
                        boxShadow: '0 4px 0 #B8960B'
                    }}>
                        2
                    </div>
                    <div>
                        <h4 className="text-xl md:text-2xl font-black mb-2" style={{ color: '#FFE5B4' }}>
                            HOLD & WAIT
                        </h4>
                        <p className="text-base md:text-lg" style={{ color: '#F4E5C3', opacity: 0.9, lineHeight: '1.7' }}>
                            When timer expires a snapshot is taken: all holders, balances, and transaction times
                        </p>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-black text-lg md:text-xl" style={{
                        background: 'linear-gradient(135deg, #FFE5B4 0%, #D4AF37 100%)',
                        color: '#8B0000',
                        boxShadow: '0 4px 0 #B8960B'
                    }}>
                        3
                    </div>
                    <div>
                        <h4 className="text-xl md:text-2xl font-black mb-2" style={{ color: '#FFE5B4' }}>
                            RECEIVE YOUR FORTUNE
                        </h4>
                        <p className="text-base md:text-lg" style={{ color: '#F4E5C3', opacity: 0.9, lineHeight: '1.7' }}>
                            50% of all generated volume auto-distributed to 5 winners. Odds weighted by hold time and amount
                        </p>
                    </div>
                </div>
            </div>

            <p className="mt-6 text-sm md:text-base text-center italic" style={{ color: '#F4E5C3', opacity: 0.5, lineHeight: '1.6' }}>
                Entries = Minutes held × % of supply. Example: 1% for 15min = 15 entries, 2% for 20min = 40 entries
            </p>
        </motion.div>
    )
}
