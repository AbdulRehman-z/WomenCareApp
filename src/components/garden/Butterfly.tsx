import { useEffect, useRef } from 'react'
import type { MotionValue } from 'motion/react'

type Pointer = { x: MotionValue<number>; y: MotionValue<number> }

/** The flapping butterfly drawing; flap speed comes from the `.butterfly .wing` CSS. */
export function ButterflySvg({ colors }: { colors: [string, string] }) {
  return (
    <svg viewBox="0 0 40 32" className="size-full overflow-visible" aria-hidden>
        {[false, true].map((mirror) => (
          <g key={String(mirror)} transform={mirror ? 'translate(40 0) scale(-1 1)' : undefined}>
            <g className="wing">
              <path d="M20 15 C12 1 0 3 3 12 C4 17 14 18 20 16Z" fill={colors[0]} />
              <path d="M20 17 C13 18 5 21 8 27 C11 31 18 24 20 18Z" fill={colors[1]} />
              <circle cx="9" cy="9" r="2" fill="#fff" opacity=".55" />
            </g>
          </g>
        ))}
        <ellipse cx="20" cy="16" rx="1.6" ry="8" fill="#3A2430" />
        <path d="M19.5 8 C17 3 15 3 14 2 M20.5 8 C23 3 25 3 26 2" stroke="#3A2430" strokeWidth=".8" fill="none" strokeLinecap="round" />
      </svg>
  )
}

const AVOID = 150
const rand = (a: number, b: number) => a + Math.random() * (b - a)

/** Butterfly that wanders to random waypoints inside its parent and is pushed away by the cursor. */
export function Butterfly({ colors, pointer, className = '', variant }: { colors: [string, string]; pointer: Pointer; className?: string; variant?: 'a' | 'b' | 'c' }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    const box = el?.parentElement
    if (!el || !box) return
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let width = box.clientWidth
    let height = box.clientHeight
    let bounds = box.getBoundingClientRect()
    let boundsDirty = false
    const W = () => width
    const H = () => height
    const invalidateBounds = () => { boundsDirty = true }
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width
      height = entry.contentRect.height
      invalidateBounds()
    })
    resize.observe(box)
    window.addEventListener('scroll', invalidateBounds, { passive: true })
    const unsubscribeX = pointer.x.on('change', invalidateBounds)
    const unsubscribeY = pointer.y.on('change', invalidateBounds)
    const pos = { x: rand(30, W() - 70), y: rand(40, H() - 60) }
    const vel = { x: 0, y: 0 }
    let target = { x: pos.x, y: pos.y }
    let retarget = 0
    let angle = 0
    const speed = rand(55, 95) * (variant === 'c' ? 0.85 : 1)
    const phase = rand(0, 6.28)
    const pick = (awayFrom?: { x: number; y: number }) => {
      for (let k = 0; k < 8; k++) {
        const t = { x: rand(20, W() - 60), y: rand(30, H() - 50) }
        if (!awayFrom || Math.hypot(t.x - awayFrom.x, t.y - awayFrom.y) > AVOID * 1.4) {
          target = t
          break
        }
      }
      retarget = rand(2.5, 6)
    }
    pick()

    let last = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      retarget -= dt
      const dx = target.x - pos.x
      const dy = target.y - pos.y
      const dist = Math.hypot(dx, dy) || 1
      if (dist < 35 || retarget <= 0) pick()
      const t = now / 1000
      const flutter = Math.sin(t * 3 + phase) * 38
      const desX = (dx / dist) * speed + (-dy / dist) * flutter
      const desY = (dy / dist) * speed + (dx / dist) * flutter + Math.cos(t * 2.3 + phase) * 16
      vel.x += (desX - vel.x) * Math.min(1, 2.2 * dt)
      vel.y += (desY - vel.y) * Math.min(1, 2.2 * dt)

      if (boundsDirty) {
        bounds = box.getBoundingClientRect()
        boundsDirty = false
      }
      const px = pointer.x.get() - bounds.left - 20
      const py = pointer.y.get() - bounds.top - 16
      const pd = Math.hypot(pos.x - px, pos.y - py)
      if (pd < AVOID) {
        const f = (1 - pd / AVOID) ** 1.5
        vel.x += ((pos.x - px) / (pd || 1)) * f * 900 * dt
        vel.y += ((pos.y - py) / (pd || 1)) * f * 900 * dt
        if (pd < AVOID * 0.6 && retarget > 1) pick({ x: px, y: py })
      }

      pos.x += vel.x * dt
      pos.y += vel.y * dt
      pos.x = Math.min(W() - 40, Math.max(0, pos.x))
      pos.y = Math.min(H() - 32, Math.max(0, pos.y))
      if (Math.hypot(vel.x, vel.y) > 8) {
        const want = (Math.atan2(vel.x, -vel.y) * 180) / Math.PI
        let diff = want - angle
        diff = ((diff + 540) % 360) - 180
        angle += diff * Math.min(1, 5 * dt)
      }
      el.style.transform = `translate(${pos.x}px, ${pos.y}px) rotate(${angle}deg)`
      raf = requestAnimationFrame(tick)
    }
    el.style.transform = `translate(${pos.x}px, ${pos.y}px)`
    let visible = false
    const syncPlayback = () => {
      cancelAnimationFrame(raf)
      const running = visible && !document.hidden && !motion.matches
      el.dataset.paused = String(!running)
      if (running) {
        last = performance.now()
        invalidateBounds()
        raf = requestAnimationFrame(tick)
      }
    }
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      syncPlayback()
    })
    visibility.observe(box)
    document.addEventListener('visibilitychange', syncPlayback)
    motion.addEventListener('change', syncPlayback)
    return () => {
      cancelAnimationFrame(raf)
      resize.disconnect()
      visibility.disconnect()
      unsubscribeX()
      unsubscribeY()
      window.removeEventListener('scroll', invalidateBounds)
      document.removeEventListener('visibilitychange', syncPlayback)
      motion.removeEventListener('change', syncPlayback)
    }
  }, [pointer.x, pointer.y, variant])

  return (
    <div ref={ref} className={`butterfly left-0 top-0 ${className}`} aria-hidden>
      <ButterflySvg colors={colors} />
    </div>
  )
}
