import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

const pr = (origin: string, transform: string): CSSProperties => ({ transformOrigin: origin, transform })

/** Line-and-fill botanicals that bloom when the parent `.group` is hovered or focused. */
function Lotus() {
  return (
    <>
      <path className="stem" d="M32 78 C32 66 32 60 32 54" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <g className="head">
        {[-64, -32, 0, 32, 64].map((a) => (
          <ellipse key={a} className="petal" cx="32" cy="38" rx="7.5" ry="16" fill="currentColor" opacity={a === 0 ? 0.95 : 0.6} style={pr('32px 54px', `rotate(calc(var(--s) * ${a}deg))`)} />
        ))}
      </g>
    </>
  )
}
function Fern() {
  return (
    <g className="sway-on-hover" style={{ transformOrigin: '32px 78px' }}>
      <path className="stem" d="M32 78 C30 56 36 36 32 10" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <ellipse className="petal" cx={24 - i * 0.4} cy={66 - i * 10} rx="9" ry="3.2" fill="currentColor" opacity=".7" style={pr(`32px ${66 - i * 10}px`, `rotate(${-28 - i * 2}deg) scale(calc(.4 + var(--s) * ${0.9 - i * 0.1}))`)} />
          <ellipse className="petal" cx={40 + i * 0.4} cy={66 - i * 10} rx="9" ry="3.2" fill="currentColor" opacity=".7" style={pr(`32px ${66 - i * 10}px`, `rotate(${28 + i * 2}deg) scale(calc(.4 + var(--s) * ${0.9 - i * 0.1}))`)} />
        </g>
      ))}
    </g>
  )
}
function Sunflower() {
  return (
    <>
      <path className="stem" d="M32 78 C32 66 32 56 32 44" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M32 66 C22 64 18 58 18 54 C26 54 31 58 32 66Z" fill="currentColor" opacity=".6" />
      <g className="head">
        {Array.from({ length: 12 }, (_, i) => (
          <ellipse key={i} className="petal" cx="32" cy="14" rx="3.6" ry="9" fill="currentColor" opacity={i % 2 ? 0.55 : 0.85} style={pr('32px 28px', `rotate(${i * 30}deg) scaleY(calc(.5 + var(--s) * .5))`)} />
        ))}
        <circle cx="32" cy="28" r="8" fill="currentColor" />
        <circle cx="32" cy="28" r="4" fill="var(--cat-bg)" opacity=".5" />
      </g>
    </>
  )
}
function Sprig() {
  return (
    <g className="sway-on-hover" style={{ transformOrigin: '32px 78px' }}>
      <path className="stem" d="M32 78 C34 60 30 40 32 14" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {[[62, -1], [48, 1], [34, -1], [22, 1]].map(([y, d], i) => (
        <path key={i} className="petal" d="M0 0 C8 -10 20 -8 24 0 C18 8 6 8 0 0Z" fill="currentColor" opacity={0.55 + i * 0.1} style={pr('0 0', `translate(32px, ${y}px) scaleX(${d}) rotate(-24deg) scale(calc(.35 + var(--s) * .75))`)} />
      ))}
      <circle cx="32" cy="12" r="5" fill="currentColor" style={pr('32px 12px', 'scale(calc(.4 + var(--s) * .6))')} />
    </g>
  )
}
function Lavender() {
  return (
    <g className="sway-on-hover" style={{ transformOrigin: '32px 78px' }}>
      <path className="stem" d="M32 78 C32 60 32 40 32 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
      {Array.from({ length: 7 }, (_, i) => (
        <g key={i}>
          <ellipse className="petal" cx="27" cy={50 - i * 5.5} rx="4.5" ry="2.8" fill="currentColor" opacity={0.55 + (i % 2) * 0.25} style={pr(`32px ${50 - i * 5.5}px`, `rotate(-30deg) scale(calc(.3 + var(--s) * .7))`)} />
          <ellipse className="petal" cx="37" cy={53 - i * 5.5} rx="4.5" ry="2.8" fill="currentColor" opacity={0.55 + ((i + 1) % 2) * 0.25} style={pr(`32px ${53 - i * 5.5}px`, `rotate(30deg) scale(calc(.3 + var(--s) * .7))`)} />
        </g>
      ))}
      <ellipse cx="32" cy="14" rx="3.4" ry="5" fill="currentColor" />
    </g>
  )
}
function Daisy() {
  return (
    <>
      <path className="stem" d="M32 78 C30 66 33 54 32 42" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <g className="head">
        {Array.from({ length: 10 }, (_, i) => (
          <ellipse key={i} className="petal" cx="32" cy="22" rx="4" ry="10" fill="currentColor" opacity={i % 2 ? 0.5 : 0.8} style={pr('32px 34px', `rotate(${i * 36}deg) scaleY(calc(.5 + var(--s) * .5))`)} />
        ))}
        <circle cx="32" cy="34" r="6.5" fill="#F2B84B" />
      </g>
    </>
  )
}

const ICONS: Record<string, () => React.ReactElement> = { pregnancy: Lotus, pain: Fern, exercise: Sunflower, nutrition: Sprig, emotional: Lavender, baby: Daisy }

export function Botanical({ kind, className }: { kind: string; className?: string }) {
  const Icon = ICONS[kind]
  if (!Icon) return null
  return (
    <svg viewBox="0 0 64 80" aria-hidden className={cn('bloom pointer-events-none text-cat-ink', className)}>
      <Icon />
    </svg>
  )
}
