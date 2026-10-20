import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { Footer } from './Footer'
import { Header } from './Header'

export function Page({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>
      <Header />
      <motion.main id="main" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10, transition: { duration: 0.22 } }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </motion.main>
      <Footer />
    </>
  )
}
