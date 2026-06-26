import { CSSProperties } from 'react'

const blob = (animation: string): CSSProperties => ({ animation })

// Fixed animated aurora mesh that sits behind all content.
export default function GradientMesh() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div
        className="absolute left-[-15%] top-[-12%] h-[55vmax] w-[55vmax] rounded-full bg-aurora-violet/30 blur-[90px]"
        style={blob('drift1 24s ease-in-out infinite')}
      />
      <div
        className="absolute right-[-18%] top-[8%] h-[48vmax] w-[48vmax] rounded-full bg-aurora-cyan/25 blur-[90px]"
        style={blob('drift2 30s ease-in-out infinite')}
      />
      <div
        className="absolute bottom-[-20%] left-[20%] h-[50vmax] w-[50vmax] rounded-full bg-aurora-magenta/20 blur-[100px]"
        style={blob('drift3 27s ease-in-out infinite')}
      />
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,transparent_40%,#05060a_100%)]" />
    </div>
  )
}
