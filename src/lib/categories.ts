import { CATEGORIES, TOPICS } from '@/content'

export const CATEGORY_ORDER = ['pregnancy', 'pain', 'exercise', 'nutrition', 'emotional', 'baby'] as const

export const CATEGORY_BLURB: Record<string, string> = {
  pregnancy: 'Trimester guidance, common symptoms and when to seek help.',
  pain: 'Support for back pain, posture and everyday body comfort.',
  exercise: 'Safe movement ideas to stay strong, mobile and confident.',
  nutrition: 'Everyday food guidance, hydration and nourishing choices.',
  emotional: 'Gentle support for stress, mood, rest and resilience.',
  baby: 'Feeding, soothing, sleep and newborn basics.',
}

export const artFor = (cat: string) => `/art/${CATEGORIES[cat] ? cat === 'pain' ? 'msk' : cat : 'hero'}.webp`

export const topicsIn = (cat: string) => Object.entries(TOPICS).filter(([, t]) => t.category === cat)

export const readMinutes = (id: string) => {
  const t = TOPICS[id]
  const words = [t.intro, t.warning, ...t.sections.flatMap(([h, b]) => [h, ...(Array.isArray(b) ? b : [b])])].join(' ').split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export const STAGES = [
  { id: 'before', label: 'Before pregnancy' },
  { id: 'during', label: 'During pregnancy' },
  { id: 'labour', label: 'Labour & birth' },
  { id: 'after', label: 'After birth' },
] as const

export type StageId = (typeof STAGES)[number]['id']

// Topics not listed apply at every stage, so they appear under every filter.
export const TOPIC_STAGE: Record<string, StageId> = {
  changes: 'during',
  warningsigns: 'during',
  preparelabour: 'labour',
  stages: 'labour',
  labourcoping: 'labour',
  vaginalrecovery: 'after',
  csection: 'after',
  postpartum: 'after',
  before: 'before',
  during: 'during',
  after: 'after',
  nutbefore: 'before',
  nutduring: 'during',
  nutafter: 'after',
  breastdiet: 'after',
}

/** Stages worth offering as filters for a category (empty when it has no staged topics). */
export const stagesIn = (cat: string) => {
  const used = new Set(topicsIn(cat).map(([id]) => TOPIC_STAGE[id]).filter(Boolean))
  return STAGES.filter((s) => used.has(s.id))
}
