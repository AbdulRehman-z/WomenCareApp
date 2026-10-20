import { motion } from 'motion/react'

/** Empty-state illustration: a watering can tips and a sprout grows from the pot, on a loop. */
export function Sprout({ className }: { className?: string }) {
  const loop = { duration: 5, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' as const }
  return (
    <svg viewBox="0 0 220 200" aria-hidden className={className}>
      <ellipse cx="110" cy="188" rx="58" ry="7" fill="#000" opacity=".1" />
      <motion.g animate={{ rotate: [0, -22, -22, 0] }} transition={{ ...loop, times: [0, 0.2, 0.75, 1] }} style={{ transformOrigin: '60px 70px' }}>
        <path d="M30 56 h42 l-4 32 h-34Z" fill="#A7B7A0" />
        <path d="M72 62 C84 62 92 70 100 80 l-5 3 C88 76 80 72 72 72Z" fill="#8FA288" />
        <path d="M30 60 C22 60 20 74 30 76" stroke="#8FA288" strokeWidth="5" fill="none" strokeLinecap="round" />
        <rect x="28" y="52" width="46" height="6" rx="3" fill="#8FA288" />
      </motion.g>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.ellipse key={i} cx={100 + (i % 2) * 6} cy="84" rx="1.8" ry="3.4" fill="#7FA6D6" opacity=".8"
          animate={{ y: [0, 80], opacity: [0, 0.9, 0] }} transition={{ ...loop, delay: 1 + i * 0.18, duration: 1.1, repeatDelay: 5.4 - i * 0.18 }} />
      ))}
      <path d="M84 150 h52 l-7 34 h-38Z" fill="#D97B54" />
      <rect x="80" y="144" width="60" height="10" rx="4" fill="#C9694A" />
      <motion.path d="M110 144 C110 128 108 118 112 104" stroke="#6F9468" strokeWidth="4" fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 0, 1, 1, 0] }} transition={{ ...loop, duration: 6, times: [0, 0.25, 0.55, 0.95, 1], repeatDelay: 0.5 }} />
      {[{ x: 111, y: 118, r: -150 }, { x: 112, y: 106, r: -20 }].map((l, i) => (
        <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.r})`}>
          <motion.path d="M0 0 C8 -12 22 -10 26 0 C18 10 6 10 0 0Z" fill="#86A97E"
            animate={{ scale: [0, 0, 1, 1, 0] }} transition={{ ...loop, duration: 6, times: [0, 0.45 + i * 0.1, 0.65 + i * 0.1, 0.95, 1], repeatDelay: 0.5 }} style={{ transformOrigin: '0px 0px' }} />
        </g>
      ))}
    </svg>
  )
}
