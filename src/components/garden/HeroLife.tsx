import { useEffect } from 'react'
import { useMotionValue } from 'motion/react'
import { Butterfly } from './Butterfly'

const LEAF = 'M0 0 C5 -6 11 -5 13 0 C9 6 3 6 0 0Z'
const LEAVES = [[70, 40, 34, 0, 12], [180, 20, -30, 4, 14], [290, 60, 28, 8, 13]]

/** Light life over the painted hero: butterflies that dodge the cursor, birds and drifting leaves. The art itself is untouched. */
export function HeroLife() {
  const px = useMotionValue(-999)
  const py = useMotionValue(-999)
  useEffect(() => {
    const move = (e: PointerEvent) => (px.set(e.clientX), py.set(e.clientY))
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [px, py])
  return (
    <div className="scene arch pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        {[[30, 1.5, 0], [60, 1.1, -0.15]].map(([y, s, d], i) => (
          <g key={i} transform={`translate(0 ${y})`} className="birds">
            <g className="bird-fly" style={{ animationDelay: `${-5 + i * 0.8}s` }}>
              <g transform={`scale(${s})`}>
                <g className="bird-flap" style={{ animationDelay: `${d}s` }}>
                  <path d="M0 0 Q6 -7 12 0 Q18 -7 24 0" stroke="#3A2430" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                </g>
              </g>
            </g>
          </g>
        ))}
        {LEAVES.map(([x, y, dx, d, t], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <path className="leaf-fall" d={LEAF} fill="#8FAE86" style={{ ['--dx' as string]: `${dx}px`, animationDelay: `${d}s`, animationDuration: `${t}s` }} />
          </g>
        ))}
      </svg>
      <div className="butterflies absolute inset-0">
        <Butterfly variant="a" colors={['#D97B54', '#F2B84B']} pointer={{ x: px, y: py }} />
        <Butterfly variant="b" colors={['#C26AA3', '#F2B8C6']} pointer={{ x: px, y: py }} className="scale-90" />
        <Butterfly variant="c" colors={['#7FA6D6', '#C9DCF2']} pointer={{ x: px, y: py }} className="scale-75" />
      </div>
    </div>
  )
}
