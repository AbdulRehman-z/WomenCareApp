import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { ButterflySvg } from './Butterfly'

const SAGE = '#A7B7A0'
const GREEN = '#6F9468'
const PLUM = '#8B3F6B'
const BERRY = '#D97B54'
const BLUSH = '#F2B8C6'

// Gentle wave across a 1000-unit width; stretched to the viewport with non-scaling strokes.
const STEM = `M0 20 ${Array.from({ length: 10 }, (_, i) => `C${i * 100 + 30} ${i % 2 ? 30 : 10} ${i * 100 + 70} ${i % 2 ? 10 : 30} ${i * 100 + 100} 20`).join(' ')}`

type Bit = { t: number; kind: 'leaf' | 'berries' | 'blossom'; side: 1 | -1; color?: string; rot?: number }

// Same botanical vocabulary as the hero painting: sage and plum leaves, terracotta berry sprigs.
const BITS: Bit[] = [
  { t: 0.03, kind: 'leaf', side: -1, color: SAGE, rot: -34 }, { t: 0.06, kind: 'leaf', side: 1, color: GREEN, rot: 30 },
  { t: 0.1, kind: 'berries', side: -1 }, { t: 0.14, kind: 'leaf', side: 1, color: PLUM, rot: 34 },
  { t: 0.18, kind: 'leaf', side: -1, color: GREEN, rot: -30 }, { t: 0.23, kind: 'blossom', side: 1 },
  { t: 0.27, kind: 'leaf', side: -1, color: SAGE, rot: -34 }, { t: 0.31, kind: 'berries', side: 1 },
  { t: 0.35, kind: 'leaf', side: 1, color: PLUM, rot: 30 }, { t: 0.39, kind: 'leaf', side: -1, color: GREEN, rot: -28 },
  { t: 0.44, kind: 'blossom', side: -1 }, { t: 0.48, kind: 'leaf', side: 1, color: SAGE, rot: 32 },
  { t: 0.52, kind: 'berries', side: -1 }, { t: 0.56, kind: 'leaf', side: 1, color: GREEN, rot: 28 },
  { t: 0.6, kind: 'leaf', side: -1, color: PLUM, rot: -34 }, { t: 0.65, kind: 'blossom', side: 1 },
  { t: 0.69, kind: 'leaf', side: -1, color: SAGE, rot: -30 }, { t: 0.73, kind: 'berries', side: 1 },
  { t: 0.77, kind: 'leaf', side: 1, color: GREEN, rot: 32 }, { t: 0.81, kind: 'leaf', side: -1, color: PLUM, rot: -34 },
  { t: 0.86, kind: 'blossom', side: -1 }, { t: 0.9, kind: 'leaf', side: 1, color: SAGE, rot: 30 },
  { t: 0.94, kind: 'berries', side: -1 }, { t: 0.975, kind: 'blossom', side: 1 },
]

function Growth({ bit, p }: { bit: Bit; p: MotionValue<number> }) {
  const s = useTransform(p, [bit.t - 0.008, bit.t + 0.03], [0, 1])
  return (
    <div className="absolute top-1/2" style={{ left: `${bit.t * 100}%`, transform: bit.kind !== 'leaf' && bit.side === -1 ? 'scaleY(-1)' : undefined }}>
      <svg viewBox="0 0 48 30" className="absolute -translate-y-1/2 overflow-visible" width="28" height="22" aria-hidden>
        <motion.g style={{ scale: s, opacity: s, transformOrigin: '0px 15px' }}>
          {bit.kind === 'leaf' && (
            <g transform={`rotate(${bit.rot ?? 0} 0 15)`}>
              <path d="M0 15 C8 4 26 2 44 12 C28 28 10 26 0 15Z" fill={bit.color} />
              <path d="M2 15 C14 14 28 13 42 12" stroke="#fff" strokeOpacity=".35" strokeWidth="1.2" fill="none" />
            </g>
          )}
          {bit.kind === 'berries' && (
            <g>
              <path d="M0 15 C10 12 20 8 30 3" stroke={SAGE} strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <path d="M8 13 L14 22 M16 10 L24 17 M23 7 L31 13" stroke={SAGE} strokeWidth="1.2" strokeLinecap="round" fill="none" />
              {[[14, 23], [24, 18], [32, 14], [31, 3], [38, 8]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="3" fill={BERRY} />)}
            </g>
          )}
          {bit.kind === 'blossom' && (
            <g transform="translate(22 12)">
              <path d="M-22 3 C-14 8 -6 8 0 4" stroke={SAGE} strokeWidth="1.8" strokeLinecap="round" fill="none" />
              {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="0" cy="-6" rx="3.6" ry="6.4" fill={BLUSH} transform={`rotate(${a})`} />)}
              <circle r="3" fill="#F2B84B" />
            </g>
          )}
        </motion.g>
      </svg>
    </div>
  )
}

/** A painted vine grows across the top of every page as you scroll; a butterfly glides along it, flying right going down the page and left going back up. */
export function ScrollVine() {
  const { scrollYProgress, scrollY } = useScroll()
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.6 })
  const x = useTransform(p, (v) => `calc((100vw - 3.5rem) * ${v})`)
  const y = useTransform(p, (v) => Math.sin(v * 60) * 5)
  const [right, setRight] = useState(true)
  const last = useRef(0)
  useMotionValueEvent(scrollY, 'change', (v) => {
    if (Math.abs(v - last.current) > 1) setRight(v > last.current)
    last.current = v
  })

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-16 z-30 h-9">
      <svg viewBox="0 0 1000 40" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
        <path d={STEM} fill="none" stroke="var(--border)" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <motion.path d={STEM} fill="none" stroke={GREEN} strokeWidth="2.6" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ pathLength: p }} />
      </svg>
      {BITS.map((b) => <Growth key={b.t} bit={b} p={p} />)}
      <motion.div style={{ x, y }} className="absolute top-0.5 left-0 h-8 w-10">
        <motion.div className="butterfly !relative size-full" animate={{ rotate: right ? 84 : -84 }} transition={{ type: 'spring', stiffness: 60, damping: 12 }}>
          <ButterflySvg colors={['#D97B54', '#F2B84B']} />
        </motion.div>
      </motion.div>
    </div>
  )
}
