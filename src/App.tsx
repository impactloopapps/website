import Cursor from './components/Cursor'
import GradientMesh from './components/GradientMesh'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Marquee from './components/Marquee'
import Hero from './sections/Hero'
import Concept from './sections/Concept'
import CrackLoop from './sections/CrackLoop'
import Features from './sections/Features'
import Stats from './sections/Stats'
import Process from './sections/Process'
import ParticlesSection from './sections/ParticlesSection'
import CTA from './sections/CTA'
import { useSmoothScroll } from './lib/useSmoothScroll'

const MARQUEE = ['Learn', 'Build', 'Loop', 'Compound', 'Ship', 'Reflect', 'Repeat']

export default function App() {
  useSmoothScroll()

  return (
    <div className="grain relative">
      <GradientMesh />
      <Cursor />
      <Nav />

      <main>
        <Hero />

        <div className="border-y border-white/10 py-6">
          <Marquee items={MARQUEE} duration={28} />
        </div>

        <Concept />
        <CrackLoop />
        <Features />
        <Stats />
        <Process />
        <ParticlesSection />
        <CTA />
      </main>

      <Footer />
    </div>
  )
}
