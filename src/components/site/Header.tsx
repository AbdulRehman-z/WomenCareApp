import { lazy, Suspense, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Bookmark, Menu, Moon, Search, Sun } from 'lucide-react'
import { useBookmarks } from '@/hooks/use-bookmarks'
import { useTheme } from '@/hooks/use-theme'
import { Logo } from './Logo'
import { openSearch } from '@/lib/search'

const HeaderOverlays = lazy(() => import('./HeaderOverlays'))

export function Header() {
  const { dark, toggle } = useTheme()
  const { saved } = useBookmarks()
  const [overlay, setOverlay] = useState<'search' | 'menu' | 'closed'>()
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOverlay((current) => current === 'search' ? 'closed' : 'search')
      }
    }
    const onOpen = () => setOverlay('search')
    window.addEventListener('keydown', onKey)
    window.addEventListener('wc-search', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('wc-search', onOpen)
    }
  }, [])
  const iconBtn = 'relative grid size-11 place-items-center rounded-full text-foreground/80 transition hover:bg-accent hover:text-accent-foreground'
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[90rem] items-center gap-3 px-4 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5 font-heading text-2xl font-medium tracking-tight text-aubergine dark:text-[#E9B7D3]">
          <Logo className="size-9" />
          Women’s Care
        </Link>
        <nav className="ml-8 hidden gap-1 text-sm font-medium md:flex">
          <a href="/#categories" className="rounded-full px-4 py-2 hover:bg-accent">Topics</a>
          <NavLink to="/about" className={({ isActive }) => `rounded-full px-4 py-2 hover:bg-accent ${isActive ? 'bg-accent text-accent-foreground' : ''}`}>
            About
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <button onClick={openSearch} aria-label="Search" className={iconBtn}>
            <Search className="size-5" />
          </button>
          <button onClick={openSearch} aria-label="Open search (Cmd+K)" className="mr-1 hidden h-8 items-center rounded-full bg-muted px-3 text-xs font-medium text-foreground/80 transition hover:bg-accent lg:flex">Cmd+K</button>
          <Link to="/saved" aria-label={`Saved topics (${saved.length})`} className={`${iconBtn} hidden md:grid`}>
            <Bookmark className="size-5" />
            {saved.length > 0 && <span className="absolute top-1.5 right-1.5 grid size-4 place-items-center rounded-full bg-terracotta text-[10px] font-semibold text-white">{saved.length}</span>}
          </Link>
          <button onClick={toggle} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} className={`${iconBtn} hidden md:grid`}>
            {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>
          <button onClick={() => setOverlay('menu')} aria-label="Open menu" className={`${iconBtn} md:hidden`}>
            <Menu className="size-6" />
          </button>
        </div>
      </div>
      {overlay !== undefined && (
        <Suspense fallback={<span role="status" className="sr-only">Opening navigation…</span>}>
          <HeaderOverlays active={overlay} onClose={() => setOverlay('closed')} savedCount={saved.length} dark={dark} toggleTheme={toggle} />
        </Suspense>
      )}
    </header>
  )
}
