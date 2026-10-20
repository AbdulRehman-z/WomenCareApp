import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowRight, ChevronRight, Clock } from 'lucide-react'
import { motion } from 'motion/react'
import { Arch } from '@/components/site/Arch'
import { Page } from '@/components/site/Page'
import { CATEGORIES } from '@/content'
import { TOPIC_STAGE, artFor, readMinutes, stagesIn, topicsIn } from '@/lib/categories'

export default function Category() {
  const { cat = '' } = useParams()
  const [params, setParams] = useSearchParams()
  const category = CATEGORIES[cat]
  if (!category) return <Navigate to="/" replace />
  const all = topicsIn(cat)
  const stages = stagesIn(cat)
  const stage = stages.find((s) => s.id === params.get('stage'))?.id
  const topics = stage ? all.filter(([id]) => !TOPIC_STAGE[id] || TOPIC_STAGE[id] === stage) : all
  const pick = (id?: string) => setParams(id ? { stage: id } : {}, { replace: true })
  const chip = (active: boolean) => `h-11 shrink-0 rounded-full border px-5 text-sm font-medium whitespace-nowrap transition ${active ? 'border-cat-ink bg-cat-ink text-background' : 'border-border bg-card hover:border-cat-ink/50'}`
  return (
    <Page>
      <div className={`cat-${cat}`}>
        <section className="bg-cat-bg">
          <div className="mx-auto grid max-w-[90rem] items-center gap-8 px-4 py-12 sm:px-8 md:grid-cols-[0.45fr_1.2fr]">
            <Arch src={artFor(cat)} alt="" priority className="mx-auto aspect-[4/5] w-48 md:w-full md:max-w-sm" imgClassName="scale-[1.2]" />
            <div>
              <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-cat-ink/80">
                <Link to="/" className="hover:underline">Home</Link>
                <ChevronRight className="size-3.5" />
                <span>{category.title}</span>
              </nav>
              <h1 className="mt-4 text-[clamp(2.5rem,6vw,4.5rem)] font-medium text-cat-ink">{category.title}</h1>
              <p className="mt-4 max-w-xl text-lg text-foreground/75">{category.subtitle}</p>
              <p className="mt-6 text-sm font-semibold text-cat-ink">{all.length} topics</p>
            </div>
            
          </div>
        </section>
        <section className="mx-auto max-w-4xl px-4 pt-12 sm:px-8">
          <h2 className="text-2xl font-medium">{category.prompt}</h2>
          {stages.length > 0 && (
            <div role="group" aria-label="Filter by stage" className="-mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
              <button onClick={() => pick()} aria-pressed={!stage} className={chip(!stage)}>All topics</button>
              {stages.map((s) => (
                <button key={s.id} onClick={() => pick(s.id)} aria-pressed={stage === s.id} className={chip(stage === s.id)}>{s.label}</button>
              ))}
            </div>
          )}
          <p aria-live="polite" className="sr-only">{topics.length} topics shown</p>
          <ul className="mt-6 grid gap-3">
            {topics.map(([id, t], i) => (
              <motion.li key={id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i, duration: 0.4 }}>
                <Link to={`/info/${id}`} className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:border-cat-ink/40 hover:shadow-lg">
                  <span className="size-16 shrink-0 overflow-hidden rounded-xl bg-[#FAF6F0]">
                    <img src={artFor(cat)} alt="" loading="lazy" className="h-full w-full object-cover object-top mix-blend-multiply" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-heading text-xl font-medium text-cat-ink">{t.label}</span>
                    <span className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">{t.intro}</span>
                  </span>
                  <span className="hidden items-center gap-1 text-sm text-muted-foreground sm:flex">
                    <Clock className="size-4" />
                    {readMinutes(id)} min
                  </span>
                  <ArrowRight className="size-5 text-cat-ink transition group-hover:translate-x-1" />
                </Link>
              </motion.li>
            ))}
          </ul>
        </section>
      </div>
    </Page>
  )
}
