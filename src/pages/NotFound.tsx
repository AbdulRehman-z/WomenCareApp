import { Link } from 'react-router-dom'
import { Page } from '@/components/site/Page'

export default function NotFound() {
  return (
    <Page>
      <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center">
        <img src="/art/empty.webp" alt="" className="w-64 mix-blend-multiply" />
        <h1 className="mt-6 text-4xl font-medium">We couldn’t find that page</h1>
        <p className="mt-3 text-muted-foreground">The topic may have moved. Head back and pick another.</p>
        <Link to="/" className="mt-8 inline-flex h-12 items-center rounded-2xl bg-primary px-7 font-medium text-primary-foreground">Back to home</Link>
      </section>
    </Page>
  )
}
