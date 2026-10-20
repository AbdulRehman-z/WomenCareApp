import { Link } from 'react-router-dom'
import { Moon, Search, Sun } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet'
import { CATEGORIES } from '@/content'
import { CATEGORY_ORDER, artFor } from '@/lib/categories'
import { openSearch } from '@/lib/search'
import { Logo } from './Logo'
import { SearchPalette } from './SearchPalette'

export default function HeaderOverlays({ active, onClose, savedCount, dark, toggleTheme }: {
  active: 'search' | 'menu' | 'closed'
  onClose: () => void
  savedCount: number
  dark: boolean
  toggleTheme: () => void
}) {
  return (
    <>
      <SearchPalette open={active === 'search'} onOpenChange={(open) => { if (!open) onClose() }} />
      <Sheet open={active === 'menu'} onOpenChange={(open) => { if (!open) onClose() }}>
        <SheetContent side="right" className="w-[88%] max-w-sm gap-0 p-0">
          <SheetTitle className="flex items-center gap-2 border-b px-5 py-4 font-heading text-xl font-medium text-aubergine dark:text-[#E9B7D3]">
            <Logo className="size-7" /> Women’s Care
          </SheetTitle>
          <SheetDescription className="sr-only">Site navigation</SheetDescription>
          <nav aria-label="Menu" className="flex-1 overflow-y-auto p-3">
            <Link to="/" onClick={onClose} className="flex h-12 items-center rounded-xl px-3 font-medium hover:bg-accent">Home</Link>
            <p className="mt-3 px-3 pb-1 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">Topics</p>
            {CATEGORY_ORDER.map((c) => (
              <Link key={c} to={`/menu/${c}`} onClick={onClose} className={`cat-${c} flex min-h-14 items-center gap-3 rounded-xl px-3 py-2 hover:bg-cat-bg`}>
                <img src={artFor(c)} alt="" className="size-10 shrink-0 rounded-lg bg-[#FAF6F0] object-cover object-top mix-blend-multiply" />
                <span className="font-heading text-lg text-cat-ink">{CATEGORIES[c].title}</span>
              </Link>
            ))}
            <Link to="/saved" onClick={onClose} className="mt-3 flex h-12 items-center justify-between rounded-xl px-3 font-medium hover:bg-accent">
              Saved
              <span className="rounded-full bg-muted px-2.5 py-0.5 text-sm">{savedCount}</span>
            </Link>
          </nav>
          <div className="flex gap-2 border-t p-3">
            <button onClick={openSearch} className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary font-medium text-primary-foreground">
              <Search className="size-4" /> Search
            </button>
            <button onClick={toggleTheme} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} className="grid size-12 place-items-center rounded-xl border border-border">
              {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
