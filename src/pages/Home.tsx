import { Link } from 'react-router-dom'
import { ArrowRight, Search, ShieldCheck } from 'lucide-react'
import { motion } from 'motion/react'
import { Botanical } from '@/components/garden/Botanical'
import { HeroLife } from '@/components/garden/HeroLife'
import { Tilt } from '@/components/garden/Tilt'
import { Arch } from '@/components/site/Arch'
import { Page } from '@/components/site/Page'
import { openSearch } from '@/lib/search'
import { CATEGORIES, GENERAL_NOTE } from '@/content'
import { CATEGORY_BLURB, CATEGORY_ORDER, artFor, topicsIn } from '@/lib/categories'

export default function Home() {
  return (
    <Page>
      <section className="mx-auto grid max-w-[90rem] grid-cols-1 items-center gap-10 px-4 pt-10 pb-6 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:pt-12">
        <div className="min-w-0">
          <p className="text-[0.7rem] font-semibold tracking-[0.24em] text-accent-text uppercase">Knowledge <span className="mx-2">·</span> Support <span className="mx-2">·</span> Brighter days</p>
          <h1 className="mt-6 max-w-[11ch] text-[clamp(2.6rem,5.2vw,4.4rem)] leading-[1.06] font-medium sm:max-w-none">
            Real support for<br />every stage of<br /><span className="bg-gradient-to-r from-aubergine via-[#A24A74] to-terracotta bg-clip-text text-transparent dark:from-[#F0B8D6] dark:via-[#EFA0B0] dark:to-[#F0A27F]">your journey</span>
          </h1>
          <p className="mt-5 max-w-[31rem] text-[1.05rem] leading-relaxed text-muted-foreground">Thoughtful guidance on pregnancy, recovery, movement, nutrition, emotional well-being and baby care.</p>
          <div className="mt-7 max-w-[34rem]">
            <a href="#categories" className="inline-flex h-14 w-[68%] items-center justify-center gap-3 rounded-xl bg-primary px-7 text-lg font-medium text-primary-foreground shadow-md shadow-aubergine/20 transition hover:-translate-y-0.5 hover:shadow-lg">
              Explore Topics <ArrowRight className="size-5" />
            </a>
            <button onClick={openSearch} className="mt-5 flex h-14 w-full items-center gap-3 rounded-xl border border-input bg-card px-5 text-left text-muted-foreground shadow-sm transition hover:border-aubergine/50">
              <Search className="size-5" /> Search topics, symptoms or questions
            </button>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }} className="relative order-first mx-auto w-full max-w-sm lg:order-last lg:max-w-[34rem] lg:justify-self-center">
          <div className="hero-backdrop aspect-[7/9]" aria-hidden />
          <img src="/art/hero-cut.webp" alt="A woman holding a leaf, surrounded by foliage" width="1122" height="1402" decoding="async" fetchPriority="high" className="absolute bottom-[-4%] left-1/2 w-[112%] max-w-none -translate-x-1/2" />
          <div className="absolute inset-x-0 top-0 aspect-[7/9]"><HeroLife /></div>
        </motion.div>
      </section>

      <section id="categories" className="mx-auto max-w-[90rem] scroll-mt-20 px-4 pt-20 sm:px-8">
        <h2 className="text-4xl font-medium sm:text-5xl">Explore by Category</h2>
        <p className="mt-3 text-muted-foreground">Pick the area that matches where you are today.</p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_ORDER.map((id, i) => (
            <motion.div key={id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}>
              <Tilt className="h-full"><Link to={`/menu/${id}`} className={`cat-${id} group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-cat-bg p-4 transition sm:p-6 duration-300 hover:-translate-y-1.5 hover:shadow-xl`}>
                <Botanical kind={id} className="absolute top-3 right-3 z-10 h-16 w-14 sm:top-5 sm:right-5 sm:h-20 sm:w-16" />
                <div className="flex items-center gap-5 sm:flex-col sm:items-stretch sm:gap-0">
                  <Arch src={artFor(id)} alt="" className="aspect-[4/5] w-28 shrink-0 transition duration-500 group-hover:scale-[1.03] sm:mx-auto sm:w-[92%]" imgClassName="origin-center scale-100 object-center mix-blend-normal" />
                  <div className="flex min-w-0 flex-1 flex-col sm:contents">
                    <h3 className="text-xl font-medium text-cat-ink sm:mt-6 sm:text-2xl">{CATEGORIES[id].title}</h3>
                    <p className="mt-1 flex-1 text-[0.95rem] text-foreground/75 sm:mt-2">{CATEGORY_BLURB[id]}</p>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-cat-ink sm:mt-5">
                      {topicsIn(id).length} topics <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link></Tilt>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-[90rem] px-4 sm:px-8">
        <div className="flex items-start gap-5 rounded-3xl bg-secondary p-6 sm:p-8">
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-background text-aubergine dark:text-[#F0B8D6]">
            <ShieldCheck className="size-6" />
          </span>
          <div>
            <h2 className="text-xl font-medium">Medical note</h2>
            <p className="mt-1 text-sm text-muted-foreground">{GENERAL_NOTE} If symptoms feel urgent or worrying, seek care promptly.</p>
          </div>
        </div>
      </section>
      <button onClick={openSearch} className="fixed inset-x-4 bottom-4 z-30 flex h-14 items-center justify-center gap-3 rounded-full bg-primary font-medium text-primary-foreground shadow-xl lg:hidden">
        <Search className="size-5" /> Search Women’s Care
      </button>
    </Page>
  )
}
