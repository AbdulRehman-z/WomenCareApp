import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Bookmark, Check, ChevronRight, Clock, HeartPulse, Square, Volume2 } from 'lucide-react'
import { TocTree } from '@/components/garden/TocTree'
import { PetalBurst } from '@/components/garden/PetalBurst'
import { Arch } from '@/components/site/Arch'
import { Callout } from '@/components/site/Callout'
import { Page } from '@/components/site/Page'
import { CATEGORIES, GENERAL_NOTE, TOPICS } from '@/content'
import { useBookmarks } from '@/hooks/use-bookmarks'
import { artFor, readMinutes, topicsIn } from '@/lib/categories'
import NotFound from './NotFound'

const slug = (i: number) => `section-${i + 1}`

// Keep a reference so Chrome does not garbage-collect the utterance mid-speech.
const keep: { utterance?: SpeechSynthesisUtterance } = {}
const stopSpeech = () => {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel()
}

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      setProgress(Math.min(100, Math.round((window.scrollY / Math.max(1, doc.scrollHeight - window.innerHeight)) * 100)))
      let cur = ids[0]
      const line = Math.max(160, window.innerHeight * 0.3)
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < line) cur = id
      }
      // Short closing sections can never reach the line; the page bottom counts as reaching the last one.
      if (window.scrollY + window.innerHeight >= doc.scrollHeight - 4) cur = ids[ids.length - 1]
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids])
  return { active, progress }
}

export default function Topic() {
  const { topic: id = '' } = useParams()
  const topic = TOPICS[id]
  const { has, toggle } = useBookmarks()
  const [speaking, setSpeaking] = useState(false)

  const ids = useMemo(() => (topic ? topic.sections.map((_, i) => slug(i)) : []), [topic])
  const { active, progress } = useScrollSpy(ids)

  useEffect(() => {
    window.scrollTo(0, 0)
    setSpeaking(false)
    return stopSpeech
  }, [id])

  if (!topic) return <NotFound />

  const siblings = topicsIn(topic.category)
  const at = siblings.findIndex(([k]) => k === id)
  const prev = siblings[at - 1]
  const next = siblings[at + 1]
  const saved = has(id)

  const listen = () => {
    if (speaking) {
      stopSpeech()
      setSpeaking(false)
      return
    }
    if (!('speechSynthesis' in window)) {
      alert('Sorry, listening is not supported in this browser.')
      return
    }
    window.speechSynthesis.cancel()
    const speech = new SpeechSynthesisUtterance(document.getElementById('informationText')?.innerText ?? '')
    speech.lang = 'en-US'
    speech.rate = 0.9
    speech.onend = () => setSpeaking(false)
    speech.onerror = (e) => {
      setSpeaking(false)
      if (e.error !== 'canceled' && e.error !== 'interrupted') alert(`Speech error: ${e.error}`)
    }
    keep.utterance = speech
    setSpeaking(true)
    // Chrome drops speak() called in the same tick as cancel()
    setTimeout(() => window.speechSynthesis.speak(speech), 50)
  }

  const tocItems = topic.sections.map(([h], i) => ({ id: slug(i), label: h, n: i + 1 }))

  const clinician = (className?: string) => (
    <Callout title="When to see a clinician" icon={<HeartPulse className="size-6" />} className={className}>
      <p>{topic.warning}</p>
    </Callout>
  )

  const toc = <TocTree items={tocItems} activeId={active} />

  return (
    <Page>
      <div className={`cat-${topic.category}`}>

        <div className="mx-auto max-w-[90rem] px-4 pt-8 sm:px-8">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="size-3.5" />
            <Link to={`/menu/${topic.category}`} className="text-cat-ink hover:underline">{CATEGORIES[topic.category].title}</Link>
            <ChevronRight className="size-3.5" />
            <span className="text-foreground">{topic.label}</span>
          </nav>

          <header className="mt-8 grid items-center gap-8 md:grid-cols-[1.4fr_0.6fr]">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-cat-ink uppercase">{CATEGORIES[topic.category].title}</p>
              <h1 className="mt-3 text-[clamp(2.4rem,6vw,4.75rem)] font-medium text-balance text-cat-ink">{topic.title}</h1>
              <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
                <span className="inline-flex items-center gap-1.5 text-muted-foreground"><Clock className="size-4" /> {readMinutes(id)} min read</span>
                <span className="mx-1 h-4 w-px bg-border" />
                <button onClick={() => toggle(id)} aria-pressed={saved} className="inline-flex h-11 items-center gap-2 rounded-full px-4 transition hover:bg-cat-bg">
                  <span className="relative grid"><Bookmark className={`size-4 transition-transform duration-300 ${saved ? 'scale-125 fill-current text-cat-ink' : ''}`} /><PetalBurst active={saved} /></span> {saved ? 'Saved' : 'Save for later'}
                </button>
                <button onClick={listen} className="inline-flex h-11 items-center gap-2 rounded-full bg-cat-bg px-4 font-medium text-cat-ink transition hover:brightness-95">
                  {speaking ? <Square className="size-4 fill-current" /> : <Volume2 className="size-4" />} {speaking ? 'Stop' : 'Listen'}
                </button>
              </div>
            </div>
            <Arch src={artFor(topic.category)} alt="" priority className="mx-auto hidden aspect-[4/5] w-full max-w-72 md:block" imgClassName="scale-[1.2]" />
          </header>
        </div>

        <div className="mx-auto mt-10 grid max-w-[90rem] gap-10 px-4 sm:px-8 lg:grid-cols-[15rem_minmax(0,1fr)_19rem]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <details className="rounded-2xl border border-border bg-card p-4 lg:hidden">
              <summary className="cursor-pointer font-heading text-lg font-medium">On this page</summary>
              <div className="mt-3">{toc}</div>
            </details>
            <div className="hidden lg:block">
              <p className="font-heading text-lg font-medium">On this page</p>
              <p className="mt-1 mb-4 text-xs text-muted-foreground">{Math.min(tocItems.length, tocItems.findIndex((t) => t.id === active) + 1)} of {tocItems.length} in bloom · {progress}%</p>
              {toc}
            </div>
          </aside>

          <article id="informationText" className="min-w-0">
            <p className="rounded-3xl bg-cat-bg px-6 py-5 font-heading text-xl leading-relaxed text-cat-ink italic sm:text-2xl">{topic.intro}</p>
            {topic.sections.map(([heading, body], i) => (
              <section key={heading} id={slug(i)} className="scroll-mt-28 pt-12">
                <h2 className="flex items-center gap-4 text-3xl font-medium text-cat-ink">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-cat-bg text-lg">{i + 1}</span>
                  {heading}
                </h2>
                {Array.isArray(body) ? (
                  <ul className="mt-5 space-y-3">
                    {body.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-cat-bg text-cat-ink"><Check className="size-3.5" strokeWidth={3} /></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-foreground/90">{body}</p>
                )}
              </section>
            ))}
            {topic.warning && clinician('mt-14 lg:hidden')}
            <p className="mt-10 rounded-2xl border border-dashed border-border p-5 text-sm text-muted-foreground">
              <strong className="text-foreground">Remember:</strong> {GENERAL_NOTE}
            </p>
          </article>

          <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">{topic.warning && clinician()}</aside>
        </div>

        <nav aria-label="More topics" className="mx-auto mt-16 grid max-w-4xl gap-4 px-4 sm:grid-cols-2 sm:px-8">
          {[
            prev && { k: prev, dir: 'Previous' as const },
            next && { k: next, dir: 'Next' as const },
          ].map((n) =>
            n ? (
              <Link key={n.k[0]} to={`/info/${n.k[0]}`} className={`group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:shadow-lg ${n.dir === 'Next' ? 'sm:col-start-2 sm:flex-row-reverse sm:text-right' : ''}`}>
                <img src={artFor(topic.category)} alt="" className="size-14 rounded-xl bg-[#FAF6F0] object-cover object-top mix-blend-multiply" />
                <span className="flex-1">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground sm:group-[]:justify-inherit">
                    {n.dir === 'Previous' ? <ArrowLeft className="size-3.5" /> : null}
                    {n.dir} topic
                    {n.dir === 'Next' ? <ArrowRight className="size-3.5" /> : null}
                  </span>
                  <span className="block font-heading text-lg font-medium text-cat-ink">{n.k[1].label}</span>
                </span>
              </Link>
            ) : null,
          )}
        </nav>
      </div>
    </Page>
  )
}
