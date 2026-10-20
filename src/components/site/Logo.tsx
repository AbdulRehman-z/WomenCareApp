import { cn } from '@/lib/utils'

/** Sprout-in-a-badge mark; matches /logo.svg used as the favicon. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn('shrink-0', className)} aria-hidden>
      <rect width="64" height="64" rx="16" fill="#6B2E59" />
      <path d="M32 52V31" stroke="#FAF6F0" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M32 36C32 26 25 22 14 22c0 10 6 14 18 14Z" fill="#FAF6F0" />
      <path d="M32 31c0-9 6-13 18-13 0 10-6 14-18 13Z" fill="#E9B7D3" />
      <circle cx="32" cy="14" r="5" fill="#D97B54" />
      <circle cx="32" cy="14" r="2" fill="#FFD28A" />
    </svg>
  )
}
