import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const PETALS = Array.from({ length: 10 }, (_, i) => ({ a: (i / 10) * Math.PI * 2 + 0.3, d: 26 + (i % 3) * 8, c: ['#F2B8C6', '#E58A62', '#C99BD0', '#F6D3C0'][i % 4] }))

/** Bursts petals each time `active` flips to true. */
export function PetalBurst({ active }: { active: boolean }) {
  const prev = useRef(active)
  const [n, setN] = useState(0)
  useEffect(() => {
    if (active && !prev.current) setN((v) => v + 1)
    prev.current = active
  }, [active])
  return (
    <span className="pointer-events-none absolute inset-0 grid place-items-center" aria-hidden>
      <AnimatePresence>
        {n > 0 &&
          PETALS.map((p, i) => (
            <motion.span
              key={`${n}-${i}`}
              initial={{ x: 0, y: 0, scale: 0.4, opacity: 1, rotate: 0 }}
              animate={{ x: Math.cos(p.a) * p.d, y: Math.sin(p.a) * p.d + 10, scale: 1, opacity: 0, rotate: 200 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute h-2 w-3.5 rounded-full"
              style={{ background: p.c }}
            />
          ))}
      </AnimatePresence>
    </span>
  )
}
