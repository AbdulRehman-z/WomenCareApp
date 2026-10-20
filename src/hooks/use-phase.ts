import { useEffect, useState } from 'react'
import { useTheme } from './use-theme'

export type Phase = 'dawn' | 'day' | 'dusk' | 'night'

const PHASES: Phase[] = ['dawn', 'day', 'dusk', 'night']

const clockPhase = (): Phase => {
  const forced = new URLSearchParams(window.location.search).get('phase')
  if (forced && PHASES.includes(forced as Phase)) return forced as Phase
  const h = new Date().getHours()
  if (h >= 5 && h < 8) return 'dawn'
  if (h >= 8 && h < 17) return 'day'
  if (h >= 17 && h < 20) return 'dusk'
  return 'night'
}

/** Scene phase from the visitor's clock. Dark theme always means night; light theme never shows a night sky. */
export function usePhase(): Phase {
  const { dark } = useTheme()
  const [clock, setClock] = useState(clockPhase)
  useEffect(() => {
    const id = setInterval(() => setClock(clockPhase()), 60_000)
    return () => clearInterval(id)
  }, [])
  if (dark) return 'night'
  return clock === 'night' ? 'dusk' : clock
}
