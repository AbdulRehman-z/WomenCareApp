import { useEffect, useRef } from 'react'
import { usePhase } from '@/hooks/use-phase'

const COLORS = ['#F2B8C6', '#E9A0B4', '#F6D3C0', '#E58A62', '#C99BD0']

type Petal = { x: number; y: number; r: number; rot: number; vr: number; vx: number; vy: number; wob: number; wp: number; color: string; alpha: number; life: number }

const rand = (a: number, b: number) => a + Math.random() * (b - a)

function PetalField() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const make = (y = -20): Petal => ({ x: rand(-20, w), y, r: rand(4, 8), rot: rand(0, 6.28), vr: rand(-0.02, 0.02), vx: rand(0.2, 0.7), vy: rand(0.35, 0.9), wob: rand(10, 28), wp: rand(0, 6.28), color: COLORS[(Math.random() * COLORS.length) | 0], alpha: rand(0.35, 0.65), life: -1 })
    const count = w < 700 ? 8 : 16
    const petals: Petal[] = Array.from({ length: count }, () => make(rand(-h, h)))
    const trail: Petal[] = []

    let last = 0
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const now = performance.now()
      if (now - last < 45) return
      last = now
      trail.push({ x: e.clientX + rand(-6, 6), y: e.clientY + rand(-6, 6), r: rand(3, 5.5), rot: rand(0, 6.28), vr: rand(-0.08, 0.08), vx: rand(-0.4, 0.4), vy: rand(0.2, 0.8), wob: 0, wp: 0, color: COLORS[(Math.random() * COLORS.length) | 0], alpha: 0.8, life: 1 })
      if (trail.length > 40) trail.shift()
    }
    const fine = window.matchMedia('(pointer: fine)').matches
    if (fine) window.addEventListener('pointermove', onMove, { passive: true })

    const draw = (p: Petal, t: number) => {
      ctx.save()
      ctx.translate(p.x + (p.life < 0 ? Math.sin(t / 1400 + p.wp) * p.wob : 0), p.y)
      ctx.rotate(p.rot)
      ctx.scale(1, 0.55 + 0.45 * Math.cos(t / 900 + p.wp))
      ctx.globalAlpha = p.alpha * (p.life < 0 ? 1 : p.life)
      ctx.fillStyle = p.color
      ctx.beginPath()
      ctx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, 6.283)
      ctx.fill()
      ctx.restore()
    }

    let raf = 0
    let lastFrame = 0
    const tick = (t: number) => {
      const elapsed = t - lastFrame
      if (elapsed < 1000 / 30) {
        raf = requestAnimationFrame(tick)
        return
      }
      const step = Math.min(elapsed, 100) / (1000 / 60)
      lastFrame = t
      ctx.clearRect(0, 0, w, h)
      for (const p of petals) {
        p.x += p.vx * step
        p.y += p.vy * step
        p.rot += p.vr * step
        if (p.y > h + 20 || p.x > w + 40) Object.assign(p, make())
        draw(p, t)
      }
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i]
        p.x += p.vx * step
        p.y += p.vy * step
        p.rot += p.vr * step
        p.life -= 0.018 * step
        if (p.life <= 0) trail.splice(i, 1)
        else draw(p, t)
      }
      raf = requestAnimationFrame(tick)
    }
    const start = () => {
      lastFrame = performance.now()
      raf = requestAnimationFrame(tick)
    }
    const onVis = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) start()
    }
    document.addEventListener('visibilitychange', onVis)
    start()
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])
  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-30 size-full" />
}

/** Site-wide atmosphere: time-of-day tint, drifting colour blobs, falling petals and a petal cursor trail. */
export function Ambient() {
  const phase = usePhase()
  useEffect(() => {
    document.documentElement.dataset.phase = phase
  }, [phase])
  const calm = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return (
    <>
      {!calm && <PetalField />}
    </>
  )
}
