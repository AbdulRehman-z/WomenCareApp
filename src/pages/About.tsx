import { Page } from '@/components/site/Page'
import { GENERAL_NOTE } from '@/content'

export default function About() {
  return (
    <Page>
      <section className="mx-auto max-w-3xl px-4 pt-14 sm:px-8">
        <p className="text-[0.7rem] font-medium tracking-[0.24em] text-foreground/60 uppercase">About</p>
        <h1 className="mt-4 text-5xl font-medium">Women’s Care</h1>
        <p className="mt-6 text-lg text-foreground/80">Clear, compassionate guidance for women and families, before, during and after pregnancy. Every topic is written plainly so it can be read at any hour, on any screen.</p>
        <div className="mt-10 rounded-3xl bg-secondary p-6 sm:p-8">
          <h2 className="text-xl font-medium">Medical note</h2>
          <p className="mt-2 text-sm text-muted-foreground">{GENERAL_NOTE} If symptoms feel urgent or worrying, seek care promptly.</p>
        </div>
      </section>
    </Page>
  )
}
