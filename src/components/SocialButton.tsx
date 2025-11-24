import { motion } from 'framer-motion'

interface SocialButtonProps {
    icon: any
    href: string
    label: string
}

export function SocialButton({ icon: Icon, href, label }: SocialButtonProps) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl social-button-3d"
            whileHover={{
                y: 2,
                boxShadow: '0 4px 0 #B8960B, 0 8px 12px rgba(0, 0, 0, 0.3)'
            }}
            whileTap={{
                y: 4,
                boxShadow: '0 2px 0 #B8960B, 0 4px 8px rgba(0, 0, 0, 0.3)'
            }}
            aria-label={label}
        >
            <Icon />
        </motion.a>
    )
}
