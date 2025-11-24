

interface MarqueeProps {
    text: string
}

export function Marquee({ text }: MarqueeProps) {
    const repetitions = Array.from({ length: 6 }, (_, i) => i)

    return (
        <div className="overflow-hidden whitespace-nowrap py-5 bg-marquee-gold">
            <div className="inline-block animate-marquee-slow">
                {repetitions.map(i => (
                    <span key={`a-${i}`} className="marquee-text">{text}</span>
                ))}
            </div>
            <div className="inline-block animate-marquee-slow">
                {repetitions.map(i => (
                    <span key={`b-${i}`} className="marquee-text">{text}</span>
                ))}
            </div>
        </div>
    )
}
