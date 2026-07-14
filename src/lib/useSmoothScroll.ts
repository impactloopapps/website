import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

// Inertia smooth-scroll driven by Lenis, wired into GSAP's ticker so ScrollTrigger
// stays in sync. Disabled entirely under prefers-reduced-motion (native scroll).
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) {
      ScrollTrigger.refresh()
      return
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    })

    lenis.on('scroll', ScrollTrigger.update)
    const onTick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)
    window.__lenis = lenis

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const t = window.setTimeout(refresh, 400)

    return () => {
      window.removeEventListener('load', refresh)
      window.clearTimeout(t)
      gsap.ticker.remove(onTick)
      lenis.destroy()
      window.__lenis = undefined
    }
  }, [])
}

export function scrollToSection(target: string) {
  const el = document.querySelector(target)
  if (!el) return
  if (window.__lenis) {
    window.__lenis.scrollTo(el as HTMLElement, { duration: 1.2 })
  } else {
    ;(el as HTMLElement).scrollIntoView({ behavior: 'smooth' })
  }
}
