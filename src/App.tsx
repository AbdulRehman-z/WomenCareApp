import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { ScrollVine } from '@/components/garden/ScrollVine'
import { Ambient } from '@/components/garden/Ambient'
import Home from '@/pages/Home'

const About = lazy(() => import('@/pages/About'))
const Category = lazy(() => import('@/pages/Category'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const Saved = lazy(() => import('@/pages/Saved'))
const Topic = lazy(() => import('@/pages/Topic'))

function AnimatedRoutes() {
  const location = useLocation()
  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0)
  }, [location.pathname, location.hash])
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/menu/:cat" element={<Category />} />
        <Route path="/info/:topic" element={<Topic />} />
        <Route path="/about" element={<About />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Ambient />
      <ScrollVine />
      <Suspense fallback={<p role="status" className="px-4 py-12 text-center text-muted-foreground">Loading page…</p>}>
        <AnimatedRoutes />
      </Suspense>
    </BrowserRouter>
  )
}
