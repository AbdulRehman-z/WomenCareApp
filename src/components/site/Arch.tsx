import { cn } from '@/lib/utils'

/** Soft-arch frame for the painted illustrations. The art sits on cream and multiplies into it. */
export function Arch({ src, alt = '', className, imgClassName, priority }: { src: string; alt?: string; className?: string; imgClassName?: string; priority?: boolean }) {
  return (
    <div className={cn('arch relative overflow-hidden bg-[#FAF6F0]', className)}>
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={cn('h-full w-full origin-[50%_22%] scale-[1.14] object-cover object-top mix-blend-multiply', imgClassName)}
      />
    </div>
  )
}
