import { Link } from 'react-router-dom'
import { ArrowRight, Bookmark } from 'lucide-react'
import { Sprout } from '@/components/garden/Sprout'
import { Page } from '@/components/site/Page'
import { TOPICS } from '@/content'
import { useBookmarks } from '@/hooks/use-bookmarks'
import { artFor } from '@/lib/categories'

export default function Saved() {
  const { saved } = useBookmarks()
  const items = saved.filter((id) => TOPICS[id])
  return (
    <Page>
      <section className="mx-auto max-w-4xl px-4 pt-14 sm:px-8">
        <h1 className="text-5xl font-medium">Saved for later</h1>
        {items.length === 0 ? (
          <div className="mt-10 flex flex-col items-center rounded-3xl bg-secondary px-6 py-12 text-center">
            <Sprout className="w-56" />
            <p className="mt-4 max-w-sm text-muted-foreground">Nothing saved yet. Tap the bookmark on any topic to keep it here.</p>
            <Link to="/" className="mt-6 inline-flex h-12 items-center gap-2 rounded-2xl bg-primary px-6 font-medium text-primary-foreground">
              Browse topics <ArrowRight className="size-4" />
            </Link>
          </div>
        ) : (
          <ul className="mt-8 grid gap-3">
            {items.map((id) => {
              const t = TOPICS[id]
              return (
                <li key={id}>
                  <Link to={`/info/${id}`} className={`cat-${t.category} flex items-center gap-4 rounded-2xl bg-cat-bg p-4 transition hover:-translate-y-0.5 hover:shadow-lg`}>
                    <img src={artFor(t.category)} alt="" className="size-14 rounded-xl bg-[#FAF6F0] object-cover object-top mix-blend-multiply" />
                    <span className="flex-1">
                      <span className="block font-heading text-xl font-medium text-cat-ink">{t.label}</span>
                      <span className="text-sm text-foreground/70">{t.subtitle}</span>
                    </span>
                    <Bookmark className="size-5 fill-current text-cat-ink" />
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </Page>
  )
}
