import { useCallback, useSyncExternalStore } from 'react'

const KEY = 'wc-saved'
const listeners = new Set<() => void>()
let cache: string | null = null
let parsed: string[] = []

const read = (): string[] => {
  let raw = '[]'
  try {
    raw = localStorage.getItem(KEY) ?? '[]'
  } catch {
    // storage unavailable
  }
  if (raw !== cache) {
    cache = raw
    try {
      parsed = JSON.parse(raw)
    } catch {
      parsed = []
    }
  }
  return parsed
}

export function useBookmarks() {
  const saved = useSyncExternalStore((cb) => (listeners.add(cb), () => listeners.delete(cb)), read)
  const toggle = useCallback((id: string) => {
    const cur = read()
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]
    try {
      localStorage.setItem(KEY, JSON.stringify(next))
    } catch {
      // ignore
    }
    listeners.forEach((l) => l())
  }, [])
  return { saved, toggle, has: (id: string) => saved.includes(id) }
}
