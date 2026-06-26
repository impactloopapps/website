# Impact Loop — website

Marketing site for **Impact Loop**, an indie app studio, featuring its flagship product
**CrackLoop**. An animation-heavy, single-page experience: an interactive 3D hero, scroll-driven
reveals, particle systems, and tasteful micro-interactions — built to feel like a top-tier product
site while staying fast and accessible.

**Live:** https://impactloopapps.github.io/website/

## Stack

| Concern | Choice |
| --- | --- |
| Build / framework | [Vite](https://vitejs.dev) + React 18 + TypeScript |
| 3D | [Three.js](https://threejs.org) via [React Three Fiber](https://r3f.docs.pmnd.rs) + drei |
| Post-processing | `@react-three/postprocessing` (bloom, chromatic aberration, vignette) |
| Shaders | Custom GLSL — simplex-noise displacement + iridescent fresnel; GPU particle loop |
| Scroll / animation | [GSAP](https://gsap.com) + ScrollTrigger, [Lenis](https://lenis.darkroom.engineering) smooth scroll |
| Styling | Tailwind CSS |
| Fonts | Self-hosted via Fontsource (Space Grotesk + Inter) — no external CDN |

### Highlights

- Interactive morphing **torus-knot ("the loop")** hero with mouse/touch parallax + post FX.
- GPU **particle field** shaped into a loop, swirling and pointer-reactive.
- Scroll-linked SVG path draw, sticky "method" section, bento feature grid, animated counters,
  infinite marquee, custom cursor, magnetic buttons, 3D-tilt cards, split-text reveals.
- **Mobile-first & performant:** adaptive DPR + particle counts on low-power devices, render loop
  paused when off-screen or the tab is hidden, lazy-loaded 3D, self-hosted fonts (no layout shift).
- **Graceful fallbacks:** static gradient hero when WebGL is unavailable; all motion disabled under
  `prefers-reduced-motion`.

## Run locally

Requires Node 20+ and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev        # dev server at http://localhost:5173/website/
pnpm build      # production build to dist/
pnpm preview    # serve the production build locally
pnpm typecheck  # TypeScript, no emit
pnpm assets     # regenerate favicon/OG PNGs from SVG (needs sharp)
```

> The Vite `base` is set to `/website/` (see [vite.config.ts](vite.config.ts)) because the site is
> served from a GitHub Pages **project page**. The dev/preview URLs therefore include `/website/`.

## Deployment

Pushing to `main` triggers [.github/workflows/deploy.yml](.github/workflows/deploy.yml):

1. Install deps with pnpm and run `pnpm build`.
2. Upload `dist/` as a Pages artifact (`actions/upload-pages-artifact`).
3. Publish with `actions/deploy-pages`.

Pages **Source** is set to *GitHub Actions* (no `gh-pages` branch). `public/.nojekyll` disables
Jekyll processing and `public/404.html` redirects unknown paths back to the app root.

## Structure

```
src/
  lib/         smooth scroll, reduced-motion, WebGL detection, in-view hook
  three/       HeroCanvas, LoopMesh, Particles, ParticleScene, GLSL shaders
  components/  Cursor, Magnetic, SplitText, TiltCard, Marquee, Counter, Reveal, Nav, Footer, Logo
  sections/    Hero, Concept, CrackLoop, Features, Stats, Process, ParticlesSection, CTA
scripts/       make-assets.mjs (SVG → OG/icon PNGs)
```

## Contact

[impactloopapps@gmail.com](mailto:impactloopapps@gmail.com)
