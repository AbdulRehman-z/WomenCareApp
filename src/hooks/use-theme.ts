import { useCallback, useSyncExternalStore } from 'react'

const KEY = 'wc-theme'
const listeners = new Set<() => void>()

const read = () => {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved) return saved === 'dark'
  } catch {
    // storage unavailable; fall through to system preference
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const apply = (dark: boolean) => document.documentElement.classList.toggle('dark', dark)

apply(read())

export function useTheme() {
  const dark = useSyncExternalStore(
    (cb) => (listeners.add(cb), () => listeners.delete(cb)),
    read,
  )
  const toggle = useCallback(() => {
    const next = !read()
    try {
      localStorage.setItem(KEY, next ? 'dark' : 'light')
    } catch {
      // ignore
    }
    apply(next)
    listeners.forEach((l) => l())
  }, [])
  return { dark, toggle }
}
