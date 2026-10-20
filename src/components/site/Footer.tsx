import { Link } from 'react-router-dom'
import { Logo } from './Logo'

const COLUMNS = [
  { title: 'Explore', links: [['Pregnancy', '/menu/pregnancy'], ['Movement', '/menu/exercise'], ['Nutrition', '/menu/nutrition'], ['Baby Care', '/menu/baby']] },
  { title: 'Company', links: [['About', '/about'], ['Topics', '/#categories'], ['Saved', '/saved']] },
] as const

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border pb-20 lg:pb-0">
      <div className="mx-auto grid max-w-[90rem] gap-10 px-4 py-12 sm:px-8 md:grid-cols-[1fr_auto]">
        <div>
          <div className="flex items-center gap-2.5 font-heading text-2xl font-medium text-aubergine dark:text-[#E9B7D3]"><Logo className="size-8" /> Women’s Care</div>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">Clear, compassionate guidance for women and families.</p>
        </div>
        <nav aria-label="Footer" className="flex gap-0">
          {COLUMNS.map((col) => (
            <div key={col.title} className="min-w-40 border-l border-border px-8 text-sm first:min-w-44">
              <p className="font-medium">{col.title}</p>
              <ul className="mt-3 grid gap-1.5">
                {col.links.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className="text-muted-foreground transition hover:text-foreground">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <p className="mx-auto max-w-[90rem] px-4 pb-10 text-xs text-muted-foreground sm:px-8">© {new Date().getFullYear()} Women’s Care. Educational content only.</p>
    </footer>
  )
}
