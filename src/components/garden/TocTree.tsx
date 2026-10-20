import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ButterflySvg } from './Butterfly'

type Item = { id: string; label: string; n: number }

const PETALS = ['#E58AA8', '#E58A62', '#B58AD0', '#F2B84B', '#7FB59A']
const WOOD = 'color-mix(in oklab, var(--cat-ink) 45%, #7A5A3C)'
const SPRING = { type: 'spring', stiffness: 160, damping: 14 } as const

function Flower({ n, color, reached }: { n: number; color: string; reached: boolean }) {
  return (
    <svg viewBox="-22 -22 44 44" className="absolute top-0 left-0 size-16 overflow-visible" aria-hidden>
      <motion.g initial={false} animate={reached ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }} transition={SPRING} style={{ transformBox: 'fill-box', transformOrigin: '50% 50%' }}>
        {reached ? (
          <>
            {Array.from({ length: 6 }, (_, i) => (
              <g key={i} transform={`rotate(${i * 60})`}>
                <motion.ellipse
                  cx="0"
                  cy="-9.5"
                  rx="5.6"
                  ry="9"
                  fill={color}
                  opacity={i % 2 ? 0.78 : 1}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ ...SPRING, delay: i * 0.05 }}
                  style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
                />
              </g>
            ))}
            <circle r="8.4" fill="#FFF3D0" />
          </>
        ) : (
          <>
            <circle r="9" fill="var(--muted)" />
            <path d="M0 -9 C-4 -4 -4 4 0 9 C4 4 4 -4 0 -9Z" fill="var(--border)" />
          </>
        )}
        <text textAnchor="middle" dy="3.4" fontSize="10" fontWeight="700" fill={reached ? '#6B2E59' : 'var(--muted-foreground)'}>{n}</text>
      </motion.g>
    </svg>
  )
}

/** Stepper as a root that grows down the page: wood thickens between steps, rootlets sprout and a flower blooms on each step reached. */
export function TocTree({ items, activeId }: { items: Item[]; activeId: string }) {
  const activeIndex = Math.max(0, items.findIndex((s) => s.id === activeId))
  const rootsOut = activeIndex >= items.length - 1
  const ol = useRef<HTMLOListElement>(null)
  const [tops, setTops] = useState<number[]>([])
  const [flying, setFlying] = useState(false)

  useLayoutEffect(() => {
    const el = ol.current
    if (!el) return
    const measure = () => setTops(Array.from(el.children).filter((c) => c.tagName === 'LI').map((c) => (c as HTMLElement).offsetTop))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [items.length])

  return (
    <ol ref={ol} className="relative">
      {tops.length > 0 && (
        <motion.div
          aria-hidden
          className={`butterfly pointer-events-none absolute top-0 left-0 z-10 h-10 w-[3.2rem] ${flying ? '' : 'butterfly-sit'}`}
          initial={false}
          animate={{ y: tops[activeIndex] + 6, x: [24, 62, 24] }}
          transition={{ y: { duration: 1.1, ease: 'easeInOut' }, x: { duration: 1.1, times: [0, 0.5, 1], ease: 'easeInOut' } }}
          onAnimationStart={() => setFlying(true)}
          onAnimationComplete={() => setFlying(false)}
          style={{ rotate: -14 }}
        >
          <ButterflySvg colors={['#D97B54', '#F2B84B']} />
        </motion.div>
      )}
      {items.map((s, i) => {
        const reached = i <= activeIndex
        const grown = i < activeIndex
        const last = i === items.length - 1
        const side = i % 2 ? -1 : 1
        const color = PETALS[i % PETALS.length]
        return (
          <li key={s.id} className={`relative flex gap-2 pb-3 ${last ? 'pb-32' : ''}`}>
            <div className="relative w-16 shrink-0">
              {!last && (
                <svg viewBox="0 0 64 100" preserveAspectRatio="none" className="absolute top-8 left-0 h-full w-16 overflow-visible" aria-hidden>
                  <path d="M32 0 C25 28 39 44 32 52 S25 82 32 100" fill="none" stroke="var(--border)" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                  <motion.path d="M32 0 C25 28 39 44 32 52 S25 82 32 100" fill="none" stroke={WOOD} strokeWidth="9" strokeLinecap="round" vectorEffect="non-scaling-stroke" initial={false} animate={{ pathLength: grown ? 1 : 0 }} transition={{ duration: 0.7, ease: 'easeInOut' }} />
                </svg>
              )}
              {!last && (
                <svg viewBox="0 0 64 100" className="absolute top-0 left-0 h-[100px] w-16 overflow-visible" aria-hidden>
                  <motion.g initial={false} animate={{ opacity: grown ? 1 : 0, pathLength: grown ? 1 : 0 }} transition={{ duration: 0.8, delay: 0.3 }} transform={side === -1 ? 'translate(64 0) scale(-1 1)' : undefined}>
                    <path d="M34 50 C46 52 55 60 58 74" fill="none" stroke={WOOD} strokeWidth="3.4" strokeLinecap="round" />
                    <path d="M58 74 L63 83 M58 74 L53 84" fill="none" stroke={WOOD} strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M43 53 C47 43 56 42 60 45 C57 52 50 55 43 53Z" fill="var(--sage)" />
                  </motion.g>
                </svg>
              )}
              {last && (
                <svg viewBox="0 0 64 100" className="absolute top-8 left-0 h-24 w-16 overflow-visible" aria-hidden>
                  {[
                    'M32 0 C30 20 20 34 4 52 M4 52 L-6 57 M4 52 L-1 63',
                    'M32 0 C34 22 32 42 34 66 M34 66 L27 80 M34 66 L41 80',
                    'M32 0 C36 18 50 30 68 46 M68 46 L78 49 M68 46 L73 60',
                  ].map((d, k) => (
                    <motion.path key={k} d={d} fill="none" stroke={WOOD} strokeWidth={k === 1 ? 7 : 5} strokeLinecap="round" initial={false} animate={{ pathLength: rootsOut ? 1 : 0.12, opacity: rootsOut ? 1 : 0.35 }} transition={{ duration: 1.1, delay: k * 0.15, ease: 'easeOut' }} />
                  ))}
                </svg>
              )}
              <Flower n={s.n} color={color} reached={reached} />
            </div>
            <a href={`#${s.id}`} className={`flex min-h-16 min-w-0 flex-1 items-center self-start rounded-xl px-2.5 text-sm leading-5 transition ${i === activeIndex ? 'bg-cat-bg font-semibold text-cat-ink' : 'text-muted-foreground hover:text-foreground'}`}>
              {s.label}
            </a>
          </li>
        )
      })}
    </ol>
  )
}
