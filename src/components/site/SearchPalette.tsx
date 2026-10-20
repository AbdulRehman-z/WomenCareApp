import { useNavigate } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { CATEGORIES, TOPICS } from '@/content'
import { CATEGORY_ORDER, artFor, readMinutes, topicsIn } from '@/lib/categories'

// Label matches outrank section-heading matches; every typed word must match.
const rank = (id: string, search: string, keywords: string[] = []) => {
  const label = TOPICS[id]?.label.toLowerCase() ?? ''
  const words = search.toLowerCase().trim().split(/\s+/).filter(Boolean)
  if (words.every((w) => label.includes(w))) return label.startsWith(words.join(' ')) ? 1 : 0.8
  const haystack = `${label} ${keywords.join(' ').toLowerCase()}`
  return words.every((w) => haystack.includes(w)) ? 0.4 : 0
}

export function SearchPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const navigate = useNavigate()

  const go = (path: string) => {
    onOpenChange(false)
    navigate(path)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} title="Search topics" description="Search every topic in Women's Care" className="search-bloom max-w-xl! rounded-3xl! border border-border bg-popover shadow-2xl">
      <Command className="rounded-3xl! p-2" loop filter={rank}>
        <CommandInput placeholder="Search topics, symptoms or questions…" autoFocus />
        <CommandList className="max-h-[min(26rem,60vh)]">
          <CommandEmpty>No topics match. Try a simpler word like “back” or “sleep”.</CommandEmpty>
          {CATEGORY_ORDER.map((cat) => (
            <CommandGroup key={cat} heading={CATEGORIES[cat].title} className={`cat-${cat}`}>
              {topicsIn(cat).map(([id, t]) => (
                <CommandItem
                  key={id}
                  value={id}
                  keywords={[CATEGORIES[cat].title, ...t.sections.map(([h]) => h)]}
                  onSelect={() => go(`/info/${id}`)}
                  className="group gap-3 rounded-xl py-2"
                >
                  <span className="size-9 shrink-0 overflow-hidden rounded-lg bg-[#FAF6F0]">
                    <img src={artFor(cat)} alt="" className="h-full w-full object-cover object-top mix-blend-multiply" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{t.label}</span>
                    <span className="block truncate text-xs text-muted-foreground">{t.intro}</span>
                  </span>
                  <span className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
                    <Clock className="size-3" />
                    {readMinutes(id)} min
                  </span>
                  <ArrowRight className="size-4 opacity-0 transition group-data-selected:opacity-60" />
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
        <div className="flex items-center justify-between border-t px-3 pt-2 text-xs text-muted-foreground">
          <span>{Object.keys(TOPICS).length} topics</span>
          <span>↑↓ to move · ↵ to open · esc to close</span>
        </div>
      </Command>
    </CommandDialog>
  )
}
