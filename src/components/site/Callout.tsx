import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export function Callout({ title, icon, children, className }: { title: string; icon: ReactNode; children: ReactNode; className?: string }) {
  return (
    <aside className={cn('rounded-3xl bg-cat-bg p-6 text-foreground sm:p-7', className)}>
      <h2 className="flex items-center gap-3 font-heading text-xl font-medium text-cat-ink">
        {icon}
        <span className="relative">
          {title}
          <svg viewBox="0 0 200 10" preserveAspectRatio="none" aria-hidden className="absolute -bottom-2 left-0 h-2 w-full overflow-visible">
            <motion.path
              d="M2 6 C40 1 70 9 104 5 S170 2 198 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            />
          </svg>
        </span>
      </h2>
      <div className="mt-4 text-[0.97rem]">{children}</div>
    </aside>
  )
}
